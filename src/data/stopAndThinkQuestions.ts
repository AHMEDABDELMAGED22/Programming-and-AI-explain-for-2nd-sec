// ============================================================
// Stop and Think Questions Data — Comprehensive Critical Thinking Bank
// Covering every topic in Lesson 1 (Bilingual EN & AR)
// ============================================================

export interface StopAndThinkQuestion {
  id: string;
  topicId: 'history' | 'moores-law' | 'social' | 'edge-cloud' | 'ar-vr' | 'quantum';
  topicNameEn: string;
  topicNameAr: string;
  icon: string;
  questionEn: string;
  questionAr: string;
  hintEn: string;
  hintAr: string;
  answerEn: string;
  answerAr: string;
  keyTakeawayEn: string;
  keyTakeawayAr: string;
}

export const stopAndThinkQuestions: StopAndThinkQuestion[] = [
  {
    id: 'st-ar-vr-museum',
    topicId: 'ar-vr',
    topicNameEn: 'AR vs. VR',
    topicNameAr: 'الواقع المعزز مقابل الافتراضي',
    icon: '🥽',
    questionEn: 'If you want to explore a museum while staying at home, which is more suitable: AR or VR? And why?',
    questionAr: 'إذا كنت تريد استكشاف متحف وأنت في منزلك، فأيهما أنسب: AR أم VR؟ ولماذا؟',
    hintEn: 'Think about whether you want to see your room or be completely transported inside the museum halls.',
    hintAr: 'فكّر هل تحتاج لرؤية غرفتك ومنزلك، أم تريد أن تشعر بأنك تتجول بالكامل داخل قاعات المتحف.',
    answerEn: 'VR (Virtual Reality) is the most suitable because it completely replaces your real surroundings and immerses you in a 3D digital simulation of the museum, allowing you to walk through exhibits as if you were physically there.',
    answerAr: 'الواقع الافتراضي (VR) هو الأنسب؛ لأنه يستبدل بيئتك الحقيقية بالكامل وينقلك داخل فضاء رقمي ثلاثي الأبعاد للمتحف، فتشعر وكأنك تتجول بين المعروضات وأنت جالس في غرفتك.',
    keyTakeawayEn: 'VR isolates you from the real world for full immersion, whereas AR overlays digital items onto your existing real environment.',
    keyTakeawayAr: 'الواقع الافتراضي يعزلك عن الواقع لتحقيق انغمار كامل، بينما الواقع المعزز يضيف معلومات فوق واقعك الحالي.'
  },
  {
    id: 'st-ar-technician',
    topicId: 'ar-vr',
    topicNameEn: 'AR vs. VR',
    topicNameAr: 'الواقع المعزز مقابل الافتراضي',
    icon: '📱',
    questionEn: 'If an engineer needs to repair an aircraft engine while seeing digital step-by-step schematics over the real engine, which is better: AR or VR?',
    questionAr: 'إذا أراد مهندس صيانة فحص محرك طائرة حقيقي ورؤية مخططات وإرشادات رقمية تظهر فوق أجزاء المحرك مباشرة، فأيهما أنسب: AR أم VR؟',
    hintEn: 'The engineer must see the real physical engine in front of them without bumping into things.',
    hintAr: 'المهندس يحتاج إلى رؤية المحرك الحقيقي بيديه ومعداته مع طبقة إرشادات إضافية.',
    answerEn: 'AR (Augmented Reality) is ideal because the engineer still sees the real aircraft engine through smart glasses or a screen, with interactive 3D indicators and guides overlaid directly onto the physical parts.',
    answerAr: 'الواقع المعزز (AR) هو الأنسب؛ لأن المهندس يظل يرى المحرك الحقيقي في الواقع، وتظهر له التعليمات والمخططات الرقمية ثلاثية الأبعاد مركبة فوق القطع الحقيقية.',
    keyTakeawayEn: 'AR is essential when real-world interaction is necessary alongside digital information.',
    keyTakeawayAr: 'الواقع المعزز ضروري عندما تكون بحاجة للتعامل مع العالم الحقيقي مع الاستفادة من المعلومات الرقمية.'
  },
  {
    id: 'st-cloud-vs-edge',
    topicId: 'edge-cloud',
    topicNameEn: 'Edge vs. Cloud',
    topicNameAr: 'الحوسبة الطرفية والسحابية',
    icon: '⚡',
    questionEn: 'In autonomous driving, why must the vehicle process camera and sensor data instantly on board (Edge Computing) instead of sending it to the cloud?',
    questionAr: 'في القيادة الذاتية، لماذا يجب معالجة بيانات الكاميرات والمستشعرات فورًا على متن السيارة (الحوسبة الطرفية) بدلاً من إرسالها إلى السحابة؟',
    hintEn: 'Consider network latency and what happens if a pedestrian suddenly crosses the road at 100 km/h.',
    hintAr: 'فكّر في تأخير إشارة الإنترنت (Latency) وما يحدث إذا ظهر مشاة فجأة والسيارة تسير بسرعة عالية.',
    answerEn: 'A delay of even 0.1 seconds (latency) caused by network transmission can cause a fatal crash. Edge computing processes sensor data on the car\'s local AI chips within milliseconds, making instant emergency braking and steering decisions without internet dependency.',
    answerAr: 'لأن تأخيرًا ولو 0.1 ثانية فقط نتيجة نقل البيانات عبر شبكة الإنترنت قد يؤدي إلى حادث خطير. الحوسبة الطرفية تعالج البيانات فورياً داخل معالجات السيارة لاتخاذ قرارات الفرملة والتوجيه في أجزاء من الثانية دون انتظار الإنترنت.',
    keyTakeawayEn: 'Edge computing is used when real-time, low-latency processing is safety-critical.',
    keyTakeawayAr: 'تُستخدم الحوسبة الطرفية عندما تكون الاستجابة الفورية في أجزاء من الثانية مسألة حياة أو موت.'
  },
  {
    id: 'st-cloud-power',
    topicId: 'edge-cloud',
    topicNameEn: 'Edge vs. Cloud',
    topicNameAr: 'الحوسبة الطرفية والسحابية',
    icon: '☁️',
    questionEn: 'If edge computing is so fast, why do we still need Cloud Computing for AI training and big data analysis?',
    questionAr: 'إذا كانت الحوسبة الطرفية سريعة جداً، فلماذا لا نستغني عن الحوسبة السحابية ونعتمد عليها دائماً؟',
    hintEn: 'Think about storage space, computing power, and massive server farms.',
    hintAr: 'فكّر في سعة التخزين الضخمة، وقوة الخوادم العملاقة، وتكلفة وضع معالجات خارقة في كل جهاز صغير.',
    answerEn: 'Edge devices have limited battery, memory, and processing power. Cloud computing connects thousands of powerful servers in data centers to store massive datasets and train complex AI models that no single edge device could ever handle.',
    answerAr: 'لأن الأجهزة الطرفية (الهواتف، السيارات، الحساسات) لها طاقة ومعالجات وبطاريات محدودة. بينما الحوسبة السحابية توفر خوادم عملاقة ذات قدرات خارقة لتخزين مليارات البيانات وتدريب نماذج الذكاء الاصطناعي المعقدة.',
    keyTakeawayEn: 'Cloud provides massive scale & centralized power; Edge provides instant speed & local decisions.',
    keyTakeawayAr: 'السحابة توفر القوة الحوسبية الهائلة والتخزين الضخم، بينما الطرفية توفر السرعة اللحظية والقرارات المحلية.'
  },
  {
    id: 'st-moores-limits',
    topicId: 'moores-law',
    topicNameEn: "Moore's Law",
    topicNameAr: 'قانون مور والتطور الفيزيائي',
    icon: '📈',
    questionEn: 'Moore\'s Law states that transistors double every ~2 years. Why is this law approaching its physical limits today, and what are scientists doing instead?',
    questionAr: 'ينص قانون مور على تضاعف عدد الترانزستورات كل عامين تقريبًا. لماذا يقترب هذا القانون من نهايته اليوم، وما البدائل التي يتجه إليها العلماء؟',
    hintEn: 'Think about shrinking transistors down to the size of a few atoms, and quantum tunneling.',
    hintAr: 'فكّر في وصول حجم الترانزستور لحجم بضع ذرات، وحدوث تسريب للتيار وظاهرة النفق الكمي.',
    answerEn: 'Transistors have become so microscopic (nanometers) that electrons leak through barriers (Quantum Tunneling), creating extreme heat and errors. Instead of just making transistors smaller, engineers are now building multi-core parallel processors and developing Quantum Computers.',
    answerAr: 'لأن الترانزستورات أصبحت متناهية الصغر (بضعة نانومترات) لدرجة أن الإلكترونات تنفذ عبر الحواجز (تأثير النفق الكمي) مما يسبب تسريب التيار والحرارة. والبديل هو المعالجة المتوازية (أنوية متعددة) والحواسيب الكمية.',
    keyTakeawayEn: "Moore's Law is an empirical observation, not a physical law; physical limits push computing into multi-core & quantum eras.",
    keyTakeawayAr: 'قانون مور ملاحظة تجريبية وليس قانوناً فيزيائياً، والحدود الفيزيائية تدفعنا نحو المعالجة المتوازية والحوسبة الكمية.'
  },
  {
    id: 'st-cashless-society',
    topicId: 'social',
    topicNameEn: 'Social Transformation',
    topicNameAr: 'التحول الاجتماعي والشمول',
    icon: '💳',
    questionEn: 'Cashless payment makes buying fast and convenient. But what challenges might arise if a society becomes 100% cashless?',
    questionAr: 'يوفر الدفع الإلكتروني السرعة والراحة، ولكن ما التحديات أو المشاكل التي قد تظهر إذا تحول المجتمع بنسبة 100% إلى مجتمع غير نقدي (Cashless)؟',
    hintEn: 'Think about people without bank accounts, elderly citizens, and sudden power/internet outages.',
    hintAr: 'فكّر في كبار السن، ومن لا يملكون حسابات بنكية، أو عند حدوث انقطاع مفاجئ للكهرباء والإنترنت.',
    answerEn: 'Exclusion of marginalized groups (people with no smartphones, bank accounts, or digital literacy), loss of privacy in financial tracking, and complete paralysis of commerce during power or internet outages.',
    answerAr: 'إقصاء الفئات الأكثر احتياجاً وكبار السن ممن لا يملكون هواتف ذكية أو حسابات بنكية، ومخاوف الخصوصية، وتوقف التجارة تماماً عند انقطاع شبكة الإنترنت أو الكهرباء.',
    keyTakeawayEn: 'Technological transitions must ensure digital inclusion, accessibility, and backup infrastructure.',
    keyTakeawayAr: 'أي تحول تكنولوجي يجب أن يضمن الشمول الرقمي وتوفير بدائل لجميع فئات المجتمع.'
  },
  {
    id: 'st-history-eniac',
    topicId: 'history',
    topicNameEn: 'History of Computing',
    topicNameAr: 'تاريخ الحوسبة وتطورها',
    icon: '🔬',
    questionEn: 'Early computers like ENIAC weighed 30 tons and occupied an entire room. Why was computing in the 1940s-60s restricted to governments and armies?',
    questionAr: 'كانت الحواسيب الأولى مثل ENIAC تزن 30 طناً وتشغل غرفة كاملة. لماذا اقتصر استخدام الحوسبة في تلك الحقبة على الجيوش والمؤسسات الكبرى فقط؟',
    hintEn: 'Consider the cost, electricity consumption (150kW), vacuum tubes, and who had complex math calculations.',
    hintAr: 'فكّر في التكلفة الباهظة، واستهلاك الكهرباء الهائل، وصعوبة الصيانة لآلاف الأنابيب المفرغة.',
    answerEn: 'Because they cost millions of dollars, consumed immense power (dimming city lights), required teams of engineers to replace burnt-out vacuum tubes daily, and were primarily built to calculate ballistic tables and military research.',
    answerAr: 'بسبب تكلفتها المليونية الباهظة، واستهلاكها الهائل للكهرباء (150 كيلوواط)، وحاجتها لفرق صيانة مستمرة لتبديل الأنابيب المفرغة، فضلاً عن أن برمجتها كانت مخصصة لحسابات المقذوفات والأبحاث النووية فقط.',
    keyTakeawayEn: 'Computing started as an institutional military weapon before evolving into a personal tool and global utility.',
    keyTakeawayAr: 'بدأت الحوسبة كأداة مؤسسية عسكرية ضخمة قبل أن تتحول إلى جهاز شخصي ثم خدمة يومية في متناول الجميع.'
  },
  {
    id: 'st-quantum-qubits',
    topicId: 'quantum',
    topicNameEn: 'Quantum Computing',
    topicNameAr: 'الحوسبة الكمية ومبدأ التراكب',
    icon: '⚛️',
    questionEn: 'A classical bit can only be 0 OR 1. How does a Qubit\'s ability to be in "Superposition" (0 AND 1 simultaneously) revolutionize computing speed?',
    questionAr: 'البت التقليدي يكون إما 0 أو 1. كيف تجعل خاصية "التراكب" (Superposition) في الكيوبت (0 و 1 في نفس الوقت) الحواسيب الكمية فائقة السرعة؟',
    hintEn: 'Think about testing all possible maze routes at once vs. one by one.',
    hintAr: 'فكّر في تجربة جميع مسارات المتاهة في لحظة واحدة بدلاً من تجربة مسار تلو الآخر.',
    answerEn: 'Because N qubits can represent 2^N states simultaneously, allowing the computer to evaluate billions of possibilities at once (parallel processing), solving complex cryptography and drug discovery equations in minutes instead of thousands of years.',
    answerAr: 'لأن مجموعة الكيوبتات تستطيع تمثيل جميع الاحتمالات الممكنة في وقت واحد (2 أس N)، مما يتيح معالجة متوازية هائلة لتجربة ملايين الحلول في ثوانٍ معدودة بدلاً من آلاف السنين للحواسيب التقليدية.',
    keyTakeawayEn: 'Superposition enables exponential parallel processing for specific mathematical and scientific problems.',
    keyTakeawayAr: 'خاصية التراكب تمنح الحواسيب الكمية قوة معالجة متوازية أسية لمعالجة المشكلات العلمية والرياضية المعقدة.'
  }
];
