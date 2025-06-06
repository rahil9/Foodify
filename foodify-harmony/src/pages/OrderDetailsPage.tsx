import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchOrderDetails } = useOrder();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadOrderDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const orderData = await fetchOrderDetails(id);
        console.log('Order details loaded:', orderData);
        setOrder(orderData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    
    loadOrderDetails();
  }, [id, fetchOrderDetails]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background-light">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="min-h-screen bg-background-light">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-red-600">Error Loading Order</h2>
            <p className="text-gray-600 mb-6">{error || 'Order not found'}</p>
            <Button 
              onClick={() => navigate('/orders')} 
              className="bg-primary hover:bg-primary-hover"
            >
              Back to Orders
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const formattedDate = new Date(order.createdAt).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Calculate subtotal from items
  const subtotal = order.items.reduce((total: number, item: any) => 
    total + (item.price * item.quantity), 0);
  
  // Get delivery fee and service fee from order or use defaults
  const deliveryFee = order.deliveryFee || 40;
  const serviceFee = order.serviceFee || Math.round(subtotal * 0.05); // 5% of subtotal
  
  // Calculate total
  const total = order.totalAmount || (subtotal + deliveryFee + serviceFee);
  
  return (
    <div className="min-h-screen bg-background-light">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/orders" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">{order.restaurantName}</h1>
              <p className="text-gray-600 mt-1">Order placed on {formattedDate}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    {item.isVeg ? (
                      <div className="w-4 h-4 border-2 border-green-500 rounded-sm flex items-center justify-center mr-2">
                        <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                      </div>
                    ) : (
                      <div className="w-4 h-4 border-2 border-red-500 rounded-sm flex items-center justify-center mr-2">
                        <div className="w-2 h-2 bg-red-500 rounded-sm"></div>
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{item.price}</p>
                    <p className="text-sm text-gray-600">Total: ₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Service Fee</span>
                <span>₹{serviceFee}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="font-medium">Total Amount</span>
                <span className="font-bold">₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
