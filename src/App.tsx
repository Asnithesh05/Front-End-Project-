import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  ShoppingCart,
  Bell, 
  ArrowRight, 
  Utensils, 
  MapPin, 
  Ticket, 
  User,
  Search,
  Plus,
  Minus,
  Flame,
  Star,
  Phone,
  MessageCircle,
  MessageSquare,
  Users,
  LayoutDashboard,
  Banknote,
  Receipt,
  CookingPot,
  Wallet,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  ShieldCheck,
  Lock,
  LogOut,
  History,
  MessageSquarePlus,
  Filter,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ReceiptText,
  Zap,
  Box,
  BarChart3,
  Play,
  Check
} from 'lucide-react';
import { 
  FoodItem, 
  CartItem, 
  Screen, 
  Order, 
  Feedback,
  InventoryItem,
  StaffMember
} from './types';
import { FOOD_ITEMS, CATEGORIES } from './constants';

// --- Shared Components ---

const Header = ({ onNavigate, currentScreen, isAdmin, isAuthenticated, onLogout }: { onNavigate: (s: Screen) => void, currentScreen: Screen, isAdmin: boolean, isAuthenticated: boolean, onLogout: () => void }) => (
  <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-6 py-4 bg-[#1C1C1C]/40 backdrop-blur-3xl rounded-b-[1.5rem] md:rounded-b-[2rem] shadow-[0_20px_50px_rgba(255,87,51,0.08)]">
    <div className="flex items-center gap-4">
      <div 
        className="text-xl md:text-2xl font-black tracking-tighter text-primary-container font-headline cursor-pointer truncate"
        onClick={() => onNavigate('home')}
      >
        Kinetic Hearth
      </div>
    </div>
    <nav className="hidden xl:flex items-center gap-6 xl:gap-8">
      <button 
        onClick={() => onNavigate('home')}
        className={`${currentScreen === 'home' ? 'text-primary-container font-bold' : 'text-on-surface/60'} hover:bg-primary-container/10 transition-colors px-3 py-1 rounded-full font-headline`}
      >
        Feed
      </button>
      <button 
        onClick={() => onNavigate('menu')}
        className={`${currentScreen === 'menu' ? 'text-primary-container font-bold' : 'text-on-surface/60'} hover:bg-primary-container/10 transition-colors px-3 py-1 rounded-full font-headline`}
      >
        Menu
      </button>
      <button 
        onClick={() => onNavigate('order-status')}
        className={`${currentScreen === 'order-status' ? 'text-primary-container font-bold' : 'text-on-surface/60'} hover:bg-primary-container/10 transition-colors px-3 py-1 rounded-full font-headline`}
      >
        Orders
      </button>
      {isAdmin && (
        <button 
          onClick={() => onNavigate('dashboard')}
          className={`${currentScreen === 'dashboard' ? 'text-primary-container font-bold' : 'text-on-surface/60'} hover:bg-primary-container/10 transition-colors px-3 py-1 rounded-full font-headline`}
        >
          Kitchen
        </button>
      )}
      <button 
        onClick={() => onNavigate('profile')}
        className={`${currentScreen === 'profile' ? 'text-primary-container font-bold' : 'text-on-surface/60'} hover:bg-primary-container/10 transition-colors px-3 py-1 rounded-full font-headline`}
      >
        Profile
      </button>
    </nav>
    <div className="flex items-center gap-2 md:gap-4">
      {isAuthenticated ? (
        <button 
          onClick={onLogout}
          className="p-2 text-primary-container hover:bg-primary-container/10 transition-colors rounded-full active:scale-95 duration-200 flex items-center gap-2"
        >
          <LogOut size={20} />
          <span className="text-xs font-bold hidden lg:inline">Logout</span>
        </button>
      ) : (
        <button 
          onClick={() => onNavigate('admin-login')}
          className="p-2 text-on-surface/60 hover:bg-primary-container/10 transition-colors rounded-full active:scale-95 duration-200"
          title="Admin Login"
        >
          <ShieldCheck size={24} />
        </button>
      )}
      <button className="p-2 text-on-surface/60 hover:bg-primary-container/10 transition-colors rounded-full active:scale-95 duration-200">
        <Bell size={24} />
      </button>
    </div>
  </header>
);

const BottomNav = ({ onNavigate, currentScreen, onOpenCart, isAdmin, cartCount }: { onNavigate: (s: Screen) => void, currentScreen: Screen, onOpenCart: () => void, isAdmin: boolean, cartCount: number }) => {
  const navItems = [
    { id: 'home', label: 'Feed', icon: Utensils },
    { id: 'menu', label: 'Menu', icon: BookOpen },
    { id: 'order-status', label: 'Order', icon: ReceiptText, isFab: true },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, isCart: true },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[92%] md:w-auto md:min-w-[520px] xl:min-w-[600px] bg-[#1C1C1C]/60 backdrop-blur-3xl z-50 flex justify-around items-center px-8 py-4 rounded-[3.5rem] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-visible transition-all duration-500 ease-in-out">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;

        if (item.isFab) {
          return (
            <button 
              key={item.id}
              onClick={() => onNavigate('order-status')}
            className="group relative flex flex-col items-center justify-center bg-gradient-to-br from-[#FF5722] to-[#FF8A65] text-[#121212] rounded-full w-16 h-16 md:w-20 md:h-20 -mt-16 md:-mt-20 active:scale-90 transition-all duration-[250ms] hover:-translate-y-2 hover:scale-[1.15] z-20 touch-none shadow-[0_10px_30px_rgba(255,87,34,0.4)] hover:shadow-[0_8px_25px_rgba(255,87,34,0.9)]"
            style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}
            >
              <Icon 
                size={30} 
                className="transition-all duration-200 group-hover:text-white group-hover:[filter:drop-shadow(0_0_8px_white)]" 
              />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-tighter mt-0.5 group-hover:text-white">
                Order
              </span>
            </button>
          );
        }

        return (
          <button 
            key={item.id}
            onClick={() => item.isCart ? onOpenCart() : onNavigate(item.id as Screen)}
            className="group relative flex flex-col items-center justify-center py-2 px-1 flex-1 transition-all duration-[250ms] active:scale-95 hover:-translate-y-[6px] hover:scale-[1.1] z-10 touch-none"
            style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}
          >
            <div className="relative flex items-center justify-center">
              <Icon 
                size={26} 
                className={`relative z-10 transition-all duration-200 ${isActive ? 'text-[#FF5722]' : 'text-on-surface/30'} group-hover:text-[#FF5722] ${isActive ? '[filter:drop-shadow(0_0_15px_rgba(255,87,34,0.9))]' : 'group-hover:[filter:drop-shadow(0_0_10px_rgba(255,87,34,0.8))]'}`} 
              />
              {item.isCart && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF5722] rounded-full shadow-[0_0_10px_rgba(255,87,34,0.8)] animate-pulse" />
              )}
            </div>
            <span className={`text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-black mt-2 transition-all duration-200 ${isActive ? 'text-[#FF5722] opacity-100' : 'text-on-surface/30 opacity-60 group-hover:text-[#FF5722] group-hover:opacity-100'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

// --- Screens ---

const QuantitySelector = ({ quantity, onUpdate }: { quantity: number, onUpdate: (delta: number) => void }) => (
  <div className="quantity-selector-pill">
    <button 
      onClick={(e) => { e.stopPropagation(); onUpdate(-1); }} 
      className="qty-btn"
    >
      <Minus size={20} />
    </button>
    <span className="qty-display">{quantity}</span>
    <button 
      onClick={(e) => { e.stopPropagation(); onUpdate(1); }} 
      className="qty-btn"
    >
      <Plus size={20} />
    </button>
  </div>
);

const FeaturedItemsSection = ({ 
  onAddToCart, 
  cartItems, 
  onUpdateQuantity 
}: { 
  onAddToCart: (item: FoodItem) => void,
  cartItems: CartItem[],
  onUpdateQuantity: (id: string, delta: number) => void
}) => (
  <section className="py-24 px-4 md:px-6 bg-surface-container-low/30">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col mb-16 space-y-4">
        <span className="text-tertiary text-xs md:text-sm tracking-[0.2em] font-bold uppercase">The Hearth Selection</span>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-on-surface">Featured Items</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            id: 'f1',
            name: 'Smoked Truffle Smash',
            price: 18,
            desc: 'Double wagyu beef, black truffle aioli, aged cheddar, and smoked onions on brioche.',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlM-ieMVMxh4aWsG5rAGfDL7s7xt8G7rcligLuCVcheS88U7nfqNuaQfbZ11ZHfFP8nTA4WIlwAP3jFJC_AzZcw-xfGAwI7RrHRwLv_CrhxqULOD0x6kP0Drc3YbA_KCAcoy22aTcuKRLPA5UzfvrfgzpH73US1xO_M5skZRlOQDlOgVDmlQeV-Ucu-IannlnRZ-MvjDT8qwkY8MyzH0iJJhVFl8FEzFHd182AaN5susvnc_cT1YatWzamkX2LtJ29YGr2UUeyYyA'
          },
          {
            id: 'f2',
            name: 'Neon Al Pastor',
            price: 14,
            desc: 'Heirloom corn tacos, guajillo pork, roasted pineapple salsa, and electric cilantro.',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjF4v1WiMkBQT5syju4jsCn_UbWGUOc_UTTBAjhjAOE7Z-dklVyRxGyfe8ADf-WoJayESJIMJ-0qgoFrPXjQ3-9LtAtOMP_LdzW70bLSi62g7kSDSJdGlNNVUOLO2qfYqUoPRjeS6UVmsEQoKlPUuGcvIKtT7wOlgjGIXw8TK-TPXX-YnUDNDrcSC7Dp0MeLoRai4rqauClto9Hz7XR5NJLW7i6i3f_GXIzSRG5_CDjsbvjs_63yNV_dn-aK1q7BjrIV3RsobRGLw'
          },
          {
            id: 'f3',
            name: 'Thermal Grain Bowl',
            price: 16,
            desc: 'Quinoa, charred kale, roasted roots, miso-tahini dressing, and kinetic pepitas.',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoexTME2Qc5T5wurxLWoghbLOV_53-OxuCLiYkkhzC4WLXbCewoaCuO4o1oIUNzpCJ01930bUcajzw6s5_0OLRWMwL1RQgmVGz1hc98Ecu5_RbDK2Udcbj7oRwYFg4wOkViwIizZI9HTO80sBYOpxoZ3X22mtLWHZlkGY1uZEjH5FYrza60xNnkhiwBU_v0D5Y9_MbHM3V53NHo-fJCDPC078WEOkY-4_rUMBrUU5s5SO5t8iMS28e2ZEo3sdlyVsM2uVFvrILVxI'
          }
        ].map((item, i) => {
          const cartItem = cartItems.find(ci => ci.id === item.id);
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel border border-white/5 rounded-2xl overflow-hidden group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src={item.img}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  ${item.price}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-on-surface">{item.name}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                {cartItem ? (
                  <QuantitySelector 
                    quantity={cartItem.quantity} 
                    onUpdate={(delta) => onUpdateQuantity(item.id, delta)} 
                  />
                ) : (
                  <button 
                    onClick={() => onAddToCart({ id: item.id, name: item.name, price: item.price, category: 'Featured', image: item.img, description: item.desc })}
                    className="w-full py-3 border border-primary-container/30 rounded-xl text-primary-container font-bold hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="relative py-24 px-4 md:px-6 overflow-hidden bg-[#121212]">
      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
        <img 
          src="https://picsum.photos/seed/urban-night/1920/1080?blur=2" 
          alt="Urban Night" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white leading-none uppercase">
              NEVER MISS <br/> THE EMBER.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed">
              Join the Ember list for drop alerts, secret menu items, and location updates before everyone else.
            </p>
          </div>

          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-primary-container/20 border border-primary-container/30 backdrop-blur-md max-w-md"
            >
              <h3 className="text-2xl font-black text-primary-container mb-2">Welcome to the Crew.</h3>
              <p className="text-on-surface-variant">You're on the list. Watch for the spark.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your street address (email)"
                className="flex-1 bg-black/40 border border-white/10 rounded-full px-8 py-5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/50 transition-all backdrop-blur-sm"
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="px-10 py-5 bg-[#FF5722] text-black font-black text-lg rounded-full hover:bg-[#FF7043] transition-all active:scale-95 shadow-[0_10px_30px_rgba(255,87,34,0.3)] disabled:opacity-50 uppercase tracking-tight"
              >
                {status === 'loading' ? 'Joining...' : 'SIGN ME UP'}
              </button>
            </form>
          )}
        </motion.div>

        <div className="hidden lg:block relative">
          <div className="absolute -inset-4 bg-[#FF5722]/10 blur-3xl rounded-full"></div>
          <img 
            src="https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&q=80&w=800" 
            alt="Food Truck Night" 
            className="relative rounded-2xl shadow-2xl border border-white/5 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
};

const HomeScreen = ({ 
  onExplore, 
  onAddToCart,
  cartItems,
  onUpdateQuantity
}: { 
  onExplore: () => void, 
  onAddToCart: (item: FoodItem) => void,
  cartItems: CartItem[],
  onUpdateQuantity: (id: string, delta: number) => void
}) => (
  <div className="relative w-full">
    {/* Hero Section */}
    <section className="relative min-h-screen w-full flex items-center justify-center wave-lighting px-4 md:px-6 py-24 md:py-0 overflow-hidden">
      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 z-10 space-y-6 md:space-y-8 text-center lg:text-left"
        >
          <div className="space-y-2">
            <span className="text-tertiary text-xs md:text-sm tracking-[0.05em] font-medium uppercase bg-tertiary/10 px-4 py-1.5 rounded-full inline-block">
              Artisanal Street Food
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-on-surface leading-[0.9]">
              Gourmet <br/>
              <span className="text-primary-container">on the Go</span>
            </h1>
          </div>
          <p className="text-on-surface-variant text-base md:text-lg lg:text-xl max-w-md mx-auto lg:mx-0 leading-relaxed">
            Experience the precision of high-end hardware meeting the warmth of the artisanal grill. Our hearth is digital, our flavor is legendary.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <button 
              onClick={onExplore}
              className="group relative px-10 py-5 bg-[#FF5722] text-black font-black text-lg rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,87,34,0.3)] hover:shadow-[0_25px_50px_rgba(255,87,34,0.5)] flex items-center gap-3 uppercase tracking-tighter"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                Explore Menu
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
              </span>
            </button>
            <button className="px-10 py-5 border-2 border-white/10 text-white font-black text-lg rounded-2xl hover:bg-white/5 transition-all duration-500 active:scale-95 uppercase tracking-tighter">
              Find Hearth
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7 relative flex justify-center lg:justify-end mt-8 lg:mt-0"
        >
          <div className="absolute -top-12 -left-12 w-32 md:w-48 h-32 md:h-48 bg-primary-container/20 rounded-full blur-[60px] md:blur-[80px]"></div>
          <div className="absolute -bottom-12 -right-12 w-48 md:w-64 h-48 md:h-64 bg-tertiary/10 rounded-full blur-[80px] md:blur-[100px]"></div>
          
          <div className="relative group max-w-[320px] md:max-w-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/30 to-transparent rounded-xl rotate-3 blur-2xl group-hover:rotate-6 transition-transform duration-700"></div>
            <div className="relative rounded-xl overflow-hidden glass-panel border border-outline-variant/10 shadow-2xl p-3 md:p-4">
              <img 
                alt="Gourmet Burger" 
                className="w-full aspect-[4/5] object-cover rounded-lg transform transition-transform duration-1000 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvF02vjGTMpB7j7DL6xY4SjB0R2OhON7N26pdXdg50mclerUqhnZUbcqXPmfQ02CACb7XI4ZRKJAg8fxYGc5OsWzhrVZzx7rKEDBz6Acm9-WKCeVp6YLXWpQHsjNM8834aLi-_0-Pg9aRJxn1m1-K25S0LyjmU0x4YT-HIbZstxQHYoFjmM67j1n_KSDS6KO_YLC2awqsu8Iny1RYMW-KZ8SKnzK_PVk3qiUiyJSevvz6f0T0lb2a7R66fiCegtk2VHH2vguCA2hU"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 p-4 md:p-6 glass-panel border border-outline-variant/20 rounded-lg max-w-[200px] md:max-w-[240px]">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="text-primary-container" size={16} />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-tertiary">Fresh From Hearth</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-on-surface">Smoked Truffle Smash</h3>
                <div className="mt-3 md:mt-4 flex items-center justify-between">
                  <span className="text-xl md:text-2xl font-black text-primary-container">$18</span>
                  <span className="text-[10px] text-on-surface-variant italic">Limited Batch</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Featured Items Section */}
    <FeaturedItemsSection 
      onAddToCart={onAddToCart} 
      cartItems={cartItems}
      onUpdateQuantity={onUpdateQuantity}
    />

    {/* Newsletter Section */}
    <NewsletterSection />

    <div className="h-32 lg:h-0" /> {/* Bottom spacing for mobile nav */}
  </div>
);

const SpiceHeatMap = ({ level }: { level: number }) => {
  return (
    <div className="space-y-2 mb-6">
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
        <span>Cool</span>
        <span>Hot</span>
      </div>
      <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden relative">
        <div 
          className="h-full absolute left-0 top-0 transition-all duration-500"
          style={{ 
            width: `${level}%`,
            background: `linear-gradient(90deg, #ffb2b8 0%, #ff5733 100%)`
          }}
        />
      </div>
    </div>
  );
};

