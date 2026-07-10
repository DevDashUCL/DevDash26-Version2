'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Clock, Award, HelpCircle, KeyRound } from 'lucide-react';
import { prefersReducedMotion } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const links = [
  { href: '#about', label: 'About', icon: Users },
  { href: '#schedule', label: 'Schedule', icon: Clock },
  { href: '#prizes', label: 'Prizes', icon: Award },
  { href: '#team', label: 'Team', icon: Users },
  { href: '#faq', label: 'FAQ', icon: HelpCircle },
];

export function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
      const toggle = () => navLinks.classList.toggle('open');
      hamburger.addEventListener('click', toggle);
      navLinks.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => navLinks.classList.remove('open'));
      });
    }

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        ScrollTrigger.create({
          trigger: document.body,
          start: 'top 56px',
          end: 'bottom bottom',
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(navbar, {
                background: 'rgba(5, 5, 5, 0.92)',
                backdropFilter: 'blur(16px)',
                height: '48px',
                duration: 0.3,
                ease: 'power2.out',
              });
            } else {
              gsap.to(navbar, {
                background: 'rgba(10, 10, 10, 0.85)',
                backdropFilter: 'blur(12px)',
                height: '56px',
                duration: 0.3,
                ease: 'power2.out',
              });
            }
          },
        });

        links.forEach((link) => {
          const id = link.href.slice(1);
          const section = document.getElementById(id);
          if (!section) return;
          ScrollTrigger.create({
            trigger: section,
            start: 'top 30%',
            end: 'bottom 30%',
            onToggle: (self) => {
              const navLink = navLinks?.querySelector(`a[href="${link.href}"]`);
              if (!navLink) return;
              if (self.isActive) {
                navLink.classList.add('active');
              } else {
                navLink.classList.remove('active');
              }
            },
          });
        });
      }

      const onActive = () => {
        if (prefersReducedMotion()) {
          navLinks?.querySelectorAll('a:not(.nav-cta)').forEach((a) => {
            const href = a.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            const section = document.getElementById(href.slice(1));
            if (!section) return;
            const rect = section.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 100) {
              a.classList.add('active');
            } else {
              a.classList.remove('active');
            }
          });
        }
      };

      window.addEventListener('scroll', onActive, { passive: true });
      onActive();
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav id="navbar" ref={navbarRef}>
      <Link href="/" className="logo">
        DEVDASH<span>&apos;26</span>
      </Link>
      <button className="hamburger" id="hamburger" aria-label="Toggle menu">
        <span /><span /><span />
      </button>
      <ul className="nav-links" id="nav-links">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.href}>
              <a href={link.href}>
                <Icon size={12} strokeWidth={1.5} />
                {link.label}
              </a>
            </li>
          );
        })}
        <li>
          <a href="#register" className="nav-cta">
            <KeyRound size={12} strokeWidth={1.5} />
            Register
          </a>
        </li>
      </ul>
    </nav>
  );
}
