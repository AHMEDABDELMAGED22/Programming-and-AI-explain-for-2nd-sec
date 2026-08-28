'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
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
  { id: 'stop-and-think', labelEn: 'Think', labelAr: 'تفكير', icon: '💭' },
  { id: 'review', labelEn: 'Review', labelAr: 'مراجعة', icon: '⭐' },
];

export default function Navigation() {
  const { activeSection, setActiveSection, isClassroomMode } = useLessonStore();
  const { isAr, dir } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isClassroomMode) return null;

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  const activeSectionObj = sections.find((s) => s.id === activeSection) || sections[0];

  return (
    <>
      {/* ============================================================
          DESKTOP SIDEBAR (Visible only on md: screens and above)
          Matches original desktop design exactly.
         ============================================================ */}
      <nav
        className={`hidden md:flex fixed top-0 h-full w-20 bg-white border-slate-200
          flex-col items-center py-4 gap-0.5 z-50 shadow-sm nav-sidebar
          ${isAr ? 'right-0 border-l' : 'left-0 border-r'}`}
      >
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
                ${
                  activeSection === section.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                }`}
              title={isAr ? section.labelAr : section.labelEn}
            >
              {activeSection === section.id && (
                <motion.div
                  layoutId="desktop-nav-indicator"
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

      {/* ============================================================
          MOBILE TOP APP BAR (Visible only on < md screens)
         ============================================================ */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200 z-50 px-3 flex items-center justify-between shadow-xs"
        dir={dir}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
            1-1
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800 leading-tight">
              {isAr ? 'تطور تكنولوجيا المعلومات' : 'IT & Social Transformation'}
            </span>
            <span className="text-[10px] text-primary-600 font-medium">
              {activeSectionObj.icon} {isAr ? activeSectionObj.labelAr : activeSectionObj.labelEn}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 text-sm hover:bg-slate-200 transition-colors"
            aria-label="Toggle section menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* ============================================================
          MOBILE SECTION MENU DROPDOWN
         ============================================================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed top-14 left-0 right-0 bg-white/98 backdrop-blur-lg border-b border-slate-200 shadow-xl z-50 p-3 max-h-[75vh] overflow-y-auto"
            dir={dir}
          >
            <div className="grid grid-cols-2 gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    isAr ? 'flex-row-reverse text-right' : ''
                  } ${
                    activeSection === section.id
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="truncate">{isAr ? section.labelAr : section.labelEn}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
          MOBILE BOTTOM NAVIGATION BAR
         ============================================================ */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 px-1.5 py-1 flex items-center justify-between shadow-lg"
        dir={dir}
      >
        <div className="flex items-center justify-around w-full gap-0.5 overflow-x-auto scrollbar-none py-0.5">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex-1 min-w-[36px] max-w-[48px] py-1 px-0.5 rounded-lg flex flex-col items-center justify-center transition-all ${
                activeSection === section.id
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title={isAr ? section.labelAr : section.labelEn}
            >
              <span className="text-sm leading-none">{section.icon}</span>
              <span className="text-[7.5px] font-medium leading-tight truncate mt-0.5">
                {isAr ? section.labelAr : section.labelEn}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
