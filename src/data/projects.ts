import type { Project } from "@/types";

export const PROJECT_CATEGORIES = ["All", "Web Apps", "AI Projects", "Tools"] as const;

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "AI Chat Assistant",
    description:
      "Intelligent conversational AI with context awareness, built with React and OpenAI API. Features real-time streaming responses and conversation history.",
    tags: ["React", "TypeScript", "OpenAI API", "Node.js", "Tailwind CSS"],
    category: "AI Projects",
    liveUrl: "https://example.com/ai-chat",
    repoUrl: "https://github.com/dineshydk/ai-chat",
  },
  {
    id: "project-2",
    title: "E-Commerce Dashboard",
    description:
      "A full-featured admin dashboard built with React, TypeScript, and Tailwind CSS. Includes real-time analytics, order management, and dark mode.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    category: "Web Apps",
    liveUrl: "https://example.com/dashboard",
    repoUrl: "https://github.com/dineshydk/dashboard",
  },
  {
    id: "project-3",
    title: "Task Manager API",
    description:
      "RESTful API built with Node.js and Express, featuring JWT authentication, CRUD operations, and MongoDB integration.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    category: "Tools",
    repoUrl: "https://github.com/dineshydk/task-api",
  },
  {
    id: "project-4",
    title: "QuizMaster — Study Platform",
    description:
      "Transform your study experience. Create AI-powered quizzes from your study materials. Boost retention, track progress, and make learning engaging.",
    tags: ["React", "TypeScript", "AI", "MongoDB", "Tailwind CSS"],
    category: "AI Projects",
    liveUrl: "https://example.com/quizmaster",
    repoUrl: "https://github.com/dineshydk/quizmaster",
  },
  {
    id: "project-5",
    title: "Weather App",
    description:
      "A responsive weather application with location-based forecasts, animated backgrounds, and PWA support.",
    tags: ["React", "OpenWeather API", "PWA", "CSS Animations"],
    category: "Web Apps",
    liveUrl: "https://example.com/weather",
    repoUrl: "https://github.com/dineshydk/weather-app",
  },
  {
    id: "project-6",
    title: "Portfolio v1",
    description:
      "My first portfolio website showcasing projects and skills, built with vanilla HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    category: "Web Apps",
    liveUrl: "https://example.com/portfolio-v1",
    repoUrl: "https://github.com/dineshydk/portfolio-v1",
  },
];
