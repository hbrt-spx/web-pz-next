import { useForm } from "react-hook-form";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { IFormProject } from "@/src/app/types/forms";
import FormBase from "./form-base";

interface CreateProjectFormProps {
  onSubmit: (data: IFormProject) => void;
}

const CreateProjectForm = ({ onSubmit }: CreateProjectFormProps) => {
  const methods = useForm<IFormProject>();

  return (
    <FormBase onSubmit={onSubmit}>
      <Input name="name" type="text" placeholder="Nome do Projeto" />
        <Input name="description" type="text" placeholder="Descrição do Projeto" />
        <Button type="submit" className="w-full mt-2">
          Criar
        </Button>
    </FormBase>
  );
};

export default CreateProjectForm;
