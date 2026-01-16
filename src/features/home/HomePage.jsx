import Header from "./Header";
import Hero from "./Hero";
import TechnologiesSection from "./TechnologiesSection";

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
      </main>
    </>
  );
};

export default HomePage;
