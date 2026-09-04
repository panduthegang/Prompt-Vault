import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye } from 'lucide-react';
import styles from './Landing.module.css';
import { FAQ_ITEMS, FAQItem } from './landingData';

export type { FAQItem };

export interface FAQProps {
  className?: string;
}

export default function FAQ({ className = '' }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faqs"
      className={`${styles.faqSection} ${className}`}
    >
      <div className={styles.faqContainer}>
        <div className={styles.faqGrid}>
          {/* Left Column: Headline & Action CTAs */}
          <div className={styles.faqLeft}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span className={styles.faqEyebrow}>
                Take the First Step
              </span>

              <h2 className={styles.faqTitle}>
                <span className={styles.heroHeadlineSpan}>WE BELIEVE IN</span>
                <span className={styles.heroHeadlineItalic}>COMPLETE HONESTY</span>
              </h2>

              <p className={styles.faqSubtitle}>
                If you have a question we have not answered here, explore our vault or reach out to our team — we will always give you a straight answer.
              </p>
            </div>

            {/* Action Buttons Row */}
            <div className={styles.faqActions}>
              {/* Primary Expanding Two-tone Button */}
              <Link
                id="faq-primary-cta"
                to="/signin"
                className={styles.expandingBtn}
              >
                <span className={styles.btnFront}>
                  Get Started Free
                </span>
                <span className={styles.btnBack}>
                  <ArrowUpRight className={styles.btnBackIcon} />
                </span>
              </Link>

              {/* Secondary Outlined Pill Button */}
              <a
                id="faq-secondary-cta"
                href="#how-it-works"
                className={styles.outlineBtn}
              >
                <span>See How It Works</span>
              </a>
            </div>
          </div>

          {/* Right Column: Stacked Accordion Cards with Eye Indicator */}
          <div className={styles.faqAccordionList}>
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className={`${styles.faqCard} ${isOpen ? styles.faqCardOpen : styles.faqCardClosed}`}
                >
                  {/* Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-answer`}
                    className={styles.faqHeaderBtn}
                  >
                    <span className={styles.faqQuestion}>
                      {item.question}
                    </span>

                    {/* Eye Icon Circle Indicator */}
                    <div
                      className={`${styles.faqEyeIndicator} ${isOpen ? styles.faqEyeOpen : styles.faqEyeClosed}`}
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <Eye style={{ width: '20px', height: '20px', strokeWidth: 2.2 }} />
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: '18px', height: '18px', color: 'var(--color-vault-green)' }}
                        >
                          <path d="M3 11c3 3.8 6 5.5 9 5.5s6-1.7 9-5.5" />
                          <path d="M6 14.5l-1.5 2" />
                          <path d="M12 16.5v2.5" />
                          <path d="M18 14.5l1.5 2" />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* Expandable Answer Drawer */}
                  <div
                    id={`${item.id}-answer`}
                    role="region"
                    aria-labelledby={item.id}
                    className={`${styles.faqDrawer} ${isOpen ? styles.faqDrawerOpen : styles.faqDrawerClosed}`}
                  >
                    <div className={styles.faqDrawerInner}>
                      <div className={styles.faqAnswerBox}>
                        <p className={styles.faqAnswerText}>
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
