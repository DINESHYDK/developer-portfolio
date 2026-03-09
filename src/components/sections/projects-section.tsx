import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Puzzle } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";
import { cn } from "@/utils/cn";

const SPRING_CARD = { type: "spring" as const, stiffness: 280, damping: 22 };

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-accent-primary mb-4">
            Projects
          </h2>
          <p className="text-text-body font-jakarta max-w-lg mx-auto">
            Selected work and experiments
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-jakarta font-medium",
                  "transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-accent-primary",
                  activeCategory === cat
                    ? "bg-accent-primary text-bg-primary shadow-[0_0_16px_rgba(142,202,230,0.25)]"
                    : "bg-bg-surface text-text-body border border-border-subtle hover:border-accent-primary/30 hover:text-text-heading"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            {filteredProjects.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_CARD, delay: i * 0.07 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "group rounded-3xl overflow-hidden",
                  "bg-bg-surface border border-border-subtle",
                  "cursor-pointer"
                )}
                style={{ willChange: "transform" }}
              >
                {/* Project Preview Area */}
                <div className="relative h-48 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/5 flex items-center justify-center overflow-hidden">
                  <div className="flex flex-col items-center gap-2 text-text-body/40 group-hover:scale-110 transition-transform duration-500">
                    <Puzzle size={36} />
                    <span className="text-sm font-jakarta">Preview</span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="font-poppins text-lg font-semibold text-text-heading mb-2 group-hover:text-accent-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-text-body font-jakarta text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono rounded-full bg-accent-primary/10 text-accent-primary border border-accent-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-2 border-t border-border-subtle">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-2 text-sm text-text-body font-jakarta",
                          "transition-colors duration-300 hover:text-accent-primary",
                          "focus:outline-none focus:ring-2 focus:ring-accent-primary rounded-sm"
                        )}
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-2 text-sm text-text-body font-jakarta",
                          "transition-colors duration-300 hover:text-accent-secondary",
                          "focus:outline-none focus:ring-2 focus:ring-accent-primary rounded-sm"
                        )}
                        aria-label={`View ${project.title} live demo`}
                      >
                        <ExternalLink size={16} />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
