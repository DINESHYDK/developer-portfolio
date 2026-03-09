import { useState } from "react";
import { Home, User, Wrench, FolderOpen, Mail, BarChart3 } from "lucide-react";
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

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("#hero");

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

      {/* Mobile: Bottom Dynamic Island navbar */}
      <nav
        className={cn(
          "md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
          "bg-bg-surface/90 backdrop-blur-xl",
          "border border-border-subtle",
          "rounded-[28px] px-3 py-2",
          "shadow-2xl shadow-black/60",
          "w-[calc(100%-32px)] max-w-md"
        )}
      >
        <ul className="flex items-center justify-around">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => handleClick(item.href)}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl",
                  "transition-all duration-300",
                  "focus:outline-none",
                  activeLink === item.href
                    ? "text-accent-primary"
                    : "text-text-body/60 hover:text-text-body"
                )}
                aria-label={item.label}
              >
                {/* Active indicator dot */}
                {activeLink === item.href && (
                  <span className="absolute -top-1 w-1 h-1 rounded-full bg-accent-primary" />
                )}
                <span
                  className={cn(
                    "transition-transform duration-300",
                    activeLink === item.href ? "scale-110" : "scale-100"
                  )}
                >
                  {item.icon}
                </span>
                <span className="text-[10px] font-jakarta font-medium">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
