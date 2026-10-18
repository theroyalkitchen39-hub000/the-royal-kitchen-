import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, MapPin, Clock, PhoneCall, Shield, ArrowUp } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings, setIsAdminOpen, generateWhatsAppUrl } = useApp();

  const handleWhatsAppChat = () => {
    const text = `Assalam-o-Alaikum! I want to inquire about ordering delicious homemade food from The Royal Kitchen (TRK).`;
    window.open(generateWhatsAppUrl(text), '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#171717] text-white pt-16 pb-12 border-t border-[#262626] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner Callout */}
        <div className="bg-gradient-to-r from-[#262626] to-[#1F1F1F] rounded-3xl p-8 sm:p-12 border border-[#333333] mb-16 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7A15A]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <span className="text-xs font-bold uppercase tracking-widest text-[#C7A15A] block mb-2">
            Karachi Homemade Food Delivery
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Let's Get Your Favorite Food Delivered!
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            Order fresh homemade meals for your family, lunch for the office, or special dishes for a gathering. We are just a message away on WhatsApp.
          </p>

          <button
            onClick={handleWhatsAppChat}
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95 group"
          >
            <MessageCircle className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
            <span>Chat With Us on WhatsApp</span>
          </button>
        </div>

        {/* 4 Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-[#2A2A2A]">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-[#C7A15A] flex items-center justify-center text-[#C7A15A] font-bold text-base">
                TRK
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-white">THE ROYAL KITCHEN</h3>
                <p className="text-xs text-[#C7A15A] font-medium tracking-wider uppercase">Ghar ka khana ghar tak</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Authentic Pakistani homemade culinary service delivering fresh lunch, dinner, on-order biryani, karahi, and gentle patient meals across Karachi.
            </p>
          </div>

          {/* Location & Hub */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#C7A15A] uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C7A15A]" />
              <span>Kitchen Location</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              {settings.location}
            </p>
            <p className="text-xs text-gray-400">
              Coverage: All sectors and blocks across Karachi.
            </p>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#C7A15A] uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C7A15A]" />
              <span>Operating Hours</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              {settings.businessHours}
            </p>
            <p className="text-xs text-amber-400/90">
              * Advance orders recommended 4-6 hours prior.
            </p>
          </div>

          {/* Official WhatsApp & Policy */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#C7A15A] uppercase tracking-wider flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#C7A15A]" />
              <span>Ordering Hotline</span>
            </h4>
            <p className="text-xs text-gray-300 font-mono">
              +{settings.whatsappNumber}
            </p>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Online payment only via Raast / Bank / JazzCash. Cash on delivery is unavailable.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} The Royal Kitchen (TRK). All rights reserved. Made with love for Karachi.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-gray-400 hover:text-[#C7A15A] transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
