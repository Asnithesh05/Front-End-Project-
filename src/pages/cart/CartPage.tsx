import React from 'react';
import { ResponsiveContainer } from '../../components/global/ResponsiveContainer';
import { CartSheet } from '../../components/shared/CartSheet';
import { CartItem } from '../../types/types';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onPlaceOrder: () => void;
}

export const CartPage = ({ cartItems, onUpdateQuantity, onPlaceOrder }: CartPageProps) => {
  return (
    <ResponsiveContainer className="py-24 flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-xl glass-card overflow-hidden">
        <CartSheet 
          isOpen={true} 
          onClose={() => {}} 
          cartItems={cartItems} 
          onUpdateQuantity={onUpdateQuantity} 
          onPlaceOrder={onPlaceOrder} 
        />
      </div>
    </ResponsiveContainer>
  );
};
