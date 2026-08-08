export type TimerModeKey = "focus" | "shortBreak" | "longBreak";

export type TimerModeIcon = {
  set: "ionicons" | "materialCommunityIcons";
  name: string;
};

export type TimerMode = {
  key: TimerModeKey;
  label: string;
  durationMinutes: number;
  caption: string;
  icon: TimerModeIcon;
};
