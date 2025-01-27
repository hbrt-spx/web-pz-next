import {create} from 'zustand';

interface UserState {
  id: string | null;
  email: string | null;
  setUser: (userData: { id: string; email: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: null,
  email: null,
  setUser: (userData) => set({ ...userData }),
  clearUser: () => set({ id: null, email: null }),
}));
