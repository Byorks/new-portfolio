import { useRef } from "react";
import { useGSAP, gsap } from "../../../../lib/gsap";
import scrambleTech from "../../../../animations/scrambleTech";
import ProjectCard from "../../../../components/ProjectCard";
import { useProjects } from "../../../../hooks/services/useProjects";

const ProjectsSection = () => {
  const { projects, loading, error } = useProjects();
  console.log(projects);

  const containerRef = useRef();
  const titleRef = useRef();
  // const svgDivRef = useRef();
  const projectCards = useRef();
  const lineRef = useRef();
  const verticalRef = useRef();

  // Animações
  useGSAP(() => {
    // paths da div
    // const divPaths = svgDivRef.current.querySelectorAll("line");
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
    gsap.set([titleRef.current, projectCards.current], {
      opacity: 0,
    });

    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 1,
      ease: "power2.out",
    }).to(
      verticalRef.current,
      {
        scaleY: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "<",
    );

    scrambleTech(tl, titleRef.current, "Projetos");

    tl.to(projectCards.current, {
      opacity: 1,
      duration: 0.5,
    });
  });

  return (
    <section
      ref={containerRef}
      className="min-h-[50dvh] w-full flex items-center "
    >
      <div className="max-w-6xl lg:max-w-7xl w-full h-full mx-auto flex flex-col">
        <div className="w-full relative px-6 sm:px-8 my-6 md:my-11">
          {/* Linha horizontal */}
          <div ref={lineRef} className="h-px bg-white origin-left scale-x-0" />

          {/* Linha vertical */}
          <div
            ref={verticalRef}
            className="absolute  left-15 -top-6 h-12 w-px bg-white origin-top scale-y-0"
          />
        </div>
        <h2 ref={titleRef} className="title-h2 text-center"></h2>

        <div
          ref={projectCards}
          className="grid md:grid-cols-12 gap-6 py-12 px-6 sm:px-8"
        >
          {loading ? (
            <p>Carregando...</p>
          ) : projects && projects.length > 0 ? (
            // substituir por map para pegar todos os projetos
            projects.map((p) => <ProjectCard key={p.id} project={p} />)
          ) : (
            (() => console.log(error), (<p>Nenhum projeto encontrado.</p>))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
