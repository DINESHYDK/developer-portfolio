import type { SkillCategory } from "@/types";

export const SKILLS: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "MongoDB" },
      { name: "REST APIs" },
      { name: "Java" },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Vite" },
      { name: "VS Code" },
      { name: "Postman" },
      { name: "Figma" },
    ],
  },
];