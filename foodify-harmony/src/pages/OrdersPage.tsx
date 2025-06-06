import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useOrder } from '@/context/OrderContext';
import { Button } from '@/components/ui/button';

const OrdersPage: React.FC = () => {
  const { orders, loading, error, fetchUserOrders } = useOrder();

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-light">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-red-600">Error Loading Orders</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button 
              onClick={() => fetchUserOrders()} 
              className="bg-primary hover:bg-primary-hover"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-background-light">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">Start ordering your favorite food!</p>
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
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <Link 
              key={order.id} 
              to={`/orders/${order.id}`}
              className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h2 className="text-lg font-semibold">{order.restaurantName}</h2>
                  <p className="text-gray-600 mt-1">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium mr-4 ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                  <span className="font-bold">₹{order.totalAmount}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
