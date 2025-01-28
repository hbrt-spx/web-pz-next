'use client'
import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { useUserStore } from '@/src/app/stores/userStore';
import { Button } from '@/src/app/components/atoms/button';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookie.get('token');
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
  }, [router]);

  if (isLoading) {
    return <div>Carregando...</div>;  
  }

  return (
    <div className="flex">
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
        <div className="flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
          <div className="flex items-center justify-center h-14 border-b">
            <div className="text-black">PROJECT Z0NE</div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              
            </ul>
          </div>
        </div>
      </div>
      <div className="flex w-[100%] h-14 items-center bg-white border-b">
        <div className="flex w-[80%] justify-center items-center">
          <UserProfile />
        </div>
        <div className="flex w-[20%] items-center justify-center">
          <Button>Novo Projeto</Button>
        </div>
      </div>
    </div>
  );
}
