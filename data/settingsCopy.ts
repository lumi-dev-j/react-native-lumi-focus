import { TimerModeKey } from "@/types/timer";

type SettingsCopy = {
  rowTitle: string;
  rowCaption: string;
  editorTitle: string;
  editorCaption: string;
};

export const settingsCopy: Record<TimerModeKey, SettingsCopy> = {
  focus: {
    rowTitle: "Focus duration",
    rowCaption: "How long your focus session lasts",
    editorTitle: "Focus duration",
    editorCaption: "Choose how long your focus session lasts.",
  },
  shortBreak: {
    rowTitle: "Short break",
    rowCaption: "How long your short break lasts",
    editorTitle: "Short break duration",
    editorCaption: "Choose how long your short break lasts.",
  },
  longBreak: {
    rowTitle: "Long break",
    rowCaption: "How long your long break lasts",
    editorTitle: "Long break duration",
    editorCaption: "Choose how long your long break lasts.",
  },
};
