import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { BookOpen, Target } from "lucide-react";
import type { CodingPlatform } from "@/types";
import { cn } from "@/utils/cn";

interface TufViewProps {
  platform: CodingPlatform;
}

const TufView = ({ platform }: TufViewProps) => {
  const breakdown = platform.tufBreakdown ?? [];
  const solved = platform.tufSolved ?? platform.totalSolved;
  const total = platform.tufTotal ?? platform.totalProblems ?? 0;
  const progressPercent = total > 0 ? ((solved / total) * 100).toFixed(1) : "0";

  // Prepare donut chart data
  const chartData = breakdown.map((item) => ({
    name: item.label,
    value: item.solved,
    color: item.color,
    total: item.total,
  }));

  // Remaining unsolved for the donut background ring
  const totalBreakdownSolved = breakdown.reduce((s, b) => s + b.solved, 0);
  const remaining = total - totalBreakdownSolved;
  if (remaining > 0) {
    chartData.push({ name: "Unsolved", value: remaining, color: "rgba(255,255,255,0.05)", total: 0 });
  }

  return (
    <div className="space-y-6">
      {/* Top: Donut Chart + Stats */}
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
        {/* Left: Progress Overview */}
        <div className="space-y-4">
          <div
            className={cn(
              "p-6 rounded-3xl",
              "bg-bg-primary border border-border-subtle"
            )}
          >
            <BookOpen size={20} className="mb-3" style={{ color: platform.accentColor }} />
            <p className="text-xs text-text-body font-jakarta mb-1">A2Z DSA Sheet</p>
            <p className="text-4xl font-poppins font-bold text-text-heading">
              {progressPercent}%
            </p>
            <p className="text-xs text-text-body/60 font-jakarta mt-1">completed</p>
          </div>

          <div
            className={cn(
              "p-6 rounded-3xl",
              "bg-bg-primary border border-border-subtle"
            )}
          >
            <Target size={20} className="text-accent-primary mb-3" />
            <p className="text-xs text-text-body font-jakarta mb-1">Problems Solved</p>
            <p className="text-3xl font-poppins font-bold text-text-heading">
              {solved}
              <span className="text-lg text-text-body/60 font-normal">/{total}</span>
            </p>
          </div>
        </div>

        {/* Center: Donut Chart */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-3xl font-poppins font-bold text-text-heading">{solved}</p>
              <div className="w-8 h-[1px] bg-white/20 my-1" />
              <p className="text-sm text-text-body font-jakarta">{total}</p>
            </div>
          </div>
        </div>

        {/* Right: Breakdown Cards */}
        <div className="space-y-3">
          {breakdown.map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-3xl bg-bg-primary border border-border-subtle"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-jakarta font-semibold" style={{ color: item.color }}>
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-mono text-text-heading">
                  {item.solved}/{item.total}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-white/5">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${item.total > 0 ? (item.solved / item.total) * 100 : 0}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Quick Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className={cn("p-5 rounded-3xl text-center", "bg-bg-primary border border-border-subtle")}>
          <p className="text-2xl font-poppins font-bold" style={{ color: "#00B8A3" }}>
            {breakdown.find((b) => b.label === "Easy")?.solved ?? 0}
          </p>
          <p className="text-xs text-text-body font-jakarta mt-1">Easy</p>
        </div>
        <div className={cn("p-5 rounded-3xl text-center", "bg-bg-primary border border-border-subtle")}>
          <p className="text-2xl font-poppins font-bold" style={{ color: "#FFC01E" }}>
            {breakdown.find((b) => b.label === "Medium")?.solved ?? 0}
          </p>
          <p className="text-xs text-text-body font-jakarta mt-1">Medium</p>
        </div>
        <div className={cn("p-5 rounded-3xl text-center", "bg-bg-primary border border-border-subtle")}>
          <p className="text-2xl font-poppins font-bold" style={{ color: "#EF4743" }}>
            {breakdown.find((b) => b.label === "Hard")?.solved ?? 0}
          </p>
          <p className="text-xs text-text-body font-jakarta mt-1">Hard</p>
        </div>
      </div>
    </div>
  );
};

export default TufView;

