import { useFetch } from "../useFetch";
import { PROJECTS_URL } from "../../services/projectService";
import { db } from "../../config/firebase";

export const useProjects = () => {
  const { data, loading, error } = useFetch(db, 'projects');

  return { 
    projects: data,
    loading, 
    error
  }
};


export function useProject(projectId) {
  const { data: projects, loading, error } = useProjects();
  
  const project = projects?.find(p => p.id === projectId);
  
  return {
    project,
    loading,
    error
  };
}