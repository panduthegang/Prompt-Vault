import { LucideIcon } from 'lucide-react';
import styles from './Legal.module.css';

export interface LegalPillarItem {
  icon: LucideIcon;
  number?: string;
  value?: string;
  label?: string;
  title?: string;
  desc: string;
}

export interface LegalPillarsProps {
  pillars: LegalPillarItem[];
}

export default function LegalPillars({ pillars }: LegalPillarsProps) {
  return (
    <section className={styles.pillarsSection}>
      <div className={styles.pillarsContainer}>
        <div className={styles.pillarsGrid}>
          {pillars.map((card, idx) => {
            const Icon = card.icon;
            const metric = card.number ?? card.value ?? '';
            const title = card.label ?? card.title ?? '';

            return (
              <div key={idx} className={styles.pillarCard}>
                <div className={styles.pillarTop}>
                  <div className={styles.pillarIconWrap}>
                    <Icon className={styles.pillarIcon} />
                  </div>
                  <span className={styles.pillarMetric}>
                    {metric}
                  </span>
                </div>
                <div>
                  <h3 className={styles.pillarTitle}>
                    {title}
                  </h3>
                  <p className={styles.pillarDesc}>
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
