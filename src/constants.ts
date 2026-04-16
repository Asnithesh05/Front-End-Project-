import { FoodItem } from './types';

export const FOOD_ITEMS: FoodItem[] = [
  // 🔥 Smoky BBQ
  {
    id: 'bbq-1',
    name: '12-Hour Midnight Brisket',
    description: 'Hickory-smoked wagyu brisket with a charcoal rub and ghost pepper aioli.',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58b34ecdf?auto=format&fit=crop&q=80&w=800',
    category: 'Smoky BBQ',
    isPremium: true,
    spiceLevel: 70
  },
  {
    id: 'bbq-2',
    name: 'Fire-Pit Ribs',
    description: 'Fall-off-the-bone pork ribs glazed in a sticky bourbon-espresso BBQ sauce.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    category: 'Smoky BBQ',
    isBestseller: true,
    spiceLevel: 30
  },
  {
    id: 'bbq-3',
    name: 'Smoked Pulled Pork Sliders',
    description: 'Served on toasted brioche with a neon purple cabbage slaw.',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1547584385-8cdbb3777e2e?auto=format&fit=crop&q=80&w=800',
    category: 'Smoky BBQ',
    spiceLevel: 20
  },

  // 🍜 Barma Food
  {
    id: 'barma-1',
    name: 'Rangoon Tea Leaf Salad',
    description: 'Fermented tea leaves, fried garlic, roasted peanuts, and chili flakes.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    category: 'Barma Food',
    isBestseller: true,
    spiceLevel: 40
  },
  {
    id: 'barma-2',
    name: 'Coconut Curry Noodles',
    description: 'Rich coconut chicken broth over egg noodles, topped with crispy shallots and lime.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800',
    category: 'Barma Food',
    spiceLevel: 30
  },
  {
    id: 'barma-3',
    name: 'Golden Tofu Fritters',
    description: 'Crispy chickpea tofu served with a sweet and tangy tamarind dipping sauce.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    category: 'Barma Food',
    spiceLevel: 10
  },

  // 🥢 Chinese Foods
  {
    id: 'chinese-1',
    name: 'Sichuan Ghost Wontons',
    description: 'Pork and shrimp wontons swimming in a fiery roasted chili oil.',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800',
    category: 'Chinese Foods',
    isBestseller: true,
    spiceLevel: 90
  },
  {
    id: 'chinese-2',
    name: 'Peking Duck Bao Buns',
    description: 'Steamed fluffy buns filled with crispy duck skin, hoisin, and scallions.',
    price: 19.00,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c170db06?auto=format&fit=crop&q=80&w=800',
    category: 'Chinese Foods',
    isPremium: true,
    spiceLevel: 10
  },
  {
    id: 'chinese-3',
    name: 'Charcoal Fried Rice',
    description: 'Wok-tossed rice with active charcoal, lap cheong (sweet sausage), and a sunny-side-up egg.',
    price: 17.00,
    image: 'https://images.unsplash.com/photo-1512058560366-cd2427ff56f3?auto=format&fit=crop&q=80&w=800',
    category: 'Chinese Foods',
    spiceLevel: 20
  },

  // 🍔 American Foods
  {
    id: 'american-1',
    name: 'Black Truffle Smashburger',
    description: 'Double-smashed beef patties, aged cheddar, and truffle butter on a potato bun.',
    price: 21.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    category: 'American Foods',
    isPremium: true,
    spiceLevel: 10
  },
  {
    id: 'american-2',
    name: 'Neon Mac & Cheese Bites',
    description: 'Panko-crusted deep-fried mac and cheese served with spicy honey drizzle.',
    price: 13.00,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800',
    category: 'American Foods',
    spiceLevel: 30
  },
  {
    id: 'american-3',
    name: 'Urban Hot Chicken Sandwich',
    description: 'Nashville-style spicy fried chicken with house-made thick-cut pickles.',
    price: 17.50,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800',
    category: 'American Foods',
    isBestseller: true,
    spiceLevel: 80
  },

  // 🌙 Midnight Snacks
  {
    id: 'midnight-1',
    name: 'Kimchi Loaded Fries',
    description: 'Crispy shoestring fries topped with melted cheese, caramelized kimchi, and gochujang mayo.',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=800',
    category: 'Midnight Snacks',
    spiceLevel: 50
  },
  {
    id: 'midnight-2',
    name: 'Urban Elote Bowl',
    description: 'Sweet street corn off the cob, smoked paprika, cotija cheese, and lime crema.',
    price: 11.00,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&q=80&w=800',
    category: 'Midnight Snacks',
    spiceLevel: 20
  },
  {
    id: 'midnight-3',
    name: 'Electric Churros',
    description: 'Freshly fried churros dusted in cinnamon sugar, served with molten dark chocolate.',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800',
    category: 'Midnight Snacks',
    spiceLevel: 0
  },

  // 🥤 Drinks
  {
    id: 'drink-1',
    name: 'Electric Mule',
    description: 'Signature ginger beer, fresh lime, blood orange zest, and premium vodka (or mocktail).',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    category: 'Drinks',
    spiceLevel: 10
  },
  {
    id: 'drink-2',
    name: 'Mango Habanero Soda',
    description: 'Sweet mango puree with a spicy habanero kick, topped with sparkling water.',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800',
    category: 'Drinks',
    spiceLevel: 40
  },
  {
    id: 'drink-3',
    name: 'Matcha Blackout Slush',
    description: 'Iced ceremonial grade matcha swirled with activated charcoal syrup.',
    price: 9.50,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=800',
    category: 'Drinks',
    spiceLevel: 0
  }
];

export const CATEGORIES = ['Full Menu', 'Smoky BBQ', 'Barma Food', 'Chinese Foods', 'American Foods', 'Midnight Snacks', 'Drinks'];
