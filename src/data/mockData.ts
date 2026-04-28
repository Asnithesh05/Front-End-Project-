import { FoodItem, InventoryItem, StaffMember, Order } from '../types/types';

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Smoked Truffle Smash',
    price: 18.00,
    category: 'Smash Burgers',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvF02vjGTMpB7j7DL6xY4SjB0R2OhON7N26pdXdg50mclerUqhnZUbcqXPmfQ02CACb7XI4ZRKJAg8fxYGc5OsWzhrVZzx7rKEDBz6Acm9-WKCeVp6YLXWpQHsjNM8834aLi-_0-Pg9aRJxn1m1-K25S0LyjmU0x4YT-HIbZstxQHYoFjmM67j1n_KSDS6KO_YLC2awqsu8Iny1RYMW-KZ8SKnzK_PVk3qiUiyJSevvz6f0T0lb2a7R66fiCegtk2VHH2vguCA2hU',
    description: 'Double wagyu beef, black truffle aioli, aged cheddar, and smoked onions on brioche.',
    spiceLevel: 1,
    isBestseller: true
  },
  {
    id: '2',
    name: 'Neon Al Pastor',
    price: 14.00,
    category: 'Artisan Tacos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEPxM0S5Q-XInK0CylJp3n_8Y3v2Y3M_35K5-aXm3G-fGZtX-f3s-z6-OQ-XInK0CylJp3n_8Y3v2Y3M_35K5-aXm3G-fGZtX-f3s-z6-OQ-XInK0CylJp3n_8Y3v2Y3M_35K5-aXm3G-fGZtX-f3s-z6-OQ',
    description: 'Heirloom corn tacos, guajillo pork, roasted pineapple salsa, and electric cilantro.',
    spiceLevel: 3
  },
  {
    id: '3',
    name: 'Thermal Grain Bowl',
    price: 16.00,
    category: 'Kinetic Bowls',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoexTME2Qc5T5wurxLWoghbLOV_53-OxuCLiYkkhzC4WLXbCewoaCuO4o1oIUNzpCJ01930bUcajzw6s5_0OLRWMwL1RQgmVGz1hc98Ecu5_RbDK2Udcbj7oRwYFg4wOkViwIizZI9HTO80sBYOpxoZ3X22mtLWHZlkGY1uZEjH5FYrza60xNnkhiwBU_v0D5Y9_MbHM3V53NHo-fJCDPC078WEOkY-4_rUMBrUU5s5SO5t8iMS28e2ZEo3sdlyVsM2uVFvrILVxI',
    description: 'Quinoa, charred kale, roasted roots, miso-tahini dressing, and kinetic pepitas.',
    spiceLevel: 0
  },
  {
    id: '4',
    name: 'Kinetic Fries',
    price: 6.00,
    category: 'Thermal Sides',
    image: 'https://picsum.photos/seed/fries/800/600',
    description: 'Triple-cooked fries with signature hearth salt and chipotle dust.',
    spiceLevel: 2
  },
  {
    id: '5',
    name: 'Cyber Elixir',
    price: 5.00,
    category: 'Elixirs',
    image: 'https://picsum.photos/seed/drink/800/600',
    description: 'House-made lemonade with activated charcoal and hibiscus sparks.',
    spiceLevel: 0
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: '1', name: 'Wagyu Beef Patties', stock: 12, unit: 'pcs', minStock: 25 },
  { id: '2', name: 'Brioche Buns', stock: 8, unit: 'pcs', minStock: 20 },
  { id: '3', name: 'Truffle Aioli', stock: 1.5, unit: 'L', minStock: 3 },
  { id: '4', name: 'Al Pastor Pork', stock: 5, unit: 'kg', minStock: 4 }
];

export const INITIAL_STAFF: StaffMember[] = [
  { id: '1', name: 'Elena Vance', role: 'Head Cook', avatar: 'https://i.pravatar.cc/150?u=elena', status: 'on-shift' },
  { id: '2', name: 'Marcus Thorne', role: 'Logistics', avatar: 'https://i.pravatar.cc/150?u=marcus', status: 'on-shift' },
  { id: '3', name: 'Sasha Grey', role: 'Dining Staff', avatar: 'https://i.pravatar.cc/150?u=sasha', status: 'off-shift' }
];

export const INITIAL_ORDERS: Order[] = [
  { 
    id: 'ORD-2914', 
    customerName: 'Marcus V.', 
    items: [], 
    total: 36.00, 
    status: 'preparing', 
    timestamp: '2m ago' 
  },
  { 
    id: 'ORD-2915', 
    customerName: 'Sarah L.', 
    items: [], 
    total: 14.00, 
    status: 'pending', 
    timestamp: '5m ago' 
  },
  { 
    id: 'ORD-2916', 
    customerName: 'Dexter H.', 
    items: [], 
    total: 22.50, 
    status: 'preparing', 
    timestamp: '8m ago' 
  }
];
