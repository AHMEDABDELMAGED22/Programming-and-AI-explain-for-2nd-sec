// ============================================================
// Exam Questions Data — sourced from the official lesson
// Fully bilingual (English & Arabic)
// ============================================================
import { ExamQuestion } from '@/lib/types';

export interface BilingualExamQuestion extends ExamQuestion {
  questionAr?: string;
  optionsAr?: { label: string; text: string; isCorrect: boolean }[];
  matchItemsAr?: { description: string; label: string; correctMatch: string }[];
  answerAr?: string;
  explanationAr?: string;
  hintsAr?: string[];
  requiredPointsAr?: string[];
  commandWordAr?: string;
}

export const workedExampleQuestions: BilingualExamQuestion[] = [
  {
    id: 'worked-1',
    type: 'multiple-choice',
    question: 'From the following options (A–D), choose the one that lists the stages of information technology (IT) development in the correct chronological order.',
    questionAr: 'من الخيارات التالية (A–D)، اختر الترتيب الزمني الصحيح لمراحل تطور تكنولوجيا المعلومات (IT):',
    options: [
      {
        label: 'A',
        text: 'Birth of the computer → Rise of smartphones → Commercialization of the Internet → Spread of cloud computing',
        isCorrect: false
      },
      {
        label: 'B',
        text: 'Birth of the computer → Commercialization of the Internet → Rise of smartphones → Spread of cloud computing',
        isCorrect: true
      },
      {
        label: 'C',
        text: 'Commercialization of the Internet → Birth of the computer → Spread of cloud computing → Rise of smartphones',
        isCorrect: false
      },
      {
        label: 'D',
        text: 'Rise of smartphones → Commercialization of the Internet → Birth of the computer → Spread of cloud computing',
        isCorrect: false
      }
    ],
    optionsAr: [
      {
        label: 'A',
        text: 'ولادة الحاسوب ← صعود الهواتف الذكية ← تجارة الإنترنت ← انتشار الحوسبة السحابية',
        isCorrect: false
      },
      {
        label: 'B',
        text: 'ولادة الحاسوب ← تجارة الإنترنت ← صعود الهواتف الذكية ← انتشار الحوسبة السحابية',
        isCorrect: true
      },
      {
        label: 'C',
        text: 'تجارة الإنترنت ← ولادة الحاسوب ← انتشار الحوسبة السحابية ← صعود الهواتف الذكية',
        isCorrect: false
      },
      {
        label: 'D',
        text: 'صعود الهواتف الذكية ← تجارة الإنترنت ← ولادة الحاسوب ← انتشار الحوسبة السحابية',
        isCorrect: false
      }
    ],
    answer: 'B',
    answerAr: 'B',
    explanation: 'The correct order is "Birth of the computer (1940s-60s) → Commercialization of the Internet (1990s) → Rise of smartphones (2000s) → Spread of cloud computing (2010s onward)." Therefore, B.',
    explanationAr: 'الترتيب الصحيح هو: "ولادة الحاسوب (الأربعينيات-الستينيات) ← تسويق وتجارة الإنترنت (التسعينيات) ← صعود الهواتف الذكية (الألفينيات) ← انتشار الحوسبة السحابية (من 2010 فصاعدًا)". لذا، الإجابة هي B.'
  },
  {
    id: 'worked-2a',
    type: 'true-false',
    question: 'Moore\'s Law is the empirical observation that "the number of transistors on an integrated circuit doubles approximately every two years."',
    questionAr: 'قانون مور (Moore\'s Law) هو الملاحظة التجريبية بأن "عدد الترانزستورات على الدائرة المتكاملة يتضاعف تقريبًا كل سنتين".',
    answer: '○ (True)',
    answerAr: '○ (صحيح)',
    explanation: 'Correct definition of Moore\'s Law. Therefore, ○.',
    explanationAr: 'التعريف الدقيق لقانون مور. لذلك، ○ (صح).'
  },
  {
    id: 'worked-2b',
    type: 'true-false',
    question: 'Moore\'s Law has been said to be approaching a physical limit in recent years.',
    questionAr: 'يقال إن قانون مور يقترب من حدوده الفيزيائية في السنوات الأخيرة.',
    answer: '○ (True)',
    answerAr: '○ (صحيح)',
    explanation: 'It has been said to be approaching a physical limit in recent years due to quantum tunneling and leakage current. Therefore, ○.',
    explanationAr: 'نعم، يقترب من حدوده الفيزيائية بسبب تأثير النفق الكمي وتيار التسريب. لذلك، ○ (صح).'
  },
  {
    id: 'worked-2c',
    type: 'true-false',
    question: 'SNS is highly effective at spreading information rapidly.',
    questionAr: 'خدمات التواصل الاجتماعي (SNS) فعّالة للغاية في نشر المعلومات بسرعة فائقة.',
    answer: '○ (True)',
    answerAr: '○ (صحيح)',
    explanation: 'SNS is a service highly effective at spreading information rapidly. Therefore, ○.',
    explanationAr: 'خدمات الشبكات الاجتماعية مصممة لنشر ومشاركة المعلومات بشكل فوري وواسع. لذلك، ○ (صح).'
  },
  {
    id: 'worked-2d',
    type: 'true-false',
    question: 'E-commerce (EC) refers to purchasing goods at physical stores using cash.',
    questionAr: 'التجارة الإلكترونية (E-commerce) تشير إلى شراء البضائع من المتاجر التقليدية باستخدام الدفع النقدي.',
    answer: '× (False)',
    answerAr: '× (خطأ)',
    explanation: 'E-commerce refers to buying and selling through the Internet, not purchases at physical stores using cash. Therefore, ×.',
    explanationAr: 'التجارة الإلكترونية تعني بيع وشراء السلع والخدمات عبر الإنترنت، وليس في المتاجر التقليدية نقدًا. لذلك، × (خطأ).'
  },
  {
    id: 'worked-3',
    type: 'matching',
    question: 'Match each description (a–c) with the most appropriate technology from the choices below (A–C).',
    questionAr: 'طابق بين كل وصف (a–c) والتقنية المناسبة من الخيارات (A–C):',
    matchItems: [
      {
        description: 'A technology that overlays digital information on real-world images',
        label: 'a',
        correctMatch: 'B — AR (Augmented Reality)'
      },
      {
        description: 'A technology that uses AI to drive a vehicle without human operation',
        label: 'b',
        correctMatch: 'A — Autonomous driving'
      },
      {
        description: 'A technology that allows users to immerse themselves in a virtual space generated by a computer',
        label: 'c',
        correctMatch: 'C — VR (Virtual Reality)'
      }
    ],
    matchItemsAr: [
      {
        description: 'تقنية تُضيف وتُركّب معلومات رقمية فوق صور العالم الحقيقي',
        label: 'a',
        correctMatch: 'B — الواقع المعزز (AR)'
      },
      {
        description: 'تقنية تستخدم الذكاء الاصطناعي لقيادة مركبة دون تدخل بشري',
        label: 'b',
        correctMatch: 'A — القيادة الذاتية (Autonomous driving)'
      },
      {
        description: 'تقنية تسمح للمستخدمين بالانغمار الكامل في فضاء افتراضي يولّده الحاسوب',
        label: 'c',
        correctMatch: 'C — الواقع الافتراضي (VR)'
      }
    ],
    answer: 'a → B (AR), b → A (Autonomous driving), c → C (VR)',
    answerAr: 'a ← B (الواقع المعزز)، b ← A (القيادة الذاتية)، c ← C (الواقع الافتراضي)',
    explanation: 'Overlaying digital information is AR. Driving without human operation is autonomous driving. Immersing in virtual space is VR.',
    explanationAr: 'إضافة المعلومات الرقمية فوق الواقع هو AR. القيادة بدون إنسان هي القيادة الذاتية. الانغمار في بيئة افتراضية هو VR.'
  }
];

