import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { api } from "./api";

export const createProject = async (data: { name: string; description: string; }) => {
  
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

    const response = await api({
      url: 'projects',
      method: 'POST',
      body: projectData
    });

    return response
};
