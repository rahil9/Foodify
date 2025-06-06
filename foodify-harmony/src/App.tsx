import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import RequireAuth from "@/components/RequireAuth";
import RequireAdmin from "@/components/RequireAdmin";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RestaurantPage from "./pages/RestaurantPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import UsersPage from "./pages/UsersPage";
import RestaurantManagementPage from "./pages/RestaurantManagementPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/restaurant/:id" element={<RestaurantPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={
                  <RequireAuth>
                    <CheckoutPage />
                  </RequireAuth>
                } />
                <Route path="/order-success/:id" element={
                  <RequireAuth>
                    <OrderSuccessPage />
                  </RequireAuth>
                } />
                <Route path="/profile" element={
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                } />
                <Route path="/orders" element={
                  <RequireAuth>
                    <OrdersPage />
                  </RequireAuth>
                } />
                <Route path="/orders/:id" element={
                  <RequireAuth>
                    <OrderDetailsPage />
                  </RequireAuth>
                } />
                <Route path="/users" element={
                  <RequireAdmin>
                    <UsersPage />
                  </RequireAdmin>
                } />
                <Route path="/restaurants" element={
                  <RequireAdmin>
                    <RestaurantManagementPage />
                  </RequireAdmin>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
