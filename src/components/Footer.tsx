import React, { useState } from 'react';
import {
  Sun,
  Droplets,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import { PageId, SiteSettings } from '../types';
import { api } from '../api/client';

interface FooterProps {
  settings: SiteSettings;
  setCurrentPage: (page: PageId) => void;
  onOpenPrivacyModal: () => void;
  onOpenTermsModal: () => void;
  onOpenQuoteModal: (service?: 'solar' | 'water_softener' | 'water_management') => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  setCurrentPage,
  onOpenPrivacyModal,
  onOpenTermsModal,
  onOpenQuoteModal,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribing(true);
    try {
      const res = await api.subscribeNewsletter(newsletterEmail);
      setNewsletterStatus(res.message || 'Subscribed successfully!');
      setNewsletterEmail('');
    } catch (err: any) {
      setNewsletterStatus(err.message || 'Subscription failed');
    } finally {
      setSubscribing(false);
      setTimeout(() => setNewsletterStatus(null), 5000);
    }
  };

  const handleNav = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-sky-500 to-emerald-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                  <Sun className="w-4 h-4 text-amber-400 absolute -top-0.5 -right-0.5" />
                  <Droplets className="w-4 h-4 text-sky-400 absolute -bottom-0.5 -left-0.5" />
                </div>
              </div>

              <div>
                <span className="text-2xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
                  Avi<span className="text-sky-400">Aqua</span>
                </span>
                <span className="text-[10px] ml-1.5 uppercase font-bold text-amber-400 bg-amber-400/10 px-1 py-0.5 rounded">
                  Solutions
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering homes, commercial facilities, and industries with state-of-the-art clean solar energy, automated zero-scaling water softeners, and sustainable water management ecosystems.
            </p>

            {/* Certifications badge */}
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-amber-400 font-medium">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>MNRE Channel Partner</span>
              </div>
            </div>

            {/* Social media links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Our Three Core Businesses (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Core Engineering Divisions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('solar')}
                  className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sun className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Solar Rooftop &amp; On-Grid Systems</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('solar')}
                  className="text-slate-400 hover:text-amber-400 transition-colors pl-5 cursor-pointer"
                >
                  Commercial &amp; Industrial Solar EPC
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('water_softener')}
                  className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1.5 cursor-pointer pt-1"
                >
                  <Droplets className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                  <span>Automatic Water Softeners</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('water_softener')}
                  className="text-slate-400 hover:text-sky-400 transition-colors pl-5 cursor-pointer"
                >
                  Hard Water Treatment &amp; Descaling
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('water_management')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer pt-1"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Rainwater Harvesting &amp; Recharge</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('water_management')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors pl-5 cursor-pointer"
                >
                  Wastewater Treatment &amp; ZLD Plants
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('water_management')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors pl-5 cursor-pointer"
                >
                  Smart Telemetry &amp; Water Metering
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  About AviAqua
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('projects')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Case Studies &amp; Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Contact &amp; Head Office
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer"
                >
                  Free Site Inspection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Connect With Us
            </h4>

            <div className="space-y-2.5 text-xs text-slate-400">
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-2 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{settings.phone}</span>
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2 hover:text-sky-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <span>{settings.email}</span>
              </a>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{settings.address}</span>
              </div>
            </div>

            {/* Newsletter form */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-slate-300 mb-1.5">
                Subscribe to CleanTech Bulletin
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              {newsletterStatus && (
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {newsletterStatus}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal micro-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {settings.companyName}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacyModal}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={onOpenTermsModal}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Support Center
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
