import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Address, User } from '@/types';
import { jwtDecode } from 'jwt-decode';
import api from '@/utils/axios';

interface DecodedToken {
  email: string;
  [key: string]: any; // you can define other claims like `exp`, `sub` etc.
}


const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchUserData = async () => {
    try {
      setLoading(true);

      // const email = "demo@gmail.com";

      const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found');
          return;
        }

        console.log(token);

        const decoded: DecodedToken = jwtDecode(token);
        console.log('Decoded token:', decoded);
        const email = decoded.sub;
        console.log(email);

      const { data } = await api.post(`/user-service/api/user/profile`, {
        email
      });

      if (data.success && data.data) {
        const userData: User = {
          id: data.data.id.toString(),
          fullName: data.data.name,
          email: data.data.email,
          phone: data.data.phoneNumber,
          role: data.data.role,
          address: data.data.address || '',
          addressType: data.data.addressType || 'Home'
        };
        setUserData(userData);
      } else {
        setError('Failed to load user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  fetchUserData();
}, []);


  if (!user) return null;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-background-light">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">Profile Information</h1>
              {/* Edit button removed */}
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{userData?.fullName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{userData?.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{userData?.phone || '-'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="font-medium">{userData?.role || 'User'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Address Type</p>
                <p className="font-medium">{userData?.addressType || 'Home'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{userData?.address || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
