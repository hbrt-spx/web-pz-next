import { api } from "../services/api";

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    const response = await api({
      url: `projects/${id}`,
      method: 'DELETE',
    });

    return response.ok;
  } catch (error) {
    console.error("Erro ao excluir o projeto:", error);
    return false;
  }
};