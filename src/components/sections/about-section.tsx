import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ABOUT_BLOCKS, type AboutBlock } from "@/data/about";

import svgStory from "@/assets/svg-about-1.svg?url";
import svgWork from "@/assets/svg-about-2.svg?url";
import svgExperience from "@/assets/svg-about-3.svg?url";
import svgNext from "@/assets/svg-about-4.svg?url";

const ILLUSTRATIONS: Record<AboutBlock["id"], string> = {
  story: svgStory,
  work: svgWork,
  experience: svgExperience,
  next: svgNext,
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/* Paragraph-level reveal: short, once, no scroll-scrubbing */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.5, ease: EASE, delay },
});

/* ─────────────────────────────────────────────
   Left panel — illustration for the block in view.
   The ring around it fills as you read through the section.
───────────────────────────────────────────── */
const IllustrationPanel = ({
  activeId,
  ringRef,
}: {
  activeId: AboutBlock["id"];
  ringRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const block = ABOUT_BLOCKS.find((b) => b.id === activeId) ?? ABOUT_BLOCKS[0];
  const index = ABOUT_BLOCKS.indexOf(block);

  return (
    <div className="w-full">
      <div className="about-ring-track">
        <div ref={ringRef} className="about-ring-fill">
          <div className="about-ring-well">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={block.id}
                src={ILLUSTRATIONS[block.id]}
                alt={block.imageAlt}
                className="block w-full h-auto"
                draggable={false}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Step indicator: which part of the story you're on */}
      <ol
        className="mt-5 flex justify-center gap-2"
        aria-label="About sections"
      >
        {ABOUT_BLOCKS.map((b, i) => (
          <li key={b.id}>
            <a
              href={`#about-${b.id}`}
              aria-current={i === index ? "step" : undefined}
              className={
                "block font-mono text-xs px-2.5 py-1 rounded-md border transition-colors duration-200 " +
                (i === index
                  ? "border-accent-primary/60 text-accent-primary"
                  : "border-white/10 text-text-body/70 hover:text-text-heading")
              }
            >
              {b.label}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};

/* ─────────────────────────────────────────────
   One block of the story
───────────────────────────────────────────── */
const AboutBlockView = ({
  block,
  blockRef,
}: {
  block: AboutBlock;
  blockRef: (el: HTMLElement | null) => void;
}) => (
  <article
    id={`about-${block.id}`}
    ref={blockRef}
    data-block={block.id}
    className="about-block"
    aria-labelledby={`about-${block.id}-heading`}
  >
    {/* Mobile: the left panel is hidden, so show the illustration inline */}
    <img
      src={ILLUSTRATIONS[block.id]}
      alt=""
      aria-hidden="true"
      className="md:hidden w-full max-w-[220px] mx-auto mb-6 rounded-xl"
      loading="lazy"
      draggable={false}
    />

    <motion.p
      {...reveal()}
      className="font-mono text-sm text-accent-secondary mb-3"
    >
      {block.label}
    </motion.p>

    <motion.h3
      {...reveal(0.05)}
      id={`about-${block.id}-heading`}
      className="font-poppins font-bold text-3xl md:text-4xl text-text-heading mb-4 leading-tight"
    >
      {block.heading}
    </motion.h3>

    {block.meta && (
      <motion.p
        {...reveal(0.1)}
        className="font-mono text-sm text-accent-primary mb-6"
      >
        {block.meta}
      </motion.p>
    )}

    <div className="space-y-5">
      {block.paragraphs.map((p, i) => (
        <motion.p
          key={i}
          {...reveal(0.1 + i * 0.08)}
          className="font-jakarta text-lg md:text-xl leading-relaxed text-text-body"
        >
          {p}
        </motion.p>
      ))}
    </div>
  </article>
);

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
const AboutSection = () => {
  const [activeId, setActiveId] = useState<AboutBlock["id"]>(
    ABOUT_BLOCKS[0].id,
  );
  const blockRefs = useRef<(HTMLElement | null)[]>([]);
  const columnRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Active block = the one crossing the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.block as
              | AboutBlock["id"]
              | undefined;
            if (id) setActiveId(id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    blockRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Ring fill = reading progress through the whole About column (direct DOM write, no re-render)
  const { scrollYProgress } = useScroll({
    target: columnRef,
    offset: ["start center", "end center"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const deg = Math.max(0, Math.min(v, 1)) * 360;
    ringRef.current?.style.setProperty("--about-progress", `${deg}deg`);
  });

  return (
    <section
      id="about"
      className="py-24 bg-bg-primary relative"
      aria-labelledby="about-heading"
    >
      <div className="text-center mb-16 md:mb-20 px-4">
        <motion.h2
          id="about-heading"
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

      <div className="about-layout">
        <div className="about-left-sticky">
          <IllustrationPanel activeId={activeId} ringRef={ringRef} />
        </div>

        <div ref={columnRef} className="about-column">
          {ABOUT_BLOCKS.map((block, i) => (
            <AboutBlockView
              key={block.id}
              block={block}
              blockRef={(el) => {
                blockRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
