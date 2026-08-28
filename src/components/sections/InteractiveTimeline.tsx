'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLessonStore } from '@/store/lessonStore';
import { useTranslation } from '@/lib/i18n';
import { timelineEras } from '@/data/timelineData';
import EraExplorer from './EraExplorer';
import TeacherNote from '@/components/interactive/TeacherNote';

export default function InteractiveTimeline() {
  const { selectedEra, setSelectedEra, animationResetKey } = useLessonStore();
  const { t, dir, isAr } = useTranslation();

  return (
    <section id="section-timeline" className="py-14 md:py-24 px-3 sm:px-6 bg-mesh-amber border-y border-amber-200/60 relative overflow-hidden" dir={dir}>
      {/* Decorative ambient blur */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-300/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs sm:text-sm font-black tracking-wide mb-3 sm:mb-4 shadow-md shadow-amber-500/20">
            {t('timelineBadge', '⏳ تاريخ تكنولوجيا المعلومات')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-2 sm:mb-3 leading-tight" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
            {t('timelineTitle', 'التسلسل الزمني التفاعلي')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium">
            {t('timelineSubtitle', 'اضغط على أي حقبة لاستكشاف تقنياتها وتأثيرها وأمثلتها الواقعية')}
          </p>
        </motion.div>

        <TeacherNote
          content="Walk students through the timeline chronologically. Tap each era to reveal content step-by-step. After all eras, transition to Moore's Law to explain WHY technology advanced so quickly."
          type="transition"
          className="mb-6 md:mb-8 flex justify-center"
        />

        {/* Timeline */}
        <div className="relative" key={animationResetKey}>
          {/* Connector line */}
          <div className="absolute top-[52px] left-0 right-0 h-[3px] bg-amber-200/80 rounded-full hidden md:block" />
          <motion.div
            className={`absolute top-[52px] h-[3px] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-full hidden md:block ${isAr ? 'right-0' : 'left-0'}`}
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          />

          {/* Era nodes */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-4 md:gap-6 relative z-10 ${isAr ? 'direction-rtl' : ''}`}>
            {timelineEras.map((era, index) => {
              const isSelected = selectedEra === era.id;
              return (
                <motion.button
                  key={era.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  onClick={() => setSelectedEra(isSelected ? null : era.id)}
                  className={`flex flex-col items-center text-center group cursor-pointer touch-target p-2.5 sm:p-3 rounded-2xl transition-all duration-300
                    ${isSelected
                      ? 'bg-primary-50 ring-2 ring-primary-400 shadow-lg scale-105'
                      : selectedEra && !isSelected
                        ? 'opacity-50 hover:opacity-80'
                        : 'hover:bg-slate-50'
                    }`}
                >
                  <motion.div
                    className={`w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center text-xl sm:text-2xl mb-2 sm:mb-3
                      transition-all duration-300 shadow-md
                      ${isSelected
                        ? 'bg-primary-600 text-white ring-4 ring-primary-200'
                        : 'bg-white border-2 border-slate-300 group-hover:border-primary-400'
                      }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {era.icon}
                  </motion.div>
                  <span className={`text-sm sm:text-lg font-bold mb-0.5 sm:mb-1 transition-colors
                    ${isSelected ? 'text-primary-700' : 'text-slate-700'}`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {era.period}
                  </span>
                  <span className={`text-xs sm:text-sm font-medium leading-tight transition-colors
                    ${isSelected ? 'text-primary-600' : 'text-slate-500'}`}>
                    {isAr ? era.titleAr : era.titleEn}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Key fact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="mt-8 sm:mt-12 key-fact-card rounded-2xl p-4 sm:p-5 max-w-3xl mx-auto"
        >
          <div className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
            <span className="text-xl sm:text-2xl flex-shrink-0">💡</span>
            <div className={isAr ? 'text-right' : ''}>
              <h4 className="font-semibold text-primary-800 text-xs sm:text-sm mb-1">{t('keyFactLabel', 'حقيقة مهمة')}</h4>
              <p className="text-slate-700 text-sm sm:text-base">
                {t('keyFactContent', 'في كل مرحلة، قدمت تكنولوجيا المعلومات تقنية أو خدمة جديدة، وغيّرت أيضًا كيفية تواصل المجتمع وعمله وتجارته.')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Era Explorer */}
        <AnimatePresence mode="wait">
          {selectedEra && (
            <motion.div
              key={selectedEra}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="mt-6 sm:mt-10 overflow-hidden"
            >
              <EraExplorer eraId={selectedEra} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
