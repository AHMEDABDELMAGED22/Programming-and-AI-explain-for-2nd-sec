'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';
import { useLessonStore } from '@/store/lessonStore';
import AvatarCallout from '@/components/interactive/AvatarCallout';
import ImportantInfo from '@/components/interactive/ImportantInfo';

export default function LessonIntro() {
  const { t, dir, isAr } = useTranslation();
  const { openVideo } = useLessonStore();
  const [avatarMsgIdx] = useState(0);
  const [badgeTaps, setBadgeTaps] = useState(0);

  const handleBadgeClick = () => {
    const next = badgeTaps + 1;
    if (next >= 5) {
      useLessonStore.getState().toggleTeacherMode();
      setBadgeTaps(0);
    } else {
      setBadgeTaps(next);
      setTimeout(() => setBadgeTaps(0), 3000);
    }
  };

  const avatarMessages = [
    isAr ? 'جاهز تعرف إزاي الكمبيوتر اتطور من أوضة كاملة مليانة أسلاك لحاجة في جيبك؟ يلا نبدأ الرحلة سوا! 🚀' : "Ready to discover how computers evolved from a room full of wires to something in your pocket? Let's go! 🚀",
    isAr ? 'معاك أ/ أحمد عبد المجيد.. هنفهم مع بعض الدرس ده بطريقة تفاعلية وممتعة! 👀' : "Eng. Ahmed Abdelmaged here — let's explore this lesson interactively and make it simple! 👀",
    isAr ? 'كل تكنولوجيا بتستخدمها النهاردة وراها حكاية شيقة وتغير حقيقي في المجتمع.. تعال نكتشفها! 💡' : "Every technology you use today has a fascinating history of transforming society. Let's explore! 💡",
  ];

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
    <section id="section-intro" className="min-h-0 md:min-h-screen flex flex-col justify-start md:justify-center px-3.5 sm:px-6 pt-6 pb-12 md:py-20 max-w-5xl mx-auto relative overflow-hidden bg-mesh-hero" dir={dir}>
      {/* Decorative ambient background blur */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

      {/* Lesson number badge & Teacher Credit Byline (Fix 4 & Hidden 5-tap activation for Fix 1) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4"
      >
        <button
          onClick={handleBadgeClick}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-primary-600 to-indigo-600 text-white text-xs sm:text-sm font-black tracking-wide shadow-md shadow-primary-500/20 cursor-pointer select-none active:scale-95 transition-transform"
          title={isAr ? 'الدرس ١-١' : 'Lesson 1-1'}
        >
          <span>{t('lessonBadge', '📘 الدرس ١-١')}</span>
        </button>

        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 border border-slate-200/90 shadow-2xs">
          <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden ring-1 ring-amber-400">
            <Image
              src="/assets/lesson1/avatar.webp"
              alt="أ/ أحمد عبد المجيد"
              fill
              className="object-cover"
              sizes="24px"
            />
          </div>
          <span className="text-[11px] sm:text-xs font-black text-slate-800">
            {isAr ? 'إعداد وشرح: أ/ أحمد عبد المجيد' : 'Taught by: Eng. Ahmed Abdelmaged'}
          </span>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-2xl sm:text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-1.5 sm:mb-3 ${isAr ? 'text-right' : ''}`}
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
        transition={{ delay: 0.3 }}
        className={`text-xs sm:text-base text-slate-500 font-semibold mb-4 sm:mb-6 ${isAr ? 'text-right font-sans' : 'arabic-text'}`}
      >
        {isAr ? 'Development of Information Technology & Social Transformation' : 'تطور تكنولوجيا المعلومات والتحول الاجتماعي'}
      </motion.p>

      {/* Mini Visual Progression Timeline (Compact on mobile) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="max-w-4xl mb-5 sm:mb-8 p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md border border-indigo-100 shadow-md sm:shadow-xl relative overflow-hidden"
      >
        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] sm:text-sm font-black text-slate-800 tracking-wide">
              {isAr ? '⚡ مسار تطور تكنولوجيا المعلومات عبر 5 حقب' : '⚡ 5 Eras of IT Evolution'}
            </span>
          </div>
          <button
            onClick={() => document.getElementById('section-timeline')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[11px] sm:text-xs font-bold text-primary-600 hover:text-primary-700 cursor-pointer flex items-center gap-1"
          >
            <span>{isAr ? 'استكشف بالتفصيل' : 'Explore Timeline'}</span>
            <span>↓</span>
          </button>
        </div>

        {/* 5 Milestone Cards with compact mobile sizing */}
        <div className="grid grid-cols-5 gap-1 sm:gap-3 relative">
          {[
            { year: '1940s', titleAr: 'الحواسيب الأولى', titleEn: 'Birth of PC', icon: '🔬', bg: 'bg-amber-50/80 border-amber-200' },
            { year: '1970s', titleAr: 'الحاسوب الشخصي', titleEn: 'Personal PC', icon: '💻', bg: 'bg-blue-50/80 border-blue-200' },
            { year: '1990s', titleAr: 'الإنترنت والويب', titleEn: 'Internet & Web', icon: '🌐', bg: 'bg-cyan-50/80 border-cyan-200' },
            { year: '2000s', titleAr: 'الهواتف الذكية', titleEn: 'Smartphones', icon: '📱', bg: 'bg-purple-50/80 border-purple-200' },
            { year: '2010s+', titleAr: 'السحابية والذكاء', titleEn: 'Cloud & AI', icon: '☁️', bg: 'bg-indigo-50/80 border-indigo-200' },
          ].map((era) => (
            <motion.button
              key={era.year}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('section-timeline')?.scrollIntoView({ behavior: 'smooth' })}
              className={`p-1.5 sm:p-3 rounded-xl sm:rounded-2xl border ${era.bg} flex flex-col items-center justify-center text-center cursor-pointer transition-all shadow-2xs`}
            >
              <span className="text-base sm:text-2xl mb-0.5 sm:mb-1">{era.icon}</span>
              <span className="text-[9px] sm:text-xs font-black text-slate-800 leading-tight">
                {era.year}
              </span>
              <span className="text-[9px] sm:text-[11px] font-bold text-slate-600 truncate max-w-full hidden sm:block mt-0.5">
                {isAr ? era.titleAr : era.titleEn}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Opening narrative paragraph with cleanly wrapped badge tags */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="max-w-3xl mb-6 sm:mb-8"
      >
        <p className={`text-sm sm:text-lg text-slate-700 leading-relaxed sm:leading-loose ${isAr ? 'text-right' : ''}`}>
          {isAr ? (
            <>
              في يوم عادي، يتفقد طالب في مصر الرسائل على تطبيق{' '}
              <span className="inline-flex items-center px-2 py-0.5 mx-0.5 my-0.5 rounded-lg bg-blue-100/90 text-blue-900 font-extrabold text-xs sm:text-sm border border-blue-300 shadow-2xs whitespace-nowrap">
                📱 SNS
              </span>
              ، ويدفع ثمن الإفطار بتطبيق{' '}
              <span className="inline-flex items-center px-2 py-0.5 mx-0.5 my-0.5 rounded-lg bg-emerald-100/90 text-emerald-900 font-extrabold text-xs sm:text-sm border border-emerald-300 shadow-2xs whitespace-nowrap">
                💳 دفع إلكتروني
              </span>
              ، وينضم إلى درس عبر{' '}
              <span className="inline-flex items-center px-2 py-0.5 mx-0.5 my-0.5 rounded-lg bg-violet-100/90 text-violet-900 font-extrabold text-xs sm:text-sm border border-violet-300 shadow-2xs whitespace-nowrap">
                🎓 التعلم عبر الإنترنت
              </span>
              ، ويطلب كتابًا من متجر{' '}
              <span className="inline-flex items-center px-2 py-0.5 mx-0.5 my-0.5 rounded-lg bg-amber-100/90 text-amber-900 font-extrabold text-xs sm:text-sm border border-amber-300 shadow-2xs whitespace-nowrap">
                🛍️ تجارة إلكترونية
              </span>
              . قبل عشرين عامًا، لم يكن معظم هذا ممكنًا.
            </>
          ) : (
            <>
              On an ordinary day, a student in Egypt checks messages on an{' '}
              <span className="inline-flex items-center px-2 py-0.5 mx-0.5 my-0.5 rounded-lg bg-blue-100 text-blue-900 font-extrabold text-xs sm:text-sm border border-blue-300 whitespace-nowrap">
                📱 SNS app
              </span>
              , pays for breakfast with a{' '}
              <span className="inline-flex items-center px-2 py-0.5 mx-0.5 my-0.5 rounded-lg bg-emerald-100 text-emerald-900 font-extrabold text-xs sm:text-sm border border-emerald-300 whitespace-nowrap">
                💳 cashless app
              </span>
              , joins a lesson through{' '}
              <span className="inline-flex items-center px-2 py-0.5 mx-0.5 my-0.5 rounded-lg bg-violet-100 text-violet-900 font-extrabold text-xs sm:text-sm border border-violet-300 whitespace-nowrap">
                🎓 online learning
              </span>
              , and orders a book from an{' '}
              <span className="inline-flex items-center px-2 py-0.5 mx-0.5 my-0.5 rounded-lg bg-amber-100 text-amber-900 font-extrabold text-xs sm:text-sm border border-amber-300 whitespace-nowrap">
                🛍️ e-commerce shop
              </span>
              . Twenty years ago, most of this was not possible.
            </>
          )}
        </p>
      </motion.div>

      {/* Guiding Question Box (Problem 2 & 3 - Distinct Deep Sapphire/Navy treatment) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="rounded-3xl p-5 sm:p-7 max-w-3xl mb-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white shadow-xl border border-indigo-700/60 relative overflow-hidden"
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

        <div className={`flex items-start gap-4 relative z-10 ${isAr ? 'flex-row-reverse' : ''}`}>
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl font-black flex-shrink-0 shadow-lg shadow-amber-400/25">
            ❓
          </div>
          <div className={`${isAr ? 'text-right' : ''}`}>
            <h3 className="font-black text-amber-300 text-sm sm:text-base uppercase tracking-wider mb-1.5">
              {t('guidingQuestionLabel', 'السؤال التوجيهي للدرس')}
            </h3>
            <p className="text-white text-base sm:text-xl font-bold leading-relaxed">
              {t('guidingQuestion', 'كيف تطورت تكنولوجيا المعلومات عبر مراحلها الرئيسية، وكيف غيّرت كل مرحلة المجتمع؟')}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Important Info callout (Problem 2 & 3 - Distinct Warm Golden Amber treatment) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="max-w-3xl mb-6 sm:mb-8"
      >
        <ImportantInfo
          contentEn="At each stage, information technology introduced a new technology or service and also changed how society communicates, works, and does business."
          contentAr="في كل مرحلة، قدمت تكنولوجيا المعلومات تقنية أو خدمة جديدة، وغيّرت أيضًا كيفية تواصل المجتمع وعمله وتجارته."
        />
      </motion.div>

      {/* Avatar callout (Fix 2 - Personality-driven Egyptian Arabic copy) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="max-w-3xl mb-6"
      >
        <AvatarCallout
          message={avatarMessages[avatarMsgIdx]}
          type="focus"
        />
      </motion.div>

      {/* Full-width High-Impact Video Preview Card (Fix 2) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="mt-8 max-w-3xl card-interactive overflow-hidden bg-white border-2 border-slate-200/90 shadow-xl rounded-3xl"
      >
        {/* Large Prominent Video Thumbnail with Centered Play Button */}
        <div
          onClick={() => openVideo('6CYMPGJOwNk', 'youtube')}
          className="relative aspect-video w-full bg-slate-950 cursor-pointer group overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://img.youtube.com/vi/6CYMPGJOwNk/maxresdefault.jpg"
            alt="الدرس 1-1: تطور تكنولوجيا المعلومات والتحول الاجتماعي"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://img.youtube.com/vi/6CYMPGJOwNk/hqdefault.jpg';
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 group-hover:from-black/70 transition-colors flex items-center justify-center">
            {/* Large Centered Play Button with Pulse Aura */}
            <div className="relative flex items-center justify-center">
              <span className="absolute w-24 h-24 rounded-full bg-red-600/40 animate-ping" />
              <div className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center text-3xl font-bold shadow-2xl group-hover:scale-115 group-hover:bg-red-500 transition-all duration-300">
                ▶
              </div>
            </div>
          </div>

          {/* Quality badge overlay */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-bold backdrop-blur-xs flex items-center gap-1.5 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>1080p Full HD</span>
          </div>
        </div>

        {/* Title and Short Description below Thumbnail */}
        <div className={`p-5 sm:p-6 bg-white ${isAr ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-black border border-red-200"
              style={{ color: '#991b1b' }}
            >
              🎬 {isAr ? 'الشرح الشامل بالفيديو' : 'Full Video Lesson'}
            </span>
          </div>
          <h3
            className="text-lg sm:text-xl font-black text-slate-950 mb-1.5 leading-snug"
            style={{ color: '#0f172a', fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}
          >
            {isAr ? 'الدرس 1-1: تطور تكنولوجيا المعلومات والتحول الاجتماعي' : 'Lesson 1-1: Development of IT & Social Transformation'}
          </h3>
          <p
            className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed"
            style={{ color: '#334155' }}
          >
            {isAr ? 'شاهد الشرح الكامل للدرس الأول مع أ/ أحمد عبد المجيد وحل نماذج الأسئلة بأسلوب مبسط.' : 'Watch the comprehensive video explanation and exam practice with Eng. Ahmed Abdelmaged.'}
          </p>

          <div className="mt-4">
            <button
              onClick={() => openVideo('6CYMPGJOwNk', 'youtube')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
            >
              <span>▶️</span>
              <span>{isAr ? 'مشاهدة الفيديو الآن' : 'Watch Full Video'}</span>
            </button>
          </div>
        </div>
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
