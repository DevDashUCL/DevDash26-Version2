'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Button } from './ui/Button';
import { prefersReducedMotion } from '@/lib/animations';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReducedMotion()) return;

    const navbar = document.querySelector('#navbar');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      if (navbar) {
        tl.fromTo(navbar, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0);
      }
      tl.fromTo('.hero-presents', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 0.2)
        .fromTo('.hero-title-brand', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 0.35)
        .fromTo('.hero-tagline', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 0.55)
        .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 0.7)
        .fromTo('.hero-actions a', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.1 }, 0.9)
        .fromTo('.hero-stats', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 1.15)
        .fromTo('.hero-img', { scale: 0.95, opacity: 0.6 }, { scale: 1, opacity: 0.3, duration: 0.8, ease: 'power1.out' }, 0);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="bg-grid" ref={sectionRef}>
      <Image
        src="/images/hero-2.png"
        alt=""
        fill
        className="object-cover hero-img"
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
