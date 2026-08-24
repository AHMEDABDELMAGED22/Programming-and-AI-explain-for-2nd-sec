// ============================================================
// Arabic Support — bilingual term mappings
// ============================================================
import { ArabicTerm } from '@/lib/types';

export const arabicTerms: ArabicTerm[] = [
  // Lesson title
  { english: 'Development of Information Technology and Social Transformation', arabic: 'تطور تكنولوجيا المعلومات والتحول الاجتماعي', category: 'title' },
  
  // Timeline eras
  { english: 'Birth of the Computer', arabic: 'ولادة الحاسوب', category: 'timeline' },
  { english: 'Spread of Personal Computers', arabic: 'انتشار الحواسيب الشخصية', category: 'timeline' },
  { english: 'Commercialization of the Internet', arabic: 'تسويق الإنترنت تجارياً', category: 'timeline' },
  { english: 'Rise of Smartphones', arabic: 'صعود الهواتف الذكية', category: 'timeline' },
  { english: 'Spread of Cloud Computing', arabic: 'انتشار الحوسبة السحابية', category: 'timeline' },
  
  // Key concepts
  { english: "Moore's Law", arabic: 'قانون مور', category: 'concept' },
  { english: 'SNS (Social Networking Service)', arabic: 'خدمة الشبكات الاجتماعية', category: 'concept' },
  { english: 'E-commerce', arabic: 'التجارة الإلكترونية', category: 'concept' },
  { english: 'Remote Work', arabic: 'العمل عن بُعد', category: 'concept' },
  { english: 'Online Learning', arabic: 'التعلم عبر الإنترنت', category: 'concept' },
  { english: 'Cashless Payment', arabic: 'الدفع غير النقدي', category: 'concept' },
  { english: 'Edge Computing', arabic: 'الحوسبة الطرفية', category: 'concept' },
  { english: 'Autonomous Driving', arabic: 'القيادة الذاتية', category: 'concept' },
  { english: 'Augmented Reality (AR)', arabic: 'الواقع المعزز', category: 'concept' },
  { english: 'Virtual Reality (VR)', arabic: 'الواقع الافتراضي', category: 'concept' },
  { english: 'Quantum Computing', arabic: 'الحوسبة الكمية', category: 'concept' },
  { english: 'Cloud Computing', arabic: 'الحوسبة السحابية', category: 'concept' },
  { english: 'Information Technology', arabic: 'تكنولوجيا المعلومات', category: 'concept' },
  { english: 'Social Transformation', arabic: 'التحول الاجتماعي', category: 'concept' },
  
  // UI labels
  { english: 'Guiding Question', arabic: 'السؤال التوجيهي', category: 'ui' },
  { english: 'Key Fact', arabic: 'حقيقة أساسية', category: 'ui' },
  { english: 'Key Concepts', arabic: 'المفاهيم الأساسية', category: 'ui' },
  { english: 'Think', arabic: 'فكّر', category: 'ui' },
  { english: 'Explore', arabic: 'استكشف', category: 'ui' },
  { english: 'Exam Tip', arabic: 'نصيحة للامتحان', category: 'ui' },
];

export function getArabic(english: string): string {
  const term = arabicTerms.find(t => t.english.toLowerCase() === english.toLowerCase());
  return term?.arabic ?? '';
}
