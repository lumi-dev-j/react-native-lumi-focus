import { useEffect } from "react";

import { useTimerStore } from "@/store/timerStore";

// Drives the countdown while the timer is running. Ticks derive the
// remaining time from the stored end timestamp (see timerStore), so a
// stalled interval — e.g. the app backgrounding briefly — can't cause drift.
export function useTimerCountdown() {
  const status = useTimerStore((state) => state.status);
  const tick = useTimerStore((state) => state.tick);

  useEffect(() => {
    if (status !== "running") return;

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [status, tick]);
}
