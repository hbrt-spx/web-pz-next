import { api } from "./api";

export const deleteProject = async (id: string): Promise<boolean> => {
try {
  await api({
    url: `projects/${id}`,
    method: 'DELETE',
  });
  
  return true
} catch (error) {
  console.error("Erro ao excluir projeto:", error);
  return false;
}

}