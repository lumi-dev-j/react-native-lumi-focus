import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";

import { EnvironmentDropdown } from "@/components/EnvironmentDropdown";
import { softShadow } from "@/constants/shadows";
import { colors } from "@/constants/theme";
import { EnvironmentTheme } from "@/types/theme";

type TimerHeaderProps = {
  themes: EnvironmentTheme[];
  selectedThemeId: string;
  onSelectTheme: (themeId: string) => void;
  onPressSounds?: () => void;
  onPressSettings?: () => void;
};

function IconAction({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="items-center gap-2">
      <View
        style={softShadow}
        className="w-11 h-11 rounded-full bg-timer-glass items-center justify-center"
      >
        <Ionicons name={icon} size={18} color={colors.timer.ink} />
      </View>
      <Text className="text-caption text-timer-ink">{label}</Text>
    </Pressable>
  );
}

export function TimerHeader({
  themes,
  selectedThemeId,
  onSelectTheme,
  onPressSounds,
  onPressSettings,
}: TimerHeaderProps) {
  return (
    <View className="flex-row items-start justify-between">
      <IconAction icon="musical-notes-outline" label="Sounds" onPress={onPressSounds} />

      <EnvironmentDropdown
        themes={themes}
        selectedThemeId={selectedThemeId}
        onSelectTheme={onSelectTheme}
      />

      <IconAction icon="settings-outline" label="Settings" onPress={onPressSettings} />
    </View>
  );
}
