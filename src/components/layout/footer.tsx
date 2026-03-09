import { Github, Linkedin, Mail } from "lucide-react";
import { SITE_METADATA } from "@/config/site-metadata";
import { cn } from "@/utils/cn";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-border-subtle",
        "bg-bg-surface py-12"
      )}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href={SITE_METADATA.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-text-body transition-all duration-300",
                "hover:text-accent-primary hover:scale-110",
                "focus:outline-none focus:ring-2 focus:ring-accent-primary rounded-sm"
              )}
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href={SITE_METADATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-text-body transition-all duration-300",
                "hover:text-accent-primary hover:scale-110",
                "focus:outline-none focus:ring-2 focus:ring-accent-primary rounded-sm"
              )}
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${SITE_METADATA.email}`}
              className={cn(
                "text-text-body transition-all duration-300",
                "hover:text-accent-primary hover:scale-110",
                "focus:outline-none focus:ring-2 focus:ring-accent-primary rounded-sm"
              )}
              aria-label="Send Email"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-text-body text-sm font-jakarta">
            &copy; {currentYear}{" "}
            <span className="text-accent-primary">{SITE_METADATA.name}</span>.
            All rights reserved.
          </p>

          {/* Built With */}
          <p className="text-text-body/60 text-xs font-jakarta">
            Built with{" "}
            <span className="text-accent-secondary">React</span>,{" "}
            <span className="text-accent-secondary">TypeScript</span> &{" "}
            <span className="text-accent-secondary">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

