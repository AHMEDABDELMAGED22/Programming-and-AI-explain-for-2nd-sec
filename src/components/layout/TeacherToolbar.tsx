'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLessonStore } from '@/store/lessonStore';
import { useTranslation } from '@/lib/i18n';
import { useState } from 'react';

export default function TeacherToolbar() {
  const {
    isTeacherMode,
    toggleTeacherMode,
    isClassroomMode,
    toggleClassroomMode,
    resetAllReveals,
    resetAnimations,
    showTeacherNotes,
    setShowTeacherNotes,
    setActiveSection,
  } = useLessonStore();
  const { t, isAr } = useTranslation();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showJumpMenu, setShowJumpMenu] = useState(false);

  const sections = [
    { id: 'intro', labelEn: '📖 Lesson Intro', labelAr: '📖 مقدمة الدرس' },
    { id: 'timeline', labelEn: '⏳ Timeline', labelAr: '⏳ التسلسل الزمني' },
    { id: 'moores-law', labelEn: "📈 Moore's Law", labelAr: '📈 قانون مور' },
    { id: 'social', labelEn: '🌍 Social Impact', labelAr: '🌍 التأثير الاجتماعي' },
    { id: 'emerging', labelEn: '🚀 Modern Tech', labelAr: '🚀 التقنيات الحديثة' },
    { id: 'comparisons', labelEn: '⚖️ Comparisons', labelAr: '⚖️ المقارنات' },
    { id: 'practice', labelEn: '✏️ Practice', labelAr: '✏️ التدريبات' },
    { id: 'exam', labelEn: '📝 Exam', labelAr: '📝 الامتحان' },
    { id: 'stop-and-think', labelEn: '💭 Stop & Think', labelAr: '💭 توقف وفكر' },
    { id: 'review', labelEn: '⭐ Review', labelAr: '⭐ المراجعة' },
  ];

  const jumpTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth' });
    setShowJumpMenu(false);
  };

  return (
    <div className={`fixed bottom-6 z-50 flex flex-col gap-3 teacher-toolbar no-print ${isAr ? 'left-6 items-start' : 'right-6 items-end'}`}>
      {/* Jump menu */}
      <AnimatePresence>
        {showJumpMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 mb-2"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => jumpTo(s.id)}
                className={`w-full px-4 py-2.5 rounded-xl hover:bg-slate-50 text-sm font-medium
                  text-slate-700 transition-colors cursor-pointer touch-target ${isAr ? 'text-right' : 'text-left'}`}
              >
                {isAr ? s.labelAr : s.labelEn}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toolbar buttons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`flex flex-col gap-2 ${isAr ? 'items-start' : 'items-end'}`}
          >
            {/* Classroom Mode */}
            <ToolbarButton
              icon={isClassroomMode ? '🖥️' : '📺'}
              label={isClassroomMode ? t('exitClassroom', 'خروج من الفصل') : t('classroomMode', 'وضع الفصل')}
              onClick={toggleClassroomMode}
              active={isClassroomMode}
              isAr={isAr}
            />

            {/* Teacher Notes Toggle */}
            <ToolbarButton
              icon="📝"
              label={showTeacherNotes ? t('hideNotes', 'إخفاء الملاحظات') : t('showNotes', 'إظهار الملاحظات')}
              onClick={() => setShowTeacherNotes(!showTeacherNotes)}
              active={showTeacherNotes}
              isAr={isAr}
            />

            {/* Jump to Section */}
            <ToolbarButton
              icon="🔀"
              label={t('jumpToSection', 'انتقل إلى قسم')}
              onClick={() => setShowJumpMenu(!showJumpMenu)}
              active={showJumpMenu}
              isAr={isAr}
            />

            {/* Reset Animations */}
            <ToolbarButton
              icon="↺"
              label={t('resetAnimations', 'إعادة تعيين الحركات')}
              onClick={() => { resetAnimations(); resetAllReveals(); }}
              isAr={isAr}
            />

            {/* Teacher Mode Toggle */}
            <ToolbarButton
              icon={isTeacherMode ? '👨‍🏫' : '👤'}
              label={isTeacherMode ? t('teacherMode', 'وضع المعلم') : t('studentView', 'عرض الطالب')}
              onClick={toggleTeacherMode}
              active={isTeacherMode}
              isAr={isAr}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl
          transition-all active:scale-90 cursor-pointer
          ${isExpanded ? 'bg-slate-700 text-white' : 'bg-primary-600 text-white'}`}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
      >
        ⚙
      </motion.button>
    </div>
  );
}

function ToolbarButton({
  icon,
  label,
  onClick,
  active = false,
  isAr = false,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  active?: boolean;
  isAr?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-md font-medium text-sm
        transition-all active:scale-95 cursor-pointer touch-target
        ${active
          ? 'bg-primary-600 text-white'
          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
        } ${isAr ? 'flex-row-reverse' : ''}`}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </motion.button>
  );
}
