import styles from './Prompts.module.css';

export default function PromptHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleLine}>PROMPTS FOR</span>
          <span className={styles.heroTitleItalic}>BREAKTHROUGH WORKFLOWS</span>
        </h1>

        <p className={styles.heroDesc}>
          Battle-tested system instructions, IDE rules, and reasoning chains curated for engineering excellence.
        </p>
      </div>
    </section>
  );
}
