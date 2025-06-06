import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, User, Key, Users, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, showToken } = useAuth();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          Foodify
        </Link>
        
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <div className="text-sm font-medium">
                Welcome, {(user?.fullName ?? "").split(" ")[0]}
              </div>
              
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none">
                    <User className="h-6 w-6 text-gray-700 hover:text-primary transition-colors cursor-pointer" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <Link to="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      My Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/orders">
                    <DropdownMenuItem className="cursor-pointer">
                      My Orders
                    </DropdownMenuItem>
                  </Link>

                  {user?.role === 'Admin' && (
                    <>
                      <Link to="/users">
                        <DropdownMenuItem className="cursor-pointer">
                          <Users className="h-4 w-4 mr-2" />
                          Users
                        </DropdownMenuItem>
                      </Link>
                      <Link to="/restaurants">
                        <DropdownMenuItem className="cursor-pointer">
                          <Utensils className="h-4 w-4 mr-2" />
                          Restaurants
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}

                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={showToken}
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Show Token
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={logout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-primary hover:text-primary-hover">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" className="bg-primary hover:bg-primary-hover">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
