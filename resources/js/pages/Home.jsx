import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { getSkills, getProjects, getArticles, getProfile } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import ArticleCard from '../components/ArticleCard';
import SkillBadge from '../components/SkillBadge';
import { Download, ArrowRight, ArrowLeft, Cpu, ShieldCheck, Layers, Code2, Sparkles, Terminal, CheckCircle2, User } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();
  const { isRtl } = useLanguage();

  const [skills, setSkills] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getSkills().then(setSkills);
    getProjects().then(data => setFeaturedProjects(data.slice(0, 3)));
    getArticles().then(data => setLatestArticles(data.slice(0, 2)));
    getProfile().then(setProfile);
  }, []);

  const heroName = profile ? (isRtl ? profile.name_ar : profile.name_en) : t('hero.name');
  const heroTitle = profile ? (isRtl ? profile.title_ar : profile.title_en) : t('hero.title');
  const heroBio = profile ? (isRtl ? profile.bio_ar : profile.bio_en) : t('hero.bio');
  const cvUrl = profile?.cv_url || '/CV_Wesam_Alnathari.pdf';

  return (
    <div className="space-y-24">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-8 overflow-hidden">
        {/* Glow Background Blurs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 dark:bg-blue-600/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/15 dark:bg-sky-500/15 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Column */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:rtl:text-right lg:ltr:text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>{isRtl ? 'متاح للفرص والمشاريع المتقدمة' : 'Available for Advanced Projects & Opportunities'}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {t('hero.greeting')}{' '}
              <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400 dark:from-blue-400 dark:via-sky-300 dark:to-blue-200 bg-clip-text text-transparent block mt-1">
                {heroName}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300">
              {heroTitle}
            </p>

            {/* Bio */}
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {heroBio}
            </p>

            {/* CTA Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href={cvUrl}
                download
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center gap-2.5 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>{t('hero.downloadCv')}</span>
              </a>

              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700 shadow-lg flex items-center gap-2.5 transition-all duration-300"
              >
                <span>{t('hero.contactMe')}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>

            {/* Key Engineering Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-center">
                <span className="block text-xl font-black text-blue-600 dark:text-blue-400">99.9%</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{isRtl ? 'استقرار المعمارية' : 'Architecture Uptime'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-center">
                <span className="block text-xl font-black text-blue-600 dark:text-blue-400">10+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{isRtl ? 'حلول ومعماريات' : 'Enterprise Solutions'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-center">
                <span className="block text-xl font-black text-blue-600 dark:text-blue-400">100%</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{isRtl ? 'التزام بالأمان' : 'OWASP Compliant'}</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Animated Code / Architecture Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl glass-card border border-slate-200 dark:border-slate-800 p-6 shadow-2xl shadow-blue-500/10 space-y-4">
              
              {/* Card Header Window Control */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Terminal className="w-3.5 h-3.5 text-blue-500" />
                  <span>wesam-architecture.ts</span>
                </div>
              </div>

              {/* Code Snippet */}
              <pre className="text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed overflow-x-auto p-3 rounded-xl bg-slate-900 text-slate-200 dir-ltr text-left">
<code>{`interface Engineer {
  name: "Wesam Waleed Al-Nathari";
  focus: ["Systems Architecture", "Frontend", "AI"];
  securityLevel: "OWASP Compliant";
  techStack: {
    frontend: ["React", "Tailwind CSS", "Framer Motion"],
    backend: ["Laravel", "MySQL", "REST APIs"],
    ai: ["TensorFlow", "Computer Vision", "NLP"]
  };
  getStatus(): "Ready to innovate";
}`}</code>
              </pre>

              {/* Verified Badges */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  <span>{isRtl ? 'تصميم مخططات DFD & ERD عالية الدقة' : 'High-precision DFD & ERD System Diagrams'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  <span>{isRtl ? 'واجهات متجاوبة مع الوضع الداكن ودعم ثنائي اللغة' : 'Responsive Dark/Light & Bilingual (RTL/LTR)'}</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {t('projects.subtitle')}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {t('projects.title')}
            </h2>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>{t('hero.viewProjects')}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* SKILLS PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {t('skills.subtitle')}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {t('skills.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.slice(0, 8).map(skill => (
            <SkillBadge key={skill.id} skill={skill} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/skills"
            className="px-6 py-3 rounded-xl text-sm font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-600 hover:text-white transition-all inline-flex items-center gap-2"
          >
            <span>{isRtl ? 'عرض شبكة المهارات بالكامل' : 'View Full Skills Matrix'}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </section>

      {/* LATEST BLOG POSTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {t('blog.subtitle')}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {t('blog.title')}
            </h2>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>{t('hero.readBlog')}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {latestArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

    </div>
  );
}
