import { useEffect, useRef } from "react";
import "./splash-screen.css";

type SplashScreenProps = {
  onDone: () => void;
};

const SplashScreen = ({ onDone }: SplashScreenProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sigWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll so footer underneath can't be seen during splash
    document.body.style.overflow = "hidden";

    // Glow fires after smiley + underline complete (~5.7s)
    const glowTimer = setTimeout(() => {
      sigWrapRef.current?.classList.add("glow");
    }, 5700);

    // Exit animation starts at 6.5s
    const exitTimer = setTimeout(() => {
      overlayRef.current?.classList.add("splash-exiting");
    }, 6500);

    // Scroll to top before handing off — prevents browser restoring a stale scroll position
    const doneTimer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      onDone();
    }, 8000);

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      clearTimeout(glowTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div ref={overlayRef} className="splash-overlay" aria-hidden="true">

      {/* ── Signature ── */}
      <div ref={sigWrapRef} className="splash-sig-wrap" id="sigWrap">
        <svg viewBox="0 0 800 430" xmlns="http://www.w3.org/2000/svg">

          {/* "Dinesh" draws first */}
          <text x="80" y="200" className="sig-dinesh">Dinesh</text>

          {/* "Krishna" draws after Dinesh */}
          <text x="260" y="360" className="sig-krishna">Krishna</text>

          {/*
            Smiley flourish — opacity:0 keeps it invisible until its
            animation fires at 4.25s (after Krishna finishes at ~4.2s).
            Three arcs: two eyebrow curves + one smile curve.
          */}
          <path
            className="sig-smiley"
            d="M 600,185 Q 612,178 624,185
               M 650,178 Q 662,172 674,178
               M 612,215 Q 637,248 664,210"
          />

          {/* Green underline sweep — fires after smiley at 4.85s */}
          <path
            className="sig-underline"
            d="M 75,390 Q 250,430 450,415 Q 600,400 720,370"
          />

        </svg>
      </div>

      {/* ── Bottom loader ── */}
      <div className="splash-bottom">
        <p className="splash-tagline">
          Taking you into my creation
          <span className="splash-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>

        {/* 17 green outlined boxes, fill left to right */}
        <div className="splash-boxes">
          {Array.from({ length: 17 }).map((_, i) => (
            <div key={i} className="splash-box" />
          ))}
        </div>
      </div>

    </div>
  );
};

export default SplashScreen;
