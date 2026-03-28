import type { Project } from "@/types";

export const PROJECT_CATEGORIES = ["All", "Web Apps", "AI Projects", "Tools"] as const;

export const PROJECTS: Project[] = [
  {
    id: "rubiks-cube-solver",
    title: "Rubik's Cube Solver",
    domain: "TOOL",
    description:
      "An interactive 3D Rubik's Cube visualizer and solver built with TypeScript. Features animated cube rotations, step-by-step solving algorithms, and an intuitive interface for exploring cube states and solutions.",
    tags: ["TypeScript", "React", "3D Graphics", "Algorithms"],
    category: "Tools",
    repoUrl: "https://github.com/DINESHYDK/rubiks-cube-solver",
    imageUrl: undefined,
    challenges: [
      "Mapping 3D cube state to a flat 2D representation for algorithm processing",
      "Implementing and animating valid move sequences without state corruption",
      "Designing an intuitive UI to control cube orientation and apply moves",
      "Debugging edge cases in the solving algorithm for scrambled states",
    ],
  },
  {
    id: "intellidesk-ai",
    title: "IntelliDesk AI",
    domain: "AI",
    description:
      "An AI-powered smart desk assistant that unifies productivity — note-taking, task management, and intelligent suggestions — into one seamless workspace. Built for developers who want their tools to think ahead.",
    tags: ["TypeScript", "React", "AI", "Node.js", "Tailwind CSS"],
    category: "AI Projects",
    repoUrl: "https://github.com/DINESHYDK/IntelliDesk-AI",
    imageUrl: undefined,
    challenges: [
      "Integrating AI suggestions without disrupting the user's workflow",
      "Designing a context-aware system that learns from usage patterns",
      "Keeping the UI minimal while exposing rich AI-powered features",
      "Managing async AI responses to feel snappy and non-blocking",
    ],
  },
  {
    id: "chatsphere",
    title: "ChatSphere",
    domain: "WEB",
    description:
      "A real-time full-stack chat application built with the MERN stack. Features JWT authentication, live messaging, and a clean responsive UI. My first complete full-stack project — shipped end-to-end.",
    tags: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
    category: "Web Apps",
    repoUrl: "https://github.com/DINESHYDK/ChatSphere",
    imageUrl: undefined,
    challenges: [
      "Setting up real-time bi-directional communication between client and server",
      "Implementing secure JWT-based authentication with refresh token flow",
      "Handling concurrent users and message ordering without race conditions",
      "Deploying a MERN app end-to-end for the first time",
    ],
  },
  {
    id: "golf-give",
    title: "GolfGive",
    domain: "WEB",
    description:
      "A charity golf event platform connecting donors with golf tournament organizers. Features event listings, real-time donation tracking, and participant management for fundraising tournaments.",
    tags: ["TypeScript", "React", "REST APIs", "Tailwind CSS"],
    category: "Web Apps",
    repoUrl: "https://github.com/DINESHYDK/golf_charity",
    imageUrl: undefined,
    challenges: [
      "Designing a clean donation flow that minimizes friction for donors",
      "Building a real-time leaderboard for live tournament tracking",
      "Managing event state across organizers, participants, and donors",
      "Ensuring the platform works smoothly on mobile for on-course use",
    ],
  },
  {
    id: "dsa-visualizer",
    title: "DSA Visualizer",
    domain: "TOOL",
    description:
      "An interactive visualizer for data structures and algorithms. Animates sorting, searching, and graph traversal algorithms step-by-step — making CS fundamentals visual, intuitive, and easy to learn.",
    tags: ["TypeScript", "React", "Algorithms", "Data Structures", "Animations"],
    category: "Tools",
    repoUrl: "https://github.com/DINESHYDK/DSA_Visualizer",
    imageUrl: undefined,
    challenges: [
      "Synchronizing animation frames with algorithm execution steps",
      "Supporting multiple algorithms under a unified visualization API",
      "Making complex data structure mutations visually clear without clutter",
      "Keeping the visualizer performant during rapid algorithm steps",
    ],
  },
];