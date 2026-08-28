'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { mooresLawData, mooresLawDefinition, mooresLawDefinitionAr, mooresLawLimits, mooresLawLimitsAr, mooresLawFuture, mooresLawFutureAr } from '@/data/mooresLawData';
import { useLessonStore } from '@/store/lessonStore';
import { useTranslation } from '@/lib/i18n';
import RevealButton from '@/components/interactive/RevealButton';
import TeacherNote from '@/components/interactive/TeacherNote';
import StopAndThink from '@/components/interactive/StopAndThink';
import AvatarCallout from '@/components/interactive/AvatarCallout';
import VideoFacade from '@/components/interactive/VideoFacade';

export default function MooresLaw() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { animationResetKey } = useLessonStore();
  const { t, dir, isAr } = useTranslation();
  const [showLimits, setShowLimits] = useState(false);
  const [showFuture, setShowFuture] = useState(false);

  // Chart dimensions
  const chartW = 800;
  const chartH = 400;
  const padding = { top: 40, right: 60, bottom: 60, left: 90 };
  const plotW = chartW - padding.left - padding.right;
  const plotH = chartH - padding.top - padding.bottom;

  // Log scale for transistors
  const minYear = 1970;
  const maxYear = 2025;
  const minLog = Math.log10(1000);
  const maxLog = Math.log10(200000000000);

  const xScale = (year: number) => padding.left + ((year - minYear) / (maxYear - minYear)) * plotW;
  const yScale = (count: number) => padding.top + plotH - ((Math.log10(count) - minLog) / (maxLog - minLog)) * plotH;

  // Generate trend line (doubling every 2 years)
  const trendPoints: string[] = [];
  for (let year = 1971; year <= 2024; year += 1) {
    const transistors = 2300 * Math.pow(2, (year - 1971) / 2);
    trendPoints.push(`${xScale(year)},${yScale(transistors)}`);
  }

  const yAxisLabels = [
    { value: 1e3, label: '1K' },
    { value: 1e6, label: '1M' },
    { value: 1e9, label: '1B' },
    { value: 1e11, label: '100B' },
  ];

  const xAxisLabels = [1970, 1980, 1990, 2000, 2010, 2020];

  return (
    <section id="section-moores-law" className="py-14 md:py-24 px-3 sm:px-6 bg-mesh-cyan border-b border-cyan-200/60 relative overflow-hidden" ref={ref} dir={dir}>
      {/* Ambient background glow */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10" key={animationResetKey}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-600 to-sky-600 text-white text-xs sm:text-sm font-black tracking-wide mb-3 sm:mb-4 shadow-md shadow-cyan-500/20">
            {t('mooresBadge', '📈 فهم النمو')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-2 leading-tight" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
            {isAr ? 'قانون مور' : "Moore\u2019s Law"}
          </h2>
          <p className="text-cyan-700 font-semibold text-sm sm:text-base">
            {isAr ? "Moore's Law — مضاعفة عدد الترانزستورات كل عامين" : 'Moore\'s Law — Transistor count doubles every 2 years'}
          </p>
        </motion.div>

        <TeacherNote
          content="Moore's Law explains WHY computing advanced so rapidly. Show the chart animation first, then reveal the definition. Common misconception: students think it's an actual physical law — emphasize it's an empirical observation (a pattern noticed in data), not a rule of physics."
          type="misconception"
          className="mb-6 md:mb-8 flex justify-center"
        />

        {/* Interactive Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-interactive p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
        >
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 text-center" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
            {t('mooresChartTitle', 'قانون مور: عدد الترانزستورات عبر الزمن')}
          </h3>

          <div className="w-full overflow-hidden">
            <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-3xl mx-auto h-auto">
              {/* Grid lines */}
              {yAxisLabels.map(({ value }) => (
                <motion.line
                  key={value}
                  x1={padding.left} y1={yScale(value)}
                  x2={chartW - padding.right} y2={yScale(value)}
                  stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 }}
                />
              ))}

              {/* Y-axis labels */}
              {yAxisLabels.map(({ value, label }) => (
                <motion.text
                  key={value}
                  x={padding.left - 10} y={yScale(value) + 4}
                  textAnchor="end" fontSize="12" fill="#64748b"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  {label}
                </motion.text>
              ))}

              {/* X-axis labels */}
              {xAxisLabels.map((year) => (
                <motion.text
                  key={year}
                  x={xScale(year)} y={chartH - padding.bottom + 25}
                  textAnchor="middle" fontSize="12" fill="#64748b"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  {year}
                </motion.text>
              ))}

              {/* Axis labels */}
              <text x={padding.left - 60} y={chartH / 2} textAnchor="middle" fontSize="12" fill="#94a3b8" transform={`rotate(-90, ${padding.left - 60}, ${chartH / 2})`}>
                {isAr ? 'ترانزستورات لكل شريحة' : 'Transistors per chip'}
              </text>
              <text x={chartW / 2} y={chartH - 5} textAnchor="middle" fontSize="12" fill="#94a3b8">
                {isAr ? 'السنة' : 'Year'}
              </text>

              {/* Trend line (dashed) */}
              <motion.polyline
                points={trendPoints.join(' ')}
                fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="6,4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ delay: 0.5, duration: 2, ease: 'easeInOut' }}
              />

              {/* Data points */}
              {mooresLawData.map((point, i) => (
                <motion.g key={point.year}>
                  <motion.circle
                    cx={xScale(point.year)} cy={yScale(point.transistors)}
                    r="8" fill="#2563eb" stroke="white" strokeWidth="3"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.4, duration: 0.4, type: 'spring', stiffness: 300 }}
                  />
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 + i * 0.4 }}
                  >
                    <text
                      x={xScale(point.year)} y={yScale(point.transistors) - 18}
                      textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af"
                    >
                      {point.processorName}
                    </text>
                    <text
                      x={xScale(point.year)} y={yScale(point.transistors) - 6}
                      textAnchor="middle" fontSize="9" fill="#64748b"
                    >
                      {point.label}
                    </text>
                  </motion.g>
                </motion.g>
              ))}

              {/* Legend */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 3.5 }}
              >
                <line x1={chartW - padding.right - 180} y1={20} x2={chartW - padding.right - 150} y2={20} stroke="#93c5fd" strokeWidth="2" strokeDasharray="6,4" />
                <text x={chartW - padding.right - 145} y={24} fontSize="10" fill="#64748b">
                  {isAr ? 'تضاعف كل ~عامين' : 'Doubling every ~2 years'}
                </text>
                <circle cx={chartW - padding.right - 165} cy={38} r="5" fill="#2563eb" />
                <text x={chartW - padding.right - 145} y={42} fontSize="10" fill="#64748b">
                  {isAr ? 'معالجات فعلية' : 'Actual processors'}
                </text>
              </motion.g>
            </svg>
          </div>
        </motion.div>

        {/* Definition */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="key-fact-card rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 max-w-3xl mx-auto"
        >
          <div className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
            <span className="text-2xl flex-shrink-0">📖</span>
            <div className={isAr ? 'text-right' : ''}>
              <h4 className="font-semibold text-primary-800 mb-1 text-base sm:text-lg">{isAr ? "قانون مور (Moore's Law)" : "Moore\u2019s Law"}</h4>
              <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed">{isAr ? mooresLawDefinitionAr : mooresLawDefinition}</p>
            </div>
          </div>
        </motion.div>

        <AvatarCallout
          message={isAr ? 'ظل هذا دقيقًا لسنوات عديدة — لكن هل لا يزال صحيحًا اليوم؟' : 'This remained accurate for many years — but is it still true today?'}
          type="think"
          className="mb-6 sm:mb-8 max-w-3xl mx-auto"
        />

        {/* Physical limits */}
        <div className="max-w-3xl mx-auto space-y-4">
          {!showLimits ? (
            <RevealButton label={t('whatLimits', 'ما هي الحدود؟')} icon="⚠️" variant="warm" onReveal={() => setShowLimits(true)}>
              <></>
            </RevealButton>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="exam-tip-card rounded-2xl p-4 sm:p-6">
              <h4 className={`font-semibold text-warm-700 text-base sm:text-lg mb-2 flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                {t('approachingLimits', '⚠️ الاقتراب من الحدود الفيزيائية')}
              </h4>
              <p className={`text-slate-700 text-sm sm:text-base leading-relaxed ${isAr ? 'text-right' : ''}`}>
                {isAr ? mooresLawLimitsAr : mooresLawLimits}
              </p>
            </motion.div>
          )}

          {showLimits && !showFuture && (
            <RevealButton label={t('whatNext', 'ماذا بعد؟')} icon="🚀" variant="accent" onReveal={() => setShowFuture(true)}>
              <></>
            </RevealButton>
          )}

          {showFuture && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-accent-50 border border-accent-200 rounded-2xl p-4 sm:p-6">
              <h4 className={`font-semibold text-accent-700 text-base sm:text-lg mb-2 flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                {t('newDirections', '🚀 اتجاهات جديدة')}
              </h4>
              <p className={`text-slate-700 text-sm sm:text-base leading-relaxed ${isAr ? 'text-right' : ''}`}>
                {isAr ? mooresLawFutureAr : mooresLawFuture}
              </p>
            </motion.div>
          )}
        </div>

        {/* Embedded Video Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-6 sm:mt-8 card-interactive p-4 sm:p-6 bg-gradient-to-br from-red-50/70 via-white to-orange-50/70 border-2 border-red-200 shadow-md"
        >
          <div className={`flex items-center gap-3 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-red-100 ${isAr ? 'flex-row-reverse text-right' : 'text-left'}`}>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-red-600 text-white flex items-center justify-center text-lg sm:text-xl shadow-md flex-shrink-0">
              ▶️
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base sm:text-lg md:text-xl">
                {isAr ? 'فيديو تعليمي: شرح قانون مور (Educational Video: Moore\'s Law Explained)' : 'Educational Video: Moore\'s Law Explained'}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm">
                {isAr
                  ? 'شاهد كيف يتضاعف عدد الترانزستورات وأسباب اقتراب التكنولوجيا من حدودها الفيزيائية'
                  : 'Watch how transistor count doubles and why technology is approaching physical limits'}
              </p>
            </div>
          </div>

          {/* Click-to-load YouTube Video Facade */}
          <div className="max-w-xs sm:max-w-sm mx-auto">
            <VideoFacade
              videoId="yWkxf_Ss-ZM"
              title={isAr ? 'فيديو تعليمي: شرح قانون مور' : "Moore's Law Explained"}
              channel="CrashCourse"
              duration="12 min"
              isShorts={true}
            />
          </div>
        </motion.div>

        {/* Stop and Think */}
        <div className="max-w-3xl mx-auto mt-6 sm:mt-8">
          <StopAndThink
            questionEn="Of these five changes, which would be hardest to give up — and why?"
            questionAr="من بين هذه التغييرات الخمسة، أيها سيكون الأصعب للتخلي عنه — ولماذا؟"
            hintEn="Think about the social changes you studied: SNS, e-commerce, remote work, online learning, cashless payment."
            hintAr="فكّر في التغييرات الاجتماعية التي درستها: SNS، التجارة الإلكترونية، العمل عن بُعد، التعلم عبر الإنترنت، الدفع الإلكتروني."
            answerEn="There is no single correct answer — this is a discussion question. Consider which technology most deeply affects your daily routine."
            answerAr="لا توجد إجابة واحدة صحيحة — هذا سؤال نقاشي. فكّر أي تقنية تؤثر بشكل أعمق على روتينك اليومي."
          />
        </div>
      </div>
    </section>
  );
}
