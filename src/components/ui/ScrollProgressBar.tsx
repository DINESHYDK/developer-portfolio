/**
 * ScrollProgressBar
 *
 * A 2px accent-colored line fixed at the very top of the viewport.
 * Fills left-to-right as the user scrolls down the page.
 * Uses Framer Motion useScroll + useSpring for a smooth, physics-based fill.
 * Zero layout impact — position: fixed, pointerEvents: none.
 */
import { useScroll, useSpring, motion } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "var(--color-accent-primary)",
        transformOrigin: "left",
        zIndex: 99998, // just below custom cursor (99999)
        pointerEvents: "none",
        boxShadow: "0 0 8px rgba(142, 202, 230, 0.5)",
      }}
    />
  );
};

export default ScrollProgressBar;