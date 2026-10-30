import React from 'react';
import { X, MapPin, Zap, CheckCircle2, Calendar, Building2, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (project: Project) => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  onInquire
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-left my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-950 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              <span>{project.category.replace('_', ' ')}</span>
              <span>·</span>
              <span>{project.clientType}</span>
              <span>·</span>
              <span>{project.year}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk'] leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Location</p>
              <p className="text-sm font-bold text-white flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                <span className="truncate">{project.location}</span>
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Capacity / Scale</p>
              <p className="text-sm font-bold text-amber-400 flex items-center gap-1 mt-0.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="truncate">{project.capacity}</span>
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Client Sector</p>
              <p className="text-sm font-bold text-sky-400 flex items-center gap-1 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <span className="truncate">{project.clientType} Facility</span>
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Engineering Scope &amp; Architecture
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technical Details & Impact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Measurable Environmental &amp; Financial Impact
            </h4>
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 leading-relaxed font-medium">
              🌱 {project.impact}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              {project.details}
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Close Details
            </button>

            <button
              onClick={() => {
                onClose();
                onInquire(project);
              }}
              className="px-5 py-2.5 rounded-lg text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Inquire About Similar Project</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
