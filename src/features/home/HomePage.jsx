import ContactSection from "./components/contact/ContactSection";
import Hero from "./components/hero/Hero";
import ProjectsSection from "./components/projects/ProjectsSection";
import TechnologiesSection from "./components/technologies/TechnologiesSection";
import AboutMeSection from "./components/about/AboutSection";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MeshBackground from "../../components/MeshBackground";
import { useRef } from "react";

const HomePage = () => {
  return (
    <div className="relative overflow-hidden bg-[#10083B]">
      <Header />
      <main className=" m-4 sm:m-7 border border-border rounded-sm bg-background/50 ">
        {/* <div
          className="absolute inset-0"
          style={{
            background: `
                  radial-gradient(circle at 15% 40%, #7e22ce, transparent 45%),
                  radial-gradient(circle at 85% 15%, #3730a3, transparent 45%),
                  radial-gradient(circle at 55% 85%, #be185d, transparent 38%)
                `,
            filter: "blur(80px)",
            opacity: 0.45,
          }}
        ></div>*/}

        <MeshBackground />

        <div id="hero-section">
          <Hero className="snap-start snap-always" />
        </div>
        <div id="technologies-section">
          <TechnologiesSection className="relative" />
        </div>
        <div id="projects-section">
          <ProjectsSection className="relative" />
        </div>
        <div id="contact-section">
          <ContactSection className="relative" />
        </div>
        <div id="about-section">
          <AboutMeSection className="relative" />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
