'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLessonStore } from '@/store/lessonStore';
import { useEffect, useCallback } from 'react';

export default function ImageLightbox() {
  const { lightboxImage, closeLightbox } = useLessonStore();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
  }, [closeLightbox]);

  useEffect(() => {
    if (lightboxImage) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, handleKeyDown]);

  return (
    <AnimatePresence>
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] modal-overlay flex items-center justify-center p-6"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-2 -right-2 z-10 w-12 h-12 rounded-full bg-white shadow-lg text-slate-600
                flex items-center justify-center text-xl hover:bg-slate-50
                active:scale-90 transition-all cursor-pointer"
              aria-label="Close image"
            >
              ✕
            </button>

            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
              {lightboxImage.caption && (
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <p className="text-slate-600 text-center italic">
                    {lightboxImage.caption}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
