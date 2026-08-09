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
  isAudioMuted: boolean;
  onToggleAudio?: () => void;
  onPressSettings?: () => void;
};

function IconButton({
  icon,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={softShadow}
        className="w-11 h-11 rounded-full bg-timer-glass items-center justify-center"
      >
        <Ionicons name={icon} size={18} color={colors.timer.ink} />
      </View>
    </Pressable>
  );
}

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
      <IconButton icon={icon} onPress={onPress} />
      <Text className="text-caption text-timer-ink">{label}</Text>
    </Pressable>
  );
}

export function TimerHeader({
  themes,
  selectedThemeId,
  onSelectTheme,
  isAudioMuted,
  onToggleAudio,
  onPressSettings,
}: TimerHeaderProps) {
  return (
    <View className="flex-row items-start justify-between">
      <IconButton
        icon={isAudioMuted ? "volume-mute-outline" : "volume-high-outline"}
        onPress={onToggleAudio}
      />

      <EnvironmentDropdown
        themes={themes}
        selectedThemeId={selectedThemeId}
        onSelectTheme={onSelectTheme}
      />

      <IconAction icon="settings-outline" label="Settings" onPress={onPressSettings} />
    </View>
  );
}
