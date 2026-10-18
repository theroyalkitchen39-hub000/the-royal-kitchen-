import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, CartItem, PortionOption, RestaurantSettings, PatientMealInquiry } from '../types';
import { INITIAL_MENU_ITEMS, INITIAL_SETTINGS } from '../data/initialData';

interface AppContextType {
  menu: MenuItem[];
  settings: RestaurantSettings;
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAiChatOpen: boolean;
  setIsAiChatOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  addToCart: (item: MenuItem, portion: PortionOption, quantity?: number, instructions?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  // Admin Operations
  updateMenuItem: (item: MenuItem) => Promise<boolean>;
  addMenuItem: (item: MenuItem) => Promise<boolean>;
  deleteMenuItem: (itemId: string) => Promise<boolean>;
  toggleItemSoldOut: (itemId: string) => Promise<boolean>;
  toggleItemAvailableToday: (itemId: string) => Promise<boolean>;
  updateSettings: (newSettings: Partial<RestaurantSettings>) => Promise<boolean>;
  resetToDefaultMenu: () => Promise<boolean>;
  // Patient meal inquiries log
  patientInquiries: PatientMealInquiry[];
  addPatientInquiry: (inquiry: PatientMealInquiry) => void;
  generateWhatsAppUrl: (messageText: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('trk_menu_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse local menu', e);
      }
    }
    return INITIAL_MENU_ITEMS;
  });

  const [settings, setSettings] = useState<RestaurantSettings>(() => {
    const saved = localStorage.getItem('trk_restaurant_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse local settings', e);
      }
    }
    return INITIAL_SETTINGS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('trk_cart_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart items', e);
      }
    }
    return [];
  });

  const [patientInquiries, setPatientInquiries] = useState<PatientMealInquiry[]>(() => {
    const saved = localStorage.getItem('trk_patient_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse inquiries', e);
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('trk_cart_items', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('trk_menu_items', JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    localStorage.setItem('trk_restaurant_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('trk_patient_inquiries', JSON.stringify(patientInquiries));
  }, [patientInquiries]);

  // Try fetching fresh data from server API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, settingsRes] = await Promise.all([
          fetch('/api/menu').catch(() => null),
          fetch('/api/settings').catch(() => null)
        ]);

        if (menuRes && menuRes.ok) {
          const menuData = await menuRes.json();
          if (menuData?.menu && Array.isArray(menuData.menu)) {
            setMenu(menuData.menu);
          }
        }

        if (settingsRes && settingsRes.ok) {
          const settingsData = await settingsRes.json();
          if (settingsData?.settings) {
            setSettings(settingsData.settings);
          }
        }
      } catch (err) {
        console.log('Using local fallback for menu & settings', err);
      }
    };

    fetchData();
  }, []);

  // Sync menu changes with backend
  const syncMenuToServer = async (updatedMenu: MenuItem[]) => {
    setMenu(updatedMenu);
    try {
      await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menu: updatedMenu })
      });
      return true;
    } catch (e) {
      console.warn('Backend sync failed, saved locally', e);
      return true;
    }
  };

  // Sync settings changes with backend
  const syncSettingsToServer = async (newSettings: RestaurantSettings) => {
    setSettings(newSettings);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: newSettings })
      });
      return true;
    } catch (e) {
      console.warn('Backend settings sync failed, saved locally', e);
      return true;
    }
  };

  const addToCart = (
    item: MenuItem,
    portion: PortionOption,
    quantity: number = 1,
    instructions: string = ''
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.menuItem.id === item.id && ci.selectedPortion.id === portion.id
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          specialInstructions: instructions || next[existingIndex].specialInstructions
        };
        return next;
      }

      return [
        ...prev,
        {
          id: `${item.id}-${portion.id}-${Date.now()}`,
          menuItem: item,
          selectedPortion: portion,
          quantity,
          specialInstructions: instructions
        }
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    const price = item.selectedPortion.price ?? item.menuItem.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  // Admin Methods
  const updateMenuItem = async (item: MenuItem): Promise<boolean> => {
    const updated = menu.map((m) => (m.id === item.id ? item : m));
    return syncMenuToServer(updated);
  };

  const addMenuItem = async (item: MenuItem): Promise<boolean> => {
    const updated = [item, ...menu];
    return syncMenuToServer(updated);
  };

  const deleteMenuItem = async (itemId: string): Promise<boolean> => {
    const updated = menu.filter((m) => m.id !== itemId);
    return syncMenuToServer(updated);
  };

  const toggleItemSoldOut = async (itemId: string): Promise<boolean> => {
    const updated = menu.map((m) =>
      m.id === itemId ? { ...m, isSoldOut: !m.isSoldOut } : m
    );
    return syncMenuToServer(updated);
  };

  const toggleItemAvailableToday = async (itemId: string): Promise<boolean> => {
    const updated = menu.map((m) =>
      m.id === itemId ? { ...m, availableToday: !m.availableToday } : m
    );
    return syncMenuToServer(updated);
  };

  const updateSettings = async (newSettingsPartial: Partial<RestaurantSettings>): Promise<boolean> => {
    const updated = { ...settings, ...newSettingsPartial };
    return syncSettingsToServer(updated);
  };

  const resetToDefaultMenu = async (): Promise<boolean> => {
    return syncMenuToServer(INITIAL_MENU_ITEMS);
  };

  const addPatientInquiry = (inquiry: PatientMealInquiry) => {
    setPatientInquiries((prev) => [
      { ...inquiry, id: `inq-${Date.now()}`, timestamp: new Date().toLocaleString() },
      ...prev
    ]);
  };

  const generateWhatsAppUrl = (messageText: string) => {
    // Sanitize number: remove +, dashes, spaces
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(messageText);
    return `https://wa.me/${cleanNumber}?text=${encoded}`;
  };

  return (
    <AppContext.Provider
      value={{
        menu,
        settings,
        cart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        isAiChatOpen,
        setIsAiChatOpen,
        isAdminOpen,
        setIsAdminOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        toggleItemSoldOut,
        toggleItemAvailableToday,
        updateSettings,
        resetToDefaultMenu,
        patientInquiries,
        addPatientInquiry,
        generateWhatsAppUrl
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
