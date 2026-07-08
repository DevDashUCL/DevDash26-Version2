import { sessions } from '@/data/timeline';
import { SectionHeading } from './ui/SectionHeading';

export function TimelineSection() {
  return (
    <section id="schedule" className="bg-section-schedule">
      <div className="os-container">
        <SectionHeading
          label="Event Timeline"
          title={
            <>
              THE MISSION <span className="highlight">BEGINS HERE.</span>
            </>
          }
        />
        <div className="timeline">
          {sessions.map((session) => (
            <div key={session.title + session.date} className={`timeline-item glass${session.muted ? ' muted' : ''}`}>
              <div className="date-block">
                {session.date}
                <span className="time">{session.time}</span>
              </div>
              <div className="session-name">
                {session.muted ? <strong>{session.title}</strong> : session.title}
              </div>
              <div className="session-by">
                {session.host ? <><strong>{session.host}</strong></> : '—'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
