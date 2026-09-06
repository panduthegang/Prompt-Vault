import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PromptHero from '../../components/Prompts-Page/PromptHero';
import PromptsGrid from '../../components/Prompts-Page/PromptsGrid';
import PromptsCurveLock from '../../components/Prompts-Page/PromptsCurveLock';
import styles from '../../components/Prompts-Page/Prompts.module.css';

export default function Prompts() {
  return (
    <div className={styles.promptsPage}>
      {/* Smart Reveal Navbar */}
      <Navbar />

      <main className={styles.promptsMain}>
        {/* Compact, Focused Hero Section */}
        <PromptHero />

        {/* Section 1: Visible Prompt Cards Grid */}
        <PromptsGrid />

        {/* Section 2: Sleek Downward Curve Cutoff with Centered Lock Pill Button */}
        <PromptsCurveLock />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
