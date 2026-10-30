import React, { useState } from 'react';
import {
  Sun,
  Zap,
  BatteryCharging,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  Wrench,
  ArrowRight,
  HelpCircle,
  Clock,
  Sparkles,
  Building,
  Home,
  Factory
} from 'lucide-react';
import { SolarCalculator } from '../components/SolarCalculator';
import { api } from '../api/client';

interface SolarPageProps {
  onOpenQuoteModal: (service?: 'solar', initialData?: any) => void;
}

export const SolarPage: React.FC<SolarPageProps> = ({ onOpenQuoteModal }) => {
  // Direct on-page enquiry state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    propertyType: 'Residential Rooftop',
    systemType: 'On-Grid Net Metering',
    monthlyBill: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const solarOfferings = [
    {
      title: 'Residential Rooftop Solar',
      icon: Home,
      tag: 'Homes & Villas',
      desc: 'Turn unused roof space into a 25-year personal power plant. Slash household air-conditioning and appliance electric bills by up to 90% with zero noise.',
      specs: ['3 kW to 20 kW systems', 'Monocrystalline Half-cut Bifacial', '25-Year Performance Guarantee']
    },
    {
      title: 'Commercial Solar Solutions',
      icon: Building,
      tag: 'Offices & Institutions',
      desc: 'Cut commercial peak-demand electricity tariffs significantly. Accelerate depreciation tax benefits while meeting corporate green ESG and LEED certification milestones.',
      specs: ['25 kW to 500 kW capacity', 'Zero-export & Grid sync', 'Under 3.5 years payback']
    },
    {
      title: 'Industrial High-Load Solar',
      icon: Factory,
      tag: 'Factories & Warehouses',
      desc: 'Engineered for high metal shed and industrial campus rooftops. Seamlessly integrates with existing HT/LT grids and backup diesel generators to minimize fuel burns.',
      specs: ['100 kW to 2+ MW plants', 'Heavy wind-load engineering', 'Dedicated SCADA cloud telemetry']
    },
    {
      title: 'On-Grid Net-Metered Systems',
      icon: Zap,
      tag: 'Maximum ROI',
      desc: 'Direct synchronization with your local utility power grid. Surplus solar energy generated during sunny afternoons is credited back to your utility bill via bidirectional net meters.',
      specs: ['Zero battery maintenance cost', 'Highest electrical efficiency', 'DISCOM statutory approvals managed']
    },
    {
      title: 'Hybrid Solar with Lithium Backup',
      icon: BatteryCharging,
      tag: '24/7 Grid Immunity',
      desc: 'The best of both worlds: feeds excess solar into the utility grid while maintaining an integrated high-cycle Lithium iron phosphate (LiFePO4) battery for blackouts.',
      specs: ['5ms seamless power transition', 'Zero diesel fumes or noise', '10-Year battery warranty']
    },
    {
      title: 'Solar Panel Maintenance & AMC',
      icon: Wrench,
      tag: 'Optimal Generation',
      desc: 'Comprehensive annual maintenance contracts: robotic and de-ionized dry water cleaning, infrared thermography hotspot audits, inverter firmware updates, and string testing.',
      specs: ['Quarterly preventive audits', 'Emergency repair response', 'Guaranteed peak generation uptime']
    }
  ];

  const solarInstallationSteps = [
    {
      num: '01',
      title: '3D Solar & Structural Audit',
      desc: 'Physical roof inspection and LIDAR shading analysis to determine optimal tilt, azimuth, wind-load capacity, and electrical conduit routing.'
    },
    {
      num: '02',
      title: 'Engineering & Sanctions',
      desc: 'CAD layout design, single-line electrical schematics, and filing net-metering approvals with state electricity boards.'
    },
    {
      num: '03',
      title: 'Turnkey Installation',
      desc: 'Erection of hot-dip galvanized mounting structures, panel clamping, inverter commissioning, DC/AC distribution boxes, and chemical earthing pits.'
    },
    {
      num: '04',
      title: 'Bi-directional Net Metering',
      desc: 'DISCOM testing, inspection, and installation of the official bi-directional solar net-meter followed by system activation.'
    }
  ];

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
        service: 'solar',
        propertyType: formData.propertyType,
        message: `Solar Inquiry for ${formData.systemType}. Monthly bill approx ₹${formData.monthlyBill || 'N/A'}. ${formData.notes}`,
        metadata: {
          systemType: formData.systemType,
          monthlyBill: formData.monthlyBill,
          propertyType: formData.propertyType
        }
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/solar_installation_hero_1793343735977.jpg"
            alt="Solar Rooftop Installation Engineering"
            className="w-full h-full object-cover object-center filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold">
              <Sun className="w-3.5 h-3.5" />
              <span>Clean Energy Division · Tier-1 Certified EPC</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white font-['Space_Grotesk'] leading-tight">
              High-Efficiency Rooftop &amp; Industrial Solar Engineering
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Unlock energy independence with custom-engineered On-grid, Hybrid, and Commercial rooftop solar power plants. Built to deliver maximum kilowatt-hour yield for over 25 years.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenQuoteModal('solar')}
                className="py-3.5 px-7 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2"
              >
                <span>Request Free Site Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#solar-calculator"
                className="py-3.5 px-6 rounded-xl font-semibold text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 transition-all flex items-center gap-2"
              >
                <span>Calculate Your Savings</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Solar Calculator */}
      <section id="solar-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <SolarCalculator
          onBookInspectionWithEstimate={(estimate) => {
            onOpenQuoteModal('solar', estimate);
          }}
        />
      </section>

      {/* 3. Detailed Systems Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            Tailored Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
            Comprehensive Solar Solutions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            From compact residential rooftop arrays to multi-megawatt industrial solar parks, we engineer systems that match your exact power consumption profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solarOfferings.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center border border-amber-400/20 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-5 space-y-1.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => onOpenQuoteModal('solar', { systemType: item.title })}
                    className="w-full py-2.5 rounded-lg text-xs font-bold text-slate-900 bg-slate-200 hover:bg-amber-400 transition-colors cursor-pointer text-center"
                  >
                    Inquire for {item.title}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Solar Installation Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Step-by-Step Commissioning
            </span>
            <h2 className="text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
              How AviAqua Installs Your Solar Plant
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Our structured 4-phase commissioning process ensures safe structural anchoring, zero roof leakages, and rapid net-metering synchronization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solarInstallationSteps.map((step, idx) => (
              <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative">
                <span className="text-3xl font-black text-amber-400 font-['Space_Grotesk']">
                  {step.num}
                </span>
                <h3 className="text-base font-bold text-white mt-2 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Dedicated Solar Enquiry Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto mb-3">
              <Sun className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              Request Your Free Solar Feasibility Audit
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Submit your property and billing details. An AviAqua solar engineer will conduct a complimentary satellite shading analysis.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Solar Enquiry Received!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you! Our technical solar consultant will contact you at {formData.phone} within 2 hours to confirm your rooftop inspection appointment.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-white hover:bg-slate-700 cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {error && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Sharma"
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. vikram@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
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
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Avg Monthly Bill (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 12000"
                    value={formData.monthlyBill}
                    onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Residential Rooftop">Residential Villa / Home</option>
                    <option value="Commercial Complex">Commercial Complex / Office</option>
                    <option value="Industrial Shed">Industrial Factory / Warehouse</option>
                    <option value="Housing Society">Apartment / Housing Society</option>
                    <option value="Institutional">Hospital / School / Campus</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Solar System Preference
                  </label>
                  <select
                    value={formData.systemType}
                    onChange={(e) => setFormData({ ...formData, systemType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="On-Grid Net Metering">On-Grid System (Max Savings)</option>
                    <option value="Hybrid with Battery Backup">Hybrid System (With Power Backup)</option>
                    <option value="Off-Grid Remote Solar">Off-Grid Remote Solar</option>
                    <option value="Solar Maintenance & Cleaning">Solar Maintenance &amp; AMC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Additional Notes / Roof Details
                </label>
                <textarea
                  rows={2}
                  placeholder="Estimated shadow-free roof area, SANCTIONED LOAD, or specific preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-500/20 active:scale-[0.99] cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Submitting Request...' : 'Book Free On-Site Inspection & Feasibility Report'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
