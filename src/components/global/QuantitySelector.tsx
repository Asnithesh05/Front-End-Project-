import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onUpdate: (delta: number) => void;
}

export const QuantitySelector = ({ quantity, onUpdate }: QuantitySelectorProps) => (
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
