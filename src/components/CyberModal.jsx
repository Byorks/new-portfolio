import { gsap, useGSAP } from "../lib/gsap";
import { createPortal } from "react-dom";
import CyberButton from "./CyberButton";
import { useEffect, useRef } from "react";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import GalleryCarousel from "./GalleryCarousel";
import useEmblaCarousel from "embla-carousel-react"; // Hook principal
import Autoplay from "embla-carousel-autoplay"; // Opcional para auto-slide

const CyberModal = ({
  isOpen,
  onClose,
  title,
  images = [
    { img: "2323", alt: "blabla" },
    { img: "2223", alt: "blabla" },
  ],
  link = "",
  githubLink = "",
  children,
}) => {
  // Referências
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const closeBtnRef = useRef(null);
  const closeBtnCrossRef = useRef(null);
  const itemsRef = useRef(null);

  // Icons
  const logoGithub = (
    <svg
      className="text-contrast"
      width="32"
      height="32"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M56.7937 84.9688C44.4187 83.4688 35.7 74.5625 35.7 63.0313C35.7 58.3438 37.3875 53.2813 40.2 49.9063C38.9812 46.8125 39.1687 40.25 40.575 37.5313C44.325 37.0625 49.3875 39.0313 52.3875 41.75C55.95 40.625 59.7 40.0625 64.2937 40.0625C68.8875 40.0625 72.6375 40.625 76.0125 41.6563C78.9187 39.0313 84.075 37.0625 87.825 37.5313C89.1375 40.0625 89.325 46.625 88.1062 49.8125C91.1062 53.375 92.7 58.1563 92.7 63.0313C92.7 74.5625 83.9812 83.2813 71.4187 84.875C74.6062 86.9375 76.7625 91.4375 76.7625 96.5938L76.7625 106.344C76.7625 109.156 79.1062 110.75 81.9187 109.625C98.8875 103.156 112.2 86.1875 112.2 65.1875C112.2 38.6563 90.6375 17 64.1062 17C37.575 17 16.2 38.6562 16.2 65.1875C16.2 86 29.4187 103.25 47.2312 109.719C49.7625 110.656 52.2 108.969 52.2 106.438L52.2 98.9375C50.8875 99.5 49.2 99.875 47.7 99.875C41.5125 99.875 37.8562 96.5 35.2312 90.2188C34.2 87.6875 33.075 86.1875 30.9187 85.9063C29.7937 85.8125 29.4187 85.3438 29.4187 84.7813C29.4187 83.6563 31.2937 82.8125 33.1687 82.8125C35.8875 82.8125 38.2312 84.5 40.6687 87.9688C42.5437 90.6875 44.5125 91.9063 46.8562 91.9063C49.2 91.9063 50.7 91.0625 52.8562 88.9063C54.45 87.3125 55.6687 85.9063 56.7937 84.9688Z"
        fill="currentColor"
      />
    </svg>
  );
  const externalIcon = (
    <LiaExternalLinkAltSolid className="text-contrast" size={"2em"} />
  );

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
          stagger: 0.3, // <-- O SEGREDO: 0.1s de atraso entre cada imagem
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

  // Fecha com ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  // Evita scroll no body quando modal aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-100 justify-center bg-black/30 backdrop-blur-sm p-4 pt-8 md:pt-16 opacity-0 overflow-hidden"
    >
      {/* Estrutura do Modal com Borda */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative h-fit w-full max-w-6xl xl:max-w-7xl"
      >
        {/* Lateral estilizada */}
        <div className="absolute left-1/1 top-8 w-2 h-2/5 bg-cyber/50 clip-modal-lateral pointer-events-none"></div>

        <div
          className="cyber-modal relative overflow-visible bg-cyber p-px " // O p-[1px] ou p-px" é a nossa borda
        >
          {/* Parte interna do modal*/}
          {/* colocar um autora max aqui*/}
          <div className="h-full max-h-[95dvh] md:max-h-[80dvh] cyber-modal bg-dark p-8 flex flex-col">
            {/* Cabeçalho */}
            <header className="shrink-0 mb-8 border-b border-cyber/20 flex justify-between items-center">
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
                <button
                  className="flex self-end m"
                  onClick={onClose}
                  ref={closeBtnRef}
                >
                  <svg
                    className="text-cyber cursor-pointer"
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 2H41V41H2V2Z" fill="#333248" />
                    <path
                      id="close-cross"
                      ref={closeBtnCrossRef}
                      d="M28.5788 15.0783L22.4069 21.2492L28.5788 27.4211L27.1648 28.8351L20.9929 22.6633L14.8327 28.8244L13.4187 27.4094L19.5788 21.2482L13.4196 15.0891L14.8337 13.675L20.9929 19.8342L27.1638 13.6643L28.5788 15.0783Z"
                      fill="currentColor"
                    />
                    <path
                      d="M42 0V13.2129H40V2H28.7871V0H42Z"
                      fill="currentColor"
                    />
                    <path
                      d="M13.2129 0V2H2V13.2129H0V0H13.2129Z"
                      fill="currentColor"
                    />
                    <path
                      d="M42 28.7869V41.9998H28.7871V39.9998H40V28.7869H42Z"
                      fill="currentColor"
                    />
                    <path
                      d="M2 28.7869V39.9998H13.2129V41.9998H0V28.7869H2Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <span className="text-cyber/30 font-mono text-xs pb-2">
                  IMG_COUNT: {images.length}
                </span>
              </div>
            </header>

            <div className="flex-1 flex flex-col md:flex-row min-h-0 gap-8 overflow-hidden">
              {/* LADO ESQUERDO: TEXTO (Scrollable) */}
              <div
                ref={contentRef}
                className="flex-1 font-mono text-cyber/80 leading-relaxed overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-cyber"
              >
                <div className="space-y-4">{children}</div>
              </div>

              {images.length > 0 && (
                <div className="w-full md:w-80 lg:w-2/6 shrink-0 flex flex-col border-t md:border-t-0 md:border-l border-cyber pt-6 md:pt-0 md:pl-6">
                  <p className="text-[10px] text-cyber/40 uppercase mb-4 tracking-widest">
                    Visual_Assets
                  </p>

                  <div
                    ref={itemsRef}
                    className="grid grid-cols-2 md:grid-cols-1 gap-4 overflow-y-auto pr-4 scrollbar-none  scrollbar-thin scrollbar-thumb-cyber"
                  >
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="portfolio-item group relative aspect-video max-h-44 cursor-crosshair bg-cyber/30 p-px clip-img"
                      >
                        <div className="h-full w-full bg-black clip-img">
                          <img
                            src={img.url}
                            alt={img.alt}
                            loading="lazy"
                            className="h-full w-full object-cover opacity-80 transition-all ease-out duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:rotate-1"
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
                </div>
              )}
            </div>

            {/* Ações */}
            {/* Quero colocar um link para github por exemplo, ou até o site se for o caso */}
            <footer className="flex justify-end gap-4 mt-10">
              <CyberButton
                label="Cancelar"
                shortcut="ESC"
                onClick={onClose}
                className="scale-95 hidden sm:inline-flex"
                borderColor="rgba(0, 255, 242, 0.3)"
                buttonColor="bg-cyber"
              />
              {link && (
                <a href={link} target="_blank">
                  <CyberButton
                    label="Acessar"
                    icon={externalIcon}
                    className="scale-95"
                    buttonColor="bg-cyber"
                  />
                </a>
              )}
              {githubLink && (
                <a href={githubLink} target="_blank">
                  <CyberButton
                    label="Github"
                    icon={logoGithub}
                    className="scale-95"
                    buttonColor="bg-cyber"
                  />
                </a>
              )}
            </footer>

            {/* Detalhe estético: ID do terminal no canto */}
            <span className="absolute top-2 right-4 font-mono text-[8px] text-cyber/40">
              MODAL_VER: 4.1.GSAP
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
export default CyberModal;

// TO-DO
// Colocar um backdrop blur no modal, acho que vou precisar reestruturar pra fazer isso
// Alterar tamanho de images
// Mais de 3 imagens no mobile está péssimo, ocupando todo o modal.
//  Portanto preciso implementar um carrossel, vai ficar melhor visualmente
