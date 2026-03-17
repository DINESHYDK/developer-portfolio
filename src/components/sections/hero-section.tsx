import { ArrowDown, FileText } from "lucide-react";
import { SITE_METADATA } from "@/config/site-metadata";
import { cn } from "@/utils/cn";
import IdCard from "@/components/id-card/IdCard";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      {/* Subtle gradient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Two-column layout: Card (left) + Text (right) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-16 md:gap-24 py-8">

        {/* ── Left: ID Card ── */}
        <div className="flex justify-center">
          <IdCard />
        </div>

        {/* ── Right: Text content ── */}
        <div className="text-center md:text-left max-w-xl flex flex-col gap-4">
          {/* Greeting */}
          <p className="text-accent-primary font-mono text-sm tracking-wider">
            Hi, my name is
          </p>

          {/* Name */}
          <h1 className="font-poppins text-5xl md:text-6xl font-bold text-text-heading leading-tight">
            {SITE_METADATA.name}
          </h1>

          {/* Role */}
          <h2 className="font-poppins text-2xl md:text-3xl font-semibold text-text-body">
            {SITE_METADATA.role}
          </h2>

          {/* Description */}
          <p className="text-text-body font-jakarta text-lg md:text-xl leading-relaxed">
            {SITE_METADATA.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 mt-2">
            <a
              href="#projects"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 rounded-2xl",
                "bg-accent-primary text-bg-primary font-jakarta font-semibold",
                "transition-all duration-300",
                "hover:bg-accent-primary/90 hover:shadow-[0_0_20px_rgba(142,202,230,0.3)]",
                "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-primary"
              )}
            >
              View My Work
              <ArrowDown size={18} />
            </a>
            <a
              href={"/resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 rounded-2xl",
                "border border-accent-primary text-accent-primary font-jakarta font-semibold",
                "transition-all duration-300",
                "hover:bg-accent-primary/10",
                "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-primary"
              )}
            >
              <FileText size={18} />
              Resume
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown size={20} className="text-text-body/50" />
      </div>
    </section>
  );
};

export default HeroSection;