import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { getSkills } from '../services/api';
import SkillBadge from '../components/SkillBadge';
import { Code2, Cpu, ShieldCheck, Network, Layers } from 'lucide-react';

export default function Skills() {
  const { t } = useTranslation();
  const { isRtl } = useLanguage();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getSkills().then(setSkills);
  }, []);

  const categories = [
    { key: 'Frontend Development', label: t('skills.catFrontend'), icon: Code2, color: 'from-blue-600 to-sky-500' },
    { key: 'AI & Smart Systems', label: t('skills.catAi'), icon: Cpu, color: 'from-blue-700 to-indigo-600' },
    { key: 'Cybersecurity & Networking', label: t('skills.catSecurity'), icon: ShieldCheck, color: 'from-indigo-600 to-blue-800' },
    { key: 'Systems Architecture', label: t('skills.catArchitecture'), icon: Network, color: 'from-blue-800 to-sky-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800">
          {t('skills.title')}
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {isRtl ? 'الخبرات والمهارات الهندسية' : 'Engineering Skills & Expertise'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
          {t('skills.subtitle')}
        </p>
      </div>

      {/* Domain Categorized Grids */}
      <div className="space-y-12">
        {categories.map((cat, idx) => {
          const categorySkills = skills.filter(s => s.category === cat.key);
          const IconComp = cat.icon;

          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-6"
            >
              {/* Category Title Header */}
              <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${cat.color} text-white flex items-center justify-center shadow-lg`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {cat.label}
                </h2>
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                  {categorySkills.length} {isRtl ? 'مهارات' : 'skills'}
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorySkills.map(skill => (
                  <SkillBadge key={skill.id} skill={skill} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
