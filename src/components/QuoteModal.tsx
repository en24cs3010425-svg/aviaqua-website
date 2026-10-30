import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2, Sun, Droplets, ShieldCheck } from 'lucide-react';
import { ServiceCategory } from '../types';
import { api } from '../api/client';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: ServiceCategory;
  initialData?: {
    capacityKw?: number;
    monthlyBill?: number;
    propertyType?: string;
    location?: string;
    estimatedSavings?: number;
    hardnessLevel?: string;
    waterUsage?: string;
    [key: string]: any;
  };
  onSuccess?: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'solar',
  initialData,
  onSuccess
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [service, setService] = useState<ServiceCategory>(defaultService);
  const [propertyType, setPropertyType] = useState('residential');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (defaultService) setService(defaultService);
      if (initialData?.location) setCity(initialData.location);
      if (initialData?.propertyType) setPropertyType(initialData.propertyType.toLowerCase().includes('comm') ? 'commercial' : initialData.propertyType.toLowerCase().includes('ind') ? 'industrial' : 'residential');
      if (initialData?.capacityKw) {
        setMessage(`Interested in ~${initialData.capacityKw} kWp Solar Rooftop system based on monthly electricity bill of ₹${initialData.monthlyBill}. Please schedule site inspection.`);
      } else if (initialData?.hardnessLevel) {
        setMessage(`Water Softener consultation needed. Water Hardness: ${initialData.hardnessLevel}, Daily Usage: ${initialData.waterUsage || 'N/A'}.`);
      }
      setError(null);
      setSubmittedEnquiryId(null);
    }
  }, [isOpen, defaultService, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setError('Please provide your full name and contact phone number.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.submitEnquiry({
        fullName,
        phone,
        email,
        city: city || 'Unspecified',
        service,
        propertyType,
        message: message || `Consultation requested for ${service} solutions.`,
        metadata: initialData || {}
      });

      setSubmittedEnquiryId(res.enquiryId || 'enq-confirmed');
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedEnquiryId ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Consultation Request Received!
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-semibold">{fullName}</span>. Your enquiry reference number is{' '}
              <span className="text-amber-400 font-mono font-bold">{submittedEnquiryId}</span>.
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 text-left max-w-md mx-auto space-y-1">
              <p className="text-slate-200 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                What happens next?
              </p>
              <p>1. Our senior clean energy/water engineer will review your site parameters.</p>
              <p>2. You will receive a direct phone call within 2 hours to confirm your free inspection slot.</p>
              <p>3. A detailed techno-commercial feasibility proposal will be drafted at zero cost.</p>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sun className="w-3.5 h-3.5" />
                <span>Complimentary Consultation &amp; Site Assessment</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                Get a Free Quotation &amp; Feasibility Audit
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Fill in your details below and our technical experts will prepare a custom engineering design and ROI breakdown for you.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg flex items-center gap-2 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Service Category Needed *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'solar', label: 'Solar Rooftop' },
                    { id: 'water_softener', label: 'Water Softener' },
                    { id: 'water_management', label: 'Water Mgmt' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setService(s.id as ServiceCategory)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                        service === s.id
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Mobile / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              {/* Email & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. vikram@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurugram, Delhi NCR"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Property Classification
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['residential', 'commercial', 'industrial', 'agricultural'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className={`py-1.5 px-2 rounded-lg text-xs capitalize transition-colors border cursor-pointer ${
                        propertyType === type
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Project Details / Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details like roof area, monthly electricity bill, water hardness, or site location..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Scheduling Consultation...</span>
                  </>
                ) : (
                  <>
                    <span>Submit &amp; Request Free Inspection</span>
                    <Send className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-500">
                🔒 We respect your privacy. No spam. 100% free engineering consultation with no purchase obligations.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
