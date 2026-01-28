import React from "react";
import { useRef } from "react";
import { gsap, useGSAP } from "../../assets/lib/gsap";
import InfiniteMarquee from "./InfiniteMarquee";
import flicker from "../../animations/flicker";
import scrambleTech from "../../animations/scrumbleText";

const TechnologiesSection = () => {
  // criando array de refs
  const svgDivRefs = useRef([]);
  const titleRef = useRef();
  const logoRef = useRef();
  const containerRef = useRef();

  useGSAP(() => {
    // Configuração da timeline gsap
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        // toggleActions: "restart pause resume pause",
        markers: true,
      },
    });

    // Colocando a opacidade para 0
    gsap.set([svgDivRefs.current, titleRef.current, logoRef.current], {
      opacity: 0,
    });

    flicker(tl, svgDivRefs.current, 2);
 
    scrambleTech(tl, titleRef.current, "Tecnologias")
    
    tl.to(logoRef.current, {
      opacity: 1,
      duration: 0.5,
    });
  });

  return (
    <section
      ref={containerRef}
      className="min-h-[50dvh] w-full flex items-center"
    >
      <div className="max-w-6xl lg:max-w-7xl w-full h-full mx-auto flex flex-col gap-4 md:gap-11">
        <div className=" p-6 sm:p-11 flex justify-center gap-4 sm:gap-24 ">
          <svg
            ref={(el) => (svgDivRefs.current[0] = el)}
            width="296"
            height="20"
            viewBox="0 0 296 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0.5L241.479 0.5L260.594 19.5M252.311 0.5L271.425 19.5M264.098 0.5L283.213 19.5M275.886 0.5L295 19.5"
              stroke="white"
            />
          </svg>
          <h2 ref={titleRef} className="title-h2 text-center"></h2>
          <svg
            ref={(el) => (svgDivRefs.current[1] = el)}
            width="296"
            height="20"
            viewBox="0 0 296 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M295.353 0.5L53.8731 0.5L34.7586 19.5M43.0415 0.5L23.927 19.5M31.2543 0.5L12.1398 19.5M19.467 0.5L0.352535 19.5"
              stroke="white"
            />
          </svg>
        </div>

        <div ref={logoRef} className="w-full">
          <InfiniteMarquee></InfiniteMarquee>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
