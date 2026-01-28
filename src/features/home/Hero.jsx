import { useRef } from "react";
import arrowBottom from "../../assets/image/ui/seta.svg";
import { gsap, ScrollTrigger, SplitText } from "../../assets/lib/gsap";
import { useGSAP } from "@gsap/react";
import GlitchTitle from "./GlitchTitle";
import flicker from "../../animations/flicker";

const Hero = ( { className }) => {
  const containerRef = useRef();
  const titleRef = useRef();
  const subTitleRef = useRef();
  const arrowRef = useRef();
  const firstSvgRef = useRef();
  const firstPath2Ref = useRef();
  const secondSvgRef = useRef();
  const secondPathRef = useRef();
  const thirdSvgRef = useRef();
  const fourthSvgRef = useRef();
  const glitchWrapperRef = useRef();

  // Efeito de aparecer texto
  useGSAP(
    () => {
      // Selecionando paths
      const drawFirstPaths = firstSvgRef.current.querySelectorAll("path");
      const drawSecondPaths = secondSvgRef.current.querySelectorAll("path");
      const drawThirdPaths = thirdSvgRef.current.querySelectorAll("path");
      const drawFourthPaths = fourthSvgRef.current.querySelectorAll("path");
      const showThirdClipPath = thirdSvgRef.current.querySelector(
        "#clip0_2078_55 rect"
      );
      // Cria o SplitText no elemento h1
      const titleSplit = new SplitText(titleRef.current, {
        type: "chars", // Divide apenas em caracteres (mais performático)
        charsClass: "char", // Adiciona classe .char em cada char (opcional, mas útil)
      });

      const subTitleSplit = new SplitText(subTitleRef.current, {
        type: "chars",
        charsClass: "char",
      });

      // Estado inicial: esconde os chars abaixo (como no exemplo original)
      gsap.set([titleSplit.chars, subTitleSplit.chars], { y: 115, opacity: 0 }); // Você pode ajustar opacity se quiser fade + translate

      gsap.set([arrowRef.current], { opacity: 0 });
      // Timeline principal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          markers: false,
        },
      });

      // estado inicial do svg, não desenhado
      gsap.set(
        [drawFirstPaths, drawSecondPaths, drawThirdPaths, drawFourthPaths],
        { drawSVG: "0% 0%" }
      );

      gsap.set([drawThirdPaths, drawFourthPaths], { opacity: 0 });
      
      // Rotação do +
      gsap.set([firstPath2Ref.current, secondPathRef.current], {
        rotation: 720,
      });

      tl.to([firstPath2Ref.current, secondPathRef.current], {
        rotation: 370,
        duration: 0.5,
        ease: "none",
        svgOrigin: "17 17.13",
      }).to([firstPath2Ref.current, secondPathRef.current], {
        rotation: 360,
        duration: 0.15,
        ease: "power4.out",
        svgOrigin: "17 17.13",
      });

      // linhas do svg
      tl.to([drawFirstPaths, drawSecondPaths], {
        drawSVG: "0% 100%",
        duration: .5,
        ease: "power2.out",
      });

      // Outra forma de animações em conjunto, colocando dois no mesmo array
      tl.to([drawThirdPaths, drawFourthPaths], {
        opacity: 1,
        duration: 0.6,
      });
      
      tl.to(
        showThirdClipPath,
        {
          attr: {
            y: 0,
            height: 100,
          },
          duration: 1,
          ease: "power2.out",
        },
        "<" // "<" significa comece junto com a animação anterior
      );

      // Desenho do X
      tl.to([drawThirdPaths, drawFourthPaths], {
        drawSVG: "0% 100%",
        duration: 0.5,
        ease: "power2.out",
      });

      // 1. Animação do título
      tl.to(titleSplit.chars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
      })

        // 2. Animação do subtítulo (começa logo após o título terminar)
        .to(
          subTitleSplit.chars,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: "power3.out",
          },
          "-=0.4"
        ); // Overlap leve de 0.4s para fluir melhor (ajuste a gosto)
      // após terminar animação de subTitleSplit.chars

      // 3) faz o h2 “sair”
      tl.to(subTitleRef.current, {
        delay: 1,
        opacity: 0,
        y: -20, // sobe um pouco (ou +20 para descer)
        duration: 0.3,
        ease: "power2.in",
      })
      .set(subTitleRef.current, {
        opacity: 0,
        pointerEvents: "none",
      });

      tl.to(glitchWrapperRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // 3. Flicker
      // Sua sequência de flicker (pode simplificar com .to() repetido ou stagger se múltiplos)
      flicker(tl, arrowRef.current, 1);

      tl.to({}, { duration: 0.6 }); // pausa final

      // Cleanup: reverte o split ao desmontar o componente
      return () => {
        titleSplit.revert();
        subTitleSplit.revert();
        tl.kill();
      };
    },

    { scope: containerRef }
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 5 });

      // criando lista com os paths
      let arrowSvgPaths = fourthSvgRef.current.querySelectorAll("path");

      let arrayArrowPaths = [...arrowSvgPaths];

      arrayArrowPaths.pop(arrayArrowPaths.length - 1);
      arrayArrowPaths.pop(arrayArrowPaths.length - 1);
      console.log(arrowSvgPaths);

      // removendo o ultimo path, do morph

      // estado base
      gsap.set(arrayArrowPaths, { svgOrigin: "16 16" });

      // jitter horizontal
      tl.to(arrayArrowPaths, { x: -4, duration: 0.04, ease: "power4.inOut" })
        .to(arrayArrowPaths, { x: 4, duration: 0.04, ease: "power4.inOut" })
        .to(arrayArrowPaths, { x: 0, duration: 0.04, ease: "power4.inOut" })

        .to(arrayArrowPaths, { skewX: 15, scaleY: 1.1, duration: 0.06 })
        .to(arrayArrowPaths, { skewX: 0, scaleY: 1, duration: 0.06 })

        .to(
          arrayArrowPaths,
          {
            duration: 0.1,
            morphSVG: "#alt-shape",
            ease: "power2.inOut",
          },
          "+=3"
        )

        // outro micro jitter
        .to(arrayArrowPaths, { y: -3, duration: 0.04 })
        .to(arrayArrowPaths, { y: 3, duration: 0.04 })
        .to(arrayArrowPaths, { y: 0, duration: 0.04 })

        .to(
          arrayArrowPaths,
          {
            duration: 0.1,
            morphSVG: "#alt-shape-2",
            ease: "power2.inOut",
          },
          "+=3" // ⏸ espera 3s antes do próximo
        )

        .to(arrayArrowPaths, { y: -3, duration: 0.04 })
        .to(arrayArrowPaths, { y: 3, duration: 0.04 })
        .to(arrayArrowPaths, { y: 0, duration: 0.04 });

      return () => tl.kill();
    },
    { scope: fourthSvgRef }
  );

  return (
    <section
      ref={containerRef}
      className={`min-h-[80dvh] w-full flex flex-col justify-between p-6 sm:p-11 ${ className}`}>
      <div className="flex justify-between w-full">
        <svg
          ref={firstSvgRef}
          width="34"
          height="35"
          id="Camada_1"
          data-name="Camada 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 34 34"
        >
          <polygon
            ref={firstPath2Ref}
            points="21.33 16.83 17.5 16.83 17.5 12.97 16.5 12.97 16.5 16.83 12.68 16.83 12.68 17.83 16.5 17.83 16.5 21.69 17.5 21.69 17.5 17.83 21.33 17.83 21.33 16.83"
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
          />
          <path
            d="M33,10.85V1h-9.77"
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-width="2"
          />
          <path
            d="M10.77,1H1v9.85"
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-width="2"
          />
          <path
            d="M23.23,33.26h9.77v-9.85"
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-width="2"
          />
          <path
            d="M1,23.41v9.85h9.77"
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-width="2"
          />
        </svg>

        <svg
          ref={thirdSvgRef}
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2078_55)">
            <path
              d="M32 0H26.6667L16 10.6667L5.33543 0H0V5.33543L10.6667 16L0 26.6667V32H5.33543L16 21.3354L26.6667 32H32V26.6667L21.3354 16L32 5.33543V0Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_2078_55">
              <rect x="0" y="32" width="32" height="0" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="max-w-6xl lg:max-w-7xl w-full mx-auto">
        <h1
          ref={titleRef}
          className="main-title text-2xl sm:text-5xl leading-tight tracking-wider overflow-hidden"
        >
          Vanessa Byork
        </h1>

        <div className="relative inline-block">
          <h2
            ref={subTitleRef}
            className="text-3xl sm:text-6xl leading-tight tracking-wider  whitespace-normal break-normal"
          >
            Front-end <span className="whietspace-nowrap">Developer</span> 
          </h2>
          <div ref={glitchWrapperRef} className="absolute inset-0 opacity-0">
            <GlitchTitle />
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <svg
          ref={fourthSvgRef}
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2078_59)">
            <path
              d="M31.8958 0.104126H26.5972L15.9999 10.7014L5.40472 0.104126H0.104004V5.40484L10.7013 16L0.104004 26.5973V31.8959H5.40472L15.9999 21.3007L26.5972 31.8959H31.8958V26.5973L21.3006 16L31.8958 5.40484V0.104126Z"
              stroke="white"
              stroke-miterlimit="10"
            />
            <path
              d="M22.4248 11.6765L18.2173 15.884L22.4248 20.0915L26.6323 15.884L22.4248 11.6765Z"
              fill="white"
            />
            <path
              d="M16.3042 5.55551L12.0967 9.763L16.3042 13.9705L20.5117 9.763L16.3042 5.55551Z"
              fill="white"
            />
            <path
              d="M10.1845 11.6746L5.97705 15.8821L10.1845 20.0896L14.392 15.8821L10.1845 11.6746Z"
              fill="white"
            />
            <path
              d="M16.3037 17.7971L12.0962 22.0046L16.3037 26.2121L20.5112 22.0046L16.3037 17.7971Z"
              fill="white"
            />

            {/* alternative svg */}
            <path
              style={{ visibility: "hidden" }}
              id="alt-shape"
              d="M32 0H26.6667L16 10.6667L5.33543 0H0V5.33543L10.6667 16L0 26.6667V32H5.33543L16 21.3354L26.6667 32H32V26.6667L21.3354 16L32 5.33543V0Z"
              fill="white"
            />

            {/* second alt svg*/}
            <path
              style={{ visibility: "hidden" }}
              id="alt-shape-2"
              d="M16.3848 10.7695L22.1543 5H29V13.1543L15.7695 26.3848L3 13.6152V5H10.6152L16.3848 10.7695Z"
              fill="#FF0000"
            />
          </g>
          <defs>
            <clipPath id="clip0_2078_59">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <div
          ref={arrowRef}
          className="w-fit flex-col flex justify-center items-center gap-4"
        >
          <p className="text-text-secondary">Scroll down</p>
          <img
            className="bottom-arrow animate-bounce"
            src={arrowBottom}
            alt="seta para baixo"
          />
        </div>
        <svg
          ref={secondSvgRef}
          width="34"
          height="35"
          id="Camada_1"
          data-name="Camada 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 34 34"
        >
          <polygon
            ref={secondPathRef}
            points="21.33 16.83 17.5 16.83 17.5 12.97 16.5 12.97 16.5 16.83 12.68 16.83 12.68 17.83 16.5 17.83 16.5 21.69 17.5 21.69 17.5 17.83 21.33 17.83 21.33 16.83"
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
          />
          <path
            d="M33,10.85V1h-9.77"
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-width="2"
          />
          <path
            d="M10.77,1H1v9.85"
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-width="2"
          />
          <path
            d="M23.23,33.26h9.77v-9.85"
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-width="2"
          />
          <path
            d="M1,23.41v9.85h9.77"
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-width="2"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
