import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useOrder } from '@/context/OrderContext';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Address } from '@/types';
import api from '@/utils/axios';

type PaymentMethod = 'UPI' | 'Card' | 'Cash';

const CheckoutPage: React.FC = () => {
  const { items, restaurant, getCartTotal, clearCart, deliveryFee, serviceFee } = useCart();
  const { user } = useAuth();
  const { createOrder, setOrders } = useOrder();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState<string>('');
  const [addressType, setAddressType] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee + serviceFee;

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.email) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await api.post('/user-service/api/user/profile', {
          email: user.email
        });
        
        if (response.data && response.data.success && response.data.data) {
          const profileData = response.data.data;
          setAddress(profileData.address || '');
          setAddressType(profileData.addressType || '');
        } else {
          setError('No address information found in profile');
        }
      } catch (err: any) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load profile information. Please try again.');
        toast({
          title: "Error",
          description: "Failed to load delivery address from profile",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);
  
  if (!user || items.length === 0 || !restaurant) {
    navigate('/');
    return null;
  }
  
  const handlePlaceOrder = async () => {
    try {
      if (!address) {
        toast({
          title: "Error",
          description: "No delivery address found in your profile",
          variant: "destructive",
        });
        return;
      }
      
      if (paymentMethod === 'UPI' && !upiId) {
        toast({
          title: "Error",
          description: "Please enter your UPI ID",
          variant: "destructive",
        });
        return;
      }
      
      const deliveryAddress = {
        id: '1', // Since we're using a single address from profile
        type: addressType,
        street: address,
        city: '', // These fields aren't available in the profile
        state: '',
        zip: ''
      };
      
      // Create order request
      const orderRequest = {
        userId: parseInt(user?.id || '0'),
        restaurantId: restaurant.id,
        totalPrice: total,
        orderItems: items.map(item => ({
          menuItemId: parseInt(item.menuItem.id),
          quantity: item.quantity
        }))
      };

      console.log('Sending order request:', orderRequest);

      // Create order using API
      const response = await api.post('/order-service/api/orders', orderRequest);
      
      console.log('Order creation response:', response.data);
      
      if (response.data) {
        // Get the order ID from the response
        const orderId = response.data.orderId || response.data.id;
        
        // Map payment method to the format expected by the payment service
        let paymentMethodValue = "CARD";
        if (paymentMethod === 'UPI') {
          paymentMethodValue = "UPI";
        } else if (paymentMethod === 'Cash') {
          paymentMethodValue = "COD";
        }
        
        // Initiate payment
        let transactionId = '';
        try {
          const paymentResponse = await api.post('/payment-service/api/payments/initiate', {
            orderId: orderId,
            method: paymentMethodValue
          });
          
          console.log('Payment initiation response:', paymentResponse.data);
          
          // Extract transaction ID from payment response
          transactionId = paymentResponse.data.transactionId || 
                         paymentResponse.data.id || 
                         paymentResponse.data.paymentId || 
                         '';
          
          console.log('Extracted transaction ID:', transactionId);
          
          // If no transaction ID was found, generate a mock one for testing
          if (!transactionId) {
            transactionId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
            console.log('Generated mock transaction ID:', transactionId);
          }
        } catch (paymentError) {
          console.error('Error initiating payment:', paymentError);
          // Generate a mock transaction ID if payment initiation fails
          transactionId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
          console.log('Generated mock transaction ID after error:', transactionId);
        }
        
        // Create order in local context with the actual order ID from the API
        const order = {
          id: orderId.toString(),
          userId: user?.id || '',
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          items: items,
          totalAmount: subtotal,
          deliveryFee: deliveryFee,
          serviceFee: serviceFee,
          status: 'Confirmed',
          paymentMethod: paymentMethod,
          deliveryAddress: deliveryAddress,
          createdAt: new Date(),
          estimatedDeliveryTime: restaurant.deliveryTime,
          transactionId: transactionId // Add transaction ID to the order
        };
        
        // Add the order to the context
        setOrders(prevOrders => [...prevOrders, order]);
        
        // Clear cart
        clearCart();
        
        toast({
          title: "Success",
          description: "Order placed successfully!",
        });
        
        // Redirect to order success page with the actual order ID
        navigate(`/order-success/${orderId}`);
      }
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to place order. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-background-light">
      <div className="container mx-auto px-4 py-8">
        <Link to="/cart" className="inline-flex items-center text-gray-600 mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Cart
        </Link>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-xl font-bold mb-6">Delivery Information</h1>
              
              <div className="mb-6">
                <h2 className="font-medium mb-4">Delivery Address</h2>
                
                {loading ? (
                  <div className="text-gray-600">Loading address information...</div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : address ? (
                  <div className="border rounded-lg p-4 border-primary">
                    <div className="font-medium">{addressType}</div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>{address}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-600">
                    No address found. Please add an address in your profile.
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="font-medium mb-4">Payment Method</h2>
                
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                  className="space-y-4"
                >
                  <div 
                    className={`border rounded-lg p-4 ${
                      paymentMethod === 'UPI' ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="UPI" id="payment-upi" />
                      <Label htmlFor="payment-upi" className="font-medium">
                        UPI
                      </Label>
                    </div>
                    
                    {paymentMethod === 'UPI' && (
                      <div className="ml-6 mt-3">
                        <Label htmlFor="upiId" className="text-sm mb-1 block">UPI ID</Label>
                        <Input
                          id="upiId"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="username@bankname"
                          className="max-w-xs"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 ${
                      paymentMethod === 'Card' ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Card" id="payment-card" />
                      <Label htmlFor="payment-card" className="font-medium">
                        Credit / Debit Card
                      </Label>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 ${
                      paymentMethod === 'Cash' ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Cash" id="payment-cash" />
                      <Label htmlFor="payment-cash" className="font-medium">
                        Cash on Delivery
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              
              <div className="mb-4 pb-4 border-b border-gray-100">
                <h3 className="font-medium">{restaurant.name}</h3>
                <p className="text-sm text-gray-600">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
              </div>
              
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
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
