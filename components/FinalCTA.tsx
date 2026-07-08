import { Button } from './ui/Button';
import { SectionHeading } from './ui/SectionHeading';

export function FinalCTA() {
  return (
    <section id="register" className="bg-section-register">
      <div className="os-container">
        <SectionHeading
          label="Registration"
          title={
            <>
              READY TO BUILD <span className="highlight">THE FUTURE?</span>
            </>
          }
          description="Join hundreds of developers, designers and innovators for 24 hours of collaboration, learning and creation."
        />
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Button href="#">REGISTER NOW</Button>
        </div>
      </div>
    </section>
  );
}
