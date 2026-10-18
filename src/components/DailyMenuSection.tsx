import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem, PortionOption } from '../types';
import { ShoppingBag, MessageCircle, Search, Sparkles, AlertCircle, Plus, Minus, Check } from 'lucide-react';

export const DailyMenuSection: React.FC = () => {
  const { menu, addToCart, generateWhatsAppUrl } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  
  // Track selected portion and quantity per card: { [itemId]: { portionIndex: number, qty: number } }
  const [cardState, setCardState] = useState<{ [itemId: string]: { portionIndex: number; quantity: number } }>({});
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  // Filter items specifically for the Daily Menu
  const dailyItems = useMemo(() => {
    return menu.filter((item) => item.isDailyMenu);
  }, [menu]);

  // Extract unique tags
  const tags = useMemo(() => {
    const set = new Set<string>();
    dailyItems.forEach((item) => {
      item.dietaryTags?.forEach((t) => set.add(t));
    });
    return ['All', ...Array.from(set)];
  }, [dailyItems]);

  const filteredItems = useMemo(() => {
    return dailyItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.urduName && item.urduName.includes(searchQuery));
      
      const matchesTag =
        selectedTag === 'All' ||
        (item.dietaryTags && item.dietaryTags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [dailyItems, searchQuery, selectedTag]);

  const getCardPortion = (item: MenuItem): PortionOption => {
    const state = cardState[item.id];
    const index = state ? state.portionIndex : 0;
    return item.portions[index] || item.portions[0] || { id: 'def', label: 'Standard Portion', price: item.price };
  };

  const getCardQuantity = (item: MenuItem): number => {
    return cardState[item.id]?.quantity || 1;
  };

  const handlePortionChange = (itemId: string, portionIndex: number) => {
    setCardState((prev) => ({
      ...prev,
      [itemId]: {
        portionIndex,
        quantity: prev[itemId]?.quantity || 1
      }
    }));
  };

  const handleQuantityDelta = (itemId: string, delta: number) => {
    setCardState((prev) => {
      const currentQty = prev[itemId]?.quantity || 1;
      const nextQty = Math.max(1, currentQty + delta);
      return {
        ...prev,
        [itemId]: {
          portionIndex: prev[itemId]?.portionIndex || 0,
          quantity: nextQty
        }
      };
    });
  };

  const handleAddToCart = (item: MenuItem) => {
    const portion = getCardPortion(item);
    const quantity = getCardQuantity(item);
    addToCart(item, portion, quantity);

    setAddedItemNotice(item.id);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 1500);
  };

  const handleDirectWhatsAppOrder = (item: MenuItem) => {
    const portion = getCardPortion(item);
    const quantity = getCardQuantity(item);
    const priceText = portion.price ? `PKR ${portion.price * quantity}` : 'Price to be confirmed';
    
    const msg = `THE ROYAL KITCHEN — DAILY MENU INQUIRY\n\nI want to order:\n- Item: ${item.name}\n- Portion: ${portion.label}\n- Quantity: ${quantity}\n- Estimated Subtotal: ${priceText}\n\nPlease confirm availability and delivery charges for my area in Karachi.`;
    
    window.open(generateWhatsAppUrl(msg), '_blank');
  };

  return (
    <section id="daily-menu" className="py-16 sm:py-24 bg-white border-y border-[#EAE5DC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F3EB] border border-[#EAE5DC] text-xs font-bold text-[#B38C42] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>Cooked Fresh Daily</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight mb-4">
            Today's Fresh Menu
          </h2>
          <p className="text-base sm:text-lg text-[#524D44] font-normal">
            Freshly prepared homemade meals, with a new menu to explore every day.
          </p>
        </div>

        {/* Search & Dietary Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EAE5DC]">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#736B5E]" />
            <input
              type="text"
              placeholder="Search today's dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-[#F7F3EB] border border-[#EAE5DC] rounded-full focus:outline-none focus:border-[#C7A15A] transition-colors"
            />
          </div>

          {tags.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedTag === tag
                      ? 'bg-[#171717] text-white shadow-xs'
                      : 'bg-[#F7F3EB] text-[#524D44] hover:bg-[#EAE5DC]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Empty State when no daily menu items are published */}
        {dailyItems.length === 0 ? (
          <div className="bg-[#F7F3EB] rounded-2xl p-10 text-center max-w-xl mx-auto border border-[#EAE5DC]">
            <AlertCircle className="w-10 h-10 text-[#C7A15A] mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-[#171717] mb-2">
              Today's menu is being updated.
            </h3>
            <p className="text-sm text-[#736B5E] mb-6">
              Contact us on WhatsApp for the latest available dishes or to place a custom advance order.
            </p>
            <button
              onClick={() => {
                const msg = `Assalam-o-Alaikum! Please share today's available fresh menu dishes.`;
                window.open(generateWhatsAppUrl(msg), '_blank');
              }}
              className="inline-flex items-center gap-2 bg-[#C7A15A] hover:bg-[#B38C42] text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Inquire on WhatsApp</span>
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No dishes matched your search criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('All');
              }}
              className="mt-3 text-xs text-[#C7A15A] font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          /* Food Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const currentPortion = getCardPortion(item);
              const currentQty = getCardQuantity(item);
              const isAdded = addedItemNotice === item.id;
              const hasPrice = currentPortion.price !== null;
              const effectivePrice = hasPrice ? currentPortion.price! * currentQty : null;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                    item.isSoldOut
                      ? 'border-[#EAE5DC] opacity-80'
                      : 'border-[#EAE5DC] hover:border-[#C7A15A]/60 hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  {/* Card Image and Badges */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-gray-100 group">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Status Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.isSoldOut ? (
                        <span className="bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                          Sold Out
                        </span>
                      ) : item.availableToday ? (
                        <span className="bg-[#171717]/85 backdrop-blur-xs text-[#C7A15A] border border-[#C7A15A]/40 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                          Available Today
                        </span>
                      ) : null}

                      {item.spiceLevel && (
                        <span className="bg-white/90 backdrop-blur-xs text-[#524D44] text-[10px] font-semibold px-2 py-1 rounded-md border border-[#EAE5DC]">
                          {item.spiceLevel}
                        </span>
                      )}
                    </div>

                    {/* Price Tag Pill */}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#171717] px-3 py-1.5 rounded-full font-bold text-sm shadow-md border border-[#EAE5DC]">
                      {hasPrice ? (
                        <span>PKR {currentPortion.price}</span>
                      ) : (
                        <span className="text-[#B38C42] text-xs">Ask for Price</span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-heading font-bold text-lg text-[#171717] leading-tight">
                          {item.name}
                        </h3>
                        {item.urduName && (
                          <span className="text-xs text-[#736B5E] font-medium shrink-0">
                            {item.urduName}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#524D44] mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Dietary Tags */}
                    {item.dietaryTags && item.dietaryTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 my-3">
                        {item.dietaryTags.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-[#F7F3EB] text-[#736B5E] px-2 py-0.5 rounded border border-[#EAE5DC]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Portion Selection (if multiple portions configured) */}
                    {item.portions.length > 1 && (
                      <div className="mt-3 pt-3 border-t border-[#EAE5DC]">
                        <label className="text-[11px] uppercase tracking-wider font-bold text-[#736B5E] block mb-1.5">
                          Select Portion
                        </label>
                        <div className="grid grid-cols-1 gap-1.5">
                          {item.portions.map((portion, pIdx) => {
                            const isSelected = getCardPortion(item).id === portion.id;
                            return (
                              <button
                                key={portion.id}
                                type="button"
                                disabled={item.isSoldOut}
                                onClick={() => handlePortionChange(item.id, pIdx)}
                                className={`text-xs px-2.5 py-1.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                                  isSelected
                                    ? 'border-[#C7A15A] bg-[#C7A15A]/10 text-[#171717] font-semibold'
                                    : 'border-[#EAE5DC] hover:border-[#D8CFBF] text-[#524D44]'
                                }`}
                              >
                                <span>{portion.label}</span>
                                <span className="font-bold">
                                  {portion.price ? `PKR ${portion.price}` : 'Ask for Price'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Quantity Selector & Action Controls */}
                    <div className="mt-auto pt-4 border-t border-[#EAE5DC] flex flex-col gap-3">
                      
                      {/* Quantity Row */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#736B5E] font-medium">Quantity</span>
                        <div className="flex items-center gap-3 bg-[#F7F3EB] px-2 py-1 rounded-full border border-[#EAE5DC]">
                          <button
                            type="button"
                            disabled={item.isSoldOut || currentQty <= 1}
                            onClick={() => handleQuantityDelta(item.id, -1)}
                            className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#171717] disabled:opacity-40 hover:bg-[#EAE5DC] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#171717] w-4 text-center">
                            {currentQty}
                          </span>
                          <button
                            type="button"
                            disabled={item.isSoldOut}
                            onClick={() => handleQuantityDelta(item.id, 1)}
                            className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#171717] disabled:opacity-40 hover:bg-[#EAE5DC] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {effectivePrice !== null && (
                          <span className="text-xs font-extrabold text-[#171717]">
                            Total: PKR {effectivePrice}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons: Add to Cart & WhatsApp Order */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          disabled={item.isSoldOut}
                          onClick={() => handleAddToCart(item)}
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                            item.isSoldOut
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#171717] hover:bg-[#262626] text-white active:scale-95'
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
                          disabled={item.isSoldOut}
                          onClick={() => handleDirectWhatsAppOrder(item)}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-all disabled:opacity-50 active:scale-95 shadow-2xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>WhatsApp</span>
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
