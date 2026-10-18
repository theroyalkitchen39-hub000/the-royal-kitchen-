import { MenuItem, RestaurantSettings } from '../types';

export const INITIAL_SETTINGS: RestaurantSettings = {
  name: 'The Royal Kitchen',
  shortName: 'TRK',
  tagline: 'Ghar ka khana ghar tak.',
  whatsappNumber: '923001234567', // Configurable in admin dashboard
  location: 'Near Gulshan-e-Iqbal Block 6, Karachi, Pakistan',
  googleMapsUrl: 'https://maps.google.com/?q=Gulshan-e-Iqbal+Block+6+Karachi',
  businessHours: 'Monday – Sunday: 11:30 AM to 10:30 PM (Lunch orders by 12:00 PM, Dinner by 6:00 PM)',
  paymentPolicy: 'Online payment only (Bank Transfer / Raast / JazzCash / Nayapay). Cash on delivery is not available.',
  bankDetailsConfig: 'Bank: Meezan Bank / Raast ID: 03001234567 | Title: The Royal Kitchen (Verify upon WhatsApp confirmation)',
  deliveryInfoText: 'Delivery across Karachi. Delivery charges are calculated based on your specific area and confirmed on WhatsApp before dispatch.',
  heroHeading: 'Fresh Homemade Food, Delivered With Love.',
  heroSubheading: 'Experience the taste of authentic homemade Pakistani food, freshly prepared and delivered to your doorstep across Karachi.'
};

