'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface TeacherNoteProps {
  content: string;
  type?: 'say' | 'clarification' | 'example' | 'question' | 'transition' | 'misconception' | 'video-pause';
  className?: string;
}

const typeLabels: Record<string, { label: string; icon: string }> = {
  say: { label: 'What to say', icon: '🗣️' },
  clarification: { label: 'Clarification', icon: '💡' },
  example: { label: 'Teaching example', icon: '📝' },
  question: { label: 'Ask students', icon: '❓' },
  transition: { label: 'Transition', icon: '➡️' },
  misconception: { label: 'Common misconception', icon: '⚠️' },
  'video-pause': { label: 'Pause video here', icon: '⏸️' },
};

export default function TeacherNote({
  content,
  type = 'say',
  className = '',
}: TeacherNoteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const info = typeLabels[type] || typeLabels.say;

  return (
    <div className={`${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="touch-target flex items-center gap-2 px-4 py-2 rounded-lg
          bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium
          active:scale-95 transition-all border border-slate-200 cursor-pointer"
      >
        <span>📝</span>
        <span>Teacher Note</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span>{info.icon}</span>
                <span className="text-sm font-semibold text-amber-800">{info.label}</span>
              </div>
              <p className="text-amber-900 text-sm leading-relaxed">{content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
