import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { useTaskStore } from "../stores/taskStore";
import { api } from "../services/api";

export const deleteTask = async (taskId: string) => {
   
    try { 
      const token = Cookie.get("token");
      if (!token) {
        toast.error("Token não encontrado");
        return;
      }

      const response = await api({
        url: `tasks/${taskId}`,
        method: 'DELETE',
        
      });

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
      