import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { FoodItem, CartItem } from '../../types/types';
import { FoodCard } from './components/FoodCard';
import { MenuCategorySidebar } from './components/MenuCategorySidebar';
import { MenuPopup } from './components/MenuPopup';
import { ResponsiveContainer } from '../../components/global/ResponsiveContainer';

interface MenuPageProps {
  foodItems: FoodItem[];
  onAddToCart: (item: FoodItem) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const MenuPage = ({ foodItems, onAddToCart, cartItems, onUpdateQuantity }: MenuPageProps) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { name: 'All', icon: '🍽️' },
    { name: 'Smash Burgers', icon: '🍔' },
    { name: 'Artisan Tacos', icon: '🌮' },
    { name: 'Kinetic Bowls', icon: '🥗' },
    { name: 'Thermal Sides', icon: '🍟' },
    { name: 'Elixirs', icon: '🥤' }
  ];

  const filteredItems = useMemo(() => {
    return foodItems.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [foodItems, activeCategory, searchQuery]);

  const getCount = (cat: string) => cat === 'All' ? foodItems.length : foodItems.filter(i => i.category === cat).length;

  return (
    <ResponsiveContainer className="py-24 md:py-32">
      <div className="flex flex-col xl:flex-row gap-12 relative items-start">
        <MenuCategorySidebar 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
          getCount={getCount} 
        />

        <div className="flex-1 w-full space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-on-surface uppercase italic">
                {activeCategory} <span className="text-primary-container">Menu</span>
              </h2>
              <p className="text-on-surface-variant text-sm tracking-widest mt-2 uppercase font-bold">
                {filteredItems.length} Handcrafted Creations Found
              </p>
            </div>
            
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-container" size={18} />
              <input 
                type="text" 
                placeholder="Search flavors..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-8 py-5 glass-panel rounded-2xl border-white/5 focus:border-primary-container transition-all text-sm outline-none placeholder:text-on-surface-variant/50 focus:shadow-[0_0_20px_rgba(255,87,34,0.1)]"
              />
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 text-center"
            >
              <div className="text-6xl mb-6 opacity-20 italic font-black text-on-surface">No Matches</div>
              <p className="text-on-surface-variant max-w-md mx-auto">The hearth is cold for this search. Try a different signature or explore our full collection.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
              {filteredItems.map((item, idx) => (
                <FoodCard 
                  key={item.id} 
                  item={item} 
                  idx={idx} 
                  cartItem={cartItems.find(ci => ci.id === item.id)}
                  onAddToCart={onAddToCart}
                  onUpdateQuantity={onUpdateQuantity}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <MenuPopup 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(!isMenuOpen)} 
        categories={categories} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        getCount={getCount} 
      />
    </ResponsiveContainer>
  );
};