export const examStyleQuestion: BilingualExamQuestion = {
  id: 'exam-style-1',
  type: 'essay',
  question: 'Analyze how the spread of cloud computing (from the 2010s onward) has changed the way information technology is used. [6]',
  questionAr: 'حلل كيف غيّر انتشار الحوسبة السحابية (من عام 2010 فصاعدًا) طريقة استخدام تكنولوجيا المعلومات. [6 درجات]',
  marks: 6,
  commandWord: 'Analyze',
  commandWordAr: 'حلل (Analyze)',
  hints: [
    'Think about what IT was like BEFORE cloud computing — businesses needed their own servers and software.',
    'Consider the three areas mentioned: large-scale data analysis, AI, and "IT as a service."',
    'For each area, explain WHAT changed and HOW it affected businesses or individuals.'
  ],
  hintsAr: [
    'فكّر كيف كانت تكنولوجيا المعلومات قبل السحابة — كانت الشركات تحتاج لخوادم وبرامج خاصة مكلفة.',
    'تطرّق إلى المحاور الثلاثة المطلوبة: تحليل البيانات الضخمة، الذكاء الاصطناعي (AI)، و"تكنولوجيا المعلومات كخدمة".',
    'لكل محور، اشرح ماذا تغير وكيف أثّر ذلك على المؤسسات والأفراد.'
  ],
  requiredPoints: [
    'Large-scale data analysis',
    'Artificial Intelligence (AI)',
    '"IT as a service"'
  ],
  requiredPointsAr: [
    'تحليل البيانات على نطاق واسع (Large-scale data analysis)',
    'الذكاء الاصطناعي (AI)',
    'تكنولوجيا المعلومات كخدمة ("IT as a service")'
  ],
  answer: 'Cloud computing has transformed IT by making powerful computing resources available on demand over the Internet. First, it enabled large-scale data analysis: businesses can now process and analyze massive datasets without owning expensive hardware, leading to better decision-making and insights. Second, cloud computing made AI widely accessible — AI services like language translation, image recognition, and personal assistants run on cloud servers, allowing even small businesses and individuals to benefit. Third, the concept of "IT as a service" means that instead of buying and maintaining hardware and software, organizations subscribe to computing resources and scale up or down as needed. This has lowered costs, increased flexibility, and allowed innovation to spread faster.',
  answerAr: 'حوّلت الحوسبة السحابية تكنولوجيا المعلومات بجعل الموارد الحوسبية القوية متاحة عند الطلب عبر الإنترنت:\n١. تحليل البيانات على نطاق واسع: أصبح بإمكان المؤسسات معالجة مجموعات بيانات ضخمة دون شراء أجهزة باهظة، مما يعزز اتخاذ القرارات الذكية.\n٢. تمكين الذكاء الاصطناعي (AI): أتاحت السحابة تشغيل وتدريب نماذج الذكاء الاصطناعي والترجمة والتعرف على الصور وإتاحتها للجميع بسهولة.\n٣. تكنولوجيا المعلومات كخدمة ("IT as a service"): بدلاً من شراء وصيانة الخوادم والبرمجيات، تشترك المؤسسات في الخدمات السحابية وتتوسع حسب الحاجة، مما خفّض التكاليف وزاد المرونة وسرّع الابتكار.',
  explanation: 'The answer should reference all three areas specified in the question: large-scale data analysis, AI, and "IT as a service." Each point should explain the change and its impact.',
  explanationAr: 'يجب أن تغطي الإجابة المحاور الثلاثة المحددة مع توضيح أثر كل منها لتحصيل الدرجات الست كاملة.'
};

