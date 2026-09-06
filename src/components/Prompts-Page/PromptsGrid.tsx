import { Zap, Flame } from 'lucide-react';
import PromptCard from './PromptCard';
import { VISIBLE_PROMPTS } from './promptsData';
import styles from './Prompts.module.css';

export default function PromptsGrid() {
  return (
    <section className={styles.gridSection}>
      <div className={styles.gridContainer}>
        {/* Cards Header Info Row */}
        <div className={styles.gridHeaderRow}>
          <div className={styles.gridHeaderLeft}>
            <span className={styles.gridHeaderTitle}>
              Featured Prompts
            </span>
            <span className={styles.gridHeaderCountBadge}>
              {VISIBLE_PROMPTS.length} Cards
            </span>
          </div>

          <div className={styles.gridHeaderRight}>
            <span className={styles.gridHeaderBadge}>
              <Zap className={styles.gridHeaderIconGreen} />
              1-Click Copy
            </span>
            <span className={styles.gridHeaderDot}>•</span>
            <span className={styles.gridHeaderBadge}>
              <Flame className={styles.gridHeaderIconYellow} />
              Production Tested
            </span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className={styles.gridCardsContainer}>
          {VISIBLE_PROMPTS.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </div>
    </section>
  );
}
