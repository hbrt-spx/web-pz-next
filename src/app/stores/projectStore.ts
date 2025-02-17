import { create } from 'zustand';
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
  if (!token) {
    console.error('Token não encontrado');
    return;
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken.sub;

  console.log('Token decodificado:', decodedToken);
  console.log('User ID extraído do token:', userId);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/user-projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Passando o token no cabeçalho
      },
    });

    // Verifique o status da resposta
    if (!response.ok) {
      console.error('Erro na requisição:', response.status, response.statusText);
      throw new Error('Erro ao buscar projetos');
    }

    // Verifique o corpo da resposta antes de tentar convertê-lo para JSON
    const textResponse = await response.text();  // Obtém a resposta como texto
    console.log('Texto da resposta:', textResponse);

    // Se o texto não for vazio ou indefinido, converta para JSON
    if (textResponse) {
      const data: Project[] = JSON.parse(textResponse);  // Converter manualmente
      set({ projects: data });
      console.log('Projetos recebidos:', data);
    } else {
      console.error('Resposta vazia ou inválida');
    }

  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
  }
},

}));
