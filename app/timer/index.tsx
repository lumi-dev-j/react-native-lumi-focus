import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ModeSelector } from "@/components/ModeSelector";
import { PrimaryButton } from "@/components/PrimaryButton";
import { TimerHeader } from "@/components/TimerHeader";
import { TimerRing } from "@/components/TimerRing";
import { colors } from "@/constants/theme";
import { timerModes } from "@/data/timerModes";
import { TimerModeKey } from "@/types/timer";

function formatDuration(minutes: number) {
  return `${String(minutes).padStart(2, "0")}:00`;
}

export default function TimerScreen() {
  const [selectedKey, setSelectedKey] = useState<TimerModeKey>("focus");
  const selectedMode = timerModes.find((mode) => mode.key === selectedKey)!;
  const buttonLabel = selectedMode.key === "focus" ? "Start Focus" : "Start Break";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.timer.background }}>
      <View className="flex-1 px-6 pt-2">
        <TimerHeader sceneName="Cozy Room" />

        <View className="items-center mt-8">
          <View
            className="flex-row items-center gap-2 px-4 h-10 rounded-full bg-timer-surface"
          >
            <View className="w-2.5 h-2.5 rounded-full bg-timer-purple" />
            <Text className="text-h4 text-timer-ink tracking-wide">
              {selectedMode.label.toUpperCase()}
            </Text>
          </View>
        </View>

        <View className="items-center mt-8">
          <TimerRing
            timeLabel={formatDuration(selectedMode.durationMinutes)}
            caption={selectedMode.caption}
          />
        </View>

        {/* Reserved for future cozy-scene artwork of varying sizes — kept
            flexible on purpose instead of a fixed height. */}
        <View className="flex-1" />

        <PrimaryButton label={buttonLabel} icon="play" />

        <View className="mt-6 mb-4">
          <ModeSelector
            modes={timerModes}
            selectedKey={selectedKey}
            onSelect={setSelectedKey}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
