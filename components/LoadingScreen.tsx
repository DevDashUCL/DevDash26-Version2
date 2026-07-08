'use client';

import { useEffect, useState } from 'react';

const bootMessages = [
  'DEVDASH OS v2.0.4',
  'INITIALIZING SYSTEM...',
  'LOADING SECURE KERNEL...',
  'ESTABLISHING ENCRYPTED CONNECTION...',
  'VERIFYING INTEGRITY...',
  'SYSTEM READY',
];

export function LoadingScreen() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const fill = document.getElementById('loading-fill');
    const percent = document.getElementById('loading-percent');
    const screen = document.getElementById('loading-screen');

    if (!fill || !percent || !screen) return;

    let p = 0;

    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 6) + 2;
      if (p > 100) p = 100;
      fill.style.width = p + '%';
      percent.textContent = p + '%';

      if (p === 100) {
        clearInterval(interval);
        setTimeout(() => {
          screen.classList.add('hidden');
          setHidden(true);
        }, 600);
      }
    }, 200);
  }, []);

  if (hidden) return null;

  return (
    <div id="loading-screen" className="bg-grid">
      <div className="loading-title">
        DEVDASH OS<span>_</span>
      </div>
      {bootMessages.map((msg, i) => (
        <div
          key={msg}
          className="loading-boot-line"
          style={{ animationDelay: `${i * 0.4}s` }}
        >
          <span className="highlight">[{(i + 1).toString().padStart(2, '0')}]</span> {msg}
        </div>
      ))}
      <div className="loading-bar-track" style={{ marginTop: '0.75rem' }}>
        <div className="loading-bar-fill" id="loading-fill" />
      </div>
      <div className="loading-percent" id="loading-percent">0%</div>
    </div>
  );
}
