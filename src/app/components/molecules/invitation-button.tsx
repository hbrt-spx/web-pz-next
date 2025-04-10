'use client';
import { useEffect, useState } from 'react';
import { fetchInvitations, acceptInvitation, declineInvitation } from '../../services/invitation-service';
import { useInvitationStore } from '../../stores/invitationStore';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import Cookie from "js-cookie";

interface Invitation {
  id: string;
  status: string;
  invited_at: string;
  accepted_at: string | null;
  declined_at: string | null;
  project: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}


export default function InvitationButton() {
  const { invitations, setInvitations, removeInvitation } = useInvitationStore();
  const [isOpen, setIsOpen] = useState(false);

  const token = Cookie.get("token");
  if (!token) {
    toast.error("Token não encontrado");
    return;
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken.sub; 

  useEffect(() => {
    const loadInvitations = async (userId: string) => {
      try {
        const data = await fetchInvitations(userId);
        setInvitations(data);
      } catch (err) {
        console.error('Erro ao buscar convites:', err);
      }
    };
    loadInvitations(userId);
  }, [setInvitations]);

  const handleAccept = async (id: string) => {
    await acceptInvitation(id);
    removeInvitation(id);
  };

  const handleDecline = async (id: string) => {
    await declineInvitation(id);
    removeInvitation(id);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
          invitations.length > 0 ? 'bg-blue-600' : 'bg-gray-700'
        }`}
      >
        Convites
        {invitations.length > 0 && (
          <span className="ml-2 text-xs bg-red-500 text-white rounded-full px-2">
            {invitations.length}
          </span>
        )}
        <ChevronDownIcon className="h-4 w-4" />
      </button>

      {isOpen && invitations.length > 0 && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-md shadow-lg z-50">
          {invitations.map((inv) => (
            <div key={inv.id} className="p-4 border-b">
              <p className="text-sm">
                Você foi convidado para o projeto <strong>{inv.project.name}</strong>
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleAccept(inv.id)}
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Aceitar
                </button>
                <button
                  onClick={() => handleDecline(inv.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Recusar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
