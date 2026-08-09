import { images } from "@/constants/images";
import { EnvironmentTheme } from "@/types/theme";

// Add more environments here — each just needs a background, matching
// illustration frames, and the native aspect ratios (width / height) used
// to scale both without distortion.
export const environmentThemes: EnvironmentTheme[] = [
  {
    id: "springMeadow",
    name: "Spring Meadow",
    background: images.springMeadowBackground,
    backgroundAspectRatio: 853 / 1844,
    illustration: {
      key: "springMeadow",
      // Cropped tight to the girl + cat (see assets/images/girl_cat_reading_*.png)
      // so the character fills the frame at the same ~90% ratio as Snow
      // Cabin's illustration — keeps the two themes visually the same scale.
      frames: [images.girlCatReading1, images.girlCatReading2],
      frameDurationMs: 900,
      aspectRatio: 1069 / 1008,
    },
  },
  {
    id: "snowCabin",
    name: "Snow Cabin",
    background: images.snowCabinBackground,
    backgroundAspectRatio: 852 / 1846,
    illustration: {
      key: "snowCabin",
      frames: [images.girlCoffeeCat1, images.girlCoffeeCat2],
      frameDurationMs: 900,
      aspectRatio: 744 / 862,
    },
  },
];

export const defaultThemeId = environmentThemes[0].id;
