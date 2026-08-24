// ============================================================
// Zustand Store — Global App State
// ============================================================
import { create } from 'zustand';
import type { Locale } from '@/lib/i18n';

interface LessonState {
  // Language
  locale: Locale;
  toggleLocale: () => void;

  // Navigation
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Classroom Mode
  isClassroomMode: boolean;
  toggleClassroomMode: () => void;

  // Teacher Mode
  isTeacherMode: boolean;
  toggleTeacherMode: () => void;
  showTeacherNotes: boolean;
  setShowTeacherNotes: (show: boolean) => void;

  // Timeline
  selectedEra: string | null;
  setSelectedEra: (era: string | null) => void;

  // Progressive Reveal states (section -> step number)
  revealStates: Record<string, number>;
  advanceReveal: (sectionId: string) => void;
  resetReveal: (sectionId: string) => void;
  resetAllReveals: () => void;
  getRevealStep: (sectionId: string) => number;

  // Video Modal
  activeVideoId: string | null;
  activeVideoType: 'youtube' | 'local' | null;
  openVideo: (videoId: string, type: 'youtube' | 'local') => void;
  closeVideo: () => void;

  // Image Lightbox
  lightboxImage: { src: string; alt: string; caption: string } | null;
  openLightbox: (img: { src: string; alt: string; caption: string }) => void;
  closeLightbox: () => void;

  // Animation reset
  animationResetKey: number;
  resetAnimations: () => void;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  // Language
  locale: 'en',
  toggleLocale: () => set((s) => ({ locale: s.locale === 'en' ? 'ar' : 'en' })),

  // Navigation
  activeSection: 'intro',
  setActiveSection: (section) => set({ activeSection: section }),

  // Classroom Mode
  isClassroomMode: false,
  toggleClassroomMode: () => set((s) => {
    const next = !s.isClassroomMode;
    if (next && typeof document !== 'undefined') {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else if (!next && typeof document !== 'undefined') {
      document.exitFullscreen?.().catch(() => {});
    }
    return { isClassroomMode: next };
  }),

  // Teacher Mode
  isTeacherMode: true,
  toggleTeacherMode: () => set((s) => ({ isTeacherMode: !s.isTeacherMode })),
  showTeacherNotes: false,
  setShowTeacherNotes: (show) => set({ showTeacherNotes: show }),

  // Timeline
  selectedEra: null,
  setSelectedEra: (era) => set({ selectedEra: era }),

  // Progressive Reveal
  revealStates: {},
  advanceReveal: (sectionId) => set((s) => ({
    revealStates: {
      ...s.revealStates,
      [sectionId]: (s.revealStates[sectionId] ?? 0) + 1
    }
  })),
  resetReveal: (sectionId) => set((s) => ({
    revealStates: {
      ...s.revealStates,
      [sectionId]: 0
    }
  })),
  resetAllReveals: () => set({ revealStates: {} }),
  getRevealStep: (sectionId) => get().revealStates[sectionId] ?? 0,

  // Video Modal
  activeVideoId: null,
  activeVideoType: null,
  openVideo: (videoId, type) => set({ activeVideoId: videoId, activeVideoType: type }),
  closeVideo: () => set({ activeVideoId: null, activeVideoType: null }),

  // Image Lightbox
  lightboxImage: null,
  openLightbox: (img) => set({ lightboxImage: img }),
  closeLightbox: () => set({ lightboxImage: null }),

  // Animation reset
  animationResetKey: 0,
  resetAnimations: () => set((s) => ({ animationResetKey: s.animationResetKey + 1 })),
}));
