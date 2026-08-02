import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  getProjects, getArticles, getSkills, getContacts, setAuthToken, getProfile, updateProfile,
  createSkill, updateSkill, deleteSkill,
  createProject, updateProject, deleteProject,
  createArticle, updateArticle, deleteArticle,
  deleteContact, markContactAsRead
} from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Layers, BookOpen, Cpu, Mail, LogOut, Plus, Trash2, Edit3, ShieldCheck, 
  CheckCircle2, X, Check, User, Upload, Globe, Phone, MapPin, AlertCircle, Save, Image as ImageIcon
} from 'lucide-react';
import { Whatsapp, Facebook } from '../../components/BrandIcons';

export default function Dashboard() {
  const navigate = useNavigate();
  const { isRtl } = useLanguage();

  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [articles, setArticles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [inboxMessages, setInboxMessages] = useState([]);
  const [profileData, setProfileData] = useState(null);

  const [toast, setToast] = useState(null); // { type: 'success'|'error', msg: string }

  // Modal States
  const [modalType, setModalType] = useState(null); // 'project' | 'article' | 'skill' | null
  const [editingItem, setEditingItem] = useState(null);

  // Form States
  const [skillForm, setSkillForm] = useState({ name_ar: '', name_en: '', category: 'Frontend Development', proficiency: 90, icon: 'Code2' });
  
  const [projectForm, setProjectForm] = useState({ 
    title_ar: '', title_en: '', summary_ar: '', summary_en: '', description_ar: '', description_en: '', 
    category: 'AI & Smart Systems', tech_stack: 'React, Laravel', live_url: '', github_url: '', cover_image: '' 
  });
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [projectImagePreview, setProjectImagePreview] = useState(null);

  const [articleForm, setArticleForm] = useState({ 
    title_ar: '', title_en: '', summary_ar: '', summary_en: '', content_ar: '', content_en: '', 
    category: 'Systems Architecture', read_time_minutes: 5, is_published: true, cover_image: '' 
  });
  const [articleImageFile, setArticleImageFile] = useState(null);
  const [articleImagePreview, setArticleImagePreview] = useState(null);

  const [profileForm, setProfileForm] = useState({
    name_ar: '', name_en: '',
    title_ar: '', title_en: '',
    bio_ar: '', bio_en: '',
    email: '', phone: '',
    location_ar: '', location_en: '',
    avatar: '', github_url: '', linkedin_url: '', twitter_url: '',
    whatsapp_url: '', facebook_url: '', cv_url: ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  const loadData = async () => {
    try {
      const [p, a, s, c, prof] = await Promise.all([
        getProjects(),
        getArticles(),
        getSkills(),
        getContacts(),
        getProfile()
      ]);
      setProjects(p || []);
      setArticles(a || []);
      setSkills(s || []);
      setInboxMessages(c || []);
      if (prof) {
        setProfileData(prof);
        setProfileForm({
          name_ar: prof.name_ar || '',
          name_en: prof.name_en || '',
          title_ar: prof.title_ar || '',
          title_en: prof.title_en || '',
          bio_ar: prof.bio_ar || '',
          bio_en: prof.bio_en || '',
          email: prof.email || '',
          phone: prof.phone || '',
          location_ar: prof.location_ar || '',
          location_en: prof.location_en || '',
          avatar: prof.avatar || '',
          github_url: prof.github_url || '',
          linkedin_url: prof.linkedin_url || '',
          twitter_url: prof.twitter_url || '',
          whatsapp_url: prof.whatsapp_url || '',
          facebook_url: prof.facebook_url || '',
          cv_url: prof.cv_url || ''
        });
        setAvatarPreview(prof.avatar || null);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const handleReturnToSite = () => {
    setAuthToken(null);
    localStorage.removeItem('admin_token');
    navigate('/');
  };

  // --- PROFILE HANDLERS ---
  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (evt) => {
        const base64Url = evt.target.result;
        setAvatarPreview(base64Url);
        setProfileForm(prev => ({ ...prev, avatar: base64Url }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      let payload;
      if (avatarFile) {
        payload = new FormData();
        Object.keys(profileForm).forEach(key => payload.append(key, profileForm[key]));
        payload.append('avatar_file', avatarFile);
      } else {
        payload = profileForm;
      }
      await updateProfile(payload);
      showToast('success', isRtl ? 'تم تحديث الملف الشخصي بنجاح!' : 'Profile updated successfully!');
      loadData();
    } catch (err) {
      showToast('error', isRtl ? 'فشل تحديث الملف الشخصي' : 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  // --- SKILL HANDLERS ---
  const openSkillModal = (skill = null) => {
    setEditingItem(skill);
    if (skill) {
      setSkillForm({
        name_ar: skill.name_ar || '',
        name_en: skill.name_en || '',
        category: skill.category || 'Frontend Development',
        proficiency: skill.proficiency || 90,
        icon: skill.icon || 'Code2'
      });
    } else {
      setSkillForm({ name_ar: '', name_en: '', category: 'Frontend Development', proficiency: 90, icon: 'Code2' });
    }
    setModalType('skill');
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateSkill(editingItem.id, skillForm);
        showToast('success', isRtl ? 'تم تعديل المهارة بنجاح' : 'Skill updated');
      } else {
        await createSkill(skillForm);
        showToast('success', isRtl ? 'تم إضافة المهارة بنجاح' : 'Skill created');
      }
      setModalType(null);
      loadData();
    } catch (err) {
      showToast('error', isRtl ? 'حدث خطأ أثناء حفظ المهارة' : 'Failed to save skill');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm(isRtl ? 'هل أنت تأكد من حذف هذه المهارة؟' : 'Are you sure you want to delete this skill?')) return;
    try {
      await deleteSkill(id);
      showToast('success', isRtl ? 'تم حذف المهارة' : 'Skill deleted');
      loadData();
    } catch (err) {
      showToast('error', isRtl ? 'فشل حذف المهارة' : 'Failed to delete skill');
    }
  };

  // --- PROJECT HANDLERS ---
  const openProjectModal = (project = null) => {
    setEditingItem(project);
    setProjectImageFile(null);
    setProjectImagePreview(project?.cover_image || null);
    if (project) {
      setProjectForm({
        title_ar: project.title_ar || '',
        title_en: project.title_en || '',
        summary_ar: project.summary_ar || '',
        summary_en: project.summary_en || '',
        description_ar: project.description_ar || '',
        description_en: project.description_en || '',
        category: project.category || 'AI & Smart Systems',
        tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : (project.tech_stack || ''),
        live_url: project.live_url || '',
        github_url: project.github_url || '',
        cover_image: project.cover_image || ''
      });
    } else {
      setProjectForm({ 
        title_ar: '', title_en: '', summary_ar: '', summary_en: '', description_ar: '', description_en: '', 
        category: 'AI & Smart Systems', tech_stack: 'React, Laravel', live_url: '', github_url: '', cover_image: '' 
      });
    }
    setModalType('project');
  };

  const handleProjectImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectImageFile(file);
      const reader = new FileReader();
      reader.onload = (evt) => {
        const base64Url = evt.target.result;
        setProjectImagePreview(base64Url);
        setProjectForm(prev => ({ ...prev, cover_image: base64Url }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      if (projectImageFile) {
        const formData = new FormData();
        formData.append('title_ar', projectForm.title_ar);
        formData.append('title_en', projectForm.title_en);
        formData.append('summary_ar', projectForm.summary_ar);
        formData.append('summary_en', projectForm.summary_en);
        formData.append('description_ar', projectForm.description_ar);
        formData.append('description_en', projectForm.description_en);
        formData.append('category', projectForm.category);
        formData.append('tech_stack', projectForm.tech_stack);
        formData.append('live_url', projectForm.live_url || '');
        formData.append('github_url', projectForm.github_url || '');
        formData.append('cover_image', projectForm.cover_image || '');
        formData.append('cover_image_file', projectImageFile);

        if (editingItem) {
          await updateProject(editingItem.id, formData);
          showToast('success', isRtl ? 'تم تعديل المشروع والصورة' : 'Project & image updated');
        } else {
          await createProject(formData);
          showToast('success', isRtl ? 'تم إضافة المشروع مع الصورة' : 'Project created with image');
        }
      } else {
        const payload = {
          ...projectForm,
          tech_stack: projectForm.tech_stack.split(',').map(s => s.trim()).filter(Boolean)
        };
        if (editingItem) {
          await updateProject(editingItem.id, payload);
          showToast('success', isRtl ? 'تم تعديل المشروع' : 'Project updated');
        } else {
          await createProject(payload);
          showToast('success', isRtl ? 'تم إضافة المشروع' : 'Project created');
        }
      }
      setModalType(null);
      loadData();
    } catch (err) {
      showToast('error', isRtl ? 'حدث خطأ أثناء حفظ المشروع' : 'Failed to save project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm(isRtl ? 'هل أنت تأكد من حذف هذا المشروع؟' : 'Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      showToast('success', isRtl ? 'تم حذف المشروع' : 'Project deleted');
      loadData();
    } catch (err) {
      showToast('error', isRtl ? 'فشل حذف المشروع' : 'Failed to delete project');
    }
  };

  // --- ARTICLE HANDLERS ---
  const openArticleModal = (article = null) => {
    setEditingItem(article);
    setArticleImageFile(null);
    setArticleImagePreview(article?.cover_image || null);
    if (article) {
      setArticleForm({
        title_ar: article.title_ar || '',
        title_en: article.title_en || '',
        summary_ar: article.summary_ar || '',
        summary_en: article.summary_en || '',
        content_ar: article.content_ar || '',
        content_en: article.content_en || '',
        category: article.category || 'Systems Architecture',
        read_time_minutes: article.read_time_minutes || 5,
        is_published: article.is_published ?? true,
        cover_image: article.cover_image || ''
      });
    } else {
      setArticleForm({ 
        title_ar: '', title_en: '', summary_ar: '', summary_en: '', content_ar: '', content_en: '', 
        category: 'Systems Architecture', read_time_minutes: 5, is_published: true, cover_image: '' 
      });
    }
    setModalType('article');
  };

  const handleArticleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArticleImageFile(file);
      const reader = new FileReader();
      reader.onload = (evt) => {
        const base64Url = evt.target.result;
        setArticleImagePreview(base64Url);
        setArticleForm(prev => ({ ...prev, cover_image: base64Url }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (articleImageFile) {
        const formData = new FormData();
        formData.append('title_ar', articleForm.title_ar);
        formData.append('title_en', articleForm.title_en);
        formData.append('summary_ar', articleForm.summary_ar);
        formData.append('summary_en', articleForm.summary_en);
        formData.append('content_ar', articleForm.content_ar);
        formData.append('content_en', articleForm.content_en);
        formData.append('category', articleForm.category);
        formData.append('read_time_minutes', articleForm.read_time_minutes);
        formData.append('cover_image', articleForm.cover_image || '');
        formData.append('cover_image_file', articleImageFile);

        if (editingItem) {
          await updateArticle(editingItem.id, formData);
          showToast('success', isRtl ? 'تم تعديل المقال والصورة' : 'Article & cover image updated');
        } else {
          await createArticle(formData);
          showToast('success', isRtl ? 'تم نشر المقال والصورة' : 'Article created with image');
        }
      } else {
        if (editingItem) {
          await updateArticle(editingItem.id, articleForm);
          showToast('success', isRtl ? 'تم تعديل المقال' : 'Article updated');
        } else {
          await createArticle(articleForm);
          showToast('success', isRtl ? 'تم نشر المقال' : 'Article published');
        }
      }
      setModalType(null);
      loadData();
    } catch (err) {
      showToast('error', isRtl ? 'حدث خطأ أثناء حفظ المقال' : 'Failed to save article');
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm(isRtl ? 'هل أنت تأكد من حذف هذا المقال؟' : 'Are you sure you want to delete this article?')) return;
    try {
      await deleteArticle(id);
      showToast('success', isRtl ? 'تم حذف المقال' : 'Article deleted');
      loadData();
    } catch (err) {
      showToast('error', isRtl ? 'فشل حذف المقال' : 'Failed to delete article');
    }
  };

  // --- INBOX HANDLERS ---
  const handleMarkAsRead = async (id) => {
    try {
      await markContactAsRead(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm(isRtl ? 'هل أنت تأكد من حذف هذه الرسالة؟' : 'Delete this message?')) return;
    try {
      await deleteContact(id);
      showToast('success', isRtl ? 'تم حذف الرسالة' : 'Message deleted');
      loadData();
    } catch (err) {
      showToast('error', isRtl ? 'فشل حذف الرسالة' : 'Failed to delete message');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Toast Notification Banner */}
      {toast && (
        <div className={`fixed top-24 rtl:left-6 ltr:right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 transition-all animate-bounce ${
          toast.type === 'success'
            ? 'bg-emerald-600 text-white border-emerald-500'
            : 'bg-rose-600 text-white border-rose-500'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-extrabold text-sm">{toast.msg}</span>
        </div>
      )}

      {/* Top Header & Logout */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              {isRtl ? 'قسم الإدارة والمتابعة' : 'Management Portal'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isRtl ? 'إدارة البروفايل، أعمالي ومشاريعي، والمدونة' : 'Manage profile, my projects, & articles'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReturnToSite}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            <span>{isRtl ? 'العودة للموقع ومعاينة التغييرات' : 'Return to Website & Preview'}</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{isRtl ? 'خروج من الإدارة' : 'Logout'}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-blue-500">
            <span className="text-xs font-extrabold uppercase">{isRtl ? 'المشاريع' : 'Projects'}</span>
            <Layers className="w-5 h-5" />
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white">{projects.length}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-sky-500">
            <span className="text-xs font-extrabold uppercase">{isRtl ? 'المقالات' : 'Articles'}</span>
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white">{articles.length}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-indigo-500">
            <span className="text-xs font-extrabold uppercase">{isRtl ? 'المهارات' : 'Skills'}</span>
            <Cpu className="w-5 h-5" />
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white">{skills.length}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-emerald-500">
            <span className="text-xs font-extrabold uppercase">{isRtl ? 'الرسائل' : 'Inbox'}</span>
            <Mail className="w-5 h-5" />
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white">{inboxMessages.length}</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'projects' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {isRtl ? 'أعمالي ومشاريعي' : 'My Portfolio & Projects'}
        </button>
        <button
          onClick={() => setActiveTab('articles')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'articles' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {isRtl ? 'إدارة المدونة' : 'Manage Articles'}
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'skills' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {isRtl ? 'إدارة المهارات' : 'Manage Skills'}
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'profile' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>{isRtl ? 'الملف الشخصي' : 'Profile Management'}</span>
        </button>
        <button
          onClick={() => setActiveTab('inbox')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'inbox' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {isRtl ? 'صندوق الرسائل' : 'Inbox Messages'}
        </button>
      </div>

      {/* --- PROFILE MANAGEMENT TAB PANEL --- */}
      {activeTab === 'profile' && (
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="font-black text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                <span>{isRtl ? 'إدارة الملف الشخصي' : 'Profile Management'}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isRtl ? 'التعديلات هنا تنعكس فوراً على واجهة الزائر (الرئيسية، الفوتر، وصفحة التواصل)' : 'Edits here immediately sync across public visitor pages'}
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            
            {/* Avatar Section */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 shadow-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12" />
                )}
              </div>
              <div className="space-y-2 text-center sm:rtl:text-right sm:ltr:text-left">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white block">
                  {isRtl ? 'الصورة الشخصية (Profile Picture)' : 'Profile Picture'}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isRtl ? 'اختر صورة من جهازك أو ادخل رابط صورة مباشر' : 'Upload an image file or type a direct image URL'}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                  <label className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 cursor-pointer shadow-md">
                    <Upload className="w-4 h-4" />
                    <span>{isRtl ? 'رفع صورة جديدة' : 'Upload New Image'}</span>
                    <input type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* Direct Avatar URL input fallback */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isRtl ? 'رابط الصورة الشخصية المباشر (Image URL)' : 'Direct Avatar Image URL'}
              </label>
              <input
                type="text"
                value={profileForm.avatar}
                onChange={e => {
                  setProfileForm({ ...profileForm, avatar: e.target.value });
                  if (!avatarFile) setAvatarPreview(e.target.value);
                }}
                placeholder="https://example.com/profile.jpg"
                className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Name inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isRtl ? 'الاسم الكامل (عربي) *' : 'Full Name (Arabic) *'}
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.name_ar}
                  onChange={e => setProfileForm({ ...profileForm, name_ar: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isRtl ? 'الاسم الكامل (إنجليزي) *' : 'Full Name (English) *'}
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.name_en}
                  onChange={e => setProfileForm({ ...profileForm, name_en: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Title / Tagline inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isRtl ? 'المسمى المهني (عربي) *' : 'Professional Title (Arabic) *'}
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.title_ar}
                  onChange={e => setProfileForm({ ...profileForm, title_ar: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isRtl ? 'المسمى المهني (إنجليزي) *' : 'Professional Title (English) *'}
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.title_en}
                  onChange={e => setProfileForm({ ...profileForm, title_en: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Bio / Tagline textareas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isRtl ? 'النبذة المهنية (عربي) *' : 'Bio / Tagline (Arabic) *'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={profileForm.bio_ar}
                  onChange={e => setProfileForm({ ...profileForm, bio_ar: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isRtl ? 'النبذة المهنية (إنجليزي) *' : 'Bio / Tagline (English) *'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={profileForm.bio_en}
                  onChange={e => setProfileForm({ ...profileForm, bio_en: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isRtl ? 'البريد الإلكتروني *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  value={profileForm.email}
                  onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isRtl ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isRtl ? 'الموقع / العنوان (عربي)' : 'Location (Arabic)'}
                </label>
                <input
                  type="text"
                  value={profileForm.location_ar}
                  onChange={e => setProfileForm({ ...profileForm, location_ar: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Social Links & WhatsApp/Facebook */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Whatsapp className="w-4 h-4 text-emerald-500" />
                  <span>{isRtl ? 'رابط واتساب المباشر (WhatsApp URL)' : 'WhatsApp URL'}</span>
                </label>
                <input
                  type="text"
                  value={profileForm.whatsapp_url}
                  onChange={e => setProfileForm({ ...profileForm, whatsapp_url: e.target.value })}
                  placeholder="https://wa.me/967770000000"
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Facebook className="w-4 h-4 text-blue-500" />
                  <span>{isRtl ? 'رابط صفحة فيسبوك (Facebook URL)' : 'Facebook URL'}</span>
                </label>
                <input
                  type="text"
                  value={profileForm.facebook_url}
                  onChange={e => setProfileForm({ ...profileForm, facebook_url: e.target.value })}
                  placeholder="https://facebook.com/username"
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">GitHub URL</label>
                <input
                  type="url"
                  value={profileForm.github_url}
                  onChange={e => setProfileForm({ ...profileForm, github_url: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">LinkedIn URL</label>
                <input
                  type="url"
                  value={profileForm.linkedin_url}
                  onChange={e => setProfileForm({ ...profileForm, linkedin_url: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={savingProfile}
                className="px-8 py-3.5 rounded-xl font-black text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/25 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                <span>{savingProfile ? (isRtl ? 'جاري الحفظ...' : 'Saving...') : (isRtl ? 'حفظ التعديلات' : 'Save Profile Changes')}</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* --- PROJECTS TAB PANEL --- */}
      {activeTab === 'projects' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                {isRtl ? 'أعمالي ومشاريعي' : 'My Portfolio & Projects'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isRtl ? 'إضافة وتعديل المشاريع، الصور، وروابط المعاينة المباشرة (Live Demo / GitHub)' : 'Manage project details, images, live demo & source links'}
              </p>
            </div>
            <button
              onClick={() => openProjectModal()}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{isRtl ? 'إضافة مشروع جديد' : 'Add New Project'}</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {projects.map(p => (
              <div key={p.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400">
                    {p.cover_image ? (
                      <img src={p.cover_image} alt={p.title_ar} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{isRtl ? p.title_ar : p.title_en}</h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{p.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openProjectModal(p)}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(p.id)}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- ARTICLES TAB PANEL --- */}
      {activeTab === 'articles' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              {isRtl ? 'المقالات التقنية' : 'Published Articles'}
            </h3>
            <button
              onClick={() => openArticleModal()}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{isRtl ? 'كتابة مقال جديد' : 'Write New Article'}</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {articles.map(a => (
              <div key={a.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400">
                    {a.cover_image ? (
                      <img src={a.cover_image} alt={a.title_ar} className="w-full h-full object-cover" />
                    ) : (
                      <BookOpen className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{isRtl ? a.title_ar : a.title_en}</h4>
                    <span className="text-xs text-slate-500">{a.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openArticleModal(a)}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-500 hover:bg-blue-50 cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteArticle(a.id)}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-rose-500 hover:bg-rose-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- SKILLS TAB PANEL --- */}
      {activeTab === 'skills' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              {isRtl ? 'مصفوفة المهارات' : 'Skills Matrix'}
            </h3>
            <button
              onClick={() => openSkillModal()}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{isRtl ? 'إضافة مهاره' : 'Add Skill'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map(s => (
              <div key={s.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{isRtl ? s.name_ar : s.name_en}</h4>
                  <span className="text-xs text-blue-500">{s.proficiency}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => openSkillModal(s)}
                    className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteSkill(s.id)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- INBOX TAB PANEL --- */}
      {activeTab === 'inbox' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
            {isRtl ? 'الرسائل الواردة' : 'Inbox Messages'}
          </h3>

          <div className="space-y-4">
            {inboxMessages.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400 py-4 text-center">{isRtl ? 'لا توجد رسائل جديدة' : 'No messages found'}</p>
            ) : (
              inboxMessages.map(m => (
                <div key={m.id} className={`p-4 rounded-xl border space-y-2 transition-all ${
                  m.is_read 
                    ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-80' 
                    : 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-blue-600 dark:text-blue-400">{m.name} ({m.email})</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">{m.created_at ? new Date(m.created_at).toLocaleDateString() : ''}</span>
                      {!m.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(m.id)}
                          className="px-2 py-0.5 rounded text-[10px] bg-blue-600 text-white font-bold hover:bg-blue-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3 h-3" />
                          <span>{isRtl ? 'تعليم كمقروء' : 'Mark as read'}</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteContact(m.id)}
                        className="text-rose-500 hover:text-rose-700 cursor-pointer p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white">{m.subject}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{m.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* --- MODAL DIALOGS --- */}

      {/* SKILL MODAL */}
      {modalType === 'skill' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white">
                {editingItem ? (isRtl ? 'تعديل المهارة' : 'Edit Skill') : (isRtl ? 'إضافة مهارة جديدة' : 'Add New Skill')}
              </h3>
              <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSkillSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">الاسم بالعربية *</label>
                  <input type="text" required value={skillForm.name_ar} onChange={e => setSkillForm({...skillForm, name_ar: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Name (EN) *</label>
                  <input type="text" required value={skillForm.name_en} onChange={e => setSkillForm({...skillForm, name_en: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">التصنيف *</label>
                  <select value={skillForm.category} onChange={e => setSkillForm({...skillForm, category: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none">
                    <option value="Frontend Development">Frontend Development</option>
                    <option value="AI & Smart Systems">AI & Smart Systems</option>
                    <option value="Cybersecurity & Networking">Cybersecurity & Networking</option>
                    <option value="Systems Architecture">Systems Architecture</option>
                    <option value="Other Competencies & Roles">Other Competencies & Roles (وظائف وخبرات أخرى)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">نسبة الإتقان (%) *</label>
                  <input type="number" min="1" max="100" required value={skillForm.proficiency} onChange={e => setSkillForm({...skillForm, proficiency: parseInt(e.target.value)})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{isRtl ? 'إلغاء' : 'Cancel'}</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-md">{isRtl ? 'حفظ' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT MODAL WITH IMAGE UPLOAD & PREVIEW */}
      {modalType === 'project' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white">
                {editingItem ? (isRtl ? 'تعديل مشروع' : 'Edit Project') : (isRtl ? 'إضافة مشروع جديد' : 'Add New Project')}
              </h3>
              <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              
              {/* Image Upload Box with Preview */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  {isRtl ? 'صورة المعاينة للمشروع (Project Image)' : 'Project Cover Image'}
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0 flex items-center justify-center text-slate-400">
                    {projectImagePreview ? (
                      <img src={projectImagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8" />
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center gap-2 cursor-pointer shadow-md">
                      <Upload className="w-4 h-4" />
                      <span>{isRtl ? 'رفع صورة جديدة' : 'Upload Image File'}</span>
                      <input type="file" accept="image/*" onChange={handleProjectImageFileChange} className="hidden" />
                    </label>
                    <input
                      type="text"
                      placeholder="https://example.com/project-image.jpg"
                      value={projectForm.cover_image}
                      onChange={e => {
                        setProjectForm({...projectForm, cover_image: e.target.value});
                        if (!projectImageFile) setProjectImagePreview(e.target.value);
                      }}
                      className="w-full px-3 py-2 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">العنوان بالعربية *</label>
                  <input type="text" required value={projectForm.title_ar} onChange={e => setProjectForm({...projectForm, title_ar: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Title (EN) *</label>
                  <input type="text" required value={projectForm.title_en} onChange={e => setProjectForm({...projectForm, title_en: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">ملخص بالعربية *</label>
                  <textarea rows={2} required value={projectForm.summary_ar} onChange={e => setProjectForm({...projectForm, summary_ar: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Summary (EN) *</label>
                  <textarea rows={2} required value={projectForm.summary_en} onChange={e => setProjectForm({...projectForm, summary_en: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">الوصف التفصيلي بالعربية *</label>
                  <textarea rows={3} required value={projectForm.description_ar} onChange={e => setProjectForm({...projectForm, description_ar: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Description (EN) *</label>
                  <textarea rows={3} required value={projectForm.description_en} onChange={e => setProjectForm({...projectForm, description_en: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">التصنيف *</label>
                  <select value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none">
                    <option value="AI & Smart Systems">AI & Smart Systems</option>
                    <option value="Cybersecurity & Networking">Cybersecurity & Networking</option>
                    <option value="Systems Architecture">Systems Architecture</option>
                    <option value="Frontend Development">Frontend Development</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">التقنيات (مفصولة بفاصلة) *</label>
                  <input type="text" required value={projectForm.tech_stack} onChange={e => setProjectForm({...projectForm, tech_stack: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" placeholder="React, Laravel, MySQL" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{isRtl ? 'إلغاء' : 'Cancel'}</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-md">{isRtl ? 'حفظ المشروع' : 'Save Project'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ARTICLE MODAL WITH IMAGE UPLOAD & PREVIEW */}
      {modalType === 'article' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white">
                {editingItem ? (isRtl ? 'تعديل المقال' : 'Edit Article') : (isRtl ? 'كتابة مقال جديد' : 'Write New Article')}
              </h3>
              <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleArticleSubmit} className="space-y-4">
              
              {/* Image Upload Box with Preview */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  {isRtl ? 'صورة الغلاف للمقال (Article Cover Image)' : 'Article Cover Image'}
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0 flex items-center justify-center text-slate-400">
                    {articleImagePreview ? (
                      <img src={articleImagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <BookOpen className="w-8 h-8" />
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center gap-2 cursor-pointer shadow-md">
                      <Upload className="w-4 h-4" />
                      <span>{isRtl ? 'رفع صورة غلاف' : 'Upload Cover File'}</span>
                      <input type="file" accept="image/*" onChange={handleArticleImageFileChange} className="hidden" />
                    </label>
                    <input
                      type="text"
                      placeholder="https://example.com/article-cover.jpg"
                      value={articleForm.cover_image}
                      onChange={e => {
                        setArticleForm({...articleForm, cover_image: e.target.value});
                        if (!articleImageFile) setArticleImagePreview(e.target.value);
                      }}
                      className="w-full px-3 py-2 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">العنوان بالعربية *</label>
                  <input type="text" required value={articleForm.title_ar} onChange={e => setArticleForm({...articleForm, title_ar: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Title (EN) *</label>
                  <input type="text" required value={articleForm.title_en} onChange={e => setArticleForm({...articleForm, title_en: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">الملخص بالعربية *</label>
                  <textarea rows={2} required value={articleForm.summary_ar} onChange={e => setArticleForm({...articleForm, summary_ar: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Summary (EN) *</label>
                  <textarea rows={2} required value={articleForm.summary_en} onChange={e => setArticleForm({...articleForm, summary_en: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">محتوى المقال بالعربية *</label>
                  <textarea rows={4} required value={articleForm.content_ar} onChange={e => setArticleForm({...articleForm, content_ar: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Content (EN) *</label>
                  <textarea rows={4} required value={articleForm.content_en} onChange={e => setArticleForm({...articleForm, content_en: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">التصنيف *</label>
                  <select value={articleForm.category} onChange={e => setArticleForm({...articleForm, category: e.target.value})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none">
                    <option value="Systems Architecture">Systems Architecture</option>
                    <option value="AI & Smart Systems">AI & Smart Systems</option>
                    <option value="Cybersecurity & Networking">Cybersecurity & Networking</option>
                    <option value="Frontend Development">Frontend Development</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">وقت القراءة (بالدقائق) *</label>
                  <input type="number" min="1" required value={articleForm.read_time_minutes} onChange={e => setArticleForm({...articleForm, read_time_minutes: parseInt(e.target.value)})} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{isRtl ? 'إلغاء' : 'Cancel'}</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-md">{isRtl ? 'حفظ المقال' : 'Save Article'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
