import React, { useState, useEffect } from 'react';
import { PageId, SiteSettings, Project, Testimonial, ServiceCategory } from './types';
import { fallbackSettings, fallbackProjects, fallbackTestimonials } from './data/initialData';
import { api } from './api/client';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { QuoteModal } from './components/QuoteModal';
import { ProjectDetailsModal } from './components/ProjectDetailsModal';
import { LegalModals } from './components/LegalModals';

import { HomePage } from './pages/HomePage';
import { SolarPage } from './pages/SolarPage';
import { WaterSoftenerPage } from './pages/WaterSoftenerPage';
import { WaterManagementPage } from './pages/WaterManagementPage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);

  // Modals state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteModalService, setQuoteModalService] = useState<ServiceCategory>('solar');
  const [quoteModalInitialData, setQuoteModalInitialData] = useState<any>(null);

  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Initial data loading
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [fetchedSettings, fetchedProjects, fetchedTestimonials] = await Promise.all([
        api.getSettings(),
        api.getProjects(),
        api.getTestimonials()
      ]);
      if (fetchedSettings) setSettings(fetchedSettings);
      if (fetchedProjects && fetchedProjects.length > 0) setProjects(fetchedProjects);
      if (fetchedTestimonials && fetchedTestimonials.length > 0) setTestimonials(fetchedTestimonials);
    } catch (err) {
      console.warn('Initial data load error:', err);
    }
  };

  const handleOpenQuoteModal = (service: ServiceCategory = 'solar', initialData?: any) => {
    setQuoteModalService(service);
    setQuoteModalInitialData(initialData || null);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-amber-400 selection:text-slate-950">
      {/* Sticky Header Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        settings={settings}
        onOpenQuoteModal={() => handleOpenQuoteModal('solar')}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            settings={settings}
            projects={projects}
            testimonials={testimonials}
            setCurrentPage={setCurrentPage}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSelectProject={(proj) => setSelectedProjectForModal(proj)}
          />
        )}

        {currentPage === 'solar' && (
          <SolarPage onOpenQuoteModal={handleOpenQuoteModal} />
        )}

        {currentPage === 'water_softener' && (
          <WaterSoftenerPage onOpenQuoteModal={handleOpenQuoteModal} />
        )}

        {currentPage === 'water_management' && (
          <WaterManagementPage onOpenQuoteModal={handleOpenQuoteModal} />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage
            projects={projects}
            onSelectProject={(proj) => setSelectedProjectForModal(proj)}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            settings={settings}
            onOpenQuoteModal={() => handleOpenQuoteModal('solar')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            settings={settings}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard
            settings={settings}
            onSettingsUpdated={(newSettings) => setSettings(newSettings)}
            onProjectsUpdated={async () => {
              const fresh = await api.getProjects();
              setProjects(fresh);
            }}
            onTestimonialsUpdated={async () => {
              const fresh = await api.getTestimonials();
              setTestimonials(fresh);
            }}
          />
        )}
      </main>

      {/* Corporate Footer */}
      <Footer
        settings={settings}
        setCurrentPage={setCurrentPage}
        onOpenPrivacyModal={() => setLegalModalType('privacy')}
        onOpenTermsModal={() => setLegalModalType('terms')}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Floating Action Buttons */}
      <FloatingActions
        settings={settings}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Global Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultService={quoteModalService}
        initialData={quoteModalInitialData}
      />

      <ProjectDetailsModal
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
        onInquire={(proj) => {
          setSelectedProjectForModal(null);
          handleOpenQuoteModal(proj.category as ServiceCategory, { projectTitle: proj.title });
        }}
      />

      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
