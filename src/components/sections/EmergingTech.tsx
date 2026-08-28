'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { emergingTechnologies } from '@/data/emergingTech';
import { useLessonStore } from '@/store/lessonStore';
import { useTranslation } from '@/lib/i18n';
import RevealButton from '@/components/interactive/RevealButton';
import StopAndThink from '@/components/interactive/StopAndThink';
import TeacherNote from '@/components/interactive/TeacherNote';
import VideoFacade from '@/components/interactive/VideoFacade';

// Arabic definitions/explanations for emerging tech
const arContent: Record<string, { definition: string; explanation: string; examples: string; keyTerm?: string; teacherQ: string }> = {
  'autonomous-driving': {
    definition: 'تقنية تستخدم الذكاء الاصطناعي لقيادة مركبة بدون تشغيل بشري.',
    explanation: 'تستخدم الكاميرات والمستشعرات للتعرف على المحيط، وتتخذ قرارات القيادة، وتتحكم في المركبة. ولأن تأخيرًا ولو 0.1 ثانية قد يؤدي إلى حادث، تُستخدم الحوسبة الطرفية (Edge Computing)، حيث تتم المعالجة فورًا على المركبة نفسها بدلاً من إرسال البيانات إلى السحابة للحكم.',
    examples: 'Tesla Autopilot، سيارات أجرة Waymo ذاتية القيادة، مركبات التوصيل الذاتية',
    teacherQ: 'في القيادة الذاتية، لماذا يجب معالجة البيانات فورًا على جانب المركبة باستخدام الحوسبة الطرفية؟',
  },
  'edge-computing': {
    definition: 'معالجة البيانات على الجهاز نفسه، فورًا، بدلاً من إرسالها إلى السحابة.',
    explanation: 'تنقل الحوسبة الطرفية المعالجة إلى مكان توليد البيانات. في القيادة الذاتية مثلاً، تعالج السيارة بيانات المستشعرات على متنها لأن إرسالها إلى السحابة وانتظار الرد سيكون بطيئًا جدًا.',
    examples: 'السيارات ذاتية القيادة، مستشعرات المصانع الذكية، نظارات الواقع المعزز',
    keyTerm: 'الحوسبة الطرفية (Edge Computing) — معالجة البيانات على الجهاز نفسه، فورًا، بدلاً من إرسالها إلى السحابة.',
    teacherQ: 'هل يمكنك التفكير في مواقف أخرى تكون فيها معالجة البيانات فورًا على الجهاز أفضل من إرسالها إلى السحابة؟',
  },
  ar: {
    definition: 'تقنية تُضيف معلومات رقمية فوق صور العالم الحقيقي.',
    explanation: 'يُضيف الواقع المعزز طبقات رقمية — نصوص، صور، كائنات ثلاثية الأبعاد — فوق ما تراه في العالم الحقيقي، عادةً من خلال كاميرا الهاتف أو النظارات الذكية. البيئة الحقيقية تبقى مرئية لكنها مُعزَّزة بمعلومات رقمية.',
    examples: 'Pokémon GO، فلاتر Instagram/Snapchat، تطبيق IKEA Place',
    teacherQ: 'ما الفرق بين الواقع المعزز والواقع الافتراضي؟ أيهما يُبقيك متصلاً بالعالم الحقيقي؟',
  },
  vr: {
    definition: 'تقنية تسمح للمستخدمين بالانغمار في فضاء افتراضي يولّده الحاسوب.',
    explanation: 'يستبدل الواقع الافتراضي بيئتك المرئية بالكامل بعالم يولّده الحاسوب. باستخدام سماعة رأس، يمكنك النظر حولك والتفاعل مع الكائنات الافتراضية والشعور وكأنك داخل البيئة الرقمية.',
    examples: 'Meta Quest، PlayStation VR، جولات المتاحف الافتراضية، التدريب الجراحي',
    teacherQ: 'كيف يمكن استخدام الواقع الافتراضي في التعليم؟ فكّر في مادة دراسية حيث "التواجد داخل" المحتوى سيساعد الطلاب على التعلم.',
  },
  'quantum-computing': {
    definition: 'تقنية من المتوقع أن تُسرّع بشكل كبير الحسابات الصعبة أو المستحيلة على الحواسيب التقليدية، باستخدام مبادئ ميكانيكا الكم.',
    explanation: 'تستخدم الحواسيب التقليدية البتات (0 أو 1). تستخدم الحواسيب الكمية الكيوبتات (Qubits)، التي يمكن أن تكون في حالة تراكب — مزيج من 0 و 1 في نفس الوقت. هذا يسمح للعديد من الكيوبتات بتمثيل مساحة أكبر بكثير من الحالات في وقت واحد.',
    examples: 'IBM Quantum، Google Sycamore — تُستخدم في أبحاث اكتشاف الأدوية والتشفير ومشاكل التحسين',
    teacherQ: 'البت التقليدي يمكن أن يكون 0 أو 1. الكيوبت يمكن أن يكون كليهما في نفس الوقت (التراكب). لماذا يجعل هذا الحواسيب الكمية أسرع بكثير لمشاكل معينة؟',
  },
};

