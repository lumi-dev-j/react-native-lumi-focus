import { Image } from "expo-image";

import { EnvironmentTheme } from "@/types/theme";

// Warms expo-image's cache for one theme's background + illustration frames
// — loadAsync accepts local require() sources directly and decodes them into
// the same memory/disk cache the <Image> components read from, so a later
// mount with the same source renders instantly instead of decoding on the spot.
export function preloadTheme(theme: EnvironmentTheme) {
  const sources = [theme.background, ...theme.illustration.frames];
  return Promise.allSettled(sources.map((source) => Image.loadAsync(source)));
}

export function preloadThemes(themes: EnvironmentTheme[]) {
  return Promise.allSettled(themes.map(preloadTheme));
}
