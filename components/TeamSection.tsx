'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { teamMembers } from '@/data/team';
import { SectionHeading } from './ui/SectionHeading';
import { prefersReducedMotion } from '@/lib/animations';

export function TeamSection() {
  return (
    <section id="team" className="bg-section-team">
      <div className="os-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading label="Meet the Team" title="THE PEOPLE BEHIND DEVDASH" />
        <div className="team-grid">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  member,
}: {
  member: (typeof teamMembers)[number];
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const avatar = member.name
    .split(' ')
    .map((w) => w[0])
    .join('');

  const handleMouseEnter = () => {
    if (prefersReducedMotion() || !cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.02,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion() || !cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  return (
    <div
      className="team-card glass"
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="team-card-avatar">
        {member.image ? (
          <Image src={member.image} alt={member.name} fill className="team-card-img" />
        ) : (
          avatar
        )}
      </div>
      <div className="team-card-name">{member.name}</div>
      <div className="team-card-contact">
        {member.email && (
          <a href={`mailto:${member.email}`} className="team-card-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {member.email}
          </a>
        )}
        {member.github && (
          <a
            href={`https://github.com/${member.github.replace('@', '')}`}
            className="team-card-link"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
            </svg>
            {member.github}
          </a>
        )}
        {member.phone && !member.github && (
          <span className="team-card-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {member.phone}
          </span>
        )}
      </div>
      <div className="team-card-meta">{member.role}</div>
    </div>
  );
}
