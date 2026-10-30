import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SiteSettings, ServiceCategory } from '../types';
import { api } from '../api/client';

interface ContactPageProps {
  settings: SiteSettings;
  onOpenQuoteModal: (service?: ServiceCategory) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, onOpenQuoteModal }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    service: 'solar' as ServiceCategory,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      setError('Please provide your name and phone number.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.submitEnquiry({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        service: formData.service,
        message: formData.message || 'Direct inquiry from Contact Us page.'
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWa = settings.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/aviaqua_hero_banner_1793343734879.jpg"
            alt="AviAqua Corporate Support Hub"
            className="w-full h-full object-cover object-center filter brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-amber-400">
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Engineering Helpdesk</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white font-['Space_Grotesk'] leading-tight">
              Get in Touch with Our Engineers
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Whether you need a residential rooftop solar inspection, an automated water softener for hard borewell water, or an industrial wastewater treatment plant, we are here to assist.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Info & Quick Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Direct Contact Channels
                </span>
                <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] mt-1">
                  {settings.companyName}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{settings.legalName}</p>
              </div>

              {/* Direct clickable cards */}
              <div className="space-y-3 pt-2">
                {/* Phone Call Card */}
                <a
                  href={`tel:${cleanPhone}`}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400/50 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Direct Telephone / Call Now</p>
                      <p className="text-sm font-bold text-white mt-0.5">{settings.phone}</p>
                    </div>
                  </div>
                  <span className="text-xs text-amber-400 font-semibold px-2.5 py-1 rounded bg-amber-400/10">
                    Call
                  </span>
                </a>

                {/* WhatsApp Chat Card */}
                <a
                  href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi AviAqua! I would like to inquire about your solar and water solutions.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Official WhatsApp Business</p>
                      <p className="text-sm font-bold text-white mt-0.5">{settings.whatsapp}</p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold px-2.5 py-1 rounded bg-emerald-400/10">
                    Chat
                  </span>
                </a>

                {/* Email Card */}
                <a
                  href={`mailto:${settings.email}`}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-400/50 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-400/10 text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Email Proposals &amp; Support</p>
                      <p className="text-sm font-bold text-white mt-0.5">{settings.email}</p>
                    </div>
                  </div>
                  <span className="text-xs text-sky-400 font-semibold px-2.5 py-1 rounded bg-sky-400/10">
                    Email
                  </span>
                </a>

                {/* Office Address Card */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Corporate Headquarters</p>
                    <p className="text-xs font-semibold text-white leading-relaxed mt-1">
                      {settings.address}
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Operating &amp; Emergency Support</p>
                    <p className="text-xs font-semibold text-white leading-relaxed mt-1">
                      {settings.workingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Free Quote Quick Modal Trigger */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="w-full py-3 px-4 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Free Quote &amp; Audit Wizard</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="mb-8">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Online Inquiry Desk
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
                  Send Us a Direct Message
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Our engineering team reviews all incoming inquiries and responds within 2 hours during working hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                  <h4 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                    Message Successfully Sent!
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-white">{formData.fullName}</span>. Your enquiry has been routed directly to our regional technical lead. We will reach you via phone or WhatsApp shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg flex items-center gap-2 text-rose-300 text-xs">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Service selection */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Service Required *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'solar', label: 'Solar Installation' },
                        { id: 'water_softener', label: 'Water Softener' },
                        { id: 'water_management', label: 'Water Management' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: item.id as ServiceCategory })}
                          className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                            formData.service === item.id
                              ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. vikram@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        City / Town *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Gurugram, Bengaluru, Pune"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Your Message / Project Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please share details such as monthly electricity bill, type of building, water hardness problems, or timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-500/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>{loading ? 'Submitting Message...' : 'Send Message to Engineering Desk'}</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-400 pt-1">
                    🔒 100% Confidential. Your data is used exclusively to formulate your technical feasibility plan.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Google Maps Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Office Location &amp; Physical Engineering Hub
              </span>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] mt-0.5">
                Visit AviAqua Experience Center
              </h3>
              <p className="text-xs text-slate-400 mt-1">{settings.address}</p>
            </div>

            <a
              href="https://maps.google.com/?q=Sector+62+Gurgaon"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Google Maps Container */}
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <iframe
              title="AviAqua Office Location"
              src={settings.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
