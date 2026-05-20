import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";
import { useRef } from "react";

// ─── Configuração de opacidade por seção ────────────────────────────────────
const SECTION_OPACITIES = {
  "#hero-section": 0.99,
  "#technologies-section": 0.4,
  "#projects-section": 0.75,
  "#contact-section": 0.55,
  "#about-section": 0.8,
};

// ─── Configuração de blobs (adicione/remova objetos aqui) ────────────────────
const BLOBS = [
  // {
  //   id: "blob-0",
  //   style: {
  //     width: "30%",
  //     height: "50%",
  //     top: "0%",
  //     left: "0%",
  //     background: "radial-gradient(circle, #7813F2, transparent 35%)",
  //   },
  //   blur: 80,
  //   idle: { x: "20vw", y: "15vh", scale: 1.2, duration: 8, delay: 0 },
  //   repelRadius: 260,
  // },
  {
    id: "blob-1",
    style: {
      width: "30%",
      height: "30%",
      top: "-50%",
      left: "0%",
      background: "radial-gradient(circle, #7e22ce, transparent 45%)",
    },
    blur: 80,
    idle: { x: "20vw", y: "15vh", scale: 1.2, duration: 8, delay: 0.5 },
    repelRadius: 220,
  },
  {
    id: "blob-2",
    style: {
      width: "90%",
      height: "50%",
      top: "-10%",
      right: "-5%",
      background: "radial-gradient(circle, #3730a3, transparent 65%)",
    },
    blur: 80,
    idle: { x: "-25vw", y: "20vh", scale: 1.1, duration: 6, delay: 2 },
    repelRadius: 300,
  },
  {
    id: "blob-3",
    style: {
      width: "70vw",
      height: "70vh",
      bottom: "5%",
      left: "30%",
      background: "radial-gradient(circle, #be185d, transparent 90%)",
    },
    blur: 80,
    idle: { x: "15vw", y: "-20vh", scale: 1.3, duration: 4, delay: 1 },
    repelRadius: 350,
  },
  {
    id: "blob-4",
    style: {
      width: "90%",
      height: "220px",
      top: "2%",
      right: "-40%",
      background: "radial-gradient(circle, #AA0DF0, transparent 60%)",
    },
    blur: 40,
    idle: { x: "20vw", y: "-60vh", scale: 1.2, duration: 4, delay: 1 },
    repelRadius: 200,
  },
  {
    id: "blob-5",
    style: {
      width: "100%",
      height: "180px",
      top: "16%",
      right: "-50%",
      background: "radial-gradient(circle, #0D61F7, transparent 60%)",
    },
    blur: 40,
    idle: { x: "20vw", y: "-100%", scale: 1.1, duration: 4, delay: 1 },
    repelRadius: 350,
  },
];

// ─── Blob do cursor ──────────────────────────────────────────────────────────
const CURSOR_BLOB = {
  style: {
    width: "380px",
    height: "380px",
    background: "radial-gradient(circle, #a855f7, transparent 60%)",
    borderRadius: "50%",
    pointerEvents: "none",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 0,
    transform: "translate(-50%, -50%)",
  },
  blur: 70,
  repelForce: 42,
  lerpFactor: 0.11,
};

