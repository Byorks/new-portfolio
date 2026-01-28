const CyberButton = ({
  label = "Upgrade",
  shortcut = "U",
  onClick,
  className = "",
  borderColor = "var(--accent)", // Cor customizável
  borderWidth = "1px", // Espessura customizável
  buttonColor = "bg-primary/90"
}) => {
  const glitchVars = {
    "--shimmy-distance": "5",
    "--clip-one":
      "polygon(0 2%, 100% 2%, 100% 95%, 95% 95%, 95% 90%, 85% 90%, 85% 95%, 8% 95%, 0 70%)",
    "--clip-two":
      "polygon(0 78%, 100% 78%, 100% 100%, 95% 100%, 95% 90%, 85% 90%, 85% 100%, 8% 100%, 0 78%)",
    "--clip-three":
      "polygon(0 44%, 100% 44%, 100% 54%, 95% 54%, 95% 54%, 85% 54%, 85% 54%, 8% 54%, 0 54%)",
    "--clip-four":
      "polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0)",
    "--clip-five":
      "polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0)",
    "--clip-six":
      "polygon(0 40%, 100% 40%, 100% 85%, 95% 85%, 95% 85%, 85% 85%, 85% 85%, 8% 85%, 0 70%)",
    "--clip-seven":
      "polygon(0 63%, 100% 63%, 100% 80%, 95% 80%, 95% 80%, 85% 80%, 85% 80%, 8% 80%, 0 70%)",
  };

  const mainClip =
    "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%)";

  return (
    <button
      onClick={onClick}
      className={`group relative px-2 py-2 font-cyber uppercase text-cyber bg-transparent border-0 cursor-pointer w-[140px] flex items-center gap-2 overflow-visible select-none ${className}`}
      style={glitchVars}
    >
      {/* --- CAMADA 1: FUNDO DA BORDA (Preenche tudo com a cor da borda) --- */}
      <span
        className="absolute inset-0 z-0 transition-colors duration-200"
        style={{
          clipPath: mainClip,
          backgroundColor: borderColor,
        }}
      />

      {/* 1. Backdrop Principal */}
      <span
        className={`absolute inset-0 z-0 backdrop-blur-md hover:bg-background group-hover:bg-background transition-colors duration-200 ${buttonColor}`}
        style={{
          clipPath: mainClip,
          inset: borderWidth, // Aqui cria o efeito de borda
        }}
      >
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-cyber after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[200%] after:h-[1px] after:bg-black after:rotate-135" />
      </span>

      {/* 2. Conteúdo Normal */}
      <kbd className="z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background/80 text-[8px] font-bold text-text transition-colors group-hover:text-cyber group-hover:bg-black">
        {shortcut}
      </kbd>
      {/* Hover de texto para branco */}
      <span className="z-10 font-bold tracking-tighter text-background group-hover:text-white">
        {label}
      </span>

      {/* 3. CAMADA GLITCH (Aparece no hover) */}
      {/* Aqui muda o texto do glitch */}
      <div
        className="absolute inset-0 z-20 hidden group-hover:flex items-center gap-2 px-2 py-2 bg-white animate-glitch pointer-events-none shadow-[0_1px_var(--shadow)]"
        aria-hidden="true"
      >
        {/* Backdrop interno do glitch */}
        <span
          className="absolute inset-0 bg-white z-[-1]"
          style={{ clipPath: mainClip }}
        >
          <span className="absolute  bottom-0 right-0 w-3 h-3 bg-cyber after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[200%] after:h-[1px] after:bg-white after:rotate-[135deg]" />
        </span>

        <kbd className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyber text-[8px] font-bold text-black opacity-0">
          {shortcut}
        </kbd>

        {/* Letras separadas para o efeito nth-child do CSS */}
        <span className="glitch-letters flex font-bold tracking-tighter text-dark">
          {label.split("").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </span>
      </div>
    </button>
  );
};

export default CyberButton;
