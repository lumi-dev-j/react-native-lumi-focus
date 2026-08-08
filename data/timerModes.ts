import { TimerMode } from "@/types/timer";

export const timerModes: TimerMode[] = [
  {
    key: "focus",
    label: "Focus",
    durationMinutes: 25,
    caption: "Good things take time.",
    icon: { set: "materialCommunityIcons", name: "food-apple-outline" },
  },
  {
    key: "shortBreak",
    label: "Short Break",
    durationMinutes: 5,
    caption: "Stretch, breathe, relax.",
    icon: { set: "ionicons", name: "cafe-outline" },
  },
  {
    key: "longBreak",
    label: "Long Break",
    durationMinutes: 15,
    caption: "You've earned a longer rest.",
    icon: { set: "materialCommunityIcons", name: "sofa-outline" },
  },
];
