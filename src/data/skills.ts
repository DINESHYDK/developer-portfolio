import type { SkillCategory } from "@/types";

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "C++" },
      { name: "Python" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "SQL" },
    ],
  },
  {
    category: "Frontend Engineering",
    skills: [
      { name: "Next.js" },
      { name: "React Native" },
      { name: "React" },
      { name: "Three.js" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    category: "Backend & Databases",
    skills: [
      { name: "Node.js" },
      { name: "FastAPI" },
      { name: "PostgreSQL" },
      { name: "Supabase" },
      { name: "Redis" },
    ],
  },
  {
    category: "AI & Computer Vision",
    skills: [
      { name: "Google Gemini" },
      { name: "Pinecone" },
      { name: "OpenCV" },
      { name: "Vector Databases" },
    ],
  },
  {
    category: "CS Fundamentals",
    skills: [
      { name: "Data Structures & Algorithms" },
      { name: "Object-Oriented Design" },
      { name: "Operating Systems" },
      { name: "DBMS" },
    ],
  },
  {
    category: "Tools & Deployment",
    skills: [
      { name: "Git" },
      { name: "Linux" },
      { name: "Vercel" },
      { name: "Figma" },
      { name: "PostHog" },
    ],
  },
];