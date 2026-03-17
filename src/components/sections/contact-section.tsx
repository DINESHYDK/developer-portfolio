import { useState, useRef, useEffect } from "react";
import {
  Send, Loader2, Mail, Terminal,
  Sun, X, Minus, Maximize2, Minimize2,
  AlertTriangle, Zap, Lock, CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ContactFormData } from "@/types";
import { cn } from "@/utils/cn";
import { haptic } from "@/utils/haptic";
import {
  VALID_COMMAND_NAMES,
  BOOT_SEQUENCE,
  resolveCommand,
} from "@/data/terminal-commands";

const INITIAL_FORM_STATE: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

/* ===========================
   Terminal Sub-Component
   =========================== */

type HistoryLine = {
  type: "input" | "output" | "error";
  text: string;
};

/** Convert BOOT_SEQUENCE to flat HistoryLine[] */
const buildBootLines = (): HistoryLine[] => {
  const lines: HistoryLine[] = [];
  for (const step of BOOT_SEQUENCE) {
    lines.push({ type: "input", text: step.command });
    for (const out of step.outputLines) {
      lines.push({ type: "output", text: out });
    }
  }
  return lines;
};

type DevTerminalProps = {
  onClose: () => void;
};

const DevTerminal = ({ onClose }: DevTerminalProps) => {
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<HistoryLine[]>(buildBootLines);
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
    return VALID_COMMAND_NAMES.has(inputValue.trim().toLowerCase())
      ? "text-[#A7F3D0]"   // valid → pastel green
      : "text-[#FDBA74]";  // invalid → pastel orange
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inputValue.trim()) return;

    const raw = inputValue.trim();
    const result = resolveCommand(raw);

    // Handle side effects
    if (result.sideEffect === "clear") {
      setHistory([]);
      setInputValue("");
      return;
    }

    if (result.sideEffect === "easter-egg") {
      setHistory((prev) => [
        ...prev,
        { type: "input", text: raw },
        { type: "error", text: result.lines[0]?.type === "text" ? result.lines[0].text : "" },
      ]);
      setInputValue("");
      setShowEasterEgg(true);
      return;
    }

    // Build history lines from result
    const newLines: HistoryLine[] = [{ type: "input", text: raw }];

    for (const line of result.lines) {
      if (line.type === "download") {
        // Trigger download as side effect
        const a = document.createElement("a");
        a.href = line.href;
        a.download = "";
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        if (line.text) newLines.push({ type: "output", text: line.text });
      } else if (line.type === "scroll") {
        // Smooth scroll to target
        if (line.target) {
          const el = document.querySelector(line.target);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
        if (line.text) newLines.push({ type: "output", text: line.text });
      } else if (line.type === "link") {
        newLines.push({ type: result.isError ? "error" : "output", text: line.text });
      } else {
        if (line.text) {
          newLines.push({ type: result.isError ? "error" : "output", text: line.text });
        }
      }
    }

    setHistory((prev) => [...prev, ...newLines]);
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
   Focus Ring — border-draw animation
   Clockwise from top-left, completes in ~550ms
   =========================== */
const FocusRing = ({ focused }: { focused: boolean }) => {
  const svgRef  = useRef<SVGSVGElement>(null);
  const [path, setPath] = useState("");

  const measure = useRef(() => {
    const el = svgRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;
    const r = 14;   // matches rounded-2xl (≈16px) minus stroke inset
    const s = 1.5;  // half-stroke inset
    // Clockwise path starting at top-left straight edge
    setPath(
      `M ${s + r} ${s}` +
      ` H ${w - s - r}` +
      ` Q ${w - s} ${s} ${w - s} ${s + r}` +
      ` V ${h - s - r}` +
      ` Q ${w - s} ${h - s} ${w - s - r} ${h - s}` +
      ` H ${s + r}` +
      ` Q ${s} ${h - s} ${s} ${h - s - r}` +
      ` V ${s + r}` +
      ` Q ${s} ${s} ${s + r} ${s} Z`
    );
  });

  useEffect(() => {
    const fn = measure.current;
    fn();
    const ro = new ResizeObserver(fn);
    if (svgRef.current) ro.observe(svgRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      {path && (
        <motion.path
          d={path}
          fill="none"
          stroke="#8ECAE6"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: focused ? 1 : 0,
            opacity:    focused ? 1 : 0,
          }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        />
      )}
    </svg>
  );
};

/* ===========================
   Main Contact Section
   =========================== */
type Tab = "contact" | "terminal";

const ContactSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>("contact");
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    haptic("confirm");
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
    "bg-bg-primary border-2 border-[rgba(255,255,255,0.14)]",
    "text-text-heading font-jakarta placeholder-text-body/40",
    "transition-colors duration-200 outline-none",
    "hover:border-[rgba(255,255,255,0.3)]"
  );


  const switchTab = (tab: Tab) => {
    setSlideDir(tab === "terminal" ? 1 : -1);
    setActiveTab(tab);
  };

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 50 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -50 }),
  };

  return (
    <section id="contact" className="py-20 px-6 bg-bg-surface">
      <div className="mx-auto max-w-5xl">
        {/* Section Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
        >
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-text-heading mb-4">
            Get In <span className="text-accent-primary">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-accent-primary mx-auto rounded-full" />
          <p className="text-text-body font-jakarta mt-4 max-w-lg mx-auto">
            Have a question or want to work together? Drop me a message — or
            explore the terminal.
          </p>
        </motion.div>

        {/* ── Tab Switcher — layoutId sliding pill ── */}
        <div className="flex justify-center mb-10">
          <div className="relative inline-flex items-center rounded-full bg-bg-primary border border-border-subtle p-1">
            {/* Sliding background pill — changes colour based on active tab */}
            <motion.div
              layoutId="tab-pill"
              className={cn(
                "absolute top-1 bottom-1 rounded-full",
                activeTab === "contact"
                  ? "bg-accent-primary shadow-[0_0_18px_rgba(142,202,230,0.3)]"
                  : "bg-accent-secondary shadow-[0_0_18px_rgba(167,243,208,0.3)]"
              )}
              // Measure the correct pill width by matching whichever button is active
              style={activeTab === "contact" ? { left: 4, right: "50%" } : { left: "50%", right: 4 }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
            />

            <button
              onClick={() => switchTab("contact")}
              className={cn(
                "relative z-10 inline-flex items-center gap-2 px-6 py-2.5 rounded-full",
                "text-sm font-jakarta font-medium select-none",
                "transition-colors duration-300 focus:outline-none",
                activeTab === "contact" ? "text-bg-primary" : "text-text-body hover:text-text-heading"
              )}
            >
              <Mail size={16} />
              Contact
            </button>
            <button
              onClick={() => switchTab("terminal")}
              className={cn(
                "relative z-10 inline-flex items-center gap-2 px-6 py-2.5 rounded-full",
                "text-sm font-jakarta font-medium select-none",
                "transition-colors duration-300 focus:outline-none",
                activeTab === "terminal" ? "text-bg-primary" : "text-text-body hover:text-text-heading"
              )}
            >
              <Terminal size={16} />
              Dev Mode
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-2xl mx-auto overflow-hidden">
          <AnimatePresence mode="wait" custom={slideDir}>
            {activeTab === "contact" ? (
              <motion.div
                key="contact"
                custom={slideDir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              >
                {/* Contact Form — clean, no extra motion */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-text-heading font-jakarta text-sm font-medium mb-2">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        id="name" name="name" type="text" required
                        value={formData.name} onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your name" className={inputClasses}
                      />
                      <FocusRing focused={focusedField === "name"} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-text-heading font-jakarta text-sm font-medium mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        id="email" name="email" type="email" required
                        value={formData.email} onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="your@email.com" className={inputClasses}
                      />
                      <FocusRing focused={focusedField === "email"} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-text-heading font-jakarta text-sm font-medium mb-2">
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message" name="message" required rows={6}
                        value={formData.message} onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell me about your project..."
                        className={cn(inputClasses, "resize-none")}
                      />
                      <FocusRing focused={focusedField === "message"} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-1">
                    <Lock size={13} className="text-text-body/50 shrink-0" />
                    <p className="text-text-body/50 font-jakarta text-xs">
                      Your information is secure and will only be used to contact you back.
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileTap={!isLoading ? { scale: 0.97 } : undefined}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl",
                      "bg-accent-primary text-bg-primary font-jakarta font-semibold",
                      "transition-colors duration-200",
                      "hover:brightness-105 hover:shadow-[0_0_20px_rgba(142,202,230,0.28)]",
                      "focus:outline-none",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {isLoading ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={18} /> Send Message</>
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {isSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -6 }}
                        transition={{ type: "spring", stiffness: 320, damping: 24 }}
                        className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-accent-secondary/10 border border-accent-secondary/30"
                      >
                        <CheckCircle2 size={18} className="text-accent-secondary shrink-0" />
                        <p className="text-accent-secondary font-jakarta font-medium text-sm">
                          Message sent! I&apos;ll get back to you soon.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="terminal"
                custom={slideDir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              >
                <DevTerminal onClose={() => switchTab("contact")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

