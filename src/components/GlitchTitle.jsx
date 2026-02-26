import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const roles = [
  "Front-end Developer",
  "Back-end Developer",
  "Web Developer",
  "UI/UX Designer",
];

const GlitchTitle = () => {

  const containerRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useGSAP(
    () => {
      // match media
      // É possível colocarmos o scopo como parâmetro para evitarmos vários refs também serve
      const mm = gsap.matchMedia();

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2,
        delay: 4.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play pause resume pause",
        }
      });

      let index = 0;

      const getNextRole = () => {
        index = (index + 1) % roles.length;
        return roles[index];
      };

      // estado base
      gsap.set([topRef.current, bottomRef.current], {
        position: "absolute",
        left: 0,
        top: 0,
      });

      // Forma longa de se escrever
      // Mobile
      // mm.add("(max-width: 767.98px)", () => {
      //   // 1) pequeno skew / glitch inicial
      //   tl.to([topRef.current, bottomRef.current], {
      //     skewX: 20,
      //     duration: 0.1,
      //     ease: "power4.inOut",
      //   });
      // });

      // // Desktop
      // mm.add("(min-width: 768px)", () => {
      //   // glitch inicial
      //   tl.to([topRef.current, bottomRef.current], {
      //     skewX: 70,
      //     duration: 0.1,
      //     ease: "power4.inOut",
      //   });
      // });

      // Forma de escrever em condicionais
      mm.add(
        {
          // é possível usar operadores lógicos
          isMobile: "(max-width: 767.98px)",
          // isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          // mas reduced motion não quer dizer 0 motion
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          let { isMobile, reducedMotion } = context.conditions;

          // Com condicionais
          tl.to([topRef.current, bottomRef.current], {
            skewX: reducedMotion ? 5 : isMobile ? 20 : 70,
            duration: 0.1,
          });
        },
      );

      tl.to([topRef.current, bottomRef.current], {
        skewX: 0,
        duration: 0.04,
        ease: "power4.inOut",
      })
        .to([topRef.current, bottomRef.current], { opacity: 0, duration: 0.04 })
        .to([topRef.current, bottomRef.current], { opacity: 1, duration: 0.04 })
        .to([topRef.current, bottomRef.current], { x: -20, duration: 0.04 })
        .to([topRef.current, bottomRef.current], { x: 0, duration: 0.04 })

        // 2) split horizontal
        .to(
          topRef.current,
          { x: -15, duration: 0.002, ease: "power4.inOut" },
          "split",
        )
        .to(bottomRef.current, { x: 15, duration: 0.002, ease: "power4.inOut" })

        // 3) adiciona redShadow
        .call(
          () => {
            topRef.current?.classList.add("redShadow");
            bottomRef.current?.classList.add("redShadow");
          },
          null,
          "split",
        )

        // 4) troca texto no meio
        .call(
          () => {
            const next = getNextRole();
            topRef.current.textContent = next;
            bottomRef.current.textContent = next;
          },
          null,
          "split+=0.05",
        )

        // 5) pequeno scale
        .to(containerRef.current, { scale: 1.1, duration: 0.02 }, "split+=0.05")
        .to(containerRef.current, { scale: 1, duration: 0.02 })

        // 6) troca red → green
        .call(
          () => {
            topRef.current?.classList.remove("redShadow");
            bottomRef.current?.classList.remove("redShadow");
            topRef.current?.classList.add("greenShadow");
            bottomRef.current?.classList.add("greenShadow");
          },
          null,
          "split+=0.12",
        )

        // 7) remove greenShadow
        .call(
          () => {
            topRef.current?.classList.remove("greenShadow");
            bottomRef.current?.classList.remove("greenShadow");
          },
          null,
          "split+=0.2",
        )

        // 7) volta posições
        .to(topRef.current, {
          x: 0,
          duration: 0.2,
          ease: "power4.inOut",
        })
        .to(bottomRef.current, {
          x: 0,
          duration: 0.2,
          ease: "power4.inOut",
        });

      return () => {
        tl.revert();
        mm.revert();
      };
    },
    { scope: containerRef },
  );
  return (
    <div
      id="txt"
      ref={containerRef}
      className=" mx-auto w-full h-auto relative"
    >
      <h2
        ref={topRef}
        className="glitch clip-top text-white text-3xl sm:text-6xl leading-tight tracking-wider"
      >
        {roles[0]}
      </h2>

      <h2
        ref={bottomRef}
        className="glitch clip-bottom text-white text-3xl sm:text-6xl leading-tight tracking-wider"
      >
        {roles[0]}
      </h2>
    </div>
  );
};

export default GlitchTitle;
