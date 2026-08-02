import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { getProjects } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import { Filter, Layers } from 'lucide-react';

export default function Projects() {
  const { t } = useTranslation();
  const { isRtl } = useLanguage();

  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    getProjects(activeCategory).then(setProjects);
  }, [activeCategory]);

  const categories = [
    { key: 'all', label: t('projects.all') },
    { key: 'AI & Smart Systems', label: t('skills.catAi') },
    { key: 'Cybersecurity & Networking', label: t('skills.catSecurity') },
    { key: 'Systems Architecture', label: t('skills.catArchitecture') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800">
          {t('projects.title')}
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {isRtl ? 'معرض المشاريع والأعمال الهندسية' : 'Portfolio & Engineering Projects'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
          {t('projects.subtitle')}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeCategory === cat.key
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-16 space-y-4 glass-card rounded-2xl p-8">
          <Layers className="w-12 h-12 text-slate-400 mx-auto" />
          <p className="text-slate-500 font-medium">
            {isRtl ? 'لا توجد مشاريع في هذا التصنيف حالياً.' : 'No projects found in this category.'}
          </p>
        </div>
      )}

    </div>
  );
}
