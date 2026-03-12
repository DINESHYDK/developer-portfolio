import type { Project } from "@/types";

export const PROJECT_CATEGORIES = ["All", "Web Apps", "AI Projects", "Tools"] as const;

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "AI Chat Assistant",
    domain: "AI",
    description:
      "Intelligent conversational AI with context awareness, built with React and OpenAI API. Features real-time streaming responses and conversation history.",
    tags: ["React", "TypeScript", "OpenAI API", "Node.js", "Tailwind CSS"],
    category: "AI Projects",
    liveUrl: "https://example.com/ai-chat",
    repoUrl: "https://github.com/dineshydk/ai-chat",
    challenges: [
      "Implementing real-time streaming responses without blocking the UI",
      "Managing conversation context and memory efficiently",
      "Handling API rate limits and error states gracefully",
      "Optimizing token usage for cost-effectiveness",
    ],
  },
  {
    id: "project-2",
    title: "E-Commerce Dashboard",
    domain: "WEB",
    description:
      "A full-featured admin dashboard built with React, TypeScript, and Tailwind CSS. Includes real-time analytics, order management, and dark mode.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    category: "Web Apps",
    liveUrl: "https://example.com/dashboard",
    repoUrl: "https://github.com/dineshydk/dashboard",
    challenges: [
      "Creating responsive data tables for large datasets",
      "Implementing real-time chart updates with WebSocket",
      "Managing complex state across multiple dashboard widgets",
      "Ensuring accessibility for screen readers",
    ],
  },
  {
    id: "project-3",
    title: "Task Manager API",
    domain: "TOOL",
    description:
      "RESTful API built with Node.js and Express, featuring JWT authentication, CRUD operations, and MongoDB integration.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    category: "Tools",
    repoUrl: "https://github.com/dineshydk/task-api",
    challenges: [
      "Designing a scalable database schema for nested task hierarchies",
      "Implementing secure JWT refresh token rotation",
      "Handling concurrent updates to prevent data conflicts",
      "Writing comprehensive API documentation with Swagger",
    ],
  },
  {
    id: "project-4",
    title: "QuizMaster — Study Platform",
    domain: "AI",
    description:
      "Transform your study experience. Create AI-powered quizzes from your study materials. Boost retention, track progress, and make learning engaging.",
    tags: ["React", "TypeScript", "AI", "MongoDB", "Tailwind CSS"],
    category: "AI Projects",
    liveUrl: "https://example.com/quizmaster",
    repoUrl: "https://github.com/dineshydk/quizmaster",
    challenges: [
      "Parsing and extracting meaningful questions from various document formats",
      "Balancing AI creativity with educational accuracy",
      "Building a spaced repetition algorithm for optimal learning",
      "Gamifying the experience without compromising educational value",
    ],
  },
  {
    id: "project-5",
    title: "Weather App",
    domain: "WEB",
    description:
      "A responsive weather application with location-based forecasts, animated backgrounds, and PWA support.",
    tags: ["React", "OpenWeather API", "PWA", "CSS Animations"],
    category: "Web Apps",
    liveUrl: "https://example.com/weather",
    repoUrl: "https://github.com/dineshydk/weather-app",
    challenges: [
      "Handling geolocation permissions across different browsers",
      "Creating smooth weather-based background animations",
      "Implementing offline functionality with service workers",
      "Caching API responses to reduce unnecessary requests",
    ],
  },
  {
    id: "project-6",
    title: "Portfolio v1",
    domain: "WEB",
    description:
      "My first portfolio website showcasing projects and skills, built with vanilla HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    category: "Web Apps",
    liveUrl: "https://example.com/portfolio-v1",
    repoUrl: "https://github.com/dineshydk/portfolio-v1",
    challenges: [
      "Achieving smooth animations without a framework",
      "Writing vanilla JS for complex interactions",
      "Ensuring cross-browser compatibility",
      "Optimizing images and assets for fast loading",
    ],
  },
];
