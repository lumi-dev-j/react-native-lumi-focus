import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { images } from "@/constants/images";

// Source crop is a 608x608 square — NativeWind can't reliably derive Image
// height from a className aspect-ratio, so the size is set explicitly here.
const MASCOT_SIZE = 330;

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Temporary minimum display time until a real readiness check (auth,
    // store hydration) naturally gates this redirect.
    const timeout = setTimeout(() => {
      router.replace("/timer");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-splash-background">
      <Image
        source={images.splashMascot}
        resizeMode="contain"
        style={styles.mascot}
      />
      <Text className="text-logo text-ink mt-3">Lumi Focus</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mascot: {
    width: MASCOT_SIZE,
    height: MASCOT_SIZE,
  },
});
