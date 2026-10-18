import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem, PortionOption, MenuCategory } from '../types';
import { Clock, MessageCircle, ShoppingBag, Calendar, Check, Info, Sparkles, Plus, Minus } from 'lucide-react';

export const OnOrderSpecialsSection: React.FC = () => {
  const { menu, addToCart, generateWhatsAppUrl } = useApp();

  const specialCategories: MenuCategory[] = [
    'Biryani & Pulao',
    'Karahi',
    'Saalan',
    'Family & Special'
  ];

  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Biryani & Pulao');
  
  // Per-item state: selected portion, quantity, delivery date, instructions
  const [itemForms, setItemForms] = useState<{
    [itemId: string]: {
      portionIndex: number;
      quantity: number;
      preferredDate: string;
      instructions: string;
    };
  }>({});

  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Filter on-order items
  const specialItems = useMemo(() => {
    return menu.filter((item) => !item.isDailyMenu && item.category === activeCategory);
  }, [menu, activeCategory]);

  const getItemForm = (item: MenuItem) => {
    const existing = itemForms[item.id];
    if (existing) return existing;
    return {
      portionIndex: 0,
      quantity: 1,
      preferredDate: '',
      instructions: ''
    };
  };

  const updateItemForm = (itemId: string, patch: Partial<{ portionIndex: number; quantity: number; preferredDate: string; instructions: string }>) => {
    setItemForms((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || { portionIndex: 0, quantity: 1, preferredDate: '', instructions: '' }),
        ...patch
      }
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const form = getItemForm(item);
    const portion = item.portions[form.portionIndex] || item.portions[0] || { id: 'std', label: 'Half KG', price: item.price };
    
    let specialNote = '';
    if (form.preferredDate) specialNote += `Date: ${form.preferredDate}. `;
    if (form.instructions) specialNote += `Notes: ${form.instructions}`;

    addToCart(item, portion, form.quantity, specialNote.trim());
    setAddedNotice(item.id);
    setTimeout(() => setAddedNotice(null), 1500);
  };

  const handleWhatsAppInquiry = (item: MenuItem) => {
    const form = getItemForm(item);
    const portion = item.portions[form.portionIndex] || item.portions[0] || { id: 'std', label: 'Half KG', price: item.price };
    const priceDisplay = portion.price ? `PKR ${portion.price * form.quantity}` : 'Ask for Price (Unconfirmed)';

    let msg = `THE ROYAL KITCHEN — SPECIAL ADVANCE ORDER INQUIRY\n\n`;
    msg += `Dish: ${item.name}\n`;
    msg += `Category: ${item.category}\n`;
    msg += `Selected Portion: ${portion.label}\n`;
    msg += `Quantity: ${form.quantity}\n`;
    msg += `Estimated Total: ${priceDisplay}\n`;
    if (form.preferredDate) {
      msg += `Preferred Delivery Date: ${form.preferredDate}\n`;
    }
    if (form.instructions) {
      msg += `Preparation Instructions: ${form.instructions}\n`;
    }
    msg += `\nMinimum Order Note: Minimum special order quantity starts from half KG where applicable.\n`;
    msg += `Please confirm availability, price, and delivery charges for my area in Karachi.`;

    window.open(generateWhatsAppUrl(msg), '_blank');
  };

  return (
    <section id="on-order" className="py-16 sm:py-24 bg-[#F7F3EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EAE5DC] text-xs font-bold text-[#B38C42] uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>Prepared Specially For You</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight mb-4">
            Specially Made On Order
          </h2>
          <p className="text-base sm:text-lg text-[#524D44] font-normal leading-relaxed">
            Planning a family meal or special occasion? Order your favorite homemade dishes prepared just for you.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#8C6B28] bg-[#C7A15A]/15 px-4 py-1.5 rounded-full border border-[#C7A15A]/30">
            <Info className="w-4 h-4 shrink-0 text-[#C7A15A]" />
            <span>Minimum special order starts from half KG where applicable • Advance notice required</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {specialCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all whitespace-nowrap shadow-xs ${
                  isActive
                    ? 'bg-[#171717] text-white ring-2 ring-[#C7A15A]'
                    : 'bg-white text-[#524D44] hover:bg-[#EAE5DC] border border-[#EAE5DC]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Category Items List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {specialItems.map((item) => {
            const form = getItemForm(item);
            const selectedPortion = item.portions[form.portionIndex] || item.portions[0];
            const hasPrice = selectedPortion?.price !== null && selectedPortion?.price !== undefined;
            const subtotal = hasPrice ? selectedPortion.price! * form.quantity : null;
            const isAdded = addedNotice === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#EAE5DC] hover:border-[#C7A15A]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
              >
                {/* Food Image */}
                <div className="sm:w-2/5 relative h-56 sm:h-auto overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#171717]/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded">
                    {item.category}
                  </div>
                  {item.minAdvanceNoticeHours && (
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#171717] text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-2xs">
                      <Clock className="w-3 h-3 text-[#C7A15A]" />
                      <span>{item.minAdvanceNoticeHours}h advance notice</span>
                    </div>
                  )}
                </div>

                {/* Content & Ordering Form */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="font-heading font-bold text-lg text-[#171717]">
                          {item.name}
                        </h3>
                        {item.urduName && (
                          <span className="text-xs text-[#736B5E] block font-medium">
                            {item.urduName}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-[#C7A15A] bg-[#C7A15A]/10 px-2 py-0.5 rounded border border-[#C7A15A]/20 shrink-0">
                        {item.minOrderQty || 'Min 0.5 KG'}
                      </span>
                    </div>

                    <p className="text-xs text-[#524D44] leading-relaxed my-2">
                      {item.description}
                    </p>

                    {/* Portion Selector Pills */}
                    <div className="my-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#736B5E] block mb-1.5">
                        Select Weight / Portion:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {item.portions.map((p, idx) => {
                          const isSelected = form.portionIndex === idx;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => updateItemForm(item.id, { portionIndex: idx })}
                              className={`text-xs p-2 rounded-xl border text-left flex flex-col justify-between transition-colors ${
                                isSelected
                                  ? 'border-[#C7A15A] bg-[#C7A15A]/10 text-[#171717]'
                                  : 'border-[#EAE5DC] hover:border-[#D8CFBF] text-[#524D44]'
                              }`}
                            >
                              <span className="font-medium text-[11px]">{p.label}</span>
                              <span className="font-extrabold text-xs text-[#171717] mt-1">
                                {p.price ? `PKR ${p.price}` : 'Ask for Price'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Advance Order Preferences */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 text-xs">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#736B5E] block mb-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#C7A15A]" />
                          <span>Delivery Date</span>
                        </label>
                        <input
                          type="date"
                          value={form.preferredDate}
                          onChange={(e) => updateItemForm(item.id, { preferredDate: e.target.value })}
                          className="w-full text-xs p-1.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-lg focus:outline-none focus:border-[#C7A15A]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#736B5E] block mb-1">
                          Special Instructions (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Mild spice, less oil"
                          value={form.instructions}
                          onChange={(e) => updateItemForm(item.id, { instructions: e.target.value })}
                          className="w-full text-xs p-1.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-lg focus:outline-none focus:border-[#C7A15A]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="pt-4 border-t border-[#EAE5DC] mt-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#736B5E] font-medium">Quantity</span>
                        <div className="flex items-center gap-2 bg-[#F7F3EB] px-2 py-0.5 rounded-full border border-[#EAE5DC]">
                          <button
                            type="button"
                            disabled={form.quantity <= 1}
                            onClick={() => updateItemForm(item.id, { quantity: Math.max(1, form.quantity - 1) })}
                            className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#171717] disabled:opacity-40"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{form.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateItemForm(item.id, { quantity: form.quantity + 1 })}
                            className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#171717]"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-[#736B5E] block">Estimated Total:</span>
                        <span className="text-sm font-extrabold text-[#171717]">
                          {subtotal !== null ? `PKR ${subtotal}` : 'Ask for Price'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#171717] hover:bg-[#262626] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleWhatsAppInquiry(item)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-all shadow-2xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Inquire on WhatsApp</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
