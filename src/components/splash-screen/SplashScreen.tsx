import { useEffect } from "react";
import { motion } from "framer-motion";
import "./splash-screen.css";

type SplashScreenProps = {
  onDone: () => void;
};

const SPLASH_DURATION = 2400; // ms before onDone fires

const fadeUp = (delay: number) => ({
  initial:    { opacity: 0, y: 10 } as const,
  animate:    { opacity: 1, y: 0  } as const,
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

const SplashScreen = ({ onDone }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(onDone, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="splash-overlay"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
    >
      {/* ID Card */}
      <motion.div
        className="splash-card"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {/* Avatar */}
        <motion.div className="splash-avatar" {...fadeUp(0.10)}>
          YDK
        </motion.div>

        {/* Name & role */}
        <div>
          <motion.div className="splash-name" {...fadeUp(0.22)}>
            Y. Dinesh Krishna
          </motion.div>
          <motion.div className="splash-role" {...fadeUp(0.34)}>
            Full-Stack Developer
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="splash-divider"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.46, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />

        {/* Status */}
        <motion.div className="splash-status" {...fadeUp(0.58)}>
          <span className="splash-status-dot" />
          Available for work
        </motion.div>

        {/* Progress bar */}
        <div className="splash-progress-track">
          <motion.div
            className="splash-progress-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.7, delay: 0.5, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.p className="splash-loading-text" {...fadeUp(0.75)}>
        Loading portfolio
        <span className="splash-dots">
          <span />
          <span />
          <span />
        </span>
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;
