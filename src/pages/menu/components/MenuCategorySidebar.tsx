import React from 'react';

interface Category {
  name: string;
  icon: string;
}

interface MenuCategorySidebarProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (name: string) => void;
  getCount: (name: string) => number;
}

export const MenuCategorySidebar = ({ categories, activeCategory, setActiveCategory, getCount }: MenuCategorySidebarProps) => (
  <aside className="w-1/5 sticky top-32 h-fit space-y-2 pr-8 hidden xl:block">
    {categories.map((cat) => (
      <div 
        key={cat.name}
        onClick={() => setActiveCategory(cat.name)}
        className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-all duration-300 ${
          activeCategory === cat.name 
            ? 'bg-[#FF5722] text-black rounded-r-full shadow-[0_10px_20px_rgba(255,87,34,0.3)]' 
            : 'text-white/50 hover:bg-white/5 rounded-r-full'
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="text-xl">{cat.icon}</span>
          <span className="font-bold">{cat.name}</span>
        </div>
        <span className={`text-xs font-mono ${activeCategory === cat.name ? 'text-black/60' : 'opacity-40'}`}>
          {getCount(cat.name)}
        </span>
      </div>
    ))}
  </aside>
);
