import type { SiteMetadata } from "@/types";

export const SITE_METADATA: SiteMetadata = {
  name: "Dinesh Krishna",
  title: "Full-Stack Developer",
  description:
    "Frontend developer transitioning to the MERN stack, building scalable and beautiful web experiences.",
  role: "Full-Stack Developer",
  email: "dineshkrishnayeturi@gmail.com",
  github: "https://github.com/dineshydk",
  linkedin: "https://linkedin.com/in/dineshydk",
};

export const FOOTER_LINKS = {
  socials: [
    { name: "GitHub",   href: SITE_METADATA.github,   ariaLabel: "GitHub Profile"   },
    { name: "LinkedIn", href: SITE_METADATA.linkedin,  ariaLabel: "LinkedIn Profile" },
    { name: "Email",    href: `mailto:${SITE_METADATA.email}`, ariaLabel: "Send Email" },
    { name: "Twitter",  href: "https://twitter.com/dineshydk", ariaLabel: "Twitter / X" },
  ],
  navigation: [
    { name: "Home",     href: "#home"     },
    { name: "About",    href: "#about"    },
    { name: "Skills",   href: "#skills"   },
    { name: "Projects", href: "#projects" },
    { name: "Coding",   href: "#coding"   },
    { name: "Contact",  href: "#contact"  },
  ],
} as const;

