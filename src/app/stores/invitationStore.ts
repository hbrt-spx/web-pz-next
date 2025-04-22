import { create } from 'zustand';
import { Invitation } from '../types/invitation';

interface InvitationStore {
  invitations: Invitation[];
  setInvitations: (invites: Invitation[] | ((prev: Invitation[]) => Invitation[])) => void;
  removeInvitation: (id: string) => void;
  getInvitations: () => Invitation[];
}

export const useInvitationStore = create<InvitationStore>((set, get) => ({
  invitations: [],
  setInvitations: (invites) =>
    set((state) => ({
      invitations: typeof invites === 'function' ? invites(state.invitations) : invites,
    })),
  removeInvitation: (id) =>
    set((state) => ({
      invitations: state.invitations.filter((inv) => inv.id !== id),
    })),
  getInvitations: () => get().invitations,
}));
