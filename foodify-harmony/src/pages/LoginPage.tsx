import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(formData.email, formData.password);
      
      toast({
        title: "Success",
        description: "You have successfully logged in!",
      });
      
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to login",
        variant: "destructive",
      });
    }
  };

  // Function to fill demo credentials
  const fillDemoCredentials = () => {
    setFormData({
      email: 'demo@gmail.com',
      password: '123456',
    });
  };

  // Function to fill admin credentials
  const fillAdminCredentials = () => {
    setFormData({
      email: 'shraddhakapoor@gmail.com',
      password: 'passwordshraddha',
    });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button type="submit" className="w-full bg-primary hover:bg-primary-hover">
              Sign In
            </Button>
            
            <div className="flex space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={fillDemoCredentials}
              >
                Demo User
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={fillAdminCredentials}
              >
                Admin User
              </Button>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
