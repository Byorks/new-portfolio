import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
import { gsap, ScrollTrigger } from "../assets/lib/gsap";
import { useRef } from "react";

export default function useFlicker({ ref, options = {} }) {
  const flickerTlRef = useRef(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const tl = gsap.timeline({
        repeat: options.repeat ?? 0, // -1 = infinito, ou defina um número
        paused: true, // Importante: começa pausada para controlar via ScrollTrigger
      });

      // Sua sequência de flicker (pode simplificar com .to() repetido ou stagger se múltiplos)
      tl.to(ref.current, { opacity: 0, duration: 0.2 })
        .to(ref.current, { opacity: 1, duration: 0.02 })
        .to(ref.current, { opacity: 0, duration: 0.4 })
        .to(ref.current, { opacity: 1, duration: 0.02 })
        .to(ref.current, { opacity: 0, duration: 0.2 })
        .to(ref.current, { opacity: 1, duration: 0.02 })
        .to(ref.current, { opacity: 0, duration: 0.4 })
        .to(ref.current, { opacity: 1, duration: 0.02 })
        .to(ref.current, { opacity: 0, duration: 0.01 })
        .to(ref.current, { opacity: 1, duration: 0.02 })
        .to(ref.current, { opacity: 0, duration: 0.01 })
        .to(ref.current, { opacity: 1, duration: 0.02 })
        .to({}, { duration: 0.6 }); // Pausa final

        flickerTlRef.current = tl;
      // Cleanup automático graças ao useGSAP() – não precisa return manual!
    },
    { dependencies: [options] }
  ); // dependencies atualiza se opções mudarem

  return { flickerTl: flickerTlRef.current };
}
