import { SKILLS } from "@/data/skills";
import { cn } from "@/utils/cn";

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-6 bg-bg-surface">
      <div className="mx-auto max-w-5xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-text-heading mb-4">
            Skills & <span className="text-accent-primary">Tech Stack</span>
          </h2>
          <div className="w-16 h-1 bg-accent-primary mx-auto rounded-full" />
          <p className="text-text-body font-jakarta mt-4 max-w-lg mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          {SKILLS.map((category) => (
            <div
              key={category.category}
              className={cn(
                "p-8 rounded-3xl",
                "bg-bg-primary border border-border-subtle",
                "transition-all duration-300",
                "hover:border-accent-primary/30 hover:shadow-lg hover:shadow-black/20"
              )}
            >
              <h3 className="font-poppins text-xl font-semibold text-accent-primary mb-6">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-jakarta font-medium",
                      "bg-bg-surface text-text-body",
                      "border border-border-subtle",
                      "transition-all duration-300",
                      "hover:border-accent-primary/50 hover:text-accent-primary"
                    )}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

