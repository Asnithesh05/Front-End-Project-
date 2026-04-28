import React from 'react';
import { HeroSection } from './components/HeroSection';
import { FeaturedItemsSection } from './components/FeaturedItemsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { ResponsiveContainer } from '../../components/global/ResponsiveContainer';
import { FoodItem, CartItem } from '../../types/types';

interface FeedPageProps {
  onExplore: () => void;
  onAddToCart: (item: FoodItem) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const FeedPage = ({ onExplore, onAddToCart, cartItems, onUpdateQuantity }: FeedPageProps) => {
  return (
    <div className="space-y-0">
      <HeroSection onExplore={onExplore} />
      <ResponsiveContainer>
        <FeaturedItemsSection 
          onAddToCart={onAddToCart} 
          cartItems={cartItems} 
          onUpdateQuantity={onUpdateQuantity} 
        />
      </ResponsiveContainer>
      <NewsletterSection />
    </div>
  );
};
