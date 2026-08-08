import { Platform, ViewStyle } from "react-native";

/**
 * Soft card/button shadow shared across the timer screen. Shadow syntax
 * differs per platform, so this stays in StyleSheet-compatible form
 * instead of a NativeWind utility (see AGENTS.md style exception rules).
 */
export const softShadow: ViewStyle = Platform.select({
  ios: {
    shadowColor: "#3A3252",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  android: {
    elevation: 3,
  },
  default: {},
}) as ViewStyle;

/**
 * Stronger shadow for elements that should feel lifted above everything
 * else — currently just the primary CTA button.
 */
export const elevatedShadow: ViewStyle = Platform.select({
  ios: {
    shadowColor: "#3A3252",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
  },
  android: {
    elevation: 8,
  },
  default: {},
}) as ViewStyle;
