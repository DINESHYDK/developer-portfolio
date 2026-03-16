import { useEffect, useState } from "react";
import "./splash-screen.css";

type SplashScreenProps = {
  onDone: () => void;
};

const SPLASH_DURATION = 2200; // ms total before exit begins
const EXIT_DURATION = 500;    // ms for fade-out animation

const SplashScreen = ({ onDone }: SplashScreenProps) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, SPLASH_DURATION - EXIT_DURATION);

    const doneTimer = setTimeout(() => {
      onDone();
    }, SPLASH_DURATION);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`splash-overlay${exiting ? " splash-exit" : ""}`} aria-hidden="true">
      {/* ID Card preview */}
      <div className={`splash-card${exiting ? " splash-card-exit" : ""}`}>
        {/* Avatar */}
        <div className="splash-avatar">YDK</div>

        {/* Name & role */}
        <div>
          <div className="splash-name">Y. Dinesh Krishna</div>
          <div className="splash-role">Full-Stack Developer</div>
        </div>

        <div className="splash-divider" />

        {/* Status */}
        <div className="splash-status">
          <span className="splash-status-dot" />
          Available for work
        </div>
      </div>

      {/* Loading text */}
      <p className="splash-loading-text">
        Loading portfolio
        <span className="splash-dots">
          <span />
          <span />
          <span />
        </span>
      </p>
    </div>
  );
};

export default SplashScreen;