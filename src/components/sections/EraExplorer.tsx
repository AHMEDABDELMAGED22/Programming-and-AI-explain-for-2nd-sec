'use client';

import { motion } from 'framer-motion';
import { useLessonStore } from '@/store/lessonStore';
import { useTranslation } from '@/lib/i18n';
import { timelineEras } from '@/data/timelineData';
import RevealButton from '@/components/interactive/RevealButton';
import StopAndThink from '@/components/interactive/StopAndThink';
import TeacherNote from '@/components/interactive/TeacherNote';
import CauseEffectChain from '@/components/interactive/CauseEffectChain';

// Arabic content for era details
const arDetails: Record<string, { techExplanation: string; socialImpact: string; example: string; exampleDetail: string; thinkQuestion: string }> = {
  'era-1940s': {
    techExplanation: 'استخدمت أقدم الحواسيب الإلكترونية الأنابيب المفرغة — أنابيب زجاجية تتحكم في الإشارات الكهربائية.',
    socialImpact: 'كان الحوسبة حصرية للاستخدام العسكري والعلمي. لم يكن للجمهور العام أي وصول إلى الحواسيب.',
    example: 'ENIAC بُني في جامعة بنسلفانيا للجيش الأمريكي. كان يستطيع إجراء 5,000 عملية جمع في الثانية.',
    exampleDetail: 'استهلك ENIAC 150 كيلوواط من الطاقة. يُقال أنه عند تشغيله، خفتت أضواء فيلادلفيا.',
    thinkQuestion: 'لماذا كانت الحواسيب الأولى ضخمة جدًا، ومن كان يملك الوصول إليها؟',
  },
  'era-1970s': {
    techExplanation: 'جعلت الحواسيب الشخصية الحوسبة متاحة للأفراد والشركات الصغيرة.',
    socialImpact: 'بداية استخدام الحاسوب الشخصي في المنازل والمكاتب.',
    example: 'كمبيوتر IBM PC (1981) — أصبح المعيار في عالم الأعمال والحوسبة الشخصية.',
    exampleDetail: 'أطلقت Apple الـ Macintosh في 1984 بأول واجهة رسومية ناجحة تجاريًا.',
    thinkQuestion: 'كيف غيّر انتشار الحواسيب الشخصية من يستطيع استخدام الحاسوب؟',
  },
  'era-1990s': {
    techExplanation: 'تمت تجارة الإنترنت ونشأت الشبكة العالمية (Web)، مما أتاح مشاركة المعلومات عالميًا.',
    socialImpact: 'عولمة المعلومات وانتشار البريد الإلكتروني.',
    example: 'متصفح Mosaic (1993) — جعل الإنترنت مرئيًا وسهل الاستخدام لأول مرة.',
    exampleDetail: 'بحلول 1999، كان هناك أكثر من 250 مليون مستخدم للإنترنت حول العالم.',
    thinkQuestion: 'كيف غيّر الإنترنت طريقة حصول الناس على المعلومات؟',
  },
  'era-2000s': {
    techExplanation: 'ظهور الهواتف الذكية (iPhone وغيرها) جعل الإنترنت متاحًا في كل مكان.',
    socialImpact: 'انتشار انفجاري للإنترنت المحمول.',
    example: 'iPhone الأصلي (2007) — أحدث ثورة في الحوسبة المحمولة بشاشته اللمسية.',
    exampleDetail: 'بحلول 2010، تجاوز استخدام الإنترنت عبر الهاتف الاستخدام عبر الحاسوب في عدة دول.',
    thinkQuestion: 'ما الذي جعل الهاتف الذكي مختلفًا عن الهاتف المحمول العادي؟',
  },
  'era-2010s': {
    techExplanation: 'انتشار الحوسبة السحابية — تقنية المعلومات تُقدَّم كخدمة عبر الإنترنت.',
    socialImpact: 'تحليل البيانات على نطاق واسع والذكاء الاصطناعي؛ "تكنولوجيا المعلومات كخدمة" أصبحت منتشرة.',
    example: 'خدمات مثل Google Drive و Netflix و AWS — كلها تعمل على السحابة.',
    exampleDetail: 'الحوسبة السحابية سمحت حتى للشركات الصغيرة بالوصول إلى قوة حوسبة هائلة بدون امتلاك خوادم خاصة.',
    thinkQuestion: 'لماذا تُعتبر الحوسبة السحابية "تكنولوجيا معلومات كخدمة"؟',
  },
};

interface EraExplorerProps {
  eraId: string;
}

