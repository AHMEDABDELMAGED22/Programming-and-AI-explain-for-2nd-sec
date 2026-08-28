'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { useLessonStore } from '@/store/lessonStore';
import { getTeacherVideos, saveTeacherVideo, deleteTeacherVideo } from '@/lib/storage';
import { LocalVideo } from '@/lib/types';

export default function TeacherVideoManagerModal() {
  const { isTeacherVideoModalOpen, setTeacherVideoModalOpen, openVideo } = useLessonStore();
  const { isAr } = useTranslation();

  const [videos, setVideos] = useState<LocalVideo[]>([]);
  const [title, setTitle] = useState('');
  const [section, setSection] = useState('intro');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const sections = [
    { id: 'intro', label: isAr ? 'مقدمة الدرس' : 'Lesson Intro' },
    { id: 'timeline', label: isAr ? 'التسلسل الزمني' : 'Timeline' },
    { id: 'moores-law', label: isAr ? 'قانون مور' : "Moore's Law" },
    { id: 'social', label: isAr ? 'التأثير الاجتماعي' : 'Social Impact' },
    { id: 'emerging', label: isAr ? 'التقنيات الحديثة' : 'Modern Tech' },
    { id: 'comparisons', label: isAr ? 'المقارنات' : 'Comparisons' },
    { id: 'practice', label: isAr ? 'التدريبات' : 'Practice' },
    { id: 'exam', label: isAr ? 'الامتحان' : 'Exam Preparation' },
    { id: 'review', label: isAr ? 'المراجعة النهائية' : 'Final Review' },
  ];

  const loadVideos = async () => {
    const list = await getTeacherVideos();
    setVideos(list);
  };

  useEffect(() => {
    if (isTeacherVideoModalOpen) {
      loadVideos();
    }
  }, [isTeacherVideoModalOpen]);

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !videoUrl.trim()) return;

    setLoading(true);
    let finalId = videoUrl.trim();
    let isYoutube = true;

    // Check if YouTube URL or ID
    if (finalId.includes('youtube.com/watch?v=')) {
      finalId = finalId.split('v=')[1]?.split('&')[0] || finalId;
    } else if (finalId.includes('youtu.be/')) {
      finalId = finalId.split('youtu.be/')[1]?.split('?')[0] || finalId;
    } else if (!finalId.startsWith('http') && !finalId.startsWith('blob:') && finalId.length === 11) {
      isYoutube = true;
    } else {
      isYoutube = false;
    }

    const newVideo: LocalVideo = {
      id: `custom-vid-${Date.now()}`,
      title: title.trim(),
      description: isYoutube ? 'YouTube Video' : 'Local Video',
      filePath: finalId,
      assignedSection: section,
      addedAt: new Date().toISOString(),
    };

    await saveTeacherVideo(newVideo);
    await loadVideos();
    setTitle('');
    setVideoUrl('');
    setLoading(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setTitle(file.name.replace(/\.[^/.]+$/, ''));
    setVideoUrl(url);
  };

  const handleDelete = async (id: string) => {
    await deleteTeacherVideo(id);
    await loadVideos();
  };

  if (!isTeacherVideoModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] modal-overlay flex items-center justify-center p-3 sm:p-6"
        onClick={() => setTeacherVideoModalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-primary-600 to-indigo-700 text-white flex items-center justify-between">
            <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
              <span className="text-2xl sm:text-3xl">🎬</span>
              <div>
                <h3 className="font-bold text-lg sm:text-xl">
                  {isAr ? 'إدارة فيديوهات المعلم الإضافية' : 'Teacher Video Manager'}
                </h3>
                <p className="text-xs sm:text-sm text-primary-100">
                  {isAr ? 'أضف فيديوهات مخصصة أو روابط يوتيوب لأي قسم في الدرس' : 'Attach custom local or YouTube videos to lesson sections'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setTeacherVideoModalOpen(false)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-lg transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* Add New Video Form */}
            <form onSubmit={handleAddVideo} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <h4 className={`font-bold text-slate-800 text-sm ${isAr ? 'text-right' : ''}`}>
                {isAr ? '➕ إضافة فيديو جديد للدرس' : '➕ Add New Video to Section'}
              </h4>

              <div className="space-y-2">
                <label className={`block text-xs font-semibold text-slate-600 ${isAr ? 'text-right' : ''}`}>
                  {isAr ? 'عنوان الفيديو' : 'Video Title'}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={isAr ? 'مثال: تجربة عملية على الحوسبة السحابية' : 'e.g., Practical Cloud Demo'}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-primary-500 bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-semibold text-slate-600 mb-1 ${isAr ? 'text-right' : ''}`}>
                    {isAr ? 'القسم المرتبط' : 'Target Section'}
                  </label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-primary-500"
                  >
                    {sections.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-semibold text-slate-600 mb-1 ${isAr ? 'text-right' : ''}`}>
                    {isAr ? 'رابط يوتيوب أو ملف MP4' : 'YouTube URL/ID or MP4'}
                  </label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-primary-500 bg-white"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <label className="text-xs text-primary-600 hover:text-primary-700 font-semibold cursor-pointer flex items-center gap-1">
                  <span>📁 {isAr ? 'رفع ملف فيديو من الجهاز' : 'Upload Local File'}</span>
                  <input type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
                >
                  {isAr ? 'حفظ الفيديو' : 'Save Video'}
                </button>
              </div>
            </form>

            {/* List of custom videos */}
            <div>
              <h4 className={`font-bold text-slate-800 text-sm mb-3 ${isAr ? 'text-right' : ''}`}>
                {isAr ? '📋 الفيديوهات المضافة حالياً' : '📋 Currently Attached Videos'} ({videos.length})
              </h4>

              {videos.length === 0 ? (
                <p className="text-xs sm:text-sm text-slate-400 italic text-center py-6 border border-dashed border-slate-200 rounded-2xl">
                  {isAr ? 'لم تتم إضافة أي فيديوهات مخصصة بعد.' : 'No custom teacher videos added yet.'}
                </p>
              ) : (
                <div className="space-y-2">
                  {videos.map((vid) => {
                    const isYt = !vid.filePath.startsWith('blob:') && (vid.filePath.length === 11 || vid.description.includes('YouTube') || vid.filePath.includes('youtu'));
                    return (
                      <div
                        key={vid.id}
                        className="p-3 rounded-xl border border-slate-200 bg-white hover:border-primary-300 flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">📹</span>
                          <div>
                            <p className="font-bold text-sm text-slate-800">{vid.title}</p>
                            <p className="text-xs text-slate-500">
                              {sections.find((s) => s.id === vid.assignedSection)?.label || vid.assignedSection} • {isYt ? 'YouTube' : 'Local'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (isYt) {
                                openVideo(vid.filePath, 'youtube');
                              } else {
                                openVideo(vid.filePath, 'local');
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-primary-50 hover:text-primary-600 text-xs font-bold transition-colors cursor-pointer"
                          >
                            ▶️ {isAr ? 'تشغيل' : 'Play'}
                          </button>
                          <button
                            onClick={() => handleDelete(vid.id)}
                            className="w-8 h-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center text-sm transition-colors cursor-pointer"
                            title={isAr ? 'حذف' : 'Delete'}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
