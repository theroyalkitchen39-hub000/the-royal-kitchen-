import React from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, Ban, CheckCircle, Shield, MessageCircle } from 'lucide-react';

export const PaymentSection: React.FC = () => {
  const { settings, generateWhatsAppUrl } = useApp();

  const handlePaymentInquiry = () => {
    const msg = `Assalam-o-Alaikum! Please provide the official online payment details (Bank / Raast / JazzCash) for The Royal Kitchen.`;
    window.open(generateWhatsAppUrl(msg), '_blank');
  };

  return (
    <section id="payment" className="py-16 sm:py-20 bg-[#F7F3EB] border-b border-[#EAE5DC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EAE5DC] text-xs font-bold text-[#B38C42] uppercase tracking-wider mb-3 shadow-2xs">
            <CreditCard className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>Transparent & Simple</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mb-4">
            Payment Policy & Methods
          </h2>
          <p className="text-sm sm:text-base text-[#524D44] font-normal leading-relaxed">
            Please review our online payment policy before placing your order.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Strict Online Payment Only */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE5DC] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#B38C42] mb-5">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#171717] mb-2">
                Online Payments Only
              </h3>
              <p className="text-xs text-[#524D44] leading-relaxed mb-4">
                To guarantee freshly prepared food made exclusively for each customer without wastage, all orders are confirmed and scheduled after online payment verification.
              </p>

              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-900 text-xs">
                <Ban className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Cash on delivery (COD) is strictly unavailable.</strong> We appreciate your understanding and cooperation.
                </span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#EAE5DC] text-xs text-[#736B5E]">
              <span>Delivery charges are calculated by area and confirmed before payment.</span>
            </div>
          </div>

          {/* Card 2: Accepted Channels & Safety */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE5DC] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C7A15A]/10 border border-[#C7A15A]/30 flex items-center justify-center text-[#B38C42] mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#171717] mb-2">
                Accepted Channels
              </h3>
              <p className="text-xs text-[#524D44] leading-relaxed mb-4">
                We accept fast and zero-fee online transfers via all Pakistani banking apps and digital wallets:
              </p>

              <ul className="space-y-2.5 text-xs text-[#262626] mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct Bank Transfer (Meezan Bank, HBL, UBL, etc.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Raast Instant Payment (Zero fee, instant verification)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>JazzCash / Easypaisa Digital Wallets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Nayapay & Sadapay</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-[#EAE5DC]">
              <button
                type="button"
                onClick={handlePaymentInquiry}
                className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 px-4 rounded-xl bg-[#F7F3EB] hover:bg-[#EAE5DC] text-[#171717] transition-colors border border-[#EAE5DC]"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                <span>Verify Payment Details on WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
