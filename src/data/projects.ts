import type { Project } from "@/types";

export const PROJECT_CATEGORIES = [
  "All",
  "Web Apps",
  "AI Projects",
  "Tools",
] as const;

export const PROJECTS: Project[] = [
  {
    id: "rubiks-cube-solver",
    title: "Rubik’s Cube Solver",
    domain: "WEB",
    category: "Web Apps",
    featured: true,
    description:
      "Point your camera at a scrambled cube and get a solution in under 100 ms, played back on a 3D cube you can rotate.",
    modalDescription:
      "You scan each face of a real cube with your camera. A FastAPI service reads the colours with OpenCV, using K-means clustering in LAB colour space so it copes with bad lighting. Kociemba's Two-Phase algorithm then finds a solution in under 20 moves, and the app plays it back step by step on a 60 FPS Three.js cube. It has 30+ regular mobile users.",
    tags: ["React", "Three.js", "FastAPI", "OpenCV", "Algorithms", "Web"],
    repoUrl: "https://github.com/DINESHYDK/rubiks-cube-solver",
    liveUrl: "https://rubiks.dineshydk.dev",
    imageUrl: "/images/projects/RubiksCube.webp",
    challenges: [
      "Reading facelet colours correctly under uneven room lighting.",
      "Rotating face slices without floating-point drift, fixed with a quaternion-based pivot group.",
      "Building Kociemba's pruning tables in the background so the UI doesn't freeze on first load.",
      "Keeping solve history on the device with Zustand and AsyncStorage.",
    ],
  },
  {
    id: "studysync",
    title: "StudySync",
    domain: "WEB",
    category: "Web Apps",
    featured: true,
    description:
      "A study timer for friend groups: you see who's studying right now, and compare hours at the end of the day.",
    modalDescription:
      "StudySync is built around one loop. You start a session, name the subject, and your friends see it live. At the end of the day you compare totals. It got 50+ active users in the first two weeks. It installs as a PWA and has a floating timer, daily tasks, and a streak heatmap.",
    tags: ["Next.js", "Supabase", "TypeScript", "Real-Time", "PWA"],
    repoUrl: "https://github.com/DINESHYDK/Study_Sync",
    liveUrl: "https://studysync.dineshydk.dev/",
    imageUrl: "/images/projects/StudySync.webp",
    challenges: [
      "Not losing a session when someone closes the tab: a recovery flow plus navigator.sendBeacon to save the last state.",
      "Making sure you only see live sessions of accepted friends, enforced with PostgreSQL Row Level Security.",
      "Keeping friend requests and live sessions in sync across clients with Supabase Realtime and Zustand.",
      "Animating the streak heatmap flames in CSS on the GPU so the page stays smooth.",
    ],
  },
  {
    id: "agent-slam",
    title: "Agent SLAM",
    domain: "AI",
    category: "AI Projects",
    description:
      "A bot that debates live against other teams' bots over WebSockets. Took 2nd place at an IIT (ISM) competition.",
    modalDescription:
      "2nd place at an IIT (ISM) Dhanbad competition. Each team's agent connects to a debate server over WebSockets and argues in turns. Mine keeps the running transcript, and on its turn sends it to Google Gemini to write a counter-argument. Python asyncio lets it listen to the server and wait on Gemini at the same time.",
    tags: ["Python", "Asyncio", "Gemini AI", "WebSockets", "Pydantic", "AI"],
    repoUrl: "https://github.com/DINESHYDK/agent-slam",
    imageUrl: undefined,
    challenges: [
      "Handling the WebSocket stream and slow Gemini calls concurrently without missing a turn.",
      "Forcing Gemini to return valid JSON with Pydantic schemas, so a bad response couldn't crash the bot mid-match.",
      "Tracking whose turn it is with a small state machine driven by server events.",
      "Fitting a growing transcript into the model's context window.",
    ],
  },
  {
    id: "intellidesk-ai",
    title: "IntelliDesk AI",
    domain: "AI",
    category: "AI Projects",
    description:
      "Reads incoming support emails, sorts them by category and urgency, catches duplicates, and drafts replies from an FAQ.",
    modalDescription:
      "Built at HackOdisha. IntelliDesk polls a support inbox over IMAP and sends each email to Gemini 2.5 Flash, which tags category, severity and sentiment. It embeds the email (768 dimensions) and checks Pinecone for near-duplicates before opening a ticket, then drafts a reply from the closest FAQ entries. The dashboard updates live and flags tickets close to breaching their P1–P4 SLA.",
    tags: ["Next.js", "Supabase", "Pinecone", "Gemini AI", "Vector DB", "AI"],
    repoUrl: "https://github.com/DINESHYDK/IntelliDesk-AI",
    imageUrl: undefined,
    challenges: [
      "Choosing a cosine-similarity threshold that catches duplicate tickets without merging different issues.",
      "Grouping replies into the right thread from messy raw IMAP headers.",
      "Keeping several agents' dashboards in sync with Supabase PostgreSQL subscriptions.",
      "Assigning P1–P4 priority automatically and warning agents before an SLA is missed.",
    ],
  },
  {
    id: "dsa-visualizer",
    title: "DSA Visualizer",
    domain: "TOOL",
    category: "Tools",
    description:
      "Watch sorting, searching and graph algorithms run step by step, with pause, play and step controls.",
    modalDescription:
      "I made this for classmates learning DSA who found code alone hard to follow. You pick an algorithm and watch it run: arrays sorting, graphs being traversed, DP tables filling in. You can pause and step through, including through recursive calls.",
    tags: [
      "TypeScript",
      "React",
      "Algorithms",
      "Data Structures",
      "Animations",
      "Tools",
    ],
    repoUrl: "https://github.com/DINESHYDK/DSA_Visualizer",
    liveUrl: "https://dsa-visualizer-ydk.vercel.app/",
    imageUrl: "/images/projects/DsaVisualiser.webp",
    challenges: [
      "Keeping the animation in step with the algorithm, which finishes instantly.",
      "Fitting arrays, graphs and trees behind one visualisation API.",
      "Showing what changed at each step without cluttering the screen.",
      "Staying smooth at high playback speeds.",
    ],
  },
  {
    id: "golf-give",
    title: "GolfGive",
    domain: "WEB",
    category: "Web Apps",
    description:
      "Runs charity golf tournaments: players log scores, prize draws happen automatically, and donations go through Stripe.",
    modalDescription:
      "GolfGive handles a charity golf event end to end. Players sign in, track their scores and see what they might win. Admins manage charities, verify winners and run the draws. Donations and subscriptions are paid through Stripe. Built with Next.js and Supabase.",
    tags: ["Next.js", "Supabase", "Stripe", "Tailwind CSS", "Web"],
    repoUrl: "https://github.com/DINESHYDK/golf_charity",
    liveUrl: "https://golf-charity-digitalheroes.vercel.app",
    imageUrl: "/images/projects/GolfGive.webp",
    challenges: [
      "Handling Stripe webhooks reliably for both one-time donations and recurring subscriptions.",
      "Role-based access so only admins can verify scores, trigger draws and manage users.",
      "Modelling users, scores and charity contributions in Supabase so the relations stay simple to query.",
      "Updating each player's standings and winnings live.",
    ],
  },
  {
    id: "trackpad-writer",
    title: "Trackpad Writer",
    domain: "TOOL",
    category: "Tools",
    description:
      "Turns a laptop trackpad into a drawing tablet with a ₹200 stylus and a small AutoHotkey script.",
    modalDescription:
      "A drawing tablet costs around ₹3,000. This costs ₹200. A capacitive stylus works on any laptop trackpad, and an AutoHotkey script makes Caps Lock hold down the left click, so you can write and draw with one hand. It works well for notes, whiteboarding and system design sketches.",
    tags: ["AutoHotkey", "Scripting", "Hardware Hack", "Automation"],
    repoUrl: "https://github.com/DINESHYDK/Trackpad-Writer",
    liveUrl: "https://github.com/DINESHYDK/Trackpad-Writer#readme",
    liveUrlLabel: "View the Guide",
    imageUrl: "/images/projects/TrackpadWriter.webp",
    challenges: [
      "Early attempts (a mouse, or one hand clicking while the other swiped) gave bad handwriting and tired hands.",
      "Replacing the physical click with a Caps Lock toggle that holds the left button down.",
      "Finding a cheap stylus that registers on a trackpad with no pairing or charging: a universal capacitive one.",
    ],
  },
];
