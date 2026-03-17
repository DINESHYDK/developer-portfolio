/**
 * AboutSvgCharacter
 *
 * Seated developer illustration — inline SVG via ?raw import (Vite native).
 * Scroll-triggered: fade + slide-up on first viewport entry (one-time).
 * Hidden on mobile via CSS.
 */

import { useEffect, useRef } from "react";
import devCharacterRaw from "@/assets/dev-character-about.svg?raw";

const ABOUT_SVG_STYLES = `
  .about-svg-col {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .about-svg-col svg {
    width: 100%;
    max-width: 360px;
    height: auto;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.2, 0.64, 1);
  }

  .about-svg-col.svg-visible svg {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .about-svg-col {
      display: none !important;
    }
  }
`;

const AboutSvgCharacter = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("svg-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{ABOUT_SVG_STYLES}</style>
      {/* Safe: SVG is authored by us, not user input */}
      <div
        ref={containerRef}
        className="about-svg-col"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: devCharacterRaw }}
      />
    </>
  );
};

export default AboutSvgCharacter;