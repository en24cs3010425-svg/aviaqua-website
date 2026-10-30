import React, { useState } from 'react';
import {
  Sun,
  Droplets,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Star,
  Users,
  Award,
  ChevronRight,
  Wrench,
  Activity,
  Layers,
  Leaf
} from 'lucide-react';
import { PageId, Project, Testimonial, SiteSettings } from '../types';
import { SolarCalculator } from '../components/SolarCalculator';

interface HomePageProps {
  settings: SiteSettings;
  projects: Project[];
  testimonials: Testimonial[];
  setCurrentPage: (page: PageId) => void;
  onOpenQuoteModal: (service?: 'solar' | 'water_softener' | 'water_management', initialData?: any) => void;
  onSelectProject: (project: Project) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  settings,
  projects,
  testimonials,
  setCurrentPage,
  onOpenQuoteModal,
  onSelectProject,
}) => {
  const [selectedProcessStep, setSelectedProcessStep] = useState(0);

  const processSteps = [
    {
      step: '01',
      title: 'Free Feasibility Audit',
      subtitle: 'Energy & Water Diagnostics',
      desc: 'Our certified engineers conduct a physical or remote LIDAR solar radiation audit and comprehensive laboratory water testing (TDS, hardness, pH) at zero obligation.',
      points: ['Rooftop shadow analysis', 'Full water hardness titration test', 'Detailed tariff and load analysis']
    },
    {
      step: '02',
      title: 'Custom Engineering Design',
      subtitle: '3D Simulation & ROI Blueprint',
      desc: 'We engineer a tailored blueprint selecting Tier-1 bifacial photovoltaic panels, precision string inverters, and high-capacity dual-tank ion-exchange softeners.',
      points: ['Custom CAD & electrical drawings', 'Guaranteed payback period calculation', 'DISCOM net-metering paperwork']
    },
    {
      step: '03',
      title: 'Certified Installation',
      subtitle: 'Turnkey Commissioning',
      desc: 'Execution by safety-certified technicians using hot-dip galvanized mounting structures, marine-grade cabling, and industrial brass plumbing valves.',
      points: ['Zero-puncture rooftop options', 'Strict IEC & safety protocols', 'Full load stress testing']
    },
    {
      step: '04',
      title: 'Smart Telemetry & AMC',
      subtitle: 'Lifetime Support & Monitoring',
      desc: 'Connect your system to the AviAqua mobile cloud app for real-time solar generation stats, brine level alerts, and scheduled preventive maintenance visits.',
      points: ['Mobile telemetry application', 'Annual salt & filter service', '25-year panel performance guarantee']
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        {/* Background Image with Layered Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/aviaqua_hero_banner_1793343734879.jpg"
            alt="AviAqua Sustainable Solar and Water Solutions"
            className="w-full h-full object-cover object-center transform scale-105 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-start justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md text-xs font-semibold text-slate-200 mb-6 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-amber-400 font-bold">Solar</span>
            <span className="text-slate-500">·</span>
            <span className="text-sky-400 font-bold">Water Softeners</span>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-400 font-bold">Water Management</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl font-['Space_Grotesk'] leading-[1.12]">
            {settings.heroHeadline || 'Powering a Sustainable Future with Smart Energy & Water Solutions.'}
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
            {settings.heroSubtitle || 'Complete Solar Installation, Water Softening, and Smart Water Management Solutions for Homes, Businesses, and Industries.'}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onOpenQuoteModal()}
              className="py-4 px-8 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 transition-all shadow-xl shadow-amber-500/25 active:scale-95 flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('services-overview');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-4 px-8 rounded-xl font-semibold text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 backdrop-blur-md transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <span>Explore Our Services</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Quick Impact Stats Grid */}
          <div className="mt-16 pt-8 border-t border-slate-800/80 w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-['Space_Grotesk']">
                18.5+ MW
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">Solar Capacity Installed</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-['Space_Grotesk']">
                45M+ Liters
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">Water Treated Daily</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-['Space_Grotesk']">
                650+
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">Completed Projects</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk'] flex items-center gap-1.5">
                4.9 <Star className="w-5 h-5 text-amber-400 fill-amber-400 inline" />
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">Google Rating (180+ Reviews)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE SERVICES SHOWCASE */}
      <section id="services-overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
            Integrated Sustainable Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
            Our Three Major Divisions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            AviAqua delivers end-to-end turnkey engineering solutions designed to slash utility expenses, eliminate hard water damage, and optimize ecological stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1: Solar Installation */}
          <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:shadow-amber-500/10">
            <div>
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sun className="w-7 h-7" />
              </div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                Renewable Energy
              </div>
              <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                Solar Installation Business
              </h3>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                Turnkey residential, commercial, and industrial rooftop solar power plants. Featuring Tier-1 Bifacial panels, hybrid battery backups, and seamless DISCOM net-metering.
              </p>

              <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Residential &amp; Commercial On-Grid Systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Hybrid &amp; Off-Grid Battery Storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Up to 85% Electricity Bill Reductions</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setCurrentPage('solar');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-amber-400 group-hover:text-amber-300 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore Solar Solutions</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenQuoteModal('solar')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-amber-400 hover:text-slate-950 transition-colors cursor-pointer"
              >
                Get Quote
              </button>
            </div>
          </div>

          {/* Service 2: Water Softeners */}
          <div className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:shadow-sky-500/10">
            <div>
              <div className="w-14 h-14 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Droplets className="w-7 h-7" />
              </div>
              <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
                Pure Soft Water
              </div>
              <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                Water Softener Business
              </h3>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                Automated whole-house and industrial ion-exchange water softeners. Permanently eliminate chalky scale, protect expensive appliances, and restore healthy skin and hair.
              </p>

              <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Automatic Digital Regeneration Valves</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>100% Protection for Geysers &amp; Plumbing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Villas, Apartments, Hotels &amp; Hospitals</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setCurrentPage('water_softener');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-sky-400 group-hover:text-sky-300 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore Water Softeners</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenQuoteModal('water_softener')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-sky-400 hover:text-slate-950 transition-colors cursor-pointer"
              >
                Get Quote
              </button>
            </div>
          </div>

          {/* Service 3: Water Management */}
          <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:shadow-emerald-500/10">
            <div>
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="w-7 h-7" />
              </div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                Water Sustainability
              </div>
              <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                Water Management Solutions
              </h3>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                Comprehensive wastewater treatment (STP/ETP), rainwater harvesting recharge networks, zero liquid discharge (ZLD), and cloud-connected IoT telemetry.
              </p>

              <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Rainwater Harvesting &amp; Aquifer Recharging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Sewage &amp; Effluent Recycling Plants (STP/ETP)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Smart Telemetry &amp; Remote Flow Monitoring</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setCurrentPage('water_management');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore Water Management</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenQuoteModal('water_management')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-emerald-400 hover:text-slate-950 transition-colors cursor-pointer"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SOLAR CALCULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SolarCalculator
          onBookInspectionWithEstimate={(estimate) => {
            onOpenQuoteModal('solar', estimate);
          }}
        />
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Uncompromising Excellence
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] leading-tight">
                Why Industry Leaders &amp; Homeowners Choose AviAqua
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                We combine deep mechanical and electrical engineering rigor with proprietary water chemistry diagnostics to ensure every installed system delivers guaranteed ROI and decades of reliability.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors text-sm flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Request Free Engineering Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Award,
                  title: 'Tier-1 Certified Hardware Only',
                  desc: 'We strictly deploy BloombergNEF Tier-1 solar panels and NSF/WQA certified food-grade ion exchange resins.',
                  color: 'text-amber-400'
                },
                {
                  icon: ShieldCheck,
                  title: 'Turnkey Regulatory Sanctions',
                  desc: 'End-to-end statutory clearance for DISCOM net-metering, subsidy approvals, and Pollution Control Board compliance.',
                  color: 'text-sky-400'
                },
                {
                  icon: Wrench,
                  title: 'In-House Certified Technicians',
                  desc: 'Zero subcontracting. All structural fabrication, electrical wiring, and plumbing are executed by trained AviAqua teams.',
                  color: 'text-emerald-400'
                },
                {
                  icon: Activity,
                  title: '24/7 Cloud Telemetry & AMC',
                  desc: 'Live IoT telemetry sensors alert our monitoring hub instantly in case of string faults, low salt levels, or filter clogging.',
                  color: 'text-purple-400'
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-5 bg-slate-950 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <Icon className={`w-6 h-6 ${item.color} mb-3`} />
                    <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR 4-STEP WORKING PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            Seamless Execution
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
            Our Proven 4-Step Working Process
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            From preliminary diagnostics to turnkey commissioning and ongoing performance monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {processSteps.map((step, idx) => {
            const isSelected = selectedProcessStep === idx;
            return (
              <div
                key={step.step}
                onClick={() => setSelectedProcessStep(idx)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-3xl font-black text-amber-400 font-['Space_Grotesk'] mb-3">
                  {step.step}
                </div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  {step.subtitle}
                </div>
                <h3 className="text-lg font-bold text-white mt-1 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{step.desc}</p>

                <div className="space-y-1.5 pt-3 border-t border-slate-800">
                  {step.points.map((pt, pIdx) => (
                    <div key={pIdx} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-amber-400 flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. FEATURED PROJECTS PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
              Demonstrated Engineering Mastery
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
              Featured Case Studies &amp; Projects
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Explore real-world turnkey installations completed across residential villas, commercial parks, and manufacturing complexes.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all"
            >
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-amber-400 uppercase">
                  {proj.category.replace('_', ' ')}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center justify-between">
                  <span className="font-semibold text-amber-400">{proj.capacity}</span>
                  <span className="text-slate-400">{proj.location}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-['Space_Grotesk'] group-hover:text-sky-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="mt-3 text-xs text-emerald-400 font-medium">
                    ✓ {proj.impact}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onSelectProject(proj)}
                    className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>Project Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenQuoteModal(proj.category as any)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
                  >
                    Similar Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VERIFIED CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Client Trust &amp; Satisfaction
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
                What Our Clients Say About AviAqua
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                Real feedback from homeowners, corporate facility directors, and industrial operations leaders.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 self-start md:self-auto">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-300 font-bold">4.9 / 5.0</span>
              <span className="text-xs text-slate-500">· 180+ Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {test.date}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{test.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{test.name}</h4>
                    <p className="text-xs text-slate-400">
                      {test.role} · {test.companyOrLocation}
                    </p>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                    Verified Client
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION CONSULTATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 border border-sky-500/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400">
              <SparklesIcon className="w-3.5 h-3.5" />
              Free On-Site Engineering Audit &amp; Technical Consultation
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] leading-tight">
              Ready to Slash Your Power Bills and Enjoy Pure, Soft Water?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Contact our engineering team today. We provide complimentary site shading analyses, water hardness titration tests, and transparent cost-benefit blueprints.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenQuoteModal()}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                Schedule Free Site Inspection
              </button>
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Call {settings.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
