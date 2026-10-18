import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';
import { X, Send, Sparkles, MessageCircle, Utensils, Calendar, MapPin, RefreshCw, Bot } from 'lucide-react';

export const AiSalesAssistant: React.FC = () => {
  const { isAiChatOpen, setIsAiChatOpen, settings, generateWhatsAppUrl } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Assalam-o-Alaikum! 👋 Welcome to The Royal Kitchen. I'm your food ordering assistant. Would you like to explore today's fresh menu or order something special?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Aaj kya bana hai?',
        'Special Chicken Biryani price?',
        'Patient meals process?',
        'Delivery & online payment policy?'
      ]
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAiChatOpen) {
      scrollToBottom();
    }
  }, [messages, isAiChatOpen]);

  if (!isAiChatOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-5)
        })
      });

      if (!response.ok) {
        throw new Error('Chat service error');
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "Assalam-o-Alaikum! We're glad to assist you. Please let us know if you'd like to order today's menu or on-order specials.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: data.suggestedQuestions || [
          "Explore Daily Menu",
          "Special Biryani & Karahi",
          "Order on WhatsApp"
        ]
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      // Clean fallback as requested in Section 9
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: `Assalam-o-Alaikum! Hamare pas aaj taza homestyle khana dastyab hai. Aap website par Daily Menu aur On-Order specials dekh kar direct WhatsApp par order confirm kar sakte hain!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'View Daily Menu',
          'Delivery to Karachi',
          'WhatsApp Direct Help'
        ]
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickShortcut = (type: 'menu' | 'special' | 'delivery' | 'whatsapp') => {
    if (type === 'menu') {
      handleSendMessage('Aaj ka daily fresh menu kya hai?');
    } else if (type === 'special') {
      handleSendMessage('Advance on-order specials (Biryani, Karahi, Qorma) ki detail aur pricing bata dein.');
    } else if (type === 'delivery') {
      handleSendMessage('Karachi mein delivery coverage aur payment rules kya hain?');
    } else if (type === 'whatsapp') {
      const waMsg = `Assalam-o-Alaikum TRK! I was chatting with your AI assistant and want to connect with your team directly.`;
      window.open(generateWhatsAppUrl(waMsg), '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 pointer-events-none">
      
      {/* Click outside backdrop for mobile */}
      <div
        className="fixed inset-0 bg-black/40 sm:bg-transparent pointer-events-auto sm:pointer-events-none"
        onClick={() => setIsAiChatOpen(false)}
      />

      <div className="pointer-events-auto w-full sm:w-[420px] max-h-[85vh] h-[640px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#EAE5DC] flex flex-col overflow-hidden z-10 transition-all duration-300">
        
        {/* Chat Header */}
        <div className="p-4 bg-[#171717] text-white flex items-center justify-between border-b border-[#2A2A2A]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#262626] border border-[#C7A15A] flex items-center justify-center text-[#C7A15A]">
                <Bot className="w-5 h-5" />
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-[#171717]"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-heading font-bold text-sm text-white">TRK Smart Assistant</h3>
                <span className="text-[10px] bg-[#C7A15A]/20 text-[#C7A15A] px-1.5 py-0.2 rounded font-mono font-bold">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                English • Roman Urdu • اردو
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAiChatOpen(false)}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Shortcut Row */}
        <div className="bg-[#F7F3EB] px-3 py-2 border-b border-[#EAE5DC] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
          <button
            onClick={() => handleQuickShortcut('menu')}
            className="px-2.5 py-1 rounded-full bg-white border border-[#EAE5DC] hover:border-[#C7A15A] text-[#171717] font-medium flex items-center gap-1 shrink-0 whitespace-nowrap shadow-2xs"
          >
            <Utensils className="w-3 h-3 text-[#C7A15A]" />
            <span>Daily Menu</span>
          </button>
          <button
            onClick={() => handleQuickShortcut('special')}
            className="px-2.5 py-1 rounded-full bg-white border border-[#EAE5DC] hover:border-[#C7A15A] text-[#171717] font-medium flex items-center gap-1 shrink-0 whitespace-nowrap shadow-2xs"
          >
            <Calendar className="w-3 h-3 text-[#C7A15A]" />
            <span>Special Orders</span>
          </button>
          <button
            onClick={() => handleQuickShortcut('delivery')}
            className="px-2.5 py-1 rounded-full bg-white border border-[#EAE5DC] hover:border-[#C7A15A] text-[#171717] font-medium flex items-center gap-1 shrink-0 whitespace-nowrap shadow-2xs"
          >
            <MapPin className="w-3 h-3 text-[#C7A15A]" />
            <span>Delivery Info</span>
          </button>
          <button
            onClick={() => handleQuickShortcut('whatsapp')}
            className="px-2.5 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-emerald-800 font-semibold flex items-center gap-1 shrink-0 whitespace-nowrap"
          >
            <MessageCircle className="w-3 h-3 text-[#25D366] fill-current" />
            <span>WhatsApp Support</span>
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-2xs ${
                    isUser
                      ? 'bg-[#171717] text-white rounded-br-xs'
                      : 'bg-[#F7F3EB] text-[#171717] border border-[#EAE5DC] rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Suggestions Pills if provided by Assistant */}
                {!isUser && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        disabled={isLoading}
                        onClick={() => handleSendMessage(sug)}
                        className="text-[11px] bg-white border border-[#EAE5DC] hover:border-[#C7A15A] text-[#524D44] hover:text-[#171717] px-2.5 py-1 rounded-full transition-colors text-left"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#736B5E] p-2 bg-[#F7F3EB] rounded-xl w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C7A15A]" />
              <span>Checking live menu details...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="p-3 border-t border-[#EAE5DC] bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask in English or Roman Urdu (e.g. 'Aaj kya bana hai?')..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 text-xs px-3.5 py-2.5 bg-[#F7F3EB] border border-[#EAE5DC] rounded-full focus:outline-none focus:border-[#C7A15A]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="w-9 h-9 rounded-full bg-[#171717] hover:bg-[#C7A15A] text-white flex items-center justify-center transition-colors disabled:opacity-40 shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-center text-gray-400 mt-2">
            The Royal Kitchen • Final orders confirmed on WhatsApp
          </p>
        </div>

      </div>
    </div>
  );
};
