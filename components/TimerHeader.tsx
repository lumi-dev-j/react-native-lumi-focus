import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";

import { softShadow } from "@/constants/shadows";
import { colors } from "@/constants/theme";

type TimerHeaderProps = {
  sceneName: string;
  onPressSounds?: () => void;
  onPressScene?: () => void;
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
        className="w-14 h-14 rounded-full bg-timer-surface items-center justify-center"
      >
        <Ionicons name={icon} size={22} color={colors.timer.ink} />
      </View>
      <Text className="text-caption text-timer-ink">{label}</Text>
    </Pressable>
  );
}

export function TimerHeader({
  sceneName,
  onPressSounds,
  onPressScene,
  onPressSettings,
}: TimerHeaderProps) {
  return (
    <View className="flex-row items-start justify-between">
      <IconAction icon="musical-notes-outline" label="Sounds" onPress={onPressSounds} />

      <Pressable
        onPress={onPressScene}
        style={softShadow}
        className="flex-row items-center gap-2 px-5 h-14 rounded-full bg-timer-surface"
      >
        <Text className="text-h4 text-timer-ink">{sceneName}</Text>
        <Ionicons name="chevron-down" size={18} color={colors.timer.ink} />
      </Pressable>

      <IconAction icon="settings-outline" label="Settings" onPress={onPressSettings} />
    </View>
  );
}