export default function EraExplorer({ eraId }: EraExplorerProps) {
  const { openVideo, openLightbox, getRevealStep, advanceReveal, resetReveal } = useLessonStore();
  const { t, dir, isAr } = useTranslation();
  const era = timelineEras.find(e => e.id === eraId);
  if (!era) return null;

  const step = getRevealStep(eraId);
  const sectionKey = eraId;
  const ar = arDetails[eraId];

  return (
    <div className="card-interactive p-8 md:p-10" dir={dir}>
      {/* Era header */}
      <div className={`flex flex-col md:flex-row md:items-start gap-8 mb-8 ${isAr ? 'md:flex-row-reverse' : ''}`}>
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-80 flex-shrink-0"
        >
          <div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 cursor-pointer group"
            onClick={() => openLightbox({ src: era.image.src, alt: era.image.alt, caption: era.image.caption })}
          >
            <img
              src={era.image.src}
              alt={era.image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23f1f5f9"><rect width="400" height="300"/><text x="200" y="150" text-anchor="middle" fill="%2394a3b8" font-size="48">${era.icon}</text></svg>`)}`;
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
              <p className="text-white text-sm italic">{era.image.caption}</p>
            </div>
          </div>
        </motion.div>

        {/* Info */}
        <div className={`flex-1 ${isAr ? 'text-right' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: isAr ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <span className="text-4xl mb-3 block">{era.icon}</span>
            <h3 className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: isAr ? 'var(--font-noto-arabic), sans-serif' : 'var(--font-heading)' }}>
              {era.period} — {isAr ? era.titleAr : era.titleEn}
            </h3>
            <p className={`text-slate-400 text-lg mb-4 ${isAr ? 'font-sans' : 'arabic-text'}`}>
              {isAr ? era.titleEn : era.detailedContent.arabicSupport}
            </p>

            <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
              <p className="text-sm font-semibold text-slate-500 mb-1">{t('majorTech', 'التقنيات الرئيسية')}</p>
              <p className="text-slate-800 font-medium text-lg">{era.technologies}</p>
            </div>

            <TeacherNote content={era.teacherNote} type="say" className="mb-4" />
          </motion.div>
        </div>
      </div>

      {/* Progressive reveal steps */}
      <div className="space-y-6">
        {/* Step 1: What changed? */}
        {step < 1 ? (
          <RevealButton
            label={t('whatChanged', 'ماذا تغيّر؟')}
            icon="🔍"
            variant="primary"
            onReveal={() => advanceReveal(sectionKey)}
          >
            <></>
          </RevealButton>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className={`font-semibold text-slate-800 text-xl mb-3 flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
              <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold">1</span>
              {t('socialImpact', 'التأثير الاجتماعي')}
            </h4>
            <CauseEffectChain
              steps={[
                { label: era.technologies, description: t('technology', 'التقنية'), icon: '💻' },
                { label: isAr && ar ? ar.socialImpact : era.impact, description: t('impactLabel', 'التأثير على المجتمع'), icon: '🌍' },
              ]}
            />
          </motion.div>
        )}

        {/* Step 2: Explore Example */}
        {step >= 1 && (
          step < 2 ? (
            <RevealButton
              label={t('exploreExample', 'استكشف المثال')}
              icon="📖"
              variant="accent"
              onReveal={() => advanceReveal(sectionKey)}
            >
              <></>
            </RevealButton>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className={`font-semibold text-slate-800 text-xl mb-3 flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                <span className="w-8 h-8 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center text-sm font-bold">2</span>
                {t('example', 'مثال')}
              </h4>
              <div className={`bg-accent-50 border border-accent-200 rounded-xl p-5 ${isAr ? 'text-right' : ''}`}>
                <p className="text-slate-700 leading-relaxed mb-3">
                  {isAr && ar ? ar.example : era.detailedContent.example}
                </p>
                <p className="text-slate-500 text-sm italic">
                  {isAr && ar ? ar.exampleDetail : era.detailedContent.exampleDetail}
                </p>
              </div>
            </motion.div>
          )
        )}

        {/* Step 3: Watch video */}
        {step >= 2 && (
          step < 3 ? (
            <RevealButton
              label={t('watch', 'شاهد')}
              icon="▶️"
              variant="warm"
              onReveal={() => advanceReveal(sectionKey)}
            >
              <></>
            </RevealButton>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 ${isAr ? 'sm:flex-row-reverse' : ''}`}
            >
              <h4 className={`font-semibold text-slate-800 text-xl flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                <span className="w-8 h-8 rounded-full bg-warm-100 text-warm-600 flex items-center justify-center text-sm font-bold">3</span>
                {t('video', 'فيديو')}
              </h4>
              <button
                onClick={() => openVideo(era.youtubeVideoId, 'youtube')}
                className={`touch-target flex items-center gap-3 px-6 py-3 rounded-xl
                  bg-red-50 border border-red-200 text-red-700 font-medium
                  hover:bg-red-100 active:scale-95 transition-all cursor-pointer ${isAr ? 'flex-row-reverse' : ''}`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.5c-.3-1-1.1-1.8-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4c-1 .3-1.8 1.1-2.1 2.1C0 8.4 0 12 0 12s0 3.6.5 5.5c.3 1 1.1 1.8 2.1 2.1 1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-5.5.5-5.5s0-3.6-.5-5.5zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z"/>
                </svg>
                {t('watchVideo', 'شاهد الفيديو التعليمي')}
              </button>
            </motion.div>
          )
        )}

        {/* Step 4: Think */}
        {step >= 3 && (
          step < 4 ? (
            <RevealButton
              label={t('think', 'فكّر')}
              icon="🤔"
              variant="violet"
              onReveal={() => advanceReveal(sectionKey)}
            >
              <></>
            </RevealButton>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <StopAndThink
                questionEn={era.thinkQuestion}
                questionAr={ar?.thinkQuestion || era.thinkQuestion}
                hintEn="Consider how this technology changed who had access to computing and information."
                hintAr="فكّر كيف غيّرت هذه التقنية من يملك الوصول إلى الحوسبة والمعلومات."
                answerEn={era.detailedContent.socialImpact}
                answerAr={ar?.socialImpact || era.detailedContent.socialImpact}
              />
            </motion.div>
          )
        )}

        {/* Reset button */}
        {step > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex pt-4 ${isAr ? 'justify-start' : 'justify-end'}`}
          >
            <button
              onClick={() => resetReveal(sectionKey)}
              className="touch-target px-5 py-2.5 rounded-xl bg-slate-100 text-slate-500 text-sm font-medium
                hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
            >
              {t('resetEra', '↺ إعادة تعيين هذه الحقبة')}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
