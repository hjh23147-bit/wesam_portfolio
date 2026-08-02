import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import * as Icons from 'lucide-react';

export default function SkillBadge({ skill }) {
  const { isRtl } = useLanguage();
  const name = isRtl ? skill.name_ar : skill.name_en;

  // Dynamically resolve icon from Lucide
  const IconComponent = Icons[skill.icon] || Icons.Code2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-xl glass-card border border-slate-200 dark:border-slate-800 space-y-3 hover:border-blue-500/50 transition-all duration-300 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800">
            <IconComponent className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
            {name}
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/60">
          {skill.proficiency || 90}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency || 90}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400 rounded-full"
        />
      </div>
    </motion.div>
  );
}
