import { useState } from "react";
import CyberButton from "./CyberButton";
import CyberModal from "./CyberModal";

const ProjectCard = ({ project }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="bg-surface col-span-4 rounded-sm border-[.4px] border-border">
      <div className="min-h-44 bg-neutral-600">Card img</div>
      <div className="p-4 flex flex-col gap-6">
        <h3 className="text-2xl">{project.title}</h3>
        <div id="container-pill" className="flex gap-3 ">
          {project &&
            project.tags.map((tag) => (
              <div className="px-2 py-1 bg-background border border-text">
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

      <CyberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Access Granted"
      >
        <p>Você está prestes a entrar na rede neural protegida.</p>
        <p className="mt-2 text-amber-400">
          Aviso: Rastreamento de IP ativado pelo ICE da Militech.
        </p>
      </CyberModal>
    </div>
  );
};

export default ProjectCard;

// TO-DO :
// - Implementar GUID aleatório nos projetos
// - Ao dar hover no card, tocar um vídeo da imagem
