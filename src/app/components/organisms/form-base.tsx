import { useForm, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";

interface FormBaseProps {
  children: React.ReactNode; 
  onSubmit: SubmitHandler<any>; 
  defaultValues?: any;
}

const FormBase = ({ children, onSubmit, defaultValues }: FormBaseProps) => {

  const methods = useForm({ defaultValues });

  return (

    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        {children}
      </form>
    </FormProvider>
  );
};

export default FormBase;
