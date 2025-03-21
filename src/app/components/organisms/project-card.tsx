"use client"
import { toast } from "react-toastify";
import { deleteProject } from "../../utils/delete-project";
import { Button } from "../atoms/button";
import FormBase from "./form-base";
import FormTask from "./form-task";
import { useEffect, useState } from "react";
import { onSubmitTask } from "../../utils/create-task";
import { getTask } from "../../utils/get-task";
import { useTaskStore } from "../../stores/taskStore";
import { deleteTask } from "../../utils/delete-task";
import { Dialog, DialogContent, DialogTrigger } from "../molecules/dialog";

interface Project {
  id: string;
  name: string;
  description: string;
}

interface ProjectCardProps {
  project: Project;
  onDelete: (projectId: string) => void;
}

const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { tasks, addTask, clearTasks } = useTaskStore();

  useEffect(() => {
    getTask(project.id);
    console.log("Esta rodando?")
  }, [project.id]);

  const handleSubmit = (data: any) => {
    console.log("Dados do formulário:", data);
  };

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      const isDeleted = await deleteProject(project.id);
      if (isDeleted) {
        onDelete(project.id);
        toast.success("Projeto excluído com sucesso!");
      } else {
        toast.error("Erro ao excluir o projeto.");
      }
    } catch (error) {
      console.error("Erro ao excluir o projeto:", error);
      toast.error("Ocorreu um erro ao tentar excluir o projeto.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
  try {
    await deleteTask(taskId);    
    clearTasks()
    getTask(project.id);
  } catch (error) {
    console.error("Erro ao excluir tarefa", error);
    toast.error("Erro ao excluir a tarefa.");
  }
};


  const handleCreateTasks = async (data: any): Promise<void> => {
    console.log("Tarefas criadas:", data.tasks);

    for (const task of data.tasks) {
      await onSubmitTask(task, project.id);
      addTask(task);
    }
  };

  return (
    <div className="w-[300px] bg-gray-100 rounded-lg p-4 shadow-md mb-4">
      <h2 className="text-xl font-bold">{project.name}</h2>
      <p>{project.description}</p>
      <Dialog onOpenChange={(event)=>{
        clearTasks()
        if(event) getTask(project.id)     
      }}>
        <DialogTrigger>
          <Button variant="outline" className="mt-2">
            Ver Detalhes
          </Button>         
        </DialogTrigger>
        <DialogContent>
            <h1>{project.name}</h1>
            <h2>{project.description}</h2>
            <div className="overflow-y-auto max-h-[250px]">
              <FormBase
                onSubmit={handleCreateTasks}
                defaultValues={{ tasks: [{ name: "", description: "" }] }}
              >
                <FormTask />
              </FormBase>
            </div>
            <div className="overflow-y-auto max-h-[400px] ">
              <h1>Tarefas</h1>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div key={task.id} className="task border gap-5">
                    <h3 className="text-lg font-semibold">Titulo: {task.title}</h3>
                    <p className="">Descrição: {task.description}</p>
                    <Button className="bg-red-600" onClick={() => handleDeleteTask(task.id)}>Excluir</Button>
                  </div>
                ))
              ) : (
                <p>Sem tarefas disponíveis</p>
              )}
            </div>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Excluindo..." : "Excluir Projeto"}
            </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectCard;
