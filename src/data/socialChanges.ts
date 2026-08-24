// ============================================================
// Social Changes Data — sourced from the official lesson
// ============================================================
import { SocialChange } from '@/lib/types';

export const socialChanges: SocialChange[] = [
  {
    id: 'sns',
    nameEn: 'SNS (Social Networking Service)',
    nameAr: 'خدمة الشبكات الاجتماعية',
    definition: 'Services that allow users to connect with each other and post and share information. They are highly effective at spreading information rapidly.',
    example: 'Facebook, Instagram, X (Twitter), TikTok',
    icon: '🔗',
    technology: 'Social media platforms',
    capability: 'Connect with people globally, post and share information instantly',
    changedBehavior: 'People share their lives, opinions, and news online instead of only face-to-face',
    socialTransformation: 'Information spreads rapidly worldwide; new forms of community, marketing, and public discourse have emerged'
  },
  {
    id: 'ecommerce',
    nameEn: 'E-commerce (EC)',
    nameAr: 'التجارة الإلكترونية',
    definition: 'Buying and selling goods and services through the Internet.',
    example: 'Online shops such as Amazon and eBay',
    icon: '🛒',
    technology: 'Online marketplaces and payment systems',
    capability: 'Buy and sell goods from anywhere, at any time',
    changedBehavior: 'Shopping moved from physical stores to websites and apps',
    socialTransformation: 'Global marketplace accessible to anyone; small businesses can sell worldwide; traditional retail has been disrupted'
  },
  {
    id: 'remote-work',
    nameEn: 'Remote Work',
    nameAr: 'العمل عن بُعد',
    definition: 'A working style in which work is performed from home or other remote locations using the Internet.',
    example: 'Video conferencing (Zoom, Teams), collaboration tools (Slack, Google Docs)',
    icon: '🏠',
    technology: 'Video conferencing, cloud collaboration tools',
    capability: 'Work from any location with Internet access',
    changedBehavior: 'Employees no longer need to commute to offices daily',
    socialTransformation: 'Work-life balance redefined; companies can hire globally; cities and transportation patterns are changing'
  },
  {
    id: 'online-learning',
    nameEn: 'Online Learning',
    nameAr: 'التعلم عبر الإنترنت',
    definition: 'A learning style in which classes and study materials are delivered using the Internet.',
    example: 'Online platforms (Khan Academy, Coursera), virtual classrooms',
    icon: '📚',
    technology: 'Learning management systems, video platforms',
    capability: 'Access classes and study materials from anywhere',
    changedBehavior: 'Students can learn at their own pace, from any location',
    socialTransformation: 'Education is no longer limited by geography; lifelong learning becomes accessible to everyone'
  },
  {
    id: 'cashless',
    nameEn: 'Cashless Payment',
    nameAr: 'الدفع غير النقدي',
    definition: 'A system for making payments using electronic money, QR codes, etc., without using cash.',
    example: 'Credit cards, debit cards, mobile payment apps',
    icon: '💳',
    technology: 'Digital payment systems, NFC, QR codes',
    capability: 'Pay for goods and services without physical cash',
    changedBehavior: 'People carry phones instead of wallets; transactions are instant and recorded digitally',
    socialTransformation: 'Financial inclusion is expanded; transaction data enables new services; but raises concerns about digital access and privacy'
  }
];
