import { useRef } from "react";
import { useGSAP, gsap } from "../../assets/lib/gsap";
import scrambleTech from "../../animations/scrumbleText";
import ProjectCard from "./ProjectCard";
import { useProjects } from "../../hooks/useProjects";

const ProjectsSection = () => {
  const { projects, loading, error } = useProjects();
  console.log(projects);

  const containerRef = useRef();
  const titleRef = useRef();
  const svgDivRef = useRef();
  const projectCards = useRef();

  // Animações
  useGSAP(() => {
    // paths da div
    const divPaths = svgDivRef.current.querySelectorAll("line");
    console.log(divPaths);
    // Configuração da timeline gsap
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "restart pause resume pause",
        markers: true,
      },
    });

    // Colocando a opacidade para 0
    gsap.set([svgDivRef.current, titleRef.current, projectCards.current], {
      opacity: 0,
    });

    tl.to(svgDivRef.current, { opacity: 1, duration: 0.5 });

    // linhas do svg
    tl.from(divPaths, {
      drawSVG: "0%",
      duration: 1,
      ease: "power2.out",
    });

    scrambleTech(tl, titleRef.current, "Projetos");

    tl.to(projectCards.current, {
      opacity: 1,
      duration: 0.5,
    });
  });

  return (
    <section
      ref={containerRef}
      className="min-h-[50dvh] w-full flex items-center"
    >
      <div className="max-w-6xl lg:max-w-7xl w-full h-full mx-auto flex flex-col ">
        <div className="p-6 sm:p-8 flex justify-center">
          <svg
            ref={svgDivRef}
            width="1041"
            height="47"
            viewBox="0 0 1041 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="22.5" x2="1041" y2="22.5" stroke="white" />
            <line
              y1="-0.5"
              x2="47"
              y2="-0.5"
              transform="matrix(4.34194e-08 1 1 -4.40053e-08 32 0)"
              stroke="white"
            />
          </svg>
        </div>

        <h2 ref={titleRef} className="title-h2 text-center"></h2>

        <div ref={projectCards} className="grid md:grid-cols-12 gap-6 py-12 px-6 sm:px-8">
          {loading ? (
            <p>Carregando...</p>
          ) : projects && projects.length > 0 ? (
            // substituir por map para pegar todos os projetos
           projects.map(p => (
            <ProjectCard key={p.id} project={p} />
           ))
          ) : (
            <p>Nenhum projeto encontrado.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
