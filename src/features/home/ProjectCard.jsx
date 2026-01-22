const ProjectCard = (projectId) => {
  return (
    <div className="bg-surface col-span-4 rounded-sm border-[.4px] border-border">
      <div className=""> Card img</div>
      <h3 className="text-2xl"> Card title</h3>
      <div id="container-pill" className="">
        {tags.map( tag => (
          
        ))
        }
      </div>

      <button>Acessar</button>
    </div>
  );
};

export default ProjectCard;

// TO-DO :
// - Implementar GUID aleatório nos projetos