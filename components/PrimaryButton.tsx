import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text } from "react-native";

import { softShadow } from "@/constants/shadows";

type PrimaryButtonProps = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export function PrimaryButton({ label, icon, onPress }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={softShadow}
      className="flex-row items-center justify-center gap-3 h-14 rounded-full bg-timer-purple active:opacity-90"
    >
      {icon && <Ionicons name={icon} size={20} color="white" />}
      <Text className="text-h3 text-white">{label}</Text>
    </Pressable>
  );
}
