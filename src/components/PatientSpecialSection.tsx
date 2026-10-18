import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeartPulse, MessageCircle, AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';
import { PatientMealInquiry } from '../types';

export const PatientSpecialSection: React.FC = () => {
  const { addPatientInquiry, generateWhatsAppUrl } = useApp();

  const [form, setForm] = useState<PatientMealInquiry>({
    customerName: '',
    whatsappNumber: '',
    deliveryArea: 'Gulshan-e-Iqbal',
    mealType: 'Lunch & Dinner',
    dietaryNeeds: 'Low Oil & Mild Spice',
    ingredientsToAvoid: '',
    instructions: '',
    quantity: '1 Person (Daily)',
    preferredDate: new Date().toISOString().split('T')[0]
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    addPatientInquiry(form);

    const message = `THE ROYAL KITCHEN — PATIENT SPECIAL MEAL INQUIRY

Customer Name: ${form.customerName || 'Inquirer'}
WhatsApp Number: ${form.whatsappNumber || 'N/A'}
Delivery Area (Karachi): ${form.deliveryArea}
Meal Type: ${form.mealType}
Portion / Quantity: ${form.quantity}
Preferred Start Date: ${form.preferredDate}

Dietary Specifications:
- Dietary Need: ${form.dietaryNeeds}
- Ingredients to Strictly Avoid: ${form.ingredientsToAvoid || 'None specified'}
- Detailed Instructions: ${form.instructions || 'Standard light homemade preparation'}

Customer Confirmation:
I confirm that these requirements are in accordance with my physician / healthcare provider recommendations.`;

    setSubmitted(true);
    window.open(generateWhatsAppUrl(message), '_blank');
  };

  return (
    <section id="patient-special" className="py-16 sm:py-24 bg-white border-b border-[#EAE5DC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F3EB] border border-[#EAE5DC] text-xs font-bold text-[#171717] uppercase tracking-wider mb-3">
            <HeartPulse className="w-4 h-4 text-[#C7A15A]" />
            <span>Gentle Home Care</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight mb-4">
            Patient Special Meals
          </h2>
          <p className="text-base sm:text-lg text-[#524D44] font-normal leading-relaxed">
            Carefully prepared homemade meals based on your requested dietary preferences.
          </p>

          {/* Strict Medical Disclaimer Notice */}
          <div className="mt-5 p-4 rounded-2xl bg-[#FFFBF0] border border-[#F3E2B8] text-left flex items-start gap-3.5 max-w-2xl mx-auto shadow-2xs">
            <AlertTriangle className="w-5 h-5 text-[#C7A15A] shrink-0 mt-0.5" />
            <div className="text-xs text-[#6E5522] leading-relaxed">
              <strong className="font-bold text-[#171717] block mb-0.5">Dietary & Healthcare Advisory:</strong>
              We prepare meals strictly according to the specific ingredient instructions you provide. We do not make medical claims, promise therapeutic health benefits, or prescribe medical diets. Customers should provide the exact dietary requirements recommended by their healthcare professional.
            </div>
          </div>
        </div>

        {/* Two-Column Form & Value Prop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Meal Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F7F3EB] p-8 rounded-3xl border border-[#EAE5DC]">
              <h3 className="font-heading font-bold text-xl text-[#171717] mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C7A15A]" />
                How We Cook For Patient Care
              </h3>
              <p className="text-xs text-[#524D44] leading-relaxed mb-6">
                When a family member is recovering or on a restricted diet, cooking separate meals at home can be difficult. We prepare clean, light, customized meals fresh to order.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#C7A15A] shrink-0 font-bold text-xs shadow-2xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#171717]">Zero or Controlled Chillies</h4>
                    <p className="text-[11px] text-[#736B5E]">Prepared with mild whole spices, cumin, or zero red chilli.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#C7A15A] shrink-0 font-bold text-xs shadow-2xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#171717]">Minimal Pure Oil / Desi Ghee</h4>
                    <p className="text-[11px] text-[#736B5E]">Strictly monitored oil measurement; steamed or boiled options available.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#C7A15A] shrink-0 font-bold text-xs shadow-2xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#171717]">Clean & Separate Cookware</h4>
                    <p className="text-[11px] text-[#736B5E]">Cooked separately with pure water and thorough hygiene.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#C7A15A] shrink-0 font-bold text-xs shadow-2xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#171717]">Flexible Daily Delivery</h4>
                    <p className="text-[11px] text-[#736B5E]">Delivered warm across Karachi for lunch or dinner.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular requested dishes for recovery */}
            <div className="p-6 rounded-3xl border border-[#EAE5DC] bg-white">
              <h4 className="font-heading font-bold text-sm text-[#171717] mb-3">
                Frequently Requested Recovery Dishes:
              </h4>
              <ul className="text-xs text-[#524D44] space-y-2 list-disc list-inside">
                <li>Moong Daal Khichdi with fresh mint and mild cumin</li>
                <li>Chicken Yakhni Shorba with boiled chicken & soft carrots</li>
                <li>Steamed Chicken Breast with gentle black pepper marinade</li>
                <li>Lauki / Tinda / Torai (Gourd Curry) in light olive oil</li>
                <li>Soft Whole Wheat Phulka Roti</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Patient Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#F7F3EB]/60 rounded-3xl p-6 sm:p-8 border border-[#EAE5DC] shadow-sm">
              <div className="mb-6">
                <h3 className="font-heading font-bold text-xl text-[#171717]">
                  Customize Patient Meal Inquiry
                </h3>
                <p className="text-xs text-[#736B5E] mt-1">
                  Fill in your specific requirements and submit via WhatsApp. Our team will review and confirm availability.
                </p>
              </div>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-xs">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Inquiry sent to WhatsApp! You can update details or submit another request below.</span>
                </div>
              )}

              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#171717] block mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mrs. Khan"
                      value={form.customerName}
                      onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#171717] block mb-1">
                      WhatsApp Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0300 1234567"
                      value={form.whatsappNumber}
                      onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#171717] block mb-1">
                      Karachi Delivery Area *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gulshan Block 6, Clifton, DHA, PECHS"
                      value={form.deliveryArea}
                      onChange={(e) => setForm({ ...form, deliveryArea: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#171717] block mb-1">
                      Preferred Delivery Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={form.preferredDate}
                      onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#171717] block mb-1">
                      Meal Type & Schedule
                    </label>
                    <select
                      value={form.mealType}
                      onChange={(e) => setForm({ ...form, mealType: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                    >
                      <option value="Lunch Only">Lunch Only (by 1:30 PM)</option>
                      <option value="Dinner Only">Dinner Only (by 8:00 PM)</option>
                      <option value="Both Lunch & Dinner">Both Lunch & Dinner</option>
                      <option value="Weekly Care Plan (Mon-Sat)">Weekly Care Plan (Mon-Sat)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#171717] block mb-1">
                      Quantity / Person Count
                    </label>
                    <select
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                    >
                      <option value="1 Person (Single Portion)">1 Person (Single Portion)</option>
                      <option value="2 Persons (Double Portion)">2 Persons (Double Portion)</option>
                      <option value="Custom Quantity">Custom Quantity (specify below)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    Dietary Requirements Recommended by Doctor
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Low sodium (kam namak), No red chilli, Diabetic safe, Soft mashable food"
                    value={form.dietaryNeeds}
                    onChange={(e) => setForm({ ...form, dietaryNeeds: e.target.value })}
                    className="w-full text-xs p-3 bg-white border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    Ingredients to Strictly AVOID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tomatoes, Ghee, Garlic, Onions, Red Meat, Dairy, Haldi"
                    value={form.ingredientsToAvoid}
                    onChange={(e) => setForm({ ...form, ingredientsToAvoid: e.target.value })}
                    className="w-full text-xs p-3 bg-white border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    Additional Instructions or Dish Requests
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any specific dish (e.g. Chicken Yakhni with boiled veggies, soft Khichdi) or custom packaging instructions."
                    value={form.instructions}
                    onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                    className="w-full text-xs p-3 bg-white border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all text-sm active:scale-98"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Send Patient Meal Inquiry on WhatsApp</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
