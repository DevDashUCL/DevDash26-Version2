export interface TimelineSession {
  date: string;
  time: string;
  duration: string;
  title: string;
  host: string;
  muted?: boolean;
}

export const sessions: TimelineSession[] = [
  {
    date: 'Sep 3, 2026',
    time: '10 AM – 12 PM',
    duration: '2h',
    title: 'Introduction to Hackathon',
    host: 'Mr. Rukshan Senanayake',
  },
  {
    date: 'Sep 7, 2026',
    time: '10 AM – 12 PM',
    duration: '2h',
    title: 'GitHub & Version Control',
    host: 'Mirco Fernando',
  },
  {
    date: 'Sep 9, 2026',
    time: '10 AM – 1:15 PM',
    duration: '3h',
    title: 'AI-Powered Development: Modern AI Tools',
    host: 'Dinod Manjith',
  },
  {
    date: 'Sep 19, 2026',
    time: '8 AM – 7 PM',
    duration: 'Tentative',
    title: 'DevDash \'26 Hackathon',
    host: '',
    muted: true,
  },
];
