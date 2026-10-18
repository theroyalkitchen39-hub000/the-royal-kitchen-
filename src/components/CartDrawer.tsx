import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderCustomerInfo } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, AlertCircle, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { KARACHI_AREAS } from '../data/initialData';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    settings,
    generateWhatsAppUrl
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart');
  const [customer, setCustomer] = useState<OrderCustomerInfo>({
    name: '',
    phone: '',
    address: '',
    karachiArea: KARACHI_AREAS[0],
    preferredDeliveryDate: new Date().toISOString().split('T')[0],
    preferredDeliveryTime: 'Lunch (1:00 PM – 2:30 PM)',
    specialNotes: ''
  });

  const [formErrors, setFormErrors] = useState<{ [k: string]: string }>({});

  if (!isCartOpen) return null;

  const validateForm = () => {
    const errs: { [k: string]: string } = {};
    if (!customer.name.trim()) errs.name = 'Please provide your full name.';
    if (!customer.phone.trim() || customer.phone.length < 10) errs.phone = 'Valid WhatsApp phone number is required.';
    if (!customer.address.trim()) errs.address = 'Street / House address is required.';
    if (!customer.karachiArea) errs.karachiArea = 'Please select a Karachi delivery area.';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate exact template required by Prompt Section 8
    let itemsBlock = '';
    cart.forEach((ci) => {
      const unitPrice = ci.selectedPortion.price !== null ? `PKR ${ci.selectedPortion.price}` : 'Ask for Price';
      const subtotalItem = ci.selectedPortion.price !== null ? `PKR ${ci.selectedPortion.price * ci.quantity}` : 'To Be Confirmed';

      itemsBlock += `Item Name: ${ci.menuItem.name}
Portion: ${ci.selectedPortion.label}
Quantity: ${ci.quantity}
Unit Price: ${unitPrice}
Subtotal: ${subtotalItem}
${ci.specialInstructions ? `Special Prep: ${ci.specialInstructions}\n` : ''}\n`;
    });

    const notesCombined = [
      customer.preferredDeliveryDate ? `Date: ${customer.preferredDeliveryDate}` : '',
      customer.preferredDeliveryTime ? `Time: ${customer.preferredDeliveryTime}` : '',
      customer.specialNotes ? `Customer Note: ${customer.specialNotes}` : ''
    ].filter(Boolean).join(' | ');

    const message = `THE ROYAL KITCHEN — NEW ORDER

Customer Name: ${customer.name}
Phone Number: ${customer.phone}
Delivery Address: ${customer.address}
Delivery Area: ${customer.karachiArea}

Ordered Items:
${itemsBlock}Order Notes: ${notesCombined || 'None'}

Payment Method: Online Payment

Delivery Charges: To Be Confirmed

Order Total: PKR ${cartSubtotal} (Pending delivery charge confirmation)

Notice: Order requires restaurant confirmation on WhatsApp. Online payment details will be provided for transfer.`;

    const waUrl = generateWhatsAppUrl(message);
    window.open(waUrl, '_blank');
    setCheckoutStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#EAE5DC] flex items-center justify-between bg-[#F7F3EB]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white border border-[#EAE5DC] flex items-center justify-center text-[#C7A15A]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[#171717]">
                  {checkoutStep === 'cart' ? 'Your Food Cart' : checkoutStep === 'form' ? 'Checkout Details' : 'Order Forwarded'}
                </h3>
                <p className="text-xs text-[#736B5E]">
                  {cartCount} item{cartCount === 1 ? '' : 's'} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-white transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-14 h-14 text-gray-300 mx-auto mb-4" />
                <h4 className="font-heading font-bold text-lg text-[#171717] mb-1">
                  Your cart is empty
                </h4>
                <p className="text-xs text-[#736B5E] max-w-xs mx-auto mb-6">
                  Explore our Daily Fresh Menu or On-Order Specials to add delicious homemade meals.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 bg-[#C7A15A] hover:bg-[#B38C42] text-white font-semibold text-xs px-6 py-2.5 rounded-full"
                >
                  <span>Browse Menu</span>
                </button>
              </div>
            ) : checkoutStep === 'cart' ? (
              <div className="space-y-4">
                {/* Items List */}
                {cart.map((item) => {
                  const price = item.selectedPortion.price;
                  const itemTotal = price !== null ? price * item.quantity : null;

                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-[#F7F3EB]/70 border border-[#EAE5DC] flex gap-3 items-center justify-between"
                    >
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#EAE5DC]"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-bold text-xs text-[#171717] truncate">
                          {item.menuItem.name}
                        </h4>
                        <p className="text-[11px] text-[#736B5E] font-medium truncate">
                          {item.selectedPortion.label}
                        </p>
                        <p className="text-xs font-extrabold text-[#171717] mt-1">
                          {itemTotal !== null ? `PKR ${itemTotal}` : 'Price on Inquiry'}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-full border border-[#EAE5DC]">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="text-[#171717] hover:text-[#C7A15A]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-3 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="text-[#171717] hover:text-[#C7A15A]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="pt-2">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-gray-500 hover:text-red-600 underline"
                  >
                    Clear all items
                  </button>
                </div>

                {/* Important Notice Pill */}
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Online Payment Only:</span> We do not offer cash on delivery. Delivery charges will be added based on your Karachi delivery area.
                  </div>
                </div>
              </div>
            ) : checkoutStep === 'form' ? (
              /* Customer Details Form */
              <form id="checkout-form" onSubmit={handleProceedToWhatsApp} className="space-y-4">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#736B5E] hover:text-[#171717] font-semibold mb-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to cart review</span>
                </button>

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Siddiqui"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full text-xs p-3 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                  />
                  {formErrors.name && <p className="text-[10px] text-red-600 mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0300 1234567"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full text-xs p-3 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                  />
                  {formErrors.phone && <p className="text-[10px] text-red-600 mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    Karachi Delivery Area *
                  </label>
                  <select
                    value={customer.karachiArea}
                    onChange={(e) => setCustomer({ ...customer, karachiArea: e.target.value })}
                    className="w-full text-xs p-3 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                  >
                    {KARACHI_AREAS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    Complete Street / House Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House/Apartment #, Street, Near landmark"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full text-xs p-3 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                  ></textarea>
                  {formErrors.address && <p className="text-[10px] text-red-600 mt-1">{formErrors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#171717] block mb-1">
                      Delivery Date
                    </label>
                    <input
                      type="date"
                      value={customer.preferredDeliveryDate}
                      onChange={(e) => setCustomer({ ...customer, preferredDeliveryDate: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#171717] block mb-1">
                      Meal Timing
                    </label>
                    <select
                      value={customer.preferredDeliveryTime}
                      onChange={(e) => setCustomer({ ...customer, preferredDeliveryTime: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                    >
                      <option value="Lunch (1:00 PM – 2:30 PM)">Lunch (1:00 – 2:30 PM)</option>
                      <option value="Dinner (7:30 PM – 9:30 PM)">Dinner (7:30 – 9:30 PM)</option>
                      <option value="As Soon As Possible">As Soon As Possible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    Special Cooking / Delivery Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ring bell, keep raita cold"
                    value={customer.specialNotes}
                    onChange={(e) => setCustomer({ ...customer, specialNotes: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                  />
                </div>
              </form>
            ) : (
              /* Success / WhatsApp Handoff Notice */
              <div className="text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-xl text-[#171717]">
                  WhatsApp Ready!
                </h4>
                <div className="text-xs text-[#524D44] leading-relaxed space-y-2 bg-[#F7F3EB] p-5 rounded-2xl border border-[#EAE5DC] text-left">
                  <p>
                    <strong>Important Confirmation Notice:</strong> Your WhatsApp should have opened with your order details pre-filled.
                  </p>
                  <p>
                    Please make sure to <strong>press Send on WhatsApp</strong>. Our kitchen will review your items, calculate the delivery charge for <strong>{customer.karachiArea}</strong>, and send the online payment link to confirm your slot!
                  </p>
                  <p className="text-[11px] text-[#736B5E]">
                    The order is confirmed only after WhatsApp communication with the restaurant.
                  </p>
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      clearCart();
                      setCheckoutStep('cart');
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3 bg-[#171717] text-white text-xs font-bold rounded-xl"
                  >
                    Done & Close Cart
                  </button>

                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="text-xs text-[#736B5E] hover:underline"
                  >
                    Modify items
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer with Subtotal & Proceed Actions */}
          {cart.length > 0 && checkoutStep !== 'success' && (
            <div className="p-5 border-t border-[#EAE5DC] bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#524D44]">
                  <span>Items Subtotal:</span>
                  <span className="font-extrabold text-[#171717]">
                    PKR {cartSubtotal > 0 ? cartSubtotal : 'Price on confirmation'}
                  </span>
                </div>
                <div className="flex justify-between text-[#736B5E]">
                  <span>Delivery Charges:</span>
                  <span className="text-amber-700 font-semibold">To Be Confirmed</span>
                </div>
                <div className="flex justify-between text-xs text-[#736B5E] pt-1 border-t border-dashed border-[#EAE5DC]">
                  <span>Payment Method:</span>
                  <span className="font-semibold text-[#171717]">Online Payment Only</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  type="button"
                  onClick={() => setCheckoutStep('form')}
                  className="w-full flex items-center justify-center gap-2 bg-[#C7A15A] hover:bg-[#B38C42] text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider"
                >
                  <span>Proceed to Delivery Info</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm active:scale-98"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Send Order on WhatsApp</span>
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
