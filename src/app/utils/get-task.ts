import { toast } from "react-toastify";
import Cookie from "js-cookie";


export const getTask = async (projectId: string) => {
  try {
    const token = Cookie.get("token");
    if (!token) {
      toast.error("Token não encontrado");
      return []; 
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/project-tasks/${projectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message) {
        toast.error(errorData.message);
      } else {
        toast.error("Erro ao criar a tarefa. Tente novamente.");
      }
      return [];
    }

    const responseData = await response.json();
    if (responseData) {
      return responseData; 
    } else {
      return []; 
    }
  } catch (error) {
    console.error("Erro ao buscar as tarefas:", error);
    toast.error("Erro ao buscar as tarefas. Tente novamente.");
    return []; 
  }
};
