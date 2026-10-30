import { SiteSettings, Project, Testimonial, Enquiry, AdminStats } from '../types';
import { fallbackSettings, fallbackProjects, fallbackTestimonials } from '../data/initialData';

const TOKEN_KEY = 'aviaqua_admin_token';

export const api = {
  // Token management
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken(token: string) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.error(e);
    }
  },

  clearToken() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.error(e);
    }
  },

  // Settings
  async getSettings(): Promise<SiteSettings> {
    try {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      return await res.json();
    } catch (err) {
      console.warn('Using fallback settings:', err);
      return fallbackSettings;
    }
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const token = this.getToken();
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(settings)
    });
    if (!res.ok) throw new Error('Failed to update settings');
    const data = await res.json();
    return data.settings;
  },

  // Projects
  async getProjects(category?: string): Promise<Project[]> {
    try {
      const url = category && category !== 'all' ? `/api/projects?category=${category}` : '/api/projects';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch projects');
      return await res.json();
    } catch (err) {
      console.warn('Using fallback projects:', err);
      if (category && category !== 'all') {
        return fallbackProjects.filter(p => p.category === category);
      }
      return fallbackProjects;
    }
  },

  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    const token = this.getToken();
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error('Failed to create project');
    return await res.json();
  },

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const token = this.getToken();
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error('Failed to update project');
    return await res.json();
  },

  async deleteProject(id: string): Promise<boolean> {
    const token = this.getToken();
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('Failed to delete project');
    return true;
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const res = await fetch('/api/testimonials');
      if (!res.ok) throw new Error('Failed to fetch testimonials');
      return await res.json();
    } catch (err) {
      console.warn('Using fallback testimonials:', err);
      return fallbackTestimonials;
    }
  },

  async createTestimonial(testimonial: Omit<Testimonial, 'id' | 'date' | 'verified'>): Promise<Testimonial> {
    const token = this.getToken();
    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(testimonial)
    });
    if (!res.ok) throw new Error('Failed to create testimonial');
    return await res.json();
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    const token = this.getToken();
    const res = await fetch(`/api/testimonials/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('Failed to delete testimonial');
    return true;
  },

  // Customer Enquiries
  async submitEnquiry(payload: {
    fullName: string;
    phone: string;
    email?: string;
    city: string;
    service: 'solar' | 'water_softener' | 'water_management' | 'general';
    propertyType?: string;
    message?: string;
    metadata?: Record<string, any>;
  }): Promise<{ success: boolean; message: string; enquiryId?: string }> {
    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Submission failed' }));
      throw new Error(err.error || 'Failed to submit enquiry');
    }
    return await res.json();
  },

  async getEnquiries(params?: { category?: string; status?: string; search?: string }): Promise<Enquiry[]> {
    const token = this.getToken();
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.status) query.append('status', params.status);
    if (params?.search) query.append('search', params.search);

    const res = await fetch(`/api/enquiries?${query.toString()}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch enquiries');
    return await res.json();
  },

  async updateEnquiryStatus(id: string, status: string): Promise<boolean> {
    const token = this.getToken();
    const res = await fetch(`/api/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update status');
    return true;
  },

  async deleteEnquiry(id: string): Promise<boolean> {
    const token = this.getToken();
    const res = await fetch(`/api/enquiries/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to delete enquiry');
    return true;
  },

  // Admin Auth & Stats
  async adminLogin(email: string, password: string): Promise<{ success: boolean; token: string }> {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Invalid credentials' }));
      throw new Error(err.error || 'Login failed');
    }
    const data = await res.json();
    this.setToken(data.token);
    return data;
  },

  async verifyAdmin(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;
    try {
      const res = await fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async getAdminStats(): Promise<AdminStats> {
    const token = this.getToken();
    const res = await fetch('/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to load stats');
    return await res.json();
  },

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Subscription failed' }));
      throw new Error(err.error || 'Failed to subscribe');
    }
    return await res.json();
  }
};
