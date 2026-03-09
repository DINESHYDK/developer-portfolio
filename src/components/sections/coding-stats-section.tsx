import { useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { ExternalLink, Trophy, Target, BarChart3, Flame } from "lucide-react";
import { CODING_STATS } from "@/data/coding-stats";
import type { CodingPlatform } from "@/types";
import CircularProgress from "@/components/ui/circular-progress";
import { cn } from "@/utils/cn";

/* ===========================
   Spring Config (Apple-like)
   =========================== */
const SPRING_HOVER = { type: "spring" as const, stiffness: 300, damping: 24 };
const SPRING_POPOVER = { type: "spring" as const, stiffness: 260, damping: 22 };
const SPRING_STAGGER = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20,
};

/* ===========================
   Platform Hover Card
   =========================== */
interface PlatformCardProps {
  platform: CodingPlatform;
  index: number;
  isActive: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
}

const PlatformCard = ({
  platform,
  index,
  isActive,
  onHover,
  onClick,
}: PlatformCardProps) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_STAGGER, delay: index * 0.1 }}
      onMouseEnter={() => onHover(platform.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(platform.id)}
    >
      {/* Main Card */}
      <motion.div
        className={cn(
          "relative cursor-pointer p-6 rounded-3xl",
          "bg-bg-surface border",
          "transition-colors duration-300",
          isActive ? "border-white/15" : "border-border-subtle"
        )}
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={SPRING_HOVER}
        style={{
          boxShadow: isActive
            ? `0 8px 32px ${platform.accentColor}15, 0 0 0 1px ${platform.accentColor}20`
            : undefined,
        }}
      >
        {/* Platform color indicator line at top */}
        <div
          className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-60"
          style={{ backgroundColor: platform.accentColor }}
        />

        <div className="flex items-center gap-3 mb-4 mt-1">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: platform.accentColor }}
          />
          <h3 className="font-poppins text-sm font-semibold text-text-heading">
            {platform.name}
          </h3>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p
              className="text-3xl font-poppins font-bold"
              style={{ color: platform.accentColor }}
            >
              {platform.totalSolved}
            </p>
            <p className="text-xs text-text-body/60 font-jakarta mt-1">
              problems solved
            </p>
          </div>

          {platform.rating !== undefined && (
            <div className="text-right">
              <p className="text-lg font-poppins font-bold text-text-heading">
                {platform.rating}
              </p>
              <p className="text-[10px] text-text-body/50 font-jakarta">
                rating
              </p>
            </div>
          )}
        </div>

        {/* Mini breakdown bar */}
        <div className="flex gap-0.5 mt-4 h-1.5 rounded-full overflow-hidden bg-white/5">
          {platform.breakdown.map((b) => (
            <div
              key={b.label}
              className="h-full rounded-full transition-all duration-500"
              style={{
                backgroundColor: b.color,
                width: `${
                  platform.totalSolved > 0
                    ? (b.solved / platform.totalSolved) * 100
                    : 0
                }%`,
                minWidth: b.solved > 0 ? "4px" : "0px",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Hover Popover — floating detail card */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className={cn(
              "absolute z-30 left-0 right-0 mt-3",
              "p-6 rounded-3xl",
              "bg-bg-surface/95 backdrop-blur-xl",
              "border border-white/10",
              "shadow-2xl shadow-black/60"
            )}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={SPRING_POPOVER}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: platform.accentColor }}
                />
                <span className="text-xs font-mono text-text-body/60">
                  @{platform.username}
                </span>
              </div>
              <a
                href={platform.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-text-body/60 hover:text-accent-primary transition-colors duration-200"
                aria-label={`View ${platform.name} profile`}
              >
                <ExternalLink size={11} />
                Profile
              </a>
            </div>

            {/* Content: Chart + Breakdown */}
            <div className="flex items-center gap-6">
              {/* Circular Chart */}
              <div className="shrink-0">
                <CircularProgress
                  solved={platform.totalSolved}
                  total={platform.totalProblems}
                  size={110}
                  strokeWidth={9}
                  segments={platform.breakdown.map((b) => ({
                    color: b.color,
                    value: b.solved,
                  }))}
                />
              </div>

              {/* Breakdown + Stats */}
              <div className="flex-1 space-y-2.5">
                {/* Stat pills */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {platform.rating !== undefined && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-[11px] font-mono text-text-body">
                      Rating{" "}
                      <strong style={{ color: platform.accentColor }}>
                        {platform.rating}
                      </strong>
                    </span>
                  )}
                  {platform.rank && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-[11px] font-mono text-text-body">
                      {platform.rank}
                    </span>
                  )}
                  {platform.contestsAttended !== undefined &&
                    platform.contestsAttended > 0 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-[11px] font-mono text-text-body">
                        {platform.contestsAttended} contests
                      </span>
                    )}
                </div>

                {/* Difficulty Breakdown */}
                {platform.breakdown.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-jakarta font-semibold w-14 shrink-0"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </span>
                    <div className="flex-1 h-1 rounded-full bg-white/5">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            item.total > 0
                              ? (item.solved / item.total) * 100
                              : 0
                          }%`,
                        }}
                        transition={{
                          ...SPRING_STAGGER,
                          delay: 0.15,
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-mono text-text-body/70 shrink-0">
                      {item.solved}/{item.total}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ===========================
   Main Section
   =========================== */
const CodingStatsSection = () => {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [pinnedPlatform, setPinnedPlatform] = useState<string | null>(null);

  const activePlatform = hoveredPlatform ?? pinnedPlatform;

  const handleHover = (id: string | null) => {
    setHoveredPlatform(id);
  };

  const handleClick = (id: string) => {
    setPinnedPlatform((prev) => (prev === id ? null : id));
  };

  // Aggregate stats
  const totalSolved = CODING_STATS.platforms.reduce(
    (sum, p) => sum + p.totalSolved,
    0
  );
  const totalContests = CODING_STATS.platforms.reduce(
    (sum, p) => sum + (p.contestsAttended ?? 0),
    0
  );

  const overviewStats = [
    {
      icon: <Target size={18} />,
      label: "Problems Solved",
      value: totalSolved,
    },
    {
      icon: <Trophy size={18} />,
      label: "Contests",
      value: totalContests,
    },
    {
      icon: <BarChart3 size={18} />,
      label: "Platforms",
      value: CODING_STATS.platforms.length,
    },
    {
      icon: <Flame size={18} />,
      label: "Active Streaks",
      value: "🔥",
    },
  ];

  return (
    <section id="coding" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-text-heading mb-4">
            Coding <span className="text-accent-primary">Stats</span>
          </h2>
          <div className="w-16 h-1 bg-accent-primary mx-auto rounded-full" />
          <p className="text-text-body font-jakarta mt-4 max-w-lg mx-auto">
            My competitive programming journey across platforms.
          </p>
        </div>

        {/* Aggregate Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {overviewStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_STAGGER, delay: i * 0.08 }}
              whileHover={{ scale: 1.04, y: -2 }}
              className={cn(
                "p-5 rounded-3xl text-center",
                "bg-bg-surface border border-border-subtle",
              )}
            >
              <div className="text-accent-primary mb-2 flex justify-center">
                {stat.icon}
              </div>
              <p className="text-2xl font-poppins font-bold text-text-heading">
                {stat.value}
              </p>
              <p className="text-xs text-text-body font-jakarta mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Platform Cards Grid — hover to reveal details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CODING_STATS.platforms.map((platform, index) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              index={index}
              isActive={activePlatform === platform.id}
              onHover={handleHover}
              onClick={handleClick}
            />
          ))}
        </div>

        {/* Last Updated */}
        <motion.p
          className="text-center text-text-body/40 text-xs font-jakarta mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Last updated: {CODING_STATS.lastUpdated}
        </motion.p>
      </div>
    </section>
  );
};

export default CodingStatsSection;

