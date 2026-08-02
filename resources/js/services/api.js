import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Set Auth Token
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('admin_token', token);
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
    localStorage.removeItem('admin_token');
  }
};

// Auto load token if stored
const savedToken = localStorage.getItem('admin_token');
if (savedToken) {
  setAuthToken(savedToken);
}

// Fallback Mock Data for instant UI preview and resilience
export const fallbackSkills = [
  { id: 1, name_ar: 'تطوير الواجهات بـ React.js', name_en: 'React.js Frontend Development', category: 'Frontend Development', proficiency: 95, icon: 'Code2' },
  { id: 2, name_ar: 'تنسيقات Tailwind CSS الحديثة', name_en: 'Tailwind CSS Modern Styling', category: 'Frontend Development', proficiency: 98, icon: 'Palette' },
  { id: 3, name_ar: 'الحركات التفاعلية بـ Framer Motion', name_en: 'Framer Motion UI Animations', category: 'Frontend Development', proficiency: 90, icon: 'Zap' },
  { id: 4, name_ar: 'جافاسكربت الحديثة ES6+ & TypeScript', name_en: 'Modern JavaScript ES6+ & TypeScript', category: 'Frontend Development', proficiency: 92, icon: 'FileCode' },
  { id: 5, name_ar: 'الذكاء الاصطناعي وبناء النماذج الذكية', name_en: 'AI & Machine Learning Models', category: 'AI & Smart Systems', proficiency: 88, icon: 'Cpu' },
  { id: 6, name_ar: 'تحليل البيانات ورؤية الحاسوب', name_en: 'Data Analytics & Computer Vision', category: 'AI & Smart Systems', proficiency: 85, icon: 'Brain' },
  { id: 7, name_ar: 'أمن الشبكات واختبار الاختراق', name_en: 'Network Security & Penetration Testing', category: 'Cybersecurity & Networking', proficiency: 89, icon: 'ShieldCheck' },
  { id: 8, name_ar: 'تأمين واجهات API ومعايير OWASP', name_en: 'API Hardening & OWASP Top 10', category: 'Cybersecurity & Networking', proficiency: 94, icon: 'Lock' },
  { id: 9, name_ar: 'هندسة الأنظمة وتصميم Mappings & DFD/ERD', name_en: 'Systems Architecture & DFD/ERD Modeling', category: 'Systems Architecture', proficiency: 96, icon: 'Network' },
  { id: 10, name_ar: 'إطار العمل Laravel (PHP)', name_en: 'Laravel Framework (PHP)', category: 'Systems Architecture', proficiency: 95, icon: 'Layers' },
  { id: 11, name_ar: 'قواعد البيانات MySQL & Query Optimization', name_en: 'MySQL Database & Query Optimization', category: 'Systems Architecture', proficiency: 93, icon: 'Database' },
];

