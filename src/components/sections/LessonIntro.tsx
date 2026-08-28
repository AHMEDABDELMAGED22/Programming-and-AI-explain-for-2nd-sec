'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import AvatarCallout from '@/components/interactive/AvatarCallout';
import ImportantInfo from '@/components/interactive/ImportantInfo';

export default function LessonIntro() {
  const { t, dir, isAr } = useTranslation();

  const concepts = [
    { en: "Moore's Law", ar: "قانون مور" },
    { en: 'SNS', ar: 'SNS' },
    { en: 'E-commerce', ar: 'التجارة الإلكترونية' },
    { en: 'Remote Work', ar: 'العمل عن بُعد' },
    { en: 'Online Learning', ar: 'التعلم عبر الإنترنت' },
    { en: 'Cashless Payment', ar: 'الدفع الإلكتروني' },
    { en: 'Edge Computing', ar: 'الحوسبة الطرفية' },
    { en: 'Autonomous Driving', ar: 'القيادة الذاتية' },
    { en: 'AR / VR', ar: 'AR / VR' },
    { en: 'Quantum Computing', ar: 'الحوسبة الكمية' },
  ];

  return (
    <section id="section-intro" className="min-h-screen flex flex-col justify-center px-3 sm:px-6 py-10 md:py-16 max-w-5xl mx-auto" dir={dir}>
      {/* Lesson number badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 sm:mb-6"
      >
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-semibold">
          {t('lessonBadge', '📘 الدرس ١-١')}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-2 sm:mb-3 ${isAr ? 'text-right' : ''}`}
        style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}
      >
        {t('lessonTitle1', 'تطور تكنولوجيا المعلومات')}
        <br />
        <span className="text-primary-600">{t('lessonTitle2', 'والتحول الاجتماعي')}</span>
      </motion.h1>

      {/* Subtitle in other language */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`text-base sm:text-xl text-slate-400 mb-6 sm:mb-8 ${isAr ? 'text-right font-sans' : 'arabic-text'}`}
      >
        {isAr ? 'Development of Information Technology & Social Transformation' : 'تطور تكنولوجيا المعلومات والتحول الاجتماعي'}
      </motion.p>

      {/* Opening paragraph */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="max-w-3xl"
      >
        <p className={`text-base sm:text-xl text-slate-600 leading-relaxed mb-6 sm:mb-8 ${isAr ? 'text-right leading-loose' : ''}`}>
          {isAr ? (
            <>في يوم عادي، يتفقد طالب في مصر الرسائل على تطبيق <strong className="text-primary-700">SNS</strong>، ويدفع ثمن الإفطار بتطبيق <strong className="text-primary-700">دفع إلكتروني</strong>، وينضم إلى درس عبر <strong className="text-primary-700">التعلم عبر الإنترنت</strong>، ويطلب كتابًا من متجر <strong className="text-primary-700">تجارة إلكترونية</strong>. قبل عشرين عامًا، لم يكن معظم هذا ممكنًا.</>
          ) : (
            <>On an ordinary day, a student in Egypt checks messages on an <strong className="text-primary-700">SNS app</strong>, pays for breakfast with a <strong className="text-primary-700">cashless app</strong>, joins a lesson through <strong className="text-primary-700">online learning</strong>, and orders a book from an <strong className="text-primary-700">e-commerce shop</strong>. Twenty years ago, most of this was not possible.</>
          )}
        </p>
      </motion.div>

      {/* Guiding Question */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="key-fact-card rounded-2xl p-4 sm:p-6 max-w-3xl mb-6 sm:mb-8"
      >
        <div className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
          <span className="text-2xl sm:text-3xl flex-shrink-0">❓</span>
          <div className={`${isAr ? 'text-right' : ''}`}>
            <h3 className="font-semibold text-primary-800 text-base sm:text-lg mb-1">{t('guidingQuestionLabel', 'السؤال التوجيهي')}</h3>
            <p className="text-slate-700 text-base sm:text-xl leading-relaxed">
              {t('guidingQuestion', 'كيف تطورت تكنولوجيا المعلومات عبر مراحلها الرئيسية، وكيف غيّرت كل مرحلة المجتمع؟')}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Important Info callout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="max-w-3xl mb-6 sm:mb-8"
      >
        <ImportantInfo
          contentEn="At each stage, information technology introduced a new technology or service and also changed how society communicates, works, and does business."
          contentAr="في كل مرحلة، قدمت تكنولوجيا المعلومات تقنية أو خدمة جديدة، وغيّرت أيضًا كيفية تواصل المجتمع وعمله وتجارته."
        />
      </motion.div>

      {/* Avatar callout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <AvatarCallout
          message={t('avatarIntro', 'هيا نستكشف معًا — اضغط على التسلسل الزمني للبدء! 👀')}
          type="focus"
        />
      </motion.div>

      {/* Key Concepts preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-8 sm:mt-10 max-w-3xl"
      >
        <h4 className={`text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 ${isAr ? 'text-right' : ''}`}>
          {t('keyConcepts', '🔑 المفاهيم الأساسية في هذا الدرس')}
        </h4>
        <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
          {concepts.map((concept, i) => (
            <motion.span
              key={concept.en}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3 + i * 0.05 }}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs sm:text-sm font-medium border border-slate-200"
            >
              {isAr ? concept.ar : concept.en}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-12 sm:mt-16 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="text-slate-300"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
        <span className="text-xs text-slate-300 mt-1">{t('scrollToExplore', 'مرر للاستكشاف')}</span>
      </motion.div>
    </section>
  );
}
