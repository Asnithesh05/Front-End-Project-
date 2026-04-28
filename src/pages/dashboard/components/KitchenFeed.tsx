import React from 'react';
import { motion } from 'motion/react';
import { Play, Check, MoreVertical } from 'lucide-react';
import { Order } from '../../../types/types';
import { GlassCard } from '../../../components/global/GlassCard';

interface KitchenFeedProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: Order['status']) => void;
}

export const KitchenFeed = ({ orders, onUpdateStatus }: KitchenFeedProps) => (
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
