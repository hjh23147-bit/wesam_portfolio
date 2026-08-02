import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { sendContactMessage, getProfile } from '../services/api';
import { Mail, Send, CheckCircle2, AlertCircle, ShieldCheck, MapPin, Phone, MessageSquare } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();
  const { isRtl } = useLanguage();

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({ type: '', msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactEmail = profile?.email || 'wlnedari@gmail.com';
  const contactPhone = profile?.phone || '+967 781668332';
  const contactLocation = profile ? (isRtl ? profile.location_ar : profile.location_en) : (isRtl ? 'الجمهورية اليمنية' : 'Yemen');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', msg: '' });

    try {
      const res = await sendContactMessage(formData);
      if (res.status === 'success') {
        setStatus({ type: 'success', msg: t('contact.successMsg') });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', msg: res.message || t('contact.errorMsg') });
      }
    } catch {
      setStatus({ type: 'error', msg: t('contact.errorMsg') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800">
          {t('contact.title')}
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {isRtl ? 'تواصل معي واقترح فكرتك' : 'Let\'s Discuss Your Project'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Information & Channels */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="glass-card rounded-2xl p-8 border border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <span>{isRtl ? 'معلومات التواصل المباشر' : 'Direct Contact Info'}</span>
            </h3>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">{t('contact.emailLabel')}</span>
                  <a href={`mailto:${contactEmail}`} className="font-bold text-slate-900 dark:text-white hover:text-blue-500">
                    {contactEmail}
                  </a>
                </div>
              </div>

              {contactPhone && (
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">{isRtl ? 'الهاتف' : 'Phone'}</span>
                    <a href={`tel:${contactPhone}`} className="font-bold text-slate-900 dark:text-white hover:text-blue-500">
                      {contactPhone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">{isRtl ? 'الموقع' : 'Location'}</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {contactLocation}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                {isRtl ? 'حماية نموذج الاتصال' : 'Protected Contact Gateway'}
              </span>
              <p className="text-slate-500 dark:text-slate-400">
                {isRtl ? 'النموذج محمّن بخصائص Google reCAPTCHA ضد الرسائل العشوائية.' : 'Secured with Google reCAPTCHA anti-spam layers.'}
              </p>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 glass-card rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {status.msg && (
              <div className={`p-4 rounded-xl text-sm flex items-center gap-3 ${
                status.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
              }`}>
                {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <span>{status.msg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t('contact.nameLabel')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.namePlaceholder')}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t('contact.emailLabel')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact.emailPlaceholder')}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t('contact.subjectLabel')}
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t('contact.subjectPlaceholder')}
                className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t('contact.messageLabel')} <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.messagePlaceholder')}
                className="w-full px-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Google reCAPTCHA Notice & Badge */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>Protected by Google reCAPTCHA</span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Privacy - Terms</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-extrabold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{t('contact.sending')}</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t('contact.sendButton')}</span>
                </>
              )}
            </button>

          </form>
        </motion.div>

      </div>

    </div>
  );
}
