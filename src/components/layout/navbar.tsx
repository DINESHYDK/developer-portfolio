import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Wrench, FolderOpen, Mail, BarChart3 } from "lucide-react";
import { LimelightNav } from "@/components/ui/limelight-nav";
import type { LimelightNavItem } from "@/components/ui/limelight-nav";
import { cn } from "@/utils/cn";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero", icon: <Home size={20} /> },
  { label: "About", href: "#about", icon: <User size={20} /> },
  { label: "Skills", href: "#skills", icon: <Wrench size={20} /> },
  { label: "Projects", href: "#projects", icon: <FolderOpen size={20} /> },
  { label: "Stats", href: "#coding", icon: <BarChart3 size={20} /> },
  { label: "Contact", href: "#contact", icon: <Mail size={20} /> },
];

const LIMELIGHT_ITEMS: LimelightNavItem[] = NAV_ITEMS.map((item) => ({
  id: item.href,
  icon: item.icon as React.ReactElement,
  label: item.label,
  href: item.href,
}));

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("#hero");
  const [footerVisible, setFooterVisible] = useState(false);

  const activeIndex = useMemo(
    () => Math.max(0, NAV_ITEMS.findIndex((item) => item.href === activeLink)),
    [activeLink]
  );

  // Shared scroll-spy source of truth for both desktop and mobile navs.
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((i) => i.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    let rafId = 0;

    const updateActiveFromScroll = () => {
      // Use getBoundingClientRect for accurate detection with sticky sections.
      const probeY = window.innerHeight * 0.42;

      let currentId = `#${sections[0].id}`;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= probeY && rect.bottom > probeY) {
          currentId = `#${section.id}`;
          break;
        }

        // Fallback: if we've scrolled past this section, record it
        if (rect.top <= probeY) {
          currentId = `#${section.id}`;
        }
      }

      setActiveLink((prev) => (prev === currentId ? prev : currentId));
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveFromScroll);
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Hide mobile navbar when footer enters viewport.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (href: string) => {
    setActiveLink(href);

    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    }
  };

  return (
    <>
      {/* Desktop */}
      <nav
        className={cn(
          "hidden md:flex",
          "fixed top-6 left-1/2 -translate-x-1/2 z-50",
          "bg-bg-surface/80 backdrop-blur-xl",
          "border border-border-subtle",
          "rounded-full px-2 py-2",
          "shadow-2xl shadow-black/40"
        )}
      >
        <ul className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeLink === item.href;
            return (
              <li key={item.href} className="relative">
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(item.href);
                  }}
                  className={cn(
                    "relative flex items-center gap-2 px-5 py-2.5 rounded-full overflow-hidden",
                    "text-sm font-jakarta font-medium",
                    "transition-colors duration-300",
                    "focus:outline-none focus:ring-2 focus:ring-accent-primary",
                    isActive ? "text-bg-primary" : "text-text-body hover:text-text-heading"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="desktop-active-pill"
                      className="absolute inset-0 rounded-full bg-accent-primary shadow-[0_0_16px_rgba(142,202,230,0.32)]"
                      transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.icon}</span>
                  <span className="relative z-10">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile */}
      <AnimatePresence>
        {!footerVisible && (
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed bottom-4 left-4 right-4 z-50"
          >
            <LimelightNav
              items={LIMELIGHT_ITEMS}
              defaultActiveIndex={0}
              activeIndex={activeIndex}
              onTabChange={(index) => handleNavigate(NAV_ITEMS[index].href)}
              className={cn(
                "bg-bg-surface/90 backdrop-blur-xl",
                "border border-border-subtle",
                "shadow-2xl shadow-black/60",
                "w-full justify-around"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
