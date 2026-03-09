import { useState } from "react";
import { Send, Loader2, Mail, Terminal } from "lucide-react";
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
const TERMINAL_LINES = [
  { type: "input" as const, text: "whoami" },
  { type: "output" as const, text: "dinesh-ydk — Full-Stack Developer" },
  { type: "input" as const, text: "cat skills.txt" },
  {
    type: "output" as const,
    text: "React • TypeScript • Node.js • Express • MongoDB • Tailwind CSS",
  },
  { type: "input" as const, text: "echo $STATUS" },
  { type: "output" as const, text: "Open to opportunities 🚀" },
];

const DevTerminal = () => {
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<
    { type: "input" | "output"; text: string }[]
  >([]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const command = inputValue.trim().toLowerCase();
    let output = `command not found: ${inputValue}`;

    if (command === "help") {
      output =
        "Available commands: help, whoami, skills, projects, contact, clear, theme light";
    } else if (command === "whoami") {
      output = "dinesh-ydk — Full-Stack Developer";
    } else if (command === "skills") {
      output =
        "React • TypeScript • Node.js • Express • MongoDB • Tailwind CSS";
    } else if (command === "projects") {
      output =
        'Type "projects" to see my work → Scroll up to Projects section';
    } else if (command === "contact") {
      output = "Scroll down to the contact form or email: dinesh@example.com";
    } else if (command === "clear") {
      setCommandHistory([]);
      setInputValue("");
      return;
    } else if (command === "theme light") {
      output = "🚫 Error 403: True developers code in the dark.";
    }

    setCommandHistory((prev) => [
      ...prev,
      { type: "input", text: inputValue },
      { type: "output", text: output },
    ]);
    setInputValue("");
  };

  return (
    <div
      className={cn(
        "rounded-3xl overflow-hidden",
        "bg-bg-primary border border-border-subtle",
        "shadow-2xl shadow-black/40"
      )}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center gap-2 px-5 py-3 bg-bg-surface border-b border-border-subtle">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-4 text-text-body/50 text-xs font-mono">
          guest@ydk-portfolio ~ %
        </span>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm space-y-2 min-h-[280px] max-h-[360px] overflow-y-auto">
        {TERMINAL_LINES.map((line, index) => (
          <div key={index}>
            {line.type === "input" ? (
              <p>
                <span className="text-accent-secondary">❯ </span>
                <span className="text-text-heading">{line.text}</span>
              </p>
            ) : (
              <p className="text-text-body pl-4">{line.text}</p>
            )}
          </div>
        ))}

        {commandHistory.map((line, index) => (
          <div key={`cmd-${index}`}>
            {line.type === "input" ? (
              <p>
                <span className="text-accent-secondary">❯ </span>
                <span className="text-text-heading">{line.text}</span>
              </p>
            ) : (
              <p className="text-text-body pl-4">{line.text}</p>
            )}
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex items-center">
          <span className="text-accent-secondary">❯ </span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent text-text-heading outline-none border-none ml-1 font-mono text-sm placeholder-text-body/30"
            placeholder="Type a command..."
            aria-label="Terminal command input"
          />
          {!inputValue && (
            <span className="w-2 h-4 bg-accent-primary animate-pulse" />
          )}
        </form>
      </div>
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
          {activeTab === "contact" ? (
            /* Contact Form */
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
          ) : (
            /* Dev Terminal */
            <DevTerminal />
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

