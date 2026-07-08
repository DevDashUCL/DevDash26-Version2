import Image from 'next/image';
import { teamMembers } from '@/data/team';
import { SectionHeading } from './ui/SectionHeading';

export function TeamSection() {
  return (
    <section id="team" className="bg-section-team">
      <div className="section-bg-img">
        <Image
          src="/images/bg-wall.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ opacity: 0.15 }}
        />
      </div>
      <div className="os-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading label="Meet the Team" title="THE PEOPLE BEHIND DEVDASH" />
        <div className="team-grid">
          <div className="team-row">
            {teamMembers.slice(0, 2).map((member) => (
              <div key={member.name} className="team-card glass">
                <div className="team-card-name">{member.name}</div>
                <div className="team-card-role">{member.role}</div>
                <div className="team-card-email">
                  {member.email ? (
                    <a href={`mailto:${member.email}`}>{member.email}</a>
                  ) : '—'}
                </div>
                <div className="team-card-phone">{member.phone || '—'}</div>
              </div>
            ))}
          </div>
          <div className="team-row">
            {teamMembers.slice(2, 5).map((member) => (
              <div key={member.name} className="team-card glass">
                <div className="team-card-name">{member.name}</div>
                <div className="team-card-role">{member.role}</div>
                <div className="team-card-email">
                  {member.email ? (
                    <a href={`mailto:${member.email}`}>{member.email}</a>
                  ) : '—'}
                </div>
                <div className="team-card-phone">{member.phone || '—'}</div>
              </div>
            ))}
          </div>
          <div className="team-row">
            {teamMembers.slice(5, 8).map((member) => (
              <div key={member.name} className="team-card glass">
                <div className="team-card-name">{member.name}</div>
                <div className="team-card-role">{member.role}</div>
                <div className="team-card-email">
                  {member.email ? (
                    <a href={`mailto:${member.email}`}>{member.email}</a>
                  ) : '—'}
                </div>
                <div className="team-card-phone">{member.phone || '—'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
