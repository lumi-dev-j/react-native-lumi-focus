import { create } from "zustand";

import { useSettingsStore } from "@/store/settingsStore";
import { TimerModeKey } from "@/types/timer";

export type TimerStatus = "idle" | "running" | "paused" | "completed";

type TimerState = {
  mode: TimerModeKey;
  status: TimerStatus;
  remainingSeconds: number;
  /** Epoch ms the countdown should hit 00:00 — only set while running. */
  endAt: number | null;
  selectMode: (mode: TimerModeKey) => void;
  toggle: () => void;
  tick: () => void;
};

function getDurationSeconds(mode: TimerModeKey) {
  return (useSettingsStore.getState().durations[mode] ?? 0) * 60;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  mode: "focus",
  status: "idle",
  remainingSeconds: getDurationSeconds("focus"),
  endAt: null,

  selectMode: (mode) => {
    set({ mode, status: "idle", remainingSeconds: getDurationSeconds(mode), endAt: null });
  },

  toggle: () => {
    const { status, mode, remainingSeconds, endAt } = get();

    if (status === "running") {
      const remaining = Math.max(0, Math.round(((endAt ?? Date.now()) - Date.now()) / 1000));
      set({ status: "paused", remainingSeconds: remaining, endAt: null });
      return;
    }

    if (status === "idle" || status === "completed") {
      const duration = getDurationSeconds(mode);
      set({ status: "running", remainingSeconds: duration, endAt: Date.now() + duration * 1000 });
      return;
    }

    // paused -> resume from the preserved remaining time
    set({ status: "running", endAt: Date.now() + remainingSeconds * 1000 });
  },

  tick: () => {
    const { status, endAt } = get();
    if (status !== "running" || endAt === null) return;

    const remaining = Math.max(0, Math.round((endAt - Date.now()) / 1000));
    if (remaining <= 0) {
      set({ status: "completed", remainingSeconds: 0, endAt: null });
    } else {
      set({ remainingSeconds: remaining });
    }
  },
}));

// Settings screen edits durations independently of the running timer. An
// idle session should reflect a new duration right away; a running or
// paused session must not jump mid-countdown, so only "idle" reacts here.
useSettingsStore.subscribe((state) => {
  const { mode, status } = useTimerStore.getState();
  if (status !== "idle") return;

  const durationSeconds = state.durations[mode] * 60;
  if (durationSeconds !== useTimerStore.getState().remainingSeconds) {
    useTimerStore.setState({ remainingSeconds: durationSeconds });
  }
});
