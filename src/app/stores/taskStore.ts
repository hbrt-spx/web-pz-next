import { create } from "zustand";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskStore {
  tasksByProject: { [projectId: string]: Task[] };
  setTasks: (projectId: string, tasks: Task[]) => void;
  addTask: (projectId: string, task: Task) => void;
  clearTasks: (projectId: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasksByProject: {},
  setTasks: (projectId, tasks) => set((state) => ({
    tasksByProject: {
      ...state.tasksByProject,
      [projectId]: tasks, 
    }
  })),
  addTask: (projectId, task) => set((state) => ({
    tasksByProject: {
      ...state.tasksByProject,
      [projectId]: [...(state.tasksByProject[projectId] || []), task],
    }
  })),
  clearTasks: (projectId) => set((state) => ({
    tasksByProject: {
      ...state.tasksByProject,
      [projectId]: [], 
    }
  })),
}));
