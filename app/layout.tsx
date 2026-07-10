import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, IBM_Plex_Mono } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { LoadingScreen } from '@/components/LoadingScreen';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "DEVDASH '26 — UCL's Inaugural University Hackathon",
  description:
    "Join UCL's first-ever university-wide hackathon. 10 hours where the next generation of engineers, developers, designers, and innovators build tomorrow's technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <LoadingScreen />
        <Navbar />
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
