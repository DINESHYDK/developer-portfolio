import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, ArrowUp, Code2, Trophy } from "lucide-react";
import { SITE_METADATA, FOOTER_LINKS } from "@/config/site-metadata";
import { CODING_STATS } from "@/data/coding-stats";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/utils/cn";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  GitHub:   <Github   size={18} />,
  LinkedIn: <Linkedin size={18} />,
  Email:    <Mail     size={18} />,
  Twitter:  <Twitter  size={18} />,
};

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  leetcode:   <Code2  size={16} />,
  codeforces: <Trophy size={16} />,
  codechef:   <Code2  size={16} />,
  tuf:        <Code2  size={16} />,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-bg-primary pt-16 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">

        {/* ── Upper: Nav + Socials + CTA ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand blurb — full width on mobile, 1 col on desktop */}
          <div className="space-y-4">
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

          {/* Nav + Connect: side-by-side on mobile (2 cols), each in their own col on desktop */}
          <div className="grid grid-cols-2 md:contents gap-8">

            {/* Quick Nav */}
            <div className="space-y-4">
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
                        "transition-colors duration-300",
                        "hover:text-accent-primary"
                      )}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div className="space-y-4">
              <p className="font-jakarta text-xs font-semibold uppercase tracking-widest text-text-body/40">
                Connect
              </p>
              <ul className="space-y-2">
                {FOOTER_LINKS.socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target={social.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      className={cn(
                        "inline-flex items-center gap-2",
                        "text-text-body/60 font-jakarta text-sm",
                        "transition-colors duration-300",
                        "hover:text-accent-primary"
                      )}
                    >
                      {SOCIAL_ICONS[social.name]}
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Back to top — centered */}
        <div className="flex justify-center mb-12">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-full",
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

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-0" />
      </div>

      {/* ── Massive Brand Anchor: "YDK" ── */}
      <div
        className={cn(
          "w-full text-center leading-none",
          "select-none pointer-events-none",
          "-mb-4"
        )}
      >
        <span
          className={cn(
            "inline-block w-[95%] md:w-auto",
            "font-poppins font-black tracking-tighter",
            "text-transparent bg-clip-text",
            "bg-gradient-to-b from-white/15 via-white/8 to-bg-primary"
          )}
          style={{
            fontSize: "clamp(7rem, 30vw, 26rem)",
            lineHeight: 0.82,
          }}
        >
          YDK
        </span>
      </div>

      {/* ── Premium Sub-Footer Bar ── */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            {/* Left: Copyright with animated heart */}
            <p className="text-text-body/40 font-jakarta text-xs text-center md:text-left">
              Made with{" "}
              <motion.span
                className="inline-block text-accent-primary"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ♥
              </motion.span>{" "}
              by Dinesh
            </p>

            {/* Right: Magnetic social + platform icons */}
            <div className="flex items-center gap-4">
              {/* Social Icons */}
              {FOOTER_LINKS.socials.map((social) => (
                <Magnetic key={social.name}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-full",
                      "border border-white/10 text-text-body/40",
                      "transition-all duration-300",
                      "hover:border-accent-primary hover:text-accent-primary hover:bg-accent-primary/5"
                    )}
                  >
                    {SOCIAL_ICONS[social.name]}
                  </a>
                </Magnetic>
              ))}

              {/* Divider */}
              <div className="w-px h-6 bg-white/10" />

              {/* Platform Icons */}
              {CODING_STATS.platforms.map((platform) => (
                <Magnetic key={platform.id}>
                  <a
                    href={platform.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform.name}
                    className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-full",
                      "border border-white/10 text-text-body/40",
                      "transition-all duration-300",
                      "hover:border-accent-primary hover:text-accent-primary hover:bg-accent-primary/5"
                    )}
                  >
                    {PLATFORM_ICONS[platform.id]}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
