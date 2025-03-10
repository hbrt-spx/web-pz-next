import { toast } from "react-toastify";
import { deleteProject } from "../../utils/delete-project";
import { Button } from "../atoms/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from "../molecules/sheet";
import FormBase from "./form-base";
import FormTask from "./form-task";
import { useEffect, useState } from "react";
import { onSubmitTask } from "../../utils/create-task";
import { getTask } from "../../utils/get-task";
import { useTaskStore } from "../../stores/taskStore";

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
  const { tasks, addTask } = useTaskStore();

  useEffect(() => {
    getTask(project.id);
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
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="mt-2">
            Ver Detalhes
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{project.name}</SheetTitle>
            <SheetDescription>{project.description}</SheetDescription>
            <div className="overflow-y-auto max-h-[200px]">
              <FormBase
                onSubmit={handleCreateTasks}
                defaultValues={{ tasks: [{ name: "", description: "" }] }}
              >
                <FormTask />
              </FormBase>
            </div>
            <div className="overflow-y-auto max-h-[300px]">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div key={task.id} className="task border">
                    <h3 className="text-lg font-semibold">{task.titulo}</h3>
                    <p>{task.descricao}</p>
                    <Button>Excluir</Button>
                  </div>
                ))
              ) : (
                <p>Sem tarefas disponíveis</p>
              )}
            </div>
          </SheetHeader>
          <SheetFooter className="flex w-[100%] h-[60%] items-end justify-end">
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Excluindo..." : "Excluir Projeto"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProjectCard;
