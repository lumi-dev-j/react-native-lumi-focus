import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { colors } from "@/constants/theme";

type TimerRingProps = {
  timeLabel: string;
  caption: string;
  size?: number;
};

// The ring is a two-tone gauge (track on the right, progress on the left)
// with a gap at the bottom, matching prompt_material/timer.png. Both arcs
// are the same fixed length for now — wiring the progress split to the
// live countdown is a future feature step.
const STROKE_WIDTH = 10;
const GAP_DEGREES = 126;
const ARC_DEGREES = (360 - GAP_DEGREES) / 2;

export function TimerRing({ timeLabel, caption, size = 300 }: TimerRingProps) {
  const center = size / 2;
  const radius = (size - STROKE_WIDTH) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (ARC_DEGREES / 360) * circumference;
  const dashArray = `${arcLength} ${circumference - arcLength}`;

  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        {/* Track — starts at the top and sweeps clockwise. */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.timer.track}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={dashArray}
          fill="none"
          transform={`rotate(-90 ${center} ${center})`}
        />
        {/* Progress — ends at the top, sweeping in from the left. */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.timer.purple}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={dashArray}
          fill="none"
          transform={`rotate(${-90 - ARC_DEGREES} ${center} ${center})`}
        />
      </Svg>
      <Text className="text-timer-time text-white">{timeLabel}</Text>
      <Text className="text-body-lg text-white/80 mt-2">{caption}</Text>
    </View>
  );
}
