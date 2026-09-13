import { Copy, Check } from 'lucide-react';
import {
  TopPromptLeaderboardItem,
  TOP_LEADERBOARD_PROMPTS,
} from './adminDashboardData';

interface AdminDashboardLeaderboardProps {
  prompts?: TopPromptLeaderboardItem[];
  copiedLeaderboardId: string | null;
  onCopyPrompt: (id: string, text: string, title: string) => void;
}

export default function AdminDashboardLeaderboard({
  prompts = TOP_LEADERBOARD_PROMPTS,
  copiedLeaderboardId,
  onCopyPrompt,
}: AdminDashboardLeaderboardProps) {
  return (
    <section className="bg-vault-cream rounded-[26px] p-5 sm:p-6 border-2 border-vault-dark/15 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-vault-dark/10">
        <div>
          <h2 className="font-serif text-2xl text-vault-dark font-normal">
            Top Cloned Community Templates
          </h2>
          <p className="font-sans text-xs text-vault-dark/60 font-medium">
            The most copied and saved prompt templates across the platform this week.
          </p>
        </div>

        <span className="font-mono text-xs font-bold text-vault-dark/60 bg-vault-dark/5 px-3 py-1 rounded-full border border-vault-dark/10 self-start sm:self-auto">
          Real-time Leaderboard
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-vault-dark/10 font-sans text-[11px] font-bold uppercase tracking-wider text-vault-dark/50">
              <th className="py-3 px-4">Rank &amp; Template</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4 text-right">Copies Won</th>
              <th className="py-3 px-4 text-right">Upvotes</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vault-dark/10 font-sans text-xs">
            {prompts.map((item) => (
              <tr key={item.id} className="hover:bg-vault-dark/5 transition-colors">
                <td className="py-3.5 px-4 font-bold text-vault-dark max-w-sm">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-extrabold shrink-0 border ${
                        item.rank === 1
                          ? 'bg-vault-yellow text-vault-dark border-vault-dark'
                          : item.rank === 2
                          ? 'bg-vault-cream text-vault-dark border-vault-dark/30'
                          : 'bg-vault-dark/5 text-vault-dark/70 border-vault-dark/10'
                      }`}
                    >
                      {item.rank}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate font-serif text-base text-vault-dark font-normal">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-vault-dark/60 font-sans truncate line-clamp-1">
                        {item.promptText}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-0.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider bg-vault-yellow/40 text-vault-dark border border-vault-dark/15">
                    {item.category}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.authorAvatar}
                      alt={item.author}
                      className="w-5 h-5 rounded-full border border-vault-dark/20 object-cover"
                    />
                    <span className="font-semibold text-vault-dark">{item.author}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-right font-mono font-bold text-vault-green text-sm">
                  {item.clones.toLocaleString()}
                </td>

                <td className="py-3.5 px-4 text-right font-mono font-bold text-vault-dark/80">
                  {item.likes.toLocaleString()}
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => onCopyPrompt(item.id, item.promptText, item.title)}
                    className={`px-3 py-1 rounded-full font-sans text-xs font-semibold border transition-all cursor-pointer inline-flex items-center gap-1 ${
                      copiedLeaderboardId === item.id
                        ? 'bg-vault-green text-vault-dark border-vault-dark font-bold'
                        : 'bg-vault-cream hover:bg-vault-yellow/40 text-vault-dark border-vault-dark/20'
                    }`}
                  >
                    {copiedLeaderboardId === item.id ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
