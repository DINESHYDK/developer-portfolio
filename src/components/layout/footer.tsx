import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, ArrowUp } from "lucide-react";
import { SITE_METADATA, FOOTER_LINKS } from "@/config/site-metadata";
import { cn } from "@/utils/cn";
import { haptic } from "@/utils/haptic";

const SOCIAL_SPRING = { type: "spring" as const, stiffness: 380, damping: 22 };

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  GitHub:   <Github   size={18} />,
  LinkedIn: <Linkedin size={18} />,
  Email:    <Mail     size={18} />,
  Twitter:  <Twitter  size={18} />,
};

/* ════════════════════════════════════════════
   YDK Canvas Spotlight
   ─ Technique from reference canvas hook, adapted to this theme
   ─ YDK text: teal (#8ECAE6), always present, revealed through spotlight
   ─ Canvas overlay: dark (#0A0A0F @ 88%) covers the text
   ─ Spotlight: lerped radial punch-through + teal glow ring + subtle pulse
   ─ Disabled on touch (pointer: coarse)
════════════════════════════════════════════ */

const SPOT_SIZE = 220;               // base spotlight radius (px)
const GLOW_RGB  = "142, 202, 230";  // --color-accent-primary (#8ECAE6)

const YdkSpotlight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);

  const spotPos     = useRef({ x: 0, y: 0 });
  const targetPos   = useRef({ x: 0, y: 0 });
  const intensityRef = useRef(0);   // 0 = not hovered, 1 = fully hovered
  const hoveredRef  = useRef(false);
  const rafRef      = useRef<number>(0);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const resize = () => {
      canvas.width  = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Lerp position toward cursor
      spotPos.current.x = lerp(spotPos.current.x, targetPos.current.x, 0.10);
      spotPos.current.y = lerp(spotPos.current.y, targetPos.current.y, 0.10);

      // Smooth intensity: fades in when hovered, fades out when not
      intensityRef.current = lerp(intensityRef.current, hoveredRef.current ? 1 : 0, 0.07);

      ctx.clearRect(0, 0, w, h);

      // 1 ─ Always draw the dim overlay (text is dark/subtle at rest)
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(10, 10, 15, 0.88)";
      ctx.fillRect(0, 0, w, h);

      // 2 ─ If any intensity, cut spotlight hole + draw glow
      if (intensityRef.current > 0.01) {
        const { x, y } = spotPos.current;
        const pulse = 1 + 0.06 * Math.sin((Date.now() / 2000) * Math.PI * 2);
        const size  = SPOT_SIZE * pulse;
        const t     = intensityRef.current;

        // Cut a radial hole through the overlay (destination-out)
        const cutGrad = ctx.createRadialGradient(x, y, 0, x, y, size);
        cutGrad.addColorStop(0,   `rgba(0,0,0,${t})`);
        cutGrad.addColorStop(0.55, `rgba(0,0,0,${t * 0.6})`);
        cutGrad.addColorStop(1,   "rgba(0,0,0,0)");

        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = cutGrad;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Teal glow ring around the revealed spot
        ctx.globalCompositeOperation = "source-over";
        const glowGrad = ctx.createRadialGradient(x, y, size * 0.35, x, y, size * 1.8);
        glowGrad.addColorStop(0,   `rgba(${GLOW_RGB}, ${t * 0.45})`);
        glowGrad.addColorStop(0.5, `rgba(${GLOW_RGB}, ${t * 0.18})`);
        glowGrad.addColorStop(1,   `rgba(${GLOW_RGB}, 0)`);

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(x, y, size * 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalCompositeOperation = "source-over";
      }

      rafRef.current = requestAnimationFrame(render);
    };

    // ── events ──
    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const rx = e.clientX - rect.left;
      const ry = e.clientY - rect.top;

      if (!hoveredRef.current) {
        // Snap position on first entry so spotlight doesn't slide in from edge
        spotPos.current  = { x: rx, y: ry };
        targetPos.current = { x: rx, y: ry };
      } else {
        targetPos.current = { x: rx, y: ry };
      }
      hoveredRef.current = true;
    };

    const onLeave = () => { hoveredRef.current = false; };

    // ── init ──
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        textAlign: "center",
        lineHeight: 0,
      }}
    >
      {/*
        YDK text — teal (#8ECAE6), sits below the canvas.
        When not hovered: canvas is clear → text fully visible.
        When hovered: canvas dark overlay hides text, spotlight punches through
        to reveal the teal text with a glow ring around the cursor.

        Font size: clamp(9rem, 40vw, 46rem) makes 3 bold chars ≈ max-w-5xl width.
      */}
      <span
          className="select-none pointer-events-none"
          style={{
            display: "block",
            position: "relative",
            zIndex: 0,
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(9rem, 60vmin, 46rem)",
            lineHeight: 0.85,
            padding: "0.5rem 0 0",
            color: "#8ECAE6",
            letterSpacing: "clamp(0.02em, 1.2vw, 0.12em)",
            wordSpacing: "clamp(0.15rem, 1.2vw, 0.6rem)",
          }}
      >
  YDK
