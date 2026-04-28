import React from 'react';
import { Utensils, BookOpen, ReceiptText, ShoppingCart, User } from 'lucide-react';
import { Screen } from '../../types/types';

interface BottomNavProps {
  onNavigate: (s: Screen) => void;
  currentScreen: Screen;
  onOpenCart: () => void;
  isAdmin: boolean;
  cartCount: number;
}

export const BottomNav = ({ onNavigate, currentScreen, onOpenCart, cartCount }: BottomNavProps) => {
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
