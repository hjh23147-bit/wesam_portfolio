import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { getArticleBySlug } from '../services/api';
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, BookOpen } from 'lucide-react';

export default function BlogDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { isRtl } = useLanguage();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticleBySlug(slug).then(setArticle);
  }, [slug]);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  const title = isRtl ? article.title_ar : article.title_en;
  const content = isRtl ? article.content_ar : article.content_en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Back Link */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
      >
        {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        <span>{t('blog.backToBlog')}</span>
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
          {article.category}
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          {title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-slate-500 font-medium pt-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-500" />
            {article.read_time_minutes || 5} {t('blog.readTime')}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-500" />
            {article.published_at ? new Date(article.published_at).toLocaleDateString() : '2026'}
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl max-h-96 bg-slate-900 border border-slate-200 dark:border-slate-800">
        <img
          src={article.cover_image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200'}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content View */}
      <article className="glass-card rounded-2xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 leading-relaxed text-base space-y-6">
        <div className="prose dark:prose-invert max-w-none whitespace-pre-line">
          {content}
        </div>
      </article>

    </div>
  );
}
