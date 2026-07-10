'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/animations';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function Button({ variant = 'primary', href, className = '', children }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const cls = `os-btn os-btn--${variant} ${className}`;

  const handleMouseEnter = () => {
    if (prefersReducedMotion() || !ref.current) return;
    gsap.to(ref.current, {
      scale: 1.04,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion() || !ref.current) return;
    gsap.to(ref.current, {
      scale: 1,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleMouseDown = () => {
    if (prefersReducedMotion() || !ref.current) return;
    gsap.to(ref.current, {
      scale: 0.97,
      duration: 0.1,
      ease: 'power2.in',
    });
  };

  const handleMouseUp = () => {
    if (prefersReducedMotion() || !ref.current) return;
    gsap.to(ref.current, {
      scale: 1.04,
      duration: 0.15,
      ease: 'power2.out',
    });
  };

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </button>
  );
}
