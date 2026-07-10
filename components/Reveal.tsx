'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollRevealConfig, prefersReducedMotion, staggerRevealConfig } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  as?: 'section' | 'div';
  className?: string;
  id?: string;
  stagger?: boolean;
  staggerItem?: string;
}

export function Reveal({ children, as: Tag = 'div', className, id, stagger, staggerItem }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (stagger && staggerItem) {
        const items = el.querySelectorAll(staggerItem);
        if (items.length) {
          gsap.fromTo(items, { opacity: 0, y: 30 }, staggerRevealConfig(el));
          return;
        }
      }
      gsap.fromTo(el, { opacity: 0, y: 40 }, scrollRevealConfig(el));
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [stagger, staggerItem]);

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
