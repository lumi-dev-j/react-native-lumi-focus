import { images } from "@/constants/images";
import { IllustrationSet } from "@/types/illustration";

// Add more environments here (e.g. rainyRoom, sunnyDesk) as new scenes ship —
// each just needs its own frame sequence.
export const illustrationSets: Record<string, IllustrationSet> = {
  cozyRoom: {
    key: "cozyRoom",
    frames: [images.girlCoffeeCat1, images.girlCoffeeCat2],
    frameDurationMs: 900,
    aspectRatio: 744 / 862,
  },
};
