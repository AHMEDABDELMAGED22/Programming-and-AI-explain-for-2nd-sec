'use client';

import { motion } from 'framer-motion';
import { useLessonStore } from '@/store/lessonStore';

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLessonStore();

  return (
    <motion.button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200
        text-slate-600 text-xs font-bold transition-all cursor-pointer touch-target border border-slate-200"
      whileTap={{ scale: 0.95 }}
      title={locale === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
    >
      <span className={locale === 'en' ? 'text-primary-600' : 'text-slate-400'}>EN</span>
      <span className="text-slate-300">|</span>
      <span className={locale === 'ar' ? 'text-primary-600' : 'text-slate-400'}>عربي</span>
    </motion.button>
  );
}
