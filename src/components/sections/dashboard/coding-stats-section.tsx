import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Target, Star, Layers, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { useCodingStats } from "@/hooks/use-coding-stats";
import type { CodingPlatform } from "@/types";
import PlatformSelector from "./platform-selector";
import LeetCodeView from "./platforms/leetcode-view";
import CodeChefView from "./platforms/codechef-view";
import CodeforcesView from "./platforms/codeforces-view";
import TufView from "./platforms/tuf-view";
import { cn } from "@/utils/cn";

/* ─────────────────────────────────────────────
   Platform component registry
───────────────────────────────────────────── */
const PLATFORM_COMPONENTS: Record<string, React.ComponentType<{ platform: CodingPlatform }>> = {
  leetcode:   LeetCodeView,
  codechef:   CodeChefView,
  codeforces: CodeforcesView,
  tuf:        TufView,
};

/* ─────────────────────────────────────────────
   AtCoder static entry (not in API)
───────────────────────────────────────────── */
const ATCODER = { name: "AtCoder", rating: 632, accentColor: "#A7F3D0" } as const;

/* Platforms included in the Best Rating breakdown */
const RATING_PLATFORM_IDS = ["codeforces", "codechef", "leetcode"] as const;

/* Extract the best historical rating from a platform */
const getBestRating = (p: CodingPlatform): number =>
  p.maxRating ?? p.highestRating ?? p.rating ?? 0;

/* ─────────────────────────────────────────────
   HoverCard — desktop tooltip, tap-toggle on mobile
───────────────────────────────────────────── */
interface HoverCardProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const HoverCard = ({ children, content }: HoverCardProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block w-full"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onTouchEnd={(e) => { e.preventDefault(); setVisible((v) => !v); }}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={cn(
              "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50",
              "min-w-[200px] p-4 rounded-2xl",
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

/* ─────────────────────────────────────────────
   Single stat card
───────────────────────────────────────────── */
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  delay: number;
  hoverContent?: React.ReactNode;
}

