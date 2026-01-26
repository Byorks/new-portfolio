import { useState } from "react";
import { getProjects } from "../../services/projectService";
import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import CyberButton from "./CyberButton";

const ProjectCard = ({ project }) => {
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
        shortcut="↵" 
        onClick={() => console.log('Ação confirmada!')} 
      />
        <button className="bg-primary border border-text py-1 w-3/4 self-end font-medium text-neutral-900 not-dark:text-neutral-100">
          Acessar
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

// TO-DO :
// - Implementar GUID aleatório nos projetos
