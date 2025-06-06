import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import { Button } from '@/components/ui/button';
import api from '@/utils/axios';

const OrderSuccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById, fetchOrderDetails } = useOrder();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadOrder = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // First try to get the order from local context
        let orderData = getOrderById(id);
        
        // If not found in local context, fetch from API
        if (!orderData) {
          console.log('Order not found in local context, fetching from API');
          orderData = await fetchOrderDetails(id);
        }
        
        if (orderData) {
          console.log('Order data loaded:', orderData);
          console.log('Transaction ID:', orderData.transactionId);
          
          // If no transaction ID is present, add a mock one for testing
          if (!orderData.transactionId) {
            orderData.transactionId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
            console.log('Added mock transaction ID:', orderData.transactionId);
          }
          
          setOrder(orderData);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        console.error('Error loading order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    
    loadOrder();
  }, [id, getOrderById, fetchOrderDetails]);
  
  useEffect(() => {
    if (!loading && !order && !error) {
      navigate('/');
    }
  }, [loading, order, error, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Order not found'}</p>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary-hover">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const formattedDate = new Date(order.createdAt).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">Thank you for your order.</p>
        </div>
        
        <div className="border-t border-b border-gray-100 py-4 mb-6">
          <div className="mb-4">
            <h2 className="font-medium mb-2">Order Details</h2>
            <p className="text-sm text-gray-600 mb-1">Order ID: {order.id}</p>
            <p className="text-sm text-gray-600">Placed on: {formattedDate}</p>
          </div>
          
          <div className="mb-4">
            <h2 className="font-medium mb-2">Delivery Details</h2>
            <p className="text-sm text-gray-600 mb-1">
              Estimated Delivery: {order.estimatedDeliveryTime}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              {order.deliveryAddress.type}: {order.deliveryAddress.street}
            </p>
          </div>
          
          <div>
            <h2 className="font-medium mb-2">Payment Details</h2>
            <p className="text-sm text-gray-600 mb-1">
              Method: {order.paymentMethod}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Transaction ID: {order.transactionId || 'Not available'}
            </p>
            <p className="text-sm text-gray-600">
              Total Amount: ₹{order.totalAmount + order.deliveryFee + order.serviceFee}
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Link to="/">
            <Button className="bg-primary hover:bg-primary-hover">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