const MeshBackground = () => {
  const meshRef = useRef(null);
  const wrapperRefs = useRef([]);
  const blobRefs = useRef([]);
  const cursorBlobRef = useRef(null);

  useGSAP(() => {
    // ── Animações idle em loop (agora no Wrapper) ───────────────────────────
    const idleAnims = wrapperRefs.current.map((el, i) => {
      if (!el) return null;
      const { x, y, scale, duration, delay } = BLOBS[i].idle;
      return gsap.to(el, {
        x,
        y,
        scale,
        duration,
        delay,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    // ── ScrollTrigger: opacidade por seção ─────────────────────────────────
    const triggers = Object.entries(SECTION_OPACITIES).map(
      ([selector, opacity]) =>
        ScrollTrigger.create({
          trigger: selector,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () =>
            gsap.to(meshRef.current, {
              opacity,
              duration: 0.8,
              ease: "power2.out",
            }),
          onEnterBack: () =>
            gsap.to(meshRef.current, {
              opacity,
              duration: 0.8,
              ease: "power2.out",
            }),
        }),
    );

    // ── Cursor tracking (Usando quickTo ao invés de lerp manual) ───────────
    const cursorXTo = gsap.quickTo(cursorBlobRef.current, "x", {
      duration: 0.8,
      ease: "power3.out",
    });
    const cursorYTo = gsap.quickTo(cursorBlobRef.current, "y", {
      duration: 0.8,
      ease: "power3.out",
    });

    // Estado do mouse para a repulsão
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Seta a posição inicial do cursor
    cursorXTo(mouseX);
    cursorYTo(mouseY);

    const onPointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorXTo(mouseX);
      cursorYTo(mouseY);
    };

    // ── Cache dos Centros para evitar Layout Thrashing ─────────────────────
    let cachedCenters = [];
    const updateCenters = () => {
      cachedCenters = wrapperRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        // Pega o BoundingRect e subtrai o transform atual para achar a origem real
        const r = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const matrix = new DOMMatrixReadOnly(style.transform);

        return {
          x: r.left - matrix.e + r.width / 2,
          y: r.top - matrix.f + r.height / 2,
        };
      });
    };

    // Calcula os centros iniciais e atualiza no resize
    updateCenters();
    window.addEventListener("resize", updateCenters);

    // ── Repulsão ───────────────────────────────────────────────────────────
    const offsets = BLOBS.map(() => ({ x: 0, y: 0 }));

    // quickSetters agora agem no FILHO, sem brigar com o GSAP do PAI
    const blobSetX = blobRefs.current.map((el) =>
      el ? gsap.quickSetter(el, "x", "px") : null,
    );
    const blobSetY = blobRefs.current.map((el) =>
      el ? gsap.quickSetter(el, "y", "px") : null,
    );

    const tick = () => {
      blobRefs.current.forEach((el, i) => {
        if (!el || !cachedCenters[i]) return;

        // Pega a posição animada do pai para saber onde o blob realmente está
        const wrapper = wrapperRefs.current[i];
        const idleX = gsap.getProperty(wrapper, "x");
        const idleY = gsap.getProperty(wrapper, "y");

        // Centro atual do blob = centro original + animação do pai
        const blobCX = cachedCenters[i].x + Number(idleX);
        const blobCY = cachedCenters[i].y + Number(idleY);

        // Usamos a posição crua do mouse para a repulsão ser imediata
        // (ou poderíamos ler gsap.getProperty(cursorBlob, 'x') se quiséssemos ler o cursor atrasado)
        const dx = blobCX - mouseX;
        const dy = blobCY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const { repelRadius } = BLOBS[i];

        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * CURSOR_BLOB.repelForce;
          offsets[i].x += (dx / dist) * force;
          offsets[i].y += (dy / dist) * force;
        }

        // Atrito elástico (volta ao 0,0 do filho)
        offsets[i].x *= 0.88;
        offsets[i].y *= 0.88;

        // Aplica direto, sem precisar somar com o Idle!
        blobSetX[i](offsets[i].x);
        blobSetY[i](offsets[i].y);
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    gsap.ticker.add(tick);

    return () => {
      idleAnims.forEach((a) => a?.kill());
      triggers.forEach((t) => t.kill());
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", updateCenters);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      {/* Cursor blob — fora do container fixed para não herdar opacity */}
      <div
        ref={cursorBlobRef}
        style={{
          ...CURSOR_BLOB.style,
          filter: `blur(${CURSOR_BLOB.blur}px)`,
          willChange: "transform",
          pointerEvents: "none",
          position: "fixed",
        }}
      />

      {/* Container das blobs de fundo */}
      <div
        ref={meshRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.99 }}
      >
        {BLOBS.map((blob, i) => (
          <div
            key={blob.id}
            ref={(el) => (wrapperRefs.current[i] = el)}
            className="absolute blob-idle-wrapper"
            style={{
              ...blob.style,
              background: "none", // Background vai pro filho
            }}
          >
            <div
              ref={(el) => (blobRefs.current[i] = el)}
              className="w-full h-full absolute top-0 left-0"
              style={{
                background: blob.style.background,
                filter: `blur(${blob.blur}px)`,
                willChange: "transform",
                borderRadius: blob.style.borderRadius,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MeshBackground;
