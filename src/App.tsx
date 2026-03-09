import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import CodingStatsSection from "@/components/sections/dashboard/coding-stats-section";
import ContactSection from "@/components/sections/contact-section";

function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-body">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CodingStatsSection />
        <ContactSection />
      </main>
      <Footer />
      {/* Spacer for mobile bottom navbar */}
      <div className="h-24 md:h-0" />
    </div>
  );
}

export default App;
