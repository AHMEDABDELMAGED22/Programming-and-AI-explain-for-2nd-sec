'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface VideoFacadeProps {
  videoId: string;
  title: string;
  channel?: string;
  duration?: string | number;
  isShorts?: boolean;
  className?: string;
}

export default function VideoFacade({
  videoId,
  title,
  channel,
  duration,
  isShorts = false,
  className = '',
}: VideoFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // If user clicked play, load real iframe
  if (isPlaying) {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-black ${isShorts ? 'aspect-[9/16] max-w-[320px] mx-auto' : 'aspect-video w-full'} ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Facade thumbnail poster (0 KB heavy Google scripts until clicked)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-slate-900 shadow-md cursor-pointer transition-all hover:shadow-xl ${
        isShorts ? 'aspect-[9/16] max-w-[320px] mx-auto' : 'aspect-video w-full'
      } ${className}`}
      onClick={() => setIsPlaying(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsPlaying(true);
        }
      }}
      aria-label={`Play video: ${title}`}
    >
      {/* Background Thumbnail */}
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 group-hover:via-black/20 transition-all" />

      {/* Play Button Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/90 text-white shadow-2xl flex items-center justify-center backdrop-blur-xs group-hover:bg-red-600 transition-colors"
        >
          <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </motion.div>
      </div>

      {/* Title & Info Bar Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
        <p className="font-bold text-sm sm:text-base line-clamp-1 text-white drop-shadow-md">
          {title}
        </p>
        <div className="flex items-center gap-2 mt-1 text-xs text-slate-300">
          {channel && <span className="font-medium opacity-90">{channel}</span>}
          {duration && (
            <>
              <span>•</span>
              <span className="bg-black/60 px-2 py-0.5 rounded text-[11px] font-mono">
                {typeof duration === 'number' ? `${duration} min` : duration}
              </span>
            </>
          )}
          <span className="mr-auto text-[11px] bg-red-500/80 px-2 py-0.5 rounded text-white font-semibold">
            YouTube
          </span>
        </div>
      </div>
    </div>
  );
}
