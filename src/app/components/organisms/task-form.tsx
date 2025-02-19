import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "../atoms/button"; // Botão personalizado, pode ser alterado conforme necessário

const TaskForm = () => {
  const { control, handleSubmit } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const onSubmit = (data: any) => {
    console.log(data); // Aqui você pode enviar os dados
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col w-full gap-4">
        {/* Mapear as tarefas */}
        {fields.map((item, index) => (
          <div key={item.id} className="flex gap-4 w-full border-b pb-4">
            {/* Div contendo os campos da tarefa */}
            <div className="w-full flex flex-col gap-2">
              <div>
                <input
                  {...control.register(`tasks[${index}].name`)}
                  type="text"
                  placeholder="Nome da Tarefa"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <textarea
                  {...control.register(`tasks[${index}].description`)}
                  placeholder="Descrição da Tarefa"
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
            </div>

            {/* Botões de adicionar e remover */}
            <div className="flex flex-col justify-center items-center gap-2">
              <Button
                type="button"
                onClick={() => append({ name: "", description: "", assignedTo: "", images: [] })}
                className="w-full text-white py-2 gap-1 rounded-sm"
              >
                +
              </Button>
              <Button
                type="button"
                onClick={() => remove(index)}
                className="w-full text-white py-2 gap-1 rounded-sm"
                disabled={fields.length === 1} // Desabilitar o botão de remoção quando houver apenas uma tarefa
              >
                -
              </Button>
            </div>
          </div>
        ))}

        <Button type="submit" className="w-full mt-4 bg-green-500 text-white py-2 rounded">
          Salvar Tarefas
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