export const fallbackProjects = [
  {
    id: 1,
    slug: 'ai-smart-analytics-platform',
    title_ar: 'منصة التحليلات الذكية المدعومة بالذكاء الاصطناعي',
    title_en: 'AI-Powered Smart Analytics Platform',
    summary_ar: 'منصة متكاملة لتحليل البيانات الضخمة والتنبؤ بالسلوكيات التشغيلية باستخدام الخوارزميات الذكية.',
    summary_en: 'An integrated platform for big data analytics and operational forecasting using smart AI algorithms.',
    description_ar: 'تم بناء هذه المنصة لتقديم لوحات تحكم تفاعلية تحلل سلوك المستخدمين وتتوقع أنماط النمو باستخدام نماذج التعلّم الآلي. تعتمد المنصة على معمارية microservices مخصصة توفر استجابة فائقة السرعة مع حماية عالية للبيانات.',
    description_en: 'Built to provide dynamic dashboards that analyze user behaviors and predict growth trends using Machine Learning models. The platform leverages a high-throughput microservices architecture with robust data encryption.',
    category: 'AI & Smart Systems',
    tech_stack: ['React', 'Python', 'Tailwind CSS', 'Laravel', 'MySQL', 'TensorFlow'],
    cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200',
    architecture_diagram: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000',
    live_url: 'https://example.com/ai-analytics',
    github_url: 'https://github.com/wesam/ai-analytics-platform',
    is_featured: true,
  },
  {
    id: 2,
    slug: 'secure-network-threat-audit',
    title_ar: 'نظام إدارة الشبكات والتنود الآمن',
    title_en: 'Secure Enterprise Network & Threat Audit System',
    summary_ar: 'نظام أمني لرصد الثغرات وتحليل حزم البيانات في الوقت الفعلي مع تنبيهات استباقية.',
    summary_en: 'Security monitoring system for real-time vulnerability detection and packet inspection.',
    description_ar: 'نظام أمني عالي الأداء مخصص لمراقبة الحركة داخل الشبكات الداخلية والخارجية، وتجميع سجلات الأمان (SIEM Log Analytics)، والكشف عن الأنشطة المشبوهة لمنع الهجمات قبل حدوثها.',
    description_en: 'High-performance security monitoring system for inspecting internal and external network traffic, performing SIEM log analytics, and preemptively blocking threat vectors.',
    category: 'Cybersecurity & Networking',
    tech_stack: ['Laravel', 'React', 'Tailwind CSS', 'Docker', 'Python', 'Snort'],
    cover_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200',
    architecture_diagram: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000',
    live_url: 'https://example.com/network-sec',
    github_url: 'https://github.com/wesam/network-threat-system',
    is_featured: true,
  },
  {
    id: 3,
    slug: 'distributed-cloud-api-gateway',
    title_ar: 'بوابة المعمارية السحابية الموزعة (API Gateway)',
    title_en: 'Distributed Cloud Architecture & Resilient API Gateway',
    summary_ar: 'معمارية سحابية متقدمة تدعم التوسع الديناميكي ومعالجة آلاف الطلبات في الثانية.',
    summary_en: 'Advanced cloud API gateway supporting dynamic scaling and processing thousands of requests per second.',
    description_ar: 'مشروع هندسي يركز على بنية النظام الهيكلية، تصميم DFD متكامل، توزيع الأحمال (Load Balancing)، ومزامنة قواعد البيانات لضمان استمرارية الخدمة 99.99%.',
    description_en: 'Engineering architectural project focused on clean system boundaries, detailed DFD diagrams, load balancing, and high availability database replication.',
    category: 'Systems Architecture',
    tech_stack: ['Laravel', 'MySQL', 'Redis', 'Nginx', 'Docker', 'Tailwind CSS'],
    cover_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
    architecture_diagram: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000',
    live_url: 'https://example.com/api-gateway',
    github_url: 'https://github.com/wesam/cloud-api-gateway',
    is_featured: true,
  },
];

export const fallbackArticles = [
  {
    id: 1,
    slug: 'principles-of-resilient-distributed-systems',
    title_ar: 'مبادئ تصميم المعماريات الموزعة للأنظمة المعقدة',
    title_en: 'Principles of Designing Resilient Distributed Systems Architecture',
    summary_ar: 'دليل مهندسي لتصميم البنى التحتية المتكيفة، وتقليل الاعتمادات بين الخدمات الموزعة.',
    summary_en: 'An engineering guide to designing adaptive infrastructure and minimizing service coupling.',
    content_ar: '## مقدمة في تصميم الأنظمة الموزعة\n\nعند بناء الأنظمة الضخمة، تصبح معمارية الكتل الواحدة (Monolith) عائقاً أمام التوسع والسرعة.',
    content_en: '## Introduction to Distributed Systems Design\n\nWhen scaling large-scale software applications, monolithic architectures often introduce deployment bottlenecks.',
    category: 'Systems Architecture',
    cover_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
    read_time_minutes: 6,
    is_published: true,
    published_at: '2026-08-01',
  },
  {
    id: 2,
    slug: 'integrating-ai-models-modern-web',
    title_ar: 'دمج نماذج الذكاء الاصطناعي مع تطبيقات الويب الحديثة',
    title_en: 'Integrating AI & ML Models with Modern Web Frameworks',
    summary_ar: 'كيفية توظيف نماذج التعلّم العميق داخل تطبيقات React و Laravel بسلاسة وأداء عالٍ.',
    summary_en: 'How to seamlessly integrate Deep Learning models into React & Laravel web applications.',
    content_ar: '## تكامل الذكاء الاصطناعي مع الويب\n\nالنموذج الذكي لا تكتمل فائدته إلا عند ربطه بواجهة مستخدم سهلة وسريعة.',
    content_en: '## Bridging AI and Web Interfaces\n\nAn AI model delivers maximum business value when encapsulated within a slick, user-friendly interface.',
    category: 'AI & Smart Systems',
    cover_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
    read_time_minutes: 8,
    is_published: true,
    published_at: '2026-07-29',
  },
];

