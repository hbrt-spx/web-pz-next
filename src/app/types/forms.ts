export interface IFormProject {
    id: string
    name: string;
    description: string;
  }
  
  export interface ITaskForm {
    taskName: string;
    taskDescription: string;
    assignee: string;
    images: string[];
  }

  export interface IFormRegister {
    name: string;
    email: string;
    password: string;
    confirm: string;
  }

  export interface IFormTask {
    titulo: string
    descricao: string
    responsavelId: string
    projetoId: string
    status: string
  }