'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ThinkPromptProps {
  question: string;
  hint?: string;
  answer?: string;
  teacherOnly?: boolean;
  className?: string;
}

export default function ThinkPrompt({
  question,
  hint,
  answer,
  teacherOnly = false,
  className = '',
}: ThinkPromptProps) {
  const [step, setStep] = useState(0); // 0=question, 1=hint, 2=answer

  const advance = () => {
    if (hint && step === 0) setStep(1);
    else if (answer && step < 2) setStep(2);
  };

  const reset = () => setStep(0);

  return (
    <div className={`think-card rounded-2xl p-6 ${className}`}>
      {/* Question */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-start gap-3"
      >
        <span className="text-3xl flex-shrink-0">🤔</span>
        <div>
          <h4 className="font-semibold text-violet-700 text-lg mb-1">Think About It</h4>
          <p className="text-slate-700 text-lg leading-relaxed">{question}</p>
        </div>
      </motion.div>

      {/* Hint */}
      <AnimatePresence>
        {step >= 1 && hint && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0 }}
            className="mt-4 pl-12"
          >
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
              <span className="text-sm font-medium text-violet-600">💡 Hint</span>
              <p className="text-slate-600 mt-1">{hint}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer */}
      <AnimatePresence>
        {step >= 2 && answer && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0 }}
            className="mt-4 pl-12"
          >
            <div className="bg-accent-50 border border-accent-200 rounded-xl p-4">
              <span className="text-sm font-medium text-accent-700">✅ Key Point</span>
              <p className="text-slate-700 mt-1 font-medium">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="mt-4 pl-12 flex gap-3">
        {step < 2 && (hint || answer) && (
          <motion.button
            onClick={advance}
            className="touch-target px-6 py-3 rounded-xl bg-violet-600 text-white font-medium
              hover:bg-violet-700 active:scale-95 transition-all cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            {step === 0 && hint ? '💡 Show Hint' : '✅ Reveal Answer'}
          </motion.button>
        )}
        {step > 0 && (
          <motion.button
            onClick={reset}
            className="touch-target px-5 py-3 rounded-xl bg-slate-100 text-slate-600 font-medium
              hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            ↺ Reset
          </motion.button>
        )}
      </div>
    </div>
  );
}
