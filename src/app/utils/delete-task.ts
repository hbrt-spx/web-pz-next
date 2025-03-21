import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { useTaskStore } from "../stores/taskStore";

export const deleteTask = async (taskId: string) => {
   
    try { 
      const token = Cookie.get("token");
      if (!token) {
        toast.error("Token não encontrado");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
        {
          method: "DELETE",
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
          toast.error("Erro ao deletar a tarefa. Tente novamente.");
        }
        return;
      }

      const responseData = await response.json();
      if (responseData) {
        useTaskStore.getState().setTasks(responseData)
        toast.success("Tarefa excluida com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao deletar a Tarefa:", error);
      toast.error("Erro ao deletar o Tarefa. Tente novamente.");
    }
  };
      