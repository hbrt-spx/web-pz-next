import { useFormContext, useFieldArray } from "react-hook-form";

const TaskForm = () => {
  const { control, handleSubmit } = useFormContext(); 
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks", 
  });

  const onSubmit = (data: any) => {
    console.log(data); // fetch aq
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((item, index) => (
        <div key={item.id} className="space-y-2 border-b pb-4">
          <div>
            <label htmlFor={`tasks[${index}].name`} className="block">
              Nome da Tarefa
            </label>
            <input
              {...control.register(`tasks[${index}].name`)}
              type="text"
              placeholder="Nome da Tarefa"
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label htmlFor={`tasks[${index}].description`} className="block">
              Descrição da Tarefa
            </label>
            <textarea
              {...control.register(`tasks[${index}].description`)}
              placeholder="Descrição da Tarefa"
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor={`tasks[${index}].assignedTo`} className="block">
              Quem irá fazer
            </label>
            <input
              {...control.register(`tasks[${index}].assignedTo`)}
              type="text"
              placeholder="Nome do responsável"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor={`tasks[${index}].images`} className="block">
              Adicionar Imagens
            </label>
            <input
              {...control.register(`tasks[${index}].images`)}
              type="file"
              className="w-full p-2 border rounded"
              multiple
            />
          </div>

          <button
            type="button"
            className="text-red-500"
            onClick={() => remove(index)}
          >
            Remover Tarefa
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: "", description: "", assignedTo: "", images: [] })}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Adicionar Nova Tarefa
      </button>

      <button type="submit" className="w-full mt-4 bg-green-500 text-white py-2 rounded">
        Salvar Tarefas
      </button>
    </form>
  );
};
