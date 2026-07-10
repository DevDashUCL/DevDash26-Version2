import { Hero } from '@/components/Hero';
import { AboutDevDash } from '@/components/MissionBrief';
import { TimelineSection } from '@/components/TimelineSection';
import { PrizesSection } from '@/components/PrizesSection';
import { TeamSection } from '@/components/TeamSection';
import { FAQSection } from '@/components/FAQSection';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal><AboutDevDash /></Reveal>
      <Reveal><TimelineSection /></Reveal>
      <Reveal stagger staggerItem=".prize-card"><PrizesSection /></Reveal>
      <Reveal stagger staggerItem=".team-card"><TeamSection /></Reveal>
      <Reveal><FAQSection /></Reveal>
      <Reveal><FinalCTA /></Reveal>
      <Footer />
    </>
  );
}
