import { AudioPlayer, useAudioPlayer } from "expo-audio";
import { useEffect, useRef } from "react";

import { audios } from "@/constants/audios";
import { TimerStatus } from "@/store/timerStore";

// Plays the completion chime once whenever the timer status flips to
// "completed" (i.e. it ran out, not paused/reset/mode-switched). Always
// audible regardless of the theme audio mute toggle. If the theme track is
// playing, it's paused for the chime and resumed once the chime finishes.
export function useTimerCompletionSound(status: TimerStatus, themePlayer: AudioPlayer, isMuted: boolean) {
  const completionPlayer = useAudioPlayer(audios.end);
  const previousStatus = useRef(status);
  // Read at resume time, not pause time — the user may mute mid-chime.
  const isMutedRef = useRef(isMuted);
  isMutedRef.current = isMuted;

  useEffect(() => {
    const justCompleted = previousStatus.current !== "completed" && status === "completed";
    previousStatus.current = status;
    if (!justCompleted) return;

    const wasThemePlaying = themePlayer.playing;
    if (wasThemePlaying) themePlayer.pause();

    const subscription = completionPlayer.addListener("playbackStatusUpdate", (playerStatus) => {
      if (!playerStatus.didJustFinish) return;
      subscription.remove();
      // Rewind for the next completion; doesn't block resuming the theme track.
      completionPlayer.seekTo(0);
      if (wasThemePlaying && !isMutedRef.current) themePlayer.play();
    });

    completionPlayer.play();

    return () => subscription.remove();
  }, [status, themePlayer, completionPlayer]);
}
