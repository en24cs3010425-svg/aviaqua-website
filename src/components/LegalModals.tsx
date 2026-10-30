import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-left max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Data Protection &amp; Confidentiality</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              AviAqua Privacy Policy
            </h3>
            <p className="text-xs text-slate-400">Last updated: January 2026</p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                At AviAqua CleanTech &amp; Water Engineering, your personal and architectural data is treated with the highest enterprise-grade discretion. This policy outlines how we collect, store, and utilize your project parameters.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">1. Information We Collect</h4>
              <p>
                When you request a solar calculator estimate, water softener audit, or wastewater treatment consultation, we collect contact details (name, phone number, email) and property parameters (electricity bills, water consumption, hardness TDS levels).
              </p>
              <h4 className="font-bold text-white text-sm pt-2">2. Purpose of Processing</h4>
              <p>
                Your data is exclusively utilized to engineer tailored solar system designs, size ion-exchange softeners, file utility net-metering sanctions, and dispatch certified field engineers for physical site inspections.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">3. Zero Third-Party Selling</h4>
              <p>
                We do not sell, rent, or lease your private information to lead brokers, advertisers, or third parties. All communications are directly from AviAqua engineering representatives.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Service Agreements</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Terms &amp; Conditions
            </h3>
            <p className="text-xs text-slate-400">Effective: 2026</p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                By engaging AviAqua engineering services, site inspections, and web tools, you agree to standard engineering evaluation protocols.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">1. Feasibility Estimates</h4>
              <p>
                All figures produced by the web-based Solar Sizing Tool and Water Softener calculator are preliminary estimates. Binding system specifications and performance covenants are finalized following on-site roof structural analysis, azimuth checks, and laboratory water chemistry tests.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">2. Warranty &amp; Service Guarantees</h4>
              <p>
                Solar photovoltaic modules carry a 25-year linear performance warranty. Inverters and automatic water softening control valves carry manufacturer warranties supplemented by AviAqua AMC guarantees.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">3. Grid Sanctions &amp; Statutory Approvals</h4>
              <p>
                AviAqua facilitates statutory net-metering and pollution control board submissions on behalf of clients, adhering strictly to state electrical regulatory commissions.
              </p>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
