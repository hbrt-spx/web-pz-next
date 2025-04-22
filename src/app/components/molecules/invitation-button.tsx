'use client'
import { useEffect, useState } from 'react';
import { fetchInvitations, acceptInvitation, declineInvitation } from '../../services/invitation-service';
import { useInvitationStore } from '../../stores/invitationStore';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import Cookie from 'js-cookie';
import { io } from 'socket.io-client';
import { Invitation } from '../../types/invitation';


const socket = io(process.env.NEXT_PUBLIC_API_URL, {
  auth: {
    token: Cookie.get('token') 
  }
});

export default function InvitationButton() {
  const { invitations = [], setInvitations, removeInvitation } = useInvitationStore(); 
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {

    const token = Cookie.get("token");

    if (!token) {
      toast.error("Token não encontrado ou inválido.");
      return;
    }

    const loadInvitations = async () => {
      try {
        const data = await fetchInvitations(token); 
        setInvitations(data); 
      } catch (err) {
        console.error('Erro ao buscar convites:', err);
      }
    };

    loadInvitations();


    socket.on('newInvitation', (invitation: Invitation) => {
      setInvitations((prevInvitations: Invitation[]) => {
        return [...prevInvitations, invitation];
      });
    });

    return () => {
      socket.off('newInvitation');
    };
  }, [setInvitations]);

  const handleAccept = async (id: string) => {
    try {
      await acceptInvitation(id);
      removeInvitation(id);
    } catch (error) {
      toast.error("Erro ao aceitar o convite.");
    }
  };

  const handleDecline = async (id: string) => {
    try {
      await declineInvitation(id);
      removeInvitation(id);
    } catch (error) {
      toast.error("Erro ao recusar o convite.");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${invitations.length > 0 ? 'bg-blue-600' : 'bg-gray-700'}`}
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
