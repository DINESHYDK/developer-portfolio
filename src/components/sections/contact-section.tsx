import { useState, useRef, useEffect } from "react";
import {
  Send, Loader2, Mail, Terminal,
  Sun, X, Minus, Maximize2, Minimize2,
  AlertTriangle, Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ContactFormData } from "@/types";
import { cn } from "@/utils/cn";

const INITIAL_FORM_STATE: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

/* ===========================
   Terminal Sub-Component
   =========================== */

const VALID_COMMANDS = new Set([
  "help", "whoami", "skills", "projects", "contact",
  "clear", "theme light", "date", "echo $status", "ls",
]);

type HistoryLine = {
  type: "input" | "output" | "error";
  text: string;
};

const BOOT_LINES: HistoryLine[] = [
  { type: "input", text: "whoami" },
  { type: "output", text: "dinesh-ydk — Full-Stack Developer" },
  { type: "input", text: "cat skills.txt" },
  { type: "output", text: "React • TypeScript • Node.js • Express • MongoDB • Tailwind CSS" },
  { type: "input", text: "echo $STATUS" },
  { type: "output", text: "Open to opportunities — STATUS=ACTIVE" },
];

type DevTerminalProps = {
  onClose: () => void;
};

const DevTerminal = ({ onClose }: DevTerminalProps) => {
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<HistoryLine[]>(BOOT_LINES);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll only the terminal's inner div — never the page
  useEffect(() => {
    const el = scrollAreaRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, inputValue]);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const liveInputColor = () => {
    if (!inputValue.trim()) return "text-white/70";
    return VALID_COMMANDS.has(inputValue.trim().toLowerCase())
      ? "text-[#A7F3D0]"   // valid → pastel green
      : "text-[#FDBA74]";  // invalid → pastel orange
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // ← prevents the page from scrolling
    if (!inputValue.trim()) return;

    const raw = inputValue.trim();
    const command = raw.toLowerCase();

    if (command === "clear") {
      setHistory([]);
      setInputValue("");
      return;
    }

    if (command === "theme light") {
      setHistory((prev) => [
        ...prev,
        { type: "input", text: raw },
        { type: "error", text: "identity-crisis: real developers don't use light theme." },
      ]);
      setInputValue("");
      setShowEasterEgg(true);
      return;
    }

    let output = "";
    let isError = false;

    switch (command) {
      case "help":
        output = "commands: help  whoami  skills  projects  contact  date  ls  clear  theme light";
        break;
      case "whoami":
        output = "dinesh-ydk — Full-Stack Developer & Competitive Programmer";
        break;
      case "skills":
        output = "React • TypeScript • Node.js • Express • MongoDB • Tailwind CSS • Framer Motion";
        break;
      case "projects":
        output = "→ Scroll up to the Projects section  |  github.com/dineshydk";
        break;
      case "contact":
        output = "dinesh@example.com  |  Switch to Contact tab for the form";
        break;
      case "date":
        output = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST";
        break;
      case "echo $status":
        output = "STATUS=OPEN_TO_OPPORTUNITIES";
        break;
      case "ls":
        output = "projects/  skills/  about.md  contact.txt  README.md";
        break;
      default:
        output = `zsh: command not found: ${raw}`;
        isError = true;
    }

    setHistory((prev) => [
      ...prev,
      { type: "input", text: raw },
      { type: isError ? "error" : "output", text: output },
    ]);
    setInputValue("");
  };

  return (
    <div className="relative">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className={cn(
          "relative flex flex-col font-mono overflow-hidden",
          "bg-[#0D1117]",
          "border-2 border-[rgba(142,202,230,0.18)] rounded-2xl",
          "shadow-[0_0_40px_rgba(142,202,230,0.07),0_8px_32px_rgba(0,0,0,0.7)]",
          isMaximized ? "h-[540px]" : "h-[420px]"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {/* ── Title Bar ── */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-[rgba(142,202,230,0.1)] shrink-0">
          {/* Traffic lights */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            title="Back to Contact"
            className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all flex items-center justify-center group"
          >
            <X size={7} className="opacity-0 group-hover:opacity-100 text-[#6e0c00] stroke-[3]" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setHistory([]); }}
            title="Clear terminal"
            className="w-3.5 h-3.5 rounded-full bg-[#FEBC2E] hover:brightness-110 transition-all flex items-center justify-center group"
          >
            <Minus size={7} className="opacity-0 group-hover:opacity-100 text-[#6e4a00] stroke-[3]" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsMaximized((p) => !p); }}
            title={isMaximized ? "Restore" : "Maximize"}
            className="w-3.5 h-3.5 rounded-full bg-[#28C840] hover:brightness-110 transition-all flex items-center justify-center group"
          >
            {isMaximized
              ? <Minimize2 size={7} className="opacity-0 group-hover:opacity-100 text-[#0a3d0a] stroke-[3]" />
              : <Maximize2 size={7} className="opacity-0 group-hover:opacity-100 text-[#0a3d0a] stroke-[3]" />
            }
          </button>

          <span className="ml-3 text-[#8ECAE6]/40 text-xs tracking-wide select-none">
            guest@ydk-portfolio ~ %
          </span>

          {/* Easter egg trigger */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setShowEasterEgg(true); }}
            title="Toggle theme (dare you)"
            className="ml-auto p-1 rounded-md text-[#8ECAE6]/30 hover:text-[#8ECAE6]/70 hover:bg-white/5 transition-colors"
          >
            <Sun size={13} />
          </button>
        </div>

        {/* ── Scrollable History ── */}
        <div
          ref={scrollAreaRef}
          className="flex-1 overflow-y-auto px-5 py-4 space-y-[3px]"
          style={{ overscrollBehavior: "contain" }}
        >
          {history.map((line, i) => (
            <div key={i} className="leading-[1.65]">
              {line.type === "input" ? (
                <div className="flex items-baseline gap-2">
                  {/* prompt arrow */}
                  <span className="text-[#A7F3D0] text-sm leading-none shrink-0">❯</span>
                  {/* sent command — always blue */}
                  <span className="text-[#60A5FA] text-sm break-all">{line.text}</span>
                </div>
              ) : line.type === "error" ? (
                <p className="text-[#FCA5A5] text-sm pl-5 break-all">{line.text}</p>
              ) : (
                <p className="text-[#94A3B8] text-sm pl-5 break-all">{line.text}</p>
              )}
            </div>
          ))}

          {/* ── Live preview: mirrors what's in the input box in real-time ── */}
          <div className="flex items-baseline gap-2 leading-[1.65]">
            <span className="text-[#A7F3D0] text-sm leading-none shrink-0">❯</span>
            <span className={cn("text-sm break-all transition-colors duration-100", liveInputColor())}>
              {inputValue || <span className="opacity-0">_</span>}
              {/* blinking cursor */}
              {!inputValue && (
                <span className="inline-block w-[7px] h-[14px] bg-[#8ECAE6]/50 rounded-[2px] animate-pulse align-middle" />
              )}
            </span>
          </div>
        </div>

        {/* ── Input Row (fixed at bottom) ── */}
        <div className="shrink-0 flex items-center gap-2 px-5 py-3 border-t border-[rgba(142,202,230,0.08)] bg-[#0D1117]">
          <span className="text-[#A7F3D0] text-sm select-none shrink-0">❯</span>
          <form
            onSubmit={handleCommand}
            className="flex-1 flex items-center gap-2 min-w-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                // Prevent space-bar from triggering page scroll
                if (e.key === " ") e.stopPropagation();
              }}
              className={cn(
                "flex-1 min-w-0 bg-transparent outline-none border-none font-mono text-sm",
                "placeholder-white/20 transition-colors duration-100",
                liveInputColor()
              )}
              placeholder="Type a command…"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="submit"
              className="shrink-0 px-3 py-1 rounded-lg text-xs font-mono border border-white/10 text-white/30 hover:bg-white/5 hover:text-white/60 transition-all duration-150"
            >
              ↵ run
            </button>
          </form>
        </div>
      </motion.div>

      {/* ── Easter Egg Modal (stays inside the terminal div) ── */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#0D1117]/92 backdrop-blur-md" />

            <div className="relative z-10 px-8 py-8 max-w-[280px] text-center">
              {/* Icon row */}
              <div className="flex items-center justify-center gap-3 mb-5">
                <AlertTriangle size={28} className="text-[#FDBA74]" />
                <Sun size={32} className="text-[#FBBF24]" />
                <Zap size={28} className="text-[#FCA5A5]" />
              </div>

              <h3 className="font-poppins font-bold text-white text-lg mb-2 tracking-tight">
                Gotcha!
              </h3>
              <p className="font-mono text-sm text-[#FDBA74] leading-relaxed">
                You are{" "}
                <span className="line-through text-[#FCA5A5]">not</span>{" "}
                a real developer.
              </p>
              <p className="font-mono text-xs text-[#94A3B8] mt-2 leading-relaxed">
                Real developers don&apos;t use{" "}
                <span className="text-[#FBBF24]">light theme</span>.
              </p>

              {/* Bouncing dots */}
              <div className="mt-5 flex items-center justify-center gap-1.5">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="w-1.5 h-1.5 rounded-full bg-[#8ECAE6] animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowEasterEgg(false)}
                className="mt-6 px-5 py-2 rounded-xl bg-[#8ECAE6]/10 border border-[#8ECAE6]/20 text-[#8ECAE6] text-xs font-mono hover:bg-[#8ECAE6]/20 transition-colors"
              >
                Back to the dark side.
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ===========================
   Main Contact Section
   =========================== */
type Tab = "contact" | "terminal";

const ContactSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>("contact");
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData(INITIAL_FORM_STATE);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch {
      console.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = cn(
    "w-full px-4 py-4 rounded-2xl",
    "bg-bg-primary border border-border-default",
    "text-text-heading font-jakarta placeholder-text-body/50",
    "transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent",
    "hover:border-accent-primary/30"
  );

  return (
    <section id="contact" className="py-20 px-6 bg-bg-surface">
      <div className="mx-auto max-w-5xl">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-text-heading mb-4">
            Get In <span className="text-accent-primary">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-accent-primary mx-auto rounded-full" />
          <p className="text-text-body font-jakarta mt-4 max-w-lg mx-auto">
            Have a question or want to work together? Drop me a message — or
            explore the terminal.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full bg-bg-primary border border-border-subtle p-1">
            <button
              onClick={() => setActiveTab("contact")}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-2.5 rounded-full",
                "text-sm font-jakarta font-medium",
                "transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-accent-primary",
                activeTab === "contact"
                  ? "bg-accent-primary text-bg-primary shadow-[0_0_16px_rgba(142,202,230,0.25)]"
                  : "text-text-body hover:text-text-heading"
              )}
            >
              <Mail size={16} />
              Contact
            </button>
            <button
              onClick={() => setActiveTab("terminal")}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-2.5 rounded-full",
                "text-sm font-jakarta font-medium",
                "transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-accent-secondary",
                activeTab === "terminal"
                  ? "bg-accent-secondary text-bg-primary shadow-[0_0_16px_rgba(167,243,208,0.25)]"
                  : "text-text-body hover:text-text-heading"
              )}
            >
              <Terminal size={16} />
              Dev Mode
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "contact" ? (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-text-heading font-jakarta text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-text-heading font-jakarta text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-text-heading font-jakarta text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      className={cn(inputClasses, "resize-none")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl",
                      "bg-accent-primary text-bg-primary font-jakarta font-semibold",
                      "transition-all duration-300",
                      "hover:bg-accent-primary/90 hover:shadow-[0_0_20px_rgba(142,202,230,0.3)]",
                      "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-surface",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>

                  {isSuccess && (
                    <div className="text-center p-4 rounded-2xl bg-accent-secondary/10 border border-accent-secondary/30">
                      <p className="text-accent-secondary font-jakarta font-medium">
                        ✓ Message sent successfully! I&apos;ll get back to you soon.
                      </p>
                    </div>
                  )}
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="terminal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Dev Terminal */}
                <DevTerminal onClose={() => setActiveTab("contact")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

