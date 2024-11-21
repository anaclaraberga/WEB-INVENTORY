import { AuthService } from '@/api/services/auth-service';
import { SideLink, sidelinks, userSideLinks } from '@/data/sidelinks';
import { createContext, ReactNode, useEffect, useState } from 'react';

export enum UserType {
  ADMIN = "ADMIN",
  DEFAULT = "DEFAULT"
}

export interface User {
  id: number | null
  name?: string;
  email: string;
  password: string;
  type?: UserType
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  sideLinks: SideLink[]
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [sessionTimeout, setSessionTimeout] = useState<NodeJS.Timeout | null>(null);
  const [sideLinks, setSideLinks] = useState<SideLink[]>(userSideLinks)

  const login = async (userData: User) => {
    const response = await AuthService.signIn(userData)

    if (response.type == "ADMIN") {
      setSideLinks(sidelinks)
    }

    setUser(response);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    startSessionTimeout();
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
  };

  const startSessionTimeout = () => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
    const timeout = setTimeout(() => {
      logout();
      alert('Sua sessão expirou!');
    }, 3600000);

    setSessionTimeout(timeout);
  };

  useEffect(() => {
    (async () => {
      if (user) await login(user);
    })()

    console.log(user)
  }, [user]);

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout, sideLinks }}>{children}</AuthContext.Provider>;
};

