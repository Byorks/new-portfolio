export const PROJECTS_URL = "/src/projects.json";

// Essa service e essas funções tem uso? No momento estou utilizando apenas on caminho
// para o JSON

export async function getProjects() {
  const response = await fetch(PROJECTS_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar projetos");
  };

  return await response.json();
}

export const getProjectById = async (projectId) => {
  const projects = await getProjects();
  const project = projects.find((p) => p.id === projectId);

  if (!project) throw new Error("Projeto não encontrado");

  return project;
};
