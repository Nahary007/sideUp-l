import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
}

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    loading: false,
  });

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    // Fake login logic for demo
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (email === 'user@example.com' && password === 'password123') {
      setAuthState({ isAuthenticated: true, loading: false });
    } else {
      setAuthState((prev) => ({ ...prev, loading: false }));
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, loading: false });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
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