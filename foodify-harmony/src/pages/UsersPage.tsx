import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { User } from '@/types';
import api from '@/utils/axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const UsersPage: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [updateForm, setUpdateForm] = useState<Partial<User>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get('/user-service/api/users');
      if (data.success && data.data) {
        setUsers(data.data.map((user: any) => ({
          id: user.id.toString(),
          fullName: user.name,
          email: user.email,
          phone: user.phoneNumber,
          role: user.role,
          address: user.address || '',
          addressType: user.addressType || 'Home'
        })));
      } else {
        setError('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Get user by ID
  const getUserById = async () => {
    if (!userId) {
      setError('Please enter a user ID');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get(`/user-service/api/user/${userId}`);
      if (data.success && data.data) {
        const userData = {
          id: data.data.id.toString(),
          fullName: data.data.name,
          email: data.data.email,
          phone: data.data.phoneNumber,
          role: data.data.role,
          address: data.data.address || '',
          addressType: data.data.addressType || 'Home'
        };
        setSelectedUser(userData);
      } else {
        setError('User not found');
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Failed to fetch user');
      setSelectedUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Get user by email
  const getUserByEmail = async () => {
    if (!userEmail) {
      setError('Please enter a user email');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get(`/user-service/api/user/email/${userEmail}`);
      if (data.success && data.data) {
        const userData = {
          id: data.data.id.toString(),
          fullName: data.data.name,
          email: data.data.email,
          phone: data.data.phoneNumber,
          role: data.data.role,
          address: data.data.address || '',
          addressType: data.data.addressType || 'Home'
        };
        setSelectedUser(userData);
      } else {
        setError('User not found');
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Failed to fetch user');
      setSelectedUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Delete user by ID
  const deleteUserById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.delete(`/user-service/api/user/${id}`);
      if (data.success) {
        toast({
          title: 'Success',
          description: 'User deleted successfully',
        });
        // Refresh the users list
        fetchAllUsers();
        // Clear selected user if it was the deleted one
        if (selectedUser && selectedUser.id === id) {
          setSelectedUser(null);
        }
      } else {
        setError('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  // Delete all users
  const deleteAllUsers = async () => {
    if (!window.confirm('Are you sure you want to delete all users? This action cannot be undone.')) {
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.delete('/user-service/api/users');
      if (data.success) {
        toast({
          title: 'Success',
          description: 'All users deleted successfully',
        });
        setUsers([]);
        setSelectedUser(null);
      } else {
        setError('Failed to delete all users');
      }
    } catch (error) {
      console.error('Error deleting all users:', error);
      setError('Failed to delete all users');
    } finally {
      setLoading(false);
    }
  };

  // Validate form fields
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!updateForm.id) {
      errors.id = 'User ID is required';
    }
    
    if (!updateForm.fullName) {
      errors.fullName = 'Full name is required';
    }
    
    if (!updateForm.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(updateForm.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!updateForm.phone) {
      errors.phone = 'Phone number is required';
    }
    
    if (!updateForm.role) {
      errors.role = 'Role is required';
    }
    
    if (!updateForm.address) {
      errors.address = 'Address is required';
    }
    
    if (!updateForm.addressType) {
      errors.addressType = 'Address type is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Update user
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Convert the form data to match the backend API
      const userData = {
        id: parseInt(updateForm.id),
        name: updateForm.fullName,
        email: updateForm.email,
        // password: updateForm.password,
        address: updateForm.address,
        addressType: updateForm.addressType,
        phoneNumber: updateForm.phone,
        role: updateForm.role
      };
      
      const { data } = await api.put('/user-service/api/user', userData);
      if (data.success) {
        toast({
          title: 'Success',
          description: 'User updated successfully',
        });
        // Refresh the user data
        getUserById();
      } else {
        setError('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is filled
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setUpdateForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is filled
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Load all users when the component mounts
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Redirect if not admin
  if (!user || user.role !== 'Admin') {
    return (
      <div className="min-h-screen bg-background-light">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-xl font-bold text-red-600">Access Denied</h1>
            <p className="mt-2">You do not have permission to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        
        <Tabs defaultValue="all-users" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all-users">All Users</TabsTrigger>
            <TabsTrigger value="get-by-id">Get User by ID</TabsTrigger>
            <TabsTrigger value="get-by-email">Get User by Email</TabsTrigger>
            <TabsTrigger value="update-user">Update User</TabsTrigger>
          </TabsList>
          
          {/* All Users Tab */}
          <TabsContent value="all-users">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">All Users</h2>
                <Button 
                  variant="destructive" 
                  onClick={deleteAllUsers}
                  disabled={loading || users.length === 0}
                >
                  Delete All Users
                </Button>
              </div>
              
              {error && <p className="text-red-500 mb-4">{error}</p>}
              
              {loading ? (
                <p>Loading...</p>
              ) : users.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.fullName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteUserById(user.id)}
                              disabled={loading}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No users found</p>
              )}
            </div>
          </TabsContent>
          
          {/* Get User by ID Tab */}
          <TabsContent value="get-by-id">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Get User by ID</h2>
              
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="userId">User ID</Label>
                  <Input
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter user ID"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={getUserById} disabled={loading}>
                    Get User
                  </Button>
                </div>
              </div>
              
              {error && <p className="text-red-500 mb-4">{error}</p>}
              
              {loading ? (
                <p>Loading...</p>
              ) : selectedUser ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">ID</p>
                    <p className="font-medium">{selectedUser.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-medium">{selectedUser.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedUser.phone || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="font-medium">{selectedUser.role || 'User'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address Type</p>
                    <p className="font-medium">{selectedUser.addressType || 'Home'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{selectedUser.address || '-'}</p>
                  </div>
                  <div className="pt-4">
                    <Button 
                      variant="destructive" 
                      onClick={() => deleteUserById(selectedUser.id)}
                      disabled={loading}
                    >
                      Delete User
                    </Button>
                  </div>
                </div>
              ) : (
                <p>Enter a user ID and click "Get User" to view user details</p>
              )}
            </div>
          </TabsContent>
          
          {/* Get User by Email Tab */}
          <TabsContent value="get-by-email">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Get User by Email</h2>
              
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="userEmail">User Email</Label>
                  <Input
                    id="userEmail"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter user email"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={getUserByEmail} disabled={loading}>
                    Get User
                  </Button>
                </div>
              </div>
              
              {error && <p className="text-red-500 mb-4">{error}</p>}
              
              {loading ? (
                <p>Loading...</p>
              ) : selectedUser ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">ID</p>
                    <p className="font-medium">{selectedUser.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-medium">{selectedUser.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedUser.phone || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="font-medium">{selectedUser.role || 'User'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address Type</p>
                    <p className="font-medium">{selectedUser.addressType || 'Home'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{selectedUser.address || '-'}</p>
                  </div>
                  <div className="pt-4">
                    <Button 
                      variant="destructive" 
                      onClick={() => deleteUserById(selectedUser.id)}
                      disabled={loading}
                    >
                      Delete User
                    </Button>
                  </div>
                </div>
              ) : (
                <p>Enter a user email and click "Get User" to view user details</p>
              )}
            </div>
          </TabsContent>
          
          {/* Update User Tab */}
          <TabsContent value="update-user">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Update User</h2>
              
              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div>
                  <Label htmlFor="id">User ID (Required)</Label>
                  <Input
                    id="id"
                    name="id"
                    value={updateForm.id || ''}
                    onChange={handleInputChange}
                    placeholder="Enter user ID"
                    required
                  />
                  {formErrors.id && <p className="text-red-500 text-sm mt-1">{formErrors.id}</p>}
                </div>
                
                <div>
                  <Label htmlFor="fullName">Full Name (Required)</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={updateForm.fullName || ''}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                  />
                  {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
                </div>
                
                <div>
                  <Label htmlFor="email">Email (Required)</Label>
                  <Input
                    id="email"
                    name="email"
                    value={updateForm.email || ''}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    required
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
                
                {/* <div>
                  <Label htmlFor="password">Password (Optional)</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={updateForm.password || ''}
                    onChange={handleInputChange}
                    placeholder="Enter password (leave blank to keep current)"
                  />
                </div> */}
                
                <div>
                  <Label htmlFor="phone">Phone Number (Required)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={updateForm.phone || ''}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                </div>
                
                <div>
                  <Label htmlFor="role">Role (Required)</Label>
                  <Select 
                    value={updateForm.role || ''} 
                    onValueChange={(value) => handleSelectChange('role', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.role && <p className="text-red-500 text-sm mt-1">{formErrors.role}</p>}
                </div>
                
                <div>
                  <Label htmlFor="addressType">Address Type (Required)</Label>
                  <Select 
                    value={updateForm.addressType || ''} 
                    onValueChange={(value) => handleSelectChange('addressType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select address type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Work">Work</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.addressType && <p className="text-red-500 text-sm mt-1">{formErrors.addressType}</p>}
                </div>
                
                <div>
                  <Label htmlFor="address">Address (Required)</Label>
                  <Input
                    id="address"
                    name="address"
                    value={updateForm.address || ''}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                    required
                  />
                  {formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
                </div>
                
                {error && <p className="text-red-500">{error}</p>}
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading || Object.keys(formErrors).length > 0}
                  >
                    Update User
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UsersPage;