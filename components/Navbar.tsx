'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Users, Clock, Award, HelpCircle, KeyRound } from 'lucide-react';

const links = [
  { href: '#about', label: 'About', icon: Users },
  { href: '#schedule', label: 'Schedule', icon: Clock },
  { href: '#prizes', label: 'Prizes', icon: Award },
  { href: '#team', label: 'Team', icon: Users },
  { href: '#faq', label: 'FAQ', icon: HelpCircle },
];

export function Navbar() {
  useEffect(() => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (!hamburger || !navLinks) return;

    const toggle = () => navLinks.classList.toggle('open');
    hamburger.addEventListener('click', toggle);

    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    let lastScroll = 0;
    const navbar = document.getElementById('navbar');

    const onScroll = () => {
      if (!navbar) return;
      const current = window.scrollY;
      if (current > lastScroll && current > 80) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      lastScroll = current;
    };

    const onActive = () => {
      navLinks.querySelectorAll('a:not(.nav-cta)').forEach((a) => {
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
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onActive, { passive: true });
    onActive();

    return () => {
      hamburger.removeEventListener('click', toggle);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onActive);
    };
  }, []);

  return (
    <nav id="navbar">
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
