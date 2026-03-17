/**
 * SmoothCursor — outline triangle arrow, instant follow
 * Teal color (var(--color-accent-primary)), no fill, no lerp delay.
 * Hidden entirely on touch devices.
 */
import { useEffect, useRef } from "react";

const SmoothCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = cursorRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      el.style.opacity = "1";
    };

    const hide = () => { el.style.opacity = "0"; };
    const show = () => { el.style.opacity = "1"; };

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        pointerEvents: "none",
        zIndex: 99999,
        transform: "translate(-40px, -40px)",
        willChange: "transform",
        opacity: 0,
        transition: "opacity 0.15s ease",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 2L20 12L12 14L8 22L4 2Z"
          fill="none"
          stroke="var(--color-accent-primary)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default SmoothCursor;
