import Header from "./Header";
import Hero from "./Hero";

const HomePage = () => {
  return (
    <main>
      <Header />
      <div className="m-7 border border-border bg-radial-[at_110%_-30%] from-[#584E93]  via-[#302B50] to-48% via-25% to-background rounded-sm">
        <Hero />        
      </div>
    </main>
  );
};

export default HomePage;
