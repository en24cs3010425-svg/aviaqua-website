export type PageId =
  | 'home'
  | 'solar'
  | 'water_softener'
  | 'water_management'
  | 'about'
  | 'projects'
  | 'contact'
  | 'admin';

export type ServiceCategory = 'solar' | 'water_softener' | 'water_management' | 'general';

export type EnquiryStatus = 'new' | 'contacted' | 'in_progress' | 'completed';

export interface Enquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  service: ServiceCategory;
  propertyType?: string;
  status: EnquiryStatus;
  message: string;
  metadata?: {
    solarCapacity?: string;
    monthlyBill?: number;
    waterUsage?: string;
    hardnessLevel?: string;
    propertyType?: string;
    estimatedSavings?: string;
    estimatedCost?: string;
    preferredDate?: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'solar' | 'water_softener' | 'water_management';
  location: string;
  clientType: 'Residential' | 'Commercial' | 'Industrial';
  capacity: string;
  impact: string;
  description: string;
  details: string;
  image: string;
  featured: boolean;
  year: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyOrLocation: string;
  serviceCategory: 'solar' | 'water_softener' | 'water_management';
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface SiteSettings {
  companyName: string;
  legalName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  supportEmail: string;
  address: string;
  workingHours: string;
  googleMapsEmbedUrl: string;
  heroHeadline: string;
  heroSubtitle: string;
}

export interface AdminStats {
  total: number;
  byStatus: {
    new: number;
    contacted: number;
    in_progress: number;
    completed: number;
  };
  byCategory: {
    solar: number;
    water_softener: number;
    water_management: number;
    general: number;
  };
  projectsCount: number;
  testimonialsCount: number;
  subscribersCount: number;
}

export interface SolarCalculationResult {
  recommendedCapacityKw: number;
  panelsCount: number;
  roofAreaSqFt: number;
  annualGenerationKwh: number;
  monthlySavings: number;
  twentyFiveYearSavings: number;
  co2OffsetTonsYear: number;
  treesPlantedEquivalent: number;
  paybackPeriodYears: number;
  indicativeSystemCost: number;
}
