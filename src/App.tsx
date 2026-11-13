import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import ContactSection from "@/components/sections/contact-section";

// Code-split: the stats dashboard pulls in recharts (~300 kB), so it
// loads as a separate chunk instead of blocking first paint.
const CodingStatsSection = lazy(
  () => import("@/components/sections/dashboard/coding-stats-section"),
);
import SmoothCursor from "@/components/smooth-cursor/SmoothCursor";
import SplashScreen from "@/components/splash-screen/SplashScreen";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import { CodingStatsProvider } from "@/context/coding-stats-context";

// Show splash only once per browser session
// and never for users who ask the OS for reduced motion
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const hasSeenSplash =
  prefersReducedMotion || sessionStorage.getItem("ydk_splash_seen") === "true";

function App() {
  const [showSplash, setShowSplash] = useState(!hasSeenSplash);
  const [splashDone, setSplashDone] = useState(hasSeenSplash);

  const handleSplashDone = () => {
    sessionStorage.setItem("ydk_splash_seen", "true");
    setShowSplash(false);
    setSplashDone(true);
  };

  // Scroll to top after React commits the DOM when splash finishes
  useEffect(() => {
    if (splashDone) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [splashDone]);

  return (
    <CodingStatsProvider>
      {/* reducedMotion="user" — respects OS prefers-reduced-motion for all framer animations */}
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-bg-primary text-text-body">
          <ScrollProgressBar />
          <SmoothCursor />
          <AnimatePresence>
            {showSplash && <SplashScreen onDone={handleSplashDone} />}
          </AnimatePresence>
          <Navbar />
          <main
            style={
              !splashDone
                ? {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    zIndex: -1,
                    opacity: 0,
                    pointerEvents: "none",
                  }
                : {}
            }
          >
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <Suspense
              fallback={<section id="coding" className="min-h-[50vh]" />}
            >
              <CodingStatsSection />
            </Suspense>
            <ContactSection />
          </main>
          {splashDone && <Footer />}
          {splashDone && <div className="h-16 md:h-0" />}
        </div>
      </MotionConfig>
    </CodingStatsProvider>
  );
}

export default App;
