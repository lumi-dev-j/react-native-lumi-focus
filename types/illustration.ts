import { ImageSourcePropType } from "react-native";

export type IllustrationSet = {
  key: string;
  frames: ImageSourcePropType[];
  frameDurationMs?: number;
  /** Width / height of a single frame, so it can be top-anchored at its
   * natural size within its box instead of centered inside a stretched one. */
  aspectRatio: number;
};
