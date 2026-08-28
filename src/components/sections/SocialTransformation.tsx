'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { socialChanges } from '@/data/socialChanges';
import { useTranslation } from '@/lib/i18n';
import CauseEffectChain from '@/components/interactive/CauseEffectChain';
import StopAndThink from '@/components/interactive/StopAndThink';
import TeacherNote from '@/components/interactive/TeacherNote';

export default function SocialTransformation() {
  const [selectedChange, setSelectedChange] = useState<string | null>(null);
  const { t, dir, isAr } = useTranslation();

  // Arabic definitions for social changes
  const arDefs: Record<string, { definition: string; example: string }> = {
    sns: {
      definition: 'خدمات تتيح للمستخدمين التواصل مع بعضهم البعض ونشر ومشاركة المعلومات. وهي فعّالة جدًا في نشر المعلومات بسرعة.',
      example: 'Facebook، Instagram، X (Twitter)، TikTok',
    },
    ecommerce: {
      definition: 'شراء وبيع السلع والخدمات عبر الإنترنت.',
      example: 'متاجر إلكترونية مثل Amazon و eBay',
    },
    'remote-work': {
      definition: 'أسلوب عمل يتم فيه أداء العمل من المنزل أو مواقع بعيدة أخرى باستخدام الإنترنت.',
      example: 'Zoom، Microsoft Teams، العمل من المنزل',
    },
    'online-learning': {
      definition: 'أسلوب تعلّم يتم فيه تقديم الدروس والمواد الدراسية باستخدام الإنترنت.',
      example: 'Coursera، منصات التعلم عن بُعد، الفصول الافتراضية',
    },
    'cashless-payment': {
      definition: 'نظام دفع باستخدام النقود الإلكترونية أو رموز QR وغيرها، بدون استخدام النقد.',
      example: 'بطاقات الائتمان، بطاقات الخصم، تطبيقات الدفع بالهاتف',
    },
  };

  return (
    <section id="section-social" className="py-12 md:py-20 px-3 sm:px-6 bg-slate-50" dir={dir}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-100 text-accent-700 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t('socialBadge', '🌍 المجتمع تغيّر')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2 leading-tight" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
            {t('socialTitle', 'التغيرات الاجتماعية الناتجة عن تكنولوجيا المعلومات')}
          </h2>
          <p className={`text-slate-400 text-base sm:text-lg mb-2 ${isAr ? 'font-sans' : 'arabic-text'}`}>
            {isAr ? 'Social Changes Driven by IT' : 'التغيرات الاجتماعية الناتجة عن تكنولوجيا المعلومات'}
          </p>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            {t('socialSubtitle', 'لم تقتصر تكنولوجيا المعلومات على صنع أجهزة جديدة — بل غيّرت طريقة تواصل الناس وعملهم وتعلّمهم ودفعهم.')}
          </p>
        </motion.div>

        <TeacherNote
          content="This section covers the 5 social changes from the lesson. Tap each card to reveal the technology → capability → behavior → transformation chain."
          type="say"
          className="mb-6 md:mb-8 flex justify-center"
        />

        {/* Social change cards grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 mb-8 md:mb-10 ${isAr ? 'direction-rtl' : ''}`}>
          {socialChanges.map((change, i) => {
            const isSelected = selectedChange === change.id;
            return (
              <motion.button
                key={change.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedChange(isSelected ? null : change.id)}
                className={`card-interactive p-3 sm:p-5 flex flex-col items-center justify-center text-center cursor-pointer touch-target transition-all rounded-2xl w-full
                  ${isSelected ? 'ring-2 ring-primary-400 bg-primary-50 scale-[1.02]' : 'hover:scale-[1.02]'}
                  ${selectedChange && !isSelected ? 'opacity-60' : ''}`}
              >
                <span className="text-3xl sm:text-4xl block mb-2 sm:mb-3">{change.icon}</span>
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm mb-1 leading-snug break-words">
                  {isAr ? change.nameAr : change.nameEn}
                </h4>
                <p className={`text-[10px] sm:text-xs text-slate-400 leading-tight break-words ${isAr ? 'font-sans' : 'arabic-text'}`}>
                  {isAr ? change.nameEn : change.nameAr}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Expanded detail */}
        {selectedChange && (() => {
          const change = socialChanges.find(c => c.id === selectedChange);
          if (!change) return null;
          const arDef = arDefs[change.id];
          return (
            <motion.div
              key={selectedChange}
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0 }}
              className="card-interactive p-4 sm:p-6 md:p-8 mb-8 sm:mb-10"
            >
              <div className={`flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                <span className="text-3xl sm:text-4xl flex-shrink-0">{change.icon}</span>
                <div className={isAr ? 'text-right' : ''}>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
                    {isAr ? change.nameAr : change.nameEn}
                  </h3>
                  <p className={`text-slate-400 text-xs sm:text-sm ${isAr ? 'font-sans' : 'arabic-text'}`}>
                    {isAr ? change.nameEn : change.nameAr}
                  </p>
                  <p className="text-slate-600 text-sm sm:text-base mt-2">
                    {isAr && arDef ? arDef.definition : change.definition}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 italic">
                    {isAr ? `مثال: ${arDef?.example || change.example}` : `e.g., ${change.example}`}
                  </p>
                </div>
              </div>

              {/* Transformation chain */}
              <div className="mb-6">
                <h4 className={`font-semibold text-slate-700 text-sm mb-3 ${isAr ? 'text-right' : ''}`}>
                  {t('transformationChain', 'سلسلة التحول: من التقنية إلى السلوك اليومي')}
                </h4>
                <CauseEffectChain
                  steps={[
                    { label: change.technology, description: t('technology', 'التقنية'), icon: '💻' },
                    { label: change.capability, description: t('capability', 'القدرة الجديدة'), icon: '⚡' },
                    { label: change.changedBehavior, description: t('changedBehavior', 'السلوك المتغير'), icon: '🔄' },
                    { label: change.socialTransformation, description: t('socialTransformation', 'التحول الاجتماعي'), icon: '🌍' },
                  ]}
                />
              </div>

              {/* Stop & think */}
              <StopAndThink
                questionEn={`How did ${change.nameEn} change people's daily habits?`}
                questionAr={`كيف غيّر ${change.nameAr} العادات اليومية للناس؟`}
                hintEn="Think about how people did this activity 20 years ago versus today."
                hintAr="فكّر كيف كان الناس يقومون بهذا النشاط قبل 20 عامًا مقارنة باليوم."
              />
            </motion.div>
          );
        })()}
      </div>
    </section>
  );
}
