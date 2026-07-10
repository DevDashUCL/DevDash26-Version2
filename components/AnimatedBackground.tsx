'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AnimatedBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        backgroundPosition: '0% 100%, 100% 0%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={bgRef}
      className="animated-bg"
      aria-hidden="true"
    />
  );
}
