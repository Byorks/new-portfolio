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
  {
    id: "blob-0",
    style: {
      width: "30%",
      height: "50%",
      top: "0%",
      left: "0%",
      background: "radial-gradient(circle, #7813F2, transparent 35%)",
    },
    blur: 80,
    idle: { x: "20vw", y: "15vh", scale: 1.2, duration: 8, delay: 0 },
    repelRadius: 260,
  },
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
  const blobRefs = useRef([]);
  const cursorBlobRef = useRef(null);

  useGSAP(() => {
    // ── Animações idle em loop ──────────────────────────────────────────────
    const idleAnims = blobRefs.current.map((el, i) => {
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

    // ── Cursor tracking + repulsão ─────────────────────────────────────────
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let smoothX = cursorX;
    let smoothY = cursorY;

    // Offset de repulsão por blob (começa em zero)
    const offsets = BLOBS.map(() => ({ x: 0, y: 0 }));

    // quickSetters para cada blob e para a cursor blob
    const blobSetX = blobRefs.current.map((el) =>
      el ? gsap.quickSetter(el, "x", "px") : null,
    );
    const blobSetY = blobRefs.current.map((el) =>
      el ? gsap.quickSetter(el, "y", "px") : null,
    );

    const cursorSetX = gsap.quickSetter(cursorBlobRef.current, "x", "px");
    const cursorSetY = gsap.quickSetter(cursorBlobRef.current, "y", "px");

    const onPointerMove = (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    };

    const tick = () => {
      // Suaviza movimento da cursor blob
      smoothX += (cursorX - smoothX) * CURSOR_BLOB.lerpFactor;
      smoothY += (cursorY - smoothY) * CURSOR_BLOB.lerpFactor;
      cursorSetX(smoothX);
      cursorSetY(smoothY);

      // Repulsão das blobs ao se aproximar do cursor
      blobRefs.current.forEach((el, i) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const blobCX = rect.left + rect.width / 2;
        const blobCY = rect.top + rect.height / 2;

        const dx = blobCX - smoothX;
        const dy = blobCY - smoothY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const { repelRadius } = BLOBS[i];

        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * CURSOR_BLOB.repelForce;
          offsets[i].x += (dx / dist) * force;
          offsets[i].y += (dy / dist) * force;
        }

        // Retorno elástico suave para posição original
        offsets[i].x *= 0.88;
        offsets[i].y *= 0.88;

        // Aplica o offset em cima do que o GSAP já animou (idle)
        const idleX = gsap.getProperty(el, "x");
        const idleY = gsap.getProperty(el, "y");

        blobSetX[i](Number(idleX) + offsets[i].x);
        blobSetY[i](Number(idleY) + offsets[i].y);
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    gsap.ticker.add(tick);

    return () => {
      idleAnims.forEach((a) => a?.kill());
      triggers.forEach((t) => t.kill());
      window.removeEventListener("pointermove", onPointerMove);
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
            ref={(el) => (blobRefs.current[i] = el)}
            className="absolute"
            style={{
              ...blob.style,
              filter: `blur(${blob.blur}px)`,
              willChange: "transform",
            }}
          />
        ))}
      </div>
    </>
  );
};

export default MeshBackground;
