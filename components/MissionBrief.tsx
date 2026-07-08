import { SectionHeading } from './ui/SectionHeading';

export function AboutDevDash() {
  return (
    <section id="about" className="bg-section-about">
      <div className="os-container">
        <SectionHeading
          label="About DevDash"
          title={
            <>
              WE DON&apos;T JUST CODE. WE CREATE <span className="highlight">WHAT&apos;S NEXT.</span>
            </>
          }
        />
        <p className="section-desc">
          DevDash is a high-energy innovation hackathon bringing together developers, designers,
          entrepreneurs and problem solvers.
        </p>
        <p className="section-desc">
          Over 24 hours, participants transform ideas into working solutions while collaborating with
          mentors, industry professionals and fellow innovators.
        </p>
        <p className="section-desc">
          Whether you&apos;re building your first project or your next startup, DevDash is where
          innovation begins.
        </p>
        <div className="feature-row">
          <div className="feature-item">
            <span className="feature-icon">✦</span>
            <span>Innovate</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✦</span>
            <span>Collaborate</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✦</span>
            <span>Create Impact</span>
          </div>
        </div>
      </div>
    </section>
  );
}
