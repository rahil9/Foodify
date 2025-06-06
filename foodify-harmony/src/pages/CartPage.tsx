import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import api from '@/utils/axios';

const CartPage: React.FC = () => {
  const { items, restaurant, getCartTotal, clearCart, deliveryFee, serviceFee } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee + serviceFee;
  
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to continue with checkout",
        variant: "destructive",
      });
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    if (!restaurant) {
      toast({
        title: "Error",
        description: "No restaurant selected",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Authentication Error",
        description: "Please login again to continue",
        variant: "destructive",
      });
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    navigate('/checkout');
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background-light">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-gray-600 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Add delicious items from restaurants to get started</p>
            <Link to="/">
              <Button className="bg-primary hover:bg-primary-hover">
                Browse Restaurants
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background-light">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Your Cart</h1>
                <button 
                  className="text-sm text-primary hover:text-primary-hover"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
              
              {restaurant && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <h2 className="font-medium">{restaurant.name}</h2>
                  <p className="text-sm text-gray-600">{restaurant.deliveryTime} • Delivery</p>
                </div>
              )}
              
              <div>
                {items.map(item => (
                  <CartItem key={item.menuItem.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="font-bold text-lg mb-4">Bill Details</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Item Total</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee</span>
                  <span>₹{serviceFee}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-primary hover:bg-primary-hover"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
