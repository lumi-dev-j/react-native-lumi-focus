import { useCallback, useMemo } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View } from "react-native";

import { colors } from "@/constants/theme";

const ITEM_HEIGHT = 44;
const VISIBLE_ROWS = 5;
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ROWS;
// Padding so the first/last minute value can still scroll to the centered
// selection row instead of stopping short against the list edges.
const EDGE_PADDING = ITEM_HEIGHT * Math.floor(VISIBLE_ROWS / 2);

type DurationWheelPickerProps = {
  value: number;
  minValue: number;
  maxValue: number;
  onChange: (minutes: number) => void;
};

export function DurationWheelPicker({ value, minValue, maxValue, onChange }: DurationWheelPickerProps) {
  const values = useMemo(
    () => Array.from({ length: maxValue - minValue + 1 }, (_, index) => minValue + index),
    [minValue, maxValue]
  );

  const initialOffset = (Math.min(Math.max(value, minValue), maxValue) - minValue) * ITEM_HEIGHT;

  const handleSnap = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(values.length - 1, index));
      onChange(values[clampedIndex]);
    },
    [values, onChange]
  );

  return (
    <View style={{ height: CONTAINER_HEIGHT }} className="relative">
      <View
        pointerEvents="none"
        style={{ top: EDGE_PADDING, height: ITEM_HEIGHT }}
        className="absolute left-0 right-0 rounded-2xl bg-timer-surface-selected/60"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentContainerStyle={{ paddingVertical: EDGE_PADDING }}
        contentOffset={{ x: 0, y: initialOffset }}
        onMomentumScrollEnd={handleSnap}
        onScrollEndDrag={handleSnap}
      >
        {values.map((minute) => {
          const isSelected = minute === value;
          return (
            <View key={minute} style={{ height: ITEM_HEIGHT }} className="flex-row items-center justify-center gap-2">
              <Text
                className={isSelected ? "text-h3" : "text-body-lg"}
                style={{ color: isSelected ? colors.timer.ink : colors.timer.muted, opacity: isSelected ? 1 : 0.5 }}
              >
                {minute}
              </Text>
              {isSelected && <Text className="text-body-sm text-timer-muted">min</Text>}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
