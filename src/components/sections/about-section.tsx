import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { SITE_METADATA } from "@/config/site-metadata";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
interface AboutBlock {
  id: string;
  label: string;
  heading: string;
  paragraphs: string[];
}

const ABOUT_SECTIONS: AboutBlock[] = [
  {
    id: "intro",
    label: "Introduction",
    heading: "Who am I?",
    paragraphs: [
      `I'm ${SITE_METADATA.name} — a full-stack developer who obsesses over the intersection of clean engineering and stunning visual design. I don't just build web apps, I build experiences that people remember.`,
      `My stack centres on React, TypeScript and the MERN ecosystem. I believe every pixel has a purpose, every millisecond matters, and every line of code is a signature.`,
    ],
  },
  {
    id: "journey",
    label: "Coding Journey",
    heading: "How it started.",
    paragraphs: [
      `It started with a curiosity — how does a website actually work? That question led me down a rabbit hole of HTML, CSS, JavaScript and eventually into the world of frameworks, compilers, and distributed systems.`,
      `Competitive programming sharpened the way I think. Solving problems on Codeforces and LeetCode rewired my brain to spot patterns, optimise solutions, and write code that scales.`,
      `The jump to full-stack was inevitable. Backend architecture, API design, and database modelling aren't just complementary — they are the foundation that makes great frontend possible.`,
    ],
  },
  {
    id: "projects",
    label: "What I Build",
    heading: "Projects that matter.",
    paragraphs: [
      `From AI-powered study platforms to real-time dashboards, I gravitate toward projects that mix technical depth with genuine usefulness. I am drawn to problems where UX and performance have to co-exist under pressure.`,
      `Every project in my portfolio was built to production standards — TypeScript strict mode, accessible markup, mobile-first responsive layouts, and optimised asset loading. No shortcuts.`,
    ],
  },
  {
    id: "now",
    label: "Right Now",
    heading: "Presently working on.",
    paragraphs: [
      `Building this portfolio — the one you are reading right now — as a living, breathing testament to what I can do. Scroll animations, real-time API integrations, a macOS-style terminal, orbital skills visualisation. Nothing is off limits.`,
      `Exploring backend architecture with Node.js, Express, and MongoDB, while keeping a sharp eye on what is happening in the AI tooling space. The next generation of developer tools fascinates me.`,
      `If you are reading this and thinking we should work together — you are probably right. Hit the Contact section.`,
    ],
  },
];

/* ─────────────────────────────────────────────
   Word-by-word scrub
───────────────────────────────────────────── */
const AnimatedWord = ({
                        word,
                        progress,
                        from,
                        to,
                      }: {
  word: string;
  progress: MotionValue<number>;
  from: number;
  to: number;
}) => {
  const opacity = useTransform(progress, [from, to], [0.3, 1]);
  const color = useTransform(progress, [from, to], ["rgb(100,116,139)", "rgb(255,255,255)"]);

  return (
      <motion.span style={{ opacity, color }} className="inline-block mr-[0.3em]">
        {word}
      </motion.span>
  );
};

const ScrubbedParagraph = ({
                             text,
                             progress,
                             globalStart,
                             globalEnd,
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
          const t = wi / words.length;
          const from = globalStart + t * (globalEnd - globalStart);
          const to = from + (globalEnd - globalStart) / words.length;
          return (
              <AnimatedWord
                  key={wi}
                  word={word}
                  progress={progress}
                  from={from}
                  to={Math.min(to + 0.005, 1)}
              />
          );
        })}
      </p>
  );
};

/* ─────────────────────────────────────────────
   Section Card — Mathematical Overlap
───────────────────────────────────────────── */
const SectionCard = ({
                       block,
                       onProgress,
                       onActive,
                       index
                     }: {
  block: AboutBlock;
  onProgress: (id: string, v: number) => void;
  onActive: (id: string) => void;
  index: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // HEIGHT FIX: 180vh gives plenty of scroll time for the text to finish.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // TIMING FIX:
    // Start scrubbing EXACTLY when the container sticks (at 20% down the screen).
    // End scrubbing EXACTLY when the next container appears at the bottom of the screen (100%).
    offset: ["start 20%", "end 100%"],
  });

  const smoothedProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 22, restDelta: 0.001 });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      onProgress(block.id, v);
      if (v > 0.05 && v < 0.95) onActive(block.id);
    });
  }, [block.id, scrollYProgress, onProgress, onActive]);

  const totalWords = block.paragraphs.reduce((s, p) => s + p.split(" ").length, 0);
  let wordOffset = 0;

  return (
      <div ref={containerRef} className="relative h-[180vh] w-full" id={`about-${block.id}`}>

        {/* EYE LEVEL FIX: Changed to top-[15vh] on mobile and top-[20vh] on desktop */}
        <div
            className="sticky top-[15vh] md:top-[20vh] w-full h-auto min-h-[70vh] rounded-t-[2rem] md:rounded-[2rem] border-t border-white/10 bg-[#0A0A0F] shadow-[0_-30px_40px_-15px_rgba(0,0,0,0.8)] flex flex-col justify-start px-6 md:px-12 pt-12 md:pt-16 pb-20"
            style={{ zIndex: index * 10 }}
        >
          <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-poppins font-bold text-3xl md:text-4xl text-white mb-10 leading-tight"
          >
            {/* Blue Underline Design */}
            <span className="border-b-4 border-accent-primary pb-2 inline-block">
            {block.heading}
          </span>
          </motion.h3>

          <div className="flex flex-col gap-2">
            {block.paragraphs.map((para, pi) => {
              const wordsInPara = para.split(" ").length;
              const globalStart = wordOffset / totalWords;
              wordOffset += wordsInPara;
              const globalEnd = wordOffset / totalWords;

              return (
                  <ScrubbedParagraph
                      key={pi}
                      text={para}
                      progress={smoothedProgress}
                      globalStart={globalStart}
                      globalEnd={globalEnd}
                  />
              );
            })}
          </div>
        </div>
      </div>
  );
};

