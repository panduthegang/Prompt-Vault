import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, FileText } from 'lucide-react';
import styles from './Legal.module.css';

export interface LegalSubHeaderProps {
  activePage: 'privacy' | 'terms';
  parentLabel: string;
  currentLabel: string;
}

export default function LegalSubHeader({
  activePage,
  parentLabel,
  currentLabel,
}: LegalSubHeaderProps) {
  const isPrivacy = activePage === 'privacy';

  return (
    <div className={styles.subHeaderContainer}>
      <div className={styles.subHeaderContent}>
        {/* Breadcrumb path */}
        <div className={styles.breadcrumb}>
          <Link to="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <ChevronRight className={styles.breadcrumbChevron} />
          <span>{parentLabel}</span>
          <ChevronRight className={styles.breadcrumbChevron} />
          <span className={styles.breadcrumbActive}>
            {currentLabel}
          </span>
        </div>

        {/* Document Switcher Tabs */}
        <div className={styles.tabSwitcher}>
          <Link
            to="/privacy"
            className={isPrivacy ? styles.tabItemActive : styles.tabItemInactive}
          >
            {isPrivacy && <ShieldCheck className={styles.tabIcon} />}
            <span>Privacy Policy</span>
          </Link>
          <Link
            to="/terms"
            className={!isPrivacy ? styles.tabItemActive : styles.tabItemInactive}
          >
            {!isPrivacy && <FileText className={styles.tabIcon} />}
            <span>Terms &amp; Conditions</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
