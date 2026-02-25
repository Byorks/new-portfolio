import { gsap, useGSAP } from "../lib/gsap";
import { useRef } from "react";

const roles = [
  "Front-end Developer",
  "Back-end Developer",
  "Web Developer",
  "UI/UX Designer",
];

const GlitchTitle = ({ ref = null }) => {
  const containerRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2,
        delay: 6,
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

      // 1) pequeno skew / glitch inicial
      tl.to([topRef.current, bottomRef.current], {
        skewX: 70,
        duration: 0.1,
        ease: "power4.inOut",
      })
        .to([topRef.current, bottomRef.current], {
          skewX: 0,
          duration: 0.04,
          ease: "power4.inOut",
        })
        .to([topRef.current, bottomRef.current], { opacity: 0, duration: 0.04 })
        .to([topRef.current, bottomRef.current], { opacity: 1, duration: 0.04 })
        .to([topRef.current, bottomRef.current], { x: -20, duration: 0.04 })
        .to([topRef.current, bottomRef.current], { x: 0, duration: 0.04 })

        // 2) split horizontal
        .add("split")
        .to(
          topRef.current,
          { x: -15, duration: 0.002, ease: "power4.inOut" },
          "split",
        )
        .to(
          bottomRef.current,
          { x: 15, duration: 0.002, ease: "power4.inOut" },
          "split",
        )

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
        })

        // 8) scaleY glitch final
        .to([topRef.current, bottomRef.current], {
          scaleY: 1.1,
          duration: 0.02,
          ease: "power4.inOut",
        })
        .to([topRef.current, bottomRef.current], {
          scaleY: 1,
          duration: 0.04,
          ease: "power4.inOut",
        });

      return () => tl.kill();
    },
    { scope: containerRef },
  );
  return (
    <div
      id="txt"
      ref={containerRef}
      className="
        mx-auto
        w-full h-auto relative"
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
