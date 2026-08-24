// ============================================================
// Types for the Interactive Smart Board Teaching App — Lesson 1
// ============================================================

/** A single era on the IT development timeline */
export interface TimelineEra {
  id: string;
  period: string;
  yearStart: number;
  yearEnd: number | null; // null = "onward"
  titleEn: string;
  titleAr: string;
  technologies: string;
  impact: string;
  detailedContent: EraContent;
  image: ImageAsset;
  youtubeVideoId: string;
  thinkQuestion: string;
  teacherNote: string;
  icon: string; // emoji or icon name
}

/** Detailed content for an era exploration */
export interface EraContent {
  technologyExplanation: string;
  socialImpact: string;
  example: string;
  exampleDetail: string;
  arabicSupport: string;
}

/** A data point on the Moore's Law chart */
export interface MooresLawDataPoint {
  year: number;
  processorName: string;
  transistors: number;
  label: string;
}

/** A social change driven by IT */
export interface SocialChange {
  id: string;
  nameEn: string;
  nameAr: string;
  definition: string;
  example: string;
  technology: string;
  capability: string;
  changedBehavior: string;
  socialTransformation: string;
  icon: string;
  image?: ImageAsset;
}

/** An emerging/modern technology */
export interface EmergingTechnology {
  id: string;
  nameEn: string;
  nameAr: string;
  definition: string;
  explanation: string;
  realWorldExample: string;
  youtubeVideoId: string;
  teacherQuestion: string;
  image?: ImageAsset;
  diagram?: string; // path to diagram
  keyTerm?: string;
}

/** Image asset reference */
export interface ImageAsset {
  src: string;
  alt: string;
  caption: string;
  source?: string; // attribution
}

/** YouTube video reference */
export interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  channel: string;
  url: string;
  relatedConcept: string;
  durationMinutes?: number;
}

/** Teacher-added local video */
export interface LocalVideo {
  id: string;
  title: string;
  description: string;
  filePath: string; // blob URL or file path
  assignedSection: string;
  addedAt: string; // ISO date
}

/** Exam question */
export interface ExamQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'matching' | 'fill-blank' | 'essay';
  question: string;
  marks?: number;
  options?: ExamOption[];
  matchItems?: MatchItem[];
  hints?: string[];
  commandWord?: string;
  requiredPoints?: string[];
  answer: string;
  explanation: string;
}

export interface ExamOption {
  label: string;
  text: string;
  isCorrect: boolean;
}

export interface MatchItem {
  description: string;
  label: string;
  correctMatch: string;
}

/** Teacher note */
export interface TeacherNoteData {
  id: string;
  section: string;
  content: string;
  type: 'say' | 'clarification' | 'example' | 'question' | 'transition' | 'misconception' | 'video-pause';
}

/** Arabic term mapping */
export interface ArabicTerm {
  english: string;
  arabic: string;
  category: string;
}

/** Key fact / key concept sidebar item */
export interface SidebarItem {
  id: string;
  type: 'key-fact' | 'key-concept' | 'key-term' | 'exam-tip' | 'pause-think';
  title: string;
  content: string;
  section: string;
  icon: string;
}

/** App-wide reveal state */
export interface RevealState {
  [key: string]: number; // section-id -> reveal step (0 = nothing shown)
}

/** Lesson section definition */
export interface LessonSection {
  id: string;
  title: string;
  icon: string;
  order: number;
}
