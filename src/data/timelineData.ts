// ============================================================
// Timeline Data — sourced from the official lesson extraction
// ============================================================
import { TimelineEra } from '@/lib/types';

export const timelineEras: TimelineEra[] = [
  {
    id: 'era-1940s',
    period: '1940s–60s',
    yearStart: 1940,
    yearEnd: 1969,
    titleEn: 'Birth of the Computer',
    titleAr: 'ولادة الحاسوب',
    technologies: 'ENIAC, vacuum tubes',
    impact: 'Mainly used for military and scientific computation',
    icon: '🔬',
    image: {
      src: '/assets/lesson1/eniac/eniac.webp',
      alt: 'ENIAC — one of the first electronic general-purpose computers',
      caption: 'The first computers filled a whole room.',
      source: 'U.S. Army Photo — Public Domain'
    },
    youtubeVideoId: 'k4oGI_dNaPc',
    thinkQuestion: 'Why were the first computers so large, and who had access to them?',
    teacherNote: 'Emphasize that early computers were NOT personal — they were institutional tools. Only governments and large research institutions could afford them. This sets up the contrast with later eras where computing becomes personal and then mobile.',
    detailedContent: {
      technologyExplanation: 'The earliest electronic computers used vacuum tubes — glass tubes that controlled electrical signals. ENIAC (Electronic Numerical Integrator and Computer), completed in 1945, was one of the first. It weighed 30 tons, occupied an entire room, and contained about 18,000 vacuum tubes.',
      socialImpact: 'Computing was exclusively for military and scientific use. The general public had no access to computers. These machines performed calculations for ballistics, weather prediction, and nuclear research.',
      example: 'ENIAC was built at the University of Pennsylvania for the U.S. Army. It could perform 5,000 additions per second — revolutionary at the time, but far less powerful than a modern pocket calculator.',
      exampleDetail: 'ENIAC consumed 150 kilowatts of power. Legend says that when it was turned on, lights in Philadelphia dimmed.',
      arabicSupport: 'الحواسيب الإلكترونية — أنابيب مفرغة'
    }
  },
  {
    id: 'era-1970s',
    period: '1970s–80s',
    yearStart: 1970,
    yearEnd: 1989,
    titleEn: 'Spread of Personal Computers',
    titleAr: 'انتشار الحواسيب الشخصية',
    technologies: 'Personal computers (PCs)',
    impact: 'Beginning of personal computer use',
    icon: '💻',
    image: {
      src: '/assets/lesson1/personal-computers/ibm-pc.webp',
      alt: 'IBM Personal Computer (1981)',
      caption: 'Personal computers brought computing to homes and offices.',
      source: 'Wikimedia Commons'
    },
    youtubeVideoId: 'M5BZou6C01w',
    thinkQuestion: 'How did making computers small and affordable change who could use them?',
    teacherNote: 'Key transition: computing moves from institutions to individuals. The IBM PC (1981) and Apple Macintosh (1984) made computers accessible. Connect this to Moore\'s Law — smaller transistors meant smaller, cheaper, more powerful machines.',
    detailedContent: {
      technologyExplanation: 'The invention of the microprocessor in the early 1970s made it possible to build small, affordable computers. Companies like Apple, IBM, and Commodore brought personal computers to homes, schools, and small businesses.',
      socialImpact: 'For the first time, individuals could own and use computers. This began transforming office work, education, and home entertainment. Word processing, spreadsheets, and simple games became common.',
      example: 'The IBM PC, released in 1981, became the standard for personal computing. Apple\'s Macintosh (1984) introduced the graphical user interface to the mainstream.',
      exampleDetail: 'By the late 1980s, millions of households had personal computers. This created a new industry of software development and computer retail.',
      arabicSupport: 'الحواسيب الشخصية'
    }
  },
  {
    id: 'era-1990s',
    period: '1990s',
    yearStart: 1990,
    yearEnd: 1999,
    titleEn: 'Commercialization of the Internet',
    titleAr: 'تسويق الإنترنت تجارياً',
    technologies: 'The Internet, the Web',
    impact: 'Globalization of information; spread of email',
    icon: '🌐',
    image: {
      src: '/assets/lesson1/web/early-web.webp',
      alt: 'Early World Wide Web browser',
      caption: 'The Web connected the world\'s information.',
      source: 'Wikimedia Commons'
    },
    youtubeVideoId: '21eFwbb48sE',
    thinkQuestion: 'How did the Internet change the way people access information compared to before?',
    teacherNote: 'This is where information becomes GLOBAL. Before the web, finding information required libraries, encyclopedias, or experts. After the web, anyone with a connection could access vast amounts of information. Email replaced letters for many purposes. Connect to the concept of "globalization of information" from the lesson.',
    detailedContent: {
      technologyExplanation: 'The Internet had existed since the 1960s as a military/academic network, but the invention of the World Wide Web by Tim Berners-Lee in 1989 and the release of web browsers like Mosaic (1993) made it accessible to ordinary people. Commercial Internet Service Providers brought connectivity to homes.',
      socialImpact: 'Information became globally accessible. Email enabled instant worldwide communication. The first online businesses appeared. News, research, and knowledge were no longer limited by geography.',
      example: 'By 1995, companies like Amazon and eBay were founded, beginning the era of e-commerce. Search engines like Yahoo! and later Google helped people find information.',
      exampleDetail: 'The number of Internet users grew from about 16 million in 1995 to over 400 million by 2000.',
      arabicSupport: 'تسويق الإنترنت — الشبكة العنكبوتية'
    }
  },
  {
    id: 'era-2000s',
    period: '2000s',
    yearStart: 2000,
    yearEnd: 2009,
    titleEn: 'Rise of Smartphones',
    titleAr: 'صعود الهواتف الذكية',
    technologies: 'Smartphones (iPhone, etc.)',
    impact: 'Explosive spread of mobile Internet',
    icon: '📱',
    image: {
      src: '/assets/lesson1/smartphones/iphone.webp',
      alt: 'First-generation iPhone (2007)',
      caption: 'Smartphones put the Internet in every pocket.',
      source: 'Wikimedia Commons'
    },
    youtubeVideoId: 'MnrJzXM7a6o',
    thinkQuestion: 'What activities moved from desktop computers to smartphones? What new activities became possible?',
    teacherNote: 'The iPhone (2007) is the landmark moment. Smartphones combined a phone, camera, music player, GPS, and Internet browser into one device. This created "mobile Internet" — people could access information, communicate, and transact ANYWHERE. This directly leads to SNS, mobile payments, and the app economy.',
    detailedContent: {
      technologyExplanation: 'The launch of Apple\'s iPhone in 2007 revolutionized mobile computing. Smartphones combined touchscreens, Internet connectivity, cameras, GPS, and app stores into pocket-sized devices. Android followed in 2008, making smartphones widely affordable.',
      socialImpact: 'The "explosive spread of mobile Internet" meant people were connected everywhere, all the time. Social media, mobile apps, and location-based services transformed daily life. Mobile Internet usage eventually surpassed desktop.',
      example: 'The iPhone combined a phone, iPod, and Internet device. The App Store (2008) created a new economy of mobile applications, from games to productivity tools to social networks.',
      exampleDetail: 'By 2009, over 1 billion smartphones were in use globally. App downloads exceeded 2.5 billion in the first year of the App Store.',
      arabicSupport: 'الهواتف الذكية — الإنترنت المحمول'
    }
  },
  {
    id: 'era-2010s',
    period: '2010s onward',
    yearStart: 2010,
    yearEnd: null,
    titleEn: 'Spread of Cloud Computing',
    titleAr: 'انتشار الحوسبة السحابية',
    technologies: 'Cloud computing',
    impact: 'Large-scale data analysis and AI; "IT as a service" becomes widespread',
    icon: '☁️',
    image: {
      src: '/assets/lesson1/cloud/data-center.webp',
      alt: 'Modern data center for cloud computing',
      caption: 'This is "the cloud" — real machines in a real place.',
      source: 'Wikimedia Commons'
    },
    youtubeVideoId: 'M988_fsOSWo',
    thinkQuestion: 'When people say "the cloud," what do they actually mean? Where is your data really stored?',
    teacherNote: 'Key misconception: students think "the cloud" is abstract/ethereal. Show that it\'s real physical servers in data centers. The lesson explicitly states: "This is the cloud — real machines in a real place." Cloud computing enables AI, big data, and IT as a service. This is the current era — connect it to students\' daily use of Google Drive, Netflix, Instagram, etc.',
    detailedContent: {
      technologyExplanation: 'Cloud computing delivers computing resources — storage, processing power, software — over the Internet, on demand. Instead of owning powerful hardware, users and businesses access computing "as a service" from providers like Amazon Web Services, Google Cloud, and Microsoft Azure.',
      socialImpact: 'Cloud computing enabled large-scale data analysis and artificial intelligence. Businesses could scale without buying hardware. Individuals got access to powerful tools (Google Docs, iCloud, streaming services) without local installation. "IT as a service" became the norm.',
      example: 'Services like Google Drive, Netflix, Spotify, and online gaming all run on cloud computing. When you stream a video, the processing happens in a data center, not on your device.',
      exampleDetail: 'Cloud computing enables AI services like ChatGPT, translation, and image recognition that would be impossible to run on personal devices alone.',
      arabicSupport: 'الحوسبة السحابية — تكنولوجيا المعلومات كخدمة'
    }
  }
];
