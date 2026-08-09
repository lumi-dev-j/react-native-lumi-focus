import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { environmentThemes } from "@/data/themes";
import { preloadThemes } from "@/lib/imagePreload";

import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  // Warm every theme's background + illustration frames behind the splash
  // screen so switching (or even the first paint) never shows a stale or
  // half-decoded frame. Swallow prefetch failures rather than hanging the
  // splash screen forever on them.
  const [themeAssetsReady, setThemeAssetsReady] = useState(false);

  useEffect(() => {
    preloadThemes(environmentThemes)
      .catch(() => {})
      .finally(() => setThemeAssetsReady(true));
  }, []);

  const appReady = (fontsLoaded || fontError) && themeAssetsReady;

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="timer/index" options={{ animation: "fade" }} />
    </Stack>
  );
}
