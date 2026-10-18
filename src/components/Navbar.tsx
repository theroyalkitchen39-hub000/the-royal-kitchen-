import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, MessageCircle, Menu, X, Shield, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsAiChatOpen, setIsAdminOpen, settings, generateWhatsAppUrl } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Daily Menu', href: '#daily-menu', badge: 'Fresh' },
    { name: 'On Order', href: '#on-order' },
    { name: 'Patient Special', href: '#patient-special' },
    { name: 'About Us', href: '#about-us' },
    { name: 'Contact & Delivery', href: '#contact' },
  ];

  const handleWhatsAppQuickOrder = () => {
    const greetingMsg = `Assalam-o-Alaikum The Royal Kitchen! I would like to inquire about today's fresh menu and place an order.`;
    window.open(generateWhatsAppUrl(greetingMsg), '_blank');
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#EAE5DC]'
          : 'bg-[#F7F3EB]/90 backdrop-blur-sm border-b border-[#EAE5DC]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-[#171717] border-2 border-[#C7A15A] flex items-center justify-center text-[#C7A15A] font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              TRK
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl text-[#171717] tracking-tight flex items-center gap-1.5">
                THE ROYAL KITCHEN
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A15A]"></span>
              </span>
              <span className="text-xs text-[#736B5E] tracking-wider uppercase font-medium">
                Ghar ka khana ghar tak
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#262626] hover:text-[#C7A15A] transition-colors relative py-1 flex items-center gap-1.5"
              >
                {link.name}
                {link.badge && (
                  <span className="text-[10px] uppercase font-bold bg-[#C7A15A]/15 text-[#B38C42] px-1.5 py-0.5 rounded-full border border-[#C7A15A]/30">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-3">
            {/* AI Assistant Quick Trigger */}
            <button
              onClick={() => setIsAiChatOpen(true)}
              title="Chat with TRK Smart Assistant"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-[#171717] bg-white border border-[#EAE5DC] hover:border-[#C7A15A] hover:text-[#B38C42] transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
              <span>Ask AI</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-[#171717] bg-white border border-[#EAE5DC] hover:border-[#C7A15A] hover:bg-[#F7F3EB] transition-all shadow-2xs group"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#262626] group-hover:text-[#C7A15A] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C7A15A] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp CTA Button */}
            <button
              onClick={handleWhatsAppQuickOrder}
              className="hidden md:inline-flex items-center gap-2 bg-[#C7A15A] hover:bg-[#B38C42] text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Order on WhatsApp</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#171717] hover:bg-[#EAE5DC]/50 lg:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EAE5DC] px-5 py-6 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-4">
            <div className="pb-3 border-b border-[#EAE5DC] flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-[#171717]">The Royal Kitchen (TRK)</p>
                <p className="text-xs text-[#736B5E]">{settings.location}</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="text-xs text-[#736B5E] hover:text-[#C7A15A] flex items-center gap-1 border border-[#EAE5DC] px-2 py-1 rounded"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#171717] hover:text-[#C7A15A] py-1 flex items-center justify-between"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold bg-[#C7A15A]/15 text-[#B38C42] px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}

            <div className="pt-4 border-t border-[#EAE5DC] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppQuickOrder();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold py-3 rounded-xl shadow-sm text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat & Order on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAiChatOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#171717] text-white font-semibold py-2.5 rounded-xl text-sm"
              >
                <Sparkles className="w-4 h-4 text-[#C7A15A]" />
                <span>Ask TRK Smart Assistant</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
