import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Users,
  Briefcase,
  Star,
  Settings,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  Download,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Save,
  Eye,
  FileSpreadsheet
} from 'lucide-react';
import { Enquiry, Project, Testimonial, SiteSettings, AdminStats, EnquiryStatus, ServiceCategory } from '../types';
import { api } from '../api/client';

interface AdminDashboardProps {
  settings: SiteSettings;
  onSettingsUpdated: (newSettings: SiteSettings) => void;
  onProjectsUpdated: () => void;
  onTestimonialsUpdated: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  settings,
  onSettingsUpdated,
  onProjectsUpdated,
  onTestimonialsUpdated,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState('admin@aviaqua.com');
  const [loginPass, setLoginPass] = useState('aviaqua2026!');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'projects' | 'testimonials' | 'settings'>('overview');

  // Data states
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Enquiry filters
  const [enquiryCategoryFilter, setEnquiryCategoryFilter] = useState<string>('all');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>('all');
  const [enquirySearch, setEnquirySearch] = useState('');
  const [selectedEnquiryDetail, setSelectedEnquiryDetail] = useState<Enquiry | null>(null);

  // Project modal / form
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'solar' as 'solar' | 'water_softener' | 'water_management',
    location: '',
    clientType: 'Commercial' as 'Residential' | 'Commercial' | 'Industrial',
    capacity: '',
    impact: '',
    description: '',
    details: '',
    image: '/src/assets/images/solar_installation_hero_1793343735977.jpg',
    featured: true,
    year: '2026'
  });

  // Testimonial form modal
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    companyOrLocation: '',
    serviceCategory: 'solar' as 'solar' | 'water_softener' | 'water_management',
    rating: 5,
    comment: ''
  });

  // Settings form
  const [settingsForm, setSettingsForm] = useState<SiteSettings>({ ...settings });
  const [settingsSaveSuccess, setSettingsSaveSuccess] = useState(false);

  // Check existing session
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setAuthLoading(true);
    const valid = await api.verifyAdmin();
    setIsAuthenticated(valid);
    if (valid) {
      loadDashboardData();
    }
    setAuthLoading(false);
  };

  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      const [statsData, enqData, projData, testData] = await Promise.all([
        api.getAdminStats().catch(() => null),
        api.getEnquiries(),
        api.getProjects(),
        api.getTestimonials()
      ]);
      if (statsData) setStats(statsData);
      setEnquiries(enqData || []);
      setProjectsList(projData || []);
      setTestimonialsList(testData || []);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      await api.adminLogin(loginEmail, loginPass);
      setIsAuthenticated(true);
      loadDashboardData();
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please check credentials.');
    }
  };

  const handleLogout = () => {
    api.clearToken();
    setIsAuthenticated(false);
  };

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    try {
      await api.updateEnquiryStatus(enquiryId, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus as EnquiryStatus } : e))
      );
      if (stats) {
        loadDashboardData();
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDeleteEnquiry = async (enquiryId: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await api.deleteEnquiry(enquiryId);
      setEnquiries((prev) => prev.filter((e) => e.id !== enquiryId));
      if (selectedEnquiryDetail?.id === enquiryId) setSelectedEnquiryDetail(null);
      loadDashboardData();
    } catch (err) {
      alert('Failed to delete enquiry');
    }
  };

  const handleExportCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ['ID', 'Date', 'Full Name', 'Phone', 'Email', 'City', 'Service', 'Property Type', 'Status', 'Message'];
    const rows = enquiries.map((e) => [
      e.id,
      new Date(e.createdAt).toLocaleString(),
      `"${e.fullName}"`,
      `"${e.phone}"`,
      `"${e.email || ''}"`,
      `"${e.city}"`,
      e.service,
      `"${e.propertyType || ''}"`,
      e.status,
      `"${(e.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aviaqua_customer_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save Project (Add / Edit)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await api.updateProject(editingProject.id, projectForm);
      } else {
        await api.createProject(projectForm);
      }
      setIsProjectModalOpen(false);
      setEditingProject(null);
      loadDashboardData();
      onProjectsUpdated();
    } catch (err) {
      alert('Failed to save project');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Delete this project case study?')) return;
    try {
      await api.deleteProject(id);
      loadDashboardData();
      onProjectsUpdated();
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  // Save Testimonial
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createTestimonial(testimonialForm);
      setIsTestimonialModalOpen(false);
      loadDashboardData();
      onTestimonialsUpdated();
    } catch (err) {
      alert('Failed to add testimonial');
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.deleteTestimonial(id);
      loadDashboardData();
      onTestimonialsUpdated();
    } catch (err) {
      alert('Failed to delete testimonial');
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await api.updateSettings(settingsForm);
      onSettingsUpdated(updated);
      setSettingsSaveSuccess(true);
      setTimeout(() => setSettingsSaveSuccess(false), 4000);
    } catch (err) {
      alert('Failed to update website settings');
    }
  };

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesCat = enquiryCategoryFilter === 'all' || e.service === enquiryCategoryFilter;
    const matchesStatus = enquiryStatusFilter === 'all' || e.status === enquiryStatusFilter;
    const q = enquirySearch.toLowerCase();
    const matchesSearch =
      !enquirySearch ||
      e.fullName.toLowerCase().includes(q) ||
      e.phone.toLowerCase().includes(q) ||
      (e.email && e.email.toLowerCase().includes(q)) ||
      e.city.toLowerCase().includes(q) ||
      (e.message && e.message.toLowerCase().includes(q));
    return matchesCat && matchesStatus && matchesSearch;
  });

  // Login view if not authenticated
  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-amber-400" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative text-left">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-400/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white text-center font-['Space_Grotesk']">
            AviAqua Admin Portal
          </h2>
          <p className="text-xs text-slate-400 text-center mt-1">
            Sign in to manage customer leads, case studies, reviews &amp; company settings.
          </p>

          {loginError && (
            <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-amber-500/20"
            >
              Authenticate &amp; Enter Dashboard
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-400 mb-2">Preset Demo Credentials:</p>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-amber-300 space-y-0.5">
              <p>Email: admin@aviaqua.com</p>
              <p>Password: aviaqua2026!</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setLoginEmail('admin@aviaqua.com');
                setLoginPass('aviaqua2026!');
              }}
              className="mt-2 text-xs text-sky-400 hover:text-sky-300 underline cursor-pointer"
            >
              Fill Demo Credentials
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>AviAqua Management System</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
            Operations &amp; Enquiries Hub
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Logged in as <span className="text-white font-semibold">admin@aviaqua.com</span> (Super Admin)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDashboardData}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 text-rose-400 hover:text-rose-300 transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">
        {[
          { id: 'overview', label: 'Executive Overview', icon: TrendingUp },
          { id: 'enquiries', label: `Customer Enquiries (${enquiries.length})`, icon: Users },
          { id: 'projects', label: `Projects Portfolio (${projectsList.length})`, icon: Briefcase },
          { id: 'testimonials', label: `Testimonials (${testimonialsList.length})`, icon: Star },
          { id: 'settings', label: 'Website Content Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Enquiries</span>
              <p className="text-3xl font-extrabold text-white mt-1 font-['Space_Grotesk']">{enquiries.length}</p>
              <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Leads logged
              </p>
            </div>

            <div className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl">
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">New Actionable Leads</span>
              <p className="text-3xl font-extrabold text-amber-400 mt-1 font-['Space_Grotesk']">
                {enquiries.filter(e => e.status === 'new').length}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Awaiting first contact call</p>
            </div>

            <div className="bg-slate-900 border border-sky-500/30 p-5 rounded-2xl">
              <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">In Progress / Feasibility</span>
              <p className="text-3xl font-extrabold text-sky-400 mt-1 font-['Space_Grotesk']">
                {enquiries.filter(e => e.status === 'in_progress' || e.status === 'contacted').length}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Audit or proposal underway</p>
            </div>

            <div className="bg-slate-900 border border-emerald-500/30 p-5 rounded-2xl">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Completed / Commissioned</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-1 font-['Space_Grotesk']">
                {enquiries.filter(e => e.status === 'completed').length}
              </p>
              <p className="text-[11px] text-emerald-400/80 mt-1">Installed &amp; operational</p>
            </div>
          </div>

          {/* Division Breakdown Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                Leads by Engineering Division
              </h3>

              <div className="space-y-3">
                {[
                  {
                    name: 'Solar Installation Business',
                    count: enquiries.filter(e => e.service === 'solar').length,
                    color: 'bg-amber-400',
                    text: 'text-amber-400'
                  },
                  {
                    name: 'Water Softener Business',
                    count: enquiries.filter(e => e.service === 'water_softener').length,
                    color: 'bg-sky-400',
                    text: 'text-sky-400'
                  },
                  {
                    name: 'Water Management Solutions',
                    count: enquiries.filter(e => e.service === 'water_management').length,
                    color: 'bg-emerald-400',
                    text: 'text-emerald-400'
                  },
                  {
                    name: 'General Inquiries',
                    count: enquiries.filter(e => e.service === 'general').length,
                    color: 'bg-slate-400',
                    text: 'text-slate-400'
                  }
                ].map((item, idx) => {
                  const pct = enquiries.length > 0 ? Math.round((item.count / enquiries.length) * 100) : 0;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">{item.name}</span>
                        <span className={`font-bold ${item.text}`}>{item.count} leads ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                  Recent High-Priority Enquiries
                </h3>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="space-y-2.5">
                {enquiries.slice(0, 4).map((enq) => (
                  <div
                    key={enq.id}
                    onClick={() => {
                      setSelectedEnquiryDetail(enq);
                      setActiveTab('enquiries');
                    }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{enq.fullName}</span>
                        <span className="text-[10px] text-amber-400 uppercase font-semibold">
                          {enq.service.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{enq.city} · {enq.phone}</p>
                    </div>

                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                      enq.status === 'new' ? 'bg-amber-400/10 text-amber-400 border-amber-400/30' :
                      enq.status === 'in_progress' ? 'bg-sky-400/10 text-sky-400 border-sky-400/30' :
                      enq.status === 'completed' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30' :
                      'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {enq.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ENQUIRIES MANAGEMENT TAB */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6 animate-fade-in">
          {/* Filter Bar & Export */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Category Filter */}
              <select
                value={enquiryCategoryFilter}
                onChange={(e) => setEnquiryCategoryFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Service Categories</option>
                <option value="solar">Solar Installation</option>
                <option value="water_softener">Water Softener</option>
                <option value="water_management">Water Management</option>
                <option value="general">General</option>
              </select>

              {/* Status Filter */}
              <select
                value={enquiryStatusFilter}
                onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search lead by name, phone, city..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              onClick={handleExportCSV}
              className="w-full md:w-auto px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 transition-colors text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Enquiries Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Lead / Customer</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Received</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-slate-500">
                        No customer enquiries match your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredEnquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-white text-sm">{enq.fullName}</p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-amber-400" />
                              {enq.phone}
                            </span>
                            {enq.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-sky-400" />
                                {enq.email}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`font-semibold capitalize ${
                            enq.service === 'solar' ? 'text-amber-400' :
                            enq.service === 'water_softener' ? 'text-sky-400' :
                            'text-emerald-400'
                          }`}>
                            {enq.service.replace('_', ' ')}
                          </span>
                          {enq.propertyType && (
                            <p className="text-[10px] text-slate-400 capitalize">{enq.propertyType}</p>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-slate-300">
                          {enq.city}
                        </td>

                        <td className="py-3.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                          {new Date(enq.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={enq.status}
                            onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                            className={`text-xs font-semibold rounded-lg px-2 py-1 border focus:outline-none cursor-pointer ${
                              enq.status === 'new' ? 'bg-amber-400/10 text-amber-300 border-amber-400/40' :
                              enq.status === 'contacted' ? 'bg-purple-400/10 text-purple-300 border-purple-400/40' :
                              enq.status === 'in_progress' ? 'bg-sky-400/10 text-sky-300 border-sky-400/40' :
                              'bg-emerald-400/10 text-emerald-300 border-emerald-400/40'
                            }`}
                          >
                            <option value="new" className="bg-slate-900 text-white">New</option>
                            <option value="contacted" className="bg-slate-900 text-white">Contacted</option>
                            <option value="in_progress" className="bg-slate-900 text-white">In Progress</option>
                            <option value="completed" className="bg-slate-900 text-white">Completed</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedEnquiryDetail(enq)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="View Message & Sizing Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteEnquiry(enq.id)}
                            className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Details Modal */}
          {selectedEnquiryDetail && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedEnquiryDetail.fullName}</h3>
                    <p className="text-xs text-slate-400">Reference: {selectedEnquiryDetail.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedEnquiryDetail(null)}
                    className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded bg-slate-800"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 font-semibold block">Phone</span>
                      <a href={`tel:${selectedEnquiryDetail.phone}`} className="text-amber-400 font-bold hover:underline">
                        {selectedEnquiryDetail.phone}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">Email</span>
                      <span className="text-white">{selectedEnquiryDetail.email || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">City</span>
                      <span className="text-white">{selectedEnquiryDetail.city}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">Service Category</span>
                      <span className="text-amber-400 font-bold uppercase">{selectedEnquiryDetail.service}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Customer Message &amp; Notes:</span>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 leading-relaxed">
                      {selectedEnquiryDetail.message || 'No additional note provided.'}
                    </div>
                  </div>

                  {selectedEnquiryDetail.metadata && Object.keys(selectedEnquiryDetail.metadata).length > 0 && (
                    <div>
                      <span className="text-slate-400 font-semibold block mb-1">Calculation &amp; Technical Parameters:</span>
                      <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-amber-300 overflow-x-auto">
                        {JSON.stringify(selectedEnquiryDetail.metadata, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <a
                    href={`https://wa.me/${selectedEnquiryDetail.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5"
                  >
                    Chat on WhatsApp
                  </a>

                  <button
                    onClick={() => setSelectedEnquiryDetail(null)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. PROJECTS MANAGEMENT TAB */}
      {activeTab === 'projects' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                Case Studies &amp; Projects Portfolio
              </h3>
              <p className="text-xs text-slate-400">
                Add, edit, and update the case studies showcased on the public website.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingProject(null);
                setProjectForm({
                  title: '',
                  category: 'solar',
                  location: '',
                  clientType: 'Commercial',
                  capacity: '',
                  impact: '',
                  description: '',
                  details: '',
                  image: '/src/assets/images/solar_installation_hero_1793343735977.jpg',
                  featured: true,
                  year: new Date().getFullYear().toString()
                });
                setIsProjectModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsList.map((p) => (
              <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] text-amber-400 font-bold uppercase">
                    {p.category.replace('_', ' ')}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{p.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{p.location} · {p.capacity}</p>
                    <p className="text-xs text-emerald-400 mt-2 font-medium line-clamp-1">✓ {p.impact}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setEditingProject(p);
                        setProjectForm({
                          title: p.title,
                          category: p.category,
                          location: p.location,
                          clientType: p.clientType,
                          capacity: p.capacity,
                          impact: p.impact,
                          description: p.description,
                          details: p.details,
                          image: p.image,
                          featured: p.featured,
                          year: p.year
                        });
                        setIsProjectModalOpen(true);
                      }}
                      className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add / Edit Project Modal */}
          {isProjectModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
              <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative text-left my-8">
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] mb-4">
                  {editingProject ? 'Edit Project Case Study' : 'Add New Project'}
                </h3>

                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="solar">Solar Installation</option>
                        <option value="water_softener">Water Softener</option>
                        <option value="water_management">Water Management</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Location</label>
                      <input
                        type="text"
                        required
                        value={projectForm.location}
                        onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Client Sector</label>
                      <select
                        value={projectForm.clientType}
                        onChange={(e) => setProjectForm({ ...projectForm, clientType: e.target.value as any })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Industrial">Industrial</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Capacity / Sizing</label>
                      <input
                        type="text"
                        placeholder="e.g. 100 kWp"
                        value={projectForm.capacity}
                        onChange={(e) => setProjectForm({ ...projectForm, capacity: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Year</label>
                      <input
                        type="text"
                        value={projectForm.year}
                        onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Key Impact Achieved</label>
                    <input
                      type="text"
                      placeholder="e.g. 85% bill savings, zero limescale"
                      value={projectForm.impact}
                      onChange={(e) => setProjectForm({ ...projectForm, impact: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Image URL / Path</label>
                    <input
                      type="text"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsProjectModalOpen(false)}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold cursor-pointer"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. TESTIMONIALS MANAGEMENT TAB */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                Customer Testimonials
              </h3>
              <p className="text-xs text-slate-400">
                Manage verified client ratings and endorsements shown on the homepage.
              </p>
            </div>

            <button
              onClick={() => setIsTestimonialModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonialsList.map((t) => (
              <div key={t.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500">{t.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">"{t.comment}"</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">{t.name}</h5>
                    <p className="text-[11px] text-slate-400">{t.role} · {t.companyOrLocation}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteTestimonial(t.id)}
                    className="p-1.5 rounded-lg bg-slate-950 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Testimonial Modal */}
          {isTestimonialModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative text-left">
                <h3 className="text-lg font-bold text-white mb-4">Add Client Testimonial</h3>
                <form onSubmit={handleSaveTestimonial} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Client Name *</label>
                      <input
                        type="text"
                        required
                        value={testimonialForm.name}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Role / Designation</label>
                      <input
                        type="text"
                        placeholder="e.g. Homeowner / Director"
                        value={testimonialForm.role}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Company / City</label>
                      <input
                        type="text"
                        value={testimonialForm.companyOrLocation}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, companyOrLocation: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Rating (Stars)</label>
                      <select
                        value={testimonialForm.rating}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Review Comments *</label>
                    <textarea
                      rows={3}
                      required
                      value={testimonialForm.comment}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, comment: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsTestimonialModalOpen(false)}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs"
                    >
                      Publish Testimonial
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. WEBSITE CONTENT SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="space-y-6 animate-fade-in max-w-4xl">
          <div>
            <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
              Website Information &amp; Contact Settings
            </h3>
            <p className="text-xs text-slate-400">
              Update company phone numbers, address, email, and hero headlines in real-time across the platform.
            </p>
          </div>

          {settingsSaveSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings saved successfully and updated live on the website!</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Company Display Name</label>
                <input
                  type="text"
                  value={settingsForm.companyName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Primary Phone Number</label>
                <input
                  type="text"
                  value={settingsForm.phone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={settingsForm.whatsapp}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Primary Email Address</label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Corporate Physical Address</label>
              <input
                type="text"
                value={settingsForm.address}
                onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Homepage Main Heading</label>
              <input
                type="text"
                value={settingsForm.heroHeadline}
                onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Homepage Subtitle</label>
              <textarea
                rows={2}
                value={settingsForm.heroSubtitle}
                onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Website Changes</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
