import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

import { softShadow } from "@/constants/shadows";
import { colors } from "@/constants/theme";
import { TimerMode, TimerModeKey } from "@/types/timer";

type ModeSelectorProps = {
  modes: TimerMode[];
  selectedKey: TimerModeKey;
  onSelect: (key: TimerModeKey) => void;
};

function ModeIcon({ mode, color }: { mode: TimerMode; color: string }) {
  if (mode.icon.set === "ionicons") {
    return <Ionicons name={mode.icon.name as never} size={17} color={color} />;
  }
  return <MaterialCommunityIcons name={mode.icon.name as never} size={17} color={color} />;
}

export function ModeSelector({ modes, selectedKey, onSelect }: ModeSelectorProps) {
  return (
    <View
      style={softShadow}
      className="flex-row items-stretch bg-timer-surface rounded-[28px] p-2"
    >
      {modes.map((mode) => {
        const isSelected = mode.key === selectedKey;
        const tintColor = isSelected ? colors.timer.purple : colors.timer.ink;

        return (
          <Pressable
            key={mode.key}
            onPress={() => onSelect(mode.key)}
            className={`flex-1 items-center justify-center gap-1.5 px-1.5 py-3 rounded-2xl ${
              isSelected ? "bg-timer-surface-selected" : ""
            }`}
          >
            <ModeIcon mode={mode} color={tintColor} />
            <Text className="text-h5" numberOfLines={1} style={{ color: tintColor }}>
              {mode.label}
            </Text>
            <Text className="text-caption text-timer-muted" numberOfLines={1}>
              {mode.durationMinutes} min
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
