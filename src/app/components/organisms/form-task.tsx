import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "../atoms/button"; // Supondo que você tenha um botão personalizado

const FormTask = () => {
  const { control } = useFormContext(); // Pega o contexto do formulário
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks", // Nome do campo do array no estado do formulário
  });

  return (
    <div className="space-y-4">
      {fields.map((item, index) => (
        <div key={item.id} className="flex gap-4 w-full border-b pb-4">
          <div className="w-full flex flex-col gap-2">
            <input
              {...control.register(`tasks[${index}].name`)}
              type="text"
              placeholder="Nome da Tarefa"
              className="w-full p-2 border rounded"
            />
            <textarea
              {...control.register(`tasks[${index}].description`)}
              placeholder="Descrição da Tarefa"
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Button
              type="button"
              onClick={() => append({ name: "", description: "" })}
              className="w-full bg-green-500 text-white py-2 gap-1 rounded-sm"
            >
              +
            </Button>
            <Button
              type="button"
              onClick={() => remove(index)}
              className="w-full text-white py-2 gap-1 rounded-sm bg-red-500 hover:bg-red-600"
              disabled={fields.length === 1}
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
  );
};

export default FormTask;
