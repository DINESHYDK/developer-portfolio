/** "smooth" unless the user has asked the OS for reduced motion. */
export const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
