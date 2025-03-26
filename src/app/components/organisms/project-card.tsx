import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteProject } from "../../utils/delete-project";
import { Button } from "../atoms/button";
import FormBase from "./form-base";
import FormTask from "./form-task";
import { onSubmitTask } from "../../utils/create-task";
import { getTask } from "../../utils/get-task";
import { useTaskStore } from "../../stores/taskStore";
import { deleteTask } from "../../utils/delete-task";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../molecules/dialog";

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
  const { tasksByProject, addTask, clearTasks, setTasks } = useTaskStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (isDialogOpen) {
      const fetchTasks = async () => {
        const fetchedTasks = await getTask(project.id);
        setTasks(project.id, fetchedTasks); 
      };

      fetchTasks();
    } else {
      clearTasks(project.id); 
    }
  }, [project.id, isDialogOpen, setTasks, clearTasks]);

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
      clearTasks(project.id); 
      const fetchedTasks = await getTask(project.id);
      setTasks(project.id, fetchedTasks); 
    } catch (error) {
      console.error("Erro ao excluir tarefa", error);
      toast.error("Erro ao excluir a tarefa.");
    }
  };

  const handleCreateTasks = async (data: any): Promise<void> => {
    console.log("Tarefas criadas:", data.tasks);

    for (const task of data.tasks) {
      await onSubmitTask(task, project.id);
      addTask(project.id, task); 
    }
  };

  return (
    <div className="w-[300px] bg-gray-100 rounded-lg p-4 shadow-md mb-4">
      <h2 className="text-xl font-bold">{project.name}</h2>
      <p>{project.description}</p>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-2">
            Ver Detalhes
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{project.name}</DialogTitle>
          <h2>{project.description}</h2>
          <div className="overflow-y-auto max-h-[250px]">
          <FormBase
  onSubmit={handleCreateTasks}
  defaultValues={{ tasks: [{ name: "", description: "", projectId: project.id }] }}
>
  <FormTask />
</FormBase>

          </div>
          <div className="overflow-y-auto max-h-[400px]">
            <h1>Tarefas</h1>
            {tasksByProject[project.id]?.length > 0 ? (
              tasksByProject[project.id].map((task) => (
                <div key={task.id} className="task border gap-5">
                  <h3 className="text-lg font-semibold">Titulo: {task.title}</h3>
                  <p>Descrição: {task.description}</p>
                  <Button className="bg-red-600" onClick={() => handleDeleteTask(task.id)}>
                    Excluir
                  </Button>
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
