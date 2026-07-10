import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function splitTextToWords(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || '';
  element.textContent = '';
  return text.split(' ').map((word) => {
    const span = document.createElement('span');
    span.textContent = word + '\u00A0';
    span.style.display = 'inline-block';
    element.appendChild(span);
    return span;
  });
}

export function createEntranceTimeline() {
  if (prefersReducedMotion()) return null;
  const tl = gsap.timeline();
  return tl;
}

export function scrollRevealConfig(trigger: HTMLElement, delay: number = 0) {
  if (prefersReducedMotion()) return { opacity: 1, y: 0 };
  return {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay,
    ease: 'power2.out' as const,
    scrollTrigger: {
      trigger,
      start: 'top 80%' as const,
      once: true,
    },
  };
}

export function staggerRevealConfig(trigger: HTMLElement) {
  if (prefersReducedMotion()) return { opacity: 1, y: 0 };
  return {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out' as const,
    scrollTrigger: {
      trigger,
      start: 'top 80%' as const,
      once: true,
    },
  };
}
