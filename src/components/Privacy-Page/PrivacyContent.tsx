import { useState } from 'react';
import { PRIVACY_CLAUSES } from './privacyData';
import PrivacySidebar from './PrivacySidebar';
import PrivacyClauseCard from './PrivacyClauseCard';

export default function PrivacyContent() {
  const [openClauses, setOpenClauses] = useState<Record<string, boolean>>({
    'what-we-collect': true,
    'how-data-stored': true,
    'no-selling-no-scraping': false,
    'export-delete': false,
  });

  const toggleClause = (id: string) => {
    setOpenClauses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    PRIVACY_CLAUSES.forEach((c) => {
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
    <section className="w-full bg-vault-cream px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Sticky Table of Contents & Creator Card */}
          <PrivacySidebar
            openClauses={openClauses}
            onSelectClause={handleSelectClause}
            onExpandAll={expandAll}
            onCollapseAll={collapseAll}
          />

          {/* Right Column: Stacked Interactive Clauses */}
          <div className="lg:col-span-8 space-y-5">
            {PRIVACY_CLAUSES.map((clause) => (
              <PrivacyClauseCard
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
