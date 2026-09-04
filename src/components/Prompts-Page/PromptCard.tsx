import { useState } from 'react';
import { Copy, Check, Star } from 'lucide-react';
import { PromptItem } from './promptsData';
import { copyToClipboard } from '../../utils/clipboard';

export interface PromptCardProps {
  prompt: PromptItem;
  isLocked?: boolean;
  className?: string;
}

export default function PromptCard({ prompt, isLocked = false, className = '' }: PromptCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(prompt.promptSnippet);
    if (success) {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <article
      className={`bg-vault-cream border-2 border-vault-dark rounded-[22px] sm:rounded-[28px] p-5 sm:p-6 lg:p-7 justify-between space-y-4 sm:space-y-5 shadow-sm relative overflow-hidden ${
        isLocked
          ? `flex-col ${className || 'flex'}`
          : `flex flex-col hover:bg-vault-yellow/10 transition-colors group ${className}`
      }`}
    >
      {/* Top Row: Large Editorial Index Number & Model Badge */}
      <div className="space-y-3 sm:space-y-3.5">
        <div className="flex items-center justify-between gap-2 border-b border-vault-dark/15 pb-2.5 sm:pb-3">
          <span className="font-serif italic text-3xl sm:text-4xl text-vault-green font-normal leading-none select-none">
            {prompt.indexNumber}
          </span>

          <span
            className={`text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border-2 ${prompt.modelBadgeStyle}`}
          >
            {prompt.model}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1 sm:space-y-1.5">
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-vault-dark/60 block">
            {prompt.category}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-vault-dark font-normal leading-tight tracking-tight">
            {prompt.title}
          </h3>
          <p className="font-sans text-xs sm:text-[13px] text-vault-dark/80 leading-relaxed">
            {prompt.description}
          </p>
        </div>

        {/* Code Box with Dedicated Terminal Header Bar & Non-Overlapping Copy Action */}
        <div className="bg-vault-dark text-vault-cream rounded-2xl border-2 border-vault-dark overflow-hidden flex flex-col shadow-inner">
          {/* Terminal Header Toolbar */}
          <div className="flex items-center justify-between px-3 py-1.5 sm:py-2 bg-vault-darker/90 border-b border-vault-cream/15 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF5F56]/80" />
              <span className="w-2 h-2 rounded-full bg-[#FFBD2E]/80" />
              <span className="w-2 h-2 rounded-full bg-[#27C93F]/80" />
              <span className="text-[10px] font-mono text-vault-cream/60 font-semibold tracking-wider uppercase ml-1">
                prompt.md
              </span>
            </div>

            {/* Copy Action (Visible Card) or Locked Pill (Blurred Card) */}
            {isLocked ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-vault-cream/10 text-vault-cream/60 border border-vault-cream/20">
                Locked
              </span>
            ) : (
              <button
                type="button"
                onClick={handleCopy}
                className={`px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isCopied
                    ? 'bg-vault-green text-vault-dark border-vault-dark shadow-xs scale-105'
                    : 'bg-vault-cream/15 text-vault-cream border-vault-cream/30 hover:bg-vault-cream hover:text-vault-dark hover:border-vault-dark active:scale-95'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 stroke-[2.2]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Code Text Content */}
          <div className="p-3 sm:p-4">
            <pre
              className={`whitespace-pre-wrap font-mono text-[11px] sm:text-xs text-vault-cream/90 font-normal leading-relaxed ${
                isLocked
                  ? 'max-h-36 overflow-hidden'
                  : 'max-h-36 sm:max-h-40 overflow-y-auto pr-2 select-all'
              }`}
            >
              {prompt.promptSnippet}
            </pre>
          </div>
        </div>

        {/* Parameter Variables Chips */}
        {prompt.variables.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5 sm:pt-1">
            <span className="text-[10px] font-sans uppercase font-bold text-vault-dark/60">
              Variables:
            </span>
            {prompt.variables.map((v, vIdx) => (
              <span
                key={vIdx}
                className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-vault-yellow border border-vault-dark/30 text-vault-dark"
              >
                {v}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer Meta */}
      <div className="pt-3 border-t border-vault-dark/15 flex items-center justify-between text-xs font-sans text-vault-dark/75">
        <div className="flex items-center gap-2">
          <img
            src={prompt.authorAvatar}
            alt={prompt.author}
            className="w-5 h-5 rounded-full ring-1 ring-vault-dark object-cover"
          />
          <span className="font-semibold text-vault-dark text-[11px] sm:text-xs">{prompt.author}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-vault-dark/60 text-[11px] sm:text-xs">{prompt.tokens}</span>
          <span className="flex items-center gap-0.5 font-bold text-vault-dark text-[11px] sm:text-xs">
            <Star className="w-3 h-3 text-vault-dark fill-vault-yellow" />
            <span>{prompt.rating}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
