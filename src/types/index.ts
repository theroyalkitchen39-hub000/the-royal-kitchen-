export type PortionOption = {
  id: string;
  label: string; // e.g. "Standard Single Portion", "Half KG (0.5 KG)", "1 KG Full"
  price: number | null; // null if "Ask for Price"
};

export type MenuCategory = 
  | 'Daily Menu' 
  | 'Biryani & Pulao' 
  | 'Karahi' 
  | 'Saalan' 
  | 'Family & Special' 
  | 'Patient Special';

export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  category: MenuCategory;
  description: string;
  image: string;
  portions: PortionOption[];
  price: number | null; // Base or default portion price, null = Ask for Price
  isDailyMenu: boolean;
  availableToday: boolean;
  isSoldOut: boolean;
  minAdvanceNoticeHours?: number;
  minOrderQty?: string; // e.g., "Min 0.5 KG"
  dietaryTags?: string[];
  spiceLevel?: 'Mild' | 'Medium' | 'Customizable' | 'No Chilli (Patient)';
}

export interface CartItem {
  id: string; // unique cart entry key
  menuItem: MenuItem;
  selectedPortion: PortionOption;
  quantity: number;
  specialInstructions?: string;
}

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  address: string;
  karachiArea: string;
  preferredDeliveryDate?: string;
  preferredDeliveryTime?: string;
  specialNotes?: string;
}

export interface RestaurantSettings {
  name: string;
  shortName: string;
  tagline: string;
  whatsappNumber: string; // Official number format without spaces e.g. "923001234567"
  location: string;
  googleMapsUrl: string;
  businessHours: string;
  paymentPolicy: string;
  bankDetailsConfig: string; // Configured by admin (bank name, account title, IBAN, Raast, JazzCash)
  deliveryInfoText: string;
  heroHeading: string;
  heroSubheading: string;
}

export interface PatientMealInquiry {
  id?: string;
  customerName: string;
  whatsappNumber: string;
  deliveryArea: string;
  mealType: string; // Lunch, Dinner, Weekly Subscription
  dietaryNeeds: string; // e.g. Low sodium, Low oil, Diabetic-friendly, Soft diet
  ingredientsToAvoid: string;
  instructions: string;
  quantity: string;
  preferredDate: string;
  timestamp?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
  menuQuickView?: MenuItem[];
}
