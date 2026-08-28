'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { workedExampleQuestions, tryQuestions, BilingualExamQuestion } from '@/data/examQuestions';
import { useTranslation } from '@/lib/i18n';
import TeacherNote from '@/components/interactive/TeacherNote';

export default function WorkedExample() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showSolutions, setShowSolutions] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'worked' | 'try'>('worked');
  const { t, dir, isAr } = useTranslation();

  const toggleSolution = (id: string) => {
    setShowSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectAnswer = (qId: string, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  const questions: BilingualExamQuestion[] = activeTab === 'worked' ? workedExampleQuestions : tryQuestions;

  return (
    <section id="section-practice" className="py-12 md:py-20 px-3 sm:px-6 bg-slate-50" dir={dir}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t('practiceBadge', '✏️ تدريب وتطبيق')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2 leading-tight" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
            {t('practiceTitle', 'أمثلة محلولة وتدريبات')}
          </h2>
        </motion.div>

        <TeacherNote
          content="Use the worked examples to model exam technique. Show students the question first, let them think, then reveal the answer step by step. For 'Try' questions, give students 3-5 minutes before revealing solutions."
          type="say"
          className="mb-6 md:mb-8 flex justify-center"
        />

        {/* Tab switcher */}
        <div className={`flex justify-center gap-2 mb-6 sm:mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={() => setActiveTab('worked')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer touch-target
              ${activeTab === 'worked' ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            {t('workedExample', '✎ مثال محلول')}
          </button>
          <button
            onClick={() => setActiveTab('try')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer touch-target
              ${activeTab === 'try' ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            {t('tryIt', '🎯 جرّب بنفسك')}
          </button>
        </div>

        {/* Questions */}
        <div className="space-y-4 sm:space-y-6">
          {questions.map((q, i) => {
            const questionText = isAr && q.questionAr ? q.questionAr : q.question;
            const currentOptions = isAr && q.optionsAr ? q.optionsAr : q.options;
            const currentMatches = isAr && q.matchItemsAr ? q.matchItemsAr : q.matchItems;
            const currentAnswer = isAr && q.answerAr ? q.answerAr : q.answer;
            const currentExplanation = isAr && q.explanationAr ? q.explanationAr : q.explanation;

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-interactive p-4 sm:p-6"
              >
                {/* Question */}
                <div className={`flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className={`text-slate-800 text-base sm:text-lg leading-relaxed flex-1 ${isAr ? 'text-right' : ''}`}>
                    {questionText}
                  </p>
                </div>

                {/* Multiple choice options */}
                {q.type === 'multiple-choice' && currentOptions && (
                  <div className={`space-y-2 mb-4 ${isAr ? 'mr-0 sm:mr-11' : 'ml-0 sm:ml-11'}`}>
                    {currentOptions.map((opt) => {
                      const isSelected = selectedAnswers[q.id] === opt.label;
                      const isShowingSolution = showSolutions[q.id];
                      const isCorrect = opt.isCorrect;
                      return (
                        <button
                          key={opt.label}
                          onClick={() => selectAnswer(q.id, opt.label)}
                          className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border transition-all cursor-pointer touch-target ${isAr ? 'text-right' : 'text-left'}
                            ${isShowingSolution && isCorrect
                              ? 'bg-accent-50 border-accent-400 ring-2 ring-accent-300'
                              : isShowingSolution && isSelected && !isCorrect
                                ? 'bg-rose-50 border-rose-300'
                                : isSelected
                                  ? 'bg-primary-50 border-primary-400 ring-2 ring-primary-300'
                                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                          <div className={`flex items-center gap-2.5 sm:gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0
                              ${isSelected ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                              {opt.label}
                            </span>
                            <span className="text-slate-700 text-xs sm:text-sm flex-1">{opt.text}</span>
                            {isShowingSolution && isCorrect && <span className="text-accent-600 font-bold">✓</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Matching items */}
                {q.type === 'matching' && currentMatches && (
                  <div className={`space-y-2 mb-4 ${isAr ? 'mr-0 sm:mr-11' : 'ml-0 sm:ml-11'}`}>
                    {currentMatches.map((item) => (
                      <div key={item.label} className={`p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm ${isAr ? 'text-right' : ''}`}>
                        <div className={`flex items-center justify-between gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                          <span className="text-slate-700 font-medium">{item.label}. {item.description}</span>
                          {showSolutions[q.id] && (
                            <span className="font-bold text-accent-700 bg-accent-50 px-2 py-0.5 rounded text-xs whitespace-nowrap">
                              {item.correctMatch}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Fill blank preview */}
                {q.type === 'fill-blank' && !showSolutions[q.id] && (
                  <div className={`mb-4 ${isAr ? 'mr-11 text-right' : 'ml-11'}`}>
                    <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 border border-dashed border-slate-300 text-slate-400 text-sm italic">
                      {isAr ? 'اضغط على كشف الإجابة للتحقق' : 'Click reveal to check answer'}
                    </div>
                  </div>
                )}

                {/* Solution reveal */}
                <div className={`flex items-center gap-3 ${isAr ? 'mr-11 flex-row-reverse' : 'ml-11'}`}>
                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="touch-target px-5 py-2 rounded-xl bg-primary-50 text-primary-700 text-sm font-semibold
                      hover:bg-primary-100 active:scale-95 transition-all cursor-pointer border border-primary-200"
                  >
                    {showSolutions[q.id] ? t('hideSolution', '🙈 إخفاء الحل') : t('revealAnswer', '✅ أظهر الإجابة')}
                  </button>
                </div>

                {/* Solution content */}
                <AnimatePresence>
                  {showSolutions[q.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mt-4 pt-4 border-t border-slate-100 ${isAr ? 'mr-11 text-right' : 'ml-11'}`}
                    >
                      <div className="bg-accent-50 border border-accent-200 rounded-xl p-4">
                        <p className="font-bold text-accent-800 text-sm mb-1">{t('solution', '✅ الحل')}</p>
                        <p className="text-slate-800 font-semibold text-base mb-1">{currentAnswer}</p>
                        <p className="text-slate-600 text-sm leading-relaxed">{currentExplanation}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
