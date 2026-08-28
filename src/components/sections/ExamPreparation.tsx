'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { examStyleQuestion } from '@/data/examQuestions';
import { useTranslation } from '@/lib/i18n';
import TeacherNote from '@/components/interactive/TeacherNote';
import AvatarCallout from '@/components/interactive/AvatarCallout';

export default function ExamPreparation() {
  const [step, setStep] = useState(0);
  const { t, dir, isAr } = useTranslation();
  // Steps: 0=question only, 1=command word, 2=think time, 3=hints, 4=required points, 5=model answer

  const advance = () => setStep(prev => Math.min(prev + 1, 5));
  const reset = () => setStep(0);

  const questionText = isAr && examStyleQuestion.questionAr ? examStyleQuestion.questionAr : examStyleQuestion.question;
  const commandWordText = isAr && examStyleQuestion.commandWordAr ? examStyleQuestion.commandWordAr : examStyleQuestion.commandWord;
  const hintsList = isAr && examStyleQuestion.hintsAr ? examStyleQuestion.hintsAr : examStyleQuestion.hints;
  const requiredPointsList = isAr && examStyleQuestion.requiredPointsAr ? examStyleQuestion.requiredPointsAr : examStyleQuestion.requiredPoints;
  const modelAnswerText = isAr && examStyleQuestion.answerAr ? examStyleQuestion.answerAr : examStyleQuestion.answer;

  return (
    <section id="section-exam" className="py-14 md:py-24 px-3 sm:px-6 bg-mesh-rose border-b border-rose-200/60 relative overflow-hidden" dir={dir}>
      {/* Decorative ambient blur */}
      <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-rose-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-red-600 text-white text-xs sm:text-sm font-black tracking-wide mb-3 sm:mb-4 shadow-md shadow-rose-500/20">
            {t('examBadge', '📝 التحضير للامتحان')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-2 leading-tight" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
            {t('examTitle', 'سؤال بأسلوب الامتحان')}
          </h2>
          <p className="text-rose-700 font-semibold text-sm sm:text-base">
            {t('examSubtitle', 'تدرّب على الإجابة كما في الامتحان الحقيقي')}
          </p>
        </motion.div>

        <TeacherNote
          content="Walk through this step by step. Show the question first. Highlight the command word 'Analyze'. Give students 30 seconds to think. Then reveal hints one by one. Finally show the model answer structure. Emphasize that all 3 required areas must be covered for full marks."
          type="say"
          className="mb-6 md:mb-8 flex justify-center"
        />

        {/* Exam question card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-interactive p-4 sm:p-6 md:p-10 border-rose-200/80 shadow-lg"
        >
          {/* Question */}
          <div className="exam-tip-card rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-s-4 border-rose-500 bg-gradient-to-r from-rose-50 via-white to-orange-50">
            <div className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
              <span className="text-3xl">📝</span>
              <div className={isAr ? 'text-right' : ''}>
                <div className={`flex items-center gap-3 mb-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <h4 className="font-bold text-rose-900 text-lg">{t('examTitle', 'سؤال بأسلوب الامتحان')}</h4>
                  <span className="px-3.5 py-1 rounded-full bg-rose-600 text-white text-xs sm:text-sm font-black shadow-xs">
                    [{examStyleQuestion.marks} {isAr ? 'درجات' : 'marks'}]
                  </span>
                </div>
                <p className="text-slate-900 text-lg sm:text-xl font-bold leading-relaxed">
                  {questionText}
                </p>
                <p className="text-slate-600 mt-2 text-sm italic">
                  {isAr ? 'في إجابتك، أشر إلى: ' : 'In your answer, refer to: '}
                  {requiredPointsList?.join(' • ')}
                </p>
              </div>
            </div>
          </div>

          {/* Step 1: Command Word */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                className="mb-6"
              >
                <div className={`bg-primary-50 border border-primary-200 rounded-xl p-5 ${isAr ? 'text-right' : ''}`}>
                  <h5 className={`font-bold text-primary-800 mb-2 flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                    🔑 {t('commandWord', 'الكلمة المفتاحية')}: <span className="text-primary-600 text-lg">&quot;{commandWordText}&quot;</span>
                  </h5>
                  <p className="text-slate-600">
                    {isAr ? (
                      <><strong>حلل (Analyze)</strong> تعني: تفكيك الموضوع إلى أجزائه الرئيسية، ودراسة كل جزء، وتوضيح العلاقات والتأثيرات بينها. لا تكتفِ بالوصف السطحي بل بيّن كيفية وأسباب التغيير.</>
                    ) : (
                      <><strong>Analyze</strong> means: break down the topic into parts, examine each part, and explain how they relate. You need to show understanding of the change, not just describe it.</>
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 2: Think time */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6"
              >
                <AvatarCallout
                  message={isAr ? 'خذ 30 ثانية للتفكير وصياغة النقاط الرئيسية قبل الاطلاع على التلميحات...' : 'Take 30 seconds to think before looking at the hints...'}
                  type="think"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Hints */}
          <AnimatePresence>
            {step >= 3 && hintsList && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                className="mb-6"
              >
                <div className={`think-card rounded-xl p-5 ${isAr ? 'text-right' : ''}`}>
                  <h5 className="font-bold text-violet-800 mb-3">{t('examHints', '💡 تلميحات الامتحان')}</h5>
                  <ul className="space-y-2">
                    {hintsList.map((hint, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: isAr ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.3 }}
                        className={`flex items-start gap-2 text-slate-700 ${isAr ? 'flex-row-reverse' : ''}`}
                      >
                        <span className="text-violet-500 mt-1">•</span>
                        <span>{hint}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4: Required points */}
          <AnimatePresence>
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                className="mb-6"
              >
                <div className={`bg-accent-50 border border-accent-200 rounded-xl p-5 ${isAr ? 'text-right' : ''}`}>
                  <h5 className="font-bold text-accent-800 mb-3">
                    📋 {t('requiredPoints', 'النقاط المطلوبة')} ({examStyleQuestion.marks} {isAr ? 'درجات' : 'marks'})
                  </h5>
                  <p className="text-slate-600 mb-3">
                    {isAr ? 'يجب أن تتضمن إجابتك المحاور التالية بالتفصيل:' : 'Your answer MUST include:'}
                  </p>
                  <div className={`flex flex-wrap gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                    {requiredPointsList?.map((point, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="px-4 py-2 rounded-xl bg-accent-100 text-accent-800 font-semibold text-sm border border-accent-200"
                      >
                        ✓ {point}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 5: Model answer */}
          <AnimatePresence>
            {step >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                className="mb-6"
              >
                <div className={`bg-white border-2 border-accent-400 rounded-xl p-6 shadow-sm ${isAr ? 'text-right' : ''}`}>
                  <h5 className="font-bold text-accent-700 mb-3 text-lg">{t('modelAnswer', '✅ هيكل الإجابة النموذجية')}</h5>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base">{modelAnswerText}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className={`flex flex-wrap gap-3 mt-6 ${isAr ? 'flex-row-reverse' : ''}`}>
            {step < 5 && (
              <motion.button
                onClick={advance}
                className="touch-target px-6 py-3 rounded-xl bg-warm-500 text-white font-semibold
                  hover:bg-warm-600 active:scale-95 transition-all cursor-pointer shadow-md"
                whileTap={{ scale: 0.95 }}
              >
                {step === 0 && t('showCommandWord', '🔑 أظهر الكلمة المفتاحية')}
                {step === 1 && t('thinkTime', '🤔 وقت التفكير')}
                {step === 2 && t('showHints', '💡 أظهر التلميحات')}
                {step === 3 && t('showRequiredPoints', '📋 أظهر النقاط المطلوبة')}
                {step === 4 && t('revealModelAnswer', '✅ أظهر الإجابة النموذجية')}
              </motion.button>
            )}
            {step > 0 && (
              <button
                onClick={reset}
                className="touch-target px-5 py-3 rounded-xl bg-slate-100 text-slate-600 font-medium
                  hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
              >
                {t('reset', '↺ إعادة')}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
