import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    loading: true, // Commencer en loading pour vérifier l'auth
  });

  axios.defaults.withCredentials = true;

  const getXsrfToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; XSRF-TOKEN=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop()!.split(';')[0]);
    return '';
  };

  // Vérifier l'état d'authentification au chargement
  const checkAuth = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      
      // Essayer d'accéder à une route protégée pour vérifier l'auth
      const response = await axios.get('http://localhost:8000/admin/check-auth', {
        withCredentials: true,
      });
      
      if (response.status === 200) {
        setAuthState({ isAuthenticated: true, loading: false });
      } else {
        setAuthState({ isAuthenticated: false, loading: false });
      }
    } catch (error) {
      setAuthState({ isAuthenticated: false, loading: false });
    }
  };

  // Vérifier l'auth au montage du composant
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');

      const xsrfToken = getXsrfToken();

      const res = await axios.post(
        'http://localhost:8000/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrfToken,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setAuthState({ isAuthenticated: true, loading: false });
      } else {
        setAuthState((prev) => ({ ...prev, loading: false }));
        throw new Error('Identifiants invalides');
      }
    } catch (error: any) {
      setAuthState((prev) => ({ ...prev, loading: false }));

      if (error.response?.status === 401) {
        throw new Error('Identifiants incorrects.');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Erreur lors de la connexion. Veuillez réessayer.");
      }
    }
  };

  const register = async ({ name, email, password }: RegisterData) => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');

      const xsrfToken = getXsrfToken();

      const res = await axios.post(
        'http://localhost:8000/register',
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrfToken,
          },
          withCredentials: true,
        }
      );

      if (res.status === 201 || res.status === 200) {
        setAuthState({ isAuthenticated: true, loading: false });
      } else {
        setAuthState((prev) => ({ ...prev, loading: false }));
        throw new Error("L'inscription a échoué.");
      }
    } catch (error: any) {
      setAuthState((prev) => ({ ...prev, loading: false }));

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    }
  };

  const logout = async () => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    try {
      const xsrfToken = getXsrfToken();

      const res = await axios.post(
        'http://localhost:8000/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrfToken,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200 || res.status === 204) {
        setAuthState({ isAuthenticated: false, loading: false });
      } else {
        setAuthState((prev) => ({ ...prev, loading: false }));
        throw new Error('Erreur lors de la déconnexion');
      }
    } catch (error: any) {
      setAuthState({ isAuthenticated: false, loading: false });

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Erreur lors de la déconnexion. Veuillez réessayer.");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};