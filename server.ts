import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;
const DB_FILE = path.resolve(__dirname, 'data', 'db.json');

// Ensure data folder exists
if (!fs.existsSync(path.resolve(__dirname, 'data'))) {
  fs.mkdirSync(path.resolve(__dirname, 'data'), { recursive: true });
}

// Initial seed data
const initialDb = {
  settings: {
    companyName: 'AviAqua Solutions',
    legalName: 'AviAqua CleanTech & Water Engineering Ltd.',
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
  },
  enquiries: [
    {
      id: 'enq-101',
      fullName: 'Vikramaditya Sharma',
      phone: '+91 98112 34567',
      email: 'vikram.sharma@horizonbuilders.com',
      city: 'Gurugram',
      service: 'solar',
      propertyType: 'commercial',
      status: 'new',
      message: 'Looking for a 60kW rooftop on-grid solar plant for our corporate office building to offset high peak-hour AC bills.',
      metadata: {
        solarCapacity: '60 kWp',
        monthlyBill: 240000,
        propertyType: 'Commercial Office'
      },
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: 'enq-102',
      fullName: 'Pooja Deshmukh',
      phone: '+91 99201 88765',
      email: 'pooja.deshmukh@gmail.com',
      city: 'Pune',
      service: 'water_softener',
      propertyType: 'residential',
      status: 'contacted',
      message: 'Extreme white scaling on all bathroom taps, shower heads and geyser coils. Need whole villa automated water softener.',
      metadata: {
        waterUsage: '1,200 L/day',
        hardnessLevel: '580 ppm (Very Hard)',
        propertyType: '4 BHK Independent Villa'
      },
      createdAt: new Date(Date.now() - 3600000 * 20).toISOString()
    },
    {
      id: 'enq-103',
      fullName: 'Dr. Rajiv Menon',
      phone: '+91 94471 22345',
      email: 'operations@keralamedicalcenter.org',
      city: 'Kochi',
      service: 'water_management',
      propertyType: 'commercial',
      status: 'in_progress',
      message: 'Hospital facility requires comprehensive greywater treatment, STP zero-liquid discharge, and rooftop rainwater harvesting recharge wells.',
      metadata: {
        waterUsage: '45,000 L/day',
        propertyType: 'Multi-specialty Hospital'
      },
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
    },
    {
      id: 'enq-104',
      fullName: 'Rajesh Kulkarni',
      phone: '+91 97654 32190',
      email: 'rajesh.k@apextextiles.in',
      city: 'Surat',
      service: 'solar',
      propertyType: 'industrial',
      status: 'completed',
      message: 'Installed 150 kWp Industrial shed solar system. Commissioned smoothly with net-metering approval.',
      metadata: {
        solarCapacity: '150 kWp',
        monthlyBill: 620000
      },
      createdAt: new Date(Date.now() - 3600000 * 96).toISOString()
    }
  ],
  projects: [
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
  ],
  testimonials: [
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
  ],
  newsletter: []
};

// Database read/write helpers
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading db:', err);
    return initialDb;
  }
}

function writeDb(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing db:', err);
  }
}

// Initialize database on boot
readDb();

async function startServer() {
  const app = express();
  app.use(express.json());

  // Simple token-based admin auth
  const ADMIN_EMAIL = 'admin@aviaqua.com';
  const ADMIN_PASS = 'aviaqua2026!';
  const VALID_TOKEN = 'aviaqua-secure-session-token-2026';

  function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.replace('Bearer ', '') === VALID_TOKEN) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized. Invalid admin session.' });
    }
  }

  // --- API Endpoints ---

  // Admin login
  app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      return res.json({
        success: true,
        token: VALID_TOKEN,
        user: {
          email: ADMIN_EMAIL,
          role: 'Super Admin',
          name: 'AviAqua Administrator'
        }
      });
    }
    return res.status(401).json({ error: 'Invalid email or password. Please check your credentials.' });
  });

  // Verify Admin Token
  app.get('/api/admin/verify', requireAdmin, (req, res) => {
    res.json({ valid: true, user: { email: ADMIN_EMAIL, role: 'Super Admin', name: 'AviAqua Administrator' } });
  });

  // Public: Get site settings
  app.get('/api/settings', (req, res) => {
    const db = readDb();
    res.json(db.settings);
  });

  // Admin: Update site settings
  app.put('/api/settings', requireAdmin, (req, res) => {
    const db = readDb();
    db.settings = { ...db.settings, ...req.body };
    writeDb(db);
    res.json({ success: true, settings: db.settings });
  });

  // Public & Admin: Get projects
  app.get('/api/projects', (req, res) => {
    const db = readDb();
    const category = req.query.category as string;
    let projects = db.projects || [];
    if (category && category !== 'all') {
      projects = projects.filter((p: any) => p.category === category);
    }
    res.json(projects);
  });

  // Admin: Add project
  app.post('/api/projects', requireAdmin, (req, res) => {
    const db = readDb();
    const newProject = {
      id: 'proj-' + Date.now(),
      title: req.body.title || 'Untitled Project',
      category: req.body.category || 'solar',
      location: req.body.location || 'Gurugram, India',
      clientType: req.body.clientType || 'Commercial',
      capacity: req.body.capacity || '',
      impact: req.body.impact || '',
      description: req.body.description || '',
      details: req.body.details || '',
      image: req.body.image || '/src/assets/images/solar_installation_hero_1793343735977.jpg',
      featured: Boolean(req.body.featured),
      year: req.body.year || new Date().getFullYear().toString()
    };
    db.projects.unshift(newProject);
    writeDb(db);
    res.status(201).json(newProject);
  });

  // Admin: Update project
  app.put('/api/projects/:id', requireAdmin, (req, res) => {
    const db = readDb();
    const index = db.projects.findIndex((p: any) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    db.projects[index] = { ...db.projects[index], ...req.body };
    writeDb(db);
    res.json(db.projects[index]);
  });

  // Admin: Delete project
  app.delete('/api/projects/:id', requireAdmin, (req, res) => {
    const db = readDb();
    db.projects = db.projects.filter((p: any) => p.id !== req.params.id);
    writeDb(db);
    res.json({ success: true, message: 'Project deleted' });
  });

  // Public: Get testimonials
  app.get('/api/testimonials', (req, res) => {
    const db = readDb();
    res.json(db.testimonials || []);
  });

  // Admin: Add testimonial
  app.post('/api/testimonials', requireAdmin, (req, res) => {
    const db = readDb();
    const newTestimonial = {
      id: 'test-' + Date.now(),
      name: req.body.name || 'Anonymous Client',
      role: req.body.role || 'Homeowner',
      companyOrLocation: req.body.companyOrLocation || 'New Delhi',
      serviceCategory: req.body.serviceCategory || 'solar',
      rating: Number(req.body.rating) || 5,
      comment: req.body.comment || '',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      verified: true
    };
    db.testimonials.unshift(newTestimonial);
    writeDb(db);
    res.status(201).json(newTestimonial);
  });

  // Admin: Delete testimonial
  app.delete('/api/testimonials/:id', requireAdmin, (req, res) => {
    const db = readDb();
    db.testimonials = db.testimonials.filter((t: any) => t.id !== req.params.id);
    writeDb(db);
    res.json({ success: true, message: 'Testimonial removed' });
  });

  // Public: Submit Customer Enquiry (General, Solar inspection, Softener, Water Mgmt)
  app.post('/api/enquiries', (req, res) => {
    const { fullName, phone, email, city, service, propertyType, message, metadata } = req.body;
    if (!fullName || !phone) {
      return res.status(400).json({ error: 'Name and phone number are required.' });
    }

    const db = readDb();
    const newEnquiry = {
      id: 'enq-' + Date.now(),
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : '',
      city: city ? String(city).trim() : 'Unspecified',
      service: service || 'general',
      propertyType: propertyType || 'residential',
      status: 'new',
      message: message ? String(message).trim() : 'Online enquiry received from website',
      metadata: metadata || {},
      createdAt: new Date().toISOString()
    };

    if (!Array.isArray(db.enquiries)) {
      db.enquiries = [];
    }
    db.enquiries.unshift(newEnquiry);
    writeDb(db);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our expert engineering consultant will contact you within 2 hours.',
      enquiryId: newEnquiry.id
    });
  });

  // Admin: Get all enquiries with optional filters
  app.get('/api/enquiries', requireAdmin, (req, res) => {
    const db = readDb();
    let enquiries = db.enquiries || [];
    const { category, status, search } = req.query;

    if (category && category !== 'all') {
      enquiries = enquiries.filter((e: any) => e.service === category);
    }
    if (status && status !== 'all') {
      enquiries = enquiries.filter((e: any) => e.status === status);
    }
    if (search) {
      const q = String(search).toLowerCase();
      enquiries = enquiries.filter((e: any) =>
        e.fullName?.toLowerCase().includes(q) ||
        e.phone?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.city?.toLowerCase().includes(q) ||
        e.message?.toLowerCase().includes(q)
      );
    }

    res.json(enquiries);
  });

  // Admin: Update enquiry status
  app.patch('/api/enquiries/:id/status', requireAdmin, (req, res) => {
    const { status } = req.body;
    const validStatuses = ['new', 'contacted', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const db = readDb();
    const enquiry = db.enquiries.find((e: any) => e.id === req.params.id);
    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    enquiry.status = status;
    enquiry.updatedAt = new Date().toISOString();
    writeDb(db);
    res.json({ success: true, enquiry });
  });

  // Admin: Delete enquiry
  app.delete('/api/enquiries/:id', requireAdmin, (req, res) => {
    const db = readDb();
    db.enquiries = db.enquiries.filter((e: any) => e.id !== req.params.id);
    writeDb(db);
    res.json({ success: true, message: 'Enquiry deleted' });
  });

  // Admin: Statistics summary
  app.get('/api/admin/stats', requireAdmin, (req, res) => {
    const db = readDb();
    const enquiries = db.enquiries || [];

    const total = enquiries.length;
    const newCount = enquiries.filter((e: any) => e.status === 'new').length;
    const contactedCount = enquiries.filter((e: any) => e.status === 'contacted').length;
    const inProgressCount = enquiries.filter((e: any) => e.status === 'in_progress').length;
    const completedCount = enquiries.filter((e: any) => e.status === 'completed').length;

    const solarCount = enquiries.filter((e: any) => e.service === 'solar').length;
    const softenerCount = enquiries.filter((e: any) => e.service === 'water_softener').length;
    const waterMgmtCount = enquiries.filter((e: any) => e.service === 'water_management').length;
    const generalCount = enquiries.filter((e: any) => e.service === 'general').length;

    res.json({
      total,
      byStatus: { new: newCount, contacted: contactedCount, in_progress: inProgressCount, completed: completedCount },
      byCategory: { solar: solarCount, water_softener: softenerCount, water_management: waterMgmtCount, general: generalCount },
      projectsCount: db.projects?.length || 0,
      testimonialsCount: db.testimonials?.length || 0,
      subscribersCount: db.newsletter?.length || 0
    });
  });

  // Public: Newsletter subscription
  app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    const db = readDb();
    if (!Array.isArray(db.newsletter)) {
      db.newsletter = [];
    }
    if (!db.newsletter.includes(email)) {
      db.newsletter.push({ email, subscribedAt: new Date().toISOString() });
      writeDb(db);
    }
    res.json({ success: true, message: 'Subscribed successfully to AviAqua GreenTech Insights!' });
  });

  // Attach Vite middleware in development or serve static in production
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AviAqua Full-Stack Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
