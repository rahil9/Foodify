
import React from 'react';
import RestaurantCard from './RestaurantCard';
import { Restaurant } from '@/types';

interface RestaurantListProps {
  restaurants: Restaurant[];
  title?: string;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ 
  restaurants,
  title = "All Restaurants" 
}) => {
  if (restaurants.length === 0) {
    return (
      <div className="py-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="text-center py-10">
          <p className="text-gray-500">No restaurants found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
