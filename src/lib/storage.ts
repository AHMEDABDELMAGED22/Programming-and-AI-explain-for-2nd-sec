// ============================================================
// localStorage Abstraction — Future Supabase-compatible
// ============================================================
import { LocalVideo } from '@/lib/types';

const STORAGE_KEYS = {
  TEACHER_VIDEOS: 'lesson1_teacher_videos',
  TEACHER_CUSTOM_NOTES: 'lesson1_teacher_custom_notes',
  LESSON_PROGRESS: 'lesson1_progress',
} as const;

// ---- Teacher Videos ----

export async function getTeacherVideos(): Promise<LocalVideo[]> {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TEACHER_VIDEOS);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

export async function saveTeacherVideo(video: LocalVideo): Promise<void> {
  const videos = await getTeacherVideos();
  const existing = videos.findIndex(v => v.id === video.id);
  if (existing >= 0) {
    videos[existing] = video;
  } else {
    videos.push(video);
  }
  localStorage.setItem(STORAGE_KEYS.TEACHER_VIDEOS, JSON.stringify(videos));
}

export async function deleteTeacherVideo(id: string): Promise<void> {
  const videos = await getTeacherVideos();
  const filtered = videos.filter(v => v.id !== id);
  localStorage.setItem(STORAGE_KEYS.TEACHER_VIDEOS, JSON.stringify(filtered));
}

export async function reorderTeacherVideos(videos: LocalVideo[]): Promise<void> {
  localStorage.setItem(STORAGE_KEYS.TEACHER_VIDEOS, JSON.stringify(videos));
}

// ---- Teacher Custom Notes ----

interface CustomNote {
  id: string;
  section: string;
  content: string;
  updatedAt: string;
}

export async function getCustomNotes(): Promise<CustomNote[]> {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TEACHER_CUSTOM_NOTES);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

export async function saveCustomNote(note: CustomNote): Promise<void> {
  const notes = await getCustomNotes();
  const existing = notes.findIndex(n => n.id === note.id);
  if (existing >= 0) {
    notes[existing] = note;
  } else {
    notes.push(note);
  }
  localStorage.setItem(STORAGE_KEYS.TEACHER_CUSTOM_NOTES, JSON.stringify(notes));
}

// ---- Lesson Progress ----

interface LessonProgress {
  currentSection: string;
  completedSections: string[];
  revealStates: Record<string, number>;
  lastUpdated: string;
}

export async function saveLessonProgress(progress: LessonProgress): Promise<void> {
  localStorage.setItem(STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(progress));
}

export async function getLessonProgress(): Promise<LessonProgress | null> {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LESSON_PROGRESS);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}
