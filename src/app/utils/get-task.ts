import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { useTaskStore } from "../stores/taskStore";

export const getTask = async (projectId: string) => {
   
    try { 
      const token = Cookie.get("token");
      if (!token) {
        toast.error("Token não encontrado");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks?projectId=${projectId}`,
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
          toast.error("Erro ao criar o tarefa. Tente novamente.");
        }
        return;
      }

      const responseData = await response.json();
      if (responseData) {
        useTaskStore.getState().setTasks(responseData)
        toast.success("Tarefa criado com sucesso!");
        //Criar um store pra trazer tarefas
      }
    } catch (error) {
      console.error("Erro ao criar o Tarefa:", error);
      toast.error("Erro ao criar o Tarefa. Tente novamente.");
    }
  };
      