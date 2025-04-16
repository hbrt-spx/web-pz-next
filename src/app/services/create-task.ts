import { toast } from "react-toastify";
import { IFormTask } from "../types/forms";
import Cookie from "js-cookie";
import { api } from "./api";

export const onSubmitTask = async (data: IFormTask, projectId: string) => {
   
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

      return response
  };
      