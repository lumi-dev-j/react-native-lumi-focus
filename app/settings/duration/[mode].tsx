import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DurationWheelPicker } from "@/components/DurationWheelPicker";
import { PrimaryButton } from "@/components/PrimaryButton";
import { softShadow } from "@/constants/shadows";
import { colors } from "@/constants/theme";
import { settingsCopy } from "@/data/settingsCopy";
import { timerModes } from "@/data/timerModes";
import { useSettingsStore } from "@/store/settingsStore";

const MIN_MINUTES = 1;
const MAX_MINUTES = 120;

export default function DurationEditorScreen() {
  const router = useRouter();
  const { mode: modeParam } = useLocalSearchParams<{ mode: string }>();
  const mode = timerModes.find((timerMode) => timerMode.key === modeParam);

  const currentMinutes = useSettingsStore((state) => (mode ? state.durations[mode.key] : MIN_MINUTES));
  const setDuration = useSettingsStore((state) => state.setDuration);

  const [selectedMinutes, setSelectedMinutes] = useState(currentMinutes);

  if (!mode) {
    router.back();
    return null;
  }

  const copy = settingsCopy[mode.key];

  const handleSave = () => {
    setDuration(mode.key, selectedMinutes);
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-timer-background">
      <View className="flex-1 px-6 pt-2">
        <View className="flex-row items-center justify-center">
          <Pressable
            onPress={() => router.back()}
            style={[softShadow, { position: "absolute", left: 0 }]}
            className="w-11 h-11 rounded-full bg-timer-glass items-center justify-center"
          >
            <Ionicons name="arrow-back" size={18} color={colors.timer.ink} />
          </Pressable>
          <Text className="text-h2 text-timer-ink">{copy.editorTitle}</Text>
        </View>

        <View className="items-center mt-8">
          <View className="w-16 h-16 rounded-full bg-timer-surface-selected/60 items-center justify-center">
            {mode.icon.set === "ionicons" ? (
              <Ionicons name={mode.icon.name as never} size={28} color={colors.timer.ink} />
            ) : (
              <MaterialCommunityIcons name={mode.icon.name as never} size={28} color={colors.timer.ink} />
            )}
          </View>
          <Text className="text-h3 text-timer-ink mt-4">{copy.editorTitle}</Text>
          <Text className="text-body-sm text-timer-muted mt-2 text-center px-8">{copy.editorCaption}</Text>
        </View>

        <View style={softShadow} className="flex-1 bg-surface rounded-t-[32px] mt-6 -mx-6 px-6 pt-3">
          <View className="w-10 h-1.5 rounded-full bg-timer-track self-center" />

          <Text className="text-h2 text-center mt-4" style={{ color: colors.timer.purple }}>
            {selectedMinutes} min
          </Text>

          <View className="mt-2">
            <DurationWheelPicker
              value={currentMinutes}
              minValue={MIN_MINUTES}
              maxValue={MAX_MINUTES}
              onChange={setSelectedMinutes}
            />
          </View>

          <View className="mt-auto mb-6 gap-4">
            <PrimaryButton label="Save" onPress={handleSave} />
            <Pressable onPress={() => router.back()} className="items-center py-2">
              <Text className="text-h4 text-timer-muted">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
