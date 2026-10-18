import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem, MenuCategory, PortionOption } from '../types';
import { 
  X, Shield, Lock, Plus, Trash2, Edit3, Save, Check, RefreshCw, 
  Eye, AlertCircle, Phone, Clock, DollarSign, Image as ImageIcon, HeartPulse 
} from 'lucide-react';

const FOOD_IMAGE_PRESETS = [
  { label: 'Chicken Biryani', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80' },
  { label: 'Aloo Biryani', url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80' },
  { label: 'Desi Karahi', url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80' },
  { label: 'Chicken Qorma', url: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80' },
  { label: 'Daal Chawal & Shami', url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sabzi / Palak', url: 'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80' },
  { label: 'Fresh Phulka Roti', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80' },
  { label: 'Zafrani Kheer Dessert', url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80' },
];

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    menu,
    settings,
    updateMenuItem,
    addMenuItem,
    deleteMenuItem,
    toggleItemSoldOut,
    toggleItemAvailableToday,
    updateSettings,
    resetToDefaultMenu,
    patientInquiries
  } = useApp();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('trk_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'daily' | 'specials' | 'settings' | 'inquiries'>('overview');

  // Editing or Adding Menu Item Modal State
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState(settings);

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passkey for owner access
    if (passwordInput === 'trk2025' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('trk_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect Admin Passkey. Please enter trk2025 or admin.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('trk_admin_auth');
  };

  const handleOpenNewItem = (isDaily: boolean = true) => {
    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      name: '',
      urduName: '',
      category: isDaily ? 'Daily Menu' : 'Biryani & Pulao',
      description: '',
      image: FOOD_IMAGE_PRESETS[0].url,
      portions: [{ id: 'p1', label: 'Single Portion', price: 500 }],
      price: 500,
      isDailyMenu: isDaily,
      availableToday: true,
      isSoldOut: false,
      minOrderQty: isDaily ? '1 Portion' : 'Min 0.5 KG',
      spiceLevel: 'Medium'
    };
    setEditingItem(newItem);
    setIsNewItem(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (isNewItem) {
      await addMenuItem(editingItem);
    } else {
      await updateMenuItem(editingItem);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setEditingItem(null);
    }, 1000);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(settingsForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 1500);
  };

  // Stats
  const dailyCount = menu.filter((m) => m.isDailyMenu).length;
  const soldOutCount = menu.filter((m) => m.isSoldOut).length;
  const specialsCount = menu.filter((m) => !m.isDailyMenu).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-[#EAE5DC] overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-5 bg-[#171717] text-white flex items-center justify-between border-b border-[#2A2A2A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#262626] border border-[#C7A15A] flex items-center justify-center text-[#C7A15A]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">TRK Restaurant Admin Portal</h3>
              <p className="text-xs text-gray-400">The Royal Kitchen Management Console</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs text-gray-400 hover:text-white px-2.5 py-1 rounded border border-gray-700"
              >
                Log Out
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Barrier if not logged in */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#F7F3EB] border border-[#EAE5DC] flex items-center justify-center text-[#171717] mx-auto mb-4">
              <Lock className="w-7 h-7 text-[#C7A15A]" />
            </div>
            <h4 className="font-heading font-bold text-xl text-[#171717] mb-2">
              Restaurant Owner Login
            </h4>
            <p className="text-xs text-[#736B5E] mb-6">
              Enter your admin passkey to manage today's daily menu, on-order dishes, WhatsApp contact, and pricing.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter Admin Passkey (default: trk2025)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full text-xs p-3.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl text-center focus:outline-none focus:border-[#C7A15A]"
                  autoFocus
                />
                {authError && (
                  <p className="text-[11px] text-red-600 mt-1.5 font-medium">{authError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#171717] hover:bg-[#C7A15A] text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
              >
                Access Dashboard
              </button>
              
              <p className="text-[10px] text-gray-400">
                Hint: Passkey is <span className="font-mono font-bold text-gray-600">trk2025</span>
              </p>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard View */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-60 bg-[#F7F3EB] border-r border-[#EAE5DC] p-4 flex md:flex-col gap-1.5 shrink-0 overflow-x-auto">
              <button
                onClick={() => { setActiveTab('overview'); setEditingItem(null); }}
                className={`text-xs px-3.5 py-2.5 rounded-xl font-semibold text-left flex items-center gap-2 transition-all shrink-0 ${
                  activeTab === 'overview' ? 'bg-[#171717] text-white shadow-xs' : 'text-[#524D44] hover:bg-white'
                }`}
              >
                <Eye className="w-4 h-4 text-[#C7A15A]" />
                <span>Overview Stats</span>
              </button>

              <button
                onClick={() => { setActiveTab('daily'); setEditingItem(null); }}
                className={`text-xs px-3.5 py-2.5 rounded-xl font-semibold text-left flex items-center justify-between transition-all shrink-0 ${
                  activeTab === 'daily' ? 'bg-[#171717] text-white shadow-xs' : 'text-[#524D44] hover:bg-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C7A15A]" />
                  <span>Daily Menu</span>
                </span>
                <span className="text-[10px] bg-[#C7A15A]/20 text-[#B38C42] px-1.5 py-0.5 rounded font-bold">
                  {dailyCount}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('specials'); setEditingItem(null); }}
                className={`text-xs px-3.5 py-2.5 rounded-xl font-semibold text-left flex items-center justify-between transition-all shrink-0 ${
                  activeTab === 'specials' ? 'bg-[#171717] text-white shadow-xs' : 'text-[#524D44] hover:bg-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#C7A15A]" />
                  <span>On-Order Specials</span>
                </span>
                <span className="text-[10px] bg-[#C7A15A]/20 text-[#B38C42] px-1.5 py-0.5 rounded font-bold">
                  {specialsCount}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('inquiries'); setEditingItem(null); }}
                className={`text-xs px-3.5 py-2.5 rounded-xl font-semibold text-left flex items-center justify-between transition-all shrink-0 ${
                  activeTab === 'inquiries' ? 'bg-[#171717] text-white shadow-xs' : 'text-[#524D44] hover:bg-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-[#C7A15A]" />
                  <span>Patient Inquiries</span>
                </span>
                <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">
                  {patientInquiries.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('settings'); setEditingItem(null); }}
                className={`text-xs px-3.5 py-2.5 rounded-xl font-semibold text-left flex items-center gap-2 transition-all shrink-0 ${
                  activeTab === 'settings' ? 'bg-[#171717] text-white shadow-xs' : 'text-[#524D44] hover:bg-white'
                }`}
              >
                <Phone className="w-4 h-4 text-[#C7A15A]" />
                <span>Restaurant Settings</span>
              </button>

              <div className="mt-auto pt-4 border-t border-[#EAE5DC] hidden md:block">
                <button
                  onClick={async () => {
                    if (confirm('Restore initial authentic Pakistani dishes? Any customized menu items will be reset.')) {
                      await resetToDefaultMenu();
                    }
                  }}
                  className="w-full text-[11px] text-[#736B5E] hover:text-[#171717] p-2 rounded border border-[#EAE5DC] bg-white flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3 text-[#C7A15A]" />
                  <span>Reset Default Menu</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-white">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading font-bold text-xl text-[#171717]">
                      Dashboard Overview
                    </h4>
                    <p className="text-xs text-[#736B5E]">
                      Live operational metrics for The Royal Kitchen (TRK).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-[#F7F3EB] border border-[#EAE5DC]">
                      <span className="text-xs font-bold text-[#736B5E] uppercase block mb-1">
                        Daily Menu Items
                      </span>
                      <span className="font-heading font-extrabold text-3xl text-[#171717]">
                        {dailyCount}
                      </span>
                      <span className="text-[11px] text-emerald-700 block mt-1">
                        Fresh items displayed today
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F7F3EB] border border-[#EAE5DC]">
                      <span className="text-xs font-bold text-[#736B5E] uppercase block mb-1">
                        Sold Out Status
                      </span>
                      <span className="font-heading font-extrabold text-3xl text-[#171717]">
                        {soldOutCount}
                      </span>
                      <span className="text-[11px] text-gray-500 block mt-1">
                        Dishes marked unavailable
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F7F3EB] border border-[#EAE5DC]">
                      <span className="text-xs font-bold text-[#736B5E] uppercase block mb-1">
                        WhatsApp Contact
                      </span>
                      <span className="font-heading font-bold text-base text-[#171717] font-mono">
                        +{settings.whatsappNumber}
                      </span>
                      <span className="text-[11px] text-emerald-700 block mt-1">
                        Receives all instant orders
                      </span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[#EAE5DC] space-y-3">
                    <h5 className="font-heading font-bold text-sm text-[#171717]">
                      Quick Manager Shortcuts
                    </h5>
                    <div className="flex flex-wrap gap-2.5">
                      <button
                        onClick={() => { setActiveTab('daily'); handleOpenNewItem(true); }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#171717] text-white text-xs font-bold hover:bg-[#C7A15A]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Today's New Dish</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('settings')}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F7F3EB] text-[#171717] text-xs font-bold hover:bg-[#EAE5DC] border border-[#EAE5DC]"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#C7A15A]" />
                        <span>Update Official WhatsApp</span>
                      </button>

                      <button
                        onClick={() => setIsAdminOpen(false)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-[#524D44] text-xs font-medium hover:text-[#171717] border border-[#EAE5DC]"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C7A15A]" />
                        <span>View Customer Website</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2 & 3: DAILY MENU OR SPECIALS LIST */}
              {(activeTab === 'daily' || activeTab === 'specials') && !editingItem && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DC]">
                    <div>
                      <h4 className="font-heading font-bold text-lg text-[#171717]">
                        {activeTab === 'daily' ? "Manage Today's Daily Menu" : 'Manage On-Order Specials'}
                      </h4>
                      <p className="text-xs text-[#736B5E]">
                        Changes appear instantly on the live website.
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenNewItem(activeTab === 'daily')}
                      className="inline-flex items-center gap-1.5 bg-[#C7A15A] hover:bg-[#B38C42] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Dish</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {menu
                      .filter((m) => (activeTab === 'daily' ? m.isDailyMenu : !m.isDailyMenu))
                      .map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-2xl bg-[#F7F3EB]/60 border border-[#EAE5DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#EAE5DC]"
                            />
                            <div className="min-w-0">
                              <h5 className="font-heading font-bold text-xs text-[#171717] truncate">
                                {item.name}
                              </h5>
                              <p className="text-[11px] text-[#736B5E]">
                                Category: {item.category} • {item.portions.map(p => `${p.label} (PKR ${p.price ?? 'TBD'})`).join(', ')}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                {item.isSoldOut ? (
                                  <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">
                                    Sold Out
                                  </span>
                                ) : (
                                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                                    Available
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
                              onClick={() => toggleItemSoldOut(item.id)}
                              className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold transition-colors ${
                                item.isSoldOut
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                              }`}
                            >
                              {item.isSoldOut ? 'Mark Available' : 'Mark Sold Out'}
                            </button>

                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setIsNewItem(false);
                              }}
                              className="p-2 rounded-lg bg-white border border-[#EAE5DC] text-[#171717] hover:text-[#C7A15A]"
                              title="Edit Item"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={async () => {
                                if (confirm(`Delete "${item.name}"?`)) {
                                  await deleteMenuItem(item.id);
                                }
                              }}
                              className="p-2 rounded-lg bg-white border border-[#EAE5DC] text-gray-400 hover:text-red-600"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* ITEM EDITOR FORM (Modal or embedded view) */}
              {editingItem && (
                <div className="p-2 sm:p-4 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DC]">
                    <h4 className="font-heading font-bold text-base text-[#171717]">
                      {isNewItem ? 'Add New Dish' : `Edit: ${editingItem.name}`}
                    </h4>
                    <button
                      onClick={() => setEditingItem(null)}
                      className="text-xs text-[#736B5E] hover:underline"
                    >
                      Cancel
                    </button>
                  </div>

                  {saveSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Item saved successfully! Changes are live on customer view.</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-[#171717] block mb-1">
                          Food Name (English) *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          className="w-full p-2.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-[#171717] block mb-1">
                          Food Name (Urdu - Optional)
                        </label>
                        <input
                          type="text"
                          value={editingItem.urduName || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, urduName: e.target.value })}
                          className="w-full p-2.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-[#171717] block mb-1">
                          Category
                        </label>
                        <select
                          value={editingItem.category}
                          onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as MenuCategory })}
                          className="w-full p-2.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl"
                        >
                          <option value="Daily Menu">Daily Menu</option>
                          <option value="Biryani & Pulao">Biryani & Pulao</option>
                          <option value="Karahi">Karahi</option>
                          <option value="Saalan">Saalan</option>
                          <option value="Family & Special">Family & Special</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-4 pt-5">
                        <label className="flex items-center gap-2 cursor-pointer font-bold">
                          <input
                            type="checkbox"
                            checked={editingItem.isDailyMenu}
                            onChange={(e) => setEditingItem({ ...editingItem, isDailyMenu: e.target.checked })}
                            className="w-4 h-4 rounded text-[#C7A15A]"
                          />
                          <span>Show on Today's Fresh Daily Menu</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-[#171717] block mb-1">
                        Short Appetizing Description
                      </label>
                      <textarea
                        rows={2}
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="w-full p-2.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl"
                      />
                    </div>

                    {/* Food Image Selection */}
                    <div>
                      <label className="font-bold text-[#171717] block mb-1">
                        Food Image URL
                      </label>
                      <input
                        type="url"
                        value={editingItem.image}
                        onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                        className="w-full p-2 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl mb-2"
                      />
                      <span className="text-[10px] text-[#736B5E] block mb-1.5">
                        Or choose from pre-tested Pakistani dishes photography:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {FOOD_IMAGE_PRESETS.map((preset) => (
                          <button
                            type="button"
                            key={preset.label}
                            onClick={() => setEditingItem({ ...editingItem, image: preset.url })}
                            className="text-[10px] bg-white border border-[#EAE5DC] hover:border-[#C7A15A] px-2 py-1 rounded-md"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Portions & Prices Configuration */}
                    <div className="p-3.5 rounded-2xl bg-[#F7F3EB] border border-[#EAE5DC]">
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-bold text-[#171717] uppercase tracking-wider text-[11px]">
                          Portion Sizes & Prices (PKR)
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const newP: PortionOption = {
                              id: `p-${Date.now()}`,
                              label: 'New Portion',
                              price: 500
                            };
                            setEditingItem({
                              ...editingItem,
                              portions: [...editingItem.portions, newP]
                            });
                          }}
                          className="text-[11px] font-bold text-[#C7A15A] hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Portion</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {editingItem.portions.map((portion, pIdx) => (
                          <div key={portion.id} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={portion.label}
                              placeholder="e.g. Half KG / Single"
                              onChange={(e) => {
                                const newP = [...editingItem.portions];
                                newP[pIdx].label = e.target.value;
                                setEditingItem({ ...editingItem, portions: newP });
                              }}
                              className="flex-1 p-2 bg-white border border-[#EAE5DC] rounded-lg"
                            />
                            <div className="flex items-center gap-1 w-36">
                              <span className="text-[11px] text-[#736B5E]">PKR</span>
                              <input
                                type="number"
                                placeholder="null = Ask Price"
                                value={portion.price === null ? '' : portion.price}
                                onChange={(e) => {
                                  const val = e.target.value === '' ? null : parseInt(e.target.value, 10);
                                  const newP = [...editingItem.portions];
                                  newP[pIdx].price = val;
                                  setEditingItem({
                                    ...editingItem,
                                    portions: newP,
                                    price: newP[0]?.price ?? null
                                  });
                                }}
                                className="w-full p-2 bg-white border border-[#EAE5DC] rounded-lg font-bold"
                              />
                            </div>
                            {editingItem.portions.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newP = editingItem.portions.filter((_, idx) => idx !== pIdx);
                                  setEditingItem({ ...editingItem, portions: newP });
                                }}
                                className="text-gray-400 hover:text-red-600 p-1"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setEditingItem(null)}
                        className="px-4 py-2 text-xs font-semibold text-[#736B5E]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#171717] hover:bg-[#C7A15A] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save & Publish Dish</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 4: PATIENT INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-heading font-bold text-lg text-[#171717]">
                      Patient Special Meal Inquiries
                    </h4>
                    <p className="text-xs text-[#736B5E]">
                      Submitted requests from customers requiring specific dietary preparation.
                    </p>
                  </div>

                  {patientInquiries.length === 0 ? (
                    <div className="p-8 text-center text-xs text-gray-400 bg-[#F7F3EB] rounded-2xl">
                      No customer dietary inquiries recorded yet. Inquiries submitted through the form will be listed here.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {patientInquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="p-4 rounded-2xl bg-[#F7F3EB] border border-[#EAE5DC] space-y-2 text-xs"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-bold text-[#171717] text-sm">
                                {inq.customerName}
                              </h5>
                              <p className="text-[#736B5E]">
                                WhatsApp: {inq.whatsappNumber} • Area: {inq.deliveryArea}
                              </p>
                            </div>
                            <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#EAE5DC] text-gray-500">
                              {inq.timestamp}
                            </span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-white border border-[#EAE5DC] space-y-1">
                            <p><strong>Dietary Needs:</strong> {inq.dietaryNeeds}</p>
                            <p><strong>Avoid:</strong> {inq.ingredientsToAvoid || 'None'}</p>
                            <p><strong>Plan:</strong> {inq.mealType} ({inq.quantity})</p>
                            {inq.instructions && <p><strong>Notes:</strong> {inq.instructions}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: RESTAURANT SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-heading font-bold text-lg text-[#171717]">
                      Restaurant Configuration
                    </h4>
                    <p className="text-xs text-[#736B5E]">
                      Manage official WhatsApp ordering number, location, and payment guidelines.
                    </p>
                  </div>

                  {saveSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Settings updated successfully!</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                    <div>
                      <label className="font-bold text-[#171717] block mb-1">
                        Official WhatsApp Number (No spaces or '+', e.g. 923001234567) *
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsForm.whatsappNumber}
                        onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                        className="w-full p-2.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl font-mono"
                      />
                      <span className="text-[10px] text-gray-500 mt-1 block">
                        All website "Order on WhatsApp" buttons forward to this number.
                      </span>
                    </div>

                    <div>
                      <label className="font-bold text-[#171717] block mb-1">
                        Operating Hours & Lunch/Dinner Cut-offs
                      </label>
                      <input
                        type="text"
                        value={settingsForm.businessHours}
                        onChange={(e) => setSettingsForm({ ...settingsForm, businessHours: e.target.value })}
                        className="w-full p-2.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-[#171717] block mb-1">
                        Kitchen Location Description
                      </label>
                      <input
                        type="text"
                        value={settingsForm.location}
                        onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                        className="w-full p-2.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-[#171717] block mb-1">
                        Online Payment Account Instructions (Shown on WhatsApp confirmation)
                      </label>
                      <textarea
                        rows={2}
                        value={settingsForm.bankDetailsConfig}
                        onChange={(e) => setSettingsForm({ ...settingsForm, bankDetailsConfig: e.target.value })}
                        className="w-full p-2.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#171717] hover:bg-[#C7A15A] text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Update Restaurant Settings</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
