import { Easing, interpolate, useCurrentFrame } from "remotion";
import { C } from "../theme";

export type CursorKey = { frame: number; x: number; y: number };
export type CursorTrack = { keys: CursorKey[]; presses: number[] };

/* Tip of the triangle sits at (6, 3) inside the 36px SVG */
const TIP_X = 6;
const TIP_Y = 3;

/**
 * The site's outline-triangle cursor. Moves between keyframes with an
 * ease-in-out curve, fades in/out at the ends of its track, and squashes
 * slightly on every press.
 */
export const Cursor = ({ tracks }: { tracks: CursorTrack[] }) => {
  const frame = useCurrentFrame();
  const track = tracks.find(
    (t) =>
      frame >= t.keys[0].frame - 6 &&
      frame <= t.keys[t.keys.length - 1].frame + 8,
  );
  if (!track) return null;

  const { keys, presses } = track;
  const first = keys[0];
  const last = keys[keys.length - 1];
  const frames = keys.map((k) => k.frame);
  const ease = {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  } as const;

  // Piecewise-eased position: find the segment we're in
  let x = first.x;
  let y = first.y;
  for (let i = 0; i < keys.length - 1; i++) {
    if (frame >= keys[i].frame && frame <= keys[i + 1].frame) {
      x = interpolate(
        frame,
        [keys[i].frame, keys[i + 1].frame],
        [keys[i].x, keys[i + 1].x],
        ease,
      );
      y = interpolate(
        frame,
        [keys[i].frame, keys[i + 1].frame],
        [keys[i].y, keys[i + 1].y],
        ease,
      );
    }
  }
  if (frame > last.frame) {
    x = last.x;
    y = last.y;
  }

  const opacity = interpolate(
    frame,
    [
      first.frame - 6,
      first.frame,
      Math.max(...frames),
      Math.max(...frames) + 8,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const pressScale = presses.reduce((s, p) => {
    const d = frame - p;
    if (d < 0 || d > 8) return s;
    return Math.min(s, interpolate(d, [0, 2, 8], [1, 0.78, 1]));
  }, 1);

  // Ring that expands from the tip on press
  const ring = presses.map((p) => frame - p).find((d) => d >= 0 && d <= 14);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {ring !== undefined && (
        <div
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: 80,
            height: 80,
            marginLeft: -40,
            marginTop: -40,
            borderRadius: "50%",
            border: `2px solid ${C.cyan}`,
            opacity: interpolate(ring, [0, 14], [0.8, 0]),
            transform: `scale(${interpolate(ring, [0, 14], [0.2, 1.3])})`,
          }}
        />
      )}
      <svg
        width={36}
        height={36}
        viewBox="0 0 24 24"
        style={{
          position: "absolute",
          left: x - TIP_X,
          top: y - TIP_Y,
          opacity,
          transform: `scale(${pressScale})`,
          transformOrigin: `${TIP_X}px ${TIP_Y}px`,
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))",
        }}
      >
        <path
          d="M4 2L20 12L12 14L8 22L4 2Z"
          fill={C.bg}
          stroke={C.cyan}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
