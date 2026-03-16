import { profileData } from "@/data/profile-data";
import { PROJECTS } from "@/data/projects";

export type TerminalOutput =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string }
  | { type: "download"; text: string; href: string }
  | { type: "scroll"; text: string; target: string };

export type CommandResult = {
  lines: TerminalOutput[];
  isError?: boolean;
  sideEffect?: "clear" | "easter-egg";
};

export const VALID_COMMAND_NAMES = new Set([
  "help", "whoami", "skills", "projects", "contact",
  "clear", "theme light", "date", "echo $status", "ls",
  "cat about.md", "ls projects/", "ping opportunities",
  "git log --oneline -1", "open resume", "sudo hire-me",
  "cat skills.txt",
]);

/** Returns the result lines for a given command string. */
export function resolveCommand(raw: string): CommandResult {
  const command = raw.trim().toLowerCase();

  switch (command) {
    case "clear":
      return { lines: [], sideEffect: "clear" };

    case "theme light":
      return {
        lines: [{ type: "text", text: "identity-crisis: real developers don't use light theme." }],
        isError: true,
        sideEffect: "easter-egg",
      };

    case "help":
      return {
        lines: [
          { type: "text", text: "Available commands:" },
          { type: "text", text: "  whoami          → who am I?" },
          { type: "text", text: "  cat about.md    → my philosophy" },
          { type: "text", text: "  cat skills.txt  → tech stack" },
          { type: "text", text: "  ls projects/    → shipped projects" },
          { type: "text", text: "  ping opportunities → availability" },
          { type: "text", text: "  git log --oneline -1 → latest commit" },
          { type: "text", text: "  open resume     → download resume" },
          { type: "text", text: "  contact         → contact info" },
          { type: "text", text: "  sudo hire-me    → make it happen" },
          { type: "text", text: "  date            → current time IST" },
          { type: "text", text: "  ls              → list files" },
          { type: "text", text: "  clear           → clear terminal" },
          { type: "text", text: "  theme light     → (you don't want to do this)" },
        ],
      };

    case "whoami":
      return {
        lines: [
          { type: "text", text: `${profileData.handle} — ${profileData.title} & Competitive Programmer` },
        ],
      };

    case "cat about.md":
      return {
        lines: [
          { type: "text", text: '"Every pixel has a purpose. Every line of code is a signature."' },
        ],
      };

    case "skills":
    case "cat skills.txt":
      return {
        lines: [
          { type: "text", text: "React • TypeScript • Node.js • Express • MongoDB • Tailwind CSS • Framer Motion" },
        ],
      };

    case "ls projects/":
      return {
        lines: PROJECTS.map((p) => ({ type: "text" as const, text: `  → ${p.title}` })),
      };

    case "projects":
      return {
        lines: [
          { type: "text", text: "→ Scroll up to the Projects section" },
          { type: "link", text: "  github.com/dineshydk", href: "https://github.com/dineshydk" },
        ],
      };

    case "ping opportunities":
      return {
        lines: [
          { type: "text", text: "PING opportunities..." },
          { type: "text", text: "PONG — STATUS=ACTIVE. Response time: instant ⚡" },
        ],
      };

    case "git log --oneline -1":
      return {
        lines: [
          { type: "text", text: 'a3f91bc "still shipping, never stopping"' },
        ],
      };

    case "open resume":
      return {
        lines: [
          { type: "download", text: "Opening resume.pdf...", href: profileData.resumeUrl },
        ],
      };

    case "contact":
      return {
        lines: [
          { type: "text", text: "Email   → dinesh@example.com" }, // TODO: replace with real email
          { type: "scroll", text: "→ Scrolling to contact form...", target: "#contact" },
        ],
      };

    case "echo $status":
      return {
        lines: [{ type: "text", text: "STATUS=OPEN_TO_OPPORTUNITIES" }],
      };

    case "sudo hire-me":
      return {
        lines: [
          { type: "text", text: "🔐 Checking permissions..." },
          { type: "text", text: "✅ Permission granted. Redirecting to contact..." },
          { type: "scroll", text: "", target: "#contact" },
        ],
      };

    case "date":
      return {
        lines: [
          {
            type: "text",
            text: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
          },
        ],
      };

    case "ls":
      return {
        lines: [
          { type: "text", text: "projects/  skills/  about.md  contact.txt  README.md" },
        ],
      };

    default:
      return {
        lines: [{ type: "text", text: `zsh: command not found: ${raw.trim()}` }],
        isError: true,
      };
  }
}

/** The auto-typed boot sequence shown on terminal mount */
export const BOOT_SEQUENCE: { command: string; outputLines: string[] }[] = [
  {
    command: "whoami",
    outputLines: [`${profileData.handle} — ${profileData.title}`],
  },
  {
    command: "cat about.md",
    outputLines: ['"Every pixel has a purpose. Every line of code is a signature."'],
  },
  {
    command: "echo $STATUS",
    outputLines: ["Open to opportunities — STATUS=ACTIVE"],
  },
];