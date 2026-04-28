import React from 'react';
import { motion } from 'motion/react';
import { FoodItem, CartItem } from '../../../types/types';
import { QuantitySelector } from '../../../components/global/QuantitySelector';

interface FeaturedItemsSectionProps {
  onAddToCart: (item: FoodItem) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const FeaturedItemsSection = ({ onAddToCart, cartItems, onUpdateQuantity }: FeaturedItemsSectionProps) => (
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
