import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadFira } from "@remotion/google-fonts/FiraCode";
import { loadFont as loadBebas } from "@remotion/google-fonts/BebasNeue";

export const SANS = loadJakarta("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
}).fontFamily;
export const MONO = loadFira("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
}).fontFamily;
export const DISPLAY = loadBebas("normal", {
  weights: ["400"],
  subsets: ["latin"],
}).fontFamily;

/* Same palette as the site (src/index.css) */
export const C = {
  bg: "#0A0A0F",
  surface: "#12121A",
  cyan: "#8ECAE6",
  mint: "#A7F3D0",
  body: "#94A3B8",
  heading: "#FFFFFF",
  line: "rgba(255,255,255,0.08)",
} as const;

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/* Scene timeline (frames). One beat = 15 frames (120 BPM). */
export const SCENES = {
  terminal: { from: 0, duration: 120 }, // 0–4 s
  name: { from: 120, duration: 150 }, // 4–9 s   (beat drops at 4 s)
  card: { from: 270, duration: 180 }, // 9–15 s
  stats: { from: 450, duration: 210 }, // 15–22 s
  projects: { from: 660, duration: 270 }, // 22–31 s
  outro: { from: 930, duration: 150 }, // 31–36 s
} as const;

export const TOTAL_FRAMES = 1080;

/* Every click sound, in absolute frames. Cursor presses use the same numbers. */
export const CLICKS = {
  terminalRun: 34,
  terminalEnter: 92,
  cardFlip: SCENES.card.from + 66,
  stats: [0, 1, 2, 3].map((i) => SCENES.stats.from + 20 + i * 30),
  projects: [0, 1, 2, 3, 4].map((i) => SCENES.projects.from + i * 54),
  outroVisit: SCENES.outro.from + 84,
};

/* Terminal typing: one soft key tick per character */
export const TYPING = {
  first: { text: "whoami", start: 6, every: 3 },
  second: { text: "open portfolio", start: 60, every: 2 },
};
export const KEY_TICK_FRAMES: number[] = [TYPING.first, TYPING.second].flatMap(
  (t) => Array.from(t.text, (_, i) => t.start + i * t.every),
);

export const ALL_CLICK_FRAMES: number[] = [
  CLICKS.terminalRun,
  CLICKS.terminalEnter,
  CLICKS.cardFlip,
  ...CLICKS.stats,
  ...CLICKS.projects,
  CLICKS.outroVisit,
];
