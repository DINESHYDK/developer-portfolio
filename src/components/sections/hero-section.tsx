import { ArrowDown, FileText } from "lucide-react";
import { SITE_METADATA } from "@/config/site-metadata";
import { cn } from "@/utils/cn";

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

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Greeting */}
        <p className="text-accent-primary font-mono text-sm mb-4 tracking-wider">
          Hi, my name is
        </p>

        {/* Name */}
        <h1 className="font-poppins text-5xl md:text-7xl font-bold text-text-heading mb-4">
          {SITE_METADATA.name}
        </h1>

        {/* Role */}
        <h2 className="font-poppins text-2xl md:text-4xl font-semibold text-text-body mb-6">
          {SITE_METADATA.role}
        </h2>

        {/* Description */}
        <p className="text-text-body font-jakarta text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          {SITE_METADATA.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
            href="#contact"
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown size={20} className="text-text-body/50" />
      </div>
    </section>
  );
};

export default HeroSection;

