'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { useLessonStore } from '@/store/lessonStore';
import StopAndThink from '@/components/interactive/StopAndThink';
import VideoFacade from '@/components/interactive/VideoFacade';

interface ComparisonItem {
  labelEn: string;
  labelAr: string;
  icon: string;
  color: string; // tailwind color prefix like 'blue' or 'violet'
  definitionEn: string;
  definitionAr: string;
  howItWorksEn: string;
  howItWorksAr: string;
  examplesEn: string;
  examplesAr: string;
  keyPointEn: string;
  keyPointAr: string;
}

interface ComparisonData {
  id: string;
  titleEn: string;
  titleAr: string;
  left: ComparisonItem;
  right: ComparisonItem;
  differenceEn: string;
  differenceAr: string;
  videoId?: string;
  thinkQuestionEn: string;
  thinkQuestionAr: string;
  thinkHintEn?: string;
  thinkHintAr?: string;
}

const comparisons: ComparisonData[] = [
  {
    id: 'cloud-vs-edge',
    titleEn: 'Cloud Computing vs. Edge Computing',
    titleAr: 'الحوسبة السحابية مقابل الحوسبة الطرفية',
    left: {
      labelEn: 'Cloud Computing',
      labelAr: 'الحوسبة السحابية (Cloud Computing)',
      icon: '☁️',
      color: 'blue',
      definitionEn: 'IT delivered as a service over the Internet. Data is sent to remote servers (the "cloud") for processing and storage.',
      definitionAr: 'تكنولوجيا معلومات تُقدَّم كخدمة عبر الإنترنت. تُرسَل البيانات إلى خوادم بعيدة ("السحابة") للمعالجة والتخزين.',
      howItWorksEn: 'Your data travels to a data center (possibly thousands of km away), is processed there, and results are sent back to you.',
      howItWorksAr: 'تنتقل بياناتك إلى مركز بيانات (ربما على بعد آلاف الكيلومترات)، وتُعالَج هناك، ثم تُعاد النتائج إليك.',
      examplesEn: 'Google Drive, Netflix streaming, AWS, Microsoft Azure',
      examplesAr: 'Google Drive، بث Netflix، AWS، Microsoft Azure',
      keyPointEn: 'Powerful but has network latency (delay).',
      keyPointAr: 'قوية لكن بها تأخير في الشبكة (Latency).',
    },
    right: {
      labelEn: 'Edge Computing',
      labelAr: 'الحوسبة الطرفية (Edge Computing)',
      icon: '⚡',
      color: 'violet',
      definitionEn: 'Processing data on the device itself, instantly, instead of sending it to the cloud.',
      definitionAr: 'معالجة البيانات على الجهاز نفسه، فورًا، بدلاً من إرسالها إلى السحابة.',
      howItWorksEn: 'Data is processed right where it is generated — on the car, the sensor, the phone — without waiting for a round trip to the cloud.',
      howItWorksAr: 'تُعالَج البيانات في المكان الذي تُنشأ فيه — في السيارة، المستشعر، الهاتف — بدون انتظار رحلة ذهاب وعودة إلى السحابة.',
      examplesEn: 'Self-driving cars, smart factory sensors, AR glasses',
      examplesAr: 'السيارات ذاتية القيادة، مستشعرات المصانع الذكية، نظارات الواقع المعزز',
      keyPointEn: 'Instant processing — critical when delay = danger (0.1s delay can cause an accident).',
      keyPointAr: 'معالجة فورية — حرجة عندما يعني التأخير خطرًا (تأخير 0.1 ثانية قد يسبب حادثًا).',
    },
    differenceEn: 'Cloud computing sends data far away for processing (powerful but slow). Edge computing processes data locally (fast but limited). Autonomous driving uses edge computing because a delay of even 0.1 seconds can lead to an accident.',
    differenceAr: 'الحوسبة السحابية ترسل البيانات بعيدًا للمعالجة (قوية لكن بطيئة). الحوسبة الطرفية تعالج البيانات محليًا (سريعة لكن محدودة). القيادة الذاتية تستخدم الحوسبة الطرفية لأن تأخيرًا ولو 0.1 ثانية قد يؤدي إلى حادث.',
    videoId: 'cEOUeItHDdo',
    thinkQuestionEn: 'In autonomous driving, why is it necessary to process data instantly on the vehicle side using edge computing, rather than sending the data to the cloud for judgment?',
    thinkQuestionAr: 'في القيادة الذاتية، لماذا يجب معالجة البيانات فورًا على جانب المركبة باستخدام الحوسبة الطرفية، بدلاً من إرسال البيانات إلى السحابة للحكم؟',
    thinkHintEn: 'Think about what happens if there is a 0.1 second delay while driving at high speed.',
    thinkHintAr: 'فكّر فيما يحدث إذا كان هناك تأخير 0.1 ثانية أثناء القيادة بسرعة عالية.',
  },
  {
    id: 'ar-vs-vr',
    titleEn: 'AR (Augmented Reality) vs. VR (Virtual Reality)',
    titleAr: 'الواقع المعزز (AR) مقابل الواقع الافتراضي (VR)',
    left: {
      labelEn: 'AR (Augmented Reality)',
      labelAr: 'الواقع المعزز (AR)',
      icon: '📱',
      color: 'emerald',
      definitionEn: 'A technology that overlays digital information on real-world images.',
      definitionAr: 'تقنية تُضيف معلومات رقمية فوق صور العالم الحقيقي.',
      howItWorksEn: 'AR adds digital layers — text, images, 3D objects — on top of what you see in the real world, typically through a phone camera or smart glasses. The real environment is still visible.',
      howItWorksAr: 'يُضيف الواقع المعزز طبقات رقمية — نصوص، صور، كائنات ثلاثية الأبعاد — فوق ما تراه في العالم الحقيقي، عادةً من خلال كاميرا الهاتف أو النظارات الذكية. البيئة الحقيقية تبقى مرئية.',
      examplesEn: 'Pokémon GO, Instagram/Snapchat filters, IKEA Place app',
      examplesAr: 'Pokémon GO، فلاتر Instagram/Snapchat، تطبيق IKEA Place',
      keyPointEn: 'You see the REAL world + digital additions.',
      keyPointAr: 'ترى العالم الحقيقي + إضافات رقمية.',
    },
    right: {
      labelEn: 'VR (Virtual Reality)',
      labelAr: 'الواقع الافتراضي (VR)',
      icon: '🥽',
      color: 'purple',
      definitionEn: 'A technology that allows users to immerse themselves in a virtual space generated by a computer.',
      definitionAr: 'تقنية تسمح للمستخدمين بالانغمار في فضاء افتراضي يولّده الحاسوب.',
      howItWorksEn: 'VR completely replaces your visual environment with a computer-generated world. Using a headset, you can look around, interact with virtual objects, and feel as though you are inside the digital environment.',
      howItWorksAr: 'يستبدل الواقع الافتراضي بيئتك المرئية بالكامل بعالم يولّده الحاسوب. باستخدام سماعة رأس، يمكنك النظر حولك والتفاعل مع الكائنات الافتراضية والشعور وكأنك داخل البيئة الرقمية.',
      examplesEn: 'Meta Quest, PlayStation VR, virtual museum tours, surgical training',
      examplesAr: 'Meta Quest، PlayStation VR، جولات المتاحف الافتراضية، التدريب الجراحي',
      keyPointEn: 'You are INSIDE a fully computer-generated world.',
      keyPointAr: 'أنت داخل عالم مولَّد بالكامل بالحاسوب.',
    },
    differenceEn: 'AR keeps you connected to the real world and adds digital elements on top. VR disconnects you from the real world and replaces it with a virtual one. AR uses your phone camera; VR uses a headset that covers your eyes.',
    differenceAr: 'الواقع المعزز يُبقيك متصلاً بالعالم الحقيقي ويضيف عناصر رقمية فوقه. الواقع الافتراضي يفصلك عن العالم الحقيقي ويستبدله بعالم افتراضي. الواقع المعزز يستخدم كاميرا هاتفك؛ الواقع الافتراضي يستخدم سماعة رأس تغطي عينيك.',
    videoId: 'WxzcD04rwc8',
    thinkQuestionEn: 'If you wanted to explore a historical site from your classroom, would you use AR or VR? Why?',
    thinkQuestionAr: 'إذا كنت تريد استكشاف موقع تاريخي من فصلك الدراسي، هل ستستخدم الواقع المعزز أم الواقع الافتراضي؟ لماذا؟',
    thinkHintEn: 'Think about whether you need to see your real classroom while exploring, or be fully immersed in the historical site.',
    thinkHintAr: 'فكّر هل تحتاج لرؤية فصلك الحقيقي أثناء الاستكشاف، أم تريد الانغمار الكامل في الموقع التاريخي.',
  },
];

