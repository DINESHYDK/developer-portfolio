import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, CLICKS, MONO, TYPING } from "../theme";

/* Layout (absolute px) — also used by the cursor track in Trailer.tsx */
export const TERM = { left: 410, top: 250, width: 1100, height: 580 };
export const RUN_BTN = {
  left: TERM.left + TERM.width - 196,
  top: TERM.top + TERM.height - 92,
  width: 156,
  height: 56,
};
export const RUN_BTN_CENTER = {
  x: RUN_BTN.left + RUN_BTN.width / 2,
  y: RUN_BTN.top + RUN_BTN.height / 2,
};

const typed = (
  frame: number,
  t: { text: string; start: number; every: number },
) => {
  const n = Math.floor((frame - t.start) / t.every) + 1;
  return t.text.slice(0, Math.max(0, Math.min(t.text.length, n)));
};

const Prompt = () => (
  <span>
    <span style={{ color: C.mint }}>guest@ydk-portfolio</span>
    <span style={{ color: C.body }}> ~ % </span>
  </span>
);

export const TerminalScene = () => {
  const frame = useCurrentFrame();

  const enter = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  // Exit: the window zooms toward the viewer and fades, handing over to the name reveal
  const exit = interpolate(frame, [98, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(enter, [0, 1], [0.96, 1]) + exit * 0.5;
  const opacity = enter * (1 - exit);

  const caretOn = Math.floor(frame / 8) % 2 === 0;
  const first = typed(frame, TYPING.first);
  const second = typed(frame, TYPING.second);
  const showOut1 = frame >= CLICKS.terminalRun + 6;
  const showOut2 = frame >= CLICKS.terminalRun + 16;
  const secondActive = frame >= TYPING.second.start - 4;
  const showLoading = frame >= CLICKS.terminalEnter + 2;

  const runPress =
    frame >= CLICKS.terminalRun && frame < CLICKS.terminalRun + 6;

  const line: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: 30,
    lineHeight: 1.7,
    color: "#E2E8F0",
    whiteSpace: "pre",
  };

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          ...TERM,
          borderRadius: 18,
          background: "#0D1117",
          border: `1px solid rgba(142,202,230,0.18)`,
          boxShadow: "0 40px 120px rgba(0,0,0,0.55)",
          overflow: "hidden",
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {/* title bar */}
        <div
          style={{
            height: 52,
            background: "#161B22",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 20px",
            borderBottom: "1px solid rgba(142,202,230,0.1)",
          }}
        >
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div
              key={c}
              style={{ width: 16, height: 16, borderRadius: 8, background: c }}
            />
          ))}
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily: MONO,
              fontSize: 20,
              color: C.body,
              marginRight: 70,
            }}
          >
            terminal — ydk
          </div>
        </div>

        <div style={{ padding: "28px 36px" }}>
          <div style={line}>
            <Prompt />
            {first}
            {!secondActive && !showOut1 && caretOn && (
              <span style={{ color: C.cyan }}>▌</span>
            )}
          </div>
          {showOut1 && (
            <div style={{ ...line, color: C.heading, fontSize: 34 }}>
              Dinesh Krishna
            </div>
          )}
          {showOut2 && (
            <div style={{ ...line, color: C.body }}>
              CSE · IIT (ISM) Dhanbad · 2,200+ problems solved
            </div>
          )}
          {secondActive && (
            <div style={line}>
              <Prompt />
              {second}
              {!showLoading && caretOn && (
                <span style={{ color: C.cyan }}>▌</span>
              )}
            </div>
          )}
          {showLoading && (
            <div style={{ ...line, color: C.cyan }}>opening…</div>
          )}
        </div>

        {/* run button (clicked by the cursor) */}
        <div
          style={{
            position: "absolute",
            left: RUN_BTN.left - TERM.left,
            top: RUN_BTN.top - TERM.top,
            width: RUN_BTN.width,
            height: RUN_BTN.height,
            borderRadius: 10,
            border: `1px solid ${runPress ? C.cyan : "rgba(255,255,255,0.14)"}`,
            background: runPress ? "rgba(142,202,230,0.18)" : "transparent",
            transform: `scale(${runPress ? 0.94 : 1})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: MONO,
            fontSize: 24,
            color: runPress ? C.cyan : C.body,
          }}
        >
          ↵ run
        </div>
      </div>
    </AbsoluteFill>
  );
};
