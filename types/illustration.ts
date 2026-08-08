import { ImageSourcePropType } from "react-native";

export type IllustrationSet = {
  key: string;
  frames: ImageSourcePropType[];
  frameDurationMs?: number;
};
