import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SettingsRow } from "@/components/SettingsRow";
import { softShadow } from "@/constants/shadows";
import { colors } from "@/constants/theme";
import { settingsCopy } from "@/data/settingsCopy";
import { useTimerModes } from "@/hooks/useTimerModes";
import { useSettingsStore } from "@/store/settingsStore";

export default function SettingsScreen() {
  const router = useRouter();
  const modes = useTimerModes();
  const resetToDefault = useSettingsStore((state) => state.resetToDefault);

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
          <Text className="text-h2 text-timer-ink">Settings</Text>
        </View>

        <Text className="text-caption text-timer-muted tracking-wide mt-8 mb-3">TIMER DURATIONS</Text>
        <View className="gap-3">
          {modes.map((mode) => (
            <SettingsRow
              key={mode.key}
              icon={mode.icon}
              title={settingsCopy[mode.key].rowTitle}
              caption={settingsCopy[mode.key].rowCaption}
              value={`${mode.durationMinutes} min`}
              highlighted={mode.key === "focus"}
              onPress={() =>
                router.push({ pathname: "/settings/duration/[mode]", params: { mode: mode.key } })
              }
            />
          ))}
        </View>

        <Text className="text-caption text-timer-muted tracking-wide mt-8 mb-3">OTHERS</Text>
        <SettingsRow
          icon={{ set: "materialCommunityIcons", name: "history" }}
          title="Reset to default"
          caption="Restore all timer durations to default"
          tone="danger"
          onPress={resetToDefault}
        />
      </View>
    </SafeAreaView>
  );
}
