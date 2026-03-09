import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Award, Target } from "lucide-react";
import type { CodingPlatform } from "@/types";
import { cn } from "@/utils/cn";

interface CodeforcesViewProps {
  platform: CodingPlatform;
}

const CodeforcesView = ({ platform }: CodeforcesViewProps) => {
  const { rating, rank, maxRating, totalSolved, indexDistribution, contestsAttended } = platform;

  return (
    <div className="space-y-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Current Rating */}
        <div className={cn(
          "p-6 rounded-3xl",
          "bg-bg-primary border border-border-subtle",
          "text-center"
        )}>
          <p className="text-xs text-text-body font-jakarta mb-2">Current Rating</p>
          <p className="text-4xl font-poppins font-bold" style={{ color: platform.accentColor }}>
            {rating}
          </p>
          <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1 mt-2 rounded-full",
            "text-xs font-jakarta font-semibold"
          )} style={{
            backgroundColor: `${platform.accentColor}15`,
            color: platform.accentColor
          }}>
            {rank}
          </div>
        </div>

        {/* Max Rating */}
        {maxRating !== undefined && (
          <div className={cn(
            "p-6 rounded-3xl",
            "bg-bg-primary border border-border-subtle",
            "flex flex-col justify-between"
          )}>
            <TrendingUp size={20} className="text-accent-primary mb-2" />
            <div>
              <p className="text-3xl font-poppins font-bold text-text-heading">{maxRating}</p>
              <p className="text-xs text-text-body font-jakarta mt-1">Max Rating</p>
            </div>
          </div>
        )}

        {/* Total Solved */}
        <div className={cn(
          "p-6 rounded-3xl",
          "bg-bg-primary border border-border-subtle",
          "flex flex-col justify-between"
        )}>
          <Target size={20} className="text-accent-secondary mb-2" />
          <div>
            <p className="text-3xl font-poppins font-bold text-text-heading">{totalSolved}</p>
            <p className="text-xs text-text-body font-jakarta mt-1">Solved</p>
          </div>
        </div>

        {/* Contests */}
        <div className={cn(
          "p-6 rounded-3xl",
          "bg-bg-primary border border-border-subtle",
          "flex flex-col justify-between"
        )}>
          <Award size={20} className="text-accent-primary mb-2" />
          <div>
            <p className="text-3xl font-poppins font-bold text-text-heading">{contestsAttended}</p>
            <p className="text-xs text-text-body font-jakarta mt-1">Contests</p>
          </div>
        </div>
      </div>

      {/* Index Distribution Bar Chart */}
      {indexDistribution && indexDistribution.length > 0 && (
        <div className={cn(
          "p-8 rounded-3xl",
          "bg-bg-primary border border-border-subtle"
        )}>
          <p className="text-sm font-jakarta font-semibold text-text-heading mb-6">
            Problem Index Distribution
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={indexDistribution} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis
                dataKey="index"
                tick={{ fill: "#94A3B8", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94A3B8", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#12121A",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontFamily: "Plus Jakarta Sans",
                }}
                labelStyle={{ color: "#FFFFFF" }}
                itemStyle={{ color: "#94A3B8" }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={80}>
                {indexDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CodeforcesView;
