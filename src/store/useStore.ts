import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, ChildData, AnalysisResult } from '../types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  history: (ChildData & { result: AnalysisResult })[];
  
  // Actions
  login: (email: string, role: User['role']) => void;
  logout: () => void;
  addToHistory: (data: ChildData, result: AnalysisResult) => void;
  clearHistory: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      history: [],

      login: (email: string, role: User['role']) => {
        const user: User = { 
          id: Math.random().toString(36).substr(2, 9), 
          name: email.split('@')[0], 
          email, 
          role 
        };
        set({ user, isAuthenticated: true });
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      addToHistory: (data: ChildData, result: AnalysisResult) => 
        set((state) => ({ 
          history: [{ ...data, result }, ...state.history].slice(0, 50) 
        })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'nutriverse-storage',
    }
  )
);