/* ─────────────────────────────────────────────
   Sticky Nav
───────────────────────────────────────────── */
const StickyNav = ({
                     sections,
                     activeId,
                     progressMap,
                     onClickSection,
                   }: {
  sections: AboutBlock[];
  activeId: string;
  progressMap: Record<string, number>;
  onClickSection: (id: string) => void;
}) => {
  const activeIdx = sections.findIndex((s) => s.id === activeId);

  return (
      <nav className="flex flex-col items-center w-full">
        {sections.map((s, i) => {
          const isActive = i === activeIdx;
          const isDone = i < activeIdx;
          const isUpcoming = i > activeIdx;
          const fill = isActive ? (progressMap[s.id] ?? 0) : isDone ? 1 : 0;

          return (
              <div key={s.id} className="flex flex-col items-center w-full">
                <motion.button
                    onClick={() => onClickSection(s.id)}
                    layout
                    animate={{
                      height: isActive ? 44 : 32,
                      opacity: isUpcoming ? 0.6 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative w-full overflow-hidden rounded-xl focus:outline-none cursor-pointer"
                >
                  <motion.div
                      layout
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        borderColor: isActive
                            ? "rgba(167,243,208,0.5)"
                            : isDone
                                ? "rgba(167,243,208,0.2)"
                                : "rgba(142,202,230,0.15)",
                        backgroundColor: isActive
                            ? "rgba(167,243,208,0.06)"
                            : isDone
                                ? "rgba(167,243,208,0.02)"
                                : "transparent",
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ border: "1px solid" }}
                  />

                  <motion.div
                      className="absolute inset-y-0 left-0 rounded-xl bg-[#A7F3D0]/20"
                      animate={{ width: `${fill * 100}%` }}
                      transition={{ type: "spring", stiffness: 80, damping: 20 }}
                  />

                  <motion.span
                      layout
                      animate={{
                        color: isActive
                            ? "rgb(167,243,208)"
                            : isDone
                                ? "rgba(167,243,208,0.6)"
                                : "rgba(142,202,230,0.8)",
                        fontSize: isActive ? "13px" : "11px",
                      }}
                      transition={{ duration: 0.25 }}
                      className="relative z-10 flex items-center justify-center w-full h-full font-jakarta font-semibold whitespace-nowrap"
                  >
                    {s.label}
                  </motion.span>
                </motion.button>

                {i < sections.length - 1 && (
                    <div className="relative w-px bg-white/5 overflow-hidden my-1" style={{ height: 28 }}>
                      <motion.div
                          className="absolute inset-x-0 top-0 bg-[#A7F3D0] rounded-full w-full"
                          animate={{ height: isDone ? "100%" : isActive ? `${Math.min(fill * 1.5, 1) * 100}%` : "0%" }}
                          transition={{ type: "spring", stiffness: 80, damping: 20 }}
                      />
                    </div>
                )}
              </div>
          );
        })}
      </nav>
  );
};

/* ─────────────────────────────────────────────
   Main Export
───────────────────────────────────────────── */
const AboutSection = () => {
  const [activeId, setActiveId] = useState(ABOUT_SECTIONS[0].id);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  const handleProgress = useCallback((id: string, v: number) => {
    setProgressMap((prev) => ({ ...prev, [id]: v }));
  }, []);

  const handleActive = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const scrollToBlock = (id: string) => {
    const el = document.getElementById(`about-${id}`);
    if (el) {
      // Adjusted scroll calculation to match the top-[20vh] pinning math
      const y = el.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.2);
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
      <section id="about" className="py-24 bg-bg-primary relative">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center mb-16 md:mb-24">
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

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start">
            <div className="hidden md:block sticky top-[20vh] self-start z-50">
              <StickyNav
                  sections={ABOUT_SECTIONS}
                  activeId={activeId}
                  progressMap={progressMap}
                  onClickSection={scrollToBlock}
              />
            </div>

            <div className="flex flex-col relative pb-[10vh]">
              {ABOUT_SECTIONS.map((block, index) => (
                  <SectionCard
                      key={block.id}
                      block={block}
                      index={index}
                      onProgress={handleProgress}
                      onActive={handleActive}
                  />
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default AboutSection;