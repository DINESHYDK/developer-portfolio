import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import CodingStatsSection from "@/components/sections/dashboard/coding-stats-section";
import ContactSection from "@/components/sections/contact-section";
import SmoothCursor from "@/components/smooth-cursor/SmoothCursor";
import SplashScreen from "@/components/splash-screen/SplashScreen";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

// Show splash only once per browser session
const hasSeenSplash = sessionStorage.getItem("ydk_splash_seen") === "true";

function App() {
  const [showSplash, setShowSplash] = useState(!hasSeenSplash);
  const [splashDone, setSplashDone] = useState(hasSeenSplash);

  const handleSplashDone = () => {
    sessionStorage.setItem("ydk_splash_seen", "true");
    setShowSplash(false);
    setSplashDone(true);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-body">
      <ScrollProgressBar />
      <SmoothCursor />
      <AnimatePresence>
        {showSplash && <SplashScreen onDone={handleSplashDone} />}
      </AnimatePresence>
      <Navbar />
      {splashDone && (
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <CodingStatsSection />
          <ContactSection />
        </main>
      )}
      <Footer />
      {/* Spacer for mobile bottom navbar — only needed above the footer */}
      <div className="h-16 md:h-0" />
    </div>
  );
}

export default App;
