import { create } from 'zustand';

interface Invitation {
  id: string;
  inviterName: string;
  name: string;
}

interface InvitationStore {
  invitations: Invitation[];
  setInvitations: (invites: Invitation[]) => void;
  removeInvitation: (id: string) => void;
  getInvitations: () => Invitation[]; // Getter para acessar as invitations
}

export const useInvitationStore = create<InvitationStore>((set, get) => ({
  invitations: [],
  setInvitations: (invites) => set({ invitations: invites }),
  removeInvitation: (id) =>
    set((state) => ({
      invitations: state.invitations.filter((inv) => inv.id !== id),
    })),
  getInvitations: () => get().invitations, // Getter para retornar o estado atual de invitations
}));
