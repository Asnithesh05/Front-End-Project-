import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { FoodItem, CartItem } from '../../../types/types';
import { SpiceHeatMap } from '../../../components/global/SpiceHeatMap';
import { QuantitySelector } from '../../../components/global/QuantitySelector';

interface FoodCardProps {
  item: FoodItem;
  idx: number;
  cartItem?: CartItem;
  onAddToCart: (item: FoodItem) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, idx, cartItem, onAddToCart, onUpdateQuantity }) => (
  <motion.div 
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
