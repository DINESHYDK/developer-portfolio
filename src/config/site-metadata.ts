import type { SiteMetadata } from "@/types";

/**
 * Naming convention used across the site:
 *  - name      → "Dinesh Krishna"     (everywhere a person reads your name)
 *  - fullName  → "Y. Dinesh Krishna"  (SEO / formal contexts only)
 *  - handle    → "@ydk"               (brand mark, ID card, terminal)
 */
export const SITE_METADATA: SiteMetadata = {
  name: "Dinesh Krishna",
  fullName: "Y. Dinesh Krishna",
  handle: "@ydk",
  resumeUrl: "/resume.pdf",
  title: "Software Engineering Student & Competitive Programmer",
  description:
    "CSE undergrad at IIT (ISM) Dhanbad. I build full-stack products and solve contest problems in C++ (2,200+ so far).",
  role: "Software Engineering Student & Competitive Programmer",
  email: "dineshkrishnayeturi@gmail.com",
  github: "https://github.com/DINESHYDK",
  linkedin: "https://linkedin.com/in/dineshydk",
};

export const FOOTER_LINKS = {
  socials: [
    { name: "GitHub", href: SITE_METADATA.github, ariaLabel: "GitHub Profile" },
    {
      name: "LinkedIn",
      href: SITE_METADATA.linkedin,
      ariaLabel: "LinkedIn Profile",
    },
    {
      name: "Email",
      href: `mailto:${SITE_METADATA.email}`,
      ariaLabel: "Send Email",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/dineshydk",
      ariaLabel: "Twitter / X",
    },
  ],
  navigation: [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Coding", href: "#coding" },
    { name: "Contact", href: "#contact" },
  ],
} as const;
