// ============================================================
// Zustand Store — Global App State
// ============================================================
import { create } from 'zustand';
import type { Locale } from '@/lib/i18n';
import { getLessonProgress, saveLessonProgress } from '@/lib/storage';

interface LessonState {
  // Language
  locale: Locale;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;

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

  // Custom Teacher Videos Modal
  isTeacherVideoModalOpen: boolean;
  setTeacherVideoModalOpen: (open: boolean) => void;

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

  // Session Hydration
  hydrateFromStorage: () => Promise<void>;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  // Language - Default to Arabic as requested in Task 1
  locale: 'ar',
  toggleLocale: () => set((s) => {
    const nextLocale: Locale = s.locale === 'en' ? 'ar' : 'en';
    if (typeof window !== 'undefined') {
      localStorage.setItem('lesson1_locale', nextLocale);
    }
    return { locale: nextLocale };
  }),
  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lesson1_locale', locale);
    }
    set({ locale });
  },

  // Navigation
  activeSection: 'intro',
  setActiveSection: (section) => {
    set({ activeSection: section });
    const { revealStates } = get();
    saveLessonProgress({
      currentSection: section,
      completedSections: [],
      revealStates,
      lastUpdated: new Date().toISOString(),
    }).catch(() => {});
  },

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

  // Teacher Mode - Strictly false by default for public visitors (Fix 1)
  isTeacherMode: false,
  toggleTeacherMode: () => set((s) => {
    const next = !s.isTeacherMode;
    if (typeof window !== 'undefined') {
      if (next) {
        sessionStorage.setItem('egy_teacher_active', 'true');
      } else {
        sessionStorage.removeItem('egy_teacher_active');
      }
    }
    return { isTeacherMode: next };
  }),
  showTeacherNotes: false,
  setShowTeacherNotes: (show) => set({ showTeacherNotes: show }),

  // Custom Teacher Videos Modal
  isTeacherVideoModalOpen: false,
  setTeacherVideoModalOpen: (open) => set({ isTeacherVideoModalOpen: open }),

  // Timeline
  selectedEra: null,
  setSelectedEra: (era) => set({ selectedEra: era }),

  // Progressive Reveal
  revealStates: {},
  advanceReveal: (sectionId) => set((s) => {
    const nextStates = {
      ...s.revealStates,
      [sectionId]: (s.revealStates[sectionId] ?? 0) + 1,
    };
    saveLessonProgress({
      currentSection: s.activeSection,
      completedSections: [],
      revealStates: nextStates,
      lastUpdated: new Date().toISOString(),
    }).catch(() => {});
    return { revealStates: nextStates };
  }),
  resetReveal: (sectionId) => set((s) => {
    const nextStates = {
      ...s.revealStates,
      [sectionId]: 0,
    };
    saveLessonProgress({
      currentSection: s.activeSection,
      completedSections: [],
      revealStates: nextStates,
      lastUpdated: new Date().toISOString(),
    }).catch(() => {});
    return { revealStates: nextStates };
  }),
  resetAllReveals: () => {
    set({ revealStates: {} });
    saveLessonProgress({
      currentSection: get().activeSection,
      completedSections: [],
      revealStates: {},
      lastUpdated: new Date().toISOString(),
    }).catch(() => {});
  },
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

  // Session Hydration from localStorage
  hydrateFromStorage: async () => {
    if (typeof window === 'undefined') return;
    try {
      const savedLocale = localStorage.getItem('lesson1_locale') as Locale | null;
      if (savedLocale === 'ar' || savedLocale === 'en') {
        set({ locale: savedLocale });
      }
      if (sessionStorage.getItem('egy_teacher_active') === 'true') {
        set({ isTeacherMode: true });
      } else {
        set({ isTeacherMode: false, isClassroomMode: false });
      }
      const progress = await getLessonProgress();
      if (progress) {
        if (progress.revealStates) {
          set({ revealStates: progress.revealStates });
        }
      }
    } catch {}
  },
}));
