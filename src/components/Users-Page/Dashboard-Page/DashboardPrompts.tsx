import { Star, Copy, Check } from 'lucide-react';
import { PromptItem, DASHBOARD_CATEGORY_TAGS } from './dashboardData';

export interface DashboardPromptsProps {
  prompts: PromptItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  copiedId: string | null;
  onCopyPrompt: (id: string, text: string) => void;
  onToggleStar: (id: string) => void;
}

export default function DashboardPrompts({
  prompts,
  selectedCategory,
  onSelectCategory,
  copiedId,
  onCopyPrompt,
  onToggleStar,
}: DashboardPromptsProps) {
  return (
    <section className="bg-vault-cream rounded-[26px] p-5 sm:p-6 border-2 border-vault-dark/15 shadow-xs space-y-5">
      {/* Header with Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-vault-dark/10">
        <div>
          <h2 className="font-serif text-2xl text-vault-dark font-normal">
            Your Vault Prompts
          </h2>
          <p className="font-sans text-xs text-vault-dark/55 font-medium pt-0.5">
            Click copy to grab any prompt to clipboard instantly.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {DASHBOARD_CATEGORY_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onSelectCategory(tag)}
              className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === tag
                  ? 'bg-vault-dark text-vault-cream shadow-xs'
                  : 'bg-vault-dark/5 text-vault-dark/70 hover:bg-vault-yellow/50 hover:text-vault-dark border border-vault-dark/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Cards Grid (3 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {prompts.map((p) => (
          <div
            key={p.id}
            className={`rounded-[22px] p-5 flex flex-col justify-between space-y-4 transition-all duration-200 ${
              p.isFeatured
                ? 'bg-vault-dark text-vault-cream border-2 border-vault-dark shadow-sm'
                : 'bg-vault-cream text-vault-dark border-2 border-vault-dark/15 hover:border-vault-dark/40 hover:shadow-sm'
            }`}
          >
            <div className="space-y-3">
              {/* Category Tag & Star */}
              <div className="flex items-center justify-between">
                <span
                  className={`font-sans text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    p.isFeatured
                      ? 'bg-vault-yellow text-vault-dark border-vault-dark'
                      : 'bg-vault-yellow/40 text-vault-dark border-vault-dark/15'
                  }`}
                >
                  {p.category}
                </span>
                <button
                  type="button"
                  onClick={() => onToggleStar(p.id)}
                  className="cursor-pointer"
                  title={p.isStarred ? 'Remove from starred' : 'Add to starred'}
                >
                  <Star
                    className={`w-4 h-4 ${
                      p.isStarred
                        ? p.isFeatured
                          ? 'text-vault-yellow fill-vault-yellow'
                          : 'text-vault-dark fill-vault-dark'
                        : p.isFeatured
                        ? 'text-vault-cream/40'
                        : 'text-vault-dark/25'
                    }`}
                  />
                </button>
              </div>

              {/* Title */}
              <h3
                className={`font-sans font-bold text-base truncate ${
                  p.isFeatured ? 'text-vault-cream' : 'text-vault-dark'
                }`}
              >
                {p.title}
              </h3>

              {/* Snippet */}
              <p
                className={`font-sans text-xs leading-relaxed line-clamp-4 ${
                  p.isFeatured ? 'text-vault-cream/70' : 'text-vault-dark/65'
                }`}
              >
                {p.snippet}
              </p>
            </div>

            {/* Footer: Copy & Time */}
            <div
              className={`flex items-center justify-between pt-3 border-t ${
                p.isFeatured ? 'border-vault-cream/15' : 'border-vault-dark/10'
              }`}
            >
              <span
                className={`font-sans text-[11px] ${
                  p.isFeatured ? 'text-vault-cream/50' : 'text-vault-dark/45'
                }`}
              >
                {p.timestamp}
              </span>

              <button
                type="button"
                onClick={() => onCopyPrompt(p.id, p.fullPrompt)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer ${
                  p.isFeatured
                    ? 'bg-vault-green text-vault-dark hover:brightness-105'
                    : 'bg-vault-dark text-vault-cream hover:bg-vault-darker'
                }`}
              >
                {copiedId === p.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
