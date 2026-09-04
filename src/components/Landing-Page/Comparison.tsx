import { Link } from 'react-router-dom';
import { X, Check, ArrowUpRight, Zap, ShieldCheck, Clock } from 'lucide-react';
import styles from './Landing.module.css';
import { OLD_WAY_POINTS, VAULT_WAY_POINTS } from './landingData';

export interface ComparisonProps {
  className?: string;
}

export default function Comparison({ className = '' }: ComparisonProps) {
  return (
    <section
      id="comparison"
      className={`${styles.comparisonSection} ${className}`}
    >
      <div className={styles.comparisonContainer}>
        {/* Section Header */}
        <div className={styles.comparisonHeader}>
          <span className={styles.processEyebrow}>
            Why Prompt Vault
          </span>

          <h2 className={styles.processTitle}>
            <span className={styles.processTitleSpan}>CHAOS IN NOTION</span>
            <span className={styles.processTitleItalic}>VERSUS ORDER IN THE VAULT</span>
          </h2>

          <p className={styles.processSubtitle}>
            Standard note apps were never engineered for AI prompts, system prompts, or agent skill files. Here is what changes the day you step into the Vault.
          </p>
        </div>

        {/* 2-Column Neo-Brutalist Comparison Box */}
        <div className={styles.comparisonBox}>
          {/* Left Column: The Old Way (Scattered Notes) */}
          <div className={styles.comparisonOldWay}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                <span className={styles.comparisonTagOld}>
                  The Old Way
                </span>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-sans)', color: 'rgba(0, 45, 15, 0.6)', fontWeight: 600 }}>
                  Scattered & Fragile
                </span>
              </div>

              <h3 className={styles.comparisonColumnTitle}>
                Notion Dumps, Slack Threads & Forgotten Tabs
              </h3>

              <ul className={styles.comparisonList}>
                {OLD_WAY_POINTS.map((point, index) => (
                  <li key={index} className={styles.comparisonItem}>
                    <div className={styles.comparisonIconCircleOld}>
                      <X style={{ width: '12px', height: '12px', strokeWidth: 2.5 }} />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.comparisonSummaryOld}>
              <Clock style={{ width: '16px', height: '16px', color: 'rgba(0, 45, 15, 0.6)', flexShrink: 0 }} />
              <span>Result: Cognitive friction, lost inspiration, and constant re-prompting.</span>
            </div>
          </div>

          {/* Right Column: The Prompt Vault Standard */}
          <div className={styles.comparisonVaultWay}>
            {/* Subtle background glow */}
            <div className={styles.comparisonGlow} />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                <span className={styles.comparisonTagVault}>
                  The Vault Standard
                </span>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-sans)', color: 'var(--color-vault-green)', fontWeight: 600 }}>
                  Engineered for AI
                </span>
              </div>

              <h3 className={styles.comparisonTitleVault}>
                Instant Clipboard, Parameter Injections & skill.md Native
              </h3>

              <ul className={styles.comparisonList}>
                {VAULT_WAY_POINTS.map((point, index) => (
                  <li key={index} className={styles.comparisonItemVault}>
                    <div className={styles.comparisonIconCircleVault}>
                      <Check style={{ width: '12px', height: '12px', strokeWidth: 3 }} />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.comparisonSummaryVault}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Zap style={{ width: '16px', height: '16px', color: 'var(--color-vault-green)', fill: 'var(--color-vault-green)', flexShrink: 0 }} />
                <span style={{ fontWeight: 600, color: 'var(--color-vault-green)' }}>Saved Per Engineer:</span>
                <span>~4.2 hours / week</span>
              </div>
              <ShieldCheck style={{ width: '16px', height: '16px', color: 'var(--color-vault-green)', flexShrink: 0 }} />
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className={styles.comparisonActions}>
          {/* Primary Expanding Two-tone Pill Button */}
          <Link
            id="comparison-primary-cta"
            to="/signin"
            className={styles.expandingBtn}
          >
            <span className={styles.btnFront}>
              Switch to Prompt Vault Free
            </span>
            <span className={styles.btnBack}>
              <ArrowUpRight className={styles.btnBackIcon} />
            </span>
          </Link>

          {/* Secondary Outline Pill Button */}
          <a
            id="comparison-secondary-cta"
            href="#faqs"
            className={styles.outlineBtn}
          >
            <span>Have Questions? See FAQs</span>
          </a>
        </div>
      </div>
    </section>
  );
}
