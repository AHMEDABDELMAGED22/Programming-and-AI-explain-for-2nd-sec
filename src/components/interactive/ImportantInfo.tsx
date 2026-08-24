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
      className={`rounded-2xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-sky-50 p-6 shadow-sm ${className}`}
      dir={dir}
    >
      <div className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl flex-shrink-0">
          💡
        </div>
        <div className="flex-1">
          <h4 className={`font-bold text-blue-800 text-lg mb-2 ${isAr ? 'text-right' : ''}`}>
            {t('importantInfo', 'معلومة مهمة')}
          </h4>
          <p className={`text-slate-700 text-base leading-relaxed ${isAr ? 'text-right' : ''}`}>
            {content}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
