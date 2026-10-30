import React, { useState } from 'react';
import {
  Leaf,
  Droplets,
  CloudRain,
  Recycle,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Building,
  Factory,
  Hotel,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { api } from '../api/client';

interface WaterManagementPageProps {
  onOpenQuoteModal: (service?: 'water_management', initialData?: any) => void;
}

export const WaterManagementPage: React.FC<WaterManagementPageProps> = ({ onOpenQuoteModal }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    industrySector: 'Commercial Complex / Tech Park',
    dailyVolume: '20,000 - 50,000 Liters / Day',
    solutionFocus: 'Rainwater Harvesting & Ground Recharge',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const managementPillars = [
    {
      title: 'Rainwater Harvesting & Aquifer Recharge',
      icon: CloudRain,
      tag: 'Zero Water Depletion',
      desc: 'Modular catchment networks that intercept 100% of monsoon rooftop runoff through multi-chamber silt arrestors and inject pure water into deep subterranean recharge wells.',
      specs: ['High-capacity automated first-flush diverters', 'Silt & suspended solids dual-filter pits', 'Subterranean recharge well designs']
    },
    {
      title: 'Sewage Treatment Plants (STP) & MBR',
      icon: Recycle,
      tag: 'Wastewater Recycling',
      desc: 'Advanced biological treatment including Moving Bed Biofilm Reactors (MBBR) and Submerged Membrane Bioreactors (MBR) producing odor-free, tertiary-treated water for HVAC & flushing.',
      specs: ['Biological COD/BOD reduction > 95%', 'Odor-free enclosed underground installations', 'Full CPCB & SPCB regulatory compliance']
    },
    {
      title: 'Effluent Treatment & ZLD Systems',
      icon: Factory,
      tag: 'Zero Liquid Discharge',
      desc: 'Heavy-duty industrial chemical treatment plants with primary coagulation, dissolved air flotation, ultrafiltration, and multi-effect evaporators for complete industrial effluent recovery.',
      specs: ['Heavy metal & color precipitation', 'Up to 94% process water recovery', 'Zero liquid discharge compliance']
    },
    {
      title: 'Smart Telemetry & IoT Water Monitoring',
      icon: Activity,
      tag: 'Real-Time Intelligence',
      desc: 'Cloud-connected ultrasonic flow meters, hydrostatic tank depth sensors, and in-line TDS/pH probes transmitting real-time consumption data to our central supervisory platform.',
      specs: ['Automated leak & burst alerts', 'Daily departmental water balance audits', 'Mobile executive dashboards']
    },
    {
      title: 'Water Storage & Distribution Management',
      icon: Layers,
      tag: 'Pressurized Hydraulics',
      desc: 'Variable Frequency Drive (VFD) hydro-pneumatic boosting systems, anti-microbial epoxy-coated storage reservoirs, and zoned distribution manifolds that eliminate low-pressure zones.',
      specs: ['VFD constant pressure pumps', '40% electrical energy savings on pumping', 'Automated tank overflow prevention']
    },
    {
      title: 'Industrial Process Water Purification',
      icon: Cpu,
      tag: 'High-Purity Water',
      desc: 'Reverse Osmosis (RO), Electro-deionization (EDI), and dual-media pressure sand & activated carbon filtration systems for pharmaceuticals, electronics, and precision boilers.',
      specs: ['Ultra-low conductivity output (<0.1 µS/cm)', 'Microbiological endotoxin filtration', 'Food & pharma grade stainless steel sanitary piping']
    }
  ];

  const industrySectors = [
    {
      name: 'Residential Societies & Townships',
      icon: Building,
      focus: 'Greywater treatment for landscaping & flushing, rainwater recharge pits, eliminating private water tanker bills.'
    },
    {
      name: 'Commercial IT Parks & Malls',
      icon: Hotel,
      focus: 'STP water recycling for central HVAC cooling towers, waterless urinals, smart telemetry meters for tenant billing.'
    },
    {
      name: 'Hospitals & Healthcare Facilities',
      icon: ShieldCheck,
      focus: 'Bio-medical wastewater decontamination, dialysis-grade ultrapure water, zero pathogen transmission protocols.'
    },
    {
      name: 'Manufacturing & Textiles',
      icon: Factory,
      focus: 'High-recovery ETP plants, color stripping, Zero Liquid Discharge (ZLD) crystals recovery, pollution board compliance.'
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
        service: 'water_management',
        propertyType: formData.industrySector,
        message: `Water Management Consultation: ${formData.solutionFocus}, Daily Vol: ${formData.dailyVolume}. Sector: ${formData.industrySector}. Details: ${formData.message}`,
        metadata: {
          solutionFocus: formData.solutionFocus,
          dailyVolume: formData.dailyVolume,
          industrySector: formData.industrySector
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
      {/* 1. Page Header */}
      <section className="relative py-20 bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/water_management_plant_1793343736737.jpg"
            alt="Smart Water Management and Conservation Facility"
            className="w-full h-full object-cover object-center filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-semibold">
              <Leaf className="w-3.5 h-3.5" />
              <span>Sustainable Water Infrastructure Division</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white font-['Space_Grotesk'] leading-tight">
              Turnkey Water Conservation, STP &amp; Recycling Solutions
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Eliminate water tanker dependency, slash freshwater consumption by up to 90%, and achieve 100% regulatory environmental compliance with AviAqua closed-loop water ecosystems.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenQuoteModal('water_management')}
                className="py-3.5 px-7 rounded-xl font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
              >
                <span>Request Water Audit &amp; Feasibility</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#solutions-grid"
                className="py-3.5 px-6 rounded-xl font-semibold text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 transition-all flex items-center gap-2"
              >
                <span>Explore Solutions</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Environmental & Operational Impact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Ecological &amp; Economic Value
            </span>
            <h2 className="text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
              How AviAqua Closes the Water Loop
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Water stress is the defining resource crisis of our decade. Our engineering methodology transforms wastewater from an expensive disposal liability into a valuable operational asset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <Recycle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">90%+ Freshwater Recovery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                By treating and recycling greywater and sewage for toilet flushing, garden landscaping, and cooling tower make-up, facilities reduce purchased municipal and tanker water by up to 90%.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                <CloudRain className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Deep Aquifer Replenishment</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our scientific rainwater harvesting recharge wells direct millions of liters of pristine rainwater into subterranean aquifers, raising local water tables and ending dry borewell crises.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Continuous Regulatory Immunity</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Guaranteed adherence to Central &amp; State Pollution Control Board guidelines with automated continuous water quality monitoring (BOD, COD, TSS, and pH) logs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Comprehensive Solutions Grid */}
      <section id="solutions-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Engineering Scope
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
            End-to-End Water Management Catalog
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Tailored for residential societies, IT corridors, industrial estates, and educational campuses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {managementPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-5 space-y-1.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => onOpenQuoteModal('water_management', { focusArea: item.title })}
                    className="w-full py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-slate-200 hover:bg-emerald-400 transition-colors cursor-pointer text-center"
                  >
                    Consult on {item.title}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Industry-Specific Solutions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Targeted Industry Architectures
            </span>
            <h2 className="text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
              Custom Engineered for Your Specific Sector
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Every facility has distinct hydraulic parameters, contaminants, and regulatory criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {industrySectors.map((sector, idx) => {
              const Icon = sector.icon;
              return (
                <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5">{sector.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{sector.focus}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Water Management Consultation Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              Request a Water Management Feasibility Study
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Connect with our senior environmental engineers to design a zero-wastage water management plan.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Consultation Request Confirmed!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you! Our water engineering team will contact you at {formData.phone} within 2 business hours to schedule an initial site assessment.
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
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajiv Menon"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 94471 22345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. operations@hospital.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kochi, Kerala"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Facility / Industry Sector
                  </label>
                  <select
                    value={formData.industrySector}
                    onChange={(e) => setFormData({ ...formData, industrySector: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Commercial Complex / Tech Park">Commercial Complex / Tech Park</option>
                    <option value="Residential Gated Community">Residential Gated Community / Township</option>
                    <option value="Manufacturing / Industrial Plant">Manufacturing / Industrial Plant</option>
                    <option value="Hospital / Medical Facility">Hospital / Medical Facility</option>
                    <option value="Hotel / Resort">Hotel / Resort Property</option>
                    <option value="Educational University Campus">Educational University Campus</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Primary Solution Required
                  </label>
                  <select
                    value={formData.solutionFocus}
                    onChange={(e) => setFormData({ ...formData, solutionFocus: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Rainwater Harvesting & Ground Recharge">Rainwater Harvesting &amp; Ground Recharge</option>
                    <option value="Sewage Treatment Plant (STP) & Recycling">Sewage Treatment Plant (STP) &amp; Recycling</option>
                    <option value="Industrial Effluent Treatment (ETP / ZLD)">Industrial Effluent Treatment (ETP / ZLD)</option>
                    <option value="Smart Telemetry & IoT Water Monitoring">Smart Telemetry &amp; IoT Water Monitoring</option>
                    <option value="Pressurized Pumping & Storage Overhaul">Pressurized Pumping &amp; Storage Overhaul</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Specific Project Objectives / Current Water Challenges
                </label>
                <textarea
                  rows={2}
                  placeholder="Outline current water tanker expenses, discharge compliance requirements, daily capacity needed..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-md shadow-emerald-500/20 active:scale-[0.99] cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Request Feasibility Study & Engineering Consultation'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
