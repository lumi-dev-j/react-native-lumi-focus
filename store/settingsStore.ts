import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { timerModes } from "@/data/timerModes";
import { TimerModeKey } from "@/types/timer";

type DurationsByMode = Record<TimerModeKey, number>;

function getDefaultDurations(): DurationsByMode {
  return timerModes.reduce((durations, mode) => {
    durations[mode.key] = mode.durationMinutes;
    return durations;
  }, {} as DurationsByMode);
}

type SettingsState = {
  durations: DurationsByMode;
  setDuration: (mode: TimerModeKey, minutes: number) => void;
  resetToDefault: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      durations: getDefaultDurations(),

      setDuration: (mode, minutes) =>
        set((state) => ({ durations: { ...state.durations, [mode]: minutes } })),

      resetToDefault: () => set({ durations: getDefaultDurations() }),
    }),
    {
      name: "lumi-focus-settings",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
