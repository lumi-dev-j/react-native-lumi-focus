import { useEffect, useState } from "react";
import { Image, LayoutChangeEvent, View } from "react-native";

import { IllustrationSet } from "@/types/illustration";

type SceneIllustrationProps = {
  illustration: IllustrationSet;
};

// Idle animation: cycles through the illustration's frames on a fixed
// interval. Swap `illustration` for a different environment's frame
// sequence to reuse this for other scenes.
export function SceneIllustration({ illustration }: SceneIllustrationProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  // Measured via onLayout (instead of a w-full/h-full className) so the
  // frame gets a real pixel box to scale into — percentage sizing on Image
  // can't be trusted to resolve against a flex-computed parent.
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setFrameIndex(0);
    const interval = setInterval(() => {
      setFrameIndex((previous) => (previous + 1) % illustration.frames.length);
    }, illustration.frameDurationMs ?? 900);

    return () => clearInterval(interval);
  }, [illustration]);

  function handleLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  }

  return (
    // justify-start (not center) anchors the frame to the top of its box —
    // right under the timer — so any leftover space falls below it, near
    // the button, instead of splitting evenly above and below.
    <View className="w-full h-full items-center justify-start" onLayout={handleLayout}>
      {containerSize.width > 0 && containerSize.height > 0 && (
        <Image
          source={illustration.frames[frameIndex]}
          resizeMode="contain"
          style={{ width: containerSize.width, height: containerSize.height }}
        />
      )}
    </View>
  );
}
