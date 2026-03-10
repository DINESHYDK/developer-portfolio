import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Star,
  Award,
  TrendingUp,
  Flame,
  Globe,
  MapPin,
  ChevronDown,
} from "lucide-react";
import type { CodingPlatform } from "@/types";
import { cn } from "@/utils/cn";

interface CodeChefViewProps {
  platform: CodingPlatform;
}

const MAX_VISIBLE_CERTS = 4;

const CodeChefView = ({ platform }: CodeChefViewProps) => {
  const {
    rating,
    highestRating,
    division,
    stars,
    totalSolved,
    certificates,
    maxStreak,
    currentStreak,
    contestsAttended,
    globalRank,
    countryRank,
  } = platform;

  const [certsExpanded, setCertsExpanded] = useState(false);

  const visibleCerts =
    certificates && !certsExpanded
      ? certificates.slice(0, MAX_VISIBLE_CERTS)
      : certificates;
  const hiddenCount =
    certificates && certificates.length > MAX_VISIBLE_CERTS
      ? certificates.length - MAX_VISIBLE_CERTS
      : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Rating - Large Featured Card (left, tall) */}
      <div
        className={cn(
          "col-span-2 row-span-3 p-10 rounded-3xl",
          "bg-bg-primary border border-border-subtle",
          "flex flex-col items-center justify-center text-center"
        )}
      >
        <Trophy
          size={48}
          className="mb-5"
          style={{ color: platform.accentColor }}
        />
        <p className="text-sm text-text-body font-jakarta mb-3">
          Current Rating
        </p>
        <p
          className="text-7xl md:text-8xl font-poppins font-bold mb-3"
          style={{ color: platform.accentColor }}
        >
          {rating}
        </p>
        <div className="flex items-center gap-2 mb-4">
          {[...Array(stars ?? 0)].map((_, i) => (
            <Star
              key={i}
              size={18}
              fill={platform.accentColor}
              className="text-transparent"
              style={{ color: platform.accentColor }}
            />
          ))}
          <span className="text-base font-jakarta text-text-body ml-2">
            {stars}★ (Div {division})
          </span>
        </div>
        {highestRating !== undefined && (
          <p className="text-sm text-text-body/60 font-jakarta">
            Highest Rating:{" "}
            <span className="text-text-heading font-semibold text-base">
              {highestRating}
            </span>
          </p>
        )}
      </div>

      {/* Total Solved (right top) */}
      <div
        className={cn(
          "p-6 rounded-3xl",
          "bg-bg-primary border border-border-subtle",
          "flex flex-col justify-between"
        )}
      >
        <TrendingUp size={20} className="text-accent-primary mb-2" />
        <div>
          <p className="text-3xl font-poppins font-bold text-text-heading">
            {totalSolved}
          </p>
          <p className="text-xs text-text-body font-jakarta mt-1">
            Problems Solved
          </p>
        </div>
      </div>

      {/* Contests (right top) */}
      <div
        className={cn(
          "p-6 rounded-3xl",
          "bg-bg-primary border border-border-subtle",
          "flex flex-col justify-between"
        )}
      >
        <Award size={20} className="text-accent-secondary mb-2" />
        <div>
          <p className="text-3xl font-poppins font-bold text-text-heading">
            {contestsAttended}
          </p>
          <p className="text-xs text-text-body font-jakarta mt-1">Contests</p>
        </div>
      </div>

      {/* Streaks: Max + Current (right middle) */}
      <div
        className={cn(
          "col-span-2 p-6 rounded-3xl",
          "bg-bg-primary border border-border-subtle"
        )}
      >
        <div className="grid grid-cols-2 gap-4">
          {maxStreak !== undefined && (
            <div>
              <p className="text-xs text-text-body font-jakarta mb-1">
                Max Streak
              </p>
              <div className="flex items-center gap-2">
                <Flame size={20} className="text-orange-400" />
                <p className="text-3xl font-poppins font-bold text-text-heading">
                  {maxStreak}
                </p>
              </div>
            </div>
          )}
          {currentStreak !== undefined && (
            <div>
              <p className="text-xs text-text-body font-jakarta mb-1">
                Current Streak
              </p>
              <div className="flex items-center gap-2">
                <Flame size={20} className="text-yellow-400" />
                <p className="text-3xl font-poppins font-bold text-text-heading">
                  {currentStreak}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global & Country Rank (right bottom) */}
      {(globalRank !== undefined || countryRank !== undefined) && (
        <div
          className={cn(
            "col-span-2 p-6 rounded-3xl",
            "bg-bg-primary border border-border-subtle"
          )}
        >
          <div className="grid grid-cols-2 gap-4">
            {globalRank !== undefined && (
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Globe size={14} className="text-text-body/60" />
                  <p className="text-xs text-text-body font-jakarta">
                    Global Rank
                  </p>
                </div>
                <p className="text-2xl font-poppins font-bold text-text-heading">
                  #{globalRank.toLocaleString()}
                </p>
              </div>
            )}
            {countryRank !== undefined && (
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin size={14} className="text-text-body/60" />
                  <p className="text-xs text-text-body font-jakarta">
                    Country Rank
                  </p>
                </div>
                <p className="text-2xl font-poppins font-bold text-text-heading">
                  #{countryRank.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Certificates — full width with expand/collapse */}
      {certificates && certificates.length > 0 && (
        <div
          className={cn(
            "col-span-2 md:col-span-4 p-6 rounded-3xl",
            "bg-bg-primary border border-border-subtle"
          )}
        >
          <p className="text-xs text-text-body font-jakarta mb-3">
            Certificates
          </p>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence mode="popLayout">
              {(visibleCerts ?? []).map((cert) => (
                <motion.span
                  key={cert}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                    "text-xs font-jakarta font-medium",
                    "border"
                  )}
                  style={{
                    backgroundColor: `${platform.accentColor}10`,
                    borderColor: `${platform.accentColor}30`,
                    color: platform.accentColor,
                  }}
                >
                  <Award size={12} />
                  {cert}
                </motion.span>
              ))}
            </AnimatePresence>

            {/* +N more / Collapse toggle */}
            {hiddenCount > 0 && (
              <button
                onClick={() => setCertsExpanded(!certsExpanded)}
                className={cn(
                  "inline-flex items-center gap-1 px-3 py-1.5 rounded-full",
                  "text-xs font-jakarta font-medium",
                  "border border-white/10 bg-white/5",
                  "text-text-body hover:text-text-heading hover:bg-white/10",
                  "transition-all duration-200 cursor-pointer"
                )}
              >
                {certsExpanded ? (
                  <>
                    Show less
                    <ChevronDown
                      size={12}
                      className="rotate-180 transition-transform"
                    />
                  </>
                ) : (
                  <>
                    +{hiddenCount} more
                    <ChevronDown size={12} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeChefView;
