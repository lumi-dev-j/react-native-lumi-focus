import { Image } from "expo-image";
import { useEffect, useState } from "react";

import { IllustrationSet } from "@/types/illustration";

type SceneIllustrationProps = {
  illustration: IllustrationSet;
};

// Idle animation: cycles through the illustration's frames on a fixed
// interval. Swap `illustration` for a different environment's frame
// sequence to reuse this for other scenes.
export function SceneIllustration({ illustration }: SceneIllustrationProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    setFrameIndex(0);
    const interval = setInterval(() => {
      setFrameIndex((previous) => (previous + 1) % illustration.frames.length);
    }, illustration.frameDurationMs ?? 900);

    return () => clearInterval(interval);
  }, [illustration]);

  return (
    // contentPosition="top" anchors the frame to the top of its box — right
    // under the timer — without needing a measured onLayout pass first, so
    // the illustration renders on the same frame as everything else instead
    // of lagging a render behind.
    <Image
      source={illustration.frames[frameIndex]}
      contentFit="contain"
      contentPosition="top"
      transition={150}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
