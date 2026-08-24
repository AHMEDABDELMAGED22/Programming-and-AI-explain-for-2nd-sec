'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';

interface StopAndThinkProps {
  questionEn: string;
  questionAr: string;
  hintEn?: string;
  hintAr?: string;
  answerEn?: string;
  answerAr?: string;
  className?: string;
}

export default function StopAndThink({
  questionEn,
  questionAr,
  hintEn,
  hintAr,
  answerEn,
  answerAr,
  className = '',
}: StopAndThinkProps) {
  const { t, dir, isAr } = useTranslation();
  const [step, setStep] = useState(0);
  const question = isAr ? questionAr : questionEn;
  const hint = isAr ? hintAr : hintEn;
  const answer = isAr ? answerAr : answerEn;

  const advance = () => {
    if (hint && step === 0) setStep(1);
    else if (answer && step < 2) setStep(2);
  };
  const reset = () => setStep(0);

  return (
    <div
      className={`rounded-2xl border-2 border-teal-300 bg-gradient-to-br from-teal-50 to-cyan-50 p-6 shadow-sm ${className}`}
      dir={dir}
    >
      {/* Header */}
      <div className={`flex items-center gap-3 mb-3 ${isAr ? 'flex-row-reverse' : ''}`}>
        <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white text-xl flex-shrink-0">
          🤔
        </div>
        <h4 className="font-bold text-teal-800 text-lg">{t('stopAndThink', 'توقف وفكر')}</h4>
      </div>

      {/* Question */}
      <p className={`text-slate-700 text-lg leading-relaxed mb-4 ${isAr ? 'text-right' : ''}`}>
        {question}
      </p>

      {/* Hint */}
      <AnimatePresence>
        {step >= 1 && hint && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0 }}
            className="mb-4"
          >
            <div className="bg-teal-100 border border-teal-200 rounded-xl p-4">
              <span className="text-sm font-medium text-teal-700">{t('hint', '💡 تلميح')}</span>
              <p className={`text-slate-600 mt-1 ${isAr ? 'text-right' : ''}`}>{hint}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer */}
      <AnimatePresence>
        {step >= 2 && answer && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0 }}
            className="mb-4"
          >
            <div className="bg-white border border-teal-200 rounded-xl p-4">
              <span className="text-sm font-medium text-teal-700">{t('keyPoint', '✅ نقطة أساسية')}</span>
              <p className={`text-slate-700 mt-1 font-medium ${isAr ? 'text-right' : ''}`}>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className={`flex gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
        {step < 2 && (hint || answer) && (
          <motion.button
            onClick={advance}
            className="touch-target px-6 py-3 rounded-xl bg-teal-600 text-white font-medium
              hover:bg-teal-700 active:scale-95 transition-all cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            {step === 0 && hint ? t('showHint', '💡 أظهر التلميح') : t('revealAnswerBtn', '✅ أظهر الإجابة')}
          </motion.button>
        )}
        {step > 0 && (
          <motion.button
            onClick={reset}
            className="touch-target px-5 py-3 rounded-xl bg-white text-slate-600 font-medium border border-slate-200
              hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            {t('reset', '↺ إعادة')}
          </motion.button>
        )}
      </div>
    </div>
  );
}
