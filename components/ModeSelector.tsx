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
    return <Ionicons name={mode.icon.name as never} size={20} color={color} />;
  }
  return <MaterialCommunityIcons name={mode.icon.name as never} size={20} color={color} />;
}

export function ModeSelector({ modes, selectedKey, onSelect }: ModeSelectorProps) {
  return (
    <View
      style={softShadow}
      className="flex-row items-stretch bg-timer-surface rounded-[28px] p-2"
    >
      {modes.map((mode, index) => {
        const isSelected = mode.key === selectedKey;
        const previousSelected = index > 0 && modes[index - 1].key === selectedKey;
        const showDivider = index > 0 && !isSelected && !previousSelected;
        const tintColor = isSelected ? colors.timer.purple : colors.timer.ink;

        return (
          <View key={mode.key} className="flex-1 flex-row items-stretch">
            {showDivider && <View className="w-px my-4 bg-timer-track" />}
            <Pressable
              onPress={() => onSelect(mode.key)}
              className={`flex-1 flex-row items-center gap-1 px-1.5 py-3 rounded-2xl ${
                isSelected ? "bg-timer-surface-selected" : ""
              }`}
            >
              <ModeIcon mode={mode} color={tintColor} />
              <View className="shrink">
                <Text className="text-h5" numberOfLines={1} style={{ color: tintColor }}>
                  {mode.label}
                </Text>
                <Text className="text-caption text-timer-muted" numberOfLines={1}>
                  {mode.durationMinutes} min
                </Text>
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