const StatCard = ({ icon, label, value, delay, hoverContent }: StatCardProps) => {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay }}
      whileHover={{
        scale: 1.04,
        y: -4,
        boxShadow: "0 0 24px rgba(142,202,230,0.14), 0 8px 20px rgba(0,0,0,0.3)",
      }}
      className={cn(
        "w-full p-5 rounded-3xl text-center",
        "bg-bg-surface border border-border-subtle",
        hoverContent ? "cursor-pointer" : "cursor-default"
      )}
    >
      <div className="text-accent-primary mb-2 flex justify-center">{icon}</div>
      <p className="text-3xl font-poppins font-bold text-text-heading">{value}</p>
      <p className="text-xs text-text-body font-jakarta mt-1">{label}</p>
    </motion.div>
  );

  if (!hoverContent) return card;

  return <HoverCard content={hoverContent}>{card}</HoverCard>;
};

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
const CodingStatsSection = () => {
  const { data: codingStats, isLoading, isLive, refresh } = useCodingStats();

  const [activePlatform, setActivePlatform] = useState<string>(
    codingStats.platforms[0]?.id ?? "leetcode"
  );

  /* ── Aggregate computations ── */
  const totalSolved   = codingStats.platforms.reduce((s, p) => s + p.totalSolved, 0);
  const totalContests = codingStats.platforms.reduce((s, p) => s + (p.contestsAttended ?? 0), 0);

  // Best rating — dynamic platforms filtered to the 3 rated ones + AtCoder static
  const ratingPlatforms = [
    ...codingStats.platforms
      .filter((p) => RATING_PLATFORM_IDS.includes(p.id as typeof RATING_PLATFORM_IDS[number]))
      .map((p) => ({ name: p.name, rating: getBestRating(p), accentColor: p.accentColor })),
    ATCODER,
  ];
  const maxRatingValue  = Math.max(...ratingPlatforms.map((e) => e.rating));
  const overallBestRating = maxRatingValue > 0 ? maxRatingValue : 0;

  /* ── Hover card content ── */

  // Problems Solved breakdown
  const problemsHoverContent = (
    <div className="space-y-2">
      <p className="text-xs font-jakarta font-semibold text-text-heading mb-3">
        Breakdown by Platform
      </p>
      {codingStats.platforms.map((p) => (
        <div key={p.id} className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.accentColor }} />
            <span className="font-jakarta text-text-body">{p.name}</span>
          </div>
          <span className="font-mono text-accent-primary">{p.totalSolved}</span>
        </div>
      ))}
    </div>
  );

  // Contests breakdown
  const contestsHoverContent = (
    <div className="space-y-2">
      <p className="text-xs font-jakarta font-semibold text-text-heading mb-3">
        By Platform
      </p>
      {[...codingStats.platforms]
        .sort((a, b) => (b.contestsAttended ?? 0) - (a.contestsAttended ?? 0))
        .map((p) => (
          <div key={p.id} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.accentColor }} />
              <span className="font-jakarta text-text-body">{p.name}</span>
            </div>
            <span className="font-mono text-accent-primary">{p.contestsAttended ?? 0}</span>
          </div>
        ))}
    </div>
  );

  // Best Rating breakdown — sorted descending, highest in green
  const bestRatingHoverContent = (
    <div className="space-y-2">
      <p className="text-xs font-jakarta font-semibold text-text-heading mb-3">
        Best Rating
      </p>
      {[...ratingPlatforms]
        .sort((a, b) => b.rating - a.rating)
        .map((entry) => {
          const isHighest = entry.rating === maxRatingValue;
          return (
            <div key={entry.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: entry.accentColor }} />
                <span className={cn(
                  "font-jakarta",
                  isHighest ? "text-accent-secondary font-semibold" : "text-text-body"
                )}>
                  {entry.name}
                </span>
              </div>
              <span className={cn(
                "font-mono font-semibold",
                isHighest ? "text-accent-secondary" : "text-accent-primary"
              )}>
                {entry.rating}
              </span>
            </div>
          );
        })}
      <p className="text-[10px] font-jakarta text-text-body/30 mt-2 pt-2 border-t border-white/5">
        AtCoder is static · others from API
      </p>
    </div>
  );

  /* ── Current platform view ── */
  const currentPlatform = codingStats.platforms.find((p) => p.id === activePlatform);
  const PlatformView    = PLATFORM_COMPONENTS[activePlatform] ?? LeetCodeView;

  return (
    <motion.section
      id="coding"
      className="py-20 px-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ type: "spring", stiffness: 180, damping: 28 }}
    >
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

          {/* Live status + refresh */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex items-center gap-1.5 text-xs font-jakarta">
              {isLive ? (
                <><Wifi size={12} className="text-green-400" /><span className="text-green-400">Live</span></>
              ) : (
                <><WifiOff size={12} className="text-text-body/40" /><span className="text-text-body/40">Cached</span></>
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

        {/* ── 4 Overview Cards: flush equal-width grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard
            icon={<Target size={20} />}
            label="Problems Solved"
            value={totalSolved}
            delay={0}
            hoverContent={problemsHoverContent}
          />
          <StatCard
            icon={<Trophy size={20} />}
            label="Contests"
            value={totalContests}
            delay={0.08}
            hoverContent={contestsHoverContent}
          />
          <StatCard
            icon={<Star size={20} />}
            label="Best Rating"
            value={overallBestRating || "—"}
            delay={0.16}
            hoverContent={bestRatingHoverContent}
          />
          <StatCard
            icon={<Layers size={20} />}
            label="Platforms"
            value={codingStats.platforms.length}
            delay={0.24}
          />
        </div>

        {/* Platform Selector */}
        <div className="mb-8">
          <PlatformSelector
            platforms={codingStats.platforms.map((p) => ({
              id:          p.id,
              name:        p.name,
              accentColor: p.accentColor,
            }))}
            activePlatform={activePlatform}
            onSelect={setActivePlatform}
          />
        </div>

        {/* Platform Detail View */}
        <AnimatePresence mode="wait">
          {currentPlatform && (
            <motion.div
              key={activePlatform}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0  }}
              exit={{    opacity: 0, y: -12 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="p-8 rounded-3xl bg-bg-surface border border-border-subtle"
            >
              {/* Platform Header */}
              <div
                className="flex items-center gap-3 mb-8 pb-4"
                style={{ borderBottom: `2px solid ${currentPlatform.accentColor}20` }}
              >
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: currentPlatform.accentColor }} />
                <h3 className="font-poppins text-xl font-semibold text-text-heading">
                  {currentPlatform.name}
                </h3>
                <span className="text-text-body/60 text-sm font-mono">
                  @{currentPlatform.username}
                </span>
              </div>

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
    </motion.section>
  );
};

export default CodingStatsSection;