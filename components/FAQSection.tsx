'use client';

import { useState } from 'react';
import { faqItems } from '@/data/faq';
import { SectionHeading } from './ui/SectionHeading';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-section-faq">
      <div className="os-container">
        <SectionHeading
          label="FAQ"
          title={
            <>
              GOT <span className="highlight">QUESTIONS?</span>
            </>
          }
        />
        <div className="faq-list">
          {faqItems.map((item, i) => (
            <div key={i} className={`faq-item glass${openIndex === i ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => toggle(i)}>
                {item.question}
                <span className="icon">+</span>
              </button>
              <div className="faq-a-wrap">
                <div className="faq-a">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
