"use client";
import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useUserStore } from "@/src/app/stores/userStore";
import { useProjectStore } from "@/src/app/stores/projectStore";
import { Button } from "@/src/app/components/atoms/button";
import { useRouter } from "next/navigation";
import { Progress } from "../components/atoms/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/molecules/sheet";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../components/atoms/input";
import { toast } from "react-toastify";
import TaskForm from "../components/organisms/task-form";

const UserProfile = () => {
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookie.get("token");
      if (!token) {
        setError("Token não encontrado!");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/get-user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Token expirado ou inválido");
        }

        const data = await response.json();
        setUser(data);

        const userId = data.sub;
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error("Erro ao recuperar detalhes do usuário");
        }

        const userDetailsData = await userResponse.json();
        setUserDetails(userDetailsData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setUser]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      {userDetails && (
        <div>
          <p>
            <strong>Bem vindo: </strong> {userDetails.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  interface IFormProject {
    name: string;
    description: string;
  }

  interface ITaskForm {
    taskName: string;
    taskDescription: string;
    assignee: string;
    images: string[];
  }

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookie.get("token");
  const methods = useForm<IFormProject>();
  const taskMethods = useForm<ITaskForm>();
  const { projects, addProject, fetchProjects } = useProjectStore();

  const onSubmitProject = async (data: IFormProject) => {
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
        criadorId: userId,
        adminId: userId,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(projectData),
        }
      );

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
        addProject(responseData);
      }
    } catch (error) {
      console.error("Erro ao criar o projeto:", error);
      toast.error("Erro ao criar o projeto. Tente novamente.");
    }
  };

  const onSubmitTask = async (data: ITaskForm) => {
    console.log("Tarefa criada:", data);
    toast.success("Tarefa adicionada com sucesso!");
  };

  const handleLogout = () => {
    Cookie.remove("token");
    router.push("/login");
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/get-user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          router.push("/login");
          return;
        }

        setIsLoading(false);
      } catch (err) {
        router.push("/login");
      }
    };

    validateToken();
    fetchProjects();
  }, [router, token, fetchProjects]);

  if (isLoading) {
    return <Progress />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row">
        <div className="w-64 bg-white border-r">
          <div className="flex items-center justify-center h-14 border-b">
            <div className="text-black">PROJECT Z0NE</div>
          </div>
          <div className="flex flex-col py-4 space-y-1 mt-auto">
            <li>Projects</li>
            <li>Settings</li>
            <li>Profile</li>

            
           
          </div>
              <Button
                onClick={handleLogout}
                className=" w-full mt-auto bg-red-500 text-white"
              >
                Logoff
              </Button>
        </div>

       
        <div className="flex flex-col flex-grow">         
          <div className="flex w-full h-14 items-center bg-white border-b">
            <div className="flex w-[80%] justify-center items-center">
              <UserProfile />
            </div>
            <div className="flex w-[20%] items-center justify-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button>+ Novo Projeto</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <FormProvider {...methods}>
                      <form onSubmit={methods.handleSubmit(onSubmitProject)}>
                        <Input
                          name="name"
                          type="text"
                          placeholder="Nome do Projeto"
                        />
                        <Input
                          name="description"
                          type="text"
                          placeholder="Descrição do Projeto"
                        />

                        <Button type="submit" className="w-full mt-2">
                          Criar
                        </Button>
                      </form>
                    </FormProvider>
                  </SheetHeader>
                  <SheetFooter>
                  
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="flex flex-wrap justify-start gap-4 p-6 mt-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="w-[300px] bg-gray-100 rounded-lg p-4 shadow-md mb-4"
                >
                  <h2 className="text-xl font-bold">{project.name}</h2>
                  <p>{project.description}</p>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="mt-2">
                        Ver Detalhes
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>{project.name}</SheetTitle>
                        <SheetDescription>
                          {project.description}
                        </SheetDescription>

                       
                          <FormProvider {...taskMethods}>
                            <form
                              onSubmit={taskMethods.handleSubmit(onSubmitTask)}
                            >
                              <TaskForm/>
                            </form>
                          </FormProvider>
                  
                      </SheetHeader>
                      <SheetFooter>
                      
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>
              ))
            ) : (
              <p>Nenhum projeto foi criado ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
