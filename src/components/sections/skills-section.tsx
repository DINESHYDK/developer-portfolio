import { motion } from "framer-motion";
import { SKILLS } from "@/data/skills";
import OrbitCard from "@/components/ui/orbit-card";

// Color mapping for each category
const CATEGORY_COLORS = {
  Frontend: "#8ECAE6", // Cyan (accent-primary)
  Backend: "#A7F3D0", // Green (accent-secondary)
  "Tools & DevOps": "#FFA116", // Orange
} as const;

const SkillsSection = () => {
  return (
    <motion.section
      id="skills"
      className="py-20 px-6 bg-bg-surface"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ type: "spring", stiffness: 180, damping: 28 }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-text-heading mb-4">
            Skills & <span className="text-accent-primary">Tech Stack</span>
          </h2>
          <div className="w-16 h-1 bg-accent-primary mx-auto rounded-full" />
          <p className="text-text-body font-jakarta mt-4 max-w-lg mx-auto">
            Interactive orbital visualization of my tech stack. Hover to interact.
          </p>
        </div>

        {/* Orbital Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILLS.map((category) => (
            <OrbitCard
              key={category.category}
              title={category.category}
              skills={category.skills.map((s) => s.name)}
              accentColor={CATEGORY_COLORS[category.category as keyof typeof CATEGORY_COLORS]}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SkillsSection;

