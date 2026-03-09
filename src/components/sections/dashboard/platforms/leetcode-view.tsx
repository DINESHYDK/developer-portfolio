import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ExternalLink } from "lucide-react";
import type { CodingPlatform } from "@/types";
import { cn } from "@/utils/cn";

interface LeetCodeViewProps {
  platform: CodingPlatform;
}

const LeetCodeView = ({ platform }: LeetCodeViewProps) => {
  // Prepare data for recharts
  const chartData = platform.breakdown.map((item) => ({
    name: item.label,
    value: item.solved,
    color: item.color,
    total: item.total,
  }));

  return (
    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
      {/* Left: Stats */}
      <div className="space-y-4">
        {platform.rating !== undefined && (
          <div className="p-5 rounded-3xl bg-bg-primary border border-border-subtle">
            <p className="text-xs text-text-body font-jakarta mb-1">
              Contest Rating
            </p>
            <p
              className="text-4xl font-poppins font-bold"
              style={{ color: platform.accentColor }}
            >
              {platform.rating}
            </p>
          </div>
        )}
        {platform.globalRanking !== undefined && (
          <div className="p-5 rounded-3xl bg-bg-primary border border-border-subtle">
            <p className="text-xs text-text-body font-jakarta mb-1">
              Global Ranking
            </p>
            <p className="text-2xl font-poppins font-semibold text-text-heading">
              #{platform.globalRanking.toLocaleString()}
            </p>
            <p className="text-xs text-text-body/60 font-jakarta mt-1">
              Top 54.14%
            </p>
          </div>
        )}
      </div>

      {/* Center: Circular Donut Chart */}
      <div className="flex flex-col items-center">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center -mt-[120px] pointer-events-none">
          <p className="text-3xl font-poppins font-bold text-text-heading">
            {platform.totalSolved}
          </p>
          <p className="text-xs text-text-body font-jakarta">/{platform.totalProblems}</p>
          <p className="text-[10px] text-accent-secondary font-jakarta mt-1">
            ✓ Solved
          </p>
        </div>
      </div>

      {/* Right: Breakdown */}
      <div className="space-y-3">
        {platform.breakdown.map((item) => (
          <div
            key={item.label}
            className="p-4 rounded-3xl bg-bg-primary border border-border-subtle"
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-sm font-jakarta font-semibold"
                style={{ color: item.color }}
              >
                {item.label}
              </span>
              <span className="text-sm font-mono text-text-heading">
                {item.solved}/{item.total}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-white/5">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${
                    item.total > 0 ? (item.solved / item.total) * 100 : 0
                  }%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeetCodeView;

