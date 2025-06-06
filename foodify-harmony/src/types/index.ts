export interface User {
  id: string;
  fullName: string;
  // password: string;
  email: string;
  phone?: string;
  role?: string;
  address?: string;
  addressType?: string;
}

export interface Address {
  address?: string;
  addressType?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Restaurant {
  id: number;
  name: string;
  category: string;
  address: string;
  location: string;
  rating: number;
  description: string;
  minOrderAmount: number;
  deliveryTime: number;
  image: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  totalAmount: number;
  deliveryFee: number;
  serviceFee: number;
  status: 'Pending' | 'Confirmed' | 'Delivered' | 'Cancelled';
  paymentMethod: 'UPI' | 'Card' | 'Cash';
  deliveryAddress: Address;
  createdAt: Date;
  estimatedDeliveryTime: string;
  transactionId?: string;
}
