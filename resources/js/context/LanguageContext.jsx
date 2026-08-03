import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(() => localStorage.getItem('language') || 'ar');

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    // Keep document dir as 'ltr' so 3D HTML projection matrices project to 50% 50% without browser RTL offset bugs
    document.documentElement.dir = 'ltr';
    localStorage.setItem('language', lang);
  }, [lang, i18n]);

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, isRtl: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
