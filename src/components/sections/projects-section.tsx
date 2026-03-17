import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Puzzle, ArrowUpRight, ArrowRight } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";
import type { Project } from "@/types";
import ProjectModal from "@/components/ui/project-modal";
import { cn } from "@/utils/cn";
import { haptic } from "@/utils/haptic";

const SPRING_CARD = { type: "spring" as const, stiffness: 280, damping: 22 };

const DOMAIN_COLORS: Record<string, string> = {
  AI: "text-[#A7F3D0] border-[#A7F3D0]/30 bg-[#A7F3D0]/8",
  WEB: "text-[#8ECAE6] border-[#8ECAE6]/30 bg-[#8ECAE6]/8",
  MOBILE: "text-[#C4B5FD] border-[#C4B5FD]/30 bg-[#C4B5FD]/8",
  TOOL: "text-[#FCA5A5] border-[#FCA5A5]/30 bg-[#FCA5A5]/8",
};

const FlowingMenuItem = ({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
  onOpenModal,
}: {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onOpenModal: () => void;
}) => {
  const isEven = index % 2 === 0;
  const domainColor = DOMAIN_COLORS[project.domain ?? "WEB"] ?? DOMAIN_COLORS.WEB;

  return (
    <motion.div
      layout
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      className={cn(
        "relative w-full overflow-hidden cursor-pointer",
        "border-b border-white/[0.06]",
        "bg-[#0D1117]",
        index === 0 && "border-t border-white/[0.06]"
      )}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
    >
      {/* ── Collapsed strip ── */}
      {isEven ? (
        /* Even row: [num] [title ————————] [badge] [arrow] */
        <div className="flex items-center gap-5 px-8 py-5 select-none">
          <span className="font-mono text-xs text-accent-secondary w-6 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className={cn(
            "flex-1 font-poppins font-bold text-2xl lg:text-3xl tracking-tight transition-colors duration-300",
            isHovered ? "text-white" : "text-white/75"
          )}>
            <span className="relative inline-block">
              {project.title}
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-full bg-accent-secondary rounded-full origin-left"
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </span>
          </h3>
          <span className={cn(
            "shrink-0 px-3 py-1 rounded-full text-xs font-mono font-semibold border tracking-widest uppercase",
            domainColor
          )}>
            {project.domain ?? "WEB"}
          </span>
          <motion.span
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="shrink-0 text-accent-secondary"
          >
            <ArrowUpRight size={20} />
          </motion.span>
        </div>
      ) : (
        /* Odd row: [arrow] [badge] [————————title] [num] */
        <div className="flex items-center gap-5 px-8 py-5 select-none">
          <motion.span
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="shrink-0 text-accent-secondary"
          >
            <ArrowUpRight size={20} />
          </motion.span>
          <span className={cn(
            "shrink-0 px-3 py-1 rounded-full text-xs font-mono font-semibold border tracking-widest uppercase",
            domainColor
          )}>
            {project.domain ?? "WEB"}
          </span>
          <h3 className={cn(
            "flex-1 text-right font-poppins font-bold text-2xl lg:text-3xl tracking-tight transition-colors duration-300",
            isHovered ? "text-white" : "text-white/75"
          )}>
            <span className="relative inline-block">
              {project.title}
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-full bg-accent-secondary rounded-full origin-right"
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </span>
          </h3>
          <span className="font-mono text-xs text-accent-secondary w-6 shrink-0 text-right">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}

      {/* ── Expanded content ── */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="mx-8 border-t border-white/[0.06]" />
            <div className="grid grid-cols-2 gap-8 px-8 py-8">
              {/* Image col — order swaps for odd rows to mirror strip alignment */}
              <div className={cn(
                "rounded-2xl overflow-hidden border border-white/[0.06]",
                "bg-gradient-to-br from-accent-primary/8 to-accent-secondary/5",
                "flex items-center justify-center min-h-[220px]",
                !isEven && "order-2"
              )}>
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-white/15">
                    <Puzzle size={44} />
                    <span className="text-xs font-jakarta tracking-wide">No preview yet</span>
                  </div>
                )}
              </div>

              {/* Details col */}
              <div className={cn("flex flex-col justify-between py-1", !isEven && "order-1")}>
                <div>
                  <p className="text-text-body font-jakarta text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons — exact same style as the modal */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={cn(
                        "flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl",
                        "bg-accent-primary text-bg-primary font-jakarta font-semibold text-sm",
                        "transition-all duration-200 hover:brightness-105 hover:shadow-[0_0_16px_rgba(142,202,230,0.28)]"
                      )}
                    >
                      <Github size={15} /> View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={cn(
                        "flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl",
                        "border border-accent-secondary text-accent-secondary font-jakarta font-semibold text-sm",
                        "transition-all duration-200 hover:bg-accent-secondary/10"
                      )}
                    >
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )}
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); onOpenModal(); }}
                    whileHover="hovered"
                    className={cn(
                      "group/btn inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl",
                      "border border-white/10 text-white/50 font-jakarta text-sm",
                      "transition-colors duration-200 hover:border-white/25 hover:text-white/80"
                    )}
                  >
                    Full details
                    <motion.span
                      variants={{ hovered: { x: 4 }, initial: { x: 0 } }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <ArrowRight size={14} />
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DesktopFlowingMenu = ({
  projects,
  onOpenModal,
}: {
  projects: Project[];
  onOpenModal: (projectId: string) => void;
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full rounded-3xl overflow-hidden border border-white/[0.06]">
      {projects.map((project, i) => (
        <FlowingMenuItem
          key={project.id}
          project={project}
          index={i}
          isHovered={hoveredId === project.id}
          onHover={() => setHoveredId(project.id)}
          onLeave={() => setHoveredId(null)}
          onOpenModal={() => onOpenModal(project.id)}
        />
      ))}
    </div>
  );
};

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const handleProjectClick = (projectId: string) => {
    const index = PROJECTS.findIndex((p) => p.id === projectId);
    setSelectedIndex(index);
  };

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

        {/* Category Filter — shown on both breakpoints */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { haptic("tick"); setActiveCategory(cat); }}
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

        {/* ── Mobile layout (< md) — original cards grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-${activeCategory}`}
            className="grid grid-cols-1 gap-6 md:hidden"
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
                onClick={() => { haptic("tap"); handleProjectClick(project.id); }}
                className="group rounded-3xl overflow-hidden bg-bg-surface border border-border-subtle cursor-pointer"
                style={{ willChange: "transform" }}
              >
                <div className="relative h-48 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/5 flex items-center justify-center overflow-hidden">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-text-body/40 group-hover:scale-110 transition-transform duration-500">
                      <Puzzle size={36} />
                      <span className="text-sm font-jakarta">Preview</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-poppins text-lg font-semibold text-text-heading mb-2 group-hover:text-accent-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-text-body font-jakarta text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 text-text-body/60">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 pt-2 border-t border-border-subtle">
                    {project.repoUrl && (
                      <button
                        onClick={(e) => { e.stopPropagation(); window.open(project.repoUrl, "_blank"); }}
                        className="inline-flex items-center gap-2 text-sm text-text-body font-jakarta transition-colors duration-300 hover:text-accent-primary focus:outline-none"
                      >
                        <Github size={16} /> Code
                      </button>
                    )}
                    {project.liveUrl && (
                      <button
                        onClick={(e) => { e.stopPropagation(); window.open(project.liveUrl, "_blank"); }}
                        className="inline-flex items-center gap-2 text-sm text-text-body font-jakarta transition-colors duration-300 hover:text-accent-secondary focus:outline-none"
                      >
                        <ExternalLink size={16} /> Demo
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Desktop layout (>= md) — Flowing Menu accordion ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`desktop-${activeCategory}`}
            className="hidden md:block"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <DesktopFlowingMenu
              projects={filteredProjects}
              onOpenModal={handleProjectClick}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Modal — shared between both layouts */}
      <ProjectModal
        projects={PROJECTS}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </section>
  );
};

export default ProjectsSection;
