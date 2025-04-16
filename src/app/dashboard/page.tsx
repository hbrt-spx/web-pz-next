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
import { createProject } from "../services/create-projects";
import { api } from "../services/api";
import InvitationButton from "../components/molecules/invitation-button";
import { useInvitationStore } from "../stores/invitationStore";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookie.get("token");
  const { projects, addProject, getProjects, removeProject } = useProjectStore();
  const { getInvitations, setInvitations } = useInvitationStore();

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
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.sub;

      await api({
        url: `users/${userId}`,
        method: "GET",
      });

      getProjects();

      try {
        const invitations = await getInvitations();
        setInvitations(invitations);
      } catch (err) {
        console.error("Erro ao buscar convites:", err);
      }
    };

    fetchUser();
  }, [router, token, getProjects, getInvitations, setInvitations]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-row h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r shadow-sm">
          <div className="flex items-center justify-center h-16 border-b">
            <div className="text-xl font-bold text-green-600">PROJECT Z0NE</div>
          </div>
          
          <div className="flex flex-col p-4 space-y-2">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-gray-700">Projects</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-gray-700">Settings</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-gray-700">Profile</span>
            </button>
          </div>

          <Button
            onClick={handleLogout}
            className="w-[90%] mx-auto mb-6 mt-auto bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
          >
            Sair
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-grow">
          <div className="flex w-full h-16 items-center bg-white border-b px-6 shadow-sm">
            <div className="flex w-[80%] justify-start items-center">
              <UserProfile token={token || ''} />
              <InvitationButton />
            </div>
            <div className="flex w-[20%] items-center justify-end">
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                    + Novo Projeto
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-4 rounded-lg shadow-lg">
                  <CreateProjectForm onSubmit={onSubmitProject} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex flex-wrap justify-start gap-6 p-8 mt-2 bg-gray-50">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={removeProject}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center w-full p-12">
                <p className="text-gray-500 text-lg">
                  Nenhum projeto foi criado ainda.
                </p>
                <p className="text-gray-400 mt-2">
                  Clique em "Novo Projeto" para começar
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
