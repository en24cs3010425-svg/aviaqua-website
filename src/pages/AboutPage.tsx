import React from 'react';
import {
  Sun,
  Droplets,
  Target,
  Compass,
  Award,
  ShieldCheck,
  CheckCircle2,
  Users,
  Leaf,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import { SiteSettings } from '../types';

interface AboutPageProps {
  settings: SiteSettings;
  onOpenQuoteModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, onOpenQuoteModal }) => {
  const coreValues = [
    {
      title: 'Engineering Integrity',
      desc: 'We never compromise on components. Every cable, solar module, inverter, and resin tank meets strict global Tier-1 and NSF/WQA standards.'
    },
    {
      title: 'Sustainable Stewardship',
      desc: 'Our fundamental purpose is decoupling human prosperity from environmental depletion through clean solar energy and circular water recycling.'
    },
    {
      title: 'Guaranteed Client ROI',
      desc: 'We present transparent, audit-backed financial payback numbers. If a solution does not produce tangible financial and quality returns, we redesign it.'
    },
    {
      title: 'Lifetime Technical Support',
      desc: 'Commissioning is just day one. We stay committed with 24/7 cloud telemetry, rapid on-site maintenance dispatch, and 25-year performance warranties.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/aviaqua_hero_banner_1793343734879.jpg"
            alt="AviAqua Sustainable Engineering Facility"
            className="w-full h-full object-cover object-center filter brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-amber-400">
              <Sun className="w-3.5 h-3.5" />
              <span>Who We Are · CleanTech &amp; Water Engineering</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white font-['Space_Grotesk'] leading-tight">
              Pioneering Sustainable Energy &amp; Water Sovereignty
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              AviAqua was founded on a singular conviction: the two most vital resources of modern civilization—energy and water—must be clean, abundant, and sustainably managed.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Company Story & Why We Started */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Our Origin
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] leading-tight">
              Why We Started AviAqua
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every day, millions of households and enterprises struggle with twin infrastructural crises: crippling, unpredictable electricity utility tariffs and highly mineralized, damaging hard water that wrecks expensive plumbing, heating appliances, and personal health.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              At the same time, groundwater tables are dropping at alarming rates, with billions of liters of pristine rainwater wasted during monsoons, while sewage flows untreated into municipal drains.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              We launched AviAqua to provide a cohesive, integrated engineering answer: high-yield rooftop solar arrays to eliminate electric bills, automatic ion-exchange water softeners to eradicate scale, and smart circular water management to make buildings water-independent.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenQuoteModal}
                className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors text-sm inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Partner With AviAqua</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="/src/assets/images/solar_installation_hero_1793343735977.jpg"
                alt="AviAqua Engineering Team"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">Field Certified</p>
                <p className="text-sm font-semibold text-white mt-0.5">Over 650+ Turnkey CleanTech Projects Commissioned</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-6">
              <Compass className="w-7 h-7" />
            </div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              Guiding Horizon
            </div>
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] mb-3">
              Our Vision
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To be the benchmark leader in integrated distributed clean energy and circular water technology—building a world where every building produces its own clean power, enjoys pure water, and discharges zero waste.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 relative overflow-hidden group hover:border-sky-500/40 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-sky-400/10 text-sky-400 flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
              Everyday Execution
            </div>
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] mb-3">
              Our Mission
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To engineer and commission high-performance solar power plants, automated ion-exchange water softeners, and smart water recycling systems with flawless craftsmanship, rapid execution, and guaranteed financial return on investment.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Our DNA
          </span>
          <h2 className="text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
            Our Core Principles
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            The fundamental standards that govern every engineering calculation, component selection, and client interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all">
              <div className="text-2xl font-black text-amber-400 font-['Space_Grotesk'] mb-3">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{val.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Commitments to Sustainability & Customer Satisfaction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                Commitment to Sustainability
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every solar megawatt we connect directly eliminates thousands of tons of coal burning and sulfur emissions. Every water softener reduces chemical detergent pollution, while our rainwater harvesting and wastewater recycling systems replenish critical aquifers.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Aligned with UN Sustainable Development Goals (SDG 6, 7 &amp; 13)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Zero harmful chemical additives in residential water softeners</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                Commitment to Customer Satisfaction
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We believe trust is earned through transparency. We provide clear, itemized component specifications, zero hidden installation costs, full assistance with governmental subsidies, and dedicated post-installation support.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>24-Hour emergency repair technician dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Free annual performance audits with every AMC contract</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
