import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import styles from './Legal.module.css';

export interface LegalCTAProps {
  tagline: string;
  titleLead: string;
  titleItalic: string;
  description: string;
  primaryBtnText: string;
  primaryBtnTo?: string;
  secondaryBtnText: string;
  secondaryBtnTo: string;
}

export default function LegalCTA({
  tagline,
  titleLead,
  titleItalic,
  description,
  primaryBtnText,
  primaryBtnTo = '/signup',
  secondaryBtnText,
  secondaryBtnTo,
}: LegalCTAProps) {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <span className={styles.ctaTagline}>
          {tagline}
        </span>
        <h3 className={styles.ctaTitle}>
          {titleLead} <span className={styles.ctaTitleItalic}>{titleItalic}</span>
        </h3>
        <p className={styles.ctaDesc}>
          {description}
        </p>

        <div className={styles.ctaActions}>
          <Link
            to={primaryBtnTo}
            className={styles.ctaExpandingBtn}
          >
            <span className={styles.ctaBtnFront}>
              {primaryBtnText}
            </span>
            <span className={styles.ctaBtnBack}>
              <ArrowUpRight className={styles.ctaBtnArrow} />
            </span>
          </Link>

          <Link
            to={secondaryBtnTo}
            className={styles.ctaOutlineBtn}
          >
            <span>{secondaryBtnText}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
