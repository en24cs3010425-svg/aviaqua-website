import React, { useState } from 'react';
import {
  Sun,
  Droplets,
  Leaf,
  MapPin,
  Zap,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Building
} from 'lucide-react';
import { Project, ServiceCategory } from '../types';

interface ProjectsPageProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenQuoteModal: (service?: 'solar' | 'water_softener' | 'water_management') => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  onSelectProject,
  onOpenQuoteModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'solar' | 'water_softener' | 'water_management'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/solar_installation_hero_1793343735977.jpg"
            alt="AviAqua Project Engineering Showcase"
            className="w-full h-full object-cover object-center filter brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-sky-400">
              <Building className="w-3.5 h-3.5" />
              <span>Commissioned EPC &amp; Water Plants</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white font-['Space_Grotesk'] leading-tight">
              Projects &amp; Engineering Portfolio
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Explore verified case studies spanning commercial rooftop solar arrays, automated whole-villa water softeners, and municipal-scale industrial water recycling systems.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto w-full md:w-auto">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'solar', label: 'Solar Installation' },
              { id: 'water_softener', label: 'Water Softeners' },
              { id: 'water_management', label: 'Water Management' }
            ].map((tab) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by city, capacity, client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
            />
          </div>
        </div>
      </section>

      {/* 3. Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-slate-400 text-sm">No projects found matching your search criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 bg-slate-800 text-xs text-white rounded-lg hover:bg-slate-700 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => {
              const isSolar = proj.category === 'solar';
              const isSoftener = proj.category === 'water_softener';
              const badgeColor = isSolar ? 'text-amber-400' : isSoftener ? 'text-sky-400' : 'text-emerald-400';
              const borderColor = isSolar ? 'hover:border-amber-400/50' : isSoftener ? 'hover:border-sky-400/50' : 'hover:border-emerald-400/50';

              return (
                <div
                  key={proj.id}
                  className={`bg-slate-900 border border-slate-800 ${borderColor} rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-xl`}
                >
                  {/* Image header */}
                  <div className="relative h-52 overflow-hidden bg-slate-950">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider text-slate-200 border border-slate-800">
                      <span className={badgeColor}>{proj.category.replace('_', ' ')}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center justify-between border border-slate-800">
                      <span className={`font-bold ${badgeColor}`}>{proj.capacity}</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {proj.location}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 font-semibold mb-1 flex items-center gap-2">
                        <span>{proj.clientType} Sector</span>
                        <span>·</span>
                        <span>Commissioned {proj.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] group-hover:text-amber-400 transition-colors leading-snug">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                        {proj.description}
                      </p>

                      <div className="mt-4 p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 text-xs text-emerald-400 font-medium">
                        ✓ {proj.impact}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => onSelectProject(proj)}
                        className="text-xs font-bold text-white hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Project Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenQuoteModal(proj.category as any)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-amber-400 hover:text-slate-950 transition-colors cursor-pointer"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
            Have a Specific Architectural or Industrial Project in Mind?
          </h3>
          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            Our engineering team conducts tailored CAD layouts, hydraulic flow modeling, and financial payback projections.
          </p>
          <div className="mt-6">
            <button
              onClick={() => onOpenQuoteModal()}
              className="py-3 px-8 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors text-sm cursor-pointer shadow-lg"
            >
              Submit Your Project RFP / Sizing Request
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
