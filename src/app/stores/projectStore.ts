import { create } from "zustand";
import Cookie from "js-cookie";

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
  fetchProjects: () => Promise<void>;
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

  fetchProjects: async () => {
    const token = Cookie.get("token");
    if (!token) {
      console.error("Token não encontrado");
      return;
    }
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userId = decodedToken.sub;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/user-projects/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao buscar projetos: ${response.statusText}`);
      }

      const data: Project[] = await response.json();
      set({ projects: data });
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  },
}));
