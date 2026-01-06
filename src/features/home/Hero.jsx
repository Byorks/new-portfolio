import { useRef } from "react";
import arrowBottom from "../../assets/image/ui/seta.svg";
import { gsap, ScrollTrigger, SplitText } from "../../assets/lib/gsap";
import useFlicker from "../../hooks/useFlicker";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const containerRef = useRef();
  const titleRef = useRef();
  const subTitleRef = useRef();
  const arrowRef = useRef();

  const { flickerTl } = useFlicker({
    ref: arrowRef,
  });

  // Efeito de aparecer texto
  useGSAP(
    () => {
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
          markers: true,
        },
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

      // 3. Flicker
      // Sua sequência de flicker (pode simplificar com .to() repetido ou stagger se múltiplos)
      tl.to(arrowRef.current, { opacity: 0, duration: 0.2, delay: 0.8 })
        .to(arrowRef.current, { opacity: 1, duration: 0.02 })
        .to(arrowRef.current, { opacity: 0, duration: 0.4 })
        .to(arrowRef.current, { opacity: 1, duration: 0.02 })
        .to(arrowRef.current, { opacity: 0, duration: 0.2 })
        .to(arrowRef.current, { opacity: 1, duration: 0.02 })
        .to(arrowRef.current, { opacity: 0, duration: 0.4 })
        .to(arrowRef.current, { opacity: 1, duration: 0.02 })
        .to(arrowRef.current, { opacity: 0, duration: 0.01 })
        .to(arrowRef.current, { opacity: 1, duration: 0.02 })
        .to(arrowRef.current, { opacity: 0, duration: 0.01 })
        .to(arrowRef.current, { opacity: 1, duration: 0.02 })
        .to({}, { duration: 0.6 }); // Pausa final

      // Cleanup: reverte o split ao desmontar o componente
      return () => {
        titleSplit.revert();
        subTitleSplit.revert();
        tl.kill();
      };
    },

    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="min-h-dvh w-full">
      <div className="max-w-6xl mx-auto">
        <h1
          ref={titleRef}
          className="pb-4 main-title text-2xl sm:text-5xl leading-tight tracking-wider overflow-hidden"
        >
          Vanessa Byork
        </h1>
        <h2
          ref={subTitleRef}
          className="text-3xl sm:text-6xl leading-tight tracking-wider overflow-hidden"
        >
          Desenvolvedora Front-End
        </h2>

        <div className="w-full flex justify-center">
          <img
            ref={arrowRef}
            className="bottom-arrow"
            src={arrowBottom}
            alt="seta para baixo"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
