/**
 * Design tokens sourced from prompt_material/design_system.png.
 * Mirrors the Tailwind color theme registered in global.css — keep both in sync.
 */

export const colors = {
  primary: {
    lavender: "#B39DBF",
    peach: "#E9C4A8",
    sage: "#A8B99A",
    gold: "#F2D79B",
  },
  semantic: {
    success: "#A8B99A",
    warning: "#F2C77C",
    streak: "#B39DBF",
    error: "#E58C8C",
    info: "#8FA7C4",
  },
  neutral: {
    foreground: "#3A3A3A",
    mutedForeground: "#6F6F6F",
    border: "#D9D9D9",
    surface: "#FAF8F6",
    background: "#FFFDFB",
    ink: "#111311",
  },
  splash: {
    background: "#D9D0E2",
  },
  timer: {
    background: "#F3EFF6",
    surface: "#F8F5FA",
    surfaceSelected: "#EFEAF6",
    track: "#E7E2EE",
    purple: "#9785C6",
    ink: "#241C3D",
    muted: "#6F5F93",
  },
} as const;