const MenuScreen = ({ 
  onAddToCart,
  cartItems,
  onUpdateQuantity
}: { 
  onAddToCart: (item: FoodItem) => void,
  cartItems: CartItem[],
  onUpdateQuantity: (id: string, delta: number) => void
}) => {
  const [activeCategory, setActiveCategory] = useState('Full Menu');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  React.useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1280);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const filteredItems = activeCategory === 'Full Menu' 
    ? FOOD_ITEMS 
    : FOOD_ITEMS.filter(item => item.category === activeCategory);

  const categories = [
    { name: 'Full Menu', icon: '📋' },
    { name: 'Smoky BBQ', icon: '🔥' },
    { name: 'Barma Food', icon: '🍜' },
    { name: 'Chinese Foods', icon: '🥢' },
    { name: 'American Foods', icon: '🍔' },
    { name: 'Midnight Snacks', icon: '🌙' },
    { name: 'Drinks', icon: '🥤' }
  ];

  const getCount = (catName: string) => {
    if (catName === 'Full Menu') return FOOD_ITEMS.length;
    return FOOD_ITEMS.filter(item => item.category === catName).length;
  };

  return (
    <div className="pt-24 md:pt-32 pb-40 px-4 md:px-6 max-w-7xl mx-auto min-h-screen relative flex flex-col xl:flex-row gap-8">
      {/* Desktop Sidebar */}
      {isDesktop && (
        <aside className="w-1/5 sticky top-32 h-fit space-y-2 pr-8 hidden xl:block">
          {categories.map((cat) => (
            <div 
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-all duration-300 ${
                activeCategory === cat.name 
                  ? 'bg-[#FF5722] text-black rounded-r-full shadow-[0_10px_20px_rgba(255,87,34,0.3)]' 
                  : 'text-white/50 hover:bg-white/5 rounded-r-full'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-xl">{cat.icon}</span>
                <span className="font-bold">{cat.name}</span>
              </div>
              <span className={`text-xs font-mono ${activeCategory === cat.name ? 'text-black/60' : 'opacity-40'}`}>
                {getCount(cat.name)}
              </span>
            </div>
          ))}
        </aside>
      )}

      <main className="flex-1">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-tertiary uppercase mb-2 block">ARTISANAL SELECTIONS</span>
          <h1 className="text-4xl md:text-7xl font-black tracking-[-0.04em] text-on-surface mb-4">The Daily Menu</h1>
          <p className="text-on-surface-variant max-w-xl text-base md:text-lg leading-relaxed">Curated heat from the street. High-precision flavor engineered for the modern palate.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, idx) => {
            const cartItem = cartItems.find(ci => ci.id === item.id);
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative glass-panel rounded-lg p-3 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,87,51,0.15)] hover:-translate-y-2 border border-white/5"
              >
                <div className="relative h-64 w-full overflow-hidden rounded-lg mb-4">
                  <img 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={item.image}
                    referrerPolicy="no-referrer"
                  />
                  {item.isBestseller && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary-container/90 backdrop-blur-md">
                      <span className="text-[10px] font-black text-on-primary-fixed uppercase tracking-wider">Bestseller</span>
                    </div>
                  )}
                  {item.isPremium && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-tertiary-container/90 backdrop-blur-md">
                      <span className="text-[10px] font-black text-on-tertiary-container uppercase tracking-wider">Premium</span>
                    </div>
                  )}
                </div>
                <div className="px-2 pb-2">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-bold tracking-tight text-on-surface">{item.name}</h3>
                    <span className="text-primary-fixed font-black">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">{item.description}</p>
                  {item.spiceLevel !== undefined && <SpiceHeatMap level={item.spiceLevel} />}
                  
                  {cartItem ? (
                    <QuantitySelector 
                      quantity={cartItem.quantity} 
                      onUpdate={(delta) => onUpdateQuantity(item.id, delta)} 
                    />
                  ) : (
                    <button 
                      onClick={() => onAddToCart(item)}
                      className="w-full py-4 rounded-xl bg-surface-container-highest group-hover:bg-primary-container text-on-surface group-hover:text-on-primary-fixed flex items-center justify-center gap-2 transition-all duration-300 font-bold active:scale-95"
                    >
                      <Plus size={20} />
                      <span>Add to Order</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Mobile/Tablet Floating Menu */}
      {!isDesktop && (
        <>
          <AnimatePresence>
            {isPopupOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsPopupOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[900]"
                />
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="menu-popup-container"
                >
                  <div className="p-4 flex flex-col gap-1">
                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                      <h3 className="text-white text-sm font-black uppercase tracking-widest opacity-40">Categories</h3>
                    </div>
                    {categories.map((cat) => (
                      <div 
                        key={cat.name}
                        onClick={() => {
                          setActiveCategory(cat.name);
                          setIsPopupOpen(false);
                        }}
                        className={`menu-popup-item rounded-xl ${activeCategory === cat.name ? 'active' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{cat.icon}</span>
                          <span className="label">{cat.name}</span>
                        </div>
                        <span className="count">{getCount(cat.name)}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <button 
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className="floating-menu-btn"
          >
            <div className="btn-icon">
              <BookOpen size={24} strokeWidth={2.5} />
            </div>
            <span className="btn-text">MENU</span>
          </button>
        </>
      )}
    </div>
  );
};

const OrderStatusScreen = () => {
  const steps = [
    { label: 'Placed', status: 'completed' },
    { label: 'Preparing', status: 'active' },
    { label: 'Ready', status: 'pending' },
    { label: 'Done', status: 'pending' },
  ];

  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-32 px-4 md:px-6 max-w-5xl mx-auto space-y-8">
      {/* Dashboard Header */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[#FF5722] font-bold text-sm">
          <MapPin size={16} />
          <span>Downtown Night Market</span>
        </div>
        <button className="w-10 h-10 flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 transition-all">
          <Search size={18} />
        </button>
      </header>

      {/* Hero Banner - Glassy Look */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-8 md:p-10 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/10 blur-[100px] -z-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3">
              Preparing <span className="animate-pulse">👨‍🍳</span>
            </h1>
            <p className="text-[#FF5722] text-xs font-black uppercase tracking-[0.2em]">Estimated Arrival</p>
            <h2 className="text-6xl md:text-7xl font-black text-[#FF5722] tracking-tighter">12-15 MIN</h2>
          </div>
          
          <div className="text-right md:text-right w-full md:w-auto">
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Order #8829</span>
            <h3 className="text-xl font-black text-white mt-1">The Sizzling Grill</h3>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex justify-between items-center relative">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2" />
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '33%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute top-1/2 left-0 h-0.5 bg-[#FF5722] -translate-y-1/2 shadow-[0_0_15px_rgba(255,87,34,0.5)]"
            />
            
            {steps.map((step, i) => (
              <div key={step.label} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                  step.status === 'completed' ? 'bg-[#FF5722] border-[#FF5722] shadow-[0_0_10px_rgba(255,87,34,0.8)]' :
                  step.status === 'active' ? 'bg-[#FF5722] border-[#FF5722] animate-pulse shadow-[0_0_15px_rgba(255,87,34,1)]' :
                  'bg-[#121212] border-white/20'
                }`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${
                  step.status === 'active' ? 'text-[#FF5722]' : 
                  step.status === 'completed' ? 'text-white' : 'text-white/30'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Order Details */}
        <motion.article 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col justify-between shadow-xl"
        >
          <div className="space-y-6">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
              <ShoppingCart size={20} className="text-[#FF5722]" />
              Order Details
            </h3>
            
            <div className="space-y-6">
              {[
                { name: 'Spicy Seoul Burger', desc: 'Extra Gochujang, No Onions', price: 14.50, qty: 1 },
                { name: 'Street Tacos', desc: 'Carnitas, Double Cilantro', price: 9.00, qty: 2 },
              ].map((item) => (
                <div key={item.name} className="flex justify-between items-start pb-6 border-b border-white/5">
                  <div className="space-y-1">
                    <strong className="text-white font-bold">{item.qty}x {item.name}</strong>
                    <p className="text-white/40 text-xs">{item.desc}</p>
                  </div>
                  <span className="text-white font-black">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Total Paid</p>
              <h4 className="text-3xl font-black text-[#FF5722] tracking-tighter">$23.50</h4>
            </div>
            <button className="px-6 py-3 border border-white/20 rounded-full text-white text-xs font-bold hover:bg-white/5 transition-all">
              Need Help?
            </button>
          </div>
        </motion.article>

        {/* Right Column: Stacked Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Pickup Point */}
          <motion.article 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 flex justify-between items-center shadow-xl group hover:border-[#FF5722]/30 transition-all"
          >
            <div className="space-y-1">
              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Pickup Point</p>
              <h4 className="text-xl font-black text-white">📍 Zone B, Stall 4</h4>
              <p className="text-white/30 text-xs">Near the Neon Gate</p>
            </div>
            <button className="w-12 h-12 flex items-center justify-center bg-[#FF5722] text-black rounded-2xl shadow-[0_10px_20px_rgba(255,87,34,0.3)] group-hover:scale-110 transition-all">
              <MapPin size={24} />
            </button>
          </motion.article>

          {/* Chef Chat - Highlighted */}
          <motion.article 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-[#FF5722] to-[#D84315] flex flex-col gap-4 shadow-[0_20px_40px_rgba(255,87,34,0.2)] cursor-pointer hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-center gap-3 text-black">
              <MessageSquare size={24} className="animate-bounce" />
              <h4 className="text-lg font-black uppercase tracking-tighter">Chef is online!</h4>
            </div>
            <p className="text-black/80 text-sm font-bold leading-tight">
              Message the truck for special requests or allergen info.
            </p>
          </motion.article>

          {/* Social Proof */}
          <motion.article 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col gap-6 shadow-xl"
          >
            <div className="space-y-1">
              <h4 className="text-lg font-black text-white">The Night is Young! 🌃</h4>
              <p className="text-white/40 text-sm">Join 40+ others enjoying fresh grill right now.</p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-[#FF5722]" fill="#FF5722" />
                <span className="text-white font-black">4.9</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-white/40" />
                <span className="text-white/40 text-xs font-bold">2k+ Orders</span>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </main>
  );
};

const AdminLoginScreen = ({ onLogin, onBack }: { onLogin: () => void, onBack: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin@123') {
      onLogin();
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  return (
    <main className="min-h-screen pt-32 px-4 md:px-6 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 md:p-10 rounded-2xl border border-white/5 w-full max-w-md space-y-6 md:space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary-container/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-primary-container" size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight">Admin Access</h1>
          <p className="text-on-surface-variant text-sm">Restricted to Kinetic Hearth personnel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">User ID</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-container outline-none transition-all"
              placeholder="Enter User ID"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-container outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-400 text-xs font-bold text-center">{error}</p>}
          <div className="space-y-3">
            <button 
              type="submit"
              className="w-full bg-gradient-to-br from-primary-container to-tertiary text-surface py-4 rounded-xl font-black text-lg tracking-tight shadow-lg active:scale-95 transition-all"
            >
              Authenticate
            </button>
            <button 
              type="button"
              onClick={onBack}
              className="w-full py-3 text-on-surface-variant hover:text-on-surface transition-colors font-bold text-sm"
            >
              Back to Customer Experience
            </button>
          </div>
        </form>
      </motion.div>
    </main>
  );
};

const CustomerLoginScreen = ({ onLogin, onBack }: { onLogin: () => void, onBack: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    onLogin();
  };

  return (
    <main className="min-h-screen pt-32 px-4 md:px-6 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 md:p-10 rounded-2xl border border-white/5 w-full max-w-md space-y-6 md:space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-tertiary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-tertiary" size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight">Join the Hearth</h1>
          <p className="text-on-surface-variant text-sm">Sign in to unlock ordering and your gourmet profile.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-4 focus:ring-2 focus:ring-tertiary outline-none transition-all"
              placeholder="alex@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-4 focus:ring-2 focus:ring-tertiary outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-3">
            <button 
              type="submit"
              className="w-full bg-gradient-to-br from-primary-container to-tertiary text-surface py-4 rounded-xl font-black text-lg tracking-tight shadow-lg active:scale-95 transition-all"
            >
              Sign In / Sign Up
            </button>
            <button 
              type="button"
              onClick={onBack}
              className="w-full py-3 text-on-surface-variant hover:text-on-surface transition-colors font-bold text-sm"
            >
              Browse as Guest
            </button>
          </div>
        </form>
      </motion.div>
    </main>
  );
};

const ProfileScreen = ({ onFeedback, onLogout }: { onFeedback: (f: Omit<Feedback, 'id' | 'timestamp'>) => void, onLogout: () => void }) => {
  const [filter, setFilter] = useState('Recent');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const history = [
    { id: 'KH-102', items: 'Smoked Truffle Smash, Neon Fries', total: 32.50, date: 'Yesterday', status: 'Completed', count: 5 },
    { id: 'KH-098', items: 'Sunset Taco Trio', total: 18.00, date: '3 days ago', status: 'Completed', count: 8 },
    { id: 'KH-085', items: 'Thermal Grain Bowl', total: 14.50, date: 'Last week', status: 'Partial', count: 2 },
  ];

  const filteredHistory = useMemo(() => {
    if (filter === 'Partial') return history.filter(o => o.status === 'Partial');
    if (filter === 'Most Ordered') return [...history].sort((a, b) => b.count - a.count);
    return history;
  }, [filter]);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFeedback({ userName: 'Alex Hearth', rating, comment });
    setShowFeedbackForm(false);
    setComment('');
    setRating(5);
  };

  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-32 px-4 md:px-6 max-w-4xl mx-auto space-y-8 md:space-y-10">
      <section className="flex flex-col md:flex-row items-center gap-6 md:gap-8 glass-panel p-6 md:p-8 rounded-2xl border border-white/5">
        <div className="w-24 md:w-32 h-24 md:h-32 rounded-full overflow-hidden border-4 border-primary-container/20 flex-shrink-0">
          <img 
            src="https://picsum.photos/seed/alex/200/200" 
            alt="Profile" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">Alex Hearth</h1>
              <p className="text-on-surface-variant font-medium">alex@example.com • +1 (555) 012-3456</p>
            </div>
            <button 
              onClick={onLogout}
              className="px-6 py-2 rounded-full bg-surface-container-highest text-on-surface text-sm font-bold hover:bg-red-500/10 hover:text-red-400 transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-on-surface-variant text-xs md:text-sm">
            <span className="flex items-center gap-1"><Phone size={14} /> +1 555-0123</span>
            <span className="flex items-center gap-1"><Bell size={14} /> alex@kinetichearth.com</span>
          </div>
          <div className="pt-1 md:pt-2">
            <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded-full uppercase tracking-widest">Premium Member</span>
          </div>
        </div>
        <button 
          onClick={() => setShowFeedbackForm(true)}
          className="w-full md:w-auto px-6 py-3 bg-surface-container-highest hover:bg-primary-container hover:text-on-primary-fixed transition-all rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <MessageSquarePlus size={20} />
          Leave Feedback
        </button>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <History className="text-primary-container" />
            <h2 className="text-xl md:text-2xl font-black tracking-tight">Order History</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Recent', 'Most Ordered', 'Partial'].map(chip => (
              <button 
                key={chip}
                onClick={() => setFilter(chip)}
                className={`px-3 md:px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${filter === chip ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant'}`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredHistory.map(order => (
            <div key={order.id} className="glass-panel p-6 rounded-xl border border-white/5 flex items-center justify-between group hover:border-primary-container/30 transition-all">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">#{order.id}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${order.status === 'Completed' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'}`}>
                    {order.status}
                  </span>
                </div>
                <p className="font-bold text-on-surface">{order.items}</p>
                <p className="text-xs text-on-surface-variant">{order.date} • ${order.total.toFixed(2)}</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary-container transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {showFeedbackForm && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFeedbackForm(false)}
              className="absolute inset-0 bg-surface/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative glass-panel p-8 rounded-2xl border border-white/10 w-full max-w-md space-y-6"
            >
              <h3 className="text-2xl font-black tracking-tight">Share Your Experience</h3>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button 
                        key={s} 
                        type="button"
                        onClick={() => setRating(s)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${rating >= s ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-highest text-on-surface-variant'}`}
                      >
                        <Star size={20} fill={rating >= s ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Comment</label>
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-container outline-none transition-all h-32 resize-none"
                    placeholder="How was the food? Any suggestions?"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setShowFeedbackForm(false)}
                    className="flex-1 py-4 rounded-xl font-bold border border-outline-variant/20 hover:bg-surface-container-highest transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-primary-container text-on-primary-container py-4 rounded-xl font-black transition-all active:scale-95"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

// --- Dashboard Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`liquid-glass liquid-glass-noise glass-card-hover rounded-2xl p-6 ${className}`}
      style={{ '--mouse-x': `${mousePos.x}%`, '--mouse-y': `${mousePos.y}%` } as any}
    >
      <div className="absolute inset-0 specular-highlight pointer-events-none opacity-50" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, value, trend, icon: Icon, color }: { title: string, value: string, trend?: string, icon: any, color: string }) => (
  <GlassCard className="flex flex-col justify-between h-full">
    <div className="flex items-center justify-between mb-4">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">{title}</span>
      <div className={`p-2 rounded-lg bg-${color}/10 text-${color}`}>
        <Icon size={18} />
      </div>
    </div>
    <div className="space-y-1">
      <h4 className="text-3xl font-black text-on-surface tracking-tighter italic">{value}</h4>
      {trend && (
        <div className="flex items-center gap-1 text-[10px] font-bold text-green-400">
          <TrendingUp size={12} />
          <span>{trend}</span>
        </div>
      )}
    </div>
  </GlassCard>
);

const KitchenFeed = ({ orders, onUpdateStatus }: { orders: Order[], onUpdateStatus: (id: string, status: Order['status']) => void }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-black uppercase tracking-tight italic">Live Kitchen Feed</h3>
      <div className="flex gap-2">
        <span className="glass-badge bg-green-500/10 text-green-500 border-green-500/20">8 Active</span>
      </div>
    </div>
    <div className="space-y-3">
      {orders.map((order, i) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <GlassCard className="p-3 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              {/* Order Image / ID */}
              <div className="relative w-16 h-16 flex-shrink-0">
                <div className="absolute inset-0 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                  {order.items[0]?.image ? (
                    <img src={order.items[0].image} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-black text-primary-container text-xs">
                      #{order.id.slice(-3)}
                    </div>
                  )}
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary-container text-black rounded-lg flex items-center justify-center text-[10px] font-black shadow-lg">
                  {order.id.slice(-2)}
                </div>
              </div>

              <div>
                <h5 className="font-black text-sm text-on-surface uppercase tracking-tight italic leading-none mb-1">
                  {order.customerName}
                </h5>
                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-[0.1em] mb-1">
                  {order.items.map(item => item.name).join(', ') || 'Custom Order'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-white/40 uppercase">{order.timestamp}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-[9px] font-black text-primary-container uppercase tracking-widest">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`glass-badge text-[9px] px-2 py-0.5 ${
                order.status === 'pending' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                order.status === 'preparing' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                'bg-green-500/10 text-green-400 border-green-500/20'
              }`}>
                {order.status}
              </div>
              
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {order.status === 'pending' && (
                  <button onClick={() => onUpdateStatus(order.id, 'preparing')} className="p-2 bg-white/5 hover:bg-orange-500/20 hover:text-orange-400 rounded-lg text-white transition-all">
                    <Play size={14} />
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button onClick={() => onUpdateStatus(order.id, 'ready')} className="p-2 bg-white/5 hover:bg-green-500/20 hover:text-green-400 rounded-lg text-white transition-all">
                    <Check size={14} />
                  </button>
                )}
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all">
                  <MoreVertical size={14} />
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </div>
);

const InventoryWidget = ({ items }: { items: InventoryItem[] }) => (
  <GlassCard className="h-full">
    <h3 className="text-sm font-black uppercase tracking-widest mb-6 italic">Critical Stock</h3>
    <div className="space-y-6">
      {items.map(item => {
        const percentage = (item.stock / item.minStock) * 50; // Simplified logic
        const isLow = item.stock <= item.minStock;
        return (
          <div key={item.id} className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
              <span className="text-on-surface">{item.name}</span>
              <span className={isLow ? 'text-red-400' : 'text-on-surface-variant'}>{item.stock} {item.unit}</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, percentage)}%` }}
                className={`h-full rounded-full ${isLow ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-primary-container'}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  </GlassCard>
);

const StaffWidget = ({ staff }: { staff: StaffMember[] }) => (
  <GlassCard className="h-full">
    <h3 className="text-sm font-black uppercase tracking-widest mb-6 italic">Staff Status</h3>
    <div className="space-y-4">
      {staff.map(member => (
        <div key={member.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={member.avatar} className="w-10 h-10 rounded-xl object-cover grayscale-[0.5] hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#121212] ${
                member.status === 'on-shift' ? 'bg-green-500' : 'bg-gray-500'
              }`} />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">{member.name}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{member.role}</p>
            </div>
          </div>
          <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
            member.status === 'on-shift' ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/40'
          }`}>
            {member.status}
          </div>
        </div>
      ))}
    </div>
  </GlassCard>
);

const DashboardScreen = ({ feedbacks }: { feedbacks: Feedback[] }) => {
  const [orders, setOrders] = useState<Order[]>([
    { 
      id: 'ORD-772', 
      customerName: 'Marcus V.', 
      items: [{ ...FOOD_ITEMS[0], quantity: 1 }], 
      total: 45.50, 
      status: 'preparing', 
      timestamp: '12:45 PM' 
    },
    { 
      id: 'ORD-773', 
      customerName: 'Sarah L.', 
      items: [{ ...FOOD_ITEMS[3], quantity: 2 }], 
      total: 30.00, 
      status: 'pending', 
      timestamp: '12:48 PM' 
    },
    { 
      id: 'ORD-774', 
      customerName: 'John D.', 
      items: [{ ...FOOD_ITEMS[9], quantity: 1 }], 
      total: 21.00, 
      status: 'pending', 
      timestamp: '12:50 PM' 
    },
    { 
      id: 'ORD-775', 
      customerName: 'Elena R.', 
      items: [{ ...FOOD_ITEMS[12], quantity: 1 }], 
      total: 14.00, 
      status: 'preparing', 
      timestamp: '12:52 PM' 
    },
  ]);

  const inventory: InventoryItem[] = [
    { id: '1', name: 'Wagyu Beef', stock: 12, minStock: 20, unit: 'kg' },
    { id: '2', name: 'Brioche Buns', stock: 45, minStock: 40, unit: 'pcs' },
    { id: '3', name: 'Truffle Aioli', stock: 2, minStock: 5, unit: 'L' },
    { id: '4', name: 'Heirloom Corn', stock: 15, minStock: 10, unit: 'kg' },
  ];

  const staff: StaffMember[] = [
    { id: '1', name: 'Chef Alex', role: 'Head Grill Master', status: 'on-shift', avatar: 'https://i.pravatar.cc/150?u=alex' },
    { id: '2', name: 'Maria S.', role: 'Prep Lead', status: 'on-shift', avatar: 'https://i.pravatar.cc/150?u=maria' },
    { id: '3', name: 'James K.', role: 'Logistics', status: 'break', avatar: 'https://i.pravatar.cc/150?u=james' },
  ];

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-on-surface pt-20">
      {/* Sidebar */}
      <aside className="w-64 xl:w-72 hidden lg:flex flex-col h-[calc(100vh-5rem)] sticky top-20 border-r border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl z-50">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,87,34,0.4)]">
              <Flame size={24} className="text-black" />
            </div>
            <h2 className="text-xl font-black tracking-tighter italic">HEARTH <span className="text-primary-container">OS</span></h2>
          </div>
          
          <nav className="space-y-2">
            {[
              { label: 'Dashboard', icon: LayoutDashboard, active: true },
              { label: 'Live Orders', icon: Utensils },
              { label: 'Inventory', icon: Box },
              { label: 'Menu Manager', icon: BookOpen },
              { label: 'Staffing', icon: Users },
              { label: 'Analytics', icon: BarChart3 },
            ].map((item) => (
              <div 
                key={item.label}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${
                  item.active 
                    ? 'bg-primary-container/10 text-primary-container border border-primary-container/20 shadow-[0_0_20px_rgba(255,87,34,0.1)]' 
                    : 'text-on-surface-variant hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} className={item.active ? 'text-primary-container' : 'group-hover:scale-110 transition-transform'} />
                <span className="text-sm font-bold uppercase tracking-tight">{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 space-y-6">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
            <img src={staff[0].avatar} className="w-10 h-10 rounded-xl object-cover" referrerPolicy="no-referrer" />
            <div className="overflow-hidden">
              <p className="text-xs font-black uppercase tracking-tight truncate">{staff[0].name}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{staff[0].role}</p>
            </div>
          </div>
          <button className="w-full py-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-500/20 transition-all active:scale-95">
            End Shift
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-10 overflow-y-auto no-scrollbar">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic">Live Dashboard</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 glass-badge bg-green-500/10 text-green-500 border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Truck Active
              </div>
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Downtown Night Market • 12:55 PM</span>
            </div>
          </div>
          <button className="glass-button glass-button-primary flex items-center gap-3 shadow-[0_15px_30px_rgba(255,87,34,0.2)]">
            <Plus size={20} />
            <span className="uppercase tracking-tighter">New Order</span>
          </button>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard title="Daily Revenue" value="$2,840.50" trend="+12.5% vs yesterday" icon={Banknote} color="primary-container" />
          <StatCard title="Total Orders" value="142" trend="+8.2% vs yesterday" icon={Receipt} color="tertiary" />
          <StatCard title="Order Velocity" value="12.4/hr" trend="+2.1% peak" icon={Zap} color="orange-400" />
          <StatCard title="Kitchen Load" value="85%" icon={Flame} color="red-400" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Center Feed */}
          <div className="xl:col-span-8 space-y-8">
            <KitchenFeed orders={orders} onUpdateStatus={updateOrderStatus} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GlassCard className="h-full">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-black uppercase tracking-widest italic">Revenue Analytics</h3>
                  <BarChart3 size={18} className="text-on-surface-variant" />
                </div>
                <div className="h-48 flex items-end gap-2">
                  {[40, 65, 55, 85, 100, 45, 60].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex-1 rounded-t-lg relative group transition-all ${i === 4 ? 'bg-primary-container shadow-[0_0_20px_rgba(255,87,34,0.3)]' : 'bg-white/5 hover:bg-white/10'}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[8px] font-black uppercase tracking-widest text-on-surface-variant">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </GlassCard>

              <GlassCard className="h-full">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-black uppercase tracking-widest italic">Recent Feedback</h3>
                  <MessageCircle size={18} className="text-on-surface-variant" />
                </div>
                <div className="space-y-4">
                  {feedbacks.slice(0, 3).map((f, i) => (
                    <div key={f.id} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-on-surface">{f.userName}</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={8} className={i < f.rating ? 'fill-primary-container text-primary-container' : 'text-white/10'} />
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-on-surface-variant line-clamp-2">{f.comment}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Right Panel */}
          <div className="xl:col-span-4 space-y-8">
            <InventoryWidget items={inventory} />
            <StaffWidget staff={staff} />
          </div>
        </div>
      </main>
    </div>
  );
};

const CartSheet = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity,
  onPlaceOrder
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  cartItems: CartItem[],
  onUpdateQuantity: (id: string, delta: number) => void,
  onPlaceOrder: () => void
}) => {
  const [isDesktop, setIsDesktop] = useState(false);

  React.useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1280);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  // ESC key listener
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const CartContent = () => (
    <>
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Light Reflection Gradient */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5 relative z-10">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black tracking-tight text-white uppercase italic">My Cart</h2>
          <span className="px-3 py-1 bg-[#FF5722]/10 border border-[#FF5722]/20 rounded-full text-[10px] font-black tracking-widest text-[#FF5722]">
            {cartItems.length}
          </span>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all active:scale-90"
        >
          <Plus className="rotate-45" size={20} />
        </button>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar relative z-10">
        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
            <ShoppingCart size={48} strokeWidth={1} />
            <p className="font-bold uppercase tracking-widest text-xs">Your cart is empty</p>
            <button 
              onClick={onClose}
              className="text-[#FF5722] text-xs font-black uppercase tracking-widest hover:underline"
            >
              Start Adding
            </button>
          </div>
        ) : (
          cartItems.map(item => (
            <motion.div 
              layout
              key={item.id} 
              className="flex items-center gap-5 group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/10 shadow-lg group-hover:shadow-[#FF5722]/10">
                <img src={item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-black text-white text-base md:text-lg leading-tight truncate uppercase italic">{item.name}</h4>
                  <span className="font-black text-white text-base md:text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <p className="text-white/40 text-[10px] md:text-xs truncate uppercase tracking-tight">{item.description}</p>
                
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-4 bg-white/5 rounded-full p-1 border border-white/10">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-all active:scale-90"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-black text-white w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#FF5722] text-black flex items-center justify-center active:scale-90 transition-all shadow-[0_0_15px_rgba(255,87,34,0.3)]"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className={`p-6 md:p-8 space-y-6 bg-black/40 backdrop-blur-xl border-t border-white/10 relative z-10 ${!isDesktop ? 'pb-12' : ''}`}>
        <div className="space-y-3">
          <div className="flex justify-between text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40">
            <span>Subtotal</span>
            <span className="text-white">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40">
            <span>Delivery Fee</span>
            <span className="text-[#FF5722]">Calculated at checkout</span>
          </div>
          <div className="flex justify-between items-end pt-4 border-t border-white/5">
            <span className="text-xs md:text-sm font-black uppercase tracking-widest text-white">Total Amount</span>
            <span className="text-3xl md:text-4xl font-black text-[#FF5722] tracking-tighter italic">${total.toFixed(2)}</span>
          </div>
        </div>
        <button 
          onClick={onPlaceOrder}
          disabled={cartItems.length === 0}
          className="w-full group relative bg-[#FF5722] text-black py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl uppercase tracking-tighter flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,87,34,0.25)] hover:shadow-[0_25px_50px_rgba(255,87,34,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 flex items-center gap-2">
            Fuel Up Now 🚀
          </span>
        </button>
      </div>
    </>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-0 z-[100] flex overflow-hidden ${isDesktop ? 'justify-end' : 'flex-col justify-end'}`}>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Cart Panel / Bottom Sheet */}
          <motion.div 
            initial={isDesktop ? { x: '100%' } : { y: '100%', scale: 0.95, opacity: 0 }}
            animate={isDesktop ? { x: 0 } : { y: 0, scale: 1, opacity: 1 }}
            exit={isDesktop ? { x: '100%' } : { y: '100%', scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`relative bg-[#141414]/60 backdrop-blur-[30px] border-white/20 shadow-[0_40px_120px_rgba(0,0,0,0.8),0_0_40px_rgba(255,87,34,0.08),inset_0_0_20px_rgba(255,255,255,0.05)] flex flex-col overflow-hidden ${
              isDesktop 
                ? 'w-full xl:w-[420px] h-full border-l' 
                : 'w-[calc(100%-1.5rem)] max-w-2xl mx-auto mb-6 rounded-[3.5rem] border max-h-[85vh]'
            }`}
          >
            {!isDesktop && (
              <>
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-16 h-1.5 bg-white/20 rounded-full shadow-inner" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-30" />
              </>
            )}
            <CartContent />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

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
    // Silent add - do not open cart
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

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setIsAuthenticated(true); // Admin is also authenticated
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

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <Header 
        currentScreen={currentScreen} 
        onNavigate={handleNavigate} 
        isAdmin={isAdmin} 
        isAuthenticated={isAuthenticated}
        onLogout={handleCustomerLogout}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {currentScreen === 'home' && (
            <HomeScreen 
              onExplore={() => handleNavigate('menu')} 
              onAddToCart={addToCart}
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
            />
          )}
          {currentScreen === 'menu' && (
            <MenuScreen 
              onAddToCart={addToCart} 
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
            />
          )}
          {currentScreen === 'order-status' && <OrderStatusScreen />}
          {currentScreen === 'dashboard' && isAdmin && <DashboardScreen feedbacks={feedbacks} />}
          {currentScreen === 'admin-login' && <AdminLoginScreen onLogin={handleAdminLogin} onBack={() => setCurrentScreen('home')} />}
          {currentScreen === 'customer-login' && <CustomerLoginScreen onLogin={handleCustomerLogin} onBack={() => setCurrentScreen('home')} />}
          {currentScreen === 'profile' && <ProfileScreen onFeedback={handleAddFeedback} onLogout={handleCustomerLogout} />}
        </motion.div>
      </AnimatePresence>

      <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} onOpenCart={() => setIsCartOpen(true)} isAdmin={isAdmin} cartCount={cartItems.length} />
      
      <CartSheet 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onPlaceOrder={placeOrder}
      />

      {/* Background Decoration */}
      <div className="fixed top-1/4 -right-24 w-96 h-96 bg-primary-container/10 blur-[120px] -z-10 rounded-full"></div>
      <div className="fixed bottom-1/4 -left-24 w-64 h-64 bg-tertiary/10 blur-[100px] -z-10 rounded-full"></div>
    </div>
  );
}
