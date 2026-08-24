'use client';

import { motion } from 'framer-motion';
import { useLessonStore } from '@/store/lessonStore';
import { useTranslation } from '@/lib/i18n';
import LanguageToggle from './LanguageToggle';

const sections = [
  { id: 'intro', labelEn: 'Lesson', labelAr: 'الدرس', icon: '📖' },
  { id: 'timeline', labelEn: 'Timeline', labelAr: 'الزمني', icon: '⏳' },
  { id: 'moores-law', labelEn: "Moore's", labelAr: 'مور', icon: '📈' },
  { id: 'social', labelEn: 'Social', labelAr: 'اجتماعي', icon: '🌍' },
  { id: 'emerging', labelEn: 'Tech', labelAr: 'تقنيات', icon: '🚀' },
  { id: 'comparisons', labelEn: 'Compare', labelAr: 'مقارنات', icon: '⚖️' },
  { id: 'practice', labelEn: 'Practice', labelAr: 'تدريب', icon: '✏️' },
  { id: 'exam', labelEn: 'Exam', labelAr: 'امتحان', icon: '📝' },
  { id: 'review', labelEn: 'Review', labelAr: 'مراجعة', icon: '⭐' },
];

export default function Navigation() {
  const { activeSection, setActiveSection, isClassroomMode } = useLessonStore();
  const { isAr } = useTranslation();

  if (isClassroomMode) return null;

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`fixed top-0 h-full w-20 bg-white border-slate-200
      flex flex-col items-center py-4 gap-0.5 z-50 shadow-sm nav-sidebar
      ${isAr ? 'right-0 border-l' : 'left-0 border-r'}`}>
      {/* Logo */}
      <div className="mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
          1-1
        </div>
      </div>

      {/* Language toggle */}
      <div className="mb-3">
        <LanguageToggle />
      </div>

      {/* Section buttons */}
      <div className="flex-1 flex flex-col items-center gap-0.5 overflow-y-auto">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`relative w-14 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5
              transition-all duration-200 group touch-target cursor-pointer
              ${activeSection === section.id
                ? 'bg-primary-50 text-primary-700'
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            title={isAr ? section.labelAr : section.labelEn}
          >
            {activeSection === section.id && (
              <motion.div
                layoutId="nav-indicator"
                className={`absolute top-1/2 -translate-y-1/2 w-1 h-7 bg-primary-600 rounded-full
                  ${isAr ? 'right-0 rounded-r-none rounded-l-full' : 'left-0 rounded-l-none rounded-r-full'}`}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              />
            )}
            <span className="text-base leading-none">{section.icon}</span>
            <span className="text-[8px] font-medium leading-tight">
              {isAr ? section.labelAr : section.labelEn}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
