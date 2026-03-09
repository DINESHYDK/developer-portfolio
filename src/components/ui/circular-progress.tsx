import { cn } from "@/utils/cn";

interface CircularProgressProps {
  solved: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  segments: { color: string; value: number }[];
  className?: string;
}

const CircularProgress = ({
  solved,
  total,
  size = 140,
  strokeWidth = 10,
  segments,
  className,
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Calculate segment arcs
  const totalValue = segments.reduce((sum, seg) => sum + seg.value, 0);
  let currentOffset = 0;

  const segmentArcs = segments.map((segment) => {
    const segmentLength =
      totalValue > 0 ? (segment.value / total) * circumference : 0;
    const offset = currentOffset;
    currentOffset += segmentLength;
    return {
      ...segment,
      dashArray: `${segmentLength} ${circumference - segmentLength}`,
      dashOffset: -offset,
    };
  });

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/5"
        />
        {/* Segments */}
        {segmentArcs.map((seg, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={seg.dashArray}
            strokeDashoffset={seg.dashOffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        ))}
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-poppins font-bold text-text-heading">
          {solved}
        </span>
        <span className="text-xs text-text-body font-jakarta">
          /{total}
        </span>
        <span className="text-[10px] text-accent-secondary font-jakarta mt-0.5">
          ✓ Solved
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;

