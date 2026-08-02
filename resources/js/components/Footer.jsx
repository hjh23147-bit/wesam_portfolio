import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { getProfile } from '../services/api';
import { Mail, Phone, MapPin, Cpu, Heart } from 'lucide-react';
import { Github, Linkedin, Twitter, Whatsapp, Facebook } from './BrandIcons';

export default function Footer() {
  const { t } = useTranslation();
  const { lang, isRtl } = useLanguage();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const footerName = profile ? (lang === 'ar' ? profile.name_ar : profile.name_en) : (lang === 'ar' ? 'وسام وليد النظاري' : 'Wesam Waleed Al-Nathari');
  const footerTagline = profile ? (lang === 'ar' ? profile.bio_ar : profile.bio_en) : t('footer.tagline');
  const githubUrl = profile?.github_url || 'https://github.com';
  const linkedinUrl = profile?.linkedin_url || 'https://linkedin.com';
  const twitterUrl = profile?.twitter_url;
  const whatsappUrl = profile?.whatsapp_url || 'https://wa.me/967770000000';
  const facebookUrl = profile?.facebook_url || 'https://facebook.com';
  const emailAddr = profile?.email || 'wesam@alnathari.tech';
  const phoneNumber = profile?.phone || '+967 770 000 000';

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 mt-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          
          {/* Brand Info & Summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 dark:text-white">
                {footerName}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-md">
              {footerTagline}
            </p>

            {/* Social Icons Bar */}
            <div className="flex items-center gap-3 pt-2">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors"
                  title="WhatsApp"
                >
                  <Whatsapp className="w-4 h-4" />
                </a>
              )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-500 hover:text-white flex items-center justify-center transition-colors"
                  title="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Dynamic Contact Info Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-slate-900 dark:text-white text-sm font-bold tracking-wider uppercase">
              {isRtl ? 'معلومات التواصل' : 'Contact Details'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />
                <a href={`mailto:${emailAddr}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {emailAddr}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />
                <a href={`tel:${phoneNumber}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Whatsapp className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {isRtl ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Facebook className="w-4 h-4 text-blue-600 dark:text-blue-500 shrink-0" />
                <a href={facebookUrl} target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {isRtl ? 'صفحة فيسبوك' : 'Facebook Profile'}
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-slate-900 dark:text-white text-sm font-bold tracking-wider uppercase">
              {lang === 'ar' ? 'تصفح المنصة' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.home')}</a></li>
              <li><a href="/skills" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.skills')}</a></li>
              <li><a href="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.projects')}</a></li>
              <li><a href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.blog')}</a></li>
            </ul>
          </div>

          {/* Focus Areas */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-slate-900 dark:text-white text-sm font-bold tracking-wider uppercase">
              {lang === 'ar' ? 'مجالات التركيز' : 'Focus Areas'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>{t('skills.catArchitecture')}</li>
              <li>{t('skills.catFrontend')}</li>
              <li>{t('skills.catAi')}</li>
              <li>{t('skills.catSecurity')}</li>
            </ul>
          </div>

        </div>

        {/* Copyright Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>{t('footer.rights')}</p>
          <p className="flex items-center gap-1">
            <span>Designed & Built with</span>
            <Heart className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
            <span>using React, Tailwind CSS & Laravel</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
