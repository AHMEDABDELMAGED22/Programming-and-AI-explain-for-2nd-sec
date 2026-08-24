// ============================================================
// Sidebar Items — Key Facts, Key Concepts, Pause & Think
// ============================================================
import { SidebarItem } from '@/lib/types';

export const sidebarItems: SidebarItem[] = [
  {
    id: 'kf-1',
    type: 'key-fact',
    title: 'Key Fact',
    content: 'At each stage, information technology introduced a new technology or service and also changed how society communicates, works, and does business.',
    section: 'timeline',
    icon: '💡'
  },
  {
    id: 'kc-1',
    type: 'key-concept',
    title: 'Key Concepts',
    content: "Moore's Law • SNS • E-commerce • Remote Work • Online Learning • Cashless Payment • Edge Computing • Autonomous Driving • AR / VR • Quantum Computing",
    section: 'intro',
    icon: '🔑'
  },
  {
    id: 'kt-moores',
    type: 'key-term',
    title: "Moore's Law",
    content: 'The observation that the number of transistors on a chip roughly doubles about every two years.',
    section: 'moores-law',
    icon: '📖'
  },
  {
    id: 'kt-edge',
    type: 'key-term',
    title: 'Edge Computing',
    content: 'Data processed on the device itself, instantly, instead of sending it to the cloud.',
    section: 'emerging-tech',
    icon: '📖'
  },
  {
    id: 'kt-remote',
    type: 'key-term',
    title: 'Remote Work',
    content: 'Working from home or another remote location using the Internet.',
    section: 'social-transformation',
    icon: '📖'
  },
  {
    id: 'kt-online-learning',
    type: 'key-term',
    title: 'Online Learning',
    content: 'Classes and materials delivered over the Internet.',
    section: 'social-transformation',
    icon: '📖'
  },
  {
    id: 'kt-cloud',
    type: 'key-term',
    title: 'Cloud Computing',
    content: 'IT delivered as a service over the Internet.',
    section: 'timeline',
    icon: '📖'
  },
  {
    id: 'kt-ecommerce',
    type: 'key-term',
    title: 'E-commerce',
    content: 'Buying and selling through the Internet.',
    section: 'social-transformation',
    icon: '📖'
  },
  {
    id: 'kt-sns',
    type: 'key-term',
    title: 'SNS',
    content: 'Connects users to post and share information.',
    section: 'social-transformation',
    icon: '📖'
  },
  {
    id: 'kt-cashless',
    type: 'key-term',
    title: 'Cashless Payment',
    content: 'Payment without cash (e-money, QR).',
    section: 'social-transformation',
    icon: '📖'
  },
  {
    id: 'pt-1',
    type: 'pause-think',
    title: 'Pause & Think',
    content: 'Of these five changes, which would be hardest to give up — and why?',
    section: 'social-transformation',
    icon: '🤔'
  },
  {
    id: 'pt-2',
    type: 'pause-think',
    title: 'Pause & Think',
    content: 'In autonomous driving, why is it necessary to process data instantly on the vehicle side using edge computing, rather than sending the data to the cloud for judgment? Explain your answer.',
    section: 'emerging-tech',
    icon: '🤔'
  },
  {
    id: 'pt-3',
    type: 'pause-think',
    title: 'Pause & Think',
    content: 'Cashless payment is spreading in many countries. If a fully cashless society were realized, choose one advantage and one possible concern, and briefly explain the reason for each.',
    section: 'cashless-discussion',
    icon: '🤔'
  },
  {
    id: 'et-1',
    type: 'exam-tip',
    title: 'Exam-Style Question',
    content: 'Analyze how the spread of cloud computing (from the 2010s onward) has changed the way information technology is used. [6 marks]',
    section: 'exam',
    icon: '📝'
  },
  {
    id: 'kt-takeaway',
    type: 'key-fact',
    title: 'Key Takeaway',
    content: 'Information technology developed in stages — computers, the Internet, smartphones, and cloud computing. At each stage it introduced a new technology or service and also changed how society communicates, works, learns, and pays.',
    section: 'review',
    icon: '⭐'
  }
];
