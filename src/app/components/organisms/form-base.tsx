import { useForm, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";

interface FormBaseProps {
  children: React.ReactNode; // O que for passado como filho (como o FormTask, por exemplo)
  onSubmit: SubmitHandler<any>; // Função de submissão
  defaultValues?: any; // Valores padrões para o formulário
}

const FormBase = ({ children, onSubmit, defaultValues }: FormBaseProps) => {
  // Cria o hook de formulário com defaultValues
  const methods = useForm({ defaultValues });

  return (
    // Fornece o contexto de formulário para os filhos
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        {children}
      </form>
    </FormProvider>
  );
};

export default FormBase;
