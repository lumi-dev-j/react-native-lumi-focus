import { Image } from "expo-image";
import { Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ModeSelector } from "@/components/ModeSelector";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SceneIllustration } from "@/components/SceneIllustration";
import { TimerHeader } from "@/components/TimerHeader";
import { TimerRing } from "@/components/TimerRing";
import { environmentThemes } from "@/data/themes";
import { timerModes } from "@/data/timerModes";
import { useThemeAudio } from "@/hooks/useThemeAudio";
import { useTimerCompletionSound } from "@/hooks/useTimerCompletionSound";
import { useTimerCountdown } from "@/hooks/useTimerCountdown";
import { useSoundStore } from "@/store/soundStore";
import { useThemeStore } from "@/store/themeStore";
import { useTimerStore } from "@/store/timerStore";

function formatTime(totalSeconds: number) {
  const clamped = Math.max(0, totalSeconds);
  const minutes = Math.floor(clamped / 60);
  const seconds = clamped % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Ring diameter as a share of screen width, so it stays the primary focal
// point (and stays proportional) across device sizes.
const RING_SIZE_RATIO = 0.68;

// TimerRing draws an open gauge, not a full circle — it leaves a gap at the
// bottom, so a chunk of the ring's own square bounding box under the visible
// arc is empty. Pulling the illustration up by a share of the ring's size
// compensates for that dead space instead of leaving it as a visual gap.
const RING_GAP_COMPENSATION_RATIO = 0.16;

export default function TimerScreen() {
  useTimerCountdown();

  const mode = useTimerStore((state) => state.mode);
  const status = useTimerStore((state) => state.status);
  const remainingSeconds = useTimerStore((state) => state.remainingSeconds);
  const selectMode = useTimerStore((state) => state.selectMode);
  const toggle = useTimerStore((state) => state.toggle);

  const selectedMode = timerModes.find((timerMode) => timerMode.key === mode)!;
  const durationSeconds = selectedMode.durationMinutes * 60;
  // Once a session completes, show the ring/time as freshly reset (like
  // idle) rather than frozen at 00:00 — status stays "completed" so the
  // completion sound hook can still detect the transition.
  const displaySeconds = status === "completed" ? durationSeconds : remainingSeconds;
  const progress = status === "completed" ? 0 : 1 - remainingSeconds / durationSeconds;

  const modeLabelSuffix = selectedMode.key === "focus" ? "Focus" : "Break";
  const buttonLabel =
    status === "running" ? "Pause" : status === "paused" ? `Resume ${modeLabelSuffix}` : `Start ${modeLabelSuffix}`;
  const buttonIcon = status === "running" ? "pause" : "play";

  const { width: windowWidth } = useWindowDimensions();
  const ringSize = Math.round(windowWidth * RING_SIZE_RATIO);

  const themeId = useThemeStore((state) => state.themeId);
  const selectTheme = useThemeStore((state) => state.selectTheme);
  const selectedTheme =
    environmentThemes.find((theme) => theme.id === themeId) ?? environmentThemes[0];

  const isAudioMuted = useSoundStore((state) => state.isMuted);
  const toggleAudioMuted = useSoundStore((state) => state.toggleMuted);
  const themePlayer = useThemeAudio(selectedTheme, isAudioMuted);
  useTimerCompletionSound(status, themePlayer);

  return (
    <View className="flex-1 overflow-hidden">
      {/* Anchored to the bottom and sized by width so the scene at the
          bottom of the artwork always stays fully visible — only the
          plain sky at the top gets clipped if the screen is relatively short. */}
      <Image
        source={selectedTheme.background}
        contentFit="cover"
        transition={150}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: windowWidth,
          height: windowWidth / selectedTheme.backgroundAspectRatio,
        }}
      />
      {/* Keeps the artwork subtle so the timer, illustration, and button —
          not the background — read as the primary hierarchy. */}
      <View className="absolute inset-0 bg-timer-ink/10" />

      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 px-6 pt-2">
          <TimerHeader
            themes={environmentThemes}
            selectedThemeId={themeId}
            onSelectTheme={selectTheme}
            isAudioMuted={isAudioMuted}
            onToggleAudio={toggleAudioMuted}
          />

          <View className="items-center mt-3">
            <View
              className="flex-row items-center gap-2 px-4 h-11 rounded-full bg-timer-glass"
            >
              <View className="w-2.5 h-2.5 rounded-full bg-timer-purple" />
              <Text className="text-h4 text-timer-ink tracking-wide">
                {selectedMode.label.toUpperCase()}
              </Text>
            </View>
          </View>

          <View className="items-center mt-3">
            <TimerRing
              timeLabel={formatTime(displaySeconds)}
              caption={selectedMode.caption}
              size={ringSize}
              progress={progress}
            />
          </View>

          {/* Illustration layer — flex-1 claims whatever space is left
              between the ring and the button, so a differently-sized
              environment illustration drops in without layout changes.
              SceneIllustration anchors its frame to the top of this box
              (tight against the ring) and always scales to fit without
              cropping, distorting, or overflowing into neighboring UI. */}
          <View
            className="flex-1"
            style={{ marginTop: -Math.round(ringSize * RING_GAP_COMPENSATION_RATIO) }}
          >
            <SceneIllustration illustration={selectedTheme.illustration} />
          </View>

          <PrimaryButton label={buttonLabel} icon={buttonIcon} onPress={toggle} />

          <View className="mt-4">
            <ModeSelector modes={timerModes} selectedKey={mode} onSelect={selectMode} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
