import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUserId } from '../utils/userDataGenerator';

interface User {
  id: string;
  name: string;
  email: string;
}

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AuthError {
  message: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: AuthError | null;
  register: (name: string, email: string, password: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  clearError: () => void;
}

const USERS_STORAGE_KEY = 'nexus-users';

const getStoredUsers = (): StoredUser[] => {
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch {
    return [];
  }
};

const saveUser = (user: StoredUser) => {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const findUserByEmail = (email: string): StoredUser | null => {
  const users = getStoredUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      register: (name: string, email: string, password: string) => {
        if (password.length < 6) {
          set({ error: { message: 'Password must be at least 6 characters long' } });
          return false;
        }

        const existingUser = findUserByEmail(email);
        if (existingUser) {
          set({ error: { message: 'An account with this email already exists' } });
          return false;
        }

        const userId = getUserId(email);
        const newUser: StoredUser = {
          id: userId,
          name,
          email,
          password,
        };

        saveUser(newUser);

        const user: User = {
          id: userId,
          name,
          email,
        };

        set({ user, isAuthenticated: true, error: null });
        return true;
      },
      login: (email: string, password: string) => {
        const storedUser = findUserByEmail(email);

        if (!storedUser) {
          set({ error: { message: 'No account found with this email address' } });
          return false;
        }

        if (storedUser.password !== password) {
          set({ error: { message: 'Incorrect password. Please try again' } });
          return false;
        }

        const user: User = {
          id: storedUser.id,
          name: storedUser.name,
          email: storedUser.email,
        };

        set({ user, isAuthenticated: true, error: null });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'nexus-auth-storage',
    }
  )
);
