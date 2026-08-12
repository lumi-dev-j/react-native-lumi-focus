import { audios } from "@/constants/audios";
import { images } from "@/constants/images";
import { EnvironmentTheme } from "@/types/theme";

// Add more environments here — each just needs a background, matching
// illustration frames, ambient audio, and the native aspect ratios
// (width / height) used to scale the artwork without distortion.
export const environmentThemes: EnvironmentTheme[] = [
  {
    id: "springMeadow",
    name: "Spring Meadow",
    background: images.springMeadowBackground,
    backgroundAspectRatio: 853 / 1844,
    audio: audios.springMeadow,
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
    audio: audios.snowCabin,
    illustration: {
      key: "snowCabin",
      frames: [images.girlCoffeeCat1, images.girlCoffeeCat2],
      frameDurationMs: 900,
      aspectRatio: 744 / 862,
    },
  },
  {
    id: "spaceTravel",
    name: "Space Travel",
    background: images.spaceTravelBackground,
    backgroundAspectRatio: 853 / 1844,
    audio: audios.spaceTravel,
    illustration: {
      key: "spaceTravel",
      frames: [images.astronaut1, images.astronaut2],
      frameDurationMs: 900,
      aspectRatio: 1536 / 1024,
    },
  },
  {
    id: "halloweenRide",
    name: "Halloween Ride",
    background: images.halloweenRideBackground,
    backgroundAspectRatio: 853 / 1844,
    audio: audios.halloweenRide,
    illustration: {
      key: "halloweenRide",
      frames: [images.girlCatSweep1, images.girlCatSweep2],
      frameDurationMs: 900,
      aspectRatio: 1536 / 1024,
    },
  },
  {
    id: "parisRiverside",
    name: "Paris Riverside",
    background: images.parisRiversideBackground,
    backgroundAspectRatio: 853 / 1844,
    audio: audios.parisRiverside,
    illustration: {
      key: "parisRiverside",
      frames: [images.girlCatWalk1, images.girlCatWalk2],
      frameDurationMs: 900,
      aspectRatio: 1536 / 1024,
    },
  },
  {
    id: "greekSeaside",
    name: "Greek Seaside",
    background: images.greekSeasideBackground,
    backgroundAspectRatio: 853 / 1844,
    audio: audios.greekSeaside,
    illustration: {
      key: "greekSeaside",
      frames: [images.girlCatSeaside1, images.girlCatSeaside2],
      frameDurationMs: 900,
      aspectRatio: 1024 / 1536,
    },
  },
  {
    id: "oceanAdventure",
    name: "Ocean Explore",
    background: images.oceanAdventureBackground,
    backgroundAspectRatio: 853 / 1844,
    audio: audios.oceanAdventure,
    illustration: {
      key: "oceanAdventure",
      frames: [images.girlCatDive1, images.girlCatDive2],
      frameDurationMs: 900,
      aspectRatio: 1536 / 1024,
    },
  },
];

export const defaultThemeId = environmentThemes[0].id;
