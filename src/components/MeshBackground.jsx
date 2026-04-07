import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";
import { useRef } from "react";

const SECTION_OPACITIES = {
  "#hero-section": 0.99,
  "#technologies-section": 0.4,
  "#projects-section": 0.75,
  "#contact-section": 0.55,
  "#about-section": 0.8,
};

const MeshBackground = () => {
  const meshRef = useRef(null);
  const blob0Ref = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);

  useGSAP(() => {
    // --- Animação idle: cada blob se move levemente em loop ---
    const idleAnims = [
      gsap.to(blob0Ref.current, {
        x: "20vw",
        y: "15vh",
        scale: 1.2,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }),
      gsap.to(blob1Ref.current, {
        x: "20vw",
        y: "15vh",
        scale: 1.2,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }),
      gsap.to(blob2Ref.current, {
        x: "-25vw",
        y: "20vh",
        scale: 1.1,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2, // Delays diferentes criam o efeito caótico e orgânico
      }),
      gsap.to(blob3Ref.current, {
        x: "15vw",
        y: "-20vh",
        scale: 1.3,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      }),
    ];

    // --- ScrollTrigger: muda opacity conforme seção em view ---
    const triggers = Object.entries(SECTION_OPACITIES)
      .map(([selector, opacity]) => {
        return ScrollTrigger.create({
          trigger: selector,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () =>
            gsap.to(meshRef.current, {
              opacity: opacity,
              duration: 0.8,
              ease: "power2.out",
            }),
          onEnterBack: () =>
            gsap.to(meshRef.current, {
              opacity: opacity,
              duration: 0.8,
              ease: "power2.out",
            }),
        });
      })
      .filter(Boolean);

    return () => {
      idleAnims.forEach((a) => a.kill());
      triggers.forEach((t) => t.kill());
    };
  }, []); // Adicionado dependências;

  return (
    <div
      ref={meshRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.99 }}
    >
      <div
        ref={blob0Ref}
        className="absolute"
        style={{
          width: "30%",
          height: "50%",
          top: "0%",
          left: "0%",
          background: "radial-gradient(circle, #7813F2, transparent 35%)",
          filter: "blur(80px)",
        }}
      />
      <div
        ref={blob1Ref}
        className="absolute"
        style={{
          width: "30%",
          height: "30%",
          top: "-50%",
          left: "0%",
          background: "radial-gradient(circle, #7e22ce, transparent 45%)",
          filter: "blur(80px)",
        }}
      />
      <div
        ref={blob2Ref}
        className="absolute"
        style={{
          width: "90%",
          height: "50%",
          top: "-10%",
          right: "-5%",
          background: "radial-gradient(circle, #3730a3, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        ref={blob3Ref}
        className="absolute"
        style={{
          width: "70vw",
          height: "70vh",
          bottom: "5%",
          left: "30%",
          background: "radial-gradient(circle, #be185d, transparent 90%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
};

export default MeshBackground;
