'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AvatarCalloutProps {
  message: string;
  type?: 'focus' | 'important' | 'think' | 'exam' | 'look';
  className?: string;
}

const typeEmoji: Record<string, string> = {
  focus: '👀',
  important: '❗',
  think: '🤔',
  exam: '📝',
  look: '🔍',
};

export default function AvatarCallout({
  message,
  type = 'focus',
  className = '',
}: AvatarCalloutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`flex items-end gap-3.5 my-2 ${className}`}
    >
      {/* Teacher Avatar Photo */}
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
        <Image
          src="/assets/lesson1/avatar.webp"
          alt="أ/ أحمد عبد المجيد"
          fill
          className="rounded-full object-cover ring-2 ring-amber-400 shadow-md"
          sizes="56px"
        />
        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold ring-2 ring-white">
          ✓
        </span>
      </div>

      {/* Speech Bubble with Tail */}
      <div className="relative bg-gradient-to-br from-amber-50/95 via-white to-orange-50/90 border-2 border-amber-300/90 rounded-3xl rounded-bl-xs p-3.5 sm:p-4 max-w-md shadow-md shadow-amber-500/5">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-xs">{typeEmoji[type]}</span>
          <span className="text-[11px] font-black text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded-full">
            أ/ أحمد عبد المجيد
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-800 font-bold leading-relaxed">
          {message}
        </p>
      </div>
    </motion.div>
  );
}
