import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { colors } from "@/constants/theme";

type TimerRingProps = {
  timeLabel: string;
  caption: string;
  size?: number;
  /** Fraction of the mode's duration elapsed so far, from 0 (just started) to 1 (complete). */
  progress: number;
};

// The ring is a two-tone gauge (progress on the left, track on the right)
// with a gap at the bottom, matching prompt_material/timer.png. The two
// arcs always span the same fixed sweep together — only the split between
// them moves as progress changes, so the ring's overall shape never shifts.
const STROKE_WIDTH = 10;
const GAP_DEGREES = 126;
const ARC_DEGREES = (360 - GAP_DEGREES) / 2;
const TOTAL_ARC_DEGREES = ARC_DEGREES * 2;
const START_ANGLE = -90 - ARC_DEGREES;

export function TimerRing({ timeLabel, caption, size = 300, progress }: TimerRingProps) {
  const center = size / 2;
  const radius = (size - STROKE_WIDTH) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(1, Math.max(0, progress));

  const progressDegrees = TOTAL_ARC_DEGREES * clampedProgress;
  const trackDegrees = TOTAL_ARC_DEGREES - progressDegrees;
  const progressArcLength = (progressDegrees / 360) * circumference;
  const trackArcLength = (trackDegrees / 360) * circumference;
  const dividerAngle = START_ANGLE + progressDegrees;

  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        {/* Track — starts where progress ends and sweeps to the bottom-right gap edge. */}
        {trackDegrees > 0 && (
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={colors.timer.ringTrack}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={`${trackArcLength} ${circumference - trackArcLength}`}
            fill="none"
            transform={`rotate(${dividerAngle} ${center} ${center})`}
          />
        )}
        {/* Progress — starts at the bottom-left gap edge and grows clockwise. */}
        {progressDegrees > 0 && (
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={colors.timer.ringProgress}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={`${progressArcLength} ${circumference - progressArcLength}`}
            fill="none"
            transform={`rotate(${START_ANGLE} ${center} ${center})`}
          />
        )}
      </Svg>
      <Text className="text-timer-time text-white">{timeLabel}</Text>
      <Text className="text-body-lg text-white/90 mt-2">{caption}</Text>
    </View>
  );
}
