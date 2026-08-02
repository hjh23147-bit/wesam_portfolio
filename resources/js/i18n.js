import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        skills: 'المهارات',
        projects: 'المشاريع',
        blog: 'المدونة التقنية',
        contact: 'تواصل معي',
        admin: 'الإدارة',
      },
      hero: {
        greeting: 'مرحباً، أنا',
        name: 'وسام وليد النظاري',
        title: 'مهندس أنظمة، مطور واجهات ومطوّر حلول ذكية',
        bio: 'متخصص في بناء منصات الويب الحديثة عالية الأداء، تصميم معمارية الأنظمة الموزعة، دمج حلول الذكاء الاصطناعي، وتأمين البنى التحتية البرمجية.',
        downloadCv: 'تحميل السيرة الذاتية',
        contactMe: 'تواصل معي مباشرة',
        viewProjects: 'استكشف المشاريع',
        readBlog: 'اقرأ المدونة',
      },
      skills: {
        title: 'المهارات والخبرات التقنية',
        subtitle: 'شبكة مهارات منظمة في مجالات الهندسة والتطوير المتقدم',
        catFrontend: 'تطوير الواجهات الأمامية (Frontend)',
        catAi: 'الذكاء الاصطناعي والأنظمة الذكية',
        catSecurity: 'الأمن السيبراني والشبكات',
        catArchitecture: 'هندسة الأنظمة وقواعد البيانات',
      },
      projects: {
        title: 'معرض الأعمال والمشاريع',
        subtitle: 'حلول برمجية متكاملة ومشاريع ذات معمارية هندسية رصينة',
        all: 'الكل',
        viewDetails: 'عرض تفاصيل المشروع',
        techStack: 'التقنيات المستخدمة',
        liveDemo: 'معاينة حية',
        githubRepo: 'المستودع (GitHub)',
        architectureDiagram: 'مخطط هندسة النظام (DFD / ERD)',
        backToProjects: 'العودة لمشاريع المعرض',
      },
      blog: {
        title: 'المدونة التقنية',
        subtitle: 'مقالات وأبحاث تطبيقية في هندسة الأنظمة والذكاء الاصطناعي',
        all: 'جميع التصنيفات',
        searchPlaceholder: 'ابحث في المقالات التقنية...',
        readMore: 'اقرأ المقال بالكامل',
        readTime: 'دقائق قراءة',
        backToBlog: 'العودة لجميع المقالات',
      },
      contact: {
        title: 'تواصل معي',
        subtitle: 'هل لديك مشروع أو فرصة عمل أو استشارة تقنية؟ يسعدني التواصل معك.',
        nameLabel: 'الاسم الكامل',
        namePlaceholder: 'أدخل اسمك...',
        emailLabel: 'البريد الإلكتروني',
        emailPlaceholder: 'example@domain.com',
        subjectLabel: 'الموضوع',
        subjectPlaceholder: 'عنون الرسالة...',
        messageLabel: 'الرسالة',
        messagePlaceholder: 'اكتب تفاصيل استفسارك أو مشروعك...',
        sendButton: 'إرسال الرسالة',
        sending: 'جاري الإرسال...',
        successMsg: 'تم إرسال رسالتك بنجاح! سأتواصل معك في أقرب وقت.',
        errorMsg: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.',
      },
      footer: {
        rights: 'جميع الحقوق محفوظة © 2026 وسام وليد النظاري',
        tagline: 'بناء المستقبل الرقمي بمعايير هندسية رصينة.',
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        skills: 'Skills',
        projects: 'Portfolio',
        blog: 'Tech Blog',
        contact: 'Contact',
        admin: 'Management',
      },
      hero: {
        greeting: "Hello, I'm",
        name: 'Wesam Waleed Al-Nathari',
        title: 'Systems Architect, Frontend & AI Solutions Engineer',
        bio: 'Specialized in building high-performance modern web platforms, designing resilient distributed architectures, integrating AI solutions, and hardening enterprise applications.',
        downloadCv: 'Download CV',
        contactMe: 'Get In Touch',
        viewProjects: 'Explore Portfolio',
        readBlog: 'Read Technical Blog',
      },
      skills: {
        title: 'Technical Skills & Expertise',
        subtitle: 'Structured domain matrix in modern engineering & advanced software development',
        catFrontend: 'Frontend Development',
        catAi: 'AI & Smart Systems',
        catSecurity: 'Cybersecurity & Networking',
        catArchitecture: 'Systems Architecture & Databases',
      },
      projects: {
        title: 'Portfolio & Featured Works',
        subtitle: 'End-to-end software solutions with clean engineering architecture',
        all: 'All Projects',
        viewDetails: 'View Project Details',
        techStack: 'Tech Stack',
        liveDemo: 'Live Demo',
        githubRepo: 'Source Code (GitHub)',
        architectureDiagram: 'System Architecture (DFD / ERD)',
        backToProjects: 'Back to Portfolio',
      },
      blog: {
        title: 'Technical Blog',
        subtitle: 'Applied research & articles on systems engineering, AI, and security',
        all: 'All Categories',
        searchPlaceholder: 'Search articles...',
        readMore: 'Read Full Article',
        readTime: 'min read',
        backToBlog: 'Back to Articles',
      },
      contact: {
        title: 'Get In Touch',
        subtitle: 'Have a project proposal, engineering consultation, or opportunity? Let\'s connect.',
        nameLabel: 'Full Name',
        namePlaceholder: 'Enter your name...',
        emailLabel: 'Email Address',
        emailPlaceholder: 'example@domain.com',
        subjectLabel: 'Subject',
        subjectPlaceholder: 'Message subject...',
        messageLabel: 'Message',
        messagePlaceholder: 'Write your project details or questions...',
        sendButton: 'Send Message',
        sending: 'Sending...',
        successMsg: 'Your message has been sent successfully!',
        errorMsg: 'Failed to send message. Please try again.',
      },
      footer: {
        rights: 'All Rights Reserved © 2026 Wesam Waleed Al-Nathari',
        tagline: 'Building the digital future with solid engineering standards.',
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
