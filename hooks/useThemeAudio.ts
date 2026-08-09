import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";

import { EnvironmentTheme } from "@/types/theme";

// Loops the active theme's ambient audio, swapping tracks when the theme
// changes and respecting the mute toggle. Uses player.replace() rather than
// remounting the hook so switching themes doesn't create/destroy players.
export function useThemeAudio(theme: EnvironmentTheme, isMuted: boolean) {
  const player = useAudioPlayer(theme.audio);

  useEffect(() => {
    player.loop = true;
  }, [player]);

  useEffect(() => {
    player.replace(theme.audio);
    if (!isMuted) player.play();
  }, [player, theme.audio]);

  useEffect(() => {
    if (isMuted) {
      player.pause();
    } else {
      player.play();
    }
  }, [player, isMuted]);
}
