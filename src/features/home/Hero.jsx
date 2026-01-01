import arrowBottom from "../../assets/image/ui/seta.svg"

const Hero = () => {
  return (
    <section className="min-h-dvh w-full">
      <div className="max-w-6xl mx-auto">
 
          <h1 className="text-3xl sm:text-6xl">Vanessa Byork</h1>
          <h2 className="text-3xl sm:text-6xl">Desenvolvedora Front-end</h2>

            <div className="w-full flex justify-center">
                <img src={arrowBottom}alt="" />
            </div>
      </div>
    </section>
  );
};

export default Hero;
