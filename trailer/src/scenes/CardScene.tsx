import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SectionLabel } from "../components/SectionLabel";
import { C, CLICKS, MONO, SANS, SCENES } from "../theme";

/* Card geometry (absolute px) — the cursor targets CARD_CLICK */
export const CARD = { left: 1080, top: 210, width: 440, height: 630 };
export const CARD_CLICK = {
  x: CARD.left + CARD.width * 0.62,
  y: CARD.top + CARD.height * 0.42,
};

const STATS = [
  ["CP rating", "2033", "LeetCode"],
  ["Problems solved", "2,200+", ""],
  ["Projects shipped", "7", ""],
  ["College", "IIT (ISM) Dhanbad", ""],
] as const;

export const CardScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clickLocal = CLICKS.cardFlip - SCENES.card.from;

  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 120 } });
  const flip = spring({
    frame: frame - clickLocal,
    fps,
    config: { damping: 18, stiffness: 90 },
  });
  const exit = interpolate(frame, [158, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const caption = spring({ frame: frame - 96, fps, config: { damping: 200 } });

  const face: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: 24,
    backfaceVisibility: "hidden",
    overflow: "hidden",
    background: C.surface,
  };

  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      {/* left caption */}
      <div style={{ position: "absolute", left: 300, top: 360, width: 640 }}>
        <SectionLabel index="01" text="profile" delay={8} />
        <div
          style={{
            marginTop: 22,
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 88,
            lineHeight: 1.05,
            color: C.heading,
            opacity: interpolate(frame, [12, 26], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          One card.
          <br />
          <span style={{ color: C.cyan }}>Two sides.</span>
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: SANS,
            fontSize: 34,
            color: C.body,
            opacity: caption,
            transform: `translateY(${(1 - caption) * 16}px)`,
          }}
        >
          Flip it on the site for the numbers.
        </div>
      </div>

      {/* card */}
      <div
        style={{
          position: "absolute",
          ...CARD,
          perspective: 1600,
          opacity: enter,
          transform: `translateY(${(1 - enter) * 90}px) scale(${0.9 + enter * 0.1})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            transform: `rotateY(${flip * 180}deg)`,
          }}
        >
          {/* front */}
          <div
            style={{
              ...face,
              border: `2px solid ${C.cyan}`,
              boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
            }}
          >
            <Img
              src={staticFile("assets/profile.webp")}
              style={{ width: "100%", height: "78%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "22%",
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "0 24px",
                background: "rgba(10,10,15,0.92)",
                borderTop: `1px solid ${C.line}`,
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontFamily: MONO, fontSize: 26, color: C.heading }}
                >
                  @ydk
                </div>
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 20,
                    color: C.mint,
                    marginTop: 4,
                  }}
                >
                  Open to internships
                </div>
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontWeight: 700,
                  fontSize: 20,
                  color: C.bg,
                  background: C.cyan,
                  padding: "12px 18px",
                  borderRadius: 10,
                }}
              >
                Wanna talk?
              </div>
            </div>
          </div>

          {/* back */}
          <div
            style={{
              ...face,
              transform: "rotateY(180deg)",
              border: `2px solid ${C.mint}`,
              padding: 36,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 22,
                  color: C.body,
                  letterSpacing: 2,
                }}
              >
                DEVELOPER PROFILE
              </div>
              <Img
                src={staticFile("assets/iit-logo.svg")}
                style={{ width: 56, height: 56 }}
              />
            </div>
            <div style={{ height: 1, background: C.line, margin: "26px 0" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 30,
                flex: 1,
              }}
            >
              {STATS.map(([label, value, sub], i) => {
                const s = spring({
                  frame: frame - clickLocal - 14 - i * 5,
                  fps,
                  config: { damping: 200 },
                });
                return (
                  <div
                    key={label}
                    style={{
                      opacity: s,
                      transform: `translateX(${(1 - s) * -20}px)`,
                    }}
                  >
                    <div
                      style={{ fontFamily: SANS, fontSize: 20, color: C.body }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontFamily: SANS,
                        fontWeight: 700,
                        fontSize: value.length > 8 ? 32 : 46,
                        color: C.heading,
                      }}
                    >
                      {value}
                      {sub && (
                        <span
                          style={{
                            fontFamily: MONO,
                            fontSize: 20,
                            color: C.mint,
                            marginLeft: 12,
                          }}
                        >
                          [{sub}]
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 20,
                color: C.mint,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  background: C.mint,
                }}
              />
              Open to internships
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
