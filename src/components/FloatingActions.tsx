import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, Sparkles, Bot } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { isAiChatOpen, setIsAiChatOpen, generateWhatsAppUrl } = useApp();

  const handleWhatsAppFloatingClick = () => {
    const text = `Assalam-o-Alaikum! I want to inquire about ordering delicious homemade food from The Royal Kitchen (TRK).`;
    window.open(generateWhatsAppUrl(text), '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Action Button (Bottom Left on mobile & desktop to prevent ANY overlap) */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={handleWhatsAppFloatingClick}
          className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95 border-2 border-white/80"
          aria-label="Chat on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
            <span className="w-2.5 h-2.5 bg-white rounded-full absolute -top-1 -right-1 animate-ping"></span>
            <span className="w-2.5 h-2.5 bg-emerald-200 rounded-full absolute -top-1 -right-1"></span>
          </div>
          <span className="hidden sm:inline font-bold text-xs tracking-wide">
            Chat on WhatsApp
          </span>
        </button>
      </div>

      {/* Floating TRK Smart Assistant Button (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsAiChatOpen(!isAiChatOpen)}
          className="group flex items-center gap-2.5 bg-[#171717] hover:bg-[#262626] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 border-2 border-[#C7A15A]"
          aria-label="Open TRK Smart Assistant"
        >
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-[#C7A15A]/20 flex items-center justify-center text-[#C7A15A] group-hover:rotate-12 transition-transform">
              <Bot className="w-4 h-4 text-[#C7A15A]" />
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-0 right-0"></span>
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[10px] text-[#C7A15A] font-bold uppercase tracking-wider leading-none">
              TRK Assistant
            </span>
            <span className="text-xs font-semibold text-white leading-tight">
              Ask AI & Order
            </span>
          </div>
        </button>
      </div>
    </>
  );
};
