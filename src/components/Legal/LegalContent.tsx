import { useState } from 'react';
import LegalSidebar from './LegalSidebar';
import LegalSectionCard, { LegalClause } from './LegalSectionCard';
import styles from './Legal.module.css';

export interface LegalContentProps {
  clauses: LegalClause[];
  creatorSubtext: string;
}

export default function LegalContent({ clauses, creatorSubtext }: LegalContentProps) {
  const [openClauses, setOpenClauses] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    clauses.forEach((c, idx) => {
      initial[c.id] = idx < 2;
    });
    return initial;
  });

  const toggleClause = (id: string) => {
    setOpenClauses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    clauses.forEach((c) => {
      allOpen[c.id] = true;
    });
    setOpenClauses(allOpen);
  };

  const collapseAll = () => {
    setOpenClauses({});
  };

  const handleSelectClause = (id: string) => {
    setOpenClauses((prev) => ({ ...prev, [id]: true }));
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className={styles.contentSection}>
      <div className={styles.contentContainer}>
        <div className={styles.contentGrid}>
          {/* Left Column: Sticky Table of Contents & Creator Card */}
          <LegalSidebar
            clauses={clauses}
            openClauses={openClauses}
            onSelectClause={handleSelectClause}
            onExpandAll={expandAll}
            onCollapseAll={collapseAll}
            creatorSubtext={creatorSubtext}
          />

          {/* Right Column: Stacked Interactive Clauses */}
          <div className={styles.clausesCol}>
            {clauses.map((clause) => (
              <LegalSectionCard
                key={clause.id}
                clause={clause}
                isOpen={!!openClauses[clause.id]}
                onToggle={() => toggleClause(clause.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
