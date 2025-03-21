"use client";
import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useProjectStore } from "@/src/app/stores/projectStore";
import { Button } from "@/src/app/components/atoms/button";
import { useRouter } from "next/navigation";
import { Progress } from "../components/atoms/progress";
import { toast } from "react-toastify";
import { IFormProject, ITaskForm } from "../types/forms";
import CreateProjectForm from "../components/organisms/create-project-form";
import ProjectCard from "../components/organisms/project-card";
import UserProfile from "../components/organisms/user-profile";
import { Popover, PopoverContent, PopoverTrigger } from "../components/molecules/popover";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookie.get("token");
  const { projects, addProject, fetchProjects, removeProject } = useProjectStore();


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
        userId: userId,
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

       const token = Cookie.get("token");
      if (!token) {
        toast.error("Token não encontrado");
        return;
      }
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.sub;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
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
            className="w-full mt-auto bg-red-500 text-white"
          >
            Logoff
          </Button>
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex w-full h-14 items-center bg-white border-b">
            <div className="flex w-[80%] justify-center items-center">
              <UserProfile token={token || ''}/>
            </div>
            <div className="flex w-[20%] items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button>+ Novo Projeto</Button>
                </PopoverTrigger>
                <PopoverContent>               
                    <CreateProjectForm onSubmit={onSubmitProject} />                  
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex flex-wrap justify-start gap-4 p-6 mt-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} onDelete={removeProject}/>
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
