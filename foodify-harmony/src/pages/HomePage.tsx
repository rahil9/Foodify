import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CategoryList from '@/components/CategoryList';
import RestaurantList from '@/components/RestaurantList';
import { Category, Restaurant } from '@/types';
import api from '@/utils/axios'; // Adjust this import path to where your axios.ts is

const HomePage: React.FC = () => {
  // Set the default selected category to "All"
  const [selectedCategory, setSelectedCategory] = useState<Category>({ id: '0', name: 'All' });
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/restaurant-service/api/restaurant/restaurants');
      
      // Log the response to see what data structure we're getting
      console.log('Restaurant API response:', response.data);
      
      if (response.data && Array.isArray(response.data)) {
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Handle case where data is nested in a data property
        setRestaurants(response.data.data);
        setFilteredRestaurants(response.data.data);
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

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleSelectCategory = (category: Category) => {
    if (selectedCategory.id === category.id) {
      // If the same category is clicked again, do nothing (keep it selected)
      return;
    } else {
      setSelectedCategory(category);
      
      // If "All" category is selected, show all restaurants
      if (category.id === '0') {
        setFilteredRestaurants(restaurants);
      } else {
        // Filter restaurants by category
        const filtered = restaurants.filter((r) =>
          r.category.toLowerCase().includes(category.name.toLowerCase())
        );
        setFilteredRestaurants(filtered);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background-light">
      <Navbar />
      
      {/* Hero Header */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Delicious Food, Delivered Fast</h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Order from your favorite restaurants and enjoy your meal at home
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <CategoryList 
          onSelectCategory={handleSelectCategory} 
          selectedCategory={selectedCategory} 
        />
        
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading restaurants...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <RestaurantList 
            restaurants={filteredRestaurants} 
            title={selectedCategory.name === 'All' ? "All Restaurants" : `${selectedCategory.name} Restaurants`} 
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
