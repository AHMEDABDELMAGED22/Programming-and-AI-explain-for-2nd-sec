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

  const socialDesc: Record<string, string> = {
    sns: 'مشاركة اجتماعية',
    ecommerce: 'تسوق إلكتروني',
    'remote-work': 'عمل من المنزل',
    'online-learning': 'ادرس في أي مكان',
    'cashless-payment': 'اضغط للدفع',
  };

  const socialDescEn: Record<string, string> = {
    sns: 'Social sharing',
    ecommerce: 'Online shopping',
    'remote-work': 'Work from home',
    'online-learning': 'Study anywhere',
    'cashless-payment': 'Tap to pay',
  };

  return (
    <section id="section-social" className="py-20 px-6 bg-slate-50" dir={dir}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold mb-4">
            {t('socialBadge', '🌍 المجتمع تغيّر')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
            {t('socialTitle', 'التغيرات الاجتماعية الناتجة عن تكنولوجيا المعلومات')}
          </h2>
          <p className={`text-slate-400 text-lg mb-2 ${isAr ? 'font-sans' : 'arabic-text'}`}>
            {isAr ? 'Social Changes Driven by IT' : 'التغيرات الاجتماعية الناتجة عن تكنولوجيا المعلومات'}
          </p>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            {t('socialSubtitle', 'لم تقتصر تكنولوجيا المعلومات على صنع أجهزة جديدة — بل غيّرت طريقة تواصل الناس وعملهم وتعلّمهم ودفعهم.')}
          </p>
        </motion.div>

        <TeacherNote
          content="This section covers the 5 social changes from the lesson. Tap each card to reveal the technology → capability → behavior → transformation chain."
          type="say"
          className="mb-8 flex justify-center"
        />

        {/* Social change cards grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10 ${isAr ? 'direction-rtl' : ''}`}>
          {socialChanges.map((change, i) => {
            const isSelected = selectedChange === change.id;
            return (
              <motion.button
                key={change.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedChange(isSelected ? null : change.id)}
                className={`card-interactive p-5 text-center cursor-pointer touch-target transition-all
                  ${isSelected ? 'ring-2 ring-primary-400 bg-primary-50 scale-[1.02]' : 'hover:scale-[1.02]'}
                  ${selectedChange && !isSelected ? 'opacity-60' : ''}`}
              >
                <span className="text-4xl block mb-3">{change.icon}</span>
                <h4 className="font-bold text-slate-800 text-sm mb-1">
                  {isAr ? change.nameAr : change.nameEn}
                </h4>
                <p className={`text-xs text-slate-400 ${isAr ? 'font-sans' : 'arabic-text'}`}>
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
              className="card-interactive p-8 mb-10"
            >
              <div className={`flex items-start gap-4 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                <span className="text-4xl">{change.icon}</span>
                <div className={isAr ? 'text-right' : ''}>
                  <h3 className="text-2xl font-bold text-slate-900" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
                    {isAr ? change.nameAr : change.nameEn}
                  </h3>
                  <p className={`text-slate-400 text-sm ${isAr ? 'font-sans' : 'arabic-text'}`}>
                    {isAr ? change.nameEn : change.nameAr}
                  </p>
                  <p className="text-slate-600 mt-2">
                    {isAr && arDef ? arDef.definition : change.definition}
                  </p>
                  <p className="text-sm text-slate-500 mt-1 italic">
                    {isAr ? `مثال: ${arDef?.example || change.example}` : `e.g., ${change.example}`}
                  </p>
                </div>
              </div>

              {/* Cause-effect chain */}
              <h4 className={`font-semibold text-slate-700 text-lg mb-4 ${isAr ? 'text-right' : ''}`}>
                {t('howTransformed', 'كيف حوّلت المجتمع')}
              </h4>
              <CauseEffectChain
                steps={[
                  { label: change.technology, description: isAr ? 'التقنية' : 'Technology', icon: '💻' },
                  { label: change.capability, description: isAr ? 'القدرة الجديدة' : 'New Capability', icon: '⚡' },
                  { label: change.changedBehavior, description: isAr ? 'السلوك المتغير' : 'Changed Behavior', icon: '🔄' },
                  { label: change.socialTransformation, description: isAr ? 'التحول الاجتماعي' : 'Social Transformation', icon: '🌍' },
                ]}
              />
            </motion.div>
          );
        })()}

        {/* Five icons diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-10"
        >
          <h4 className="text-center font-semibold text-slate-600 text-sm mb-4">
            {t('fiveSocialTitle', 'خمسة تغيرات اجتماعية بفعل تكنولوجيا المعلومات')}
          </h4>
          <div className={`flex flex-wrap justify-center gap-8 ${isAr ? 'flex-row-reverse' : ''}`}>
            {socialChanges.map((change) => (
              <div key={change.id} className="flex flex-col items-center text-center max-w-[120px]">
                <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center text-2xl mb-2 border border-primary-100">
                  {change.icon}
                </div>
                <span className="text-xs font-semibold text-slate-700">
                  {isAr ? change.nameAr.split('(')[0].trim() : change.nameEn.split('(')[0].trim()}
                </span>
                <span className="text-[10px] text-slate-400 italic">
                  {isAr ? socialDesc[change.id] : socialDescEn[change.id]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stop & Think */}
        <div className="max-w-3xl mx-auto">
          <StopAndThink
            questionEn="Cashless payment is spreading in many countries. If a fully cashless society were realized, choose one advantage and one possible concern, and briefly explain the reason for each."
            questionAr="ينتشر الدفع الإلكتروني في كثير من الدول. لو تحقق مجتمع بلا نقد بالكامل، اختر ميزة واحدة ومخاوف محتملة واحدة، واشرح سبب كل منهما باختصار."
            hintEn="Think about: speed and convenience vs. people without smartphones or bank accounts."
            hintAr="فكّر في: السرعة والراحة مقابل الأشخاص الذين لا يملكون هواتف ذكية أو حسابات بنكية."
            answerEn="Advantage: Speed and convenience — transactions are instant. Concern: Exclusion — people without bank cards or digital literacy may be unable to make purchases."
            answerAr="الميزة: السرعة والراحة — المعاملات فورية. المخاوف: الإقصاء — قد لا يتمكن الأشخاص بدون بطاقات بنكية أو معرفة رقمية من إجراء عمليات شراء."
          />
        </div>
      </div>
    </section>
  );
}
