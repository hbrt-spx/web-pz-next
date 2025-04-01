"use client";
import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useProjectStore } from "@/src/app/stores/projectStore";
import { Button } from "@/src/app/components/atoms/button";
import { useRouter } from "next/navigation";
import { Progress } from "../components/atoms/progress";
import { toast } from "react-toastify";
import { IFormProject } from "../types/forms";
import CreateProjectForm from "../components/organisms/create-project-form";
import ProjectCard from "../components/organisms/project-card";
import UserProfile from "../components/organisms/user-profile";
import { Popover, PopoverContent, PopoverTrigger } from "../components/molecules/popover";
import { createProject } from "../utils/create-projects";
import { getUser } from "../utils/get-user";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookie.get("token");
  const { projects, addProject, fetchProjects, removeProject } = useProjectStore();


  const onSubmitProject = async (data: IFormProject) => {
    const newProject = await createProject(data);

    if (newProject) {
      addProject(newProject);
    }
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

   const fetchUser = async () => {
      const { error } = await getUser(token, router);

      if (error) {
        toast.error(error);
        router.push("/login");
        return;
      }

      setIsLoading(false);
    };

    fetchUser();
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
