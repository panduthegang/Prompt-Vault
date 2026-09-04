import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PromptHero from '../../components/Prompts-Page/PromptHero';
import PromptsGrid from '../../components/Prompts-Page/PromptsGrid';
import PromptsCurveLock from '../../components/Prompts-Page/PromptsCurveLock';

export default function Prompts() {
  return (
    <div className="w-full min-h-screen bg-vault-cream flex flex-col selection:bg-vault-green selection:text-vault-dark overflow-x-hidden">
      {/* Smart Reveal Navbar */}
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
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
