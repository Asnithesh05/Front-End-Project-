import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/global/Header';
import { BottomNav } from './components/global/BottomNav';
import { FeedPage } from './pages/feed/FeedPage';
import { MenuPage } from './pages/menu/MenuPage';
import { OrderPage } from './pages/order/OrderPage';
import { HearthCommandDashboard } from './pages/dashboard/HearthCommandDashboard';
import { HQCRMPage } from './pages/admin/HQCRMPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { LoginPage } from './pages/auth/LoginPage';
import { AdminLoginPage } from './pages/auth/AdminLoginPage';
import { HQLoginPage } from './pages/auth/HQLoginPage';
import { CartPage } from './pages/cart/CartPage';
import { CartSheet } from './components/shared/CartSheet';
import { 
  FoodItem, CartItem, Screen, Feedback, Order, 
  InventoryItem, StaffMember 
} from './types/types';
import { 
  FOOD_ITEMS, INITIAL_INVENTORY, INITIAL_STAFF, INITIAL_ORDERS 
} from './data/mockData';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHQ, setIsHQ] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ type: 'navigate', screen: Screen } | { type: 'add-to-cart', item: FoodItem } | null>(null);
  
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    { id: '1', userName: 'Marcus V.', rating: 5, comment: 'The truffle smash is absolute perfection. Best burger in the digital age.', timestamp: '2h ago' },
    { id: '2', userName: 'Sarah L.', rating: 4, comment: 'Tacos were great but the fries were a bit cold. Still loved the vibe!', timestamp: '5h ago' }
  ]);

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [inventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);

  // Sync route to Screen type for Header/BottomNav highlighting
  const currentScreen: Screen = useMemo(() => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/menu') return 'menu';
    if (path === '/order-status') return 'order-status';
    if (path === '/admin') return 'dashboard';
    if (path === '/admin-login') return 'admin-login';
    if (path === '/login') return 'customer-login';
    if (path === '/profile') return 'profile';
    if (path === '/cart') return 'cart';
    return 'home';
  }, [location.pathname]);

  const handleNavigate = (screen: Screen) => {
    const map: Record<Screen, string> = {
      home: '/',
      menu: '/menu',
      'order-status': '/order-status',
      dashboard: '/admin',
      'admin-login': '/admin-login',
      'customer-login': '/login',
      profile: '/profile',
      cart: '/cart'
    };

    if ((screen === 'profile' || screen === 'order-status') && !isAuthenticated) {
      setPendingAction({ type: 'navigate', screen });
      navigate('/login');
      return;
    }
    navigate(map[screen]);
  };

  const addToCart = (item: FoodItem) => {
    if (!isAuthenticated) {
      setPendingAction({ type: 'add-to-cart', item });
      navigate('/login');
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
      navigate('/login');
      return;
    }
    setIsCartOpen(false);
    navigate('/order-status');
  };

  const handleCustomerLogin = () => {
    setIsAuthenticated(true);
    if (pendingAction) {
      if (pendingAction.type === 'navigate') {
        handleNavigate(pendingAction.screen);
      } else if (pendingAction.type === 'add-to-cart') {
        addToCart(pendingAction.item);
        navigate('/menu');
      }
      setPendingAction(null);
    } else {
      navigate('/');
    }
  };

  const handleCustomerLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsHQ(false);
    setCartItems([]);
    navigate('/');
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setIsAuthenticated(true);
    navigate('/admin');
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setIsHQ(false);
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleHQLogin = () => {
    setIsHQ(true);
    setIsAuthenticated(true);
    navigate('/hq');
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

  const isHearthCommandRoute = 
    location.pathname.startsWith('/admin') || 
    location.pathname === '/admin-login' || 
    location.pathname === '/hq' || 
    location.pathname === '/hq-login';

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      {!isHearthCommandRoute && (
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
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={
              <FeedPage 
                onExplore={() => handleNavigate('menu')} 
                onAddToCart={addToCart}
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
              />
            } />
            <Route path="/menu" element={
              <MenuPage 
                foodItems={FOOD_ITEMS}
                onAddToCart={addToCart} 
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
              />
            } />
            <Route path="/order-status" element={
              isAuthenticated ? <OrderPage /> : <Navigate to="/login" />
            } />
            <Route path="/profile" element={
              isAuthenticated ? <ProfilePage onFeedback={handleAddFeedback} onLogout={handleCustomerLogout} /> : <Navigate to="/login" />
            } />
            <Route path="/cart" element={
              <CartPage 
                cartItems={cartItems} 
                onUpdateQuantity={updateQuantity} 
                onPlaceOrder={placeOrder} 
              />
            } />
            <Route path="/login" element={
              <LoginPage onLogin={handleCustomerLogin} onBack={() => navigate('/')} />
            } />
            <Route path="/admin-login" element={
              <AdminLoginPage onLogin={handleAdminLogin} onBack={() => navigate('/')} />
            } />
            <Route path="/hq-login" element={
              <HQLoginPage onLogin={handleHQLogin} onBack={() => navigate('/')} />
            } />
            <Route path="/admin" element={
              isAdmin ? (
                <HearthCommandDashboard 
                  orders={orders}
                  inventory={inventory}
                  staff={staff}
                  feedbacks={feedbacks}
                  updateOrderStatus={updateOrderStatus}
                  addStaff={addStaff}
                />
              ) : <Navigate to="/admin-login" />
            } />
            <Route path="/admin/history" element={
              isAdmin ? (
                <HearthCommandDashboard 
                  orders={orders}
                  inventory={inventory}
                  staff={staff}
                  feedbacks={feedbacks}
                  updateOrderStatus={updateOrderStatus}
                  addStaff={addStaff}
                  defaultTab="History"
                />
              ) : <Navigate to="/admin-login" />
            } />
            <Route path="/hq" element={
              isHQ ? <HQCRMPage /> : <Navigate to="/hq-login" />
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {!isHearthCommandRoute && (
        <BottomNav 
          currentScreen={currentScreen} 
          onNavigate={handleNavigate} 
          onOpenCart={() => setIsCartOpen(true)} 
          isAdmin={isAdmin} 
          cartCount={cartItems.length} 
        />
      )}
      
      {!isHearthCommandRoute && (
        <CartSheet 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onPlaceOrder={placeOrder}
        />
      )}

      <div className="fixed top-1/4 -right-24 w-96 h-96 bg-primary-container/10 blur-[120px] -z-10 rounded-full"></div>
      <div className="fixed bottom-1/4 -left-24 w-64 h-64 bg-tertiary/10 blur-[100px] -z-10 rounded-full"></div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
