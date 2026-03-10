import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
} from "recharts";
import { TrendingUp, Award, Target } from "lucide-react";
import { motion } from "framer-motion";
import type { CodingPlatform } from "@/types";
import { cn } from "@/utils/cn";

interface CodeforcesViewProps {
  platform: CodingPlatform;
}

type ChartTab = "level" | "rating" | "tags";

const CHART_TABS: { id: ChartTab; label: string }[] = [
  { id: "level", label: "Level" },
  { id: "rating", label: "Rating" },
  { id: "tags", label: "Tags" },
];

/* Custom tooltip matching the dark theme */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={cn(
      "px-3 py-2 rounded-xl",
      "bg-bg-surface border border-border-subtle",
      "shadow-xl shadow-black/40"
    )}>
      <p className="text-xs font-jakarta font-semibold text-text-heading">{label ?? payload[0]?.name}</p>
      <p className="text-xs font-mono text-text-body mt-0.5">
        count: {payload[0]?.value}
      </p>
    </div>
  );
};

const CodeforcesView = ({ platform }: CodeforcesViewProps) => {
  const { rating, rank, maxRating, totalSolved, indexDistribution, ratingDistribution, tagDistribution, contestsAttended } = platform;
  const [activeChart, setActiveChart] = useState<ChartTab>("level");

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

      {/* Chart Section with Tabs */}
      <div className={cn(
        "p-8 rounded-3xl",
        "bg-bg-primary border border-border-subtle"
      )}>
        {/* Tab Selector */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-jakarta font-semibold text-text-heading">
            {activeChart === "level" && "Problem Index Distribution"}
            {activeChart === "rating" && "Problem Ratings"}
            {activeChart === "tags" && "Tags Solved"}
          </p>
          <div className="inline-flex items-center gap-0.5 p-1 rounded-xl bg-bg-surface border border-border-subtle">
            {CHART_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveChart(tab.id)}
                className={cn(
                  "relative px-4 py-1.5 rounded-lg text-xs font-jakarta font-medium",
                  "transition-colors duration-200",
                  activeChart === tab.id
                    ? "text-bg-primary"
                    : "text-text-body hover:text-text-heading"
                )}
              >
                {activeChart === tab.id && (
                  <motion.div
                    layoutId="cfChartTab"
                    className="absolute inset-0 rounded-lg bg-accent-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Level (Index) Chart */}
        {activeChart === "level" && indexDistribution && indexDistribution.length > 0 && (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={indexDistribution} margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
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
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={80}>
                {indexDistribution.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* Rating Distribution Chart */}
        {activeChart === "rating" && ratingDistribution && ratingDistribution.length > 0 && (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ratingDistribution} margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
              <XAxis
                dataKey="rating"
                tick={{ fill: "#94A3B8", fontSize: 11, fontFamily: "Plus Jakarta Sans" }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94A3B8", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={60}>
                {ratingDistribution.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* Tags Donut Chart */}
        {activeChart === "tags" && tagDistribution && tagDistribution.length > 0 && (
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={tagDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={1}
                  dataKey="count"
                  nameKey="tag"
                  strokeWidth={0}
                >
                  {tagDistribution.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="max-h-[280px] overflow-y-auto pr-2 space-y-1.5 scrollbar-thin">
              {tagDistribution.map((entry) => (
                <div key={entry.tag} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="font-jakarta text-text-body truncate">{entry.tag}</span>
                  <span className="font-mono text-text-heading ml-auto">{entry.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {activeChart === "rating" && (!ratingDistribution || ratingDistribution.length === 0) && (
          <p className="text-text-body/40 text-sm font-jakarta text-center py-16">No rating data available</p>
        )}
        {activeChart === "tags" && (!tagDistribution || tagDistribution.length === 0) && (
          <p className="text-text-body/40 text-sm font-jakarta text-center py-16">No tag data available</p>
        )}
      </div>
    </div>
  );
};

export default CodeforcesView;
