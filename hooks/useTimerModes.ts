import { timerModes } from "@/data/timerModes";
import { useSettingsStore } from "@/store/settingsStore";
import { TimerMode } from "@/types/timer";

// Merges static mode metadata (label, caption, icon) with the user's
// customized durations, so screens always read the live duration.
export function useTimerModes(): TimerMode[] {
  const durations = useSettingsStore((state) => state.durations);
  return timerModes.map((mode) => ({ ...mode, durationMinutes: durations[mode.key] }));
}
