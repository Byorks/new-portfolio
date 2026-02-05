import { useRef } from "react";
import { gsap, useGSAP } from "../../../../lib/gsap";
import scrambleTech from "../../../../animations/scrambleTech";

const AboutMeSection = () => {
  const containerRef = useRef();
  const verticalRef = useRef();
  const lineRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const textRef = useRef();

  // Animações
  useGSAP(() => {
    // paths da div
    // const divPaths = svgDivRef.current.querySelectorAll("line");
    // Configuração da timeline gsap
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "restart pause resume pause",
        markers: true,
      },
    });

    // Colocando a opacidade para 0
    gsap.set([titleRef.current, contentRef.current], {
      opacity: 0,
    });

    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 1,
      ease: "power2.out",
    }).to(
      verticalRef.current,
      {
        scaleY: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "<",
    );

    scrambleTech(tl, titleRef.current, "Sobre mim");

    // tl.to(contentRef.current, {
    //   opacity: 1,
    //   duration: 0.5,
    // });

    gsap.from([contentRef.current], {
      opacity: 0,
      filter: "blur(200px)",
      scale: 0.9,
      duration: 1,
      ease: "sine.out",
    });

    gsap.from([textRef.current], {
     opacity: 0,
      filter: "blur(15px)",  // Efeito de desfoque inicial
      y: 20,                 // Leve subida
      duration: 1,
      stagger: 0.08,         // Intervalo entre cada palavra
      ease: "power2.out",
      // Limpeza opcional: remove o estilo de filtro ao terminar para melhor performance
    })
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="min-h-dvh w-full flex items-center "
    >
      <div className="max-w-6xl lg:max-w-7xl w-full h-full mx-auto flex flex-col">
        <div className="w-full relative px-6 sm:px-8 my-6 md:my-11">
          {/* Linha horizontal */}
          <div ref={lineRef} className="h-px bg-white origin-left scale-x-0" />

          {/* Linha vertical */}
          <div
            ref={verticalRef}
            className="absolute  left-15 -top-6 h-12 w-px bg-white origin-top scale-y-0"
          />
        </div>
        <h2 ref={titleRef} className="title-h2 text-center"></h2>

        <div
          ref={contentRef}
          className="w-full
        "
        >
          <p ref={textRef} >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
