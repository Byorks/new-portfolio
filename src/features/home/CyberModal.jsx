import { gsap, useGSAP } from "../../assets/lib/gsap";
import { createPortal } from "react-dom";
import CyberButton from "./CyberButton";
import { useRef } from "react";

const CyberModal = ({ isOpen, onClose, title, images = ["2323", "222"], children }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const closeBtnRef = useRef(null);
  const closeBtnCrossRef = useRef(null);
  const itemsRef = useRef(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.set(closeBtnCrossRef.current, {
        scale: 0,
        rotation: -120,
        opacity: 0,
        svgOrigin: "21 21",
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

        // Animação de imagens
      // 2. Efeito STAGGER nas imagens
      // Ele procura todos os elementos com a classe .portfolio-item
      tl.fromTo(
        ".portfolio-item",
        { opacity: 0, x: -30, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.1, // <-- O SEGREDO: 0.1s de atraso entre cada imagem
          ease: "power2.out",
        },
        "-=0.2", // Começa um pouco antes da animação anterior terminar
      );
    } else {
      const tl = gsap.timeline();

      tl.to(closeBtnCrossRef.current, {
        scaleY: 0,
        scaleX: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power3.inOut",
        svgOrigin: "21 21", // HardCoded se o tamanho do svg muda, tenho que mudar, ruim
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
        className="relative w-full max-w-7xl overflow-visible bg-cyber p-[1px]" // O p-[1px] é a nossa borda
        style={{ clipPath: "var(--clip-modal)" }}
      >
        {/* Fundo interno do Modal */}
        <div
          className="bg-neutral-950 p-8"
          style={{ clipPath: "var(--clip-modal)" }}
        >
          {/* Cabeçalho */}
          <header className=" mb-8 border-b border-cyber/20 pb-4 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-cyber opacity-50 uppercase tracking-[0.2em]">
                Project Archive
              </p>
              <h2 className="font-cyber text-3xl italic text-cyber pb-4">
                {" "}
                {title || "System Message"}
              </h2>
            </div>
            <div className=" flex flex-col h-full gap-2">
              <button className="flex self-end m" onClick={onClose} ref={closeBtnRef}>
                <svg className="text-cyber cursor-pointer" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path  d="M2 2H41V41H2V2Z" fill="#333248"/>
                    <path  id="close-cross" ref={closeBtnCrossRef} d="M28.5788 15.0783L22.4069 21.2492L28.5788 27.4211L27.1648 28.8351L20.9929 22.6633L14.8327 28.8244L13.4187 27.4094L19.5788 21.2482L13.4196 15.0891L14.8337 13.675L20.9929 19.8342L27.1638 13.6643L28.5788 15.0783Z" fill="currentColor"/>
                    <path d="M42 0V13.2129H40V2H28.7871V0H42Z" fill="currentColor"/>
                    <path d="M13.2129 0V2H2V13.2129H0V0H13.2129Z" fill="currentColor"/>
                    <path d="M42 28.7869V41.9998H28.7871V39.9998H40V28.7869H42Z" fill="currentColor"/>
                    <path d="M2 28.7869V39.9998H13.2129V41.9998H0V28.7869H2Z" fill="currentColor"/>
                </svg>
              </button>
              <span className="text-cyber/30 font-mono text-xs">
                IMG_COUNT: {images.length}
              </span>
            </div>
          </header>

         

          {/* Conteúdo */}
          <div
            ref={contentRef}
            className="font-mono text-cyber/80 leading-relaxed mb-8"
          >
            {children}
          </div>

               {/* GRID DE IMAGENS DINÂMICAS */}
          <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((imgUrl, index) => (
              <div 
                key={index} 
                className="portfolio-item group relative aspect-video cursor-crosshair bg-cyber/10 p-[1px]"
                style={{ clipPath: "var(--clip-img)" }}
              >
                <div className="h-full w-full overflow-hidden bg-black" style={{ clipPath: "var(--clip-img)" }}>
                  <img 
                    src={imgUrl} 
                    alt={`Work ${index}`} 
                    className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:rotate-1"
                  />
                  {/* Overlay decorativo na imagem */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Badge de ID da imagem */}
                <span className="absolute top-2 left-2 bg-cyber px-1 text-[8px] font-bold text-black uppercase">
                  Data_Node_{index + 1}
                </span>
              </div>
            ))}
          </div>

            {/* Ações */}
            {/* Quero colocar um link para github por exeplo, ou até o site se for o caso */}
          <footer className="flex justify-end gap-4 mt-10">
            <CyberButton
              label="Cancel"
              shortcut="ESC"
              onClick={onClose}
              className="scale-90"
              borderColor="rgba(0, 255, 242, 0.3)"
              buttonColor="bg-cyber"
            />
            <CyberButton
              label="Github"
              shortcut="ENTER"
              onClick={() => {
                console.log("Confirmed");
                onClose();
              }}
              className="scale-90"
              buttonColor="bg-cyber"
            />
          </footer>

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
