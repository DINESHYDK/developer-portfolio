import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { SITE_METADATA } from "@/config/site-metadata";

import svgAbout1 from "@/assets/svg-about-1.svg?url";
import svgAbout2 from "@/assets/svg-about-2.svg?url";
import svgAbout3 from "@/assets/svg-about-3.svg?url";
import svgAbout4 from "@/assets/svg-about-4.svg?url";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
interface AboutBlock {
  id: string;
  heading: string;
  paragraphs: string[];
}

const ABOUT_SECTIONS: AboutBlock[] = [
  {
    id: "intro",
    heading: "Who am I?",
    paragraphs: [
      `I'm ${SITE_METADATA.name} — a full-stack developer who obsesses over the intersection of clean engineering and stunning visual design. I don't just build web apps, I build experiences that people remember.`,
      `My stack centres on React, TypeScript and the MERN ecosystem. I believe every pixel has a purpose, every millisecond matters, and every line of code is a signature.`,
    ],
  },
  {
    id: "journey",
    heading: "How it started.",
    paragraphs: [
      `It started with a curiosity — how does a website actually work? That question led me down a rabbit hole of HTML, CSS, JavaScript and eventually into the world of frameworks, compilers, and distributed systems.`,
      `Competitive programming sharpened the way I think. Solving problems on Codeforces and LeetCode rewired my brain to spot patterns, optimise solutions, and write code that scales.`,
      `The jump to full-stack was inevitable. Backend architecture, API design, and database modelling aren't just complementary — they are the foundation that makes great frontend possible.`,
    ],
  },
  {
    id: "projects",
    heading: "Projects that matter.",
    paragraphs: [
      `From AI-powered study platforms to real-time dashboards, I gravitate toward projects that mix technical depth with genuine usefulness. I am drawn to problems where UX and performance have to co-exist under pressure.`,
      `Every project in my portfolio was built to production standards — TypeScript strict mode, accessible markup, mobile-first responsive layouts, and optimised asset loading. No shortcuts.`,
    ],
  },
  {
    id: "now",
    heading: "Presently working on.",
    paragraphs: [
      `Building this portfolio — the one you are reading right now — as a living, breathing testament to what I can do. Scroll animations, real-time API integrations, a macOS-style terminal, orbital skills visualisation. Nothing is off limits.`,
      `Exploring backend architecture with Node.js, Express, and MongoDB, while keeping a sharp eye on what is happening in the AI tooling space. The next generation of developer tools fascinates me.`,
      `If you are reading this and thinking we should work together — you are probably right. Hit the Contact section.`,
    ],
  },
];

const SECTION_SVG_MAP: Record<string, string> = {
  intro:    svgAbout1,
  journey:  svgAbout2,
  projects: svgAbout3,
  now:      svgAbout4,
};

/* ─────────────────────────────────────────────
   Word-by-word scrub
───────────────────────────────────────────── */
const AnimatedWord = ({
  word, progress, from, to,
}: {
  word: string;
  progress: MotionValue<number>;
  from: number;
  to: number;
}) => {
  const opacity = useTransform(progress, [from, to], [0.25, 1]);
  const color   = useTransform(progress, [from, to], ["rgb(100,116,139)", "rgb(255,255,255)"]);
  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.3em]">
      {word}
    </motion.span>
  );
};

const ScrubbedParagraph = ({
  text, progress, globalStart, globalEnd,
}: {
  text: string;
  progress: MotionValue<number>;
  globalStart: number;
  globalEnd: number;
}) => {
  const words = text.split(" ");
  return (
    <p className="font-jakarta text-lg md:text-xl leading-[1.85] mb-6">
      {words.map((word, wi) => {
        const t    = wi / words.length;
        const from = globalStart + t * (globalEnd - globalStart);
        const to   = Math.min(from + (globalEnd - globalStart) / words.length + 0.005, 1);
        return <AnimatedWord key={wi} word={word} progress={progress} from={from} to={to} />;
      })}
    </p>
  );
};

