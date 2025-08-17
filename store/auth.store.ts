import { getCurrentUser } from "@/actions/get-user";
import { User } from "@/type";
import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;

  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;

  fetchAuthenticatedUser: () => Promise<void>;
};

const useUser = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setLoading: (loading) => set({ isLoading: loading }),
  setUser: (user) => set({ user: user }),
  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });

    try {
      const user = await getCurrentUser();
      if (user) {
        set({ isAuthenticated: true, user: user as unknown as User });
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.log(error);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUser;
