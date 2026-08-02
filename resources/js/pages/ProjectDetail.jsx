import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { getProjectBySlug } from '../services/api';
import { ExternalLink, ArrowLeft, ArrowRight, Layers, Network, CheckCircle } from 'lucide-react';
import { Github } from '../components/BrandIcons';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { isRtl } = useLanguage();
  const [project, setProject] = useState(null);

  useEffect(() => {
    getProjectBySlug(slug).then(setProject);
  }, [slug]);

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  const title = isRtl ? project.title_ar : project.title_en;
  const description = isRtl ? project.description_ar : project.description_en;
  const summary = isRtl ? project.summary_ar : project.summary_en;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Back Link */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
      >
        {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        <span>{t('projects.backToProjects')}</span>
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
          {project.category}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          {title}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {summary}
        </p>

        {/* Action Buttons & Tech Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-slate-200 dark:border-slate-800 py-4">
          <div className="flex flex-wrap gap-2">
            {project.tech_stack?.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>{t('projects.githubRepo')}</span>
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/25"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t('projects.liveDemo')}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Cover Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-200 dark:border-slate-800 max-h-96">
        <img
          src={project.cover_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200'}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Detailed Description */}
      <div className="glass-card rounded-2xl p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-blue-500" />
          <span>{isRtl ? 'تفاصيل ومعمارية النظام' : 'System Architecture & Details'}</span>
        </h2>
        <div className="text-slate-700 dark:text-slate-300 text-base leading-relaxed whitespace-pre-line space-y-4">
          {description}
        </div>
      </div>

      {/* Architecture Diagram Section (DFD / ERD) */}
      <div className="glass-card rounded-2xl p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {t('projects.architectureDiagram')}
              </h3>
              <p className="text-xs text-slate-500">
                {isRtl ? 'تخطيط تدفق البيانات وتكامل الوحدات (DFD & ERD Blueprint)' : 'Data Flow Diagram & Entity-Relationship Blueprint'}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 p-2">
          <img
            src={project.architecture_diagram || 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000'}
            alt="System Architecture Diagram"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      </div>

    </div>
  );
}
