// ============================================================
// Moore's Law Data — sourced from the official lesson chart
// ============================================================
import { MooresLawDataPoint } from '@/lib/types';

export const mooresLawData: MooresLawDataPoint[] = [
  {
    year: 1971,
    processorName: 'Intel 4004',
    transistors: 2300,
    label: '2,300'
  },
  {
    year: 1978,
    processorName: 'Intel 8086',
    transistors: 29000,
    label: '29,000'
  },
  {
    year: 1989,
    processorName: 'Intel 80486',
    transistors: 1200000,
    label: '1.2 million'
  },
  {
    year: 2000,
    processorName: 'Pentium 4',
    transistors: 42000000,
    label: '42 million'
  },
  {
    year: 2010,
    processorName: 'Core i7',
    transistors: 1170000000,
    label: '1.17 billion'
  },
  {
    year: 2022,
    processorName: 'Apple M1 Ultra',
    transistors: 114000000000,
    label: '114 billion'
  }
];

export const mooresLawDefinition = "The empirical observation that \"the number of transistors on an integrated circuit doubles approximately every two years.\"";
export const mooresLawDefinitionAr = "الملاحظة التجريبية بأن \"عدد الترانزستورات على الدائرة المتكاملة يتضاعف تقريبًا كل عامين.\"";

export const mooresLawLimits = "In recent years, miniaturization of transistors has been approaching a physical limit. If circuits are made any smaller, problems arise such as the quantum tunneling effect, in which electrons slip through barriers, and leakage current, in which current escapes unintentionally, making it difficult to achieve both higher performance and lower power consumption at the same time.";
export const mooresLawLimitsAr = "في السنوات الأخيرة، بدأ تصغير الترانزستورات يقترب من حد فيزيائي. فإذا صُنعت الدوائر بحجم أصغر، تظهر مشكلات مثل تأثير النفق الكمي (Quantum Tunneling)، حيث تنزلق الإلكترونات عبر الحواجز، وتيار التسريب (Leakage Current)، حيث يفلت التيار بشكل غير مقصود، مما يصعّب تحقيق أداء أعلى واستهلاك طاقة أقل في الوقت نفسه.";

export const mooresLawFuture = "In response, new directions for performance improvement are being pursued, such as parallel processing using multiple processor cores, and quantum computers based on the principles of quantum mechanics.";
export const mooresLawFutureAr = "استجابةً لذلك، يُتبع اتجاهات جديدة لتحسين الأداء، مثل المعالجة المتوازية باستخدام أنوية معالجة متعددة، والحواسيب الكمية القائمة على مبادئ ميكانيكا الكم.";

