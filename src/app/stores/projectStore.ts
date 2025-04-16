import { create } from "zustand";
import Cookie from "js-cookie";
import { api } from "../services/api";

interface Project {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  adminId: string;
}

interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
  setProjects: (projects: Project[]) => void;
  removeProject: (projectId: string) => void;
  getProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  setProjects: (projects) => set({ projects }),

  removeProject: (projectId: string) => {
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== projectId),
    }));
  },

  getProjects: async () => {
    const token = Cookie.get("token");
    if (!token) {
      console.error("Token não encontrado");
      return;
    }
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userId = decodedToken.sub;

    try {
      const response = await api({
        url: `projects/my-projects/${userId}`,
        method: 'GET',
      });

      if (!response) {
        console.log(" resposta do getProjects",response)
        throw new Error(`Erro ao buscar projetos`);
      }

      const data: Project[] = await response
      set({ projects: data });
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  },
}));