export default function ComparisonSection() {
  const { t, dir, isAr } = useTranslation();
  const { openVideo } = useLessonStore();
  const [activeComparison, setActiveComparison] = useState<string | null>(null);

  return (
    <section id="section-comparisons" className="py-14 md:py-24 px-3 sm:px-6 bg-gradient-to-b from-blue-50/70 via-slate-50 to-purple-50/70 border-b border-indigo-200/60 relative overflow-hidden" dir={dir}>
      {/* Ambient background glow */}
      <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-black tracking-wide mb-3 sm:mb-4 shadow-md shadow-indigo-500/20">
            {t('comparisonsBadge', '⚖️ مقارنات مهمة')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-2 leading-tight" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
            {t('comparisonsTitle', 'قارن وميّز')}
          </h2>
          <p className="text-indigo-700 font-semibold text-sm sm:text-base mb-1">
            {isAr ? 'Key Concept Comparisons — السحابية vs الطرفية | الواقع المعزز vs الافتراضي' : 'Key Concept Comparisons'}
          </p>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            {t('comparisonsSubtitle', 'افهم الفروقات الأساسية بين التقنيات المتشابهة')}
          </p>
        </motion.div>

        {/* Comparison selector tabs */}
        <div className={`flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 flex-wrap ${isAr ? 'flex-row-reverse' : ''}`}>
          {comparisons.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActiveComparison(activeComparison === comp.id ? null : comp.id)}
              className={`px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer touch-target
                ${activeComparison === comp.id
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300'
                }`}
            >
              {isAr ? comp.titleAr : comp.titleEn}
            </button>
          ))}
        </div>

        {/* Active comparison */}
        <AnimatePresence mode="wait">
          {activeComparison && (() => {
            const comp = comparisons.find(c => c.id === activeComparison);
            if (!comp) return null;
            return (
              <motion.div
                key={activeComparison}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {/* Side by side cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {[comp.left, comp.right].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2, duration: 0.4 }}
                      className="card-interactive p-6"
                    >
                      <div className={`flex items-center gap-3 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                        <span className="text-4xl">{item.icon}</span>
                        <h3 className={`text-xl font-bold text-slate-900 ${isAr ? 'text-right' : ''}`}>
                          {isAr ? item.labelAr : item.labelEn}
                        </h3>
                      </div>

                      <div className={`space-y-3 ${isAr ? 'text-right' : ''}`}>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                          <p className="text-xs font-semibold text-slate-400 mb-1">{t('definition', 'التعريف')}</p>
                          <p className="text-slate-700">{isAr ? item.definitionAr : item.definitionEn}</p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-slate-400 mb-1">
                            {isAr ? 'كيف يعمل' : 'How It Works'}
                          </p>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {isAr ? item.howItWorksAr : item.howItWorksEn}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-slate-400 mb-1">
                            {isAr ? 'أمثلة' : 'Examples'}
                          </p>
                          <p className="text-slate-600 text-sm">{isAr ? item.examplesAr : item.examplesEn}</p>
                        </div>

                        <div className={`rounded-xl p-3 ${
                          idx === 0 ? 'bg-blue-50 border border-blue-200' : 'bg-violet-50 border border-violet-200'
                        }`}>
                          <p className={`text-sm font-bold ${idx === 0 ? 'text-blue-700' : 'text-violet-700'}`}>
                            ✦ {isAr ? item.keyPointAr : item.keyPointEn}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* VS badge */}
                <div className="flex justify-center -mt-2 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {t('vsLabel', 'مقابل')}
                  </div>
                </div>

                {/* Key Difference */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="key-fact-card rounded-2xl p-6 mb-8 max-w-3xl mx-auto"
                >
                  <div className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="text-2xl">⚡</span>
                    <div className={`${isAr ? 'text-right' : ''}`}>
                      <h4 className="font-bold text-primary-800 mb-1">
                        {isAr ? 'الفرق الجوهري' : 'Key Difference'}
                      </h4>
                      <p className="text-slate-700 leading-relaxed">
                        {isAr ? comp.differenceAr : comp.differenceEn}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Video Card */}
                {comp.videoId && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="max-w-3xl mx-auto mb-8 card-interactive p-5 bg-gradient-to-br from-red-50/80 via-white to-pink-50/80 border-2 border-red-200 shadow-md"
                  >
                    <div className={`flex items-center gap-3 mb-3 pb-2 border-b border-red-100 ${isAr ? 'flex-row-reverse text-right' : 'text-left'}`}>
                      <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                        ▶️
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 text-base">
                          {isAr ? `فيديو تعليمي: مقارنة ${comp.titleAr}` : `Educational Video: ${comp.titleEn}`}
                        </p>
                        <p className="text-slate-500 text-xs">
                          {isAr ? 'شاهد شرحًا مرئيًا وتطبيقيًا للفروق بين التقنيتين' : 'Watch a visual demonstration explaining the practical differences'}
                        </p>
                      </div>
                    </div>

                      <VideoFacade
                        videoId={comp.videoId}
                        title={isAr ? `فيديو تعليمي: مقارنة ${comp.titleAr}` : `Educational Video: ${comp.titleEn}`}
                        channel="Simplilearn"
                        duration="8 min"
                      />
                    </motion.div>
                )}

                {/* Think question */}
                <div className="max-w-3xl mx-auto">
                  <StopAndThink
                    questionEn={comp.thinkQuestionEn}
                    questionAr={comp.thinkQuestionAr}
                    hintEn={comp.thinkHintEn}
                    hintAr={comp.thinkHintAr}
                  />
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}
