export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isBestseller?: boolean;
  isPremium?: boolean;
  tags?: string[];
  spiceLevel?: number;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export type Screen = 'home' | 'menu' | 'order-status' | 'dashboard' | 'admin-login' | 'customer-login' | 'profile';

export interface Feedback {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: string;
  orderId?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  timestamp: string;
  customerName: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  unit: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: 'on-shift' | 'off-shift' | 'break';
  avatar: string;
}