export const KARACHI_AREAS = [
  'Gulshan-e-Iqbal (Blocks 1-19)',
  'Gulistan-e-Jauhar',
  'Federal B Area (FB Area)',
  'North Nazimabad',
  'Nazimabad',
  'PECHS (Blocks 1-6)',
  'Bahadurabad & Tariq Road',
  'Clifton (Blocks 1-9)',
  'Defence Housing Authority (DHA Phases 1-8)',
  'KDA Scheme 1 / Karsaz',
  'Scheme 33 & Safoora Goth',
  'Malir Cantt & Model Colony',
  'Saddar & Garden',
  'Gulshan-e-Maymar',
  'North Karachi',
  'Other Karachi Area (specify in notes)'
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // --- DAILY MENU ITEMS (Changes regularly, fresh everyday) ---
  {
    id: 'daily-1',
    name: 'Home Style Chicken Qorma',
    urduName: 'شاہی چکن قورمہ',
    category: 'Daily Menu',
    description: 'Slow-cooked aromatic chicken qorma made with freshly ground spices, fried onions, and pure yogurt. Tender bone-in chicken in rich, homestyle gravy.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    price: 650,
    portions: [
      { id: 'p1', label: 'Single Portion (1 Person with 2 Ghar ki Roti)', price: 650 },
      { id: 'p2', label: 'Double Portion (2 Persons with 4 Ghar ki Roti)', price: 1200 }
    ],
    isDailyMenu: true,
    availableToday: true,
    isSoldOut: false,
    dietaryTags: ['Homestyle Spices', 'Bone-in Chicken', 'Fresh Gravy'],
    spiceLevel: 'Medium'
  },
  {
    id: 'daily-2',
    name: 'Daal Chawal & Shami Kabab Platter',
    urduName: 'دال چاول اور شامی کباب',
    category: 'Daily Menu',
    description: 'Comfort food at its best! Fragrant basmati cumin rice served with traditional yellow Moong-Masoor daal, 2 homemade crispy beef shami kababs, zeera raita, and salad.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    price: 550,
    portions: [
      { id: 'p1', label: 'Full Platter (Rice + Daal + 2 Shami Kababs)', price: 550 },
      { id: 'p2', label: 'Without Kabab (Daal + Rice + Raita)', price: 400 }
    ],
    isDailyMenu: true,
    availableToday: true,
    isSoldOut: false,
    dietaryTags: ['Comfort Meal', 'Pure Basmati Rice', 'Includes Salad & Raita'],
    spiceLevel: 'Mild'
  },
  {
    id: 'daily-3',
    name: 'Aloo Gosht (Tender Beef & Potato Curry)',
    urduName: 'آلو گوشت گریوی',
    category: 'Daily Menu',
    description: 'Traditional Karachi home-style thin soupy gravy with melt-in-mouth beef shanks and soft potatoes. Cooked with whole garam masala and fresh coriander.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    price: 750,
    portions: [
      { id: 'p1', label: 'Single Portion with 2 Roti', price: 750 },
      { id: 'p2', label: 'Family Bowl (Portion for 3-4)', price: 1950 }
    ],
    isDailyMenu: true,
    availableToday: true,
    isSoldOut: false,
    dietaryTags: ['Prime Beef', 'Homestyle Shorba', 'Fresh Roti'],
    spiceLevel: 'Medium'
  },
  {
    id: 'daily-4',
    name: 'Palak Paneer / Sabzi of the Day',
    urduName: 'پالک پنیر / تازہ سبزی',
    category: 'Daily Menu',
    description: 'Fresh farm spinach pureed and tempered with cumin, garlic, and homemade cottage cheese cubes. Light, wholesome, and prepared with minimal oil.',
    image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80',
    price: 480,
    portions: [
      { id: 'p1', label: 'Standard Portion with 2 Roti', price: 480 }
    ],
    isDailyMenu: true,
    availableToday: true,
    isSoldOut: false,
    dietaryTags: ['Vegetarian', 'Low Oil', 'Rich Iron'],
    spiceLevel: 'Mild'
  },
  {
    id: 'daily-5',
    name: 'Fresh Tawa Roti (Whole Wheat)',
    urduName: 'تازہ توے کی روٹی',
    category: 'Daily Menu',
    description: 'Freshly puffed 100% whole wheat ghar ki phulka roti prepared to order.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    price: 35,
    portions: [
      { id: 'p1', label: 'Per Piece', price: 35 },
      { id: 'p2', label: 'Pack of 5 Pieces', price: 160 }
    ],
    isDailyMenu: true,
    availableToday: true,
    isSoldOut: false,
    dietaryTags: ['100% Whole Wheat', 'No Maida'],
    spiceLevel: 'Mild'
  },

  // --- ON ORDER SPECIALS: BIRYANI & PULAO ---
  {
    id: 'spec-biryani-chicken',
    name: 'Special Chicken Biryani',
    urduName: 'سپیشل چکن بریانی',
    category: 'Biryani & Pulao',
    description: 'Dum-cooked authentic Karachi chicken biryani made with long-grain aged basmati rice, tender spiced chicken, golden potatoes (aloo), dried plums, and saffron aroma.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    price: 1300,
    portions: [
      { id: 'p-half', label: 'Half KG (approx 2 persons)', price: 1300 },
      { id: 'p-one', label: '1 KG (approx 4-5 persons)', price: 2200 }
    ],
    isDailyMenu: false,
    availableToday: true,
    isSoldOut: false,
    minAdvanceNoticeHours: 4,
    minOrderQty: 'Min 0.5 KG',
    dietaryTags: ['Dum Cooked', 'Long Grain Basmati', 'Includes Raita & Salad'],
    spiceLevel: 'Medium'
  },
  {
    id: 'spec-biryani-aloo',
    name: 'Karachi Style Aloo Biryani',
    urduName: 'کراچی آلو بریانی',
    category: 'Biryani & Pulao',
    description: 'For biryani purists! Fragrant basmati rice layered with melt-in-the-mouth masala potatoes, spicy aromatic gravy, and fresh mint.',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    price: 1000,
    portions: [
      { id: 'p-half', label: 'Half KG', price: 1000 },
      { id: 'p-one', label: '1 KG', price: 1800 }
    ],
    isDailyMenu: false,
    availableToday: true,
    isSoldOut: false,
    minAdvanceNoticeHours: 4,
    minOrderQty: 'Min 0.5 KG',
    dietaryTags: ['Vegetarian', 'Basmati Rice', 'Spicy Masala'],
    spiceLevel: 'Medium'
  },
  {
    id: 'spec-pulao-chicken',
    name: 'Royal Chicken Yakhni Pulao',
    urduName: 'شاہی چکن یخنی پلاؤ',
    category: 'Biryani & Pulao',
    description: 'Subtle and rich Lucknowi/Karachi heritage yakhni pulao simmered gently in rich chicken bone broth with whole garam masala and golden caramelized onions.',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    price: null, // Price to be confirmed by admin as prompt requested
    portions: [
      { id: 'p-half', label: 'Half KG', price: null },
      { id: 'p-one', label: '1 KG', price: null }
    ],
    isDailyMenu: false,
    availableToday: true,
    isSoldOut: false,
    minAdvanceNoticeHours: 5,
    minOrderQty: 'Min 0.5 KG',
    dietaryTags: ['Yakhni Infused', 'Mild & Fragrant', 'Price on Request'],
    spiceLevel: 'Mild'
  },

  // --- ON ORDER SPECIALS: KARAHI ---
  {
    id: 'spec-karahi-chicken',
    name: 'Desi Chicken Karahi (Fresh Wok Cooked)',
    urduName: 'دیسی چکن کڑاہی',
    category: 'Karahi',
    description: 'Cooked fresh on high flame with ripe tomatoes, julienned ginger, green chillies, freshly crushed black pepper, and real butter or desi ghee. No artificial pastes.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    price: 1450,
    portions: [
      { id: 'p-half', label: 'Half KG Chicken Karahi', price: 1450 },
      { id: 'p-one', label: '1 KG Full Chicken Karahi', price: 2500 }
    ],
    isDailyMenu: false,
    availableToday: true,
    isSoldOut: false,
    minAdvanceNoticeHours: 3,
    minOrderQty: 'Min 0.5 KG',
    dietaryTags: ['100% Fresh Chicken', 'Tomato Base', 'Pure Ghee Option'],
    spiceLevel: 'Customizable'
  },
  {
    id: 'spec-karahi-white',
    name: 'Chicken White Karahi (Makhmali)',
    urduName: 'چکن وائٹ کڑاہی',
    category: 'Karahi',
    description: 'Velvety white karahi prepared with fresh cream, yogurt, white pepper, cumin, and sliced almonds. Creamy, decadent, and mild.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    price: 1600,
    portions: [
      { id: 'p-half', label: 'Half KG', price: 1600 },
      { id: 'p-one', label: '1 KG', price: 2800 }
    ],
    isDailyMenu: false,
    availableToday: true,
    isSoldOut: false,
    minAdvanceNoticeHours: 4,
    minOrderQty: 'Min 0.5 KG',
    dietaryTags: ['Creamy & Mild', 'Nut Garnished'],
    spiceLevel: 'Mild'
  },

  // --- ON ORDER SPECIALS: SAALAN ---
  {
    id: 'spec-saalan-qorma',
    name: 'Shahi Degi Chicken Qorma (Special Batch)',
    urduName: 'دیگی چکن قورمہ',
    category: 'Saalan',
    description: 'Festive-style rich danedaar chicken qorma flavored with kewra water, cardamom, and nutmeg. Cooked according to old Karachi family recipes.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    price: 1350,
    portions: [
      { id: 'p-half', label: 'Half KG', price: 1350 },
      { id: 'p-one', label: '1 KG', price: 2350 }
    ],
    isDailyMenu: false,
    availableToday: true,
    isSoldOut: false,
    minAdvanceNoticeHours: 4,
    minOrderQty: 'Min 0.5 KG',
    dietaryTags: ['Danedaar Gravy', 'Kewra & Saffron Scented'],
    spiceLevel: 'Medium'
  },
  {
    id: 'spec-saalan-kofta',
    name: 'Beef Nargisi / Masala Koftay',
    urduName: 'بیف نرجسی / مصالحہ کوفتے',
    category: 'Saalan',
    description: 'Tender handmade minced beef meatballs gently simmered in a silky tomato and yogurt salan.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    price: null, // Admin configured
    portions: [
      { id: 'p-half', label: '6 Pieces with Gravy', price: null },
      { id: 'p-one', label: '12 Pieces with Gravy', price: null }
    ],
    isDailyMenu: false,
    availableToday: true,
    isSoldOut: false,
    minAdvanceNoticeHours: 6,
    minOrderQty: 'Min 6 Pieces',
    dietaryTags: ['Minced Beef', 'Ask for Price'],
    spiceLevel: 'Medium'
  },

  // --- FAMILY & SPECIAL ORDERS ---
  {
    id: 'spec-family-platter',
    name: 'Dawat-e-Khas Family Meal (5-6 Persons)',
    urduName: 'دعوتِ خاص فیملی پیک',
    category: 'Family & Special',
    description: 'A complete homemade feast for family gatherings: 1 KG Chicken Biryani, 1 KG Chicken Karahi or Qorma, 8 Whole Wheat Roti, Zeera Raita, Salad, and 1 Bowl Kheer.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    price: 5200,
    portions: [
      { id: 'p-fam', label: 'Complete Family Meal (5-6 Pax)', price: 5200 }
    ],
    isDailyMenu: false,
    availableToday: true,
    isSoldOut: false,
    minAdvanceNoticeHours: 6,
    dietaryTags: ['Family Feast', 'Complete Meal Deal', 'Advance Booking'],
    spiceLevel: 'Customizable'
  },
  {
    id: 'spec-dessert-kheer',
    name: 'Zafrani Badami Kheer (1 KG Bowl)',
    urduName: 'زعفرانی بادامی کھیر',
    category: 'Family & Special',
    description: 'Traditional slow-reduced whole milk kheer with pure saffron, crushed almonds, pistachios, and silver leaf (chandi ka warq).',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    price: 1100,
    portions: [
      { id: 'p-kheer', label: '1 KG Clay Bowl (Matka)', price: 1100 }
    ],
    isDailyMenu: false,
    availableToday: true,
    isSoldOut: false,
    minAdvanceNoticeHours: 4,
    dietaryTags: ['Pure Milk', 'Desi Sweet', 'Nut Loaded'],
    spiceLevel: 'Mild'
  }
];
