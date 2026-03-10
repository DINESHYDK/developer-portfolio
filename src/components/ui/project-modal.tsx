import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/utils/cn";

interface ProjectModalProps {
  projects: Project[];
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
}

const ProjectModal = ({
  projects,
  selectedIndex,
  setSelectedIndex,
}: ProjectModalProps) => {
  const isOpen = selectedIndex !== null;
  const currentProject = selectedIndex !== null ? projects[selectedIndex] : null;

  // Navigation functions
  const goToNext = () => {
    if (selectedIndex === null) return;
    const nextIndex = (selectedIndex + 1) % projects.length;
    setSelectedIndex(nextIndex);
  };

  const goToPrevious = () => {
    if (selectedIndex === null) return;
    const prevIndex = selectedIndex === 0 ? projects.length - 1 : selectedIndex - 1;
    setSelectedIndex(prevIndex);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  // Desktop: Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, projects.length]);

  // Mobile: Swipe gesture handler
  const handleDragEnd = (_event: any, info: PanInfo) => {
    const SWIPE_THRESHOLD = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    // Swipe left (next project)
    if (offset < -SWIPE_THRESHOLD || velocity < -500) {
      goToNext();
    }
    // Swipe right (previous project)
    else if (offset > SWIPE_THRESHOLD || velocity > 500) {
      goToPrevious();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && currentProject && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:px-20 pointer-events-none">
            {/* Navigation Arrows (Desktop) - Outside Modal */}
            <button
              onClick={goToPrevious}
              className={cn(
                "hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-auto",
                "p-3 rounded-full",
                "bg-bg-surface/80 backdrop-blur-md border border-border-subtle",
                "text-text-body hover:text-accent-primary",
                "transition-all duration-300 hover:scale-110",
                "focus:outline-none focus:ring-2 focus:ring-accent-primary"
              )}
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={goToNext}
              className={cn(
                "hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-auto",
                "p-3 rounded-full",
                "bg-bg-surface/80 backdrop-blur-md border border-border-subtle",
                "text-text-body hover:text-accent-primary",
                "transition-all duration-300 hover:scale-110",
                "focus:outline-none focus:ring-2 focus:ring-accent-primary"
              )}
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className={cn(
                  "absolute top-4 right-4 z-10 p-2 rounded-full",
                  "bg-bg-surface/80 backdrop-blur-md border border-border-subtle",
                  "text-text-body hover:text-text-heading",
                  "transition-all duration-300 hover:scale-110",
                  "focus:outline-none focus:ring-2 focus:ring-accent-primary"
                )}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Draggable Content Wrapper (Mobile Swipe) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={cn(
                    "rounded-3xl overflow-hidden",
                    "bg-bg-surface border border-border-subtle",
                    "max-h-[90vh] overflow-y-auto"
                  )}
                >
                  {/* Project Preview Image */}
                  <div className="relative h-64 md:h-80 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10 flex items-center justify-center">
                    <div className="text-text-body/40 text-center">
                      <div className="text-6xl mb-2">📱</div>
                      <p className="text-sm font-jakarta">Image coming soon</p>
                      <p className="text-xs text-text-body/30 font-mono mt-2">
                        {currentProject.title}
                      </p>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 md:p-8 space-y-6">
                    {/* Title + Featured Badge */}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="font-poppins text-2xl md:text-3xl font-bold text-text-heading">
                          {currentProject.title}
                        </h2>
                        {currentProject.id === "project-1" && (
                          <span className="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary text-xs font-jakarta font-semibold border border-accent-primary/30">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-sm font-jakarta font-semibold text-text-heading mb-2">
                        Description
                      </h3>
                      <p className="text-text-body font-jakarta text-base leading-relaxed">
                        {currentProject.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-sm font-jakarta font-semibold text-text-heading mb-3">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {currentProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary border border-accent-primary/20 text-sm font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Challenges While Building */}
                    {currentProject.challenges && currentProject.challenges.length > 0 && (
                      <div>
                        <h3 className="text-sm font-jakarta font-semibold text-text-heading mb-3">
                          Challenges While Building
                        </h3>
                        <ul className="space-y-3">
                          {currentProject.challenges.map((challenge, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-text-body font-jakarta text-sm leading-relaxed"
                            >
                              <span className="text-accent-primary flex-shrink-0 mt-0.5">•</span>
                              <span className="flex-1">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      {currentProject.repoUrl && (
                        <a
                          href={currentProject.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl",
                            "bg-accent-primary text-bg-primary font-jakarta font-semibold",
                            "transition-all duration-300",
                            "hover:bg-accent-primary/90 hover:shadow-[0_0_20px_rgba(142,202,230,0.3)]",
                            "focus:outline-none focus:ring-2 focus:ring-accent-primary"
                          )}
                        >
                          <Github size={18} />
                          View Code on GitHub
                        </a>
                      )}
                      {currentProject.liveUrl && (
                        <a
                          href={currentProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl",
                            "border border-accent-secondary text-accent-secondary font-jakarta font-semibold",
                            "transition-all duration-300",
                            "hover:bg-accent-secondary/10",
                            "focus:outline-none focus:ring-2 focus:ring-accent-secondary"
                          )}
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </a>
                      )}
                    </div>

                    {/* Navigation Hint */}
                    <div className="flex items-center justify-center gap-8 pt-4 border-t border-border-subtle">
                      <p className="text-xs text-text-body/50 font-jakarta text-center">
                        <span className="hidden md:inline">Use ← → arrow keys</span>
                        <span className="md:hidden">Swipe to navigate</span>
                        {" • "}
                        <span className="text-accent-primary">
                          {selectedIndex + 1} / {projects.length}
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;