</span>

      {/* Canvas sits on top — draws the overlay + spotlight + glow */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </div>
  );
};

/* ════════════════════════════════════════════
   Footer
════════════════════════════════════════════ */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-bg-primary pt-16 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">

        {/* ── Top: Brand (left, 1fr) + Connect (right, auto) on desktop ── */}
        <div className="footer-top">

          {/* Brand block */}
          <div className="footer-brand space-y-4">
            <p className="font-poppins text-lg font-bold text-text-heading">
              Dinesh <span className="text-accent-primary">YDK</span>
            </p>
            <p className="text-text-body/60 font-jakarta text-sm leading-relaxed max-w-xs">
              Building clean, scalable, and beautiful web experiences — one commit at a time.
            </p>
            <p className="text-text-body/40 font-jakarta text-xs">
              &copy; {currentYear} {SITE_METADATA.name}. All rights reserved.
            </p>
          </div>

          {/* Connect column — right of brand on desktop */}
          <div className="footer-connect-col space-y-3">
            <p className="font-jakarta text-xs font-semibold uppercase tracking-widest text-text-body/40">
              Connect
            </p>
            <ul className="space-y-2">
              {FOOTER_LINKS.socials.map((social) => (
                <li key={social.name}>
                  <motion.a
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    onClick={() => haptic("tick")}
                    whileHover={{ y: -3, scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={SOCIAL_SPRING}
                    className={cn(
                      "inline-flex items-center gap-2",
                      "text-text-body/60 font-jakarta text-sm",
                      "transition-colors duration-300 hover:text-accent-primary"
                    )}
                  >
                    {SOCIAL_ICONS[social.name]}
                    {social.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Mobile-only: nav + connect 2-col grid ── */}
        <div className="footer-mobile-columns">
          <div className="space-y-3">
            <p className="font-jakarta text-xs font-semibold uppercase tracking-widest text-text-body/40">
              Navigation
            </p>
            <ul className="space-y-2">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={cn(
                      "text-text-body/60 font-jakarta text-sm",
                      "transition-colors duration-300 hover:text-accent-primary"
                    )}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-jakarta text-xs font-semibold uppercase tracking-widest text-text-body/40">
              Connect
            </p>
            <ul className="space-y-2">
              {FOOTER_LINKS.socials.map((social) => (
                <li key={social.name}>
                  <motion.a
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    onClick={() => haptic("tick")}
                    whileHover={{ y: -3, scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={SOCIAL_SPRING}
                    className={cn(
                      "inline-flex items-center gap-2",
                      "text-text-body/60 font-jakarta text-sm",
                      "transition-colors duration-300 hover:text-accent-primary"
                    )}
                  >
                    {SOCIAL_ICONS[social.name]}
                    {social.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Back to top */}
        <div className="flex justify-center mt-12 mb-12">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                "md:hidden", "inline-flex items-center gap-2 px-5 py-2.5 rounded-full",
              "border border-border-subtle text-text-body/60 font-jakarta text-xs",
              "transition-colors duration-300",
              "hover:border-accent-primary/40 hover:text-accent-primary",
              "focus:outline-none focus:ring-2 focus:ring-accent-primary"
            )}
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
            Back to top
          </motion.button>
        </div>
      </div>

      {/* Full-width divider — same 1px / white/5 as the top border-t on <footer> */}
      <div className="h-px bg-white/5" />

      {/* ── YDK Spotlight ── */}
      <YdkSpotlight />

      {/* ── Sub-footer ── */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-3 flex justify-center">
          <p className="text-text-body/40 font-jakarta text-xs text-center">
            Made with{" "}
            <motion.span
              className="inline-block text-accent-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ♥
            </motion.span>{" "}
            by Dinesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;