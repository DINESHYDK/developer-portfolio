import { interpolate, useCurrentFrame } from "remotion";
import { C, MONO } from "../theme";

/** "02 / profile" — the mono label pattern from the site's About section */
export const SectionLabel = ({
  index,
  text,
  delay = 0,
}: {
  index: string;
  text: string;
  delay?: number;
}) => {
  const frame = useCurrentFrame() - delay;
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame, [0, 12], [-16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: 26,
        color: C.mint,
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      {index} <span style={{ color: C.body }}>/ {text}</span>
    </div>
  );
};
