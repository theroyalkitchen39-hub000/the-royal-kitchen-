import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Navigation, MessageCircle, AlertCircle, ExternalLink, CheckCircle2 } from 'lucide-react';
import { KARACHI_AREAS } from '../data/initialData';

export const DeliveryLocationSection: React.FC = () => {
  const { settings, generateWhatsAppUrl } = useApp();
  const [selectedArea, setSelectedArea] = useState<string>(KARACHI_AREAS[0]);
  const [customArea, setCustomArea] = useState<string>('');

  const handleInquireDelivery = () => {
    const area = selectedArea === 'Other Karachi Area (specify in notes)' && customArea ? customArea : selectedArea;
    const msg = `THE ROYAL KITCHEN — DELIVERY INQUIRY\n\nArea: ${area}\nBase Location: Near Gulshan-e-Iqbal Block 6, Karachi\n\nPlease confirm estimated delivery charges and estimated transit time to my address.`;
    window.open(generateWhatsAppUrl(msg), '_blank');
  };

  return (
    <section id="delivery" className="py-16 sm:py-24 bg-white border-b border-[#EAE5DC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F3EB] border border-[#EAE5DC] text-xs font-bold text-[#B38C42] uppercase tracking-wider mb-3">
            <Navigation className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>Service Coverage</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight mb-4">
            Delivery & Kitchen Location
          </h2>
          <p className="text-base sm:text-lg text-[#524D44] font-normal leading-relaxed">
            Freshly prepared near Gulshan-e-Iqbal Block 6 and delivered to families and offices across Karachi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Delivery Coverage & Area Inquirer */}
          <div className="lg:col-span-7 bg-[#F7F3EB] rounded-3xl p-8 border border-[#EAE5DC] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#EAE5DC] flex items-center justify-center text-[#C7A15A] shadow-xs">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#171717]">
                    Karachi Wide Delivery
                  </h3>
                  <p className="text-xs text-[#736B5E]">
                    Dispatch Hub: {settings.location}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-[#C7A15A] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#524D44] leading-relaxed">
                    <strong className="text-[#171717]">Delivery Charges:</strong> Delivery charges vary depending on the distance from our kitchen near Gulshan-e-Iqbal Block 6 to your delivery area. Exact charges are confirmed transparently on WhatsApp before your food is prepared.
                  </p>
                </div>
              </div>

              {/* Area Checker Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1.5">
                    Select Your Delivery Area:
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A] text-[#171717]"
                  >
                    {KARACHI_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedArea === 'Other Karachi Area (specify in notes)' && (
                  <div>
                    <label className="text-xs font-bold text-[#171717] block mb-1.5">
                      Specify Area / Landmark:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bahadurabad near Char Minar"
                      value={customArea}
                      onChange={(e) => setCustomArea(e.target.value)}
                      className="w-full text-xs p-3 bg-white border border-[#EAE5DC] rounded-xl focus:outline-none focus:border-[#C7A15A]"
                    />
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleInquireDelivery}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs py-3.5 px-4 rounded-xl shadow-xs transition-all active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Inquire Delivery Charges on WhatsApp for {selectedArea.split('(')[0]}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Area Coverage List */}
            <div className="mt-8 pt-6 border-t border-[#EAE5DC] grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px] text-[#524D44]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Gulshan-e-Iqbal
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Gulistan-e-Jauhar
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                PECHS & Tariq Rd
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                North Nazimabad
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Federal B Area
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                DHA & Clifton
              </span>
            </div>
          </div>

          {/* Right Column: Google Maps & Location Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#EAE5DC] flex flex-col justify-between shadow-xs">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#171717] text-white text-[11px] font-bold uppercase tracking-wider mb-4">
                Kitchen Center
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#171717] mb-2">
                Gulshan-e-Iqbal Hub
              </h3>
              <p className="text-sm text-[#524D44] leading-relaxed mb-6">
                Located near Gulshan-e-Iqbal Block 6, Karachi. Operating purely as a centralized home delivery service. (We do not offer dine-in or table reservations).
              </p>

              {/* Verified Location Feature Box */}
              <div className="rounded-2xl overflow-hidden border border-[#EAE5DC] bg-[#F7F3EB] p-6 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C7A15A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#171717]">Address Notice</h4>
                    <p className="text-xs text-[#736B5E] mt-1 leading-relaxed">
                      To safeguard residential home privacy, pickup coordinates are shared with confirmed customers. Riders collect directly from our dispatch point.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#524D44]">
                <div className="flex justify-between py-2 border-b border-[#EAE5DC]">
                  <span className="text-[#736B5E]">Delivery Days:</span>
                  <span className="font-bold text-[#171717]">Monday – Sunday (7 Days)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#EAE5DC]">
                  <span className="text-[#736B5E]">Operating Hours:</span>
                  <span className="font-bold text-[#171717]">11:30 AM – 10:30 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#EAE5DC]">
                  <span className="text-[#736B5E]">Lunch Cut-off:</span>
                  <span className="font-bold text-[#171717]">12:00 PM (for same-day lunch)</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#736B5E]">Dinner Cut-off:</span>
                  <span className="font-bold text-[#171717]">6:00 PM (for same-day dinner)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EAE5DC] flex flex-col sm:flex-row gap-3">
              <a
                href={settings.googleMapsUrl || 'https://maps.google.com/?q=Gulshan-e-Iqbal+Block+6+Karachi'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F7F3EB] text-[#171717] font-semibold text-xs py-3 px-4 rounded-xl border border-[#EAE5DC] hover:border-[#C7A15A] transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#C7A15A]" />
                <span>View Area on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
