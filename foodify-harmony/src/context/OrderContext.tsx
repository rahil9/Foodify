import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { Order, CartItem, Address } from '@/types';
import { useAuth } from './AuthContext';
import api from '@/utils/axios';

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  error: string | null;
  createOrder: (restaurantId: string, restaurantName: string, items: CartItem[], totalAmount: number, 
                deliveryFee: number, serviceFee: number, paymentMethod: 'UPI' | 'Card' | 'Cash', 
                deliveryAddress: Address, estimatedDeliveryTime: string) => Order;
  getUserOrders: () => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  fetchUserOrders: () => Promise<void>;
  fetchOrderDetails: (orderId: string) => Promise<any>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const OrderContext = createContext<OrderContextType>({
  orders: [],
  loading: false,
  error: null,
  createOrder: () => ({} as Order),
  getUserOrders: () => [],
  getOrderById: () => undefined,
  fetchUserOrders: async () => {},
  fetchOrderDetails: async () => ({}),
  setOrders: () => {},
});

export const useOrder = () => useContext(OrderContext);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [restaurantCache, setRestaurantCache] = useState<Record<string, string>>({});
  const [menuItemCache, setMenuItemCache] = useState<Record<string, any>>({});
  const lastFetchedUserId = useRef<string | null>(null);

  const fetchRestaurantDetails = async (restaurantId: string) => {
    // Check cache first
    if (restaurantCache[restaurantId]) {
      return restaurantCache[restaurantId];
    }

    try {
      console.log('Fetching restaurant details for ID:', restaurantId);
      // Use the correct API endpoint
      const response = await api.get(`/restaurant-service/api/restaurant/${restaurantId}`);
      console.log('Restaurant API Response:', response.data);
      
      // Handle different possible response structures
      const restaurantName = response.data?.name || 
                           response.data?.data?.name || 
                           response.data?.restaurant?.name;
      
      if (!restaurantName) {
        throw new Error('Restaurant name not found in response');
      }
      
      // Update cache
      setRestaurantCache(prev => ({
        ...prev,
        [restaurantId]: restaurantName
      }));
      
      return restaurantName;
    } catch (err) {
      console.error('Error fetching restaurant details:', err);
      if (err instanceof Error) {
        console.error('Error details:', {
          message: err.message,
          stack: err.stack
        });
      }
      // Return a default name and cache it to prevent continuous retries
      const defaultName = `Restaurant ${restaurantId}`;
      setRestaurantCache(prev => ({
        ...prev,
        [restaurantId]: defaultName
      }));
      return defaultName;
    }
  };

  const fetchMenuItemDetails = async (menuItemId: string) => {
    // Check cache first
    if (menuItemCache[menuItemId]) {
      return menuItemCache[menuItemId];
    }

    try {
      console.log('Fetching menu item details for ID:', menuItemId);
      const response = await api.get(`/restaurant-service/api/menu-items/${menuItemId}`);
      console.log('Menu Item API Response:', response.data);
      
      // Handle different possible response structures
      const menuItem = response.data?.data || response.data;
      
      if (!menuItem) {
        throw new Error('Menu item not found in response');
      }
      
      // Update cache
      setMenuItemCache(prev => ({
        ...prev,
        [menuItemId]: menuItem
      }));
      
      return menuItem;
    } catch (err) {
      console.error('Error fetching menu item details:', err);
      if (err instanceof Error) {
        console.error('Error details:', {
          message: err.message,
          stack: err.stack
        });
      }
      // Return a default item and cache it to prevent continuous retries
      const defaultItem = {
        id: menuItemId,
        name: `Item ${menuItemId}`,
        price: 0,
        isVeg: false
      };
      setMenuItemCache(prev => ({
        ...prev,
        [menuItemId]: defaultItem
      }));
      return defaultItem;
    }
  };

  const fetchUserOrders = async () => {
    if (!user) return;
    
    // Prevent fetching if we're already loading or if we've already fetched for this user
    if (loading || lastFetchedUserId.current === user.id) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching orders for user:', user.id);
      const response = await api.get(`/order-service/api/orders/user/${user.id}`);
      console.log('API Response:', response.data);
      
      // Transform backend response to match frontend format
      const transformedOrders = await Promise.all(response.data.map(async (order: any) => {
        const restaurantName = await fetchRestaurantDetails(order.restaurantId);
        
        // Fetch menu item details for each order item
        const itemsWithDetails = await Promise.all(
          order.orderItems.map(async (item: any) => {
            const menuItemDetails = await fetchMenuItemDetails(item.menuItemId);
            return {
              id: item.menuItemId.toString(),
              quantity: item.quantity,
              name: menuItemDetails.name,
              price: menuItemDetails.price,
              isVeg: menuItemDetails.isVeg
            };
          })
        );
        
        return {
          id: order.orderId.toString(),
          userId: order.userId.toString(),
          restaurantId: order.restaurantId.toString(),
          restaurantName,
          items: itemsWithDetails,
          totalAmount: order.totalPrice,
          status: order.status,
          createdAt: new Date(order.createdAt)
        };
      }));
      
      console.log('Transformed orders:', transformedOrders);
      setOrders(transformedOrders);
      lastFetchedUserId.current = user.id;
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId: string) => {
    try {
      const response = await api.get(`/order-service/api/orders/${orderId}`);
      const order = response.data;
      
      // Fetch restaurant name
      const restaurantName = await fetchRestaurantDetails(order.restaurantId);
      
      // Fetch menu item details for each order item
      const itemsWithDetails = await Promise.all(
        order.orderItems.map(async (item: any) => {
          const menuItemDetails = await fetchMenuItemDetails(item.menuItemId);
          return {
            id: item.menuItemId.toString(),
            quantity: item.quantity,
            name: menuItemDetails.name,
            price: menuItemDetails.price,
            isVeg: menuItemDetails.isVeg
          };
        })
      );
      
      // Calculate total amount if not provided
      const totalAmount = order.totalPrice || 
        itemsWithDetails.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...order,
        restaurantName,
        items: itemsWithDetails,
        totalAmount
      };
    } catch (err) {
      console.error('Error fetching order details:', err);
      throw err;
    }
  };

  // Fetch orders when user changes
  useEffect(() => {
    if (user && user.id !== lastFetchedUserId.current) {
      fetchUserOrders();
    }
  }, [user?.id]); // Only depend on user.id instead of the entire user object

  const createOrder = (
    restaurantId: string,
    restaurantName: string,
    items: CartItem[],
    totalAmount: number,
    deliveryFee: number,
    serviceFee: number,
    paymentMethod: 'UPI' | 'Card' | 'Cash',
    deliveryAddress: Address,
    estimatedDeliveryTime: string
  ): Order => {
    if (!user) throw new Error('User must be authenticated to create an order');
    
    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: user.id,
      restaurantId,
      restaurantName,
      items,
      totalAmount,
      deliveryFee,
      serviceFee,
      status: 'Confirmed',
      paymentMethod,
      deliveryAddress,
      createdAt: new Date(),
      estimatedDeliveryTime
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);
    return newOrder;
  };

  const getUserOrders = (): Order[] => {
    if (!user) return [];
    console.log('Current orders state:', orders);
    const userOrders = orders.filter(order => order.userId === user.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    console.log('Filtered user orders:', userOrders);
    return userOrders;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      loading,
      error,
      createOrder,
      getUserOrders,
      getOrderById,
      fetchUserOrders,
      fetchOrderDetails,
      setOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};
