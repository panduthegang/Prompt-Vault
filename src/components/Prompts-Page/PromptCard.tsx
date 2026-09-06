import { useState } from 'react';
import { Copy, Check, Star } from 'lucide-react';
import { PromptItem } from './promptsData';
import { copyToClipboard } from '../../utils/clipboard';
import styles from './Prompts.module.css';

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
      className={`${styles.cardArticle} ${
        isLocked ? styles.cardLocked : styles.cardInteractive
      } ${className}`}
    >
      {/* Top Row: Large Editorial Index Number & Model Badge */}
      <div className={styles.cardTopContent}>
        <div className={styles.cardHeader}>
          <span className={styles.cardIndexNum}>
            {prompt.indexNumber}
          </span>

          <span className={`${styles.cardModelBadge} ${prompt.modelBadgeStyle}`}>
            {prompt.model}
          </span>
        </div>

        {/* Title & Description */}
        <div className={styles.cardMeta}>
          <span className={styles.cardCategory}>
            {prompt.category}
          </span>
          <h3 className={styles.cardTitle}>
            {prompt.title}
          </h3>
          <p className={styles.cardDescription}>
            {prompt.description}
          </p>
        </div>

        {/* Code Box with Dedicated Terminal Header Bar & Non-Overlapping Copy Action */}
        <div className={styles.terminalBox}>
          {/* Terminal Header Toolbar */}
          <div className={styles.terminalToolbar}>
            <div className={styles.terminalDots}>
              <span className={styles.terminalDotRed} />
              <span className={styles.terminalDotYellow} />
              <span className={styles.terminalDotGreen} />
              <span className={styles.terminalLabel}>
                prompt.md
              </span>
            </div>

            {/* Copy Action (Visible Card) or Locked Pill (Blurred Card) */}
            {isLocked ? (
              <span className={styles.terminalLockedPill}>
                Locked
              </span>
            ) : (
              <button
                type="button"
                onClick={handleCopy}
                className={isCopied ? styles.terminalCopiedBtn : styles.terminalCopyBtn}
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
          <div className={styles.terminalCodeWrap}>
            <pre
              className={isLocked ? styles.terminalPreLocked : styles.terminalPre}
            >
              {prompt.promptSnippet}
            </pre>
          </div>
        </div>

        {/* Parameter Variables Chips */}
        {prompt.variables.length > 0 && (
          <div className={styles.variablesWrap}>
            <span className={styles.variablesLabel}>
              Variables:
            </span>
            {prompt.variables.map((v, vIdx) => (
              <span key={vIdx} className={styles.variableChip}>
                {v}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer Meta */}
      <div className={styles.cardFooter}>
        <div className={styles.cardAuthorWrap}>
          <img
            src={prompt.authorAvatar}
            alt={prompt.author}
            className={styles.cardAuthorAvatar}
          />
          <span className={styles.cardAuthorName}>{prompt.author}</span>
        </div>

        <div className={styles.cardMetaRight}>
          <span className={styles.cardTokens}>{prompt.tokens}</span>
          <span className={styles.cardRating}>
            <Star className={styles.starIcon} />
            <span>{prompt.rating}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
