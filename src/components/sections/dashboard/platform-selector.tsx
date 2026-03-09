import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

interface Platform {
  id: string;
  name: string;
  accentColor: string;
}

interface PlatformSelectorProps {
  platforms: Platform[];
  activePlatform: string;
  onSelect: (id: string) => void;
}

const PlatformSelector = ({
  platforms,
  activePlatform,
  onSelect,
}: PlatformSelectorProps) => {
  const activePlatformData = platforms.find((p) => p.id === activePlatform);

  return (
    <>
      {/* Mobile: Native Select Dropdown (< md breakpoint) */}
      <div className="md:hidden flex justify-center">
        <div className="relative w-full max-w-xs">
          <select
            value={activePlatform}
            onChange={(e) => onSelect(e.target.value)}
            className={cn(
              "w-full appearance-none px-6 py-3.5 pr-12 rounded-2xl",
              "bg-bg-surface border border-border-subtle",
              "text-text-heading font-jakarta font-medium text-sm",
              "focus:outline-none focus:ring-2 focus:ring-accent-primary",
              "transition-all duration-300",
              "cursor-pointer"
            )}
            style={{
              borderColor: activePlatformData
                ? `${activePlatformData.accentColor}40`
                : undefined,
            }}
          >
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
          {/* Custom chevron icon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown
              size={20}
              className="text-text-body"
              style={{
                color: activePlatformData?.accentColor,
              }}
            />
          </div>
        </div>
      </div>

      {/* Desktop: Apple-Style Segmented Control (≥ md breakpoint) */}
      <div className="hidden md:flex justify-center">
        <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-bg-surface border border-border-subtle">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => onSelect(platform.id)}
              className={cn(
                "relative px-6 py-2.5 rounded-full text-sm font-jakarta font-medium",
                "transition-colors duration-300",
                "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-primary",
                activePlatform === platform.id
                  ? "text-bg-primary"
                  : "text-text-body hover:text-text-heading"
              )}
            >
              {/* Animated background pill with layoutId for smooth sliding */}
              {activePlatform === platform.id && (
                <motion.div
                  layoutId="activePlatformPill"
                  className="absolute inset-0 rounded-full shadow-lg"
                  style={{
                    backgroundColor: platform.accentColor,
                    boxShadow: `0 0 20px ${platform.accentColor}30`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{platform.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlatformSelector;
