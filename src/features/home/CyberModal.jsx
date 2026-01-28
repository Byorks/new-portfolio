import { gsap, useGSAP } from "../../assets/lib/gsap";
import { createPortal } from "react-dom";
import CyberButton from "./CyberButton";
import { useRef } from "react";

const CyberModal = ({ isOpen, onClose, title, children }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const closeBtnRef = useRef(null);
  const closeBtnCrossRef = useRef(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.set(closeBtnCrossRef.current, {
        scale: 0,
        rotation: -120,
        opacity: 0,
        svgOrigin: "38.5 38.5",
      });

      // Timeline de Entrada
      const tl = gsap.timeline();

      // 1. Aparece o fundo borrado
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        display: "flex",
      });

      // 2. Efeito de Flicker (cintilação) no Modal
      tl.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, x: -20 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.4,
          ease: "power3.out",
        },
      );

      tl.to(closeBtnCrossRef.current, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      });

      // 3. Anima o conteúdo de dentro (texto surgindo)
      tl.from(
        contentRef.current,
        {
          opacity: 0,
          y: 10,
          duration: 0.2,
        },
        "-=0.1",
      );
    } else {
      const tl = gsap.timeline();

      tl.to(closeBtnCrossRef.current, {
        scaleY: 0,
        scaleX: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power3.inOut",
        svgOrigin: "38.5 38.5",
      });

      // Animação de Saída
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        display: "none",
      });

      return () => tl.kill();
    }
  }, [isOpen]);

  if (!isOpen && !overlayRef.current) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4 opacity-0"
    >
      {/* Estrutura do Modal com Borda */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg overflow-visible bg-cyber p-[1px]" // O p-[1px] é a nossa borda
        style={{ clipPath: "var(--clip-modal)" }}
      >
        {/* Fundo interno do Modal */}
        <div
          className="bg-neutral-950 p-8"
          style={{ clipPath: "var(--clip-modal)" }}
        >
          {/* Cabeçalho */}
          <div className="mb-6 border-b border-cyber/30 pb-4 flex justify-between items-center">
            <h2 className="font-cyber text-2xl tracking-tighter text-cyber italic uppercase">
              {title || "System Message"}
            </h2>
            {/* <svg ref={closeBtnRef} onClick={onClose} className="text-cyber cursor-pointer" width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="19.5" y="19.5" width="39" height="39" fill="#333248"/>
                <path d="M45.3716 31.8716L31.6259 45.6172" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M31.6265 31.8826L45.3721 45.6282" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M58.5002 30.7131V18.5H46.2871" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M30.7131 18.5H18.5V30.7131" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M46.2871 58.5H58.5002V46.2869" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M18.5 46.2869V58.5H30.7131" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>
            </svg> */}
            <svg
              ref={closeBtnRef}
              onClick={onClose}
              className="text-cyber cursor-pointer"
              width="78"
              height="78"
              viewBox="0 0 78 78"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="19.5" y="19.5" width="39" height="39" fill="#333248" />
              <path
                id="close-cross"
                ref={closeBtnCrossRef}
                d="M46.0786 32.5784L39.9067 38.7493L46.0786 44.9211L44.6645 46.3352L38.4927 40.1633L32.3325 46.3245L30.9185 44.9094L37.0786 38.7483L30.9194 32.5891L32.3335 31.175L38.4927 37.3342L44.6636 31.1643L46.0786 32.5784Z"
                fill="currentColor"
              />
              <path
                d="M58.5002 30.7131V18.5H46.2871"
                stroke="currentColor"
                stroke-width="2"
                stroke-miterlimit="10"
              />
              <path
                d="M30.7131 18.5H18.5V30.7131"
                stroke="currentColor"
                stroke-width="2"
                stroke-miterlimit="10"
              />
              <path
                d="M46.2871 58.5H58.5002V46.2869"
                stroke="currentColor"
                stroke-width="2"
                stroke-miterlimit="10"
              />
              <path
                d="M18.5 46.2869V58.5H30.7131"
                stroke="currentColor"
                stroke-width="2"
                stroke-miterlimit="10"
              />
            </svg>
          </div>

          {/* Conteúdo */}
          <div
            ref={contentRef}
            className="font-mono text-cyber/80 leading-relaxed mb-8"
          >
            {children}
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-4">
            <CyberButton
              label="Cancel"
              shortcut="ESC"
              onClick={onClose}
              className="scale-90"
              borderColor="rgba(0, 255, 242, 0.3)"
            />
            <CyberButton
              label="Confirm"
              shortcut="ENTER"
              onClick={() => {
                console.log("Confirmed");
                onClose();
              }}
              className="scale-90"
            />
          </div>

          {/* Detalhe estético: ID do terminal no canto */}
          <span className="absolute top-2 right-4 font-mono text-[8px] text-cyber/40">
            MODAL_VER: 4.1.GSAP
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
};
export default CyberModal;
