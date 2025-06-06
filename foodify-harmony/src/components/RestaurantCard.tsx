import React from 'react';
import { Link } from 'react-router-dom';
import { Restaurant } from '@/types';
import { StarIcon, MapPin } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card block">
      <div className="relative h-48 bg-gray-200">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Restaurant';
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center space-x-1 text-white">
            <div className="bg-primary px-2 py-1 rounded-md flex items-center">
              <StarIcon className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">{restaurant.rating}</span>
            </div>
            <span className="text-sm">•</span>
            <span className="text-sm">{restaurant.deliveryTime} min</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{restaurant.category}</p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <p className="truncate">{restaurant.address || "Location information unavailable"}</p>
        </div>
        <p className="text-sm text-gray-500">₹{restaurant.minOrderAmount} minimum order</p>
      </div>
    </Link>
  );
};

export default RestaurantCard;
