import {create} from 'zustand';
import Cookie from 'js-cookie';

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
    const token = Cookie.get('token');
    if (!token) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar projetos');
      }

      const data: Project[] = await response.json();
      set({ projects: data });
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  },
}));
