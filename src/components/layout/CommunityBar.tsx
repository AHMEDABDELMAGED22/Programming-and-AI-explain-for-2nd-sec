'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLessonStore } from '@/store/lessonStore';
import { useTranslation } from '@/lib/i18n';

export default function CommunityBar() {
  const { isClassroomMode } = useLessonStore();
  const { isAr } = useTranslation();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Strictly hidden in Teacher / Classroom Presentation Mode
  if (isClassroomMode || isDismissed) {
    return null;
  }

  return (
    <div className={`fixed z-40 transition-all duration-300 ${
      isAr ? 'left-3 sm:left-6' : 'right-3 sm:right-6'
    } bottom-20 md:bottom-6`}>
      <AnimatePresence mode="wait">
        {isMinimized ? (
          <motion.button
            key="minimized"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsMinimized(false)}
            className="px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-bold border-2 border-white/40 transition-all cursor-pointer touch-target"
            aria-label="Open student community bar"
          >
            <span>💬</span>
            <span>{isAr ? 'جروب الواتساب والأسئلة' : 'WhatsApp Group & Help'}</span>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl rounded-2xl p-2 sm:p-2.5 flex items-center gap-2 max-w-[94vw] sm:max-w-md"
          >
            {/* WhatsApp Student Group CTA (Primary) */}
            <a
              href="https://chat.whatsapp.com/GNl1KY1JxJ8G8lhsk3X1V1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 active:scale-95 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 whitespace-nowrap"
            >
              <span>💬</span>
              <span>{isAr ? 'انضم لجروب الواتساب' : 'Join WhatsApp Group'}</span>
            </a>

            {/* "Ask Eng. Ahmed Abdelmaged" Direct WhatsApp CTA with Real Photo (Secondary) */}
            <a
              href="https://wa.me/201552136249"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 border border-slate-200 whitespace-nowrap"
              title={isAr ? 'اسأل م/ أحمد عبد المجيد على واتساب' : 'Ask Eng. Ahmed Abdelmaged on WhatsApp'}
            >
              <div className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-amber-400 flex-shrink-0">
                <Image
                  src="/assets/lesson1/avatar.webp"
                  alt="أ/ أحمد عبد المجيد"
                  fill
                  className="object-cover"
                  sizes="20px"
                />
              </div>
              <span>{isAr ? 'اسأل م/ أحمد' : 'Ask Eng. Ahmed'}</span>
            </a>

            {/* Minimize / Close Actions */}
            <div className="flex items-center gap-1 border-s border-slate-200 ps-1.5 flex-shrink-0">
              <button
                onClick={() => setIsMinimized(true)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center text-xs transition-colors cursor-pointer"
                title={isAr ? 'تصغير' : 'Minimize'}
                aria-label="Minimize community bar"
              >
                _
              </button>
              <button
                onClick={() => setIsDismissed(true)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center text-xs transition-colors cursor-pointer"
                title={isAr ? 'إغلاق' : 'Close'}
                aria-label="Dismiss community bar"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
