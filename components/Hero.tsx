import Image from 'next/image';
import { Button } from './ui/Button';

export function Hero() {
  return (
    <section id="hero" className="bg-grid">
      <Image
        src="/images/hero-2.png"
        alt=""
        fill
        className="object-cover"
        style={{ zIndex: 0, opacity: 0.30 }}
        priority
      />
      <div className="liquid-blob liquid-blob--green" />
      <div className="liquid-blob liquid-blob--green-2" />
      <div className="bg-radial-glow--hero" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <div className="os-container hero-content">
        <p className="hero-presents">UCL COMPUTER SCIENCE COMMUNITY PRESENTS</p>
        <h1 className="hero-title">
          <span className="hero-title-brand">DEVDASH<span className="hero-title-year">&apos;26</span></span>
          <span className="hero-tagline">BUILD THE FUTURE.</span>
        </h1>
        <p className="hero-subtitle">
          DevDash is a 24-hour innovation hackathon where the next generation of builders, developers
          and creators turn ideas into real-world impact.
        </p>
        <div className="hero-actions">
          <Button href="#register">REGISTER NOW</Button>
          <Button variant="secondary" href="#about">LEARN MORE</Button>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">24</span> Hours</div>
          <div className="stat"><span className="stat-num">100+</span> Participants</div>
          <div className="stat"><span className="stat-num">30+</span> Teams</div>
          <div className="stat"><span className="stat-num">LKR 500K</span> Prize Pool</div>
        </div>
      </div>
    </section>
  );
}
