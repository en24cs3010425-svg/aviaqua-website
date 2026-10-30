import { SiteSettings, Project, Testimonial } from '../types';

export const fallbackSettings: SiteSettings = {
  companyName: 'AviAqua Solutions',
  legalName: 'AviAqua CleanTech & Water Engineering Pvt. Ltd.',
  tagline: 'Powering a Sustainable Future with Smart Energy & Water Solutions',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  email: 'contact@aviaqua.com',
  supportEmail: 'support@aviaqua.com',
  address: 'Eco Park Tech Campus, Tower B, Suite 402, Green Corridor, Gurugram, India',
  workingHours: 'Mon - Sat: 8:30 AM - 7:30 PM (Emergency Support 24/7)',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14032.559384592882!2d77.07221375!3d28.44512965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18967be25807%3A0xe5a3c9e9b068c2aa!2sSector%2062%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000',
  heroHeadline: 'Powering a Sustainable Future with Smart Energy & Water Solutions.',
  heroSubtitle: 'Complete Solar Installation, Water Softening, and Smart Water Management Solutions for Homes, Businesses, and Industries.'
};

export const fallbackProjects: Project[] = [
  {
    id: 'proj-1',
    title: '120 kWp Commercial Rooftop Solar Array',
    category: 'solar',
    location: 'Cyber Hub Tech Park, Gurugram',
    clientType: 'Commercial',
    capacity: '120 kWp',
    impact: '82% Reduction in grid peak tariff, 142 Tons CO2 offset/year',
    description: 'Turnkey engineering, procurement, and construction of high-efficiency Bifacial Tier-1 solar modules with cloud telemetry.',
    details: 'Equipped with smart inverter synchronization, zero-export compliance relays, and automated robotic dry-cleaning for dust management.',
    image: '/src/assets/images/solar_installation_hero_1793343735977.jpg',
    featured: true,
    year: '2026'
  },
  {
    id: 'proj-2',
    title: 'Automated Central Softening Plant for Luxury High-Rise',
    category: 'water_softener',
    location: 'Prestige Lakeside Residences, Bengaluru',
    clientType: 'Residential',
    capacity: '75,000 Liters / Day',
    impact: 'Hardness reduced from 650 ppm to <25 ppm across 280 luxury apartments',
    description: 'Duplex resin tank continuous ion-exchange softening system with automated digital brine regeneration and turbine water meter.',
    details: 'Protected piping infrastructure, eliminated scale buildup in heat pumps and plumbing fixtures, saving ₹14 Lakhs annually in plumbing repairs.',
    image: '/src/assets/images/water_softener_system_1793343736394.jpg',
    featured: true,
    year: '2025'
  },
  {
    id: 'proj-3',
    title: 'Smart Industrial Wastewater Recycling & ZLD Facility',
    category: 'water_management',
    location: 'Greenfield Industrial Corridor, Ahmedabad',
    clientType: 'Industrial',
    capacity: '200 KLD (Kiloliters/day)',
    impact: '92% Fresh water recovery, zero liquid discharge to municipal sewers',
    description: 'Integrated Membrane Bioreactor (MBR) followed by secondary Ultrafiltration and RO polishing for industrial reuse.',
    details: 'Features SCADA telemetry for remote flow, TDS, and dissolved oxygen monitoring with automatic alerts to plant supervisors.',
    image: '/src/assets/images/water_management_plant_1793343736737.jpg',
    featured: true,
    year: '2026'
  },
  {
    id: 'proj-4',
    title: '15 kWp Hybrid Residential Solar with Lithium Backup',
    category: 'solar',
    location: 'Golf Links Villa Estates, New Delhi',
    clientType: 'Residential',
    capacity: '15 kWp + 20 kWh Battery',
    impact: 'Zero electricity bills for 10 months/year, seamless 24/7 power backup',
    description: 'Custom aesthetic black rooftop installation designed to match contemporary architectural aesthetics with smart app control.',
    details: 'Integrated battery management system powers entire home during grid blackouts with 5 millisecond switchover speed.',
    image: '/src/assets/images/aviaqua_hero_banner_1793343734879.jpg',
    featured: false,
    year: '2025'
  },
  {
    id: 'proj-5',
    title: 'Hotel Chain Commercial Softener & RO Water Purification',
    category: 'water_softener',
    location: 'Grand Orchid Suites & Spa, Jaipur',
    clientType: 'Commercial',
    capacity: '40,000 Liters / Day',
    impact: '40% reduction in laundry detergents, zero spots on glassware & cutlery',
    description: 'Heavy-duty food-grade resin water softening system with pre-sediment filtration for commercial kitchen, laundry, and guest suites.',
    details: 'Guaranteed soft water supply preventing water heater burnout and scaling across 150 luxury guest rooms.',
    image: '/src/assets/images/water_softener_system_1793343736394.jpg',
    featured: false,
    year: '2025'
  },
  {
    id: 'proj-6',
    title: 'Rainwater Harvesting & Ground Recharge Network',
    category: 'water_management',
    location: 'Oasis International University Campus, Pune',
    clientType: 'Commercial',
    capacity: '1.2 Crore Liters Harvested / Year',
    impact: 'Recharged 8 deep aquifer borewells, eliminated campus water shortages',
    description: 'Rooftop rainwater collection channels, automated first-flush diverters, multi-stage silt filtration pits, and aquifer injection wells.',
    details: 'Self-sustainable water recharge network ensuring high water table levels and zero stormwater waterlogging during monsoon.',
    image: '/src/assets/images/water_management_plant_1793343736737.jpg',
    featured: false,
    year: '2026'
  }
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ananya Singhania',
    role: 'Director of Infrastructure',
    companyOrLocation: 'Nexus Tech Parks',
    serviceCategory: 'solar',
    rating: 5,
    comment: 'AviAqua executed our 120kW rooftop solar plant ahead of schedule. The engineering precision, safety protocols, and real-time generation monitoring portal are world-class. Our energy bills plummeted by 75% immediately.',
    date: 'January 2026',
    verified: true
  },
  {
    id: 'test-2',
    name: 'Rohan Mehta',
    role: 'Homeowner & Environmentalist',
    companyOrLocation: 'Silver Oak Villas, Pune',
    serviceCategory: 'water_softener',
    rating: 5,
    comment: 'Living with 600 ppm hard water was destroying our hair, skin, and European bathroom fittings. AviAqua installed an automatic duplex water softener. Within 24 hours, the water felt silky smooth and zero white deposits ever since.',
    date: 'February 2026',
    verified: true
  },
  {
    id: 'test-3',
    name: 'Suresh Nambiar',
    role: 'Chief Operating Officer',
    companyOrLocation: 'Apex Specialty Chemicals',
    serviceCategory: 'water_management',
    rating: 5,
    comment: 'Their industrial wastewater treatment and recycling solution helped us achieve 90%+ water recovery and full regulatory zero-discharge compliance. Highly knowledgeable engineering team and fantastic ongoing maintenance support.',
    date: 'March 2026',
    verified: true
  },
  {
    id: 'test-4',
    name: 'Sunita & Gaurav Kapoor',
    role: 'Residential Customers',
    companyOrLocation: 'Vasant Vihar, New Delhi',
    serviceCategory: 'solar',
    rating: 5,
    comment: 'We got both our 10kW Solar rooftop system and the whole-house water softener from AviAqua. Having one dedicated reliable engineering team for both our clean power and clean water needs was the best decision we made!',
    date: 'October 2025',
    verified: true
  }
];
