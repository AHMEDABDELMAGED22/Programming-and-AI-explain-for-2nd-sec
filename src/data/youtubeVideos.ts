// ============================================================
// YouTube Videos Data — curated educational videos
// ============================================================
import { YouTubeVideo } from '@/lib/types';

export const youtubeVideos: YouTubeVideo[] = [
  {
    id: 'yt-eniac',
    videoId: 'k4oGI_dNaPc',
    title: 'ENIAC: The First Electronic Computer',
    channel: 'The History Guy',
    url: 'https://www.youtube.com/watch?v=k4oGI_dNaPc',
    relatedConcept: 'era-1940s',
    durationMinutes: 12
  },
  {
    id: 'yt-personal-computers',
    videoId: 'M5BZou6C01w',
    title: 'The History of Personal Computers',
    channel: 'ColdFusion',
    url: 'https://www.youtube.com/watch?v=M5BZou6C01w',
    relatedConcept: 'era-1970s',
    durationMinutes: 15
  },
  {
    id: 'yt-internet-history',
    videoId: '21eFwbb48sE',
    title: 'History of the Internet',
    channel: 'Melih Bilgil',
    url: 'https://www.youtube.com/watch?v=21eFwbb48sE',
    relatedConcept: 'era-1990s',
    durationMinutes: 8
  },
  {
    id: 'yt-smartphones',
    videoId: 'MnrJzXM7a6o',
    title: 'History of Smartphones',
    channel: 'TechAltar',
    url: 'https://www.youtube.com/watch?v=MnrJzXM7a6o',
    relatedConcept: 'era-2000s',
    durationMinutes: 11
  },
  {
    id: 'yt-cloud-computing',
    videoId: 'M988_fsOSWo',
    title: 'Cloud Computing Explained',
    channel: 'Simplilearn',
    url: 'https://www.youtube.com/watch?v=M988_fsOSWo',
    relatedConcept: 'era-2010s',
    durationMinutes: 10
  },
  {
    id: 'yt-moores-law',
    videoId: '6-tKOHICqrI',
    title: "Integrated Circuits & Moore's Law: Crash Course",
    channel: 'CrashCourse',
    url: 'https://www.youtube.com/watch?v=6-tKOHICqrI',
    relatedConcept: 'moores-law',
    durationMinutes: 12
  },
  {
    id: 'yt-edge-computing',
    videoId: 'cEOUeItHDdo',
    title: 'Edge Computing Explained',
    channel: 'IBM Technology',
    url: 'https://www.youtube.com/watch?v=cEOUeItHDdo',
    relatedConcept: 'edge-computing',
    durationMinutes: 6
  },
  {
    id: 'yt-vr',
    videoId: 'd_k8S779Z-M',
    title: 'MIT Explains: How Does Virtual Reality Work?',
    channel: 'MIT',
    url: 'https://www.youtube.com/watch?v=d_k8S779Z-M',
    relatedConcept: 'vr',
    durationMinutes: 2
  },
  {
    id: 'yt-ar-vr',
    videoId: 'WxzcD04rwc8',
    title: 'AR vs VR — What is the Difference?',
    channel: 'Simplilearn',
    url: 'https://www.youtube.com/watch?v=WxzcD04rwc8',
    relatedConcept: 'ar-vr',
    durationMinutes: 8
  },
  {
    id: 'yt-quantum',
    videoId: 'JhHMJCUmq28',
    title: 'Quantum Computing Explained',
    channel: 'Kurzgesagt',
    url: 'https://www.youtube.com/watch?v=JhHMJCUmq28',
    relatedConcept: 'quantum-computing',
    durationMinutes: 7
  },
  {
    id: 'yt-autonomous',
    videoId: 'aaOB-ErYq6Y',
    title: 'How Self-Driving Cars Work',
    channel: 'TED-Ed',
    url: 'https://www.youtube.com/watch?v=aaOB-ErYq6Y',
    relatedConcept: 'autonomous-driving',
    durationMinutes: 5
  }
];

export function getVideoForConcept(conceptId: string): YouTubeVideo | undefined {
  return youtubeVideos.find(v => v.relatedConcept === conceptId);
}
