import { LucideIcon, CheckCircle2 } from 'lucide-react';
import styles from './Legal.module.css';

export interface LegalHeroMetaItem {
  label: string;
  value: string;
}

export interface LegalHeroProps {
  badgeIcon: LucideIcon;
  badgeText: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  summaryTitle: string;
  summaryBadgeText: string;
  metaItems: LegalHeroMetaItem[];
}

export default function LegalHero({
  badgeIcon: BadgeIcon,
  badgeText,
  titleLine1,
  titleLine2,
  description,
  summaryTitle,
  summaryBadgeText,
  metaItems,
}: LegalHeroProps) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroGrid}>
          {/* Left Column: Headline */}
          <div className={styles.heroColLeft}>
            <div className={styles.heroBadge}>
              <BadgeIcon className={styles.heroBadgeIcon} />
              <span>{badgeText}</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleLine}>{titleLine1}</span>
              <span className={styles.heroTitleItalic}>{titleLine2}</span>
            </h1>

            <p className={styles.heroDesc}>
              {description}
            </p>
          </div>

          {/* Right Column: Key Meta Badge Card */}
          <div className={styles.heroColRight}>
            <div className={styles.heroMetaCard}>
              <div className={styles.heroMetaHeader}>
                <span className={styles.heroMetaTitle}>
                  {summaryTitle}
                </span>
                <span className={styles.heroMetaPill}>
                  <CheckCircle2 className={styles.heroMetaPillIcon} />
                  {summaryBadgeText}
                </span>
              </div>

              <div className={styles.heroMetaList}>
                {metaItems.map((item, idx) => (
                  <div key={idx} className={styles.heroMetaRow}>
                    <span className={styles.heroMetaLabel}>{item.label}:</span>
                    <span className={styles.heroMetaValue}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
