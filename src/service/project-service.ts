// src/services/projectService.ts
import Cookie from "js-cookie";
import { IFormProject } from "../app/types/forms";


// Definindo o tipo Project
export interface Project {
  id: string;
  name: string;
  description: string;
  userId: string;
}

export const createProject = async (data: IFormProject): Promise<Project> => {
  const token = Cookie.get("token");
  if (!token) {
    throw new Error("Token não encontrado");
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken.sub;

  const projectData = {
    name: data.name,
    description: data.description,
    userId: userId,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao criar o projeto.");
  }

  const responseData: Project = await response.json();
  return responseData;
};
