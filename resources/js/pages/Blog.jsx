import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { getArticles } from '../services/api';
import ArticleCard from '../components/ArticleCard';
import { Search, BookOpen } from 'lucide-react';

export default function Blog() {
  const { t } = useTranslation();
  const { isRtl } = useLanguage();

  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getArticles(activeCategory, searchQuery).then(setArticles);
  }, [activeCategory, searchQuery]);

  const categories = [
    { key: 'all', label: t('blog.all') },
    { key: 'Systems Architecture', label: t('skills.catArchitecture') },
    { key: 'AI & Smart Systems', label: t('skills.catAi') },
    { key: 'Cybersecurity', label: t('skills.catSecurity') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800">
          {t('blog.title')}
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {isRtl ? 'المدونة والأبحاث التقنية' : 'Technical Articles & Research'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
          {t('blog.subtitle')}
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Category Tabs */}
        <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.key
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('blog.searchPlaceholder')}
            className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-2 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 rtl:right-3 rtl:left-auto top-3" />
        </div>

      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-16 space-y-4 glass-card rounded-2xl p-8">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <p className="text-slate-500 font-medium">
            {isRtl ? 'لم يتم العثور على مقالات مطابقة.' : 'No articles match your search criteria.'}
          </p>
        </div>
      )}

    </div>
  );
}
