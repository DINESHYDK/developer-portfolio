import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Target, BarChart3, Flame, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { useCodingStats } from "@/hooks/use-coding-stats";
import PlatformSelector from "./platform-selector";
import LeetCodeView from "./platforms/leetcode-view";
import CodeChefView from "./platforms/codechef-view";
import CodeforcesView from "./platforms/codeforces-view";
import TufView from "./platforms/tuf-view";
import { cn } from "@/utils/cn";

/* ===========================
   Strategy Pattern: Platform Component Registry
   O(1) lookup for rendering platform-specific views
   =========================== */
const PLATFORM_COMPONENTS: Record<string, React.ComponentType<{ platform: any }>> = {
  leetcode: LeetCodeView,
  codechef: CodeChefView,
  codeforces: CodeforcesView,
  tuf: TufView,
  // Add new platforms here — zero changes needed in the JSX below
};

/* ===========================
   Hover Card Component (Desktop Only)
   =========================== */
interface HoverCardProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const HoverCard = ({ children, content }: HoverCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={cn(
              "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50",
              "min-w-[220px] p-4 rounded-2xl",
              "bg-bg-surface/95 backdrop-blur-xl",
              "border border-white/10",
              "shadow-2xl shadow-black/60"
            )}
          >
            {content}
            {/* Arrow pointer */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px]">
              <div className="w-3 h-3 rotate-45 bg-bg-surface border-r border-b border-white/10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ===========================
   Main Section
   =========================== */
const CodingStatsSection = () => {
  const { data: codingStats, isLoading, isLive, refresh } = useCodingStats();

  const [activePlatform, setActivePlatform] = useState<string>(
    codingStats.platforms[0]?.id ?? "leetcode"
  );

  // Aggregate stats
  const totalSolved = codingStats.platforms.reduce(
    (sum, p) => sum + p.totalSolved,
    0
  );
  const totalContests = codingStats.platforms.reduce(
    (sum, p) => sum + (p.contestsAttended ?? 0),
    0
  );

  // Get current platform data
  const currentPlatform = codingStats.platforms.find(
    (p) => p.id === activePlatform
  );

  // Get the platform-specific view component (Strategy Pattern)
  const PlatformView = PLATFORM_COMPONENTS[activePlatform] || LeetCodeView;

  const overviewStats = [
    {
      icon: <Target size={20} />,
      label: "Problems Solved",
      value: totalSolved,
      hasHoverCard: true,
    },
    {
      icon: <Trophy size={20} />,
      label: "Contests",
      value: totalContests,
      hasHoverCard: false,
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Platforms",
      value: codingStats.platforms.length,
      hasHoverCard: false,
    },
    {
      icon: <Flame size={20} />,
      label: "Active Streaks",
      value: "🔥",
      hasHoverCard: false,
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

          {/* Live status + refresh button */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex items-center gap-1.5 text-xs font-jakarta">
              {isLive ? (
                <>
                  <Wifi size={12} className="text-green-400" />
                  <span className="text-green-400">Live</span>
                </>
              ) : (
                <>
                  <WifiOff size={12} className="text-text-body/40" />
                  <span className="text-text-body/40">Cached</span>
                </>
              )}
            </div>
            <button
              onClick={refresh}
              disabled={isLoading}
              className={cn(
                "p-1.5 rounded-full transition-all duration-300",
                "text-text-body/40 hover:text-accent-primary hover:bg-accent-primary/10",
                "focus:outline-none focus:ring-2 focus:ring-accent-primary/30",
                isLoading && "animate-spin"
              )}
              aria-label="Refresh stats"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Aggregate Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {overviewStats.map((stat, i) => {
            const cardContent = (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: i * 0.08,
                }}
                whileHover={{ scale: 1.04, y: -2 }}
                className={cn(
                  "p-5 rounded-3xl text-center cursor-pointer",
                  "bg-bg-surface border border-border-subtle"
                )}
              >
                <div className="text-accent-primary mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <p className="text-3xl font-poppins font-bold text-text-heading">
                  {stat.value}
                </p>
                <p className="text-xs text-text-body font-jakarta mt-1">
                  {stat.label}
                </p>
              </motion.div>
            );

            if (stat.hasHoverCard) {
              return (
                <HoverCard
                  key={stat.label}
                  content={
                    <div className="space-y-2">
                      <p className="text-xs font-jakarta font-semibold text-text-heading mb-3">
                        Breakdown by Platform
                      </p>
                      {codingStats.platforms.map((platform) => (
                        <div
                          key={platform.id}
                          className="flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: platform.accentColor }}
                            />
                            <span className="font-jakarta text-text-body">
                              {platform.name}
                            </span>
                          </div>
                          <span className="font-mono text-text-heading">
                            {platform.totalSolved}
                          </span>
                        </div>
                      ))}
                    </div>
                  }
                >
                  {cardContent}
                </HoverCard>
              );
            }

            return cardContent;
          })}
        </div>

        {/* Apple-Style Platform Selector */}
        <div className="mb-8">
          <PlatformSelector
            platforms={codingStats.platforms.map((p) => ({
              id: p.id,
              name: p.name,
              accentColor: p.accentColor,
            }))}
            activePlatform={activePlatform}
            onSelect={setActivePlatform}
          />
        </div>

        {/* Platform Detail View (Strategy Pattern) */}
        <AnimatePresence mode="wait">
          {currentPlatform && (
            <motion.div
              key={activePlatform}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className={cn(
                "p-8 rounded-3xl",
                "bg-bg-surface border border-border-subtle"
              )}
            >
              {/* Platform Header */}
              <div
                className="flex items-center gap-3 mb-8 pb-4"
                style={{
                  borderBottom: `2px solid ${currentPlatform.accentColor}20`,
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: currentPlatform.accentColor }}
                />
                <h3 className="font-poppins text-xl font-semibold text-text-heading">
                  {currentPlatform.name}
                </h3>
                <span className="text-text-body/60 text-sm font-mono">
                  @{currentPlatform.username}
                </span>
              </div>

              {/* Dynamic Platform View */}
              <PlatformView platform={currentPlatform} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Last Updated */}
        <motion.p
          className="text-center text-text-body/40 text-xs font-jakarta mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Last updated: {codingStats.lastUpdated}
        </motion.p>
      </div>
    </section>
  );
};

export default CodingStatsSection;

