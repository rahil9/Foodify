import React from 'react';
import { MenuItem as MenuItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { Restaurant } from '@/types';
import { Plus, Minus } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
  restaurant: Restaurant;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, restaurant }) => {
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const quantity = getItemQuantity(item.id);

  return (
    <div className="menu-item">
      <div className="flex-1 pr-4">
        <div className="flex items-center mb-1">
          <div className="mr-2">
            {item.isVeg ? (
              <div className="w-4 h-4 border-2 border-green-500 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
              </div>
            ) : (
              <div className="w-4 h-4 border-2 border-red-500 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-sm"></div>
              </div>
            )}
          </div>
          <h3 className="font-semibold">{item.name}</h3>
        </div>
        <p className="text-sm text-gray-500 mb-1">₹{item.price}</p>
        <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
      </div>
      <div className="w-20 h-20 relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=Food';
          }}
        />
        <div className="absolute -bottom-2 right-0 left-0 flex justify-center">
          {quantity === 0 ? (
            <button
              className="btn-primary text-sm px-3 py-1"
              onClick={() => addItem(item, restaurant)}
            >
              Add
            </button>
          ) : (
            <div className="flex items-center bg-white border border-gray-200 rounded-md overflow-hidden">
              <button
                className="btn-quantity"
                onClick={() => updateQuantity(item.id, quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                className="btn-quantity"
                onClick={() => updateQuantity(item.id, quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
