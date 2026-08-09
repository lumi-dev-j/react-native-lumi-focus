import { create } from "zustand";

type SoundState = {
  isMuted: boolean;
  toggleMuted: () => void;
};

export const useSoundStore = create<SoundState>((set) => ({
  isMuted: false,
  toggleMuted: () => set((state) => ({ isMuted: !state.isMuted })),
}));
