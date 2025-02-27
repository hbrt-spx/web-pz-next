import { toast } from "react-toastify";
import { deleteProject } from "../../utils/delete-project";
import { Button } from "../atoms/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetFooter } from "../molecules/sheet";
import FormBase from "./form-base";
import FormTask from "./form-task";
import { useState } from "react";

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

  const [isDeleting, setIsDeleting] = useState(false)

  const handleSubmit = (data: any) => {
    console.log("Dados do formulário:", data); //Continuar
  };

  const handleDelete = async () => {
    if (isDeleting) return; // Impede múltiplas requisições de exclusão

    setIsDeleting(true); // Começa o processo de exclusão

    try {
      const isDeleted = await deleteProject(project.id); // Exclui no backend
      if (isDeleted) {
        onDelete(project.id); // Atualiza o estado global com a remoção
        toast.success("Projeto excluído com sucesso!");
      } else {
        toast.error("Erro ao excluir o projeto.");
      }
    } catch (error) {
      console.error("Erro ao excluir o projeto:", error);
      toast.error("Ocorreu um erro ao tentar excluir o projeto.");
    } finally {
      setIsDeleting(false); // Finaliza o processo de exclusão
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
            <FormBase onSubmit={handleSubmit} defaultValues={{ tasks: [{ name: "", description: "" }] }}>
              <FormTask />
            </FormBase>
          </SheetHeader>
          <SheetFooter className="flex w-[100%] h-[60%] items-end justify-end">
            <Button  className="bg-red-600 hover:bg-red-700" onClick={handleDelete}
            disabled={isDeleting}>{isDeleting ? "Excluindo..." : "Excluir Projeto"}</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProjectCard;
