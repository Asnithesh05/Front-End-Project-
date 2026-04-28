import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen } from 'lucide-react';

interface Category {
  name: string;
  icon: string;
}

interface MenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (name: string) => void;
  getCount: (name: string) => number;
}

export const MenuPopup = ({ isOpen, onClose, categories, activeCategory, setActiveCategory, getCount }: MenuPopupProps) => (
  <>
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[900]"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="menu-popup-container"
          >
            <div className="p-4 flex flex-col gap-1">
              <div className="px-4 py-3 border-b border-white/5 mb-2">
                <h3 className="text-white text-sm font-black uppercase tracking-widest opacity-40">Categories</h3>
              </div>
              {categories.map((cat) => (
                <div 
                  key={cat.name}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    onClose();
                  }}
                  className={`menu-popup-item rounded-xl ${activeCategory === cat.name ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="label">{cat.name}</span>
                  </div>
                  <span className="count">{getCount(cat.name)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    <button 
      onClick={onClose}
      className="floating-menu-btn"
    >
      <div className="btn-icon">
        <BookOpen size={24} strokeWidth={2.5} />
      </div>
      <span className="btn-text">MENU</span>
    </button>
  </>
);
