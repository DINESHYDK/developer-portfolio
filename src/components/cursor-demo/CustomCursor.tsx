import { useEffect, useRef } from "react";
import "./custom-cursor.css";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const LERP = 0.12;

    // Lerp loop for the outer ring
    const loop = () => {
      ringX += (mouseX - ringX) * LERP;
      ringY += (mouseY - ringY) * LERP;

      dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
      ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseDown = () => {
      dot.classList.add("is-clicking");
      ring.classList.add("is-clicking");
    };

    const onMouseUp = () => {
      dot.classList.remove("is-clicking");
      ring.classList.remove("is-clicking");
    };

    const onMouseEnter = () => {
      dot.classList.add("is-hovering");
      ring.classList.add("is-hovering");
    };

    const onMouseLeave = () => {
      dot.classList.remove("is-hovering");
      ring.classList.remove("is-hovering");
    };

    // Delegate hover detection via event delegation
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [data-cursor-hover]')) {
        onMouseEnter();
      } else {
        onMouseLeave();
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  // Don't render on touch devices (SSR-safe check via CSS)
  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;