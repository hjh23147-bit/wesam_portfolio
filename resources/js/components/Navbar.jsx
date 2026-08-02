import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { getProfile } from '../services/api';
import { Sun, Moon, Languages, Menu, X, Code2, ShieldCheck, Cpu, User } from 'lucide-react';

export default function Navbar() {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLanguage } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = () => {
      getProfile().then(setProfile);
    };
    fetchProfile();

    window.addEventListener('profile-updated', fetchProfile);
    return () => window.removeEventListener('profile-updated', fetchProfile);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/skills', label: t('nav.skills') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path) => location.pathname === path;

  const isAdminLoggedIn = !!localStorage.getItem('admin_token');
  const adminPath = isAdminLoggedIn ? '/admin' : '/admin/login';

  // Dynamic profile avatar for header logo
  const profileAvatar = profile?.avatar || null;
  const profileName = profile ? (lang === 'ar' ? profile.name_ar : profile.name_en) : (lang === 'ar' ? 'وسام النظاري' : 'Wesam Al-Nathari');
  const profileTagline = profile ? (lang === 'ar' ? profile.title_ar?.split('،')[0] || 'هندسة وأنظمة ذكية' : profile.title_en?.split(',')[0] || 'Systems & AI Engineer') : (lang === 'ar' ? 'هندسة وأنظمة ذكية' : 'Systems & AI Engineer');

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Dynamic with Profile Picture */}
          <Link to="/" className="flex items-center gap-3 group">
            {profileAvatar ? (
              <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-blue-500/40 shadow-lg shadow-blue-500/15 group-hover:scale-105 group-hover:border-blue-500/70 transition-all duration-300">
                <img
                  src={profileAvatar}
                  alt={profileName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg></div>';
                  }}
                />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-wide bg-gradient-to-r from-blue-700 via-blue-500 to-sky-500 dark:from-blue-400 dark:via-sky-300 dark:to-blue-200 bg-clip-text text-transparent">
                {profileName}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wider line-clamp-1 max-w-[200px]">
                {profileTagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/80 dark:border-slate-700/60 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Controls (Theme, Language, Admin) */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 transition-all duration-300 cursor-pointer"
              title="Switch Language"
            >
              <Languages className="w-4 h-4 text-blue-500" />
              <span>{lang === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 cursor-pointer"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
            </button>

            {/* Admin Link */}
            <Link
              to={adminPath}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-600 hover:text-white transition-all duration-300"
              title={t('nav.admin')}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t('nav.admin')}</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-blue-600 dark:text-blue-400"
            >
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                isActive(link.path)
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to={adminPath}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{t('nav.admin')}</span>
          </Link>
        </div>
      )}
    </header>
  );
}
