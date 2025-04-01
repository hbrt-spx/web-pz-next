import Cookie from "js-cookie";
import { toast } from "react-toastify";

export const createProject = async (data: { name: string; description: string; }) => {
  try {
    const token = Cookie.get("token");
    if (!token) {
      toast.error("Token não encontrado");
      return;
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
      if (errorData.message) {
        toast.error(errorData.message);
      } else {
        toast.error("Erro ao criar o projeto. Tente novamente.");
      }
      return;
    }

    const responseData = await response.json();
    if (responseData) {
      toast.success("Projeto criado com sucesso!");
      return responseData; // Retorna os dados do projeto criado
    }
  } catch (error) {
    console.error("Erro ao criar o projeto:", error);
    toast.error("Erro ao criar o projeto. Tente novamente.");
  }
};
