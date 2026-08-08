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

  // Contain-fit the frame to its own aspect ratio first, then let the box
  // top-anchor *that* size — sizing the Image element to the full box (with
  // resizeMode="contain" doing the fitting) would center the artwork inside
  // it instead, since contain always centers within the Image's own frame.
  const { width: boxWidth, height: boxHeight } = containerSize;
  const boxAspect = boxHeight > 0 ? boxWidth / boxHeight : 0;
  const fitSize =
    boxAspect > illustration.aspectRatio
      ? { width: boxHeight * illustration.aspectRatio, height: boxHeight }
      : { width: boxWidth, height: boxWidth / illustration.aspectRatio };

  return (
    // justify-start (not center) anchors the frame to the top of its box —
    // right under the timer — so any leftover space falls below it, near
    // the button, instead of splitting evenly above and below.
    <View className="w-full h-full items-center justify-start" onLayout={handleLayout}>
      {boxWidth > 0 && boxHeight > 0 && (
        <Image source={illustration.frames[frameIndex]} resizeMode="contain" style={fitSize} />
      )}
    </View>
  );
}
