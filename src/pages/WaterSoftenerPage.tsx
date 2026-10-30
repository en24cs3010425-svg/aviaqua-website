import React, { useState } from 'react';
import {
  Droplets,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Flame,
  Activity,
  Zap,
  Building,
  Home,
  Factory,
  Hotel
} from 'lucide-react';
import { api } from '../api/client';

interface WaterSoftenerPageProps {
  onOpenQuoteModal: (service?: 'water_softener', initialData?: any) => void;
}

export const WaterSoftenerPage: React.FC<WaterSoftenerPageProps> = ({ onOpenQuoteModal }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    propertyType: '4 BHK Independent Villa',
    waterUsage: '1,000 - 2,000 Liters / Day',
    waterHardness: '500 - 800 ppm (High Hardness)',
    requirements: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hardWaterProblems = [
    {
      title: 'Plumbing & Faucet Destruction',
      desc: 'Calcium and magnesium precipitate inside pipes, creating thick white mineral scale that chokes water pressure and corrodes luxury designer faucets.'
    },
    {
      title: 'Water Heater & Geyser Burnout',
      desc: 'Just 1mm of lime-scale buildup inside heating elements causes a 16% drop in heat transfer efficiency, leading to skyrocketing electricity bills and heater coil burnout.'
    },
    {
      title: 'Dry Skin, Dull Hair & Hair Fall',
      desc: 'Hard water prevents soaps and shampoos from rinsing clean, leaving an invisible film that strips natural sebum oils, clogs pores, and exacerbates eczema and hair breakage.'
    },
    {
      title: '50% Higher Detergent Wastage',
      desc: 'Minerals neutralize soap molecules into sticky soap scum. Washing machines, dishwashers, and laundry require double the detergent to achieve clean results.'
    }
  ];

  const softenerBenefits = [
    {
      title: 'Silky, Radiant Skin & Glossy Hair',
      desc: 'Soft water completely rinses soap residue, leaving skin deeply hydrated and hair naturally bouncy and tangle-free.'
    },
    {
      title: '100% Scale Elimination Across Home',
      desc: 'Zero white spots on bathroom tiles, glass shower enclosures, chrome fixtures, and stainless steel kitchenware.'
    },
    {
      title: 'Doubles Appliance Lifespan',
      desc: 'Protects geysers, heat pumps, washing machines, RO purifiers, and dishwashers from costly scale breakdowns.'
    },
    {
      title: 'Substantial Household Cost Savings',
      desc: 'Save up to 40% on monthly detergents, soaps, fabric conditioners, and avoid expensive plumbing repairs.'
    }
  ];

  const softenerSystems = [
    {
      title: 'Domestic Whole-House Softeners',
      icon: Home,
      tag: 'Villas & Apartments',
      capacity: '500 to 3,000 LPH',
      desc: 'Compact, whisper-quiet whole-house softening plants installed at the main overhead or underground tank inlet. Supplies pure soft water to every tap in the home.',
      specs: ['Automated digital turbine meter', 'Food-grade premium cation resin', 'Up to 90% water saving during regeneration']
    },
    {
      title: 'Commercial Multi-Bed Softeners',
      icon: Hotel,
      tag: 'Hotels & Hospitals',
      capacity: '5,000 to 50,000 LPH',
      desc: 'Heavy-duty duplex softening configurations ensuring uninterrupted 24/7 soft water supply for hotel laundries, central hot water boilers, and patient facilities.',
      specs: ['Continuous duplex twin-tank operation', 'Automatic motorized multiport valves', 'Corrosion-proof FRP pressure vessels']
    },
    {
      title: 'Industrial High-Flow Softeners',
      icon: Factory,
      tag: 'Manufacturing & Power',
      capacity: '20,000 to 200,000+ LPH',
      desc: 'Engineered for industrial cooling towers, boiler feed water, pharmaceutical lines, and chemical processing to prevent thermal scale fouling.',
      specs: ['Heavy-gauge industrial manifold piping', 'SCADA & PLC automation ready', 'TDS & hardness sensor integration']
    },
    {
      title: 'Automatic Digital Softener Units',
      icon: Sparkles,
      tag: 'Zero-Effort Automation',
      capacity: 'Smart Metered',
      desc: 'Advanced microprocessor-controlled valves initiate automatic brine regeneration based on actual volume consumed rather than blind timers, saving salt and water.',
      specs: ['Touchscreen/LCD interface', 'Brine tank level monitor', 'Battery memory backup for power cuts']
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      setError('Please provide your full name and phone number.');
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
        service: 'water_softener',
        propertyType: formData.propertyType,
        message: `Water Softener Enquiry: Hardness: ${formData.waterHardness}, Daily Usage: ${formData.waterUsage}. Requirements: ${formData.requirements}`,
        metadata: {
          waterUsage: formData.waterUsage,
          hardnessLevel: formData.waterHardness,
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
      {/* 1. Page Header */}
      <section className="relative py-20 bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/water_softener_system_1793343736394.jpg"
            alt="Automated Whole House Water Softener Engineering"
            className="w-full h-full object-cover object-center filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/10 border border-sky-400/30 text-sky-400 text-xs font-semibold">
              <Droplets className="w-3.5 h-3.5" />
              <span>Water Conditioning Division · Ion-Exchange Specialists</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white font-['Space_Grotesk'] leading-tight">
              Intelligent Water Softening &amp; Scale Elimination Systems
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Say goodbye to chalky white stains, blocked piping, ruined bathroom fittings, and hair fall. AviAqua delivers fully automated whole-house and industrial ion-exchange water softeners.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenQuoteModal('water_softener')}
                className="py-3.5 px-7 rounded-xl font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all shadow-lg shadow-sky-500/20 cursor-pointer flex items-center gap-2"
              >
                <span>Book Free Water Hardness Test</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#how-it-works"
                className="py-3.5 px-6 rounded-xl font-semibold text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 transition-all flex items-center gap-2"
              >
                <span>How Ion-Exchange Works</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Educational Section: What Hard Water is & Problems caused */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              The Science of Water Quality
            </span>
            <h2 className="text-3xl font-extrabold text-white font-['Space_Grotesk'] leading-tight">
              What Exactly is Hard Water &amp; Why Does It Cause Heavy Damage?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Hard water contains high concentrations of dissolved minerals—primarily <strong>Calcium (Ca²⁺)</strong> and <strong>Magnesium (Mg²⁺)</strong> ions. As groundwater percolates through limestone deposits, it absorbs these hard elements.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              When heated or exposed to air, these dissolved minerals crystallize into stubborn, rock-hard <strong>Calcium Carbonate (Limescale)</strong>. This silently clogs pipes, calcifies hot water boilers, and strips natural moisture from your hair and skin.
            </p>

            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Did You Know?
              </p>
              <p>Water with hardness above 200 ppm is considered moderately hard, and over 400 ppm causes catastrophic scaling on geyser heating coils and solar water heaters within 6 months.</p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hardWaterProblems.map((prob, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{prob.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Benefits of Water Softeners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              Life With Soft Water
            </span>
            <h2 className="text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
              Transform Your Daily Living &amp; Protect Property
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Experience the unmatched luxury of zero-scale, velvety soft water throughout your entire home or facility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {softenerBenefits.map((b, idx) => (
              <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-sky-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How Ion-Exchange Water Softener Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              Scientific Process
            </span>
            <h2 className="text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
              How AviAqua Ion-Exchange Systems Work
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Our automated systems utilize certified cross-linked polystyrene cation exchange resin beds to remove hardness at the molecular level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-sky-400 font-['Space_Grotesk'] mb-2">01</div>
              <h3 className="text-base font-bold text-white mb-2">Hard Water Inflow &amp; Ion Exchange</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Raw hard water flows through millions of microscopic resin beads pre-charged with Sodium (Na⁺) ions. The resin beads attract and hold the strongly charged Calcium (Ca²⁺) and Magnesium (Mg²⁺) ions, releasing harmless sodium ions in exchange.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-sky-400 font-['Space_Grotesk'] mb-2">02</div>
              <h3 className="text-base font-bold text-white mb-2">Pure Soft Water Discharge</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                100% conditioned soft water exits the vessel with hardness levels reduced below 20 ppm. It flows to your taps, geysers, showers, and appliances with completely restored water pressure and zero scaling tendency.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-sky-400 font-['Space_Grotesk'] mb-2">03</div>
              <h3 className="text-base font-bold text-white mb-2">Smart Automated Brine Regeneration</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When the resin bed reaches saturation, the digital valve automatically draws concentrated salt brine solution from the storage tank, washes away the captured calcium into the drain, and recharges the resin for the next cycle without manual effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Systems Portfolio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
            Engineered Configurations
          </span>
          <h2 className="text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
            Water Softeners for Every Scale
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Tailored configurations for independent homes, luxury villa townships, hospitals, and industrial boiler utilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {softenerSystems.map((sys, idx) => {
            const Icon = sys.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 hover:border-sky-500/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                        {sys.tag}
                      </span>
                      <p className="text-xs font-mono text-sky-400 mt-1">{sys.capacity}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] group-hover:text-sky-400 transition-colors">
                    {sys.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed">
                    {sys.desc}
                  </p>

                  <div className="mt-5 space-y-1.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                    {sys.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onOpenQuoteModal('water_softener', { systemType: sys.title })}
                    className="w-full py-2.5 rounded-lg text-xs font-bold text-slate-900 bg-slate-200 hover:bg-sky-400 transition-colors cursor-pointer text-center"
                  >
                    Request Technical Sizing &amp; Pricing
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Water Softener Enquiry Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto mb-3">
              <Droplets className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              Water Softener Enquiry &amp; Sizing Form
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Provide your details below to schedule a free on-site water hardness titration test and receive custom sizing for your property.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-slate-950 rounded-2xl border border-sky-500/30 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-sky-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Water Softener Request Confirmed!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you, {formData.fullName}. An AviAqua water quality specialist will contact you at {formData.phone} within 2 hours to confirm your complimentary on-site water test.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-white hover:bg-slate-700 cursor-pointer"
              >
                Submit Another Enquiry
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
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pooja Deshmukh"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 99201 88765"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, Maharashtra"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="Independent Villa (3-5 BHK)">Independent Villa (3-5 BHK)</option>
                    <option value="Residential Apartment / Penthouse">Residential Apartment / Penthouse</option>
                    <option value="Entire Residential Society / Tower">Entire Residential Society / Tower</option>
                    <option value="Hotel / Resort / Guest House">Hotel / Resort / Guest House</option>
                    <option value="Hospital / Healthcare Clinic">Hospital / Healthcare Clinic</option>
                    <option value="Commercial Laundry / Car Wash">Commercial Laundry / Car Wash</option>
                    <option value="Manufacturing / Industrial Boiler">Manufacturing / Industrial Boiler</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Daily Water Usage (Approx)
                  </label>
                  <select
                    value={formData.waterUsage}
                    onChange={(e) => setFormData({ ...formData, waterUsage: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="Under 1,000 Liters / Day (Small Family)">Under 1,000 Liters / Day (Small Family)</option>
                    <option value="1,000 - 2,500 Liters / Day (Large Villa)">1,000 - 2,500 Liters / Day (Large Villa)</option>
                    <option value="5,000 - 15,000 Liters / Day (Small Commercial)">5,000 - 15,000 Liters / Day (Small Commercial)</option>
                    <option value="20,000+ Liters / Day (Hotel / Industry)">20,000+ Liters / Day (Hotel / Industry)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Water Hardness Level (If Known)
                  </label>
                  <select
                    value={formData.waterHardness}
                    onChange={(e) => setFormData({ ...formData, waterHardness: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="Not Sure - Need Free Water Test">Not Sure - Need Free Water Test</option>
                    <option value="Moderate Hardness (200 - 400 ppm)">Moderate Hardness (200 - 400 ppm)</option>
                    <option value="High Hardness (400 - 700 ppm)">High Hardness (400 - 700 ppm)</option>
                    <option value="Extreme Hardness (700+ ppm / Borewell)">Extreme Hardness (700+ ppm / Borewell)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Additional Requirements / Existing Issues
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about white scaling on taps, geysers, hair fall, or installation location (overhead tank/underground sump)..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all shadow-md shadow-sky-500/20 active:scale-[0.99] cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Book Free Water Hardness Test & Quotation'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
