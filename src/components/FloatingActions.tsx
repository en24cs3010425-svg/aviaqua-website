import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp, X, Sparkles, Send } from 'lucide-react';
import { SiteSettings } from '../types';

interface FloatingActionsProps {
  settings: SiteSettings;
  onOpenQuoteModal: (service?: 'solar' | 'water_softener' | 'water_management') => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  settings,
  onOpenQuoteModal,
}) => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [waPopupOpen, setWaPopupOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickWhatsApp = (topic: string) => {
    const cleanNumber = settings.whatsapp.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(`Hi AviAqua! I am interested in ${topic}. Please connect me with a technical consultant.`);
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
    setWaPopupOpen(false);
  };

  return (
    <>
      {/* Mobile Sticky Quick Call Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 flex items-center justify-around gap-2 sm:hidden shadow-2xl">
        <a
          href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
          className="flex-1 py-2.5 px-3 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow"
        >
          <Phone className="w-4 h-4 fill-slate-950" />
          <span>Call Now</span>
        </a>

        <button
          onClick={() => setWaPopupOpen(true)}
          className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={() => onOpenQuoteModal()}
          className="py-2.5 px-3 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
        >
          <span>Free Quote</span>
        </button>
      </div>

      {/* Desktop/Tablet Floating WhatsApp & Scroll to Top */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 hidden sm:flex">
        {/* WhatsApp Popup Card */}
        {waPopupOpen && (
          <div className="w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 text-left animate-fade-in relative mb-1">
            <button
              onClick={() => setWaPopupOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">AviAqua Technical Desk</h4>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online &amp; Ready to assist
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-3 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              Hello! 👋 How can our engineering consultants help your home or enterprise today?
            </p>

            <div className="space-y-1.5">
              <button
                onClick={() => handleQuickWhatsApp('Solar Rooftop Installation & Feasibility')}
                className="w-full text-left px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-amber-400/10 hover:border-amber-400/40 border border-slate-700/60 text-xs font-medium text-slate-200 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span>☀️ Solar Installation Quote</span>
                <Send className="w-3 h-3 text-slate-400 group-hover:text-amber-400" />
              </button>

              <button
                onClick={() => handleQuickWhatsApp('Water Softener Solutions for Hard Water')}
                className="w-full text-left px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-sky-400/10 hover:border-sky-400/40 border border-slate-700/60 text-xs font-medium text-slate-200 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span>💧 Water Softener Enquiry</span>
                <Send className="w-3 h-3 text-slate-400 group-hover:text-sky-400" />
              </button>

              <button
                onClick={() => handleQuickWhatsApp('Smart Water Management & STP/Recycling')}
                className="w-full text-left px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-emerald-400/10 hover:border-emerald-400/40 border border-slate-700/60 text-xs font-medium text-slate-200 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span>🌿 Water Management / ZLD</span>
                <Send className="w-3 h-3 text-slate-400 group-hover:text-emerald-400" />
              </button>
            </div>
          </div>
        )}

        {/* Floating WhatsApp Action Button */}
        <button
          onClick={() => setWaPopupOpen(!waPopupOpen)}
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer relative group"
          aria-label="WhatsApp Support"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute right-16 bg-slate-900 border border-slate-700 text-slate-100 text-xs font-medium px-2.5 py-1 rounded-md whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat on WhatsApp
          </span>
        </button>

        {/* Scroll to Top Button */}
        {showTopBtn && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 shadow-lg flex items-center justify-center transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </>
  );
};
