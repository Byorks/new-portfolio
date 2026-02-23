import { useState } from "react";
import CyberButton from "./CyberButton";
import CyberModal from "./CyberModal";

const ProjectCard = ({ project }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="bg-surface col-span-4 border-[.4px] border-border">
      <div className="w-full aspect-16/8 bg-neutral-600  ">
        <img
          className="w-full h-full object-cover "
          src={project.cover.url}
          alt={project.cover.alt}
        />
      </div>
      <div className="p-4 flex flex-col gap-6">
        <h3 className="text-2xl">{project.title}</h3>
        <div className="w-full">
          <p>{project.description.card_description}</p>
        </div>
        <div id="container-pill" className="flex gap-3 flex-wrap">
          {project &&
            project.tags.map((tag) => (
              <div className="px-2 py-1 bg-background border border-text text-nowrap">
                {tag}
              </div>
            ))}
        </div>

        <CyberButton
          label="Acessar"
          shortcut="⮞"
          borderColor="var(--color-border)"
          onClick={() => setModalOpen(true)}
          className="self-end"
        />
        {/* <button className="bg-primary border border-text py-1 w-3/4 self-end font-medium text-neutral-900 not-dark:text-neutral-100">
          Acessar
        </button> */}
      </div>

      {modalOpen && (
        <CyberModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={project.title}
          images={project.images}
          githubLink={project.github}
          link={project.link}
        >
          {/* <p>Você está prestes a entrar na rede neural protegida.</p>
        <p className="mt-2 text-amber-400">
          Aviso: Rastreamento de IP ativado pelo ICE da Militech.
        </p> */}

          <section>
            <div className="w-full py-2">
              <p>{project.description.resume}</p>
            </div>

            {project.description.objectives && (
              <div className="py-2">
                <h4 className="text-2xl">Objetivos</h4>
                <div className="w-full">
                  <p> {project.description.objectives}</p></div>
              </div>
            )}

            {project.description.challenges && (
              <div className="py-2">
                <h4 className="text-2xl">Desafios</h4>
                <div className="w-full"><p>{project.description.challenges}
                  </p></div>
              </div>
            )}
          
          </section>
        </CyberModal>
      )}
    </div>
  );
};

export default ProjectCard;

// TO-DO :
// - Implementar GUID aleatório nos projetos
// - Ao dar hover no card, tocar um vídeo da imagem