export default function EmergingTech() {
  const [selectedTech, setSelectedTech] = useState<string | null>('vr');
  const [showDetail, setShowDetail] = useState(true);
  const { t, dir, isAr } = useTranslation();

  const handleSelect = (id: string) => {
    if (selectedTech === id) {
      setSelectedTech(null);
      setShowDetail(false);
    } else {
      setSelectedTech(id);
      setShowDetail(false);
    }
  };

  const iconMap: Record<string, string> = {
    'autonomous-driving': '🚗',
    'edge-computing': '⚡',
    'ar': '📱',
    'vr': '🥽',
    'quantum-computing': '⚛️',
  };

  return (
    <section id="section-emerging" className="py-14 md:py-24 px-3 sm:px-6 bg-mesh-violet border-b border-purple-200/60 relative overflow-hidden" dir={dir}>
      {/* Decorative ambient blur */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-violet-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-80 h-80 rounded-full bg-purple-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs sm:text-sm font-black tracking-wide mb-3 sm:mb-4 shadow-md shadow-violet-500/20">
            {t('emergingBadge', '🚀 تقنيات ناشئة بارزة')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-2 leading-tight" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
            {t('emergingTitle', 'مستكشف التقنيات الحديثة')}
          </h2>
          <p className="text-violet-700 font-semibold text-sm sm:text-base mb-1">
            {isAr ? 'Modern Emerging Technologies — الحوسبة الطرفية، القيادة الذاتية، AR/VR، والكم' : 'Modern Emerging Technologies'}
          </p>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            {t('emergingSubtitle', 'استكشف التقنيات الناشئة التي تشكّل مستقبلنا')}
          </p>
        </motion.div>

        <TeacherNote
          content="Cover autonomous driving + edge computing together (they're linked). Then AR vs VR comparison. End with quantum computing."
          type="transition"
          className="mb-6 md:mb-8 flex justify-center"
        />

        {/* Tech cards */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 mb-8 md:mb-10 ${isAr ? 'direction-rtl' : ''}`}>
          {emergingTechnologies.map((tech, i) => {
            const isSelected = selectedTech === tech.id;
            return (
              <motion.button
                key={tech.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleSelect(tech.id)}
                className={`card-interactive p-3 sm:p-5 flex flex-col items-center justify-center text-center cursor-pointer touch-target transition-all rounded-2xl w-full
                  ${isSelected ? 'ring-2 ring-violet-400 bg-violet-50 scale-[1.02]' : 'hover:scale-[1.02]'}
                  ${selectedTech && !isSelected ? 'opacity-60' : ''}`}
              >
                <span className="text-3xl sm:text-4xl block mb-2 sm:mb-3">{iconMap[tech.id] || '🔧'}</span>
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm mb-1 leading-snug break-words">
                  {isAr ? tech.nameAr : tech.nameEn}
                </h4>
                <p className={`text-[10px] sm:text-xs text-slate-400 leading-tight break-words ${isAr ? 'font-sans' : 'arabic-text'}`}>
                  {isAr ? tech.nameEn : tech.nameAr}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Expanded detail */}
        <AnimatePresence mode="wait">
          {selectedTech && (() => {
            const tech = emergingTechnologies.find(t => t.id === selectedTech);
            if (!tech) return null;
            const ar = arContent[tech.id];
            return (
              <motion.div
                key={selectedTech}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="card-interactive p-4 sm:p-6 md:p-10 mb-8 md:mb-10"
              >
                <div className={`flex flex-col lg:flex-row gap-6 md:gap-8 ${isAr ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image side */}
                  {tech.image && (
                    <div className="w-full lg:w-80 flex-shrink-0">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                        <img
                          src={tech.image.src}
                          alt={tech.image.alt}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23f5f3ff"><rect width="400" height="300"/><text x="200" y="150" text-anchor="middle" fill="%238b5cf6" font-size="48">${iconMap[tech.id] || '🔧'}</text></svg>`)}`;
                          }}
                        />
                      </div>
                      {tech.image.caption && (
                        <p className={`text-xs sm:text-sm text-slate-500 italic mt-2 text-center ${isAr ? 'text-right' : ''}`}>{tech.image.caption}</p>
                      )}
                    </div>
                  )}

                  {/* Content side */}
                  <div className={`flex-1 ${isAr ? 'text-right' : ''}`}>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
                      {isAr ? tech.nameAr : tech.nameEn}
                    </h3>
                    <p className={`text-slate-400 text-xs sm:text-sm mb-4 ${isAr ? 'font-sans' : 'arabic-text'}`}>
                      {isAr ? tech.nameEn : tech.nameAr}
                    </p>

                    <div className="bg-violet-50 border border-violet-200 rounded-xl p-3 sm:p-4 mb-4">
                      <p className="text-xs sm:text-sm font-semibold text-violet-700 mb-1">{t('definition', 'التعريف')}</p>
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{isAr && ar ? ar.definition : tech.definition}</p>
                    </div>

                    {!showDetail ? (
                      <RevealButton label={t('learnMore', 'اعرف المزيد')} icon="📖" variant="violet" onReveal={() => setShowDetail(true)}>
                        <></>
                      </RevealButton>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          {isAr && ar ? ar.explanation : tech.explanation}
                        </p>

                        <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-100">
                          <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-1">{t('realWorldExamples', '🌍 أمثلة من الواقع')}</p>
                          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{isAr && ar ? ar.examples : tech.realWorldExample}</p>
                        </div>

                        {(tech.keyTerm || (isAr && ar?.keyTerm)) && (
                          <div className="key-fact-card rounded-xl p-3 sm:p-4">
                            <p className="text-xs sm:text-sm font-semibold text-primary-700 mb-1">{t('keyTermLabel', '📖 مصطلح مهم')}</p>
                            <p className="text-slate-700 text-sm sm:text-base">{isAr && ar?.keyTerm ? ar.keyTerm : tech.keyTerm}</p>
                          </div>
                        )}

                        {/* Embedded Video Player Card */}
                        <div className="bg-gradient-to-br from-red-50/80 via-white to-purple-50/80 border-2 border-red-200 rounded-2xl p-3.5 sm:p-5 shadow-sm">
                          <div className={`flex items-center gap-3 mb-3 pb-2 border-b border-red-100 ${isAr ? 'flex-row-reverse text-right' : 'text-left'}`}>
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-600 text-white flex items-center justify-center text-base sm:text-lg flex-shrink-0 shadow-sm">
                              ▶️
                            </div>
                            <div>
                              <p className="font-extrabold text-slate-900 text-sm sm:text-base">
                                {isAr ? `فيديو تعليمي: شرح ${tech.nameAr}` : `Educational Video: ${tech.nameEn}`}
                              </p>
                              <p className="text-slate-500 text-[11px] sm:text-xs">
                                {isAr ? 'شاهد شرحًا مرئيًا وتطبيقيًا لهذه التقنية' : 'Watch an interactive visual demonstration'}
                              </p>
                            </div>
                          </div>

                          <VideoFacade
                            videoId={tech.youtubeVideoId}
                            title={isAr ? `فيديو تعليمي: شرح ${tech.nameAr}` : `Educational Video: ${tech.nameEn}`}
                            channel={tech.id === 'vr' ? 'YouTube Shorts' : 'Tech Explanation'}
                            duration={tech.id === 'vr' ? '1 min' : '6 min'}
                            isShorts={tech.id === 'vr'}
                          />
                        </div>

                        {/* Think question */}
                        <StopAndThink
                          questionEn={tech.teacherQuestion}
                          questionAr={ar?.teacherQ || tech.teacherQuestion}
                          hintEn="Think about the key characteristic of this technology and where it could apply."
                          hintAr="فكّر في الخاصية الرئيسية لهذه التقنية وأين يمكن تطبيقها."
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* Quantum bit vs classical bit diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-interactive p-4 sm:p-6 md:p-8 max-w-3xl mx-auto"
        >
          <h4 className="text-lg sm:text-xl font-bold text-slate-800 text-center mb-4 sm:mb-6" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
            {t('classicalVsQubit', 'البت التقليدي مقابل الكيوبت (Qubit)')}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Classical bit */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200 text-center"
            >
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🔲</div>
              <h5 className="font-bold text-slate-800 text-base sm:text-lg mb-1 sm:mb-2">{t('classicalBit', 'البت التقليدي (Classical Bit)')}</h5>
              <p className="text-slate-600 text-xs sm:text-sm">{t('classicalDesc', 'حالة واحدة محددة في كل مرة')}</p>
              <div className="flex justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white border-2 border-slate-300 flex items-center justify-center text-xl sm:text-2xl font-bold text-slate-700">0</div>
                <span className="flex items-center text-slate-400 font-bold text-sm">{isAr ? 'أو' : 'OR'}</span>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white border-2 border-slate-300 flex items-center justify-center text-xl sm:text-2xl font-bold text-slate-700">1</div>
              </div>
              <p className="text-xs text-slate-400 mt-2 sm:mt-3">{t('eitherOr', 'إما 0 أو 1 — لكن ليس كليهما معًا')}</p>
            </motion.div>

            {/* Qubit */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-violet-50 rounded-xl p-4 sm:p-6 border border-violet-200 text-center"
            >
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">⚛️</div>
              <h5 className="font-bold text-violet-800 text-base sm:text-lg mb-1 sm:mb-2">{t('qubit', 'الكيوبت (Qubit)')}</h5>
              <p className="text-violet-600 text-xs sm:text-sm">{t('qubitDesc', 'التراكب (Superposition)')}</p>
              <div className="flex justify-center mt-3 sm:mt-4">
                <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-violet-300 via-primary-300 to-accent-300 flex items-center justify-center">
                  <span className="text-white font-bold text-base sm:text-lg">0 + 1</span>
                </div>
              </div>
              <p className="text-xs text-violet-500 mt-2 sm:mt-3">{t('bothAtOnce', 'مزيج من 0 و 1 في نفس الوقت')}</p>
            </motion.div>
          </div>
          <p className={`text-xs sm:text-sm text-slate-500 text-center mt-4 italic ${isAr ? 'text-right' : ''}`}>
            {isAr
              ? 'التراكب يسمح للعديد من الكيوبتات بتمثيل مساحة أكبر بكثير من الحالات في وقت واحد — مما يتيح معالجة متوازية هائلة لمشاكل معينة.'
              : 'Superposition lets many qubits represent a much larger space of states at once — enabling massive parallel processing for certain problems.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
