import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FolderLock, Sparkles } from 'lucide-react';
import styles from './Landing.module.css';
import { PROCESS_STEPS } from './landingData';

export interface ProcessProps {
  className?: string;
}

export default function Process({ className = '' }: ProcessProps) {
  return (
    <section
      id="how-it-works"
      className={`${styles.processSection} ${className}`}
    >
      <div className={styles.processContainer}>
        {/* Section Header */}
        <div className={styles.processHeader}>
          <span className={styles.processEyebrow}>
            Our Process
          </span>

          <h2 className={styles.processTitle}>
            <span className={styles.processTitleSpan}>SIMPLE, CLEAR, AND</span>
            <span className={styles.processTitleItalic}>ALWAYS AT HAND</span>
          </h2>

          <p className={styles.processSubtitle}>
            We believe you should know exactly what to expect at every stage. No complex setups, no lost prompts — just a straightforward path to saving your best ideas.
          </p>
        </div>

        {/* 3-Column Grid Container */}
        <div className={styles.processBox}>
          {/* Left Panel (~35% width) - Vault Green Visual Folder Graphic */}
          <div className={styles.processLeftPanel}>
            {/* Background Decorative Rings */}
            <div className={styles.processRing1} />
            <div className={styles.processRing2} />

            {/* Central Graphic Element */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className={styles.processFolderCard}>
                <FolderLock className={styles.processFolderIcon} />
              </div>

              <div className={styles.processFolderBadge}>
                <Sparkles style={{ width: '14px', height: '14px', color: 'var(--color-vault-yellow)', fill: 'var(--color-vault-yellow)' }} />
                <span>Instant Workflow</span>
              </div>
            </div>
          </div>

          {/* Right Area (~65% width) - 2x2 Step Grid without images */}
          <div className={styles.processStepsGrid}>
            {PROCESS_STEPS.map((item, idx) => {
              const borderBottom = idx < 2 ? styles.stepBorderBottom : '';
              const borderBottomMobile = idx === 2 ? styles.stepBorderBottomMobile : '';
              const borderRightSm = idx % 2 === 0 ? styles.stepBorderRightSm : '';

              return (
                <div
                  key={item.step}
                  className={`${styles.stepCard} ${borderBottom} ${borderBottomMobile} ${borderRightSm}`}
                >
                  <span className={styles.stepNumber}>{item.step}</span>
                  <div>
                    <h3 className={styles.stepHeading}>{item.title}</h3>
                    <p className={styles.stepDesc}>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className={styles.processActions}>
          {/* Primary Expanding Two-tone Pill Button */}
          <Link
            id="process-primary-cta"
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

          {/* Secondary Outline Pill Button */}
          <a
            id="process-secondary-cta"
            href="#comparison"
            className={styles.outlineBtn}
          >
            <span>Why Prompt Vault</span>
          </a>
        </div>
      </div>
    </section>
  );
}
