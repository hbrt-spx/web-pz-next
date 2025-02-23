// src/app/components/organisms/ProjectCard.tsx

import { Button } from "../atoms/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "../molecules/sheet";
import FormBase from "./form-base";
import FormTask from "./form-task";

interface ProjectCardProps {
  project: any;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const handleSubmit = (data: any) => {
    console.log("Dados do formulário:", data);
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProjectCard;
