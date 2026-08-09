import { ImageSource } from "expo-image";

export type IllustrationSet = {
  key: string;
  frames: (string | number | ImageSource)[];
  frameDurationMs?: number;
  /** Width / height of a single frame, so it can be top-anchored at its
   * natural size within its box instead of centered inside a stretched one. */
  aspectRatio: number;
};
