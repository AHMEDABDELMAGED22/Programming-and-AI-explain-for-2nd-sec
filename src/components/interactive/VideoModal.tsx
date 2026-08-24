'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLessonStore } from '@/store/lessonStore';
import { useEffect, useCallback } from 'react';

export default function VideoModal() {
  const { activeVideoId, activeVideoType, closeVideo } = useLessonStore();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') closeVideo();
  }, [closeVideo]);

  useEffect(() => {
    if (activeVideoId) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeVideoId, handleKeyDown]);

  return (
    <AnimatePresence>
      {activeVideoId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] modal-overlay flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-black rounded-2xl overflow-hidden shadow-2xl w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/60 text-white
                flex items-center justify-center text-2xl hover:bg-black/80
                active:scale-90 transition-all cursor-pointer"
              aria-label="Close video"
            >
              ✕
            </button>

            {/* Video content */}
            <div className="aspect-video w-full">
              {activeVideoType === 'youtube' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoId}?rel=0&modestbranding=1`}
                  title="Educational Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                />
              ) : (
                <video
                  src={activeVideoId}
                  controls
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