// =============================================
// LocalStorage Helpers for Standalone Mode
// =============================================
const getLocalData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const setLocalData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
};

const setStandaloneMode = () => {
  try { localStorage.setItem('standalone_mode', 'true'); } catch {}
};

const isStandaloneMode = () => {
  try {
    return localStorage.getItem('standalone_mode') === 'true';
  } catch {
    return true;
  }
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !(file instanceof File)) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const formDataToObject = async (formData) => {
  const obj = {};
  if (formData instanceof FormData) {
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (value.name) {
          const b64 = await fileToBase64(value);
          if (b64) obj[key] = b64;
        }
      } else {
        obj[key] = value;
      }
    }
  } else {
    Object.assign(obj, formData);
  }
  return obj;
};

// =============================================
// READ API Methods (with standalone fallback)
// =============================================

export const getSkills = async () => {
  if (isStandaloneMode()) return getLocalData('mock_skills', fallbackSkills);
  try {
    const res = await apiClient.get('/skills');
    return res.data.data;
  } catch {
    setStandaloneMode();
    return getLocalData('mock_skills', fallbackSkills);
  }
};

export const getProjects = async (category = 'all') => {
  let projects;
  if (isStandaloneMode()) {
    projects = getLocalData('mock_projects', fallbackProjects);
  } else {
    try {
      const res = await apiClient.get('/projects', { params: { category } });
      projects = res.data.data;
    } catch {
      setStandaloneMode();
      projects = getLocalData('mock_projects', fallbackProjects);
    }
  }
  if (category === 'all') return projects;
  return projects.filter(p => p.category === category);
};

export const getProjectBySlug = async (slug) => {
  if (isStandaloneMode()) {
    const projects = getLocalData('mock_projects', fallbackProjects);
    return projects.find(p => p.slug === slug || p.id == slug) || projects[0];
  }
  try {
    const res = await apiClient.get(`/projects/${slug}`);
    return res.data.data;
  } catch {
    setStandaloneMode();
    const projects = getLocalData('mock_projects', fallbackProjects);
    return projects.find(p => p.slug === slug || p.id == slug) || projects[0];
  }
};

export const getArticles = async (category = 'all', search = '') => {
  let articles;
  if (isStandaloneMode()) {
    articles = getLocalData('mock_articles', fallbackArticles);
  } else {
    try {
      const res = await apiClient.get('/articles', { params: { category, search } });
      articles = res.data.data;
    } catch {
      setStandaloneMode();
      articles = getLocalData('mock_articles', fallbackArticles);
    }
  }
  let filtered = articles;
  if (category !== 'all') filtered = filtered.filter(a => a.category === category);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(a => a.title_ar.includes(q) || a.title_en.toLowerCase().includes(q));
  }
  return filtered;
};

export const getArticleBySlug = async (slug) => {
  if (isStandaloneMode()) {
    const articles = getLocalData('mock_articles', fallbackArticles);
    return articles.find(a => a.slug === slug || a.id == slug) || articles[0];
  }
  try {
    const res = await apiClient.get(`/articles/${slug}`);
    return res.data.data;
  } catch {
    setStandaloneMode();
    const articles = getLocalData('mock_articles', fallbackArticles);
    return articles.find(a => a.slug === slug || a.id == slug) || articles[0];
  }
};

// =============================================
// Profile
// =============================================

export const fallbackProfile = {
  name_ar: 'وسام وليد النظاري',
  name_en: 'Wesam Waleed Al-Nathari',
  title_ar: 'مهندس أنظمة، مطور واجهات ومطوّر حلول ذكية',
  title_en: 'Systems Architect, Frontend & AI Solutions Engineer',
  bio_ar: 'متخصص في بناء منصات الويب الحديثة عالية الأداء، تصميم معمارية الأنظمة الموزعة، دمج حلول الذكاء الاصطناعي، وتأمين البنى التحتية البرمجية.',
  bio_en: 'Specialized in building high-performance modern web platforms, designing resilient distributed architectures, integrating AI solutions, and hardening enterprise applications.',
  email: 'wesam@alnathari.tech',
  phone: '+967 770 000 000',
  location_ar: 'الجمهورية اليمنية',
  location_en: 'Yemen',
  avatar: null,
  github_url: 'https://github.com/wesam',
  linkedin_url: 'https://linkedin.com/in/wesam',
  twitter_url: 'https://twitter.com/wesam',
  whatsapp_url: 'https://wa.me/967770000000',
  facebook_url: 'https://facebook.com/wesam',
  cv_url: '/CV_Wesam_Alnathari.pdf',
};

export const getProfile = async () => {
  if (isStandaloneMode()) return getLocalData('mock_profile', fallbackProfile);
  try {
    const res = await apiClient.get('/profile');
    return res.data.data || getLocalData('mock_profile', fallbackProfile);
  } catch {
    setStandaloneMode();
    return getLocalData('mock_profile', fallbackProfile);
  }
};

export const updateProfile = async (formDataOrData) => {
  if (!isStandaloneMode()) {
    try {
      let res;
      if (formDataOrData instanceof FormData) {
        res = await apiClient.post('/admin/profile', formDataOrData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await apiClient.post('/admin/profile', formDataOrData);
      }
      try { window.dispatchEvent(new Event('profile-updated')); } catch {}
      return res.data;
    } catch {
      setStandaloneMode();
    }
  }
  // Standalone fallback
  const current = getLocalData('mock_profile', fallbackProfile);
  const dataObj = await formDataToObject(formDataOrData);
  if (dataObj.avatar_file && typeof dataObj.avatar_file === 'string' && dataObj.avatar_file.startsWith('data:')) {
    dataObj.avatar = dataObj.avatar_file;
  }
  const updated = { ...current, ...dataObj };
  setLocalData('mock_profile', updated);
  try { window.dispatchEvent(new Event('profile-updated')); } catch {}
  return { status: 'success', message: 'Profile updated successfully', data: updated };
};

// =============================================
// Contact Messages
// =============================================

export const sendContactMessage = async (formData) => {
  try {
    const res = await apiClient.post('/contact', formData);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    const currentMsg = getLocalData('mock_contacts', [
      { id: 1, name: 'أحمد سالم', email: 'ahmed@example.com', subject: 'استشارة هندسية', message: 'نود مناقشة بناء معمارية سحابية لتطبيقنا.', created_at: '2026-08-01' }
    ]);
    const newMsg = {
      id: Date.now(),
      name: formData.name || 'زائر',
      email: formData.email || 'guest@example.com',
      subject: formData.subject || 'رسالة جديدة',
      message: formData.message || '',
      created_at: new Date().toISOString().split('T')[0]
    };
    setLocalData('mock_contacts', [newMsg, ...currentMsg]);
    return { status: 'success', message: 'Message sent successfully!' };
  }
};

export const getContacts = async () => {
  if (isStandaloneMode()) {
    return getLocalData('mock_contacts', [
      { id: 1, name: 'أحمد سالم', email: 'ahmed@example.com', subject: 'استشارة هندسية', message: 'نود مناقشة بناء معمارية سحابية لتطبيقنا.', created_at: '2026-08-01' }
    ]);
  }
  try {
    const res = await apiClient.get('/admin/contacts');
    return res.data.data;
  } catch {
    setStandaloneMode();
    return getLocalData('mock_contacts', [
      { id: 1, name: 'أحمد سالم', email: 'ahmed@example.com', subject: 'استشارة هندسية', message: 'نود مناقشة بناء معمارية سحابية لتطبيقنا.', created_at: '2026-08-01' }
    ]);
  }
};

export const markContactAsRead = async (id) => {
  try {
    const res = await apiClient.patch(`/admin/contacts/${id}/read`);
    return res.data;
  } catch {
    const current = getLocalData('mock_contacts', []);
    const updated = current.map(c => c.id == id ? { ...c, read: true } : c);
    setLocalData('mock_contacts', updated);
    return { status: 'success' };
  }
};

export const deleteContact = async (id) => {
  try {
    const res = await apiClient.delete(`/admin/contacts/${id}`);
    return res.data;
  } catch {
    const current = getLocalData('mock_contacts', []);
    const updated = current.filter(c => c.id != id);
    setLocalData('mock_contacts', updated);
    return { status: 'success' };
  }
};

// =============================================
// Skill CRUD
// =============================================

export const createSkill = async (skillData) => {
  if (!isStandaloneMode()) {
    try {
      const res = await apiClient.post('/admin/skills', skillData);
      return res.data;
    } catch { setStandaloneMode(); }
  }
  const current = getLocalData('mock_skills', fallbackSkills);
  const newSkill = { id: Date.now(), ...skillData };
  const updated = [newSkill, ...current];
  setLocalData('mock_skills', updated);
  return { status: 'success', data: newSkill };
};

export const updateSkill = async (id, skillData) => {
  if (!isStandaloneMode()) {
    try {
      const res = await apiClient.put(`/admin/skills/${id}`, skillData);
      return res.data;
    } catch { setStandaloneMode(); }
  }
  const current = getLocalData('mock_skills', fallbackSkills);
  const updated = current.map(s => s.id == id ? { ...s, ...skillData } : s);
  setLocalData('mock_skills', updated);
  return { status: 'success', data: updated.find(s => s.id == id) };
};

export const deleteSkill = async (id) => {
  if (!isStandaloneMode()) {
    try {
      const res = await apiClient.delete(`/admin/skills/${id}`);
      return res.data;
    } catch { setStandaloneMode(); }
  }
  const current = getLocalData('mock_skills', fallbackSkills);
  const updated = current.filter(s => s.id != id);
  setLocalData('mock_skills', updated);
  return { status: 'success' };
};

// =============================================
// Project CRUD
// =============================================

export const createProject = async (projectDataOrFormData) => {
  if (!isStandaloneMode()) {
    try {
      let res;
      if (projectDataOrFormData instanceof FormData) {
        res = await apiClient.post('/admin/projects', projectDataOrFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await apiClient.post('/admin/projects', projectDataOrFormData);
      }
      return res.data;
    } catch { setStandaloneMode(); }
  }
  const dataObj = await formDataToObject(projectDataOrFormData);
  if (dataObj.cover_image_file && typeof dataObj.cover_image_file === 'string' && dataObj.cover_image_file.startsWith('data:')) {
    dataObj.cover_image = dataObj.cover_image_file;
  }
  const current = getLocalData('mock_projects', fallbackProjects);
  const newProject = {
    id: Date.now(),
    slug: dataObj.title_en ? dataObj.title_en.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `project-${Date.now()}`,
    title_ar: dataObj.title_ar || 'مشروع جديد',
    title_en: dataObj.title_en || 'New Project',
    summary_ar: dataObj.summary_ar || '',
    summary_en: dataObj.summary_en || '',
    description_ar: dataObj.description_ar || '',
    description_en: dataObj.description_en || '',
    category: dataObj.category || 'AI & Smart Systems',
    tech_stack: typeof dataObj.tech_stack === 'string' ? dataObj.tech_stack.split(',').map(s => s.trim()) : (dataObj.tech_stack || ['React', 'Laravel']),
    cover_image: dataObj.cover_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200',
    live_url: dataObj.live_url || '',
    github_url: dataObj.github_url || ''
  };
  const updated = [newProject, ...current];
  setLocalData('mock_projects', updated);
  return { status: 'success', data: newProject };
};

export const updateProject = async (id, projectDataOrFormData) => {
  if (!isStandaloneMode()) {
    try {
      let res;
      if (projectDataOrFormData instanceof FormData) {
        projectDataOrFormData.append('_method', 'PUT');
        res = await apiClient.post(`/admin/projects/${id}`, projectDataOrFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await apiClient.put(`/admin/projects/${id}`, projectDataOrFormData);
      }
      return res.data;
    } catch { setStandaloneMode(); }
  }
  const dataObj = await formDataToObject(projectDataOrFormData);
  if (dataObj.cover_image_file && typeof dataObj.cover_image_file === 'string' && dataObj.cover_image_file.startsWith('data:')) {
    dataObj.cover_image = dataObj.cover_image_file;
  }
  const current = getLocalData('mock_projects', fallbackProjects);
  const updated = current.map(p => {
    if (p.id == id) {
      return {
        ...p,
        ...dataObj,
        tech_stack: typeof dataObj.tech_stack === 'string' ? dataObj.tech_stack.split(',').map(s => s.trim()) : (dataObj.tech_stack || p.tech_stack)
      };
    }
    return p;
  });
  setLocalData('mock_projects', updated);
  return { status: 'success', data: updated.find(p => p.id == id) };
};

export const deleteProject = async (id) => {
  if (!isStandaloneMode()) {
    try {
      const res = await apiClient.delete(`/admin/projects/${id}`);
      return res.data;
    } catch { setStandaloneMode(); }
  }
  const current = getLocalData('mock_projects', fallbackProjects);
  const updated = current.filter(p => p.id != id);
  setLocalData('mock_projects', updated);
  return { status: 'success' };
};

// =============================================
// Article CRUD
// =============================================

export const createArticle = async (articleDataOrFormData) => {
  if (!isStandaloneMode()) {
    try {
      let res;
      if (articleDataOrFormData instanceof FormData) {
        res = await apiClient.post('/admin/articles', articleDataOrFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await apiClient.post('/admin/articles', articleDataOrFormData);
      }
      return res.data;
    } catch { setStandaloneMode(); }
  }
  const dataObj = formDataToObject(articleDataOrFormData);
  const current = getLocalData('mock_articles', fallbackArticles);
  const newArticle = {
    id: Date.now(),
    slug: dataObj.title_en ? dataObj.title_en.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `article-${Date.now()}`,
    title_ar: dataObj.title_ar || 'مقال جديد',
    title_en: dataObj.title_en || 'New Article',
    summary_ar: dataObj.summary_ar || '',
    summary_en: dataObj.summary_en || '',
    content_ar: dataObj.content_ar || '',
    content_en: dataObj.content_en || '',
    category: dataObj.category || 'Systems Architecture',
    cover_image: dataObj.cover_image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200',
    read_time_minutes: dataObj.read_time_minutes || 5,
    is_published: true,
    published_at: new Date().toISOString().split('T')[0]
  };
  const updated = [newArticle, ...current];
  setLocalData('mock_articles', updated);
  return { status: 'success', data: newArticle };
};

export const updateArticle = async (id, articleDataOrFormData) => {
  if (!isStandaloneMode()) {
    try {
      let res;
      if (articleDataOrFormData instanceof FormData) {
        articleDataOrFormData.append('_method', 'PUT');
        res = await apiClient.post(`/admin/articles/${id}`, articleDataOrFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await apiClient.put(`/admin/articles/${id}`, articleDataOrFormData);
      }
      return res.data;
    } catch { setStandaloneMode(); }
  }
  const dataObj = formDataToObject(articleDataOrFormData);
  const current = getLocalData('mock_articles', fallbackArticles);
  const updated = current.map(a => a.id == id ? { ...a, ...dataObj } : a);
  setLocalData('mock_articles', updated);
  return { status: 'success', data: updated.find(a => a.id == id) };
};

export const deleteArticle = async (id) => {
  if (!isStandaloneMode()) {
    try {
      const res = await apiClient.delete(`/admin/articles/${id}`);
      return res.data;
    } catch { setStandaloneMode(); }
  }
  const current = getLocalData('mock_articles', fallbackArticles);
  const updated = current.filter(a => a.id != id);
  setLocalData('mock_articles', updated);
  return { status: 'success' };
};

// =============================================
// Admin Login
// =============================================

export const adminLogin = async (email, password) => {
  try {
    const res = await apiClient.post('/auth/login', { email, password });
    if (res.data.token) {
      setAuthToken(res.data.token);
    }
    return res.data;
  } catch {
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    if ((cleanEmail === 'wesam.os' || cleanEmail === 'admin@wesam.tech') && password === '225211.10') {
      setStandaloneMode();
      const mockToken = 'mock_admin_token_2026';
      setAuthToken(mockToken);
      return { status: 'success', token: mockToken, user: { name: 'وسام وليد النظاري', email } };
    }
    throw new Error('بيانات الدخول غير صحيحة');
  }
};
