import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { Clock, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ArticleCard({ article }) {
  const { t } = useTranslation();
  const { isRtl } = useLanguage();

  const title = isRtl ? article.title_ar : article.title_en;
  const summary = isRtl ? article.summary_ar : article.summary_en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 border border-slate-200 dark:border-slate-800 flex flex-col justify-between group transition-all duration-300"
    >
      <div>
        {/* Cover Image & Category */}
        <div className="relative h-48 overflow-hidden bg-slate-900">
          <img
            src={article.cover_image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          
          <span className="absolute top-4 left-4 right-auto rtl:right-4 rtl:left-auto px-3 py-1 rounded-full text-xs font-bold bg-blue-600/90 text-white backdrop-blur-md">
            {article.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              {article.read_time_minutes || 5} {t('blog.readTime')}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              {article.published_at ? new Date(article.published_at).toLocaleDateString() : '2026'}
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2">
            {summary}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/60 mt-4 flex items-center justify-between">
        <Link
          to={`/blog/${article.slug || article.id}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <span>{t('blog.readMore')}</span>
          {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>
    </motion.div>
  );
}
