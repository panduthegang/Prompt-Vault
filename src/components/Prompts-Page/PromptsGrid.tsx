import { Zap, Flame } from 'lucide-react';
import PromptCard from './PromptCard';
import { VISIBLE_PROMPTS } from './promptsData';

export default function PromptsGrid() {
  return (
    <section className="w-full bg-vault-cream px-4 sm:px-6 md:px-10 lg:px-14 pt-8 sm:pt-10 pb-3 sm:pb-4">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Cards Header Info Row (Responsive: cleanly wrapped on mobile, single line on desktop) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 pb-4 sm:pb-5 border-b-2 border-vault-dark">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="font-serif italic text-2xl sm:text-3xl text-vault-dark font-normal">
              Featured Prompts
            </span>
            <span className="bg-vault-yellow px-2.5 py-0.5 rounded-full border border-vault-dark text-[11px] sm:text-xs font-sans font-bold text-vault-dark shrink-0">
              {VISIBLE_PROMPTS.length} Cards
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-sans font-semibold text-vault-dark/75">
            <span className="inline-flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-vault-green fill-vault-green shrink-0" />
              1-Click Copy
            </span>
            <span className="text-vault-dark/30">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-vault-dark fill-vault-yellow shrink-0" />
              Production Tested
            </span>
          </div>
        </div>

        {/* Cards Grid (3 Columns on desktop, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8">
          {VISIBLE_PROMPTS.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </div>
    </section>
  );
}
