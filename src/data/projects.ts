import type { Project } from "@/types";

export const PROJECT_CATEGORIES = ["All", "Web Apps", "AI Projects", "Tools"] as const;

export const PROJECTS: Project[] = [
  {
    id: "rubiks-cube-solver",
    title: "Rubik’s Cube Solver",
    domain: "WEB",
    category: "Web Apps",
    featured: true,
    description:
      "An interactive cross-platform 3D cube solver powered by Computer Vision and Kociemba's Algorithm, capable of resolving physical cubes in under 100ms.",
    modalDescription:
      "I wanted to bridge the gap between physical puzzles and digital algorithms. Users scan a scrambled physical Rubik's Cube via their camera, and the FastAPI backend extracts the color matrix using OpenCV and K-means clustering in the LAB color space. The app calculates the optimal sub-20-move solution using Kociemba's Two-Phase algorithm and renders the solving steps on a 60 FPS interactive 3D cube.",
    tags: ["React", "Three.js", "FastAPI", "OpenCV", "Algorithms", "Web"],
    repoUrl: "https://github.com/DINESHYDK/rubiks-cube-solver",
    imageUrl: "/images/projects/RubiksCube.png",
    challenges: [
      "Extracting accurate facelet colors from the camera feed across varying and uneven room lighting conditions.",
      "Preventing floating-point coordinate drift during complex 3D slice rotations using a quaternion-based pivot system.",
      "Offloading heavy Kociemba pruning table initializations asynchronously to prevent the UI thread from freezing.",
      "Managing complex global state and local device storage for solve history using Zustand and AsyncStorage.",
    ],
  },
  {
    id: "studysync",
    title: "StudySync",
    domain: "WEB",
    category: "Web Apps",
    featured: true,
    description:
      "A real-time, collaborative study tracker that gamifies focus sessions with live friend telemetry, head-to-head comparisons, and native PWA support.",
    modalDescription:
      "StudySync transforms studying from an isolating task into a competitive, social experience. I built this platform for students to track their focus sessions and broadcast their progress live to their friend group. The core loop—study, name your subject, and compare stats at the end of the day—deeply resonated with students, resulting in 50+ active users within two weeks of launch. The system features an installable Progressive Web App (PWA), a floating popup timer, daily task tracking, and an animated activity heatmap to visualize long-term streaks.",
    tags: ["Next.js", "Supabase", "TypeScript", "Real-Time", "PWA"],
    repoUrl: "https://github.com/DINESHYDK/StudySync",
    imageUrl: "/images/projects/StudySync.png",
    challenges: [
      "Ensuring timer resilience against accidental tab closures and reloads using a custom recovery flow and the navigator.sendBeacon API for fire-and-forget server syncs.",
      "Enforcing strict data privacy through PostgreSQL Row Level Security (RLS), ensuring users can only subscribe to the live telemetry of their accepted friends.",
      "Synchronizing real-time dashboard states—like incoming friend requests and live study segments—across multiple clients simultaneously using Supabase Realtime and Zustand.",
      "Engineering organic, GPU-accelerated CSS flame animations with staggered mathematical delays to dynamically render the user's streak heatmap.",
    ],
  },
  {
    id: "agent-slam",
    title: "Agent SLAM",
    domain: "AI",
    category: "AI Projects",
    description:
      "An autonomous, WebSocket-driven AI agent built for competitive arenas, utilizing LLMs to generate real-time logical counter-arguments.",
    modalDescription:
      "Winner of 2nd Place at the IIT (ISM) Dhanbad tournament. Agent SLAM is a fully autonomous AI system designed to compete in live, multi-team adversarial environments. Operating over continuous WebSocket connections, the agent maintains a live transcript of the debate arena and uses an event-driven asyncio architecture to query Google Gemini for structured, context-aware counter-arguments.",
    tags: ["Python", "Asyncio", "Gemini AI", "WebSockets", "Pydantic", "AI"],
    repoUrl: "https://github.com/DINESHYDK/agent-slam",
    imageUrl: undefined,
    challenges: [
      "Managing continuous WebSocket communication concurrently with blocking network responses from the Gemini API.",
      "Enforcing strict, deterministic JSON payloads from the LLM using Pydantic schemas to prevent live parsing crashes.",
      "Building a robust custom state machine to accurately track dynamic turn-based transitions and server events.",
      "Maintaining and injecting the ever-growing debate transcript into the LLM context window efficiently.",
    ],
  },
  {
    id: "intellidesk-ai",
    title: "IntelliDesk AI",
    domain: "AI",
    category: "AI Projects",
    description:
      "An enterprise-grade automated customer support pipeline featuring semantic vector search, live SLA tracking, and intelligent ticket classification.",
    modalDescription:
      "Designed to eliminate manual support bottlenecks, IntelliDesk AI intercepts raw support emails and routes them through an intelligent pipeline. It uses Google Gemini to classify issue category, severity, and customer sentiment. By generating 768-dimensional embeddings and querying a Pinecone vector database, it actively prevents duplicate tickets and drafts context-aware automated replies based on FAQs.",
    tags: ["Next.js", "Supabase", "Pinecone", "Gemini AI", "Vector DB", "AI"],
    repoUrl: "https://github.com/DINESHYDK/IntelliDesk-AI",
    imageUrl: undefined,
    challenges: [
      "Preventing duplicate tickets accurately using 768-dimensional embeddings and cosine similarity thresholds.",
      "Parsing messy, raw IMAP email headers to accurately group related messages into unified thread chains.",
      "Synchronizing live dashboard telemetry across multiple clients in real-time using Supabase PostgreSQL subscriptions.",
      "Automating P1-P4 priority assignments and visually alerting agents to impending SLA breaches without delay.",
    ],
  },
  {
    id: "dsa-visualizer",
    title: "DSA Visualizer",
    domain: "TOOL",
    category: "Tools",
    description:
      "An interactive visualizer for data structures and algorithms. Animates sorting, searching, and graph traversals step-by-step to make CS fundamentals intuitive.",
    modalDescription:
      "As an active competitive programmer, I built this engine to help engineering peers visually comprehend how complex algorithms execute under the hood. Instead of reading static code, users can watch arrays sort, graphs traverse, and dynamic programming tables populate step-by-step. The engine handles the heavy state-management required to pause, play, and step through recursive call stacks in real time.",
    tags: ["TypeScript", "React", "Algorithms", "Data Structures", "Animations", "Tools"],
    repoUrl: "https://github.com/DINESHYDK/DSA_Visualizer",
    liveUrl: "https://dsa-visualizer-ydk.vercel.app/",
    imageUrl: "/images/projects/DsaVisualiser.png",
    challenges: [
      "Synchronizing smooth animation frames with instantaneous algorithm execution steps.",
      "Supporting multiple diverse algorithms (graphs, arrays, trees) under a single unified visualization API.",
      "Making complex data structure mutations visually clear without cluttering the UI.",
      "Keeping the visualizer highly performant during rapid, high-speed algorithmic steps.",
    ],
  },
  {
    id: "golf-give",
    title: "GolfGive",
    domain: "WEB",
    category: "Web Apps",
    description:
      "A full-stack charity golf tournament platform featuring live scoring, automated prize draws, and secure donation processing.",
    modalDescription:
      "GolfGive is a comprehensive web platform designed to streamline charity golf tournaments. Built with Next.js and Supabase, it handles the entire event lifecycle. The system features a secure authentication flow, allowing users to access a personalized dashboard to track their live scores, manage subscriptions, and view potential winnings. Simultaneously, it provides a dedicated Admin shell to manage charities, verify winners, and securely oversee donation flows integrated via Stripe.",
    tags: ["Next.js", "Supabase", "Stripe", "Tailwind CSS", "Web"],
    repoUrl: "https://github.com/DINESHYDK/golf_charity",
    liveUrl: "https://golf-charity-digitalheroes.vercel.app",
    imageUrl: "/images/projects/GolfGive.png",
    challenges: [
      "Integrating Stripe webhooks to reliably process one-time charity donations and recurring user subscriptions.",
      "Designing a secure Role-Based Access Control (RBAC) admin system to verify scores, trigger draws, and manage users.",
      "Structuring the Supabase relational database to seamlessly link users, their live tournament scores, and their respective charity contributions.",
      "Building a responsive, real-time dashboard for users to track their tournament standings and winnings dynamically.",
    ],
  },
  {
    id: "trackpad-writer",
    title: "Trackpad Writer",
    domain: "TOOL",
    category: "Tools",
    description:
      "A lightweight, browser-based digital canvas that transforms a laptop trackpad into a fluid handwriting and signature capture tool.",
    modalDescription:
      "Trackpad Writer is a minimalist web frontend experiment. I built it to capture smooth, precise handwriting directly from a laptop's trackpad without needing an external stylus or drawing tablet. Leveraging the HTML5 Canvas API and native DOM pointer events, the tool allows users to draw, write, and capture digital signatures instantly, right inside their browser.",
    tags: ["JavaScript", "HTML5 Canvas", "DOM Events", "Tools", "UI/UX"],
    repoUrl: "https://github.com/DINESHYDK/Trackpad-Writer",
    liveUrl: "https://trackpad-writer.vercel.app/",
    imageUrl: "/images/projects/TrackpadWriter.png",
    challenges: [
      "Mapping absolute screen coordinates to the relative HTML canvas bounds accurately during continuous mouse/touch events.",
      "Smoothing out jagged input coordinate movements to render natural-looking, fluid handwriting strokes.",
      "Handling dynamic window resizing and ensuring the canvas context doesn't stretch or warp the user's drawing.",
      "Keeping the application extremely lightweight and performant by strictly using vanilla web technologies without heavy external frameworks.",
    ],
  },
];