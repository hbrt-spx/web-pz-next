import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { useTaskStore } from "../stores/taskStore";
import { api } from "./api";

export const deleteTask = async (taskId: string) => {
   
      const token = Cookie.get("token");
      if (!token) {
        toast.error("Token não encontrado");
        return;
      }

      const response = await api({
        url: `tasks/${taskId}`,
        method: 'DELETE',
        
      });

     return response
  };
      