import ContactSection from "./components/contact/ContactSection";
 
import Hero from "./components/hero/Hero";
import ProjectsSection from "./components/projects/ProjectsSection";
import TechnologiesSection from "./components/technologies/TechnologiesSection";
import AboutMeSection from "./components/about/AboutSection";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <main className=" m-4 sm:m-7 border border-border bg-radial-[at_110%_-30%] from-[#584E93]  via-[#302B50] to-48% via-25% to-background rounded-sm">
        {/* <div className="min-h-screen">
          <div className="">batata</div>
        </div> */}
        <Hero className="snap-start snap-always" />

        <TechnologiesSection />

        <ProjectsSection />

        <ContactSection />

        <AboutMeSection />

        <Footer />
      </main>
    </>
  );
};

export default HomePage;
