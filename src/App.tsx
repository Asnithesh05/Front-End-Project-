import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/global/Header';
import { BottomNav } from './components/global/BottomNav';
import { FeedPage } from './pages/feed/FeedPage';
import { MenuPage } from './pages/menu/MenuPage';
import { OrderPage } from './pages/order/OrderPage';
import { StaffingPage } from './pages/staff/StaffingPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { LoginPage } from './pages/auth/LoginPage';
import { AdminLoginPage } from './pages/auth/AdminLoginPage';
import { CartPage } from './pages/cart/CartPage';
import { CartSheet } from './components/shared/CartSheet';
import { 
  FoodItem, CartItem, Screen, Feedback, Order, 
  InventoryItem, StaffMember 
} from './types/types';
import { 
  FOOD_ITEMS, INITIAL_INVENTORY, INITIAL_STAFF, INITIAL_ORDERS 
} from './data/mockData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ type: 'navigate', screen: Screen } | { type: 'add-to-cart', item: FoodItem } | null>(null);
  
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    { id: '1', userName: 'Marcus V.', rating: 5, comment: 'The truffle smash is absolute perfection. Best burger in the digital age.', timestamp: '2h ago' },
    { id: '2', userName: 'Sarah L.', rating: 4, comment: 'Tacos were great but the fries were a bit cold. Still loved the vibe!', timestamp: '5h ago' }
  ]);

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [inventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  const handleNavigate = (screen: Screen) => {
    if (screen === 'profile' || screen === 'order-status') {
      if (!isAuthenticated) {
        setPendingAction({ type: 'navigate', screen });
        setCurrentScreen('customer-login');
        return;
      }
    }
    setCurrentScreen(screen);
  };

  const addToCart = (item: FoodItem) => {
    if (!isAuthenticated) {
      setPendingAction({ type: 'add-to-cart', item });
      setCurrentScreen('customer-login');
      return;
    }

    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const placeOrder = () => {
    if (!isAuthenticated) {
      setIsCartOpen(false);
      setCurrentScreen('customer-login');
      return;
    }
    setIsCartOpen(false);
    setCurrentScreen('order-status');
  };

  const handleCustomerLogin = () => {
    setIsAuthenticated(true);
    if (pendingAction) {
      if (pendingAction.type === 'navigate') {
        setCurrentScreen(pendingAction.screen);
      } else if (pendingAction.type === 'add-to-cart') {
        addToCart(pendingAction.item);
        setCurrentScreen('menu');
      }
      setPendingAction(null);
    } else {
      setCurrentScreen('home');
    }
  };

  const handleCustomerLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentScreen('home');
    setCartItems([]);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setIsAuthenticated(false);
    setCurrentScreen('home');
  };

  const handleAddFeedback = (f: Omit<Feedback, 'id' | 'timestamp'>) => {
    const newFeedback: Feedback = {
      ...f,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: 'Just now'
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const addStaff = (s: Omit<StaffMember, 'id' | 'status'>) => {
    const newMember: StaffMember = {
      ...s,
      id: Math.random().toString(36).substr(2, 9),
      status: 'off-shift'
    };
    setStaff(prev => [...prev, newMember]);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      {currentScreen !== 'dashboard' && (
        <Header 
          currentScreen={currentScreen} 
          onNavigate={handleNavigate} 
          isAdmin={isAdmin} 
          isAuthenticated={isAuthenticated}
          onLogout={handleCustomerLogout}
        />
      )}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {currentScreen === 'home' && (
            <FeedPage 
              onExplore={() => handleNavigate('menu')} 
              onAddToCart={addToCart}
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
            />
          )}
          {currentScreen === 'menu' && (
            <MenuPage 
              foodItems={FOOD_ITEMS}
              onAddToCart={addToCart} 
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
            />
          )}
          {currentScreen === 'order-status' && <OrderPage />}
          {currentScreen === 'dashboard' && isAdmin && (
            <DashboardPage 
              orders={orders}
              inventory={inventory}
              staff={staff}
              feedbacks={feedbacks}
              updateOrderStatus={updateOrderStatus}
              addStaff={addStaff}
            />
          )}
          {currentScreen === 'admin-login' && <AdminLoginPage onLogin={handleAdminLogin} onBack={() => setCurrentScreen('home')} />}
          {currentScreen === 'customer-login' && <LoginPage onLogin={handleCustomerLogin} onBack={() => setCurrentScreen('home')} />}
          {currentScreen === 'profile' && <ProfilePage onFeedback={handleAddFeedback} onLogout={handleCustomerLogout} />}
          {currentScreen === 'cart' && (
            <CartPage 
              cartItems={cartItems} 
              onUpdateQuantity={updateQuantity} 
              onPlaceOrder={placeOrder} 
            />
          )}
        </motion.div>
      </AnimatePresence>

      {currentScreen !== 'dashboard' && (
        <BottomNav 
          currentScreen={currentScreen} 
          onNavigate={handleNavigate} 
          onOpenCart={() => setIsCartOpen(true)} 
          isAdmin={isAdmin} 
          cartCount={cartItems.length} 
        />
      )}
      
      <CartSheet 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onPlaceOrder={placeOrder}
      />

      <div className="fixed top-1/4 -right-24 w-96 h-96 bg-primary-container/10 blur-[120px] -z-10 rounded-full"></div>
      <div className="fixed bottom-1/4 -left-24 w-64 h-64 bg-tertiary/10 blur-[100px] -z-10 rounded-full"></div>
    </div>
  );
}
