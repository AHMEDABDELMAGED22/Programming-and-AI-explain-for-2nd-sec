'use client';

import { motion } from 'framer-motion';

interface CauseEffectChainProps {
  steps: { label: string; description?: string; icon?: string }[];
  className?: string;
  animationDelay?: number;
}

export default function CauseEffectChain({
  steps,
  className = '',
  animationDelay = 0,
}: CauseEffectChainProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {steps.map((step, i) => (
        <div key={i}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: animationDelay + i * 0.3, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm"
          >
            {step.icon && <span className="text-2xl">{step.icon}</span>}
            <div>
              <span className="font-semibold text-slate-800">{step.label}</span>
              {step.description && (
                <p className="text-sm text-slate-500 mt-0.5">{step.description}</p>
              )}
            </div>
          </motion.div>

          {/* Arrow between steps */}
          {i < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: animationDelay + i * 0.3 + 0.2, duration: 0.2 }}
              className="flex justify-center py-1"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary-400">
                <path d="M12 4l0 12M7 12l5 5 5-5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
