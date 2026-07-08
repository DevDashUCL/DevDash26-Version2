import { SectionHeading } from './ui/SectionHeading';

const prizeCategories = [
  { label: 'Champion', detail: 'Top prize for the winning team' },
  { label: 'Runner-Up', detail: 'Second place award' },
  { label: 'Best Innovation', detail: 'Most innovative solution' },
  { label: 'Best UI/UX', detail: 'Outstanding design and experience' },
  { label: "People's Choice", detail: 'Fan favourite award' },
  { label: 'Sponsor Awards', detail: 'Special category prizes' },
];

export function PrizesSection() {
  return (
    <section id="prizes" className="bg-section-prizes">
      <div className="os-container">
        <SectionHeading
          label="Rewards"
          title={
            <>
              BUILD. COMPETE. <span className="highlight">WIN.</span>
            </>
          }
          description="LKR 500,000 in prizes across multiple categories."
        />
        <div className="prize-pool-figure glass">
          <span className="prize-amount">LKR 500,000</span>
          <span className="prize-amount-label">Prize Pool</span>
        </div>
        <div className="prize-grid">
          {prizeCategories.map((prize) => (
            <div key={prize.label} className="prize-card glass">
              <div className="prize-label">{prize.label}</div>
              <div className="prize-detail">{prize.detail}</div>
            </div>
          ))}
        </div>
        <p className="prize-note">
          Full prize breakdown to be announced soon. Certificates provided to all participants.
        </p>
      </div>
    </section>
  );
}
