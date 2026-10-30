import React, { useState, useId } from 'react';
import {
  Sun,
  Zap,
  TrendingDown,
  Leaf,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Calculator,
  HelpCircle,
  Building,
  Home,
  Factory,
  CheckCircle2
} from 'lucide-react';
import { SolarCalculationResult } from '../types';

interface SolarCalculatorProps {
  onBookInspectionWithEstimate?: (estimateData: {
    capacityKw: number;
    monthlyBill: number;
    propertyType: string;
    location: string;
    estimatedSavings: number;
  }) => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({
  onBookInspectionWithEstimate,
}) => {
  const [monthlyBill, setMonthlyBill] = useState<number>(8500);
  const [propertyType, setPropertyType] = useState<string>('Residential');
  const [locationCity, setLocationCity] = useState<string>('Delhi NCR / Haryana');
  const [tariffPerUnit, setTariffPerUnit] = useState<number>(8.5);
  const monthlyBillInputId = useId();
  const consumptionInputId = useId();
  const tariffInputId = useId();
  const propertySelectId = useId();
  const locationSelectId = useId();

  // Calculated values
  const monthlyUnits = Math.round(monthlyBill / tariffPerUnit);
  // Average daily units needed = monthlyUnits / 30
  // 1 kWp produces ~4 units/day (120 units/month) under typical Indian/tropical sunshine
  const recommendedCapacityKw = Math.max(1, Math.round((monthlyUnits / 120) * 10) / 10);
  
  // High-efficiency panels (540W = 0.54 kW)
  const panelsCount = Math.ceil((recommendedCapacityKw * 1000) / 540);
  // Approx 80-100 sq.ft per kWp
  const roofAreaSqFt = Math.round(recommendedCapacityKw * 90);
  const annualGenerationKwh = Math.round(recommendedCapacityKw * 1450); // ~1450 kWh per kWp/year
  const monthlyGeneration = Math.round(annualGenerationKwh / 12);

  // Savings estimation (~85% bill reduction max on grid or matching consumption)
  const potentialMonthlyUnitsReplaced = Math.min(monthlyUnits, monthlyGeneration);
  const estimatedMonthlySavings = Math.round(potentialMonthlyUnitsReplaced * tariffPerUnit);
  
  // 25-Year cumulative savings considering 0.5% yearly degradation and 3% power tariff inflation
  let twentyFiveYearSavings = 0;
  let currentAnnualSavings = estimatedMonthlySavings * 12;
  for (let year = 1; year <= 25; year++) {
    twentyFiveYearSavings += currentAnnualSavings;
    currentAnnualSavings *= 1.025; // 2.5% inflation offset against 0.5% degradation
  }
  twentyFiveYearSavings = Math.round(twentyFiveYearSavings);

  // Carbon and ecological impact
  const co2OffsetTonsYear = Math.round(annualGenerationKwh * 0.82 * 10) / 10000; // ~0.82 kg CO2 per kWh
  const treesPlantedEquivalent = Math.round(annualGenerationKwh * 0.04);
  
  // Indicative system benchmark cost (~₹48,000 to ₹58,000 per kWp for Tier-1)
  const indicativeSystemCost = Math.round(recommendedCapacityKw * 52000);
  const paybackPeriodYears = Math.max(2.8, Math.round((indicativeSystemCost / (estimatedMonthlySavings * 12)) * 10) / 10);

  const handleBookInspection = () => {
    if (onBookInspectionWithEstimate) {
      onBookInspectionWithEstimate({
        capacityKw: recommendedCapacityKw,
        monthlyBill,
        propertyType,
        location: locationCity,
        estimatedSavings: estimatedMonthlySavings
      });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase mb-1">
            <Calculator className="w-4 h-4" />
            <span>Interactive ROI &amp; Sizing Tool</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
            Solar System &amp; Savings Calculator
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Estimate your required rooftop capacity, panel count, monthly electricity bill reduction, and 25-year cumulative return on investment.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700 px-4 py-2.5 rounded-xl self-start">
          <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div className="text-xs">
            <p className="text-slate-200 font-semibold">Tier-1 Mono PERC Bifacial</p>
            <p className="text-slate-400">25-Year Performance Warranty</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs vs Computed Output */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Monthly Electricity Bill */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={monthlyBillInputId} className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                Monthly Electricity Bill
              </label>
              <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-lg">
                <span className="text-xs text-amber-300 font-medium">₹</span>
                <input
                  id={monthlyBillInputId}
                  type="number"
                  min="1000"
                  max="1000000"
                  step="500"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Math.max(500, Number(e.target.value)))}
                  className="w-24 text-sm font-bold text-amber-300 bg-transparent focus:outline-none text-right"
                />
              </div>
            </div>

            <input
              type="range"
              min="1500"
              max="150000"
              step="500"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />

            <div className="flex justify-between text-[11px] text-slate-400 mt-2">
              <span>₹1,500/mo</span>
              <span className="text-slate-300 font-medium">~{monthlyUnits} kWh / month</span>
              <span>₹1,50,000/mo</span>
            </div>
          </div>

          {/* Property Type Selection */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
            <label htmlFor={propertySelectId} className="text-sm font-semibold text-slate-200 block mb-3">
              Property &amp; Installation Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'Residential', label: 'Residential Home / Villa', icon: Home },
                { id: 'Commercial', label: 'Commercial Complex', icon: Building },
                { id: 'Industrial', label: 'Factory / Industrial Shed', icon: Factory },
                { id: 'Apartment', label: 'Society / Apartment', icon: Building },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = propertyType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPropertyType(item.id)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-amber-400/10 border-amber-400/60 text-white shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-semibold leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location & Tariff setting */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              <label htmlFor={locationSelectId} className="text-xs font-semibold text-slate-300 block mb-1.5">
                Region / State
              </label>
              <select
                id={locationSelectId}
                value={locationCity}
                onChange={(e) => setLocationCity(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              >
                <option value="Delhi NCR / Haryana">Delhi NCR / Haryana</option>
                <option value="Maharashtra / Mumbai / Pune">Maharashtra / Pune</option>
                <option value="Karnataka / Bengaluru">Karnataka / Bengaluru</option>
                <option value="Gujarat / Ahmedabad">Gujarat / Surat</option>
                <option value="Tamil Nadu / Chennai">Tamil Nadu / Chennai</option>
                <option value="Telangana / Hyderabad">Telangana / Hyderabad</option>
                <option value="Rajasthan / Jaipur">Rajasthan / Jaipur</option>
                <option value="Other States">Other Regions</option>
              </select>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              <label htmlFor={tariffInputId} className="text-xs font-semibold text-slate-300 block mb-1.5">
                Avg Tariff (₹/unit)
              </label>
              <input
                id={tariffInputId}
                type="number"
                step="0.5"
                min="4"
                max="18"
                value={tariffPerUnit}
                onChange={(e) => setTariffPerUnit(Math.max(3, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Right Computed Output Column */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            <div className="bg-slate-950/80 border border-amber-500/30 p-4 rounded-xl relative overflow-hidden">
              <div className="text-[11px] font-semibold text-amber-400 tracking-wide uppercase">
                Recommended Capacity
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-['Space_Grotesk']">
                {recommendedCapacityKw}{' '}
                <span className="text-sm font-semibold text-amber-400">kWp</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                ~{panelsCount} Bifacial Modules
              </div>
            </div>

            <div className="bg-slate-950/80 border border-emerald-500/30 p-4 rounded-xl relative overflow-hidden">
              <div className="text-[11px] font-semibold text-emerald-400 tracking-wide uppercase">
                Monthly Savings
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-['Space_Grotesk']">
                ₹{estimatedMonthlySavings.toLocaleString()}{' '}
                <span className="text-xs font-semibold text-emerald-400">/ mo</span>
              </div>
              <div className="text-[11px] text-emerald-400/80 mt-1 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                Up to 85% bill cut
              </div>
            </div>

            <div className="bg-slate-950/80 border border-sky-500/30 p-4 rounded-xl relative overflow-hidden col-span-2 sm:col-span-1">
              <div className="text-[11px] font-semibold text-sky-400 tracking-wide uppercase">
                Roof Space Needed
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-['Space_Grotesk']">
                {roofAreaSqFt}{' '}
                <span className="text-sm font-semibold text-sky-400">sq.ft</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Shadow-free area
              </div>
            </div>
          </div>

          {/* Deep Financial & Ecological Breakdown */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Financial &amp; Ecological Projections (25 Years)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 pt-1">
              <div className="pt-2 sm:pt-0 sm:pr-4">
                <p className="text-xs text-slate-400">25-Year Net Savings</p>
                <p className="text-xl font-black text-emerald-400 font-['Space_Grotesk'] mt-0.5">
                  ₹{(twentyFiveYearSavings / 100000).toFixed(2)} Lakhs
                </p>
                <p className="text-[11px] text-slate-500 mt-1">Cumulative lifetime wealth preserved</p>
              </div>

              <div className="pt-2 sm:pt-0 sm:px-4">
                <p className="text-xs text-slate-400">Est. Payback Period</p>
                <p className="text-xl font-black text-amber-400 font-['Space_Grotesk'] mt-0.5">
                  ~{paybackPeriodYears} Years
                </p>
                <p className="text-[11px] text-slate-500 mt-1">Followed by 20+ years of free energy</p>
              </div>

              <div className="pt-2 sm:pt-0 sm:pl-4">
                <p className="text-xs text-slate-400">CO₂ Avoided / Year</p>
                <p className="text-xl font-black text-sky-400 font-['Space_Grotesk'] mt-0.5 flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  {co2OffsetTonsYear} Tons
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Equal to planting ~{treesPlantedEquivalent} trees/yr
                </p>
              </div>
            </div>

            {/* Checklist of what's included */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                Net-metering &amp; DISCOM approval handling
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                Tier-1 Bifacial modules &amp; smart inverter
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                HDG hot-dip galvanized mounting structure
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                Remote cloud generation monitoring app
              </span>
            </div>
          </div>

          {/* Action CTA & Mandatory Disclaimer */}
          <div className="space-y-3">
            <button
              onClick={handleBookInspection}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
            >
              <span>Book Free Site Inspection with this {recommendedCapacityKw} kWp Estimate</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>

            {/* Prominently requested disclaimer */}
            <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[11px] text-amber-200/90 leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Important Notice:</strong> Calculator results are indicative estimates based on standard regional solar insolation and utility tariff slabs. Exact generation, roof layout, structural load bearing, and sanctionable capacity require a complimentary on-site engineering audit by an AviAqua solar engineer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
