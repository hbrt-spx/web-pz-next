import { toast } from "react-toastify";
import { IFormTask } from "../types/forms";
import Cookie from "js-cookie";
import { api } from "../services/api";

export const onSubmitTask = async (data: IFormTask, projectId: string) => {
   
    try { 
      const token = Cookie.get("token");
      if (!token) {
        toast.error("Token não encontrado");
        return;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.sub;  

      const taskData = {
        title: data.title,
        description: data.description,
        userId: userId,
        projectId: projectId,
        status: data.status || "Pendente"
      };

      const response = await api({
        url: 'tasks',
        method: 'POST',
        body: taskData
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message) {
          toast.error(errorData.message);
        } else {
          toast.error("Erro ao criar o tarefa. Tente novamente.");
        }
        return;
      }

      const responseData = await response.json();
      if (responseData) {
        toast.success("Projeto criado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar o projeto:", error);
      toast.error("Erro ao criar o projeto. Tente novamente.");
    }
  };
      