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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`flex items-center gap-3 ${className}`}
    >
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image
          src="/assets/lesson1/avatar.png"
          alt="Teacher avatar"
          fill
          className="rounded-full object-cover ring-2 ring-primary-200"
          sizes="40px"
        />
      </div>
      <div className="bg-primary-50 border border-primary-200 rounded-xl rounded-bl-sm px-4 py-2 max-w-sm">
        <p className="text-sm text-primary-800 font-medium">
          {typeEmoji[type]} {message}
        </p>
      </div>
    </motion.div>
  );
}
