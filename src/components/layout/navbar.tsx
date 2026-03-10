import { useState, useEffect } from "react";
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
  { label: "Home",     href: "#hero",     icon: <Home     size={20} /> },
  { label: "About",    href: "#about",    icon: <User     size={20} /> },
  { label: "Skills",   href: "#skills",   icon: <Wrench   size={20} /> },
  { label: "Projects", href: "#projects", icon: <FolderOpen size={20} /> },
  { label: "Stats",    href: "#coding",   icon: <BarChart3 size={20} /> },
  { label: "Contact",  href: "#contact",  icon: <Mail     size={20} /> },
];

// Same items shaped for LimelightNav (icons only, no labels shown)
const LIMELIGHT_ITEMS: LimelightNavItem[] = NAV_ITEMS.map((item) => ({
  id:    item.href,
  icon:  item.icon as React.ReactElement,
  label: item.label,
  href:  item.href,
}));

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("#hero");
  const [footerVisible, setFooterVisible] = useState(false);

  // Hide mobile navbar when footer enters the viewport
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 } // triggers as soon as 5% of footer is visible
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setActiveLink(href);
  };

  return (
    <>
      {/* Desktop: Top bar (minimal, floating) */}
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
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => handleClick(item.href)}
                className={cn(
                  "relative flex items-center gap-2 px-5 py-2.5 rounded-full",
                  "text-sm font-jakarta font-medium",
                  "transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-accent-primary",
                  activeLink === item.href
                    ? "bg-accent-primary text-bg-primary shadow-[0_0_16px_rgba(142,202,230,0.3)]"
                    : "text-text-body hover:text-text-heading hover:bg-white/5"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: Limelight bottom nav — icon-only, no labels */}
      <AnimatePresence>
        {!footerVisible && (
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
          >
            <LimelightNav
              items={LIMELIGHT_ITEMS}
              defaultActiveIndex={0}
              onTabChange={(index) => setActiveLink(NAV_ITEMS[index].href)}
              className={cn(
                "bg-bg-surface/90 backdrop-blur-xl",
                "border border-border-subtle",
                "shadow-2xl shadow-black/60",
                "max-w-[92vw] justify-around"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
