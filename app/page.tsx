import { Hero } from '@/components/Hero';
import { AboutDevDash } from '@/components/MissionBrief';
import { TimelineSection } from '@/components/TimelineSection';
import { PrizesSection } from '@/components/PrizesSection';
import { TeamSection } from '@/components/TeamSection';
import { FAQSection } from '@/components/FAQSection';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutDevDash />
      <TimelineSection />
      <PrizesSection />
      <TeamSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </>
  );
}