export const tryQuestions: BilingualExamQuestion[] = [
  {
    id: 'try-1-1',
    type: 'fill-blank',
    question: 'What is the name of the empirical observation that "the number of transistors on an integrated circuit doubles approximately every two years"?',
    questionAr: 'ما هو اسم الملاحظة التجريبية بأن "عدد الترانزستورات على الدائرة المتكاملة يتضاعف تقريبًا كل عامين"؟',
    answer: "Moore's Law",
    answerAr: 'قانون مور (Moore\'s Law)',
    explanation: "Moore's Law is the empirical observation named after Gordon Moore.",
    explanationAr: 'قانون مور هو الملاحظة التجريبية المنسوبة إلى جوردون مور.'
  },
  {
    id: 'try-1-2',
    type: 'fill-blank',
    question: 'What is the term for the buying and selling of goods and services using the Internet?',
    questionAr: 'ما هو المصطلح الذي يُطلق على بيع وشراء السلع والخدمات باستخدام الإنترنت؟',
    answer: 'E-commerce (EC)',
    answerAr: 'التجارة الإلكترونية (E-commerce / EC)',
    explanation: 'E-commerce (Electronic Commerce) is buying and selling through the Internet.',
    explanationAr: 'التجارة الإلكترونية هي المعاملات التجارية عبر الإنترنت.'
  },
  {
    id: 'try-1-3',
    type: 'fill-blank',
    question: 'What is the term for the working style in which one works from home or other remote locations using the Internet?',
    questionAr: 'ما هو المصطلح لنمط العمل الذي يؤديه الفرد من المنزل أو أماكن أخرى باستخدام الإنترنت؟',
    answer: 'Remote work',
    answerAr: 'العمل عن بُعد (Remote work)',
    explanation: 'Remote work uses the Internet to work from home or other locations.',
    explanationAr: 'العمل عن بعد هو أداء المهام الوظيفية خارج مقر العمل التقليدي عبر الشبكة.'
  },
  {
    id: 'try-1-4',
    type: 'fill-blank',
    question: 'What is the term for the system for making payments using electronic money, QR codes, etc., without using cash?',
    questionAr: 'ما هو المصطلح لنظام الدفع باستخدام النقود الإلكترونية أو رموز QR دون استخدام النقود الورقية والمعدنية؟',
    answer: 'Cashless payment',
    answerAr: 'الدفع غير النقدي / الإلكتروني (Cashless payment)',
    explanation: 'Cashless payment uses electronic money, QR codes, or cards instead of cash.',
    explanationAr: 'الدفع الإلكتروني يشمل البطاقات الذكية، المحافظ الإلكترونية، ورموز الاستجابة السريعة.'
  },
  {
    id: 'try-1-5',
    type: 'fill-blank',
    question: 'What is the term for the technology that uses AI to drive a vehicle without human operation?',
    questionAr: 'ما هي التقنية التي تستخدم الذكاء الاصطناعي لقيادة المركبة دون تدخل بشري؟',
    answer: 'Autonomous driving',
    answerAr: 'القيادة الذاتية (Autonomous driving)',
    explanation: 'Autonomous driving uses AI, cameras, and sensors to drive without human operation.',
    explanationAr: 'القيادة الذاتية تعتمد على المستشعرات والذكاء الاصطناعي والحوسبة الطرفية.'
  },
  {
    id: 'try-2-1',
    type: 'matching',
    question: 'For each of a–d, indicate which is most closely related: A (Changes in daily life), B (Changes in industry and the economy), C (Changes in healthcare and education).',
    questionAr: 'لكل من (a–d)، حدد المجال الأكثر ارتباطًا: A (تغيرات في الحياة اليومية)، B (تغيرات في الصناعة والاقتصاد)، C (تغيرات في الصحة والتعليم):',
    matchItems: [
      { description: 'Taking classes through online learning.', label: 'a', correctMatch: 'C — Changes in healthcare and education' },
      { description: 'Paying for purchases using a mobile payment app on a smartphone.', label: 'b', correctMatch: 'A — Changes in daily life' },
      { description: 'Sharing photos with friends on SNS.', label: 'c', correctMatch: 'A — Changes in daily life' },
      { description: 'A company introducing a work-from-home system.', label: 'd', correctMatch: 'B — Changes in industry and the economy' }
    ],
    matchItemsAr: [
      { description: 'حضور الحصص والدروس عبر منصات التعلم عبر الإنترنت.', label: 'a', correctMatch: 'C — تغيرات في التعليم والرعاية' },
      { description: 'دفع قيمة المشتريات باستخدام تطبيق الدفع بالهاتف الذكي.', label: 'b', correctMatch: 'A — تغيرات في الحياة اليومية' },
      { description: 'مشاركة الصور ومقاطع الفيديو مع الأصدقاء على شبكات التواصل (SNS).', label: 'c', correctMatch: 'A — تغيرات في الحياة اليومية' },
      { description: 'تطبيق شركة لنظام العمل من المنزل لموظفيها.', label: 'd', correctMatch: 'B — تغيرات في الصناعة والاقتصاد' }
    ],
    answer: 'a → C, b → A, c → A, d → B',
    answerAr: 'a ← C، b ← A، c ← A، d ← B',
    explanation: 'Online learning relates to education (C). Mobile payment and SNS relate to daily life (A). Work-from-home relates to industry (B).',
    explanationAr: 'التعلم عبر الإنترنت يخص التعليم (C)، الدفع بالهاتف والتواصل يخص الحياة اليومية (A)، والعمل من المنزل يخص بيئة العمل والصناعة (B).'
  },
  {
    id: 'try-2-2',
    type: 'multiple-choice',
    question: 'From the following options (A–D), choose the one that is NOT an appropriate description of an emerging technology.',
    questionAr: 'من الخيارات التالية (A–D)، اختر العبارة غير الصحيحة في وصف التقنيات الناشئة:',
    options: [
      { label: 'A', text: 'Autonomous driving uses AI to drive a vehicle without human operation.', isCorrect: false },
      { label: 'B', text: 'AR is a technology that overlays digital information on real-world images.', isCorrect: false },
      { label: 'C', text: 'VR is a technology that dramatically improves the processing speed of a computer.', isCorrect: true },
      { label: 'D', text: 'Quantum computing is expected to speed up computations that are difficult for traditional computers.', isCorrect: false }
    ],
    optionsAr: [
      { label: 'A', text: 'القيادة الذاتية تستخدم الذكاء الاصطناعي لقيادة المركبة دون تدخل بشري.', isCorrect: false },
      { label: 'B', text: 'الواقع المعزز (AR) تقنية تُركب معلومات رقمية فوق العالم الحقيقي.', isCorrect: false },
      { label: 'C', text: 'الواقع الافتراضي (VR) تقنية تُضاعف سرعة معالجة الحواسيب بشكل هائل.', isCorrect: true },
      { label: 'D', text: 'الحوسبة الكمية من المتوقع أن تُسرع الحسابات المعقدة المستحيلة على الحواسيب التقليدية.', isCorrect: false }
    ],
    answer: 'C',
    answerAr: 'C',
    explanation: 'VR (Virtual Reality) is a technology that allows users to immerse themselves in a virtual space — it does NOT improve processing speed. Option C is incorrect and therefore the answer.',
    explanationAr: 'الواقع الافتراضي (VR) ينشئ بيئة بصرية غامرة، وليس تقنية لتسريع معالجة الحواسيب. لذلك العبارة C خاطئة وهي الإجابة المطلوبة.'
  },
  {
    id: 'exercise-3-1',
    type: 'multiple-choice',
    question: 'From the following options (A–F), choose all that are emerging technologies.',
    questionAr: 'من الخيارات التالية (A–F)، اختر جميع ما يُعد تقنيات ناشئة (Emerging Technologies):',
    options: [
      { label: 'A', text: 'Email', isCorrect: false },
      { label: 'B', text: 'Autonomous driving (القيادة الذاتية)', isCorrect: true },
      { label: 'C', text: 'Personal computers (الحواسيب الشخصية)', isCorrect: false },
      { label: 'D', text: 'AR (الواقع المعزز)', isCorrect: true },
      { label: 'E', text: 'VR (الواقع الافتراضي)', isCorrect: true },
      { label: 'F', text: 'Quantum computing (الحوسبة الكمية)', isCorrect: true }
    ],
    optionsAr: [
      { label: 'A', text: 'البريد الإلكتروني (Email)', isCorrect: false },
      { label: 'B', text: 'القيادة الذاتية (Autonomous driving)', isCorrect: true },
      { label: 'C', text: 'الحواسيب الشخصية (Personal computers)', isCorrect: false },
      { label: 'D', text: 'الواقع المعزز (AR)', isCorrect: true },
      { label: 'E', text: 'الواقع الافتراضي (VR)', isCorrect: true },
      { label: 'F', text: 'الحوسبة الكمية (Quantum computing)', isCorrect: true }
    ],
    answer: 'B, D, E, F',
    answerAr: 'B, D, E, F (القيادة الذاتية، AR، VR، الحوسبة الكمية)',
    explanation: 'Emerging technologies highlighted in this lesson are: Autonomous driving, AR, VR, and Quantum computing.',
    explanationAr: 'التقنيات الحديثة والناشئة البارزة في الدرس هي: القيادة الذاتية، AR، VR، والحوسبة الكمية.'
  }
];
