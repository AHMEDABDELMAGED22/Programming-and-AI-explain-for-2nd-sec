'use client';

import { useEffect } from 'react';
import { useLessonStore } from '@/store/lessonStore';
import { useTranslation } from '@/lib/i18n';
import Navigation from '@/components/layout/Navigation';
import TeacherToolbar from '@/components/layout/TeacherToolbar';
import CommunityBar from '@/components/layout/CommunityBar';
import VideoModal from '@/components/interactive/VideoModal';
import ImageLightbox from '@/components/interactive/ImageLightbox';
import LessonIntro from '@/components/sections/LessonIntro';
import InteractiveTimeline from '@/components/sections/InteractiveTimeline';
import MooresLaw from '@/components/sections/MooresLaw';
import SocialTransformation from '@/components/sections/SocialTransformation';
import EmergingTech from '@/components/sections/EmergingTech';
import ComparisonSection from '@/components/sections/ComparisonSection';
import StopAndThinkSection from '@/components/sections/StopAndThinkSection';
import WorkedExample from '@/components/sections/WorkedExample';
import ExamPreparation from '@/components/sections/ExamPreparation';
import FinalReview from '@/components/sections/FinalReview';

export default function LessonPage() {
  const { isClassroomMode, setActiveSection, hydrateFromStorage } = useLessonStore();
  const { isAr, dir } = useTranslation();

  // Hydrate session progress from localStorage on mount (Task 6)
  useEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  // Sync document lang and dir
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = isAr ? 'ar' : 'en';
      document.documentElement.dir = dir;
    }
  }, [isAr, dir]);

  // Keyboard navigation & Teacher Mode shortcut (t key)
  useEffect(() => {
    const sections = ['intro', 'timeline', 'moores-law', 'social', 'emerging', 'comparisons', 'practice', 'exam', 'stop-and-think', 'review'];

    // Check URL params for ?teacher=true
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('teacher') === 'true' || params.get('mode') === 'teacher') {
        useLessonStore.getState().toggleTeacherMode();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 't' || e.key === 'T' || e.key === 'ف') {
        useLessonStore.getState().toggleTeacherMode();
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const currentIdx = sections.indexOf(useLessonStore.getState().activeSection);
        const nextIdx = Math.min(currentIdx + 1, sections.length - 1);
        setActiveSection(sections[nextIdx]);
        document.getElementById(`section-${sections[nextIdx]}`)?.scrollIntoView({ behavior: 'smooth' });
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const currentIdx = sections.indexOf(useLessonStore.getState().activeSection);
        const prevIdx = Math.max(currentIdx - 1, 0);
        setActiveSection(sections[prevIdx]);
        document.getElementById(`section-${sections[prevIdx]}`)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveSection]);

  // Intersection observer
  useEffect(() => {
    const sections = document.querySelectorAll('[id^="section-"]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('section-', '');
            setActiveSection(id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [setActiveSection]);

  // Update html attributes when locale changes
  useEffect(() => {
    document.documentElement.lang = isAr ? 'ar' : 'en';
    document.documentElement.dir = dir;
  }, [isAr, dir]);

  return (
    <div className={isClassroomMode ? 'classroom-mode' : ''}>
      {/* Navigation sidebar */}
      <Navigation />

      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${isClassroomMode ? '' : isAr ? 'mr-0 md:mr-20' : 'ml-0 md:ml-20'} pt-16 pb-40 md:pt-0 md:pb-12`}>
        <LessonIntro />

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <InteractiveTimeline />

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <MooresLaw />

        <SocialTransformation />

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <EmergingTech />

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <ComparisonSection />

        <WorkedExample />

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <ExamPreparation />

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <StopAndThinkSection />

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <FinalReview />
      </main>

      {/* Overlays */}
      <VideoModal />
      <ImageLightbox />

      {/* Teacher Toolbar */}
      <TeacherToolbar />

      {/* Public Student Community CTA Bar (Task 3) */}
      <CommunityBar />
    </div>
  );
}
