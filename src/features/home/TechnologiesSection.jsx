import React from "react";
import { useRef } from "react";
import { gsap } from "../../assets/lib/gsap";
import InfiniteMarquee from "./InfiniteMarquee"

const TechnologiesSection = () => {
  // criando array de refs
  const svgDivRefs = useRef([]);

  return (
    <section className="min-h-[50dvh] grid place-items-center">
      <div className="max-w-6xl lg:max-w-7xl w-full mx-auto grid gap-12">
        <div className="flex justify-center gap-4 sm:gap-24">
          <svg ref={el => svgDivRefs.current[0] = el} width="296" height="20" viewBox="0 0 296 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0.5L241.479 0.5L260.594 19.5M252.311 0.5L271.425 19.5M264.098 0.5L283.213 19.5M275.886 0.5L295 19.5" stroke="white"/>
          </svg>
          <h2 className="title-h2 text-center">Tecnologias</h2>
          <svg ref={el => svgDivRefs.current[1] = el} width="296" height="20" viewBox="0 0 296 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M295.353 0.5L53.8731 0.5L34.7586 19.5M43.0415 0.5L23.927 19.5M31.2543 0.5L12.1398 19.5M19.467 0.5L0.352535 19.5" stroke="white"/>
          </svg>
        </div>
        
        <InfiniteMarquee></InfiniteMarquee>
      </div>
      
    </section>
  );
};

export default TechnologiesSection;
