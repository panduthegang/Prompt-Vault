import { Heart, ArrowUpRight } from 'lucide-react';
import { LegalClause } from './LegalSectionCard';
import styles from './Legal.module.css';

export interface LegalSidebarProps {
  clauses: LegalClause[];
  openClauses: Record<string, boolean>;
  onSelectClause: (id: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  creatorSubtext: string;
}

export default function LegalSidebar({
  clauses,
  openClauses,
  onSelectClause,
  onExpandAll,
  onCollapseAll,
  creatorSubtext,
}: LegalSidebarProps) {
  return (
    <div className={styles.sidebarWrap}>
      {/* Table of Contents */}
      <div className={styles.tocCard}>
        <div className={styles.tocHeader}>
          <span className={styles.tocTitle}>
            Quick Index
          </span>
          <div className={styles.tocActions}>
            <button
              type="button"
              onClick={onExpandAll}
              className={styles.tocBtnExpand}
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={onCollapseAll}
              className={styles.tocBtnCollapse}
            >
              Collapse
            </button>
          </div>
        </div>

        <nav className={styles.tocNav}>
          {clauses.map((clause) => {
            const isOpen = openClauses[clause.id];
            return (
              <button
                key={clause.id}
                type="button"
                onClick={() => onSelectClause(clause.id)}
                className={`${styles.tocNavItem} ${
                  isOpen ? styles.tocNavItemActive : ''
                }`}
              >
                <span className={styles.tocNavText}>
                  <span className={styles.tocNavNumber}>{clause.number}.</span>
                  {clause.title}
                </span>
                <span className={styles.tocNavTag}>
                  {clause.category}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Creator Card */}
      <div className={styles.creatorCard}>
        <div className={styles.creatorHeartWrap}>
          <Heart className={styles.creatorHeartIcon} />
        </div>
        <div className={styles.creatorTextCol}>
          <h4 className={styles.creatorTitle}>
            BUILT BY HARSH
          </h4>
          <p className={styles.creatorDesc}>
            {creatorSubtext}
          </p>
        </div>

        <a
          href="https://harshrathod-portfolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.creatorBtn}
        >
          <span className={styles.creatorBtnFront}>
            Harsh Rathod Portfolio
          </span>
          <span className={styles.creatorBtnBack}>
            <ArrowUpRight className={styles.creatorBtnArrow} />
          </span>
        </a>
      </div>
    </div>
  );
}