/* ─────────────────────────────────────────────
   SVG Swap — conic-gradient animated border
   borderRef owned by parent, updated via direct DOM
───────────────────────────────────────────── */
const AboutSvgSwap = ({
  activeId,
  borderRef,
}: {
  activeId: string;
  borderRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [displayed, setDisplayed]         = useState(activeId);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isAnimating = useRef(false);
  const pendingId   = useRef<string | null>(null);

  const runSwap = useCallback((targetId: string) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsTransitioning(true);

    setTimeout(() => {
      setDisplayed(targetId);
      setIsTransitioning(false);
      setTimeout(() => {
        isAnimating.current = false;
        if (pendingId.current && pendingId.current !== targetId) {
          const next = pendingId.current;
          pendingId.current = null;
          runSwap(next);
        } else {
          pendingId.current = null;
        }
      }, 350);
    }, 280);
  }, []);

  useEffect(() => {
    if (activeId === displayed) return;
    if (isAnimating.current) {
      pendingId.current = activeId;
    } else {
      runSwap(activeId);
    }
  }, [activeId, displayed, runSwap]);

  return (
    /* Outer dim ring — always visible as background track */
    <div
      style={{
        width: "100%",
        borderRadius: "18px",
        padding: "2px",
        background: "rgba(255,255,255,0.05)",
        // Reduced from "0 0 32px 6px" — ambient only, not a spotlight
        boxShadow: "0 0 12px 1px rgba(142, 202, 230, 0.08)",
      }}
    >
      {/* Conic-gradient fill ring — updated via JS ref (zero re-renders) */}
      <div
        ref={borderRef}
        style={{
          borderRadius: "16px",
          padding: "2px",
          background: "conic-gradient(from -90deg, var(--color-accent-primary) 0deg, rgba(255,255,255,0.04) 0deg)",
        }}
      >
        {/* Image well */}
        <div style={{ borderRadius: "14px", overflow: "hidden", background: "#0A0A0F" }}>
          <img
            src={SECTION_SVG_MAP[displayed]}
            alt={displayed}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              opacity: isTransitioning ? 0 : 1,
              transition: "opacity 0.28s ease",
            }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Sub-section — sticky-scroll pattern
   ─ Outer div: tall (180vh) scroll container, position: relative
   ─ Inner sticky div: position: sticky; top: 100px — card stays FIXED
     while the user scrolls through the outer container
   ─ useScroll targets the outer container so scrollYProgress drives
     the word-scrub while the card doesn't move
   ─ Only rendered when unlocked → no phantom space while locked
───────────────────────────────────────────── */
const AboutSubSection = ({
  block,
  index,
  sectionRef,
  onScrollProgress,
}: {
  block: AboutBlock;
  index: number;
  sectionRef: (el: HTMLDivElement | null) => void;
  onScrollProgress: (index: number, progress: number) => void;
}) => {
  const outerRef  = useRef<HTMLDivElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);
  const [cardVisible, setCardVisible] = useState(false);

  // Target the OUTER tall container — progress drives word scrub,
  // but the card itself never moves (it's sticky inside the outer div)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start 60%", "end 40%"],
  });

  const smoothed = useSpring(scrollYProgress, { stiffness: 80, damping: 22, restDelta: 0.001 });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => onScrollProgress(index, v));
  }, [scrollYProgress, onScrollProgress, index]);

  // Mobile card entrance — IO-triggered; desktop always visible
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      setCardVisible(true);
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCardVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const totalWords = block.paragraphs.reduce((s, p) => s + p.split(" ").length, 0);
  let wordOffset = 0;

  return (
    /*
      Outer: tall scroll container — gives the page scroll room
      while the sticky card below stays visually static
    */
    <div
      ref={(el) => {
        (outerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        sectionRef(el);
      }}
      className="about-section-outer"
      data-section={block.id}
    >
      {/* Inner sticky: card is pinned here while outer container scrolls past */}
      <motion.div
        ref={cardRef}
        className="about-section-sticky"
        animate={cardVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="about-section-card">
          <h3 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-8 leading-tight">
            <span className="relative inline-block pb-2">
              {block.heading}
              <motion.span
                className="absolute bottom-0 left-0 h-1 w-full bg-accent-primary rounded-full origin-left"
                animate={{ scaleX: cardVisible ? 1 : 0 }}
                initial={{ scaleX: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 28, delay: 0.25 }}
              />
            </span>
          </h3>

          <div className="flex flex-col gap-1">
            {block.paragraphs.map((para, pi) => {
              const wordsInPara = para.split(" ").length;
              const globalStart = wordOffset / totalWords;
              wordOffset       += wordsInPara;
              const globalEnd   = wordOffset / totalWords;
              return (
                <ScrubbedParagraph
                  key={pi}
                  text={para}
                  progress={smoothed}
                  globalStart={globalStart}
                  globalEnd={globalEnd}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Export
───────────────────────────────────────────── */
const AboutSection = () => {
  const [activeId, setActiveId]           = useState(ABOUT_SECTIONS[0].id);
  const [unlockedCount, setUnlockedCount] = useState(1);

  const sectionRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const borderRef    = useRef<HTMLDivElement | null>(null);
  const activeIdxRef = useRef(0);

  // Re-setup IntersectionObserver every time a new section unlocks
  // (only rendered sections are in the DOM)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.section;
            if (id) {
              const idx = ABOUT_SECTIONS.findIndex((s) => s.id === id);
              activeIdxRef.current = idx;
              setActiveId(id);
              // Reset border fill for incoming section
              const el = borderRef.current;
              if (el) {
                el.style.background =
                  "conic-gradient(from -90deg, var(--color-accent-primary) 0deg, rgba(255,255,255,0.04) 0deg)";
              }
            }
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -20% 0px" }
    );

    sectionRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [unlockedCount]); // re-run when new sections are added to DOM

  // Per-section scroll progress → border fill + unlock next
  const handleScrollProgress = useCallback((index: number, progress: number) => {
    if (index === activeIdxRef.current) {
      const el = borderRef.current;
      if (el) {
        const deg = Math.min(progress * 360, 360);
        el.style.background = `conic-gradient(from -90deg, var(--color-accent-primary) ${deg}deg, rgba(255,255,255,0.04) 0deg)`;
      }
    }

    // Unlock next section at 80% — slightly earlier on mobile's faster scroll travel
    if (progress >= 0.80) {
      setUnlockedCount((prev) => Math.max(prev, index + 2));
    }
  }, []);

  // Only render sections that have been unlocked — locked sections are NOT in the DOM
  const visibleSections = ABOUT_SECTIONS.slice(0, unlockedCount);

  return (
    <section id="about" className="py-24 bg-bg-primary relative">
      {/* Section heading */}
      <div className="text-center mb-16 md:mb-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="font-poppins text-3xl md:text-5xl font-bold text-text-heading mb-4"
        >
          About <span className="text-accent-primary">Me</span>
        </motion.h2>
        <div className="w-16 h-1 bg-accent-primary mx-auto rounded-full" />
      </div>

      {/* Sticky wrapper */}
      <div className="about-sticky-wrapper">

        {/* LEFT — sticky SVG panel */}
        <div className="about-left-sticky">
          <AboutSvgSwap activeId={activeId} borderRef={borderRef} />
        </div>

        {/* RIGHT — only unlocked sections in DOM, no locked placeholders */}
        <div className="about-right-scroll">
          {visibleSections.map((block, i) => (
            <AboutSubSection
              key={block.id}
              block={block}
              index={i}
              sectionRef={(el) => { sectionRefs.current[i] = el; }}
              onScrollProgress={handleScrollProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;