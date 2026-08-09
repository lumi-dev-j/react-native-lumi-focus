import { create } from "zustand";

import { defaultThemeId } from "@/data/themes";

type ThemeState = {
  themeId: string;
  selectTheme: (themeId: string) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  themeId: defaultThemeId,
  selectTheme: (themeId) => set({ themeId }),
}));
