import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, Address } from '@/types';
import api from '@/utils/axios';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateAddress: (address: string, addressType: string) => void;
  showToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Utility to extract token from Authorization header
const extractBearerToken = (authHeader: string | undefined): string | null => {
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth-service/api/login', { email, password });

      const newToken = extractBearerToken(response.headers['authorization']);
      if (!newToken) throw new Error('No authentication token received');
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      showToken();

      const userData: User = {
        id: response.data.data.id?.toString() || '1',
        fullName: response.data.data.name || email.split('@')[0],
        email,
        phone: response.data.data.phoneNumber || '',
        role: response.data.data.role || 'User',
        address: response.data.data.address || '',
        addressType: response.data.data.addressType || 'Home'
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));

      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  };

  const signup = async (userData: Partial<User>) => {
    try {
      const registrationData = {
        email: userData.email,
        name: userData.fullName,
        address: userData.address,
        addressType: userData.addressType,
        phoneNumber: userData.phone,
        role: userData.role || 'User'
      };

      const response = await api.post('/auth-service/api/register', registrationData);

      const newToken = extractBearerToken(response.headers['authorization']);
      if (!newToken) throw new Error('No authentication token received');

      localStorage.setItem('token', newToken);
      setToken(newToken);
      showToken();

      const newUser: User = {
        id: response.data.data.id.toString(),
        fullName: response.data.data.name || '',
        email: response.data.data.email || '',
        phone: response.data.data.phoneNumber || '',
        role: response.data.data.role || 'User',
        address: response.data.data.address || '',
        addressType: response.data.data.addressType || 'Home'
      };

      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Signup failed');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateAddress = (address: string, addressType: string) => {
    if (user) {
      const updatedUser = { ...user, address, addressType };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const showToken = () => {
    if (token) {
      toast({
        title: 'Authentication Token',
        description: (
          <div className="mt-2">
            <p className="text-xs font-mono bg-gray-100 p-2 rounded break-all">{token}</p>
            <button
              className="mt-2 text-xs text-primary hover:underline"
              onClick={() => {
                navigator.clipboard.writeText(token);
                toast({
                  title: 'Copied!',
                  description: 'Token copied to clipboard',
                  duration: 2000
                });
              }}
            >
              Copy to clipboard
            </button>
          </div>
        ),
        duration: 15000
      });
    } else {
      toast({
        title: 'No Token Available',
        description: 'You are not currently authenticated.',
        variant: 'destructive'
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        token,
        login,
        signup,
        updateAddress,
        logout,
        updateUser,
        showToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
