'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';
import { useLessonStore } from '@/store/lessonStore';
import AvatarCallout from '@/components/interactive/AvatarCallout';
import StopAndThink from '@/components/interactive/StopAndThink';

export default function FinalReview() {
  const [showAnswer, setShowAnswer] = useState(false);
  const { t, dir, isAr } = useTranslation();
  const { openVideo } = useLessonStore();

  return (
    <section id="section-review" className="py-14 md:py-24 px-3 sm:px-6 bg-gradient-to-b from-slate-50 via-amber-50/20 to-indigo-50/40 relative overflow-hidden" dir={dir}>
      {/* Decorative ambient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 text-white text-xs sm:text-sm font-black tracking-wide mb-3 sm:mb-4 shadow-md shadow-amber-500/20">
            {t('reviewBadge', '⭐ انتهى الدرس')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-2 leading-tight" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
            {t('reviewTitle', 'مراجعة وتأمل')}
          </h2>
          <p className="text-indigo-800 font-semibold text-sm sm:text-base">
            {isAr ? 'Final Synthesis & Reflection — خلاصة الدرس الأول وتحديات الفهم' : 'Final Synthesis & Reflection'}
          </p>
        </motion.div>

        {/* Key Takeaway */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="key-fact-card rounded-2xl p-4 sm:p-8 mb-6 sm:mb-10"
        >
          <div className={`flex items-start gap-3 sm:gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
            <span className="text-3xl sm:text-4xl flex-shrink-0">⭐</span>
            <div className={isAr ? 'text-right' : ''}>
              <h3 className="font-bold text-primary-800 text-lg sm:text-xl mb-2 sm:mb-3">
                {t('keyTakeaway', 'النقطة الأساسية — تذكّر')}
              </h3>
              <p className="text-slate-800 text-base sm:text-xl leading-relaxed">
                {isAr
                  ? 'تطورت تكنولوجيا المعلومات على مراحل — الحواسيب، الإنترنت، الهواتف الذكية، والحوسبة السحابية. في كل مرحلة قدّمت تقنية أو خدمة جديدة وغيّرت أيضًا كيفية تواصل المجتمع وعمله وتعلّمه ودفع أمواله.'
                  : 'Information technology developed in stages — computers, the Internet, smartphones, and cloud computing. At each stage it introduced a new technology or service and also changed how society communicates, works, learns, and pays.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Return to Guiding Question */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-interactive p-4 sm:p-8 mb-6 sm:mb-10"
        >
          <div className={`flex items-start gap-3 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
            <span className="text-3xl">❓</span>
            <div className={isAr ? 'text-right' : ''}>
              <h3 className="font-bold text-primary-800 text-lg mb-1">
                {t('guidingAnswered', 'السؤال التوجيهي — الإجابة')}
              </h3>
              <p className="text-slate-700 text-lg italic mb-4">
                {isAr
                  ? 'كيف تطورت تكنولوجيا المعلومات عبر مراحلها الرئيسية، وكيف غيّرت كل مرحلة المجتمع؟'
                  : 'How has information technology developed through its major stages, and how has each stage changed society?'}
              </p>
            </div>
          </div>

          {!showAnswer ? (
            <div className={isAr ? 'text-right' : 'text-left'}>
              <motion.button
                onClick={() => setShowAnswer(true)}
                className="touch-target px-8 py-4 rounded-2xl bg-primary-600 text-white font-semibold text-lg
                  hover:bg-primary-700 active:scale-95 transition-all cursor-pointer shadow-md"
                whileTap={{ scale: 0.95 }}
              >
                {t('revealTheAnswer', '✅ أظهر الإجابة')}
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-accent-50 border border-accent-200 rounded-xl p-6 ${isAr ? 'text-right' : ''}`}
            >
              <p className="text-slate-700 text-lg leading-relaxed">
                {isAr
                  ? 'تقدمت تكنولوجيا المعلومات عبر سلسلة من المراحل بدلاً من خطوة واحدة، وكل مرحلة غيّرت ما هو أكثر بكثير من التكنولوجيا نفسها. فمع انتشار الحوسبة، أصبحت المعلومات عالمية ثم محمولة، وانتقلت العديد من الأنشطة اليومية إلى الإنترنت، ونمت تكنولوجيا المعلومات لتصبح خدمة تدعم تحليل البيانات الضخمة والذكاء الاصطناعي. كما أحدثت كل مرحلة تغيرات اجتماعية في كيفية تواصل الأفراد وعملهم وتعلّمهم ومدفوعاتهم. وبشكل عام، فإن تطور تكنولوجيا المعلومات لا يقتصر على الآلات الأسرع، بل أعاد في كل مرحلة تشكيل الحياة اليومية والصناعة وطريقة تعامل المجتمع مع المعلومات.'
                  : 'Information technology advanced through a series of stages rather than in a single step, and each stage changed much more than the technology itself. As computing spread, information became global and then mobile, many everyday activities moved online, and information technology grew into a service that supports large-scale data analysis and AI. Each stage also brought social changes in how people communicate, work, learn, and make payments. Overall, the development of information technology is not only about faster machines; at every stage it has reshaped daily life, industry, and the way society handles information.'}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Reflect & Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 mb-10"
        >
          <StopAndThink
            questionEn="Which stage of information technology do you think will matter most in the next ten years? Give one reason. Was your prediction at the start of the lesson correct? What changed your mind?"
            questionAr="أي مرحلة من مراحل تكنولوجيا المعلومات تعتقد أنها ستكون الأكثر أهمية في السنوات العشر القادمة؟ اذكر سببًا واحدًا. هل كان توقعك في بداية الدرس صحيحًا؟ ما الذي غير رأيك؟"
            hintEn="Think about which era's technologies (cloud computing, edge computing, AI, quantum) are still evolving the fastest."
            hintAr="فكّر في تقنيات أي حقبة (الحوسبة السحابية، الحوسبة الطرفية، الذكاء الاصطناعي، الكم) التي لا تزال تتطور بأسرع وتيرة."
          />

          <div className="think-card rounded-2xl p-6">
            <div className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
              <span className="text-3xl">🏆</span>
              <div className={isAr ? 'text-right' : ''}>
                <h4 className="font-semibold text-violet-700 text-lg mb-2">
                  {t('reflectChallenge', 'التحدي')}
                </h4>
                <p className="text-slate-700 text-lg leading-relaxed">
                  {isAr
                    ? 'اختر تقنية ناشئة واحدة من هذا الدرس (القيادة الذاتية، الواقع المعزز AR، الواقع الافتراضي VR، أو الحوسبة الكمية). اقترح طريقة واحدة يمكن أن تساعد بها في حل مشكلة حقيقية، واذكر خطرًا أو تحديًا محتملاً واحدًا.'
                    : 'Choose one emerging technology from this lesson (autonomous driving, AR, VR, or quantum computing). Suggest one way it could help solve a real problem, and state one risk.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* In a New Context */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-interactive p-8 mb-10"
        >
          <div className={`flex items-start gap-3 mb-2 ${isAr ? 'flex-row-reverse' : ''}`}>
            <span className="text-3xl">🌍</span>
            <div className={isAr ? 'text-right' : ''}>
              <h4 className="font-bold text-slate-800 text-lg">
                {t('inNewContext', 'في سياق جديد')}
              </h4>
              <p className="text-slate-600 mt-2 text-lg leading-relaxed">
                {isAr
                  ? 'قرية لم يكن بها أي وصول إلى الإنترنت تم ربطها بالإنترنت عالي السرعة ونظام الدفع الإلكتروني لأول مرة. باستخدام المراحل والتغيرات الاجتماعية التي درستها، توقع طريقتين ستتغير بهما الحياة اليومية في القرية، وحدد مشكلة جديدة واحدة قد تواجهها القرية.'
                  : 'A village that has never had Internet access is connected to high-speed Internet and cashless payment for the first time. Using the stages and social changes you studied, predict two ways daily life in the village will change, and identify one new problem the village may face.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Avatar closing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <AvatarCallout
            message={isAr ? 'عمل رائع! لقد استكشفت رحلة تطور تكنولوجيا المعلومات والمجتمع بالكامل. 🎉' : "Great work! You've explored the full journey of IT and society. 🎉"}
            type="important"
          />
        </motion.div>

        {/* Full Lesson YouTube CTA Card (Task 3) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-interactive p-6 sm:p-8 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white rounded-3xl shadow-xl mb-10 overflow-hidden relative"
        >
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 ${isAr ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
                {isAr ? '🎬 المراجعة الشاملة بالفيديو' : '🎬 Full Video Review'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
                {isAr ? 'تابع شرح الدرس الأول كاملاً وحل نماذج الامتحانات على اليوتيوب' : 'Watch the Full Lesson 1 Explanation & Exam Practice on YouTube'}
              </h3>
              <p className="text-white/90 text-sm sm:text-base max-w-xl">
                {isAr
                  ? 'اشترك في القناة ليصلك شرح باقي دروس مادة البرمجة والذكاء الاصطناعي للصف الثاني الثانوي أولاً بأول.'
                  : 'Subscribe to the channel for upcoming Programming & AI lessons and exam solutions.'}
              </p>
            </div>

            <div className="flex w-full sm:w-auto flex-shrink-0">
              <button
                onClick={() => openVideo('6CYMPGJOwNk', 'youtube')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 active:scale-95 text-red-600 font-black text-base shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>▶️</span>
                <span>{isAr ? 'مشاهدة الفيديو الشامل' : 'Watch Full Video'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Visual lesson complete indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 shadow-sm ${isAr ? 'flex-row-reverse' : ''}`}>
            <span className="text-3xl">🎓</span>
            <div className={isAr ? 'text-right' : 'text-left'}>
              <p className="font-bold text-slate-800">{t('lessonComplete', 'الدرس ١-١ مكتمل')}</p>
              <p className="text-sm text-slate-500">{t('lessonCompleteSub', 'تطور تكنولوجيا المعلومات والتحول الاجتماعي')}</p>
            </div>
          </div>
        </motion.div>

        {/* Teacher Signature & Credit Card (Fix 4) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start"
        >
          <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse text-right' : 'text-left'}`}>
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-400 shadow-md flex-shrink-0">
              <Image
                src="/assets/lesson1/avatar.webp"
                alt="أ/ أحمد عبد المجيد"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <p className="font-black text-slate-800 text-sm">
                {isAr ? 'الدرس من إعداد وشرح: أ/ أحمد عبد المجيد' : 'Prepared & Taught by: Eng. Ahmed Abdelmaged'}
              </p>
              <p className="text-slate-500 text-xs">
                {isAr ? 'خبير مادة البرمجة والذكاء الاصطناعي — الصف الثاني الثانوي' : 'Secondary Computer Science & AI Curriculum'}
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/201552136249"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-2 border border-slate-200"
          >
            <span>💬</span>
            <span>{isAr ? 'تواصل مع المعلم على واتساب' : 'Contact Teacher on WhatsApp'}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
