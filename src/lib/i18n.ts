// ============================================================
// i18n Hook — Language support for bilingual content
// ============================================================
import { useLessonStore } from '@/store/lessonStore';
import { translations, TranslationKey } from '@/data/translations';

export type Locale = 'en' | 'ar';

/**
 * Hook to access locale and translation helper.
 * Components call useTranslation() to get:
 * - locale: current language
 * - dir: text direction ('ltr' or 'rtl')
 * - isAr: boolean shorthand
 * - t(key, fallbackAr?): pick the right string from dictionary or fallback
 */
export function useTranslation() {
  const locale = useLessonStore((s) => s.locale);

  const t = (key: TranslationKey | string, fallbackAr?: string): string => {
    const dict = translations[locale];
    if (dict && (key as TranslationKey) in dict) {
      return (dict as Record<string, string>)[key as string];
    }
    if (locale === 'ar' && fallbackAr) {
      return fallbackAr;
    }
    return key;
  };

  return {
    locale,
    dir: locale === 'ar' ? ('rtl' as const) : ('ltr' as const),
    isAr: locale === 'ar',
    t,
  };
}
