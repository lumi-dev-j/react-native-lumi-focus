import { ImageSource } from "expo-image";

import { IllustrationSet } from "@/types/illustration";

export type EnvironmentTheme = {
  id: string;
  name: string;
  background: string | number | ImageSource;
  /** Width / height of the background artwork, so it can be scaled to the
   * screen width without distortion while staying bottom-anchored. */
  backgroundAspectRatio: number;
  illustration: IllustrationSet;
  /** Ambient background audio that loops while this theme is active. */
  audio: number;
};
