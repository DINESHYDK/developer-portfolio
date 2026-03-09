import { Trophy, Star, Award, TrendingUp } from "lucide-react";
import type { CodingPlatform } from "@/types";
import { cn } from "@/utils/cn";

interface CodeChefViewProps {
  platform: CodingPlatform;
}

const CodeChefView = ({ platform }: CodeChefViewProps) => {
  const {
    rating,
    division,
    stars,
    totalSolved,
    certificates,
    maxStreak,
    contestsAttended,
  } = platform;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Rating - Large Featured Card */}
      <div
        className={cn(
          "col-span-2 row-span-2 p-8 rounded-3xl",
          "bg-bg-primary border border-border-subtle",
          "flex flex-col items-center justify-center text-center"
        )}
      >
        <Trophy
          size={40}
          className="mb-4"
          style={{ color: platform.accentColor }}
        />
        <p className="text-xs text-text-body font-jakarta mb-2">
          Current Rating
        </p>
        <p
          className="text-6xl font-poppins font-bold mb-3"
          style={{ color: platform.accentColor }}
        >
          {rating}
        </p>
        <div className="flex items-center gap-2">
          {[...Array(stars)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={platform.accentColor}
              className="text-transparent"
              style={{ color: platform.accentColor }}
            />
          ))}
          <span className="text-sm font-jakarta text-text-body ml-2">
            {stars}★ (Div {division})
          </span>
        </div>
      </div>

      {/* Total Solved */}
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

      {/* Contests */}
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

      {/* Max Streak */}
      {maxStreak !== undefined && (
        <div
          className={cn(
            "col-span-2 p-6 rounded-3xl",
            "bg-bg-primary border border-border-subtle"
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-text-body font-jakarta mb-1">
                Max Streak
              </p>
              <p className="text-4xl font-poppins font-bold text-text-heading">
                {maxStreak} 🔥
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Certificates */}
      {certificates && certificates.length > 0 && (
        <div
          className={cn(
            "col-span-2 p-6 rounded-3xl",
            "bg-bg-primary border border-border-subtle"
          )}
        >
          <p className="text-xs text-text-body font-jakarta mb-3">
            Certificates
          </p>
          <div className="flex flex-wrap gap-2">
            {certificates.map((cert) => (
              <span
                key={cert}
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
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeChefView;
