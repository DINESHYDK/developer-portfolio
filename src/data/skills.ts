import type { SkillCategory } from "@/types";

export const SKILLS: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Tailwind CSS" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Next.js" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "MongoDB" },
      { name: "REST APIs" },
      { name: "PostgreSQL" },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Vite" },
      { name: "Docker" },
      { name: "Figma" },
      { name: "Postman" },
    ],
  },
];

