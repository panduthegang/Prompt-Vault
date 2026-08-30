import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const PHRASES = [
  'SAVE WHAT INSPIRES YOU',
  'CURATING HIGH-IMPACT PROMPTS',
  'UNDERRATED TOOLS & WORKFLOWS',
  'PROMPT VAULT',
];

export default function LoadingScreen({ onComplete, duration = 1800 }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setCount(progress);

      // Phrase sequence progression
      if (progress < 30) setPhraseIndex(0);
      else if (progress < 60) setPhraseIndex(1);
      else if (progress < 88) setPhraseIndex(2);
      else setPhraseIndex(3);

      if (elapsed >= duration) {
        clearInterval(interval);
        setCount(100);
        setTimeout(() => {
          setIsFinished(true);
          onComplete?.();
        }, 180);
      }
    }, 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        clearInterval(interval);
        setCount(100);
        setIsFinished(true);
        onComplete?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="editorial-loader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          className="fixed inset-0 z-[99999] bg-vault-cream text-vault-dark flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 select-none overflow-hidden border-b-4 border-vault-dark"
        >
          {/* Top Editorial Header */}
          <div className="w-full flex items-center justify-between text-xs sm:text-sm font-sans font-semibold tracking-tight border-b-2 border-vault-dark pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-vault-green border border-vault-dark" />
              <span className="font-serif italic text-lg sm:text-xl text-vault-dark">
                Prompt Vault
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-6 text-xs text-vault-dark/70 font-mono uppercase tracking-widest">
              <span>EDITION 2026</span>
              <span>•</span>
              <span>DESIGNED BY HARSH RATHOD</span>
            </div>

            <div className="font-mono text-xs font-bold text-vault-dark bg-vault-yellow px-3 py-1 rounded-full border border-vault-dark shadow-xs">
              {count.toString().padStart(3, '0')} / 100
            </div>
          </div>

          {/* Center Stage: Massive Editorial Typography & Wordmark */}
          <div className="my-auto py-8 sm:py-12 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
            <motion.div
              key={phraseIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 sm:space-y-3"
            >
              <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-vault-dark/60 block">
                {phraseIndex < 3 ? 'INDEXING REPOSITORY' : 'WELCOME'}
              </span>

              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-vault-dark uppercase leading-[0.9] font-normal">
                {phraseIndex === 3 ? (
                  <>
                    <span className="block">PROMPT</span>
                    <span className="block italic text-vault-green drop-shadow-xs">VAULT.</span>
                  </>
                ) : (
                  <span>{PHRASES[phraseIndex]}</span>
                )}
              </h1>
            </motion.div>
          </div>

          {/* Bottom Bar: Minimalist Hairline Progress & Registration Marks */}
          <div className="w-full space-y-4 border-t-2 border-vault-dark pt-4">
            <div className="flex items-center justify-between text-xs font-sans text-vault-dark/80">
              <span className="font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
                A Unified Home for AI Prompts &amp; Underrated Web Discoveries
              </span>
              <span className="font-mono text-xs font-bold">
                {count}%
              </span>
            </div>

            {/* Precision 2px Neo-Brutalist Meter */}
            <div className="w-full h-2 bg-vault-dark/10 border-2 border-vault-dark rounded-full overflow-hidden p-[1px]">
              <motion.div
                className="h-full bg-vault-dark rounded-full"
                style={{ width: `${count}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-vault-dark/50">
              <span>[ 001 ] REPOSITORY</span>
              <span className="hidden sm:inline-block">PRESS ESC TO SKIP</span>
              <span>[ 004 ] ACCESS</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
