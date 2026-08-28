'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { stopAndThinkQuestions, StopAndThinkQuestion } from '@/data/stopAndThinkQuestions';
import { useTranslation } from '@/lib/i18n';
import TeacherNote from '@/components/interactive/TeacherNote';

export default function StopAndThinkSection() {
  const { t, dir, isAr } = useTranslation();
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const topics = [
    { id: 'all', labelEn: 'All Topics (8)', labelAr: 'جميع الموضوعات (8)' },
    { id: 'ar-vr', labelEn: 'AR vs. VR', labelAr: 'الواقع المعزز والافتراضي' },
    { id: 'edge-cloud', labelEn: 'Edge vs. Cloud', labelAr: 'الحوسبة الطرفية والسحابية' },
    { id: 'moores-law', labelEn: "Moore's Law", labelAr: 'قانون مور' },
    { id: 'social', labelEn: 'Social Impact', labelAr: 'التحول الاجتماعي' },
    { id: 'quantum', labelEn: 'Quantum Computing', labelAr: 'الحوسبة الكمية' },
    { id: 'history', labelEn: 'Computing History', labelAr: 'تاريخ الحوسبة' },
  ];

  const filteredQuestions = selectedTopic === 'all'
    ? stopAndThinkQuestions
    : stopAndThinkQuestions.filter(q => q.topicId === selectedTopic);

  const toggleHint = (id: string) => {
    setRevealedHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAnswer = (id: string) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="section-stop-and-think" className="py-14 md:py-24 px-3 sm:px-6 bg-gradient-to-b from-sky-50/80 via-cyan-50/50 to-blue-50/50 border-b border-sky-200/60 relative overflow-hidden" dir={dir}>
      {/* Decorative ambient blur */}
      <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white text-xs sm:text-sm font-black tracking-wide mb-3 sm:mb-4 shadow-md shadow-sky-500/20">
            💭 {isAr ? 'أسئلة التفكير الناقد للدرس' : 'Critical Thinking Questions'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-2 sm:mb-3 leading-tight" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
            {isAr ? 'توقف وفكّر — بنك الأسئلة والمفاهيم' : 'Stop & Think — Question Bank'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
            {isAr
              ? 'أسئلة تفكير تطبيقي ونقاشي شاملة لكل موضوع في الدرس الأول لاختبار الفهم العميق وتطبيق المفاهيم في مواقف واقعية.'
              : 'Applied critical thinking and classroom discussion questions covering every topic in Lesson 1 to test deep conceptual understanding.'}
          </p>
        </motion.div>

        <TeacherNote
          content="Use these 'Stop & Think' questions for open classroom debates, group challenges, or end-of-lesson formative assessment. Let students debate their reasoning before revealing the model answers."
          type="question"
          className="mb-6 md:mb-8 flex justify-center"
        />

        {/* Topic Filters */}
        <div className={`flex justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 flex-wrap ${isAr ? 'flex-row-reverse' : ''}`}>
          {topics.map((topic) => {
            const isActive = selectedTopic === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer touch-target shadow-sm
                  ${isActive
                    ? 'bg-sky-600 text-white shadow-sky-200 scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                  }`}
              >
                {isAr ? topic.labelAr : topic.labelEn}
              </button>
            );
          })}
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredQuestions.map((q, index) => {
            const hasHint = revealedHints[q.id];
            const hasAnswer = revealedAnswers[q.id];

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border-2 border-sky-300 bg-gradient-to-br from-sky-50 via-cyan-50/40 to-blue-50 p-4 sm:p-6 md:p-7 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header matching the user's image */}
                  <div className={`flex items-center justify-between gap-3 mb-4 pb-3 border-b border-sky-200/80 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-2.5 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                        {q.icon}
                      </div>
                      <div className={isAr ? 'text-right' : 'text-left'}>
                        <h3 className="font-extrabold text-sky-900 text-xl tracking-tight flex items-center gap-1.5">
                          <span>{isAr ? 'توقف وفكر' : 'Stop & Think'}</span>
                          <span className="text-sky-600 text-lg">💭❓</span>
                        </h3>
                        <span className="text-xs font-semibold text-sky-700 bg-sky-100/80 px-2.5 py-0.5 rounded-md inline-block mt-0.5">
                          {isAr ? q.topicNameAr : q.topicNameEn}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-sky-600 bg-white border border-sky-200 px-2.5 py-1 rounded-full shadow-2xs">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Question Body */}
                  <p className={`text-slate-800 font-bold text-lg md:text-xl leading-relaxed mb-6 ${isAr ? 'text-right' : 'text-left'}`}>
                    {isAr ? q.questionAr : q.questionEn}
                  </p>

                  {/* Progressive Hint */}
                  <AnimatePresence>
                    {hasHint && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -5 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -5 }}
                        className="mb-4 overflow-hidden"
                      >
                        <div className={`bg-amber-50 border border-amber-200 rounded-2xl p-4 ${isAr ? 'text-right' : 'text-left'}`}>
                          <div className={`flex items-center gap-2 text-amber-800 font-bold text-sm mb-1 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <span>💡</span>
                            <span>{isAr ? 'تلميح للمناقشة' : 'Discussion Hint'}</span>
                          </div>
                          <p className="text-slate-700 text-sm leading-relaxed">
                            {isAr ? q.hintAr : q.hintEn}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Progressive Model Answer */}
                  <AnimatePresence>
                    {hasAnswer && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -5 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -5 }}
                        className="mb-4 overflow-hidden"
                      >
                        <div className={`bg-white border-2 border-emerald-300 rounded-2xl p-4 shadow-sm ${isAr ? 'text-right' : 'text-left'}`}>
                          <div className={`flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1.5 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <span>🎯</span>
                            <span>{isAr ? 'الإجابة النموذجية والتحليل' : 'Model Answer & Analysis'}</span>
                          </div>
                          <p className="text-slate-800 text-base leading-relaxed font-medium mb-3">
                            {isAr ? q.answerAr : q.answerEn}
                          </p>
                          <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-200 text-xs font-bold text-emerald-900">
                            ✦ {isAr ? q.keyTakeawayAr : q.keyTakeawayEn}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Interactive Action Buttons */}
                <div className={`flex items-center gap-2.5 pt-3 border-t border-sky-200/50 mt-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={() => toggleHint(q.id)}
                    className={`touch-target px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border
                      ${hasHint
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300'
                      }`}
                  >
                    <span>💡</span>
                    <span>{hasHint ? (isAr ? 'إخفاء التلميح' : 'Hide Hint') : (isAr ? 'أظهر التلميح' : 'Show Hint')}</span>
                  </button>

                  <button
                    onClick={() => toggleAnswer(q.id)}
                    className={`touch-target px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm
                      ${hasAnswer
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
                        : 'bg-sky-600 text-white hover:bg-sky-700 shadow-sky-200'
                      }`}
                  >
                    <span>{hasAnswer ? '✓' : '🎯'}</span>
                    <span>{hasAnswer ? (isAr ? 'إخفاء الإجابة' : 'Hide Answer') : (isAr ? 'كشف الإجابة والتحليل' : 'Reveal Answer')}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
