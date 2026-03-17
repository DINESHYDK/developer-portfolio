import { useEffect, useState } from "react";
import "./splash-screen.css";

type SplashScreenProps = {
  onDone: () => void;
};

const TOTAL_DURATION = 2600; // ms
const EXIT_START = TOTAL_DURATION - 500;

const SplashScreen = ({ onDone }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"drawing" | "glow" | "exit">("drawing");

  useEffect(() => {
    const glowTimer = setTimeout(() => setPhase("glow"), 1800);
    const exitTimer = setTimeout(() => setPhase("exit"), EXIT_START);
    const doneTimer = setTimeout(() => onDone(), TOTAL_DURATION);

    return () => {
      clearTimeout(glowTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`splash-overlay ${phase === "exit" ? "splash-exit" : ""}`} aria-hidden="true">
      <div className={`splash-sig-wrapper ${phase}`}>
        <svg
          viewBox="0 0 420 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="splash-signature"
          aria-label="Dinesh YDK"
        >
          {/*
            This SVG spells "Dinesh YDK" in a flowing script/handwritten style.
            Each letter is a single continuous <path> element.
            stroke-dasharray and stroke-dashoffset are set equal to path length,
            then animated to 0 via CSS — creating the draw-in effect.

            IMPORTANT: Replace the paths below with an actual handwritten SVG of
            "Dinesh YDK". To generate:
            1. Write "Dinesh YDK" in a handwriting font (e.g. Dancing Script, Pacifico)
               in Figma or Inkscape
            2. Convert text to path (Object > Path > Object to Path in Inkscape)
            3. Export as SVG, paste the <path d="..."> elements here
            4. Remove any fill attributes — stroke only

            Placeholder paths below are approximate — replace with real letterforms.
          */}

          {/* "Dinesh" */}
          <path
            className="sig-path sig-path-1"
            d="M20 65 C20 40 28 20 38 20 C48 20 52 35 50 55 C48 70 42 75 38 75 C30 75 20 65 20 65 Z M50 55 L50 70"
            stroke="var(--color-accent-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="sig-path sig-path-2"
            d="M58 45 L58 72 M58 30 L58 35"
            stroke="var(--color-accent-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            className="sig-path sig-path-3"
            d="M68 55 C68 48 72 43 78 43 C86 43 88 52 85 60 C82 68 76 70 72 68 C68 65 68 60 70 58 C73 54 80 53 85 56"
            stroke="var(--color-accent-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            className="sig-path sig-path-4"
            d="M93 43 L88 72 M88 55 C88 55 93 48 100 48 C107 48 108 55 106 65 C104 72 100 75 96 73"
            stroke="var(--color-accent-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            className="sig-path sig-path-5"
            d="M113 55 C113 48 117 43 124 43 C131 43 133 50 130 57 L113 57 C112 63 115 70 124 70 C129 70 132 67 134 64"
            stroke="var(--color-accent-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            className="sig-path sig-path-6"
            d="M140 43 L140 72 M140 55 C143 48 150 43 156 46 C162 49 162 58 160 72"
            stroke="var(--color-accent-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Space + "YDK" — slightly larger, bolder feel */}
          <path
            className="sig-path sig-path-7"
            d="M178 38 L188 58 L198 38 M188 58 L188 75"
            stroke="var(--color-accent-primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            className="sig-path sig-path-8"
            d="M210 38 C210 38 210 75 210 75 M210 38 L228 55 M210 55 L228 75"
            stroke="var(--color-accent-primary)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            className="sig-path sig-path-9"
            d="M238 38 L238 75 M238 38 C245 38 255 42 256 57 C257 68 250 75 238 75"
            stroke="var(--color-accent-primary)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Underline flourish after signature */}
          <path
            className="sig-path sig-path-10"
            d="M18 82 C80 86 200 88 260 82"
            stroke="var(--color-accent-primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
            fill="none"
          />
        </svg>

        {/* Tagline fades in after signature */}
        <p className={`splash-tagline ${phase === "glow" || phase === "exit" ? "visible" : ""}`}>
          Full-Stack Developer
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;