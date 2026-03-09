import { Flame, Trophy, Target, TrendingUp } from "lucide-react";
import type { CodingPlatform } from "@/types";
import { cn } from "@/utils/cn";

interface GeeksforGeeksViewProps {
  platform: CodingPlatform;
}

const GeeksforGeeksView = ({ platform }: GeeksforGeeksViewProps) => {
  const {
    codingScore,
    potdStreak,
    instituteRank,
    totalSolved,
    contestsAttended,
  } = platform;

  // Progress to rank #1 (assuming top rank is 1)
  const progressToTop =
    instituteRank !== undefined ? ((10 - instituteRank) / 9) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* POTD Streak - Hero Feature */}
      {potdStreak !== undefined && (
        <div
          className={cn(
            "p-10 rounded-3xl text-center relative overflow-hidden",
            "bg-bg-primary border-2"
          )}
          style={{
            borderColor: `${platform.accentColor}40`,
            boxShadow: `0 0 40px ${platform.accentColor}20, inset 0 0 60px ${platform.accentColor}08`,
          }}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 opacity-20 blur-3xl"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${platform.accentColor} 0%, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            <Flame
              size={48}
              className="mx-auto mb-4 animate-pulse"
              style={{ color: platform.accentColor }}
            />
            <p className="text-sm text-text-body font-jakarta mb-2 uppercase tracking-wider">
              Problem of the Day Streak
            </p>
            <p
              className="text-7xl font-poppins font-bold mb-2"
              style={{ color: platform.accentColor }}
            >
              {potdStreak}
            </p>
            <p className="text-text-body/60 font-jakarta text-sm">
              days and counting 🔥
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Coding Score */}
        {codingScore !== undefined && (
          <div
            className={cn(
              "col-span-2 p-6 rounded-3xl",
              "bg-bg-primary border border-border-subtle"
            )}
          >
            <Trophy
              size={24}
              className="mb-3"
              style={{ color: platform.accentColor }}
            />
            <p className="text-xs text-text-body font-jakarta mb-1">
              Overall Coding Score
            </p>
            <p className="text-5xl font-poppins font-bold text-text-heading">
              {codingScore}
            </p>
          </div>
        )}

        {/* Total Solved */}
        <div
          className={cn(
            "p-6 rounded-3xl",
            "bg-bg-primary border border-border-subtle",
            "flex flex-col justify-between"
          )}
        >
          <Target size={20} className="text-accent-primary mb-2" />
          <div>
            <p className="text-3xl font-poppins font-bold text-text-heading">
              {totalSolved}
            </p>
            <p className="text-xs text-text-body font-jakarta mt-1">Solved</p>
          </div>
        </div>

        {/* Contests */}
        {contestsAttended !== undefined && (
          <div
            className={cn(
              "p-6 rounded-3xl",
              "bg-bg-primary border border-border-subtle",
              "flex flex-col justify-between"
            )}
          >
            <TrendingUp size={20} className="text-accent-secondary mb-2" />
            <div>
              <p className="text-3xl font-poppins font-bold text-text-heading">
                {contestsAttended}
              </p>
              <p className="text-xs text-text-body font-jakarta mt-1">Contests</p>
            </div>
          </div>
        )}
      </div>

      {/* Institute Rank Progress */}
      {instituteRank !== undefined && (
        <div
          className={cn(
            "p-6 rounded-3xl",
            "bg-bg-primary border border-border-subtle"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-text-body font-jakarta mb-1">
                Institute Rank
              </p>
              <p className="text-4xl font-poppins font-bold text-text-heading">
                #{instituteRank}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-body/60 font-jakarta">
                Progress to #1
              </p>
              <p
                className="text-lg font-poppins font-semibold"
                style={{ color: platform.accentColor }}
              >
                {progressToTop.toFixed(0)}%
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-3 rounded-full bg-white/5 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${progressToTop}%`,
                background: `linear-gradient(90deg, ${platform.accentColor}, ${platform.accentColor}CC)`,
                boxShadow: `0 0 12px ${platform.accentColor}60`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GeeksforGeeksView;

