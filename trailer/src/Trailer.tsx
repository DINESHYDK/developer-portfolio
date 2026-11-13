import {
  AbsoluteFill,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Audio } from "@remotion/media";
import { Cursor, type CursorTrack } from "./components/Cursor";
import { CardScene, CARD_CLICK } from "./scenes/CardScene";
import { NameScene } from "./scenes/NameScene";
import { OutroScene, VISIT_BTN } from "./scenes/OutroScene";
import { ProjectsScene } from "./scenes/ProjectsScene";
import { StatsScene } from "./scenes/StatsScene";
import { RUN_BTN_CENTER, TerminalScene } from "./scenes/TerminalScene";
import {
  ALL_CLICK_FRAMES,
  C,
  CLICKS,
  KEY_TICK_FRAMES,
  SCENES,
  TOTAL_FRAMES,
} from "./theme";

/* Cursor paths (absolute frames). The last key of each track lands on its press. */
const CURSOR_TRACKS: CursorTrack[] = [
  {
    keys: [
      { frame: 10, x: 1560, y: 940 },
      {
        frame: CLICKS.terminalRun - 2,
        x: RUN_BTN_CENTER.x,
        y: RUN_BTN_CENTER.y,
      },
      { frame: 80, x: RUN_BTN_CENTER.x + 120, y: RUN_BTN_CENTER.y + 150 },
    ],
    presses: [CLICKS.terminalRun],
  },
  {
    keys: [
      { frame: SCENES.card.from + 24, x: 1700, y: 980 },
      { frame: CLICKS.cardFlip - 2, x: CARD_CLICK.x, y: CARD_CLICK.y },
      { frame: CLICKS.cardFlip + 40, x: 1700, y: 900 },
    ],
    presses: [CLICKS.cardFlip],
  },
  {
    keys: [
      { frame: SCENES.outro.from + 44, x: 1500, y: 1040 },
      {
        frame: CLICKS.outroVisit - 2,
        x: VISIT_BTN.x + 120,
        y: VISIT_BTN.y + 6,
      },
      {
        frame: SCENES.outro.from + 128,
        x: VISIT_BTN.x + 150,
        y: VISIT_BTN.y + 40,
      },
    ],
    presses: [CLICKS.outroVisit],
  },
];

/* 2px bar across the top, like the scroll progress bar on the site */
const ProgressBar = () => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [0, TOTAL_FRAMES - 1], [0, 1920]);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: 4,
        width: w,
        background: C.cyan,
        opacity: 0.8,
      }}
    />
  );
};

export const Trailer = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {/* soft vignette so the frame doesn't feel flat */}
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, rgba(142,202,230,0.06), transparent 60%)",
      }}
    />

    <Sequence
      from={SCENES.terminal.from}
      durationInFrames={SCENES.terminal.duration}
      name="Terminal"
    >
      <TerminalScene />
    </Sequence>
    <Sequence
      from={SCENES.name.from}
      durationInFrames={SCENES.name.duration}
      name="Name"
    >
      <NameScene />
    </Sequence>
    <Sequence
      from={SCENES.card.from}
      durationInFrames={SCENES.card.duration}
      name="ID card"
    >
      <CardScene />
    </Sequence>
    <Sequence
      from={SCENES.stats.from}
      durationInFrames={SCENES.stats.duration}
      name="Stats"
    >
      <StatsScene />
    </Sequence>
    <Sequence
      from={SCENES.projects.from}
      durationInFrames={SCENES.projects.duration}
      name="Projects"
    >
      <ProjectsScene />
    </Sequence>
    <Sequence
      from={SCENES.outro.from}
      durationInFrames={SCENES.outro.duration}
      name="Outro"
    >
      <OutroScene />
    </Sequence>

    <Cursor tracks={CURSOR_TRACKS} />
    <ProgressBar />

    {/* ── audio ── */}
    <Audio src={staticFile("audio/music.wav")} volume={0.75} />
    {ALL_CLICK_FRAMES.map((f) => (
      <Sequence key={`c${f}`} from={f} durationInFrames={6} name="click">
        <Audio src={staticFile("audio/click.wav")} volume={0.9} />
      </Sequence>
    ))}
    {KEY_TICK_FRAMES.map((f) => (
      <Sequence key={`k${f}`} from={f} durationInFrames={4} name="key">
        <Audio src={staticFile("audio/click.wav")} volume={0.25} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
