import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, ArrowRight, Sparkles, Clock, CheckCircle2, MapPin } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { settings, generateWhatsAppUrl } = useApp();

  const handleWhatsAppClick = () => {
    const text = `Assalam-o-Alaikum! I visited your website and would like to order fresh homemade food from The Royal Kitchen.`;
    window.open(generateWhatsAppUrl(text), '_blank');
  };

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C7A15A]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C7A15A]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE5DC] shadow-xs mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C7A15A] animate-pulse"></span>
              <span className="text-xs uppercase tracking-wider font-bold text-[#736B5E]">
                {settings.tagline || 'Ghar ka khana ghar tak.'}
              </span>
              <span className="text-[#C7A15A] font-bold text-xs">★</span>
              <span className="text-xs text-[#262626] font-medium hidden sm:inline">Karachi Food Delivery</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#171717] tracking-tight leading-[1.15] mb-6">
              Fresh Homemade Food, <br className="hidden sm:inline" />
              <span className="text-[#C7A15A] relative">
                Delivered With Love.
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#C7A15A]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#524D44] leading-relaxed max-w-2xl mb-8 font-normal">
              {settings.heroSubheading || 'Experience the taste of authentic homemade Pakistani food, freshly prepared and delivered to your doorstep across Karachi.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#daily-menu"
                className="inline-flex items-center justify-center gap-2.5 bg-[#C7A15A] hover:bg-[#B38C42] text-white font-semibold text-base px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-98 text-center"
              >
                <span>Explore Today's Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center justify-center gap-2.5 bg-[#171717] hover:bg-[#262626] text-white font-semibold text-base px-7 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-98"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] fill-current" />
                <span>Order on WhatsApp</span>
              </button>
            </div>

            {/* Trust Points Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#EAE5DC] w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white border border-[#EAE5DC] flex items-center justify-center text-[#C7A15A] shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#171717]">100% Home Cooked</p>
                  <p className="text-[11px] text-[#736B5E]">Clean, pure ingredients</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white border border-[#EAE5DC] flex items-center justify-center text-[#C7A15A] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#171717]">Daily Fresh Batches</p>
                  <p className="text-[11px] text-[#736B5E]">Never frozen or stale</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white border border-[#EAE5DC] flex items-center justify-center text-[#C7A15A] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#171717]">Near Gulshan Block 6</p>
                  <p className="text-[11px] text-[#736B5E]">Delivered across Karachi</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Pakistani Food Photography Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Feature Dish Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=85"
                  alt="Authentic Homemade Chicken Biryani with long grain basmati rice and aromatic spices"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Overlay Text */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="inline-block px-2.5 py-1 rounded bg-[#C7A15A] text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                    Chef's Specialty
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-1">
                    Authentic Karachi Chicken Biryani
                  </h3>
                  <p className="text-xs text-white/80 flex items-center justify-between">
                    <span>Dum-cooked with saffron, mint & aloo</span>
                    <span className="font-bold text-[#C7A15A] text-sm">from PKR 1,300</span>
                  </p>
                </div>
              </div>

              {/* Floating Mini Food Card 1: Desi Karahi */}
              <div className="hidden sm:flex absolute -top-6 -left-6 bg-white p-3 rounded-2xl shadow-lg border border-[#EAE5DC] items-center gap-3 animate-float max-w-xs">
                <img
                  src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=200&q=80"
                  alt="Desi Chicken Karahi"
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div>
                  <p className="text-xs font-bold text-[#171717]">Fresh Wok Karahi</p>
                  <p className="text-[11px] text-[#736B5E]">Pure tomatoes & ginger</p>
                  <p className="text-xs font-semibold text-[#B38C42] mt-0.5">Half & 1 KG Portions</p>
                </div>
              </div>

              {/* Floating Mini Badge 2: Ghar Ka Khana Guarantee */}
              <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-6 bg-[#171717] text-white p-4 rounded-2xl shadow-xl border-2 border-[#C7A15A] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C7A15A]/20 flex items-center justify-center text-[#C7A15A]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wide text-white">No Preservatives</p>
                  <p className="text-[11px] text-gray-300">Cooked just like home</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
