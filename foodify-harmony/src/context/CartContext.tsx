
import React, { createContext, useState, useContext, useEffect } from 'react';
import { CartItem, MenuItem, Restaurant } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface CartContextType {
  items: CartItem[];
  restaurant: Restaurant | null;
  addItem: (item: MenuItem, restaurant: Restaurant) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  getItemQuantity: (itemId: string) => number;
  deliveryFee: number;
  serviceFee: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  restaurant: null,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getItemCount: () => 0,
  getItemQuantity: () => 0,
  deliveryFee: 40,
  serviceFee: 20,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const deliveryFee = 40; // ₹40
  const serviceFee = 20; // ₹20

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem('cart');
    const storedRestaurant = localStorage.getItem('restaurant');
    
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
    
    if (storedRestaurant) {
      setRestaurant(JSON.parse(storedRestaurant));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items));
    } else {
      localStorage.removeItem('cart');
    }
  }, [items]);

  // Save restaurant to localStorage whenever it changes
  useEffect(() => {
    if (restaurant) {
      localStorage.setItem('restaurant', JSON.stringify(restaurant));
    } else {
      localStorage.removeItem('restaurant');
    }
  }, [restaurant]);

  const addItem = (item: MenuItem, itemRestaurant: Restaurant) => {
    // Check if user is trying to add items from different restaurant
    if (restaurant && restaurant.id !== itemRestaurant.id) {
      toast({
        title: "New Restaurant Selected",
        description: "Your cart has been cleared as you selected items from a different restaurant.",
        variant: "destructive"
      });
      setItems([]);
      setRestaurant(itemRestaurant);
    } else if (!restaurant) {
      setRestaurant(itemRestaurant);
    }

    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.menuItem.id === item.id);
      
      if (existingItem) {
        return prevItems.map(i => 
          i.menuItem.id === item.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
      } else {
        return [...prevItems, { menuItem: item, quantity: 1 }];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(item => item.menuItem.id !== itemId);
      
      if (newItems.length === 0) {
        setRestaurant(null);
      }
      
      return newItems;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.menuItem.id === itemId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setRestaurant(null);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const getItemQuantity = (itemId: string) => {
    const item = items.find(i => i.menuItem.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{
      items,
      restaurant,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getCartTotal,
      getItemCount,
      getItemQuantity,
      deliveryFee,
      serviceFee
    }}>
      {children}
    </CartContext.Provider>
  );
};
