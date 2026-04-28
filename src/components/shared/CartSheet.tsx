import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { CartItem } from '../../types/types';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onPlaceOrder: () => void;
}

export const CartSheet = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity,
  onPlaceOrder
}: CartSheetProps) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1280);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  // ESC key listener
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const CartContent = () => (
    <>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

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
