import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";
import { haptic } from "@/utils/haptic";

interface OrbitCardProps {
  title: string;
  skills: string[];
  accentColor?: string;
}

const OrbitCard = ({ title, skills, accentColor = "#8ECAE6" }: OrbitCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for animation (NO React re-renders)
  const angle          = useMotionValue(0);
  const velocity       = useMotionValue(0.3);
  const targetVelocity = useMotionValue(0.3);

  // Mouse / touch interaction state
  const lastMouseX    = useRef(0);
  const lastMouseY    = useRef(0);
  const lastTime      = useRef(Date.now());
  const lastHapticAt  = useRef(0); // throttle haptic ticks on mobile

  // Continuous rotation — 60fps, zero re-renders
  useAnimationFrame(() => {
    const currentVel = velocity.get();
    const targetVel  = targetVelocity.get();
    velocity.set(currentVel + (targetVel - currentVel) * 0.05);
    angle.set(angle.get() + velocity.get());
  });

  // Pointer move → velocity boost (works for both mouse and touch via Pointer Events API)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect    = containerRef.current.getBoundingClientRect();
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    const mouseX  = e.clientX - rect.left - centerX;
    const mouseY  = e.clientY - rect.top  - centerY;

    const now       = Date.now();
    const deltaTime = now - lastTime.current;

    if (deltaTime > 0) {
      const deltaX       = mouseX - lastMouseX.current;
      const deltaY       = mouseY - lastMouseY.current;
      const mouseVelocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime;
      const boost        = Math.min(mouseVelocity * 2, 5);
      targetVelocity.set(0.3 + boost);

      // Haptic tick on mobile swipe — throttled to once per 150ms, only when spinning
      if (e.pointerType === "touch" && boost > 0.4 && now - lastHapticAt.current > 150) {
        haptic("tick");
        lastHapticAt.current = now;
      }
    }

    lastMouseX.current = mouseX;
    lastMouseY.current = mouseY;
    lastTime.current   = now;
  };

  const handlePointerLeave = () => {
    targetVelocity.set(0.3); // smooth return to baseline
  };

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      // Entrance animation
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      // Hover lift + accent glow
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: `0 0 36px ${accentColor}22, 0 12px 28px rgba(0,0,0,0.35)`,
      }}
      className={cn(
        "relative p-6 rounded-3xl overflow-hidden",
        "bg-bg-surface/80 backdrop-blur-md",
        "border border-white/5 hover:border-white/12",
        // transition-colors only — Framer Motion owns transform + boxShadow
        "transition-colors duration-300",
        "cursor-default"
      )}
      style={{ minHeight: "400px" }}
    >
      {/* Glowing background gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}, transparent 70%)`,
        }}
      />

      {/* Title */}
      <h3
        className="relative z-10 font-poppins text-xl font-semibold text-center mb-8"
        style={{ color: accentColor }}
      >
        {title}
      </h3>

      {/* Orbital visualization */}
      <div className="relative w-full h-64 flex items-center justify-center">
        {skills.map((skill, index) => {
          const angleOffset = (index / skills.length) * Math.PI * 2;

          const x = useTransform(angle, (a) => {
            const currentAngle = a * 0.02 + angleOffset;
            return Math.cos(currentAngle) * 100;
          });

          const y = useTransform(angle, (a) => {
            const currentAngle = a * 0.02 + angleOffset;
            return Math.sin(currentAngle) * 60;
          });

          const scale   = useTransform(y, [-60, 60], [0.85, 1.15]);
          const opacity = useTransform(y, [-60, 60], [0.4, 1]);
          const zIndex  = useTransform(y, [-60, 60], [1, 10]);

          return (
            <motion.div
              key={skill}
              className={cn(
                "absolute px-4 py-2 rounded-full text-sm font-mono font-medium",
                "border backdrop-blur-sm select-none"
              )}
              style={{
                x,
                y,
                scale,
                opacity,
                zIndex,
                backgroundColor: `${accentColor}15`,
                borderColor:     `${accentColor}30`,
                color:           accentColor,
              }}
            >
              {skill}
            </motion.div>
          );
        })}
      </div>

      {/* Hint text — touch-aware */}
      <p className="relative z-10 text-center text-xs text-text-body/40 font-jakarta mt-6">
        Drag to spin
      </p>
    </motion.div>
  );
};

export default OrbitCard;