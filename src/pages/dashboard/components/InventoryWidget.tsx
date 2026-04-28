import React from 'react';
import { motion } from 'motion/react';
import { InventoryItem } from '../../../types/types';
import { GlassCard } from '../../../components/global/GlassCard';

interface InventoryWidgetProps {
  items: InventoryItem[];
}

export const InventoryWidget = ({ items }: InventoryWidgetProps) => (
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
