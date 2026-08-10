import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

import { softShadow } from "@/constants/shadows";
import { colors } from "@/constants/theme";
import { TimerModeIcon } from "@/types/timer";

type SettingsRowProps = {
  icon: TimerModeIcon;
  title: string;
  caption: string;
  value?: string;
  highlighted?: boolean;
  tone?: "default" | "danger";
  onPress: () => void;
};

function RowIcon({ icon, color }: { icon: TimerModeIcon; color: string }) {
  if (icon.set === "ionicons") {
    return <Ionicons name={icon.name as never} size={20} color={color} />;
  }
  return <MaterialCommunityIcons name={icon.name as never} size={20} color={color} />;
}

export function SettingsRow({
  icon,
  title,
  caption,
  value,
  highlighted,
  tone = "default",
  onPress,
}: SettingsRowProps) {
  const isDanger = tone === "danger";
  const accentColor = isDanger ? colors.semantic.error : colors.timer.purple;

  return (
    <Pressable
      onPress={onPress}
      style={softShadow}
      className={`flex-row items-center gap-3 px-4 py-4 rounded-3xl ${
        isDanger ? "bg-error/10" : highlighted ? "bg-timer-surface-selected/60" : "bg-surface"
      }`}
    >
      <View
        className={`w-11 h-11 rounded-full items-center justify-center ${
          isDanger ? "bg-error/15" : highlighted ? "bg-timer-surface-selected" : "bg-timer-surface"
        }`}
      >
        <RowIcon icon={icon} color={isDanger ? accentColor : colors.timer.ink} />
      </View>

      <View className="flex-1">
        <Text className="text-h4 text-timer-ink">{title}</Text>
        <Text className="text-body-sm text-timer-muted mt-0.5">{caption}</Text>
      </View>

      {value && (
        <Text className="text-h4 mr-1" style={{ color: colors.timer.purple }}>
          {value}
        </Text>
      )}
      <Ionicons name="chevron-forward" size={16} color={accentColor} />
    </Pressable>
  );
}
