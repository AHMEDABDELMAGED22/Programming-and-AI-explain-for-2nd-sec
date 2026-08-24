// ============================================================
// i18n Hook — Language support for bilingual content
// ============================================================
import { useLessonStore } from '@/store/lessonStore';

export type Locale = 'en' | 'ar';

/**
 * Hook to access locale and translation helper.
 * Components call useTranslation() to get:
 * - locale: current language
 * - dir: text direction ('ltr' or 'rtl')
 * - isAr: boolean shorthand
 * - t(en, ar): pick the right string
 */
export function useTranslation() {
  const locale = useLessonStore((s) => s.locale);

  const t = (en: string, ar: string): string => {
    return locale === 'ar' ? ar : en;
  };

  return {
    locale,
    dir: locale === 'ar' ? 'rtl' as const : 'ltr' as const,
    isAr: locale === 'ar',
    t,
  };
}
