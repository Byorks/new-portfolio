const CyberSquareButton = ({
  link = "",
  icon = "V",
  borderColor = "bg-contrast",
  border = "2px",
  backgroundColor = "bg-surface",
  detail = true,
  detailColor = "bg-contrast",
}) => {
  return (
    <a target="_blank" href={link}>
      <button className="group relative p-1 flex items-center justify-center cursor-pointer">
        {/* 1. Borda Externa (Contorno fino) */}
        <div
          className={`relative clip-icon w-16 h-16 ${borderColor} flex items-center justify-center transition-colors group-hover:bg-primary`}
        >
          {/* 2. O "Gap" e o Fundo Interno (Cor azulada escura do Behance) */}
          <div
            className={`clip-icon w-[calc(100%-${border})] h-[calc(100%-${border})] ${backgroundColor} group-hover:bg-midnightviolet-950-main flex items-center justify-center`}
          >
            {/* 3. O Logo / Texto */}
            <span className="text-white text-3xl font-bold tracking-tighter">
              {icon}
            </span>
            {/* Detalhe no topo do ícone */}
            {detail && (
              <>
                <span
                  className={`absolute top-0 right-0 w-2.5 h-1 ${detailColor}`}
                ></span>
                <span
                  className={`absolute top-0 right-0 w-1 h-2.5 ${detailColor}`}
                ></span>
              </>
            )}
          </div>
        </div>
      </button>
    </a>
  );
};

export default CyberSquareButton;
