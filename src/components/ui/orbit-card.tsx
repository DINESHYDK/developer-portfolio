import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";

interface OrbitCardProps {
  title: string;
  skills: string[];
  accentColor?: string;
}

const OrbitCard = ({ title, skills, accentColor = "#8ECAE6" }: OrbitCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for animation (NO React re-renders)
  const angle = useMotionValue(0);
  const velocity = useMotionValue(0.3); // Baseline slow speed
  const targetVelocity = useMotionValue(0.3);

  // Mouse interaction state
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const lastTime = useRef(Date.now());

  // Continuous rotation using animation frame (60fps without re-renders)
  useAnimationFrame((_time, _delta) => {
    // Smoothly interpolate velocity towards target
    const currentVel = velocity.get();
    const targetVel = targetVelocity.get();
    const newVel = currentVel + (targetVel - currentVel) * 0.05; // Smooth deceleration
    velocity.set(newVel);

    // Update angle based on velocity
    angle.set(angle.get() + newVel);
  });

  // Handle mouse movement to apply "push" physics
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Mouse position relative to center
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;

    // Calculate velocity based on mouse movement
    const now = Date.now();
    const deltaTime = now - lastTime.current;

    if (deltaTime > 0) {
      const deltaX = mouseX - lastMouseX.current;
      const deltaY = mouseY - lastMouseY.current;
      const mouseVelocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime;

      // Apply velocity boost (clamped)
      const boost = Math.min(mouseVelocity * 2, 5);
      targetVelocity.set(0.3 + boost);
    }

    lastMouseX.current = mouseX;
    lastMouseY.current = mouseY;
    lastTime.current = now;
  };

  // Reset to baseline speed on mouse leave
  const handlePointerLeave = () => {
    targetVelocity.set(0.3); // Smooth return to baseline
  };

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn(
        "relative p-6 rounded-3xl overflow-hidden",
        "bg-bg-surface/80 backdrop-blur-md border border-white/5",
        "transition-all duration-300 hover:border-white/10"
      )}
      style={{ minHeight: "400px" }}
    >
      {/* Glowing background gradient */}
      <div
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
          // Calculate angle offset for this chip
          const angleOffset = (index / skills.length) * Math.PI * 2;

          // Use useTransform to calculate position based on angle (NO re-renders)
          const x = useTransform(angle, (a) => {
            const currentAngle = a * 0.02 + angleOffset; // 0.02 = rotation speed multiplier
            return Math.cos(currentAngle) * 100; // 100px orbit radius
          });

          const y = useTransform(angle, (a) => {
            const currentAngle = a * 0.02 + angleOffset;
            return Math.sin(currentAngle) * 60; // 60px vertical radius (ellipse)
          });

          // Scale and opacity based on Y position (depth effect)
          const scale = useTransform(y, [-60, 60], [0.85, 1.15]);
          const opacity = useTransform(y, [-60, 60], [0.4, 1]);
          const zIndex = useTransform(y, [-60, 60], [1, 10]);

          return (
            <motion.div
              key={skill}
              className={cn(
                "absolute px-4 py-2 rounded-full text-sm font-mono font-medium",
                "border backdrop-blur-sm"
              )}
              style={{
                x,
                y,
                scale,
                opacity,
                zIndex,
                backgroundColor: `${accentColor}15`,
                borderColor: `${accentColor}30`,
                color: accentColor,
              }}
            >
              {skill}
            </motion.div>
          );
        })}
      </div>

      {/* Subtle hint text */}
      <p className="relative z-10 text-center text-xs text-text-body/40 font-jakarta mt-6">
        Hover to interact
      </p>
    </motion.div>
  );
};

export default OrbitCard;


