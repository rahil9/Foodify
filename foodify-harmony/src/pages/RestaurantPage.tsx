import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, MapPin } from "lucide-react";
import MenuItem from "@/components/MenuItem";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import api from "@/utils/axios";

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getItemCount } = useCart();
  const [restaurant, setRestaurant] = useState<any | null>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantAndMenu = async () => {
      if (!id) {
        setError("Restaurant ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch restaurant details
        const restaurantResponse = await api.get(`/restaurant-service/api/restaurant/${id}`);
        setRestaurant(restaurantResponse.data);

        // Fetch menu items
        const menuResponse = await api.get(`/restaurant-service/api/menu-items/restaurant/${id}`);
        console.log('Menu API Response:', menuResponse.data);
        
        // Handle different response structures
        let menuData = menuResponse.data;
        if (menuResponse.data && menuResponse.data.data) {
          menuData = menuResponse.data.data;
        }
        
        if (!Array.isArray(menuData)) {
          console.error('Menu data is not an array:', menuData);
          menuData = [];
        }
        
        setMenuItems(menuData);
        
        // Extract unique categories from menu items
        const uniqueCategories = [...new Set(menuData.map((item: any) => item.category))];
        setCategories(uniqueCategories);
      } catch (err: any) {
        console.error('Error fetching restaurant data:', err);
        setError(err.response?.data?.message || "Failed to load restaurant details");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantAndMenu();
  }, [id]);

  const filteredMenuItems = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory)
    : menuItems;

  const itemCount = getItemCount();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading restaurant details...</p>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Restaurant Not Found</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-6">Please try another restaurant.</p>
          <Link to="/">
            <Button variant="default">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header Section */}
      <div className="relative h-72 bg-gray-200">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x300?text=Restaurant";
          }}
        />
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <Link to="/">
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 p-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Restaurant Info in Header */}
        <div className="absolute bottom-4 left-0 right-0 z-10 text-white px-4 mx-4 sm:mx-16">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <p className="text-sm opacity-90">{restaurant.category} • {restaurant.rating} ⭐ • ₹{restaurant.minOrderAmount} min order</p>
          
          <p className="text-sm opacity-80 mt-1 flex items-center">
            <MapPin className="h-4 w-4 inline mr-1" />
            {restaurant.address || "Location information unavailable"}
          </p>

          <p className="text-sm opacity-80 mt-1">{restaurant.description}</p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container mx-auto px-4 mt-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Categories Section */}
          <div className="md:w-64 order-1 md:order-none">
            <div className="sticky top-4">
              <h2 className="font-semibold mb-4">Categories</h2>
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`px-4 py-2 rounded-md transition-colors ${!selectedCategory ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                >
                  All Items
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md transition-colors ${selectedCategory === category ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 order-2 md:order-none">
            <div className="grid gap-4">
              {filteredMenuItems.map((item) => (
                <MenuItem key={item.id} item={item} restaurant={restaurant} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Button */}
      {itemCount > 0 && (
        <div className="fixed bottom-6 right-6 z-30">
          <Link to="/cart">
            <Button className="bg-primary hover:bg-primary-hover text-white rounded-full p-4 shadow-lg flex items-center justify-center relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
