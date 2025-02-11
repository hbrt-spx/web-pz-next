'use client';
import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { useUserStore } from '@/src/app/stores/userStore';
import { Button } from '@/src/app/components/atoms/button';
import { useRouter } from 'next/navigation';
import { Progress } from '../components/atoms/progress';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../components/molecules/sheet';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../components/atoms/input';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookie.get('token');
      if (!token) {
        setError('Token não encontrado!');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/get-user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Token expirado ou inválido');
        }

        const data = await response.json();
        setUser(data);

        const userId = data.sub;
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error('Erro ao recuperar detalhes do usuário');
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
          <p><strong>Bem vindo: </strong> {userDetails.name}</p>
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

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const token = Cookie.get('token');
  const methods = useForm<IFormProject>();

  
  const fetchProjectDetails = async (projectId: string) => {
    const token = Cookie.get('token');
    if (!token) {
      toast.error('Token não encontrado');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Erro ao buscar o projeto');
        return;
      }

      const projectData = await response.json();
      setProjectDetails(projectData); 
    } catch (error) {
      console.error('Erro ao buscar detalhes do projeto:', error);
      toast.error('Erro ao buscar detalhes do projeto');
    }
  };

 
  const onSubmit = async (data: IFormProject) => {
    try {
      const token = Cookie.get('token');
      if (!token) {
        toast.error('Token não encontrado');
        return;
      }

      
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.sub;

     
      const projectData = {
        name: data.name,
        description: data.description,
        criadorId: userId, 
        adminId: userId,   
      };

      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message) {
          toast.error(errorData.message);
        } else {
          toast.error('Erro ao criar o projeto. Tente novamente.');
        }
        return;
      }

      const responseData = await response.json();
      if (responseData) {
        toast.success('Projeto criado com sucesso!');
        const projectId = responseData.id; 
        fetchProjectDetails(projectId); 
      }
    } catch (error) {
      console.error('Erro ao criar o projeto:', error);
      toast.error('Erro ao criar o projeto. Tente novamente.');
    }
  };

 
  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/get-user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          router.push('/login');
          return;
        }

        setIsLoading(false);
      } catch (err) {
        router.push('/login');
      }
    };

    validateToken();
  }, [router, token]);

  if (isLoading) {
    return <Progress />;
  }

  return (
  <div className="flex relative">
  
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <div className="flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
        <div className="flex items-center justify-center h-14 border-b">
          <div className="text-black">PROJECT Z0NE</div>
        </div>
        <div className='flex'>
          <div className="flex overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <li>aaaaaaaaaaaaaaa</li>
              <li>bbbbbbbbbbbbbbbb</li>
              <li>ccccccccccccccccc</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="flex w-[100%] h-14 items-center bg-white border-b clear-both">
      <div className="flex w-[80%] justify-center items-center">
        <UserProfile />
      </div>
      <div className="flex w-[20%] items-center justify-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button onClick={() => setIsSheetOpen(true)}>Novo Projeto</Button>
          </SheetTrigger>

          {isSheetOpen && (
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Criar Novo Projeto</SheetTitle>
                <SheetDescription>Preencha as informações abaixo</SheetDescription>
              </SheetHeader>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <Input name="name" type="text" placeholder="Nome do Projeto" />
                  <Input name="description" type="text" placeholder="Descrição do Projeto" />
                  <Button type="submit" className="w-full mt-2">
                    Criar Projeto
                  </Button>
                </form>
              </FormProvider>
              <SheetFooter>
             
              </SheetFooter>
            </SheetContent>
          )}
        </Sheet>
      </div>
    </div>

   
    <div className="absolute top-24 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-96 p-6 bg-white shadow-lg rounded-lg z-50">
      <div className="text-center">
         {projectDetails ? (
          <div>
            <h2>{projectDetails.name}</h2>           
          </div>
        ) : (
          <p>Nenhum projeto foi criado ainda.</p>
        )}

      </div>
    </div>
  </div>
);

}
