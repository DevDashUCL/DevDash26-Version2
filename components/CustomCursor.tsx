'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const onMove = (e: MouseEvent) => {
        posRef.current = { x: e.clientX, y: e.clientY };
      };

      window.addEventListener('mousemove', onMove);

      gsap.ticker.add(() => {
        gsap.to(cursor, {
          x: posRef.current.x - 16,
          y: posRef.current.y - 16,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    />
  );
}
