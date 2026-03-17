import { ArrowDown, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { SITE_METADATA } from "@/config/site-metadata";
import { cn } from "@/utils/cn";
import IdCard from "@/components/id-card/IdCard";
import { haptic } from "@/utils/haptic";

/* ─────────────────────────────────────────────
   Stagger helpers
   ─ EASE: smooth deceleration curve (feels premium)
   ─ fadeUp: reusable factory — returns initial/animate/transition
     for the standard y:18→0 + opacity:0→1 reveal
   ─ Using explicit delays (not staggerChildren) so each element
     controls its own timing precisely
───────────────────────────────────────────── */
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = (delay: number) => ({
  initial:    { opacity: 0, y: 18 } as const,
  animate:    { opacity: 1, y: 0  } as const,
  transition: { duration: 0.6, ease: EASE, delay },
});

/* Spring used for whileHover / whileTap on buttons */
const BTN_SPRING = { type: "spring", stiffness: 420, damping: 22 } as const;

/* ─────────────────────────────────────────────
   HeroSection
───────────────────────────────────────────── */
const HeroSection = () => {
  return (
    <section
      id="hero"
      className="group relative min-h-screen flex items-center justify-center px-6"
    >
      {/* Subtle gradient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Two-column layout: Card (left) + Text (right) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 py-8">

        {/* ── Left: ID Card — enters first, slight scale-up ── */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <IdCard />
        </motion.div>

        {/* ── Right: Text content — cascades in after card ── */}
        <div className="text-center md:text-left max-w-xl flex flex-col gap-4">

          {/* 1 — Greeting */}
          <motion.p
            className="text-accent-primary font-mono text-sm tracking-wider"
            {...fadeUp(0.20)}
          >
            Hi, my name is
          </motion.p>

          {/* 2 — Name */}
          <motion.h1
            className={cn(
              "font-poppins text-5xl md:text-6xl font-bold leading-tight",
              "text-white/45",
              // Only transition color-related props — Framer Motion owns transform + opacity
              "transition-colors duration-500 ease-out",
              "group-hover:text-white group-hover:[text-shadow:0_0_40px_rgba(142,202,230,0.25)]"
            )}
            {...fadeUp(0.32)}
          >
            {SITE_METADATA.name}
          </motion.h1>

          {/* 3 — Role */}
          <motion.h2
            className={cn(
              "font-poppins text-2xl md:text-3xl font-semibold",
              "text-white/30",
              "transition-colors duration-500 ease-out delay-75",
              "group-hover:text-text-body"
            )}
            {...fadeUp(0.44)}
          >
            {SITE_METADATA.role}
          </motion.h2>

          {/* 4 — Description */}
          <motion.p
            className={cn(
              "font-jakarta text-lg md:text-xl leading-relaxed",
              "text-white/25",
              "transition-colors duration-500 ease-out delay-100",
              "group-hover:text-text-body"
            )}
            {...fadeUp(0.56)}
          >
            {SITE_METADATA.description}
          </motion.p>

          {/* 5 — CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 mt-2"
            {...fadeUp(0.70)}
          >
            {/* Primary — View My Work */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={BTN_SPRING}
              onClick={() => haptic("tap")}
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 rounded-2xl",
                "bg-accent-primary text-bg-primary font-jakarta font-semibold",
                "transition-colors duration-300",
                "hover:bg-accent-primary/90 hover:shadow-[0_0_20px_rgba(142,202,230,0.3)]",
                "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-primary"
              )}
            >
              View My Work
              <ArrowDown size={18} />
            </motion.a>

            {/* Secondary — Resume */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={BTN_SPRING}
              onClick={() => haptic("tap")}
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 rounded-2xl",
                "border border-accent-primary text-accent-primary font-jakarta font-semibold",
                "transition-colors duration-300",
                "hover:bg-accent-primary/10",
                "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-primary"
              )}
            >
              <FileText size={18} />
              Resume
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — fades in last, keeps the CSS bounce */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.90 }}
      >
        <ArrowDown size={20} className="text-text-body/50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;