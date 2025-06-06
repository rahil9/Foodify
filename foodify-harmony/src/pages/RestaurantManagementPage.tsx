import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import api from '@/utils/axios';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define the restaurant type for management
interface Restaurant {
  id: string;
  name: string;
  rating: number;
  address: string;
  location: string;
  category: string;
  description: string;
  minOrderAmount: number;
  deliveryTime: number;
  image: string;
}

// Define the MenuItem type
interface MenuItem {
  id?: string;
  restaurantId: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isVeg: boolean;
}

const RestaurantManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restaurantId, setRestaurantId] = useState('');
  
  // Form state for adding a new restaurant
  const [newRestaurant, setNewRestaurant] = useState<Omit<Restaurant, 'id'>>({
    name: '',
    rating: 0,
    address: '',
    location: '',
    category: '',
    description: '',
    minOrderAmount: 0,
    deliveryTime: 0,
    image: '',
  });

  // Add state for updating a restaurant
  const [updateRestaurant, setUpdateRestaurant] = useState<Restaurant>({
    id: '',
    name: '',
    rating: 0,
    address: '',
    location: '',
    category: '',
    description: '',
    minOrderAmount: 0,
    deliveryTime: 0,
    image: '',
  });

  // Add state for menu item forms
  const [newMenuItem, setNewMenuItem] = useState<MenuItem>({
    restaurantId: 0,
    name: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    isVeg: true
  });

  const [updateMenuItem, setUpdateMenuItem] = useState<MenuItem>({
    id: '',
    restaurantId: 0,
    name: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    isVeg: true
  });

  const [menuItemIdToDelete, setMenuItemIdToDelete] = useState('');

  // Fetch all restaurants
  const fetchAllRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/restaurant-service/api/restaurant/restaurants');
      
      if (response.data && Array.isArray(response.data)) {
        setRestaurants(response.data);
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Handle case where data is nested in a data property
        setRestaurants(response.data.data);
      } else {
        setError('Failed to fetch restaurants: Invalid response format');
        console.error('Invalid response format:', response.data);
      }
    } catch (error: any) {
      console.error('Error fetching restaurants:', error);
      setError(`Failed to fetch restaurants: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Get restaurant by ID
  const getRestaurantById = async () => {
    if (!restaurantId) {
      setError('Please enter a restaurant ID');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/restaurant-service/api/restaurant/${restaurantId}`);
      
      if (response.data) {
        setSelectedRestaurant(response.data);
      } else {
        setError('Restaurant not found');
        setSelectedRestaurant(null);
      }
    } catch (error: any) {
      console.error('Error fetching restaurant:', error);
      setError(`Failed to fetch restaurant: ${error.response?.data?.message || error.message || 'Unknown error'}`);
      setSelectedRestaurant(null);
    } finally {
      setLoading(false);
    }
  };

  // Delete restaurant by ID
  const deleteRestaurantById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/restaurant-service/api/restaurant/${id}`);
      toast({
        title: 'Success',
        description: 'Restaurant deleted successfully',
      });
      // Refresh the restaurants list
      fetchAllRestaurants();
      // Clear selected restaurant if it was the deleted one
      if (selectedRestaurant && selectedRestaurant.id === id) {
        setSelectedRestaurant(null);
      }
    } catch (error: any) {
      console.error('Error deleting restaurant:', error);
      setError(`Failed to delete restaurant: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Add a new restaurant
  const handleAddRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/restaurant-service/api/restaurant', newRestaurant);
      
      if (response.data) {
        toast({
          title: 'Success',
          description: 'Restaurant added successfully',
        });
        
        // Reset form
        setNewRestaurant({
          name: '',
          rating: 0,
          address: '',
          location: '',
          category: '',
          description: '',
          minOrderAmount: 0,
          deliveryTime: 0,
          image: '',
        });
        
        // Refresh the restaurants list
        fetchAllRestaurants();
      } else {
        setError('Failed to add restaurant: No response data');
      }
    } catch (error: any) {
      console.error('Error adding restaurant:', error);
      setError(`Failed to add restaurant: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRestaurant(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'minOrderAmount' || name === 'deliveryTime'
        ? parseFloat(value)
        : value
    }));
  };

  // Handle menu item creation
  const handleCreateMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/restaurant-service/api/menu-items', newMenuItem);
      
      if (response.data) {
        toast({
          title: 'Success',
          description: 'Menu item created successfully',
        });
        
        // Reset form
        setNewMenuItem({
          restaurantId: 0,
          name: '',
          price: 0,
          description: '',
          category: '',
          image: '',
          isVeg: true
        });
      }
    } catch (error: any) {
      console.error('Error creating menu item:', error);
      setError(`Failed to create menu item: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle menu item update
  const handleUpdateMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateMenuItem.id) {
      setError('Please enter a menu item ID');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.put(`/restaurant-service/api/menu-items/${updateMenuItem.id}`, updateMenuItem);
      
      if (response.data) {
        toast({
          title: 'Success',
          description: 'Menu item updated successfully',
        });
      }
    } catch (error: any) {
      console.error('Error updating menu item:', error);
      setError(`Failed to update menu item: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Add delete menu item function
  const handleDeleteMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuItemIdToDelete) {
      setError('Please enter a menu item ID');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      
      await api.delete(`/restaurant-service/api/menu-items/${menuItemIdToDelete}`);
      
      toast({
        title: 'Success',
        description: 'Menu item deleted successfully',
      });
      
      // Reset form
      setMenuItemIdToDelete('');
    } catch (error: any) {
      console.error('Error deleting menu item:', error);
      setError(`Failed to delete menu item: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Add update restaurant function
  const handleUpdateRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateRestaurant.id) {
      setError('Please enter a restaurant ID');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      
      // Send the update request to the API
      const response = await api.put(`/restaurant-service/api/restaurant/${updateRestaurant.id}`, updateRestaurant);
      
      if (response.data) {
        toast({
          title: 'Success',
          description: 'Restaurant updated successfully',
        });
        
        // Refresh the restaurants list
        fetchAllRestaurants();
        
        // Clear the update form
        setUpdateRestaurant({
          id: '',
          name: '',
          rating: 0,
          address: '',
          location: '',
          category: '',
          description: '',
          minOrderAmount: 0,
          deliveryTime: 0,
          image: '',
        });
      }
    } catch (error: any) {
      console.error('Error updating restaurant:', error);
      setError(`Failed to update restaurant: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Load all restaurants when the component mounts
  useEffect(() => {
    fetchAllRestaurants();
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
        <h1 className="text-2xl font-bold mb-6">Restaurant Management</h1>
        
        <Tabs defaultValue="all-restaurants" className="w-full">
          <TabsList className="grid grid-cols-8 mb-6">
            <TabsTrigger value="all-restaurants">All Restaurants</TabsTrigger>
            <TabsTrigger value="add-restaurant">Add Restaurant</TabsTrigger>
            <TabsTrigger value="get-by-id">Get Restaurant</TabsTrigger>
            <TabsTrigger value="update-restaurant">Update Restaurant</TabsTrigger>
            <TabsTrigger value="delete-restaurant">Delete Restaurant</TabsTrigger>
            <TabsTrigger value="create-menu-item">Create Menu Item</TabsTrigger>
            <TabsTrigger value="update-menu-item">Update Menu Item</TabsTrigger>
            <TabsTrigger value="delete-menu-item">Delete Menu Item</TabsTrigger>
          </TabsList>
          
          {/* All Restaurants Tab */}
          <TabsContent value="all-restaurants">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">All Restaurants</h2>
              
              {error && <p className="text-red-500 mb-4">{error}</p>}
              
              {loading ? (
                <p>Loading...</p>
              ) : restaurants.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {restaurants.map((restaurant) => (
                        <tr key={restaurant.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{restaurant.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{restaurant.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{restaurant.rating}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{restaurant.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{restaurant.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteRestaurantById(restaurant.id)}
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
                <p>No restaurants found</p>
              )}
            </div>
          </TabsContent>
          
          {/* Add Restaurant Tab */}
          <TabsContent value="add-restaurant">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Add New Restaurant</h2>
              
              <form onSubmit={handleAddRestaurant} className="space-y-4">
                <div>
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newRestaurant.name}
                    onChange={handleInputChange}
                    placeholder="Enter restaurant name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={newRestaurant.rating}
                    onChange={handleInputChange}
                    placeholder="Enter rating (1-5)"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={newRestaurant.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={newRestaurant.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={newRestaurant.category}
                    onChange={handleInputChange}
                    placeholder="Enter category (e.g., Burger, Pizza, etc.)"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={newRestaurant.description}
                    onChange={handleInputChange}
                    placeholder="Enter description"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="minOrderAmount">Minimum Order Amount</Label>
                  <Input
                    id="minOrderAmount"
                    name="minOrderAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newRestaurant.minOrderAmount}
                    onChange={handleInputChange}
                    placeholder="Enter minimum order amount"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="deliveryTime">Delivery Time (minutes)</Label>
                  <Input
                    id="deliveryTime"
                    name="deliveryTime"
                    type="number"
                    min="0"
                    value={newRestaurant.deliveryTime}
                    onChange={handleInputChange}
                    placeholder="Enter delivery time in minutes"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={newRestaurant.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    required
                  />
                </div>
                
                {error && <p className="text-red-500">{error}</p>}
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading}
                  >
                    Add Restaurant
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
          
          {/* Get Restaurant by ID Tab */}
          <TabsContent value="get-by-id">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Get Restaurant by ID</h2>
              
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="restaurantId">Restaurant ID</Label>
                  <Input
                    id="restaurantId"
                    value={restaurantId}
                    onChange={(e) => setRestaurantId(e.target.value)}
                    placeholder="Enter restaurant ID"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={getRestaurantById} disabled={loading}>
                    Get Restaurant
                  </Button>
                </div>
              </div>
              
              {error && <p className="text-red-500 mb-4">{error}</p>}
              
              {loading ? (
                <p>Loading...</p>
              ) : selectedRestaurant ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">ID</p>
                    <p className="font-medium">{selectedRestaurant.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedRestaurant.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="font-medium">{selectedRestaurant.rating}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{selectedRestaurant.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{selectedRestaurant.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-medium">{selectedRestaurant.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="font-medium">{selectedRestaurant.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Minimum Order Amount</p>
                    <p className="font-medium">{selectedRestaurant.minOrderAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Time (minutes)</p>
                    <p className="font-medium">{selectedRestaurant.deliveryTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Image</p>
                    <img 
                      src={selectedRestaurant.image} 
                      alt={selectedRestaurant.name} 
                      className="mt-2 max-w-xs rounded-md"
                    />
                  </div>
                  <div className="pt-4">
                    <Button 
                      variant="destructive" 
                      onClick={() => deleteRestaurantById(selectedRestaurant.id)}
                      disabled={loading}
                    >
                      Delete Restaurant
                    </Button>
                  </div>
                </div>
              ) : (
                <p>Enter a restaurant ID and click "Get Restaurant" to view restaurant details</p>
              )}
            </div>
          </TabsContent>
          
          {/* Update Restaurant Tab */}
          <TabsContent value="update-restaurant">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Update Restaurant</h2>
              
              <form onSubmit={handleUpdateRestaurant} className="space-y-4">
                <div>
                  <Label htmlFor="updateRestaurantId">Restaurant ID</Label>
                  <Input
                    id="updateRestaurantId"
                    value={updateRestaurant.id}
                    onChange={(e) => setUpdateRestaurant(prev => ({ ...prev, id: e.target.value }))}
                    placeholder="Enter restaurant ID"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="updateRestaurantName">Restaurant Name</Label>
                  <Input
                    id="updateRestaurantName"
                    value={updateRestaurant.name}
                    onChange={(e) => setUpdateRestaurant(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter restaurant name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="updateRestaurantRating">Rating (1-5)</Label>
                  <Input
                    id="updateRestaurantRating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={updateRestaurant.rating}
                    onChange={(e) => setUpdateRestaurant(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                    placeholder="Enter rating (1-5)"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="updateRestaurantAddress">Address</Label>
                  <Input
                    id="updateRestaurantAddress"
                    value={updateRestaurant.address}
                    onChange={(e) => setUpdateRestaurant(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter address"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="updateRestaurantLocation">Location</Label>
                  <Input
                    id="updateRestaurantLocation"
                    value={updateRestaurant.location}
                    onChange={(e) => setUpdateRestaurant(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter location"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="updateRestaurantCategory">Category</Label>
                  <Input
                    id="updateRestaurantCategory"
                    value={updateRestaurant.category}
                    onChange={(e) => setUpdateRestaurant(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Enter category (e.g., Burger, Pizza, etc.)"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="updateRestaurantDescription">Description</Label>
                  <Input
                    id="updateRestaurantDescription"
                    value={updateRestaurant.description}
                    onChange={(e) => setUpdateRestaurant(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter description"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="updateRestaurantMinOrderAmount">Minimum Order Amount</Label>
                  <Input
                    id="updateRestaurantMinOrderAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={updateRestaurant.minOrderAmount}
                    onChange={(e) => setUpdateRestaurant(prev => ({ ...prev, minOrderAmount: parseFloat(e.target.value) }))}
                    placeholder="Enter minimum order amount"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="updateRestaurantDeliveryTime">Delivery Time (minutes)</Label>
                  <Input
                    id="updateRestaurantDeliveryTime"
                    type="number"
                    min="0"
                    value={updateRestaurant.deliveryTime}
                    onChange={(e) => setUpdateRestaurant(prev => ({ ...prev, deliveryTime: parseInt(e.target.value) }))}
                    placeholder="Enter delivery time in minutes"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="updateRestaurantImage">Image URL</Label>
                  <Input
                    id="updateRestaurantImage"
                    value={updateRestaurant.image}
                    onChange={(e) => setUpdateRestaurant(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="Enter image URL"
                    required
                  />
                </div>
                
                {error && <p className="text-red-500">{error}</p>}
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading}
                  >
                    Update Restaurant
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
          
          {/* Delete Restaurant Tab */}
          <TabsContent value="delete-restaurant">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Delete Restaurant</h2>
              
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="deleteRestaurantId">Restaurant ID</Label>
                  <Input
                    id="deleteRestaurantId"
                    value={restaurantId}
                    onChange={(e) => setRestaurantId(e.target.value)}
                    placeholder="Enter restaurant ID"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    variant="destructive" 
                    onClick={() => deleteRestaurantById(restaurantId)}
                    disabled={loading || !restaurantId}
                  >
                    Delete Restaurant
                  </Button>
                </div>
              </div>
              
              {error && <p className="text-red-500 mb-4">{error}</p>}
              
              <p className="text-sm text-gray-500">
                Warning: This action cannot be undone. Please be sure you want to delete this restaurant.
              </p>
            </div>
          </TabsContent>

          {/* Create Menu Item Tab */}
          <TabsContent value="create-menu-item">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Create Menu Item</h2>
              
              <form onSubmit={handleCreateMenuItem} className="space-y-4">
                <div>
                  <Label htmlFor="menuItemRestaurantId">Restaurant ID</Label>
                  <Input
                    id="menuItemRestaurantId"
                    type="number"
                    value={newMenuItem.restaurantId}
                    onChange={(e) => setNewMenuItem(prev => ({ ...prev, restaurantId: parseInt(e.target.value) }))}
                    placeholder="Enter restaurant ID"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="menuItemName">Name</Label>
                  <Input
                    id="menuItemName"
                    value={newMenuItem.name}
                    onChange={(e) => setNewMenuItem(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter menu item name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="menuItemPrice">Price</Label>
                  <Input
                    id="menuItemPrice"
                    type="number"
                    value={newMenuItem.price}
                    onChange={(e) => setNewMenuItem(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="menuItemDescription">Description</Label>
                  <Input
                    id="menuItemDescription"
                    value={newMenuItem.description}
                    onChange={(e) => setNewMenuItem(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter description"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="menuItemCategory">Category</Label>
                  <Input
                    id="menuItemCategory"
                    value={newMenuItem.category}
                    onChange={(e) => setNewMenuItem(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Enter category"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="menuItemImage">Image URL</Label>
                  <Input
                    id="menuItemImage"
                    value={newMenuItem.image}
                    onChange={(e) => setNewMenuItem(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="Enter image URL"
                    required
                  />
                </div>

                <div>
                  <Label>Is Vegetarian</Label>
                  <RadioGroup
                    value={newMenuItem.isVeg ? "yes" : "no"}
                    onValueChange={(value) => setNewMenuItem(prev => ({ ...prev, isVeg: value === "yes" }))}
                    className="flex space-x-4 mt-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="menuItemVegYes" />
                      <Label htmlFor="menuItemVegYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="menuItemVegNo" />
                      <Label htmlFor="menuItemVegNo">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <div className="pt-4">
                  <Button type="submit" disabled={loading}>
                    Create Menu Item
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>

          {/* Update Menu Item Tab */}
          <TabsContent value="update-menu-item">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Update Menu Item</h2>
              
              <form onSubmit={handleUpdateMenuItem} className="space-y-4">
                <div>
                  <Label htmlFor="updateMenuItemId">Menu Item ID</Label>
                  <Input
                    id="updateMenuItemId"
                    value={updateMenuItem.id}
                    onChange={(e) => setUpdateMenuItem(prev => ({ ...prev, id: e.target.value }))}
                    placeholder="Enter menu item ID"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="updateMenuItemRestaurantId">Restaurant ID</Label>
                  <Input
                    id="updateMenuItemRestaurantId"
                    type="number"
                    value={updateMenuItem.restaurantId}
                    onChange={(e) => setUpdateMenuItem(prev => ({ ...prev, restaurantId: parseInt(e.target.value) }))}
                    placeholder="Enter restaurant ID"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="updateMenuItemName">Name</Label>
                  <Input
                    id="updateMenuItemName"
                    value={updateMenuItem.name}
                    onChange={(e) => setUpdateMenuItem(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter menu item name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="updateMenuItemPrice">Price</Label>
                  <Input
                    id="updateMenuItemPrice"
                    type="number"
                    value={updateMenuItem.price}
                    onChange={(e) => setUpdateMenuItem(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="updateMenuItemDescription">Description</Label>
                  <Input
                    id="updateMenuItemDescription"
                    value={updateMenuItem.description}
                    onChange={(e) => setUpdateMenuItem(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter description"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="updateMenuItemCategory">Category</Label>
                  <Input
                    id="updateMenuItemCategory"
                    value={updateMenuItem.category}
                    onChange={(e) => setUpdateMenuItem(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Enter category"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="updateMenuItemImage">Image URL</Label>
                  <Input
                    id="updateMenuItemImage"
                    value={updateMenuItem.image}
                    onChange={(e) => setUpdateMenuItem(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="Enter image URL"
                    required
                  />
                </div>

                <div>
                  <Label>Is Vegetarian</Label>
                  <RadioGroup
                    value={updateMenuItem.isVeg ? "yes" : "no"}
                    onValueChange={(value) => setUpdateMenuItem(prev => ({ ...prev, isVeg: value === "yes" }))}
                    className="flex space-x-4 mt-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="updateMenuItemVegYes" />
                      <Label htmlFor="updateMenuItemVegYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="updateMenuItemVegNo" />
                      <Label htmlFor="updateMenuItemVegNo">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <div className="pt-4">
                  <Button type="submit" disabled={loading}>
                    Update Menu Item
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>

          {/* Delete Menu Item Tab */}
          <TabsContent value="delete-menu-item">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Delete Menu Item</h2>
              
              <form onSubmit={handleDeleteMenuItem} className="space-y-4">
                <div>
                  <Label htmlFor="deleteMenuItemId">Menu Item ID</Label>
                  <Input
                    id="deleteMenuItemId"
                    value={menuItemIdToDelete}
                    onChange={(e) => setMenuItemIdToDelete(e.target.value)}
                    placeholder="Enter menu item ID"
                    required
                  />
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    variant="destructive"
                    disabled={loading || !menuItemIdToDelete}
                  >
                    Delete Menu Item
                  </Button>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Warning: This action cannot be undone. Please be sure you want to delete this menu item.
                </p>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RestaurantManagementPage; 