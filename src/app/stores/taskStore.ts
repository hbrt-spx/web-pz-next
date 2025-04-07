import {create} from "zustand";
import Cookie from "js-cookie";
import { api } from "../services/api";
import { use } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskStore {
  tasks: Task[];
  projectId: string | null
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  clearTasks: () => void;
  setProjectId: (projectId: string) => void
  getTask: (projectId: string)=> Promise<void>
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  projectId: null,
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  clearTasks: () => set({ tasks: [] }),
  setProjectId: (projectId: string) => set({projectId}),


  getTask: async (projectId: string) => {
      try {
        const response = await api({
          url: `tasks/project-tasks/${projectId}`,
          method: 'GET',
        });
  
        if (!response) {
          console.log(" resposta do getTasks",response)
          throw new Error(`Erro ao buscar projetos`);
        }
  
        const data: Task[] = await response
        set({ tasks: data });
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    },
}));


