<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Skill;
use App\Models\Project;
use App\Models\Article;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin User
        User::updateOrCreate(
            ['email' => 'admin@wesam.tech'],
            [
                'name' => 'وسام وليد النظاري',
                'password' => Hash::make('password123'),
            ]
        );

        // Skills
        $skills = [
            // Frontend
            ['name_ar' => 'تطوير الواجهات بـ React.js', 'name_en' => 'React.js Frontend Development', 'category' => 'Frontend Development', 'proficiency' => 95, 'icon' => 'Code2', 'sort_order' => 1],
            ['name_ar' => 'تنسيقات Tailwind CSS الحديثة', 'name_en' => 'Tailwind CSS Modern Styling', 'category' => 'Frontend Development', 'proficiency' => 98, 'icon' => 'Palette', 'sort_order' => 2],
            ['name_ar' => 'الحركات التفاعلية بـ Framer Motion', 'name_en' => 'Framer Motion UI Animations', 'category' => 'Frontend Development', 'proficiency' => 90, 'icon' => 'Zap', 'sort_order' => 3],
            ['name_ar' => 'جافاسكربت الحديثة ES6+ & TypeScript', 'name_en' => 'Modern JavaScript ES6+ & TypeScript', 'category' => 'Frontend Development', 'proficiency' => 92, 'icon' => 'FileCode', 'sort_order' => 4],
            
            // AI & Smart Systems
            ['name_ar' => 'الذكاء الاصطناعي وبناء النماذج الذكية', 'name_en' => 'AI & Machine Learning Models', 'category' => 'AI & Smart Systems', 'proficiency' => 88, 'icon' => 'Cpu', 'sort_order' => 5],
            ['name_ar' => 'تحليل البيانات ورؤية الحاسوب', 'name_en' => 'Data Analytics & Computer Vision', 'category' => 'AI & Smart Systems', 'proficiency' => 85, 'icon' => 'Brain', 'sort_order' => 6],
            ['name_ar' => 'معالجة اللغات الطبيعية (NLP)', 'name_en' => 'Natural Language Processing (NLP)', 'category' => 'AI & Smart Systems', 'proficiency' => 82, 'icon' => 'MessageSquareCode', 'sort_order' => 7],

            // Cybersecurity & Networking
            ['name_ar' => 'أمن الشبكات واختبار الاختراق', 'name_en' => 'Network Security & Penetration Testing', 'category' => 'Cybersecurity & Networking', 'proficiency' => 89, 'icon' => 'ShieldCheck', 'sort_order' => 8],
            ['name_ar' => 'تأمين واجهات API ومعايير OWASP', 'name_en' => 'API Hardening & OWASP Top 10', 'category' => 'Cybersecurity & Networking', 'proficiency' => 94, 'icon' => 'Lock', 'sort_order' => 9],
            ['name_ar' => 'إدارة البنية التحتية والشبكات', 'name_en' => 'Infrastructure & Network Administration', 'category' => 'Cybersecurity & Networking', 'proficiency' => 87, 'icon' => 'Server', 'sort_order' => 10],

            // Systems Architecture
            ['name_ar' => 'هندسة الأنظمة وتصميم Mappings & DFD/ERD', 'name_en' => 'Systems Architecture & DFD/ERD Modeling', 'category' => 'Systems Architecture', 'proficiency' => 96, 'icon' => 'Network', 'sort_order' => 11],
            ['name_ar' => 'إطار العمل Laravel (PHP)', 'name_en' => 'Laravel Framework (PHP)', 'category' => 'Systems Architecture', 'proficiency' => 95, 'icon' => 'Layers', 'sort_order' => 12],
            ['name_ar' => 'قواعد البيانات MySQL & Query Optimization', 'name_en' => 'MySQL Database & Query Optimization', 'category' => 'Systems Architecture', 'proficiency' => 93, 'icon' => 'Database', 'sort_order' => 13],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }

        // Projects
        $projects = [
            [
                'title_ar' => 'منصة التحليلات الذكية المدعومة بالذكاء الاصطناعي',
                'title_en' => 'AI-Powered Smart Analytics Platform',
                'slug' => 'ai-smart-analytics-platform',
                'summary_ar' => 'منصة متكاملة لتحليل البيانات الضخمة والتنبؤ بالسلوكيات التشغيلية باستخدام الخوارزميات الذكية.',
                'summary_en' => 'An integrated platform for big data analytics and operational forecasting using smart AI algorithms.',
                'description_ar' => 'تم بناء هذه المنصة لتقديم لوحات تحكم تفاعلية تحلل سلوك المستخدمين وتتوقع أنماط النمو باستخدام نماذج التعلّم الآلي. تعتمد المنصة على معمارية microservices مخصصة توفر استجابة فائقة السرعة مع حماية عالية للبيانات.',
                'description_en' => 'Built to provide dynamic dashboards that analyze user behaviors and predict growth trends using Machine Learning models. The platform leverages a high-throughput microservices architecture with robust data encryption.',
                'category' => 'AI & Smart Systems',
                'tech_stack' => ['React', 'Python', 'Tailwind CSS', 'Laravel', 'MySQL', 'TensorFlow'],
                'cover_image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200',
                'architecture_diagram' => 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000',
                'live_url' => 'https://example.com/ai-analytics',
                'github_url' => 'https://github.com/wesam/ai-analytics-platform',
                'is_featured' => true,
            ],
            [
                'title_ar' => 'نظام إدارة الشبكات والتنود الآمن',
                'title_en' => 'Secure Enterprise Network & Threat Audit System',
                'slug' => 'secure-network-threat-audit',
                'summary_ar' => 'نظام أمني لرصد الثغرات وتحليل حزم البيانات في الوقت الفعلي مع تنبيهات استباقية.',
                'summary_en' => 'Security monitoring system for real-time vulnerability detection and packet inspection.',
                'description_ar' => 'نظام أمني عالي الأداء مخصص لمراقبة الحركة داخل الشبكات الداخلية والخارجية، وتجميع سجلات الأمان (SIEM Log Analytics)، والكشف عن الأنشطة المشبوهة لمنع الهجمات قبل حدوثها.',
                'description_en' => 'High-performance security monitoring system for inspecting internal and external network traffic, performing SIEM log analytics, and preemptively blocking threat vectors.',
                'category' => 'Cybersecurity & Networking',
                'tech_stack' => ['Laravel', 'React', 'Tailwind CSS', 'Docker', 'Python', 'Snort'],
                'cover_image' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200',
                'architecture_diagram' => 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000',
                'live_url' => 'https://example.com/network-sec',
                'github_url' => 'https://github.com/wesam/network-threat-system',
                'is_featured' => true,
            ],
            [
                'title_ar' => 'بوابة المعمارية السحابية الموزعة (API Gateway)',
                'title_en' => 'Distributed Cloud Architecture & Resilient API Gateway',
                'slug' => 'distributed-cloud-api-gateway',
                'summary_ar' => 'معمارية سحابية متقدمة تدعم التوسع الديناميكي ومعالجة آلاف الطلبات في الثانية.',
                'summary_en' => 'Advanced cloud API gateway supporting dynamic scaling and processing thousands of requests per second.',
                'description_ar' => 'مشروع هندسي يركز على بنية النظام الهيكلية، تصميم DFD متكامل، توزيع الأحمال (Load Balancing)، ومزامنة قواعد البيانات لضمان استمرارية الخدمة 99.99%.',
                'description_en' => 'Engineering architectural project focused on clean system boundaries, detailed DFD diagrams, load balancing, and high availability database replication.',
                'category' => 'Systems Architecture',
                'tech_stack' => ['Laravel', 'MySQL', 'Redis', 'Nginx', 'Docker', 'Tailwind CSS'],
                'cover_image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
                'architecture_diagram' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000',
                'live_url' => 'https://example.com/api-gateway',
                'github_url' => 'https://github.com/wesam/cloud-api-gateway',
                'is_featured' => true,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }

        // Articles
        $articles = [
            [
                'title_ar' => 'مبادئ تصميم المعماريات الموزعة للأنظمة المعقدة',
                'title_en' => 'Principles of Designing Resilient Distributed Systems Architecture',
                'slug' => 'principles-of-resilient-distributed-systems',
                'summary_ar' => 'دليل مهندسي لتصميم البنى التحتية المتكيفة، وتقليل الاعتمادات بين الخدمات الموزعة.',
                'summary_en' => 'An engineering guide to designing adaptive infrastructure and minimizing service coupling.',
                'content_ar' => "## مقدمة في تصميم الأنظمة الموزعة\n\nعند بناء الأنظمة الضخمة، تصبح معمارية الكتل الواحدة (Monolith) عائقاً أمام التوسع والسرعة. هنا تأتي الأنظمة الموزعة لتوزيع الأحمال وتوفير استمرارية العمل.\n\n```json\n{\n  \"architecture\": \"Microservices\",\n  \"resilience\": \"High\",\n  \"availability\": \"99.99%\"\n}\n```\n\n### أهم المحاور:\n1. **فصل المسؤوليات (Decoupling):** استخدام الرسائل المستقلة.\n2. **مخططات DFD & ERD:** رسم التدفق الواضح للبيانات قبل كتابة أي كود.\n3. **إدارة الحالة والتخزين المؤقت:** توظيف Redis لقواعد البيانات السرعة.",
                'content_en' => "## Introduction to Distributed Systems Design\n\nWhen scaling large-scale software applications, monolithic architectures often introduce deployment bottlenecks. Distributed architectures help isolate failures and scale components independently.\n\n```json\n{\n  \"architecture\": \"Microservices\",\n  \"resilience\": \"High\",\n  \"availability\": \"99.99%\"\n}\n```\n\n### Key Architectural Pillars:\n1. **Service Decoupling:** Utilizing asynchronous message queues.\n2. **DFD & ERD Diagrams:** Mapping system data flow prior to execution.\n3. **State Management & Caching:** Leveraging Redis to complement relational databases.",
                'category' => 'Systems Architecture',
                'cover_image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
                'read_time_minutes' => 6,
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'title_ar' => 'دمج نماذج الذكاء الاصطناعي مع تطبيقات الويب الحديثة',
                'title_en' => 'Integrating AI & ML Models with Modern Web Frameworks',
                'slug' => 'integrating-ai-models-modern-web',
                'summary_ar' => 'كيفية توظيف نماذج التعلّم العميق داخل تطبيقات React و Laravel بسلاسة وأداء عالٍ.',
                'summary_en' => 'How to seamlessly integrate Deep Learning models into React & Laravel web applications.',
                'content_ar' => "## تكامل الذكاء الاصطناعي مع الويب\n\nالنموذج الذكي لا تكتمل فائدته إلا عند ربطه بواجهة مستخدم سهلة وسريعة.\n\n```python\nimport tensorflow as tf\n\ndef predict_analytics(data_input):\n    model = tf.keras.models.load_model('model.h5')\n    return model.predict(data_input)\n```\n\n### خطوات التكامل الأساسية:\n- تقديم النماذج عبر **FastAPI** أو **Python Microservices**.\n- ربط الخدمات مع **Laravel REST API**.\n- عرض النتيجة تفاعلياً بـ **React & Framer Motion**.",
                'content_en' => "## Bridging AI and Web Interfaces\n\nAn AI model delivers maximum business value when encapsulated within a slick, user-friendly interface.\n\n```python\nimport tensorflow as tf\n\ndef predict_analytics(data_input):\n    model = tf.keras.models.load_model('model.h5')\n    return model.predict(data_input)\n```\n\n### Integration Workflow:\n- Exposing model predictions via a lightweight **Python API**.\n- Orchestrating business logic inside **Laravel REST API**.\n- Rendering real-time animations in **React & Framer Motion**.",
                'category' => 'AI & Smart Systems',
                'cover_image' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
                'read_time_minutes' => 8,
                'is_published' => true,
                'published_at' => now()->subDays(2),
            ],
        ];

        foreach ($articles as $article) {
            Article::create($article);
        }
    }
}
