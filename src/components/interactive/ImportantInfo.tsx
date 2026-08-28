'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';

interface ImportantInfoProps {
  contentEn: string;
  contentAr: string;
  className?: string;
}

export default function ImportantInfo({
  contentEn,
  contentAr,
  className = '',
}: ImportantInfoProps) {
  const { t, dir, isAr } = useTranslation();
  const content = isAr ? contentAr : contentEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-3xl border-2 border-amber-300/90 bg-gradient-to-br from-amber-50 via-orange-50/40 to-yellow-50/60 p-5 sm:p-6 shadow-md shadow-amber-500/5 ${className}`}
      dir={dir}
    >
      <div className={`flex items-start gap-3.5 ${isAr ? 'flex-row-reverse' : ''}`}>
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-xl flex-shrink-0 shadow-md shadow-amber-500/20">
          💡
        </div>
        <div className="flex-1">
          <h4 className={`font-black text-amber-900 text-base sm:text-lg mb-1.5 ${isAr ? 'text-right' : ''}`}>
            {t('importantInfo', 'معلومة جوهرية')}
          </h4>
          <p className={`text-amber-950/90 text-sm sm:text-base font-medium leading-relaxed ${isAr ? 'text-right' : ''}`}>
            {content}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

