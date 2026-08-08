import { useState } from "react";
import { Image, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ModeSelector } from "@/components/ModeSelector";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SceneIllustration } from "@/components/SceneIllustration";
import { TimerHeader } from "@/components/TimerHeader";
import { TimerRing } from "@/components/TimerRing";
import { images } from "@/constants/images";
import { illustrationSets } from "@/data/illustrations";
import { timerModes } from "@/data/timerModes";
import { TimerModeKey } from "@/types/timer";

function formatDuration(minutes: number) {
  return `${String(minutes).padStart(2, "0")}:00`;
}

// Native size of snow_background.png — used to scale it to the screen width
// without distortion while keeping it bottom-anchored, so the cabin/treeline
// at the bottom of the artwork is always shown.
const BACKGROUND_ASPECT_RATIO = 852 / 1846;

// Ring diameter as a share of screen width, so it stays the primary focal
// point (and stays proportional) across device sizes.
const RING_SIZE_RATIO = 0.58;

export default function TimerScreen() {
  const [selectedKey, setSelectedKey] = useState<TimerModeKey>("focus");
  const selectedMode = timerModes.find((mode) => mode.key === selectedKey)!;
  const buttonLabel = selectedMode.key === "focus" ? "Start Focus" : "Start Break";
  const { width: windowWidth } = useWindowDimensions();

  return (
    <View className="flex-1 overflow-hidden">
      {/* Anchored to the bottom and sized by width so the snow/cabin scene at
          the bottom of the artwork always stays fully visible — only the
          plain sky at the top gets clipped if the screen is relatively short. */}
      <Image
        source={images.snowBackground}
        resizeMode="cover"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: windowWidth,
          height: windowWidth / BACKGROUND_ASPECT_RATIO,
        }}
      />
      {/* Keeps the artwork subtle so the timer, illustration, and button —
          not the background — read as the primary hierarchy. */}
      <View className="absolute inset-0 bg-timer-ink/10" />

      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 px-6 pt-2">
          <TimerHeader sceneName="Cozy Room" />

          <View className="items-center mt-3">
            <View
              className="flex-row items-center gap-2 px-4 h-10 rounded-full bg-timer-surface"
            >
              <View className="w-2.5 h-2.5 rounded-full bg-timer-purple" />
              <Text className="text-h4 text-timer-ink tracking-wide">
                {selectedMode.label.toUpperCase()}
              </Text>
            </View>
          </View>

          <View className="items-center mt-3">
            <TimerRing
              timeLabel={formatDuration(selectedMode.durationMinutes)}
              caption={selectedMode.caption}
              size={Math.round(windowWidth * RING_SIZE_RATIO)}
            />
          </View>

          {/* Illustration layer — flex-1 claims whatever space is left
              between the ring and the button, so a differently-sized
              environment illustration drops in without layout changes.
              SceneIllustration anchors its frame to the top of this box
              (tight against the ring) and always scales to fit without
              cropping, distorting, or overflowing into neighboring UI. */}
          <View className="flex-1">
            <SceneIllustration illustration={illustrationSets.cozyRoom} />
          </View>

          <PrimaryButton label={buttonLabel} icon="play" />

          <View className="mt-4">
            <ModeSelector
              modes={timerModes}
              selectedKey={selectedKey}
              onSelect={setSelectedKey}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
