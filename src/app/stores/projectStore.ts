import Cookie from "js-cookie";
import { create } from "zustand";

interface Project {
  id: string;
  name: string;
  description: string;
  criadorId: string;
  adminId: string;
}

interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
  setProjects: (projects: Project[]) => void;
  fetchProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  addProject: (project: Project) =>
    set((state: ProjectStore) => ({ projects: [...state.projects, project] })),
  setProjects: (projects: Project[]) => set({ projects }),

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
      
      if (data && data.length > 0) {
        set({ projects: data });
        console.log("Projetos recebidos:", data);
      } else {
        console.error("Nenhum projeto encontrado ou resposta vazia");
      }
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  },
}));
