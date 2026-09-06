import { Eye, CheckCircle2 } from 'lucide-react';
import styles from './Legal.module.css';

export interface LegalClause {
  id: string;
  number: string;
  title: string;
  category: string;
  tldr: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalSectionCardProps {
  clause: LegalClause;
  isOpen: boolean;
  onToggle: () => void;
}

export default function LegalSectionCard({ clause, isOpen, onToggle }: LegalSectionCardProps) {
  return (
    <article
      id={clause.id}
      className={`${styles.cardArticle} ${
        isOpen ? styles.cardArticleOpen : styles.cardArticleClosed
      }`}
    >
      {/* Interactive Clause Header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={styles.cardHeaderBtn}
      >
        <div className={styles.cardHeaderLeft}>
          <div className={styles.cardBadgeRow}>
            <span className={styles.cardBadgeNum}>
              {clause.number}
            </span>
            <span className={styles.cardBadgeCat}>
              {clause.category}
            </span>
          </div>
          <h2 className={styles.cardTitle}>
            {clause.title}
          </h2>
        </div>

        {/* Eye Icon Circle Indicator */}
        <div
          className={`${styles.cardEyeIndicator} ${
            isOpen ? styles.cardEyeOpen : styles.cardEyeClosed
          }`}
          aria-hidden="true"
        >
          {isOpen ? (
            <Eye className={styles.cardEyeIcon} />
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.cardEyeIcon}
            >
              <path d="M3 11c3 3.8 6 5.5 9 5.5s6-1.7 9-5.5" />
              <path d="M6 14.5l-1.5 2" />
              <path d="M12 16.5v2.5" />
              <path d="M18 14.5l1.5 2" />
            </svg>
          )}
        </div>
      </button>

      {/* Always-visible Plain English Summary Banner */}
      <div className={styles.cardSummaryWrap}>
        <div className={styles.cardSummaryBox}>
          <span className={styles.cardSummaryTag}>
            SUMMARY
          </span>
          <span className={styles.cardSummaryText}>{clause.tldr}</span>
        </div>
      </div>

      {/* Expandable Content Drawer */}
      <div
        className={`${styles.cardDrawer} ${
          isOpen ? styles.cardDrawerOpen : styles.cardDrawerClosed
        }`}
      >
        <div className={styles.cardDrawerInner}>
          <div className={styles.cardDrawerContent}>
            {clause.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className={styles.cardParagraph}>
                {p}
              </p>
            ))}
            {clause.bullets && (
              <ul className={styles.cardBulletList}>
                {clause.bullets.map((b, bIdx) => (
                  <li key={bIdx} className={styles.cardBulletItem}>
                    <CheckCircle2 className={styles.cardBulletIcon} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
