import React from 'react';
import styles from './Landing.module.css';
import { STATS_DATA, StatItem } from './landingData';

export interface StatsProps {
  className?: string;
}

export type { StatItem };

export default function Stats({ className = '' }: StatsProps) {
  return (
    <section className={`${styles.statsSection} ${className}`}>
      <div className={styles.statsGrid}>
        {STATS_DATA.map((stat, idx) => {
          const borderBottom = idx < 2 ? styles.statBorderBottom : '';
          const borderRight = idx % 2 === 0 ? styles.statBorderRight : '';
          const borderRightLg = idx === 1 || idx === 2 ? styles.statBorderRightLg : '';

          return (
            <div
              key={stat.id}
              id={stat.id}
              className={`${styles.statCard} ${borderBottom} ${borderRight} ${borderRightLg}`}
            >
              <span className={styles.statValue}>
                {stat.value}
              </span>
              <span className={styles.statLabel}>
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
