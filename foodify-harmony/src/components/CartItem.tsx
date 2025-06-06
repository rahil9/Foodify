
import React from 'react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { menuItem, quantity } = item;

  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-100">
      <div className="flex-1">
        <div className="flex items-center mb-1">
          {/* {menuItem.isVeg ? (
            <span className="inline-block h-4 w-4 border border-green-500 mr-2 rounded-sm">
              <span className="block h-2 w-2 bg-green-500 m-[3px] rounded-sm"></span>
            </span>
          ) : (
            <span className="inline-block h-4 w-4 border border-red-500 mr-2">
              <span className="block h-2 w-2 bg-red-500 m-[3px]"></span>
            </span>
          )} */}

          <div className="mr-2">
            {menuItem.isVeg ? (
              <div className="w-4 h-4 border-2 border-green-500 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
              </div>
            ) : (
              <div className="w-4 h-4 border-2 border-red-500 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-sm"></div>
              </div>
            )}
          </div>
          <h3 className="font-medium">{menuItem.name}</h3>
        </div>
        <p className="text-sm text-gray-500">₹{menuItem.price}</p>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center bg-white border border-gray-200 rounded-md overflow-hidden mr-4">
          <button
            className="btn-quantity"
            onClick={() => updateQuantity(menuItem.id, quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button
            className="btn-quantity"
            onClick={() => updateQuantity(menuItem.id, quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        <p className="font-medium">₹{menuItem.price * quantity}</p>
      </div>
    </div>
  );
};

export default CartItem;
