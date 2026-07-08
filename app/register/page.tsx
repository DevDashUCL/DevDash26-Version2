import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Register — DevDash \'26',
};

export default function RegisterPage() {
  return (
    <main className="register-page">
      <div className="os-container">
        <p className="section-label">Registration</p>
        <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>
          SECURE YOUR <span className="highlight">STATION</span>
        </h1>
        <p className="section-desc" style={{ margin: '0 auto 2rem' }}>
          Registration details will be announced soon. Stay tuned.
        </p>
        <Button href="/">Back to Home</Button>
      </div>
    </main>
  );
}
