import { motion } from "framer-motion";
import { Code, Zap, Globe } from "lucide-react";
import { SITE_METADATA } from "@/config/site-metadata";
import { cn } from "@/utils/cn";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-text-heading mb-4">
            About <span className="text-accent-primary">Me</span>
          </h2>
          <div className="w-16 h-1 bg-accent-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Bio */}
          <div className="space-y-6">
            <p className="text-text-body font-jakarta text-lg leading-relaxed">
              I&apos;m{" "}
              <span className="text-accent-primary font-semibold">
                {SITE_METADATA.name}
              </span>
              , a passionate frontend developer transitioning into the{" "}
              <span className="text-accent-secondary font-semibold">
                MERN stack
              </span>
              . I love building clean, responsive, and accessible web
              experiences that make a difference.
            </p>
            <p className="text-text-body font-jakarta text-lg leading-relaxed">
              With a strong foundation in React, TypeScript, and modern CSS, I'm
              now expanding my skills into backend development with Node.js,
              Express, and MongoDB. I believe in writing code that is not just
              functional, but maintainable and scalable.
            </p>
            <p className="text-text-body font-jakarta text-lg leading-relaxed">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source, or experimenting with creative UI
              designs.
            </p>
          </div>

          {/* Right: Highlight Cards */}
          <div className="grid gap-6">
            {[
              {
                icon: <Code size={24} />,
                title: "Clean Code",
                description:
                  "I write TypeScript-first, component-driven code with a focus on readability and reusability.",
              },
              {
                icon: <Zap size={24} />,
                title: "Performance",
                description:
                  "Optimized for speed with lazy loading, code splitting, and modern build tools like Vite.",
              },
              {
                icon: <Globe size={24} />,
                title: "Accessible",
                description:
                  "Semantic HTML, ARIA labels, keyboard navigation — I build for everyone.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={cn(
                  "p-6 rounded-3xl",
                  "bg-bg-surface border border-border-subtle",
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="text-accent-primary shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-poppins text-lg font-semibold text-text-heading mb-2">
                      {item.title}
                    </h3>
                    <p className="text-text-body font-jakarta text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

