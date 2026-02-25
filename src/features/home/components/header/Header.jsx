import { useState, useRef } from "react";
import { useGSAP, gsap, ScrollTrigger } from "../../../../lib/gsap";

import ScrollToPlugin from "gsap/ScrollToPlugin.js";

gsap.registerPlugin(ScrollToPlugin);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef(null);
  const menuRef = useRef(null);
  const navRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // 1. Scroll Suave
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (isOpen) setIsOpen(false);

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: targetId, offsetY: 80 },
      ease: "power3.inOut",
    });
  };

  useGSAP(
    () => {
      // 2. Header Sticky (Fixar ao sair da tela)
      ScrollTrigger.create({
        start: "top -100",
        onUpdate: (self) => {
          if (self.scroll() > 200) {
            navRef.current.classList.add("fixed-nav");
          } else {
            navRef.current.classList.remove("fixed-nav");
          }
        },
      });

      // 3. Animações do Menu
      if (isOpen) {
        gsap.to(".line-top", {
          rotation: 45,
          y: 6.5, // ajuste fino aqui (experimente 6 a 10)
          transformOrigin: "center center", // muito importante!
          duration: 0.35,
          ease: "power2.out",
        });

        gsap.to(".line-mid", {
          opacity: 0,
          duration: 0.2,
        });

        gsap.to(".line-bot", {
          rotation: -45,
          y: -6.5, // simétrico ao de cima, mas negativo
          transformOrigin: "center center",
          duration: 0.35,
          ease: "power2.out",
        });

        // Revelar Overlay
        gsap.to(menuRef.current, {
          opacity: 1,
          visibility: "visible",
          backdropFilter: "blur(16px)",
          duration: 0.4,
        });

        // Stagger nos itens
        gsap.fromTo(
          ".menu-item",
          { opacity: 0, y: 10, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
          },
        );
      } else {
        gsap.to(".line-top", { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(".line-mid", { opacity: 1, duration: 0.3 });
        gsap.to(".line-bot", { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(menuRef.current, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.3,
        });
      }
    },
    { dependencies: [isOpen], scope: container },
  );

  return (
    <header ref={container} className="relative w-full z-100">
      {/* Barra de Navegação Principal */}
      <nav
        ref={navRef}
        className={`
          relative z-130 transition-colors duration-300 flex justify-end sm:justify-between items-center
          px-6 sm:px-12 py-4 m-4 sm:m-7 rounded-sm border
          ${
            isOpen
              ? "bg-transparent border-transparent backdrop-blur-none" // Esconde o fundo/borda quando aberto
              : "bg-background/50 border-border backdrop-blur-md" // Design original
          }
        `}
      >
        {/* Menu Desktop */}
        <ul className="hidden sm:flex gap-12 text-sm text-foreground/70">
          <li className="hover:text-primary transition-colors">
            <a href="#home" onClick={(e) => handleNavClick(e, "#home")}>
              Página inicial
            </a>
          </li>
          <li className="hover:text-primary transition-colors">
            <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")}>
              Projetos
            </a>
          </li>
          <li className="hover:text-primary transition-colors">
            <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
              Contato
            </a>
          </li>
          <li className="hover:text-primary transition-colors">
            <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>
              Sobre mim
            </a>
          </li>
        </ul>

        {/* Colocar logo aqui */}

        {/* Botão Hambúrguer */}
        <button
          onClick={toggleMenu}
          className="sm:hidden flex flex-col gap-1 p-2 focus:outline-none relative z-140"
        >
          <div className="line-top w-6 h-[2.5px] bg-contrast"></div>
          <div className="line-mid w-6 h-[2.5px] bg-contrast"></div>
          <div className="line-bot w-6 h-[2.5px] bg-contrast"></div>
        </button>
      </nav>

      {/* Menu Mobile Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-background/80 invisible opacity-0 flex items-center justify-center sm:hidden z-[120]"
      >
        <ul className="flex flex-col items-center gap-8 text-3xl text-foreground font-light">
          <li className="menu-item">
            <a href="#home" onClick={(e) => handleNavClick(e, "#home")}>
              Página inicial
            </a>
          </li>
          <li className="menu-item">
            <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")}>
              Projetos
            </a>
          </li>
          <li className="menu-item">
            <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
              Contato
            </a>
          </li>
          <li className="menu-item">
            <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>
              Sobre mim
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
