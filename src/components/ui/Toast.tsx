import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  Sparkles,
  Pause,
} from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id?: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

const TOAST_CONFIG = {
  success: {
    icon: CheckCircle2,
    badge: 'Success',
    borderColor: 'border-vault-green',
    iconColor: 'text-vault-green',
    bgBadge: 'bg-vault-green/20 text-vault-green border-vault-green/40',
    progressColor: 'bg-vault-green',
    glowColor: 'shadow-[0_8px_30px_rgba(155,240,11,0.22)]',
    pulseColor: 'bg-vault-green',
  },
  error: {
    icon: AlertCircle,
    badge: 'Error',
    borderColor: 'border-red-500',
    iconColor: 'text-red-400',
    bgBadge: 'bg-red-500/20 text-red-300 border-red-500/40',
    progressColor: 'bg-red-500',
    glowColor: 'shadow-[0_8px_30px_rgba(239,68,68,0.22)]',
    pulseColor: 'bg-red-500',
  },
  warning: {
    icon: AlertTriangle,
    badge: 'Warning',
    borderColor: 'border-vault-yellow',
    iconColor: 'text-vault-yellow',
    bgBadge: 'bg-vault-yellow/20 text-vault-yellow border-vault-yellow/40',
    progressColor: 'bg-vault-yellow',
    glowColor: 'shadow-[0_8px_30px_rgba(228,233,137,0.22)]',
    pulseColor: 'bg-vault-yellow',
  },
  info: {
    icon: Info,
    badge: 'Info',
    borderColor: 'border-vault-cream/40',
    iconColor: 'text-vault-cream',
    bgBadge: 'bg-vault-cream/15 text-vault-cream border-vault-cream/30',
    progressColor: 'bg-vault-cream',
    glowColor: 'shadow-[0_8px_30px_rgba(247,244,233,0.12)]',
    pulseColor: 'bg-vault-cream',
  },
};

export default function Toast({
  type = 'info',
  title,
  message,
  duration = 3500,
  onClose,
  actionLabel,
  onAction,
}: ToastProps) {
  const config = TOAST_CONFIG[type];
  const IconComponent = config.icon;

  const [isPaused, setIsPaused] = useState(false);
  const remainingTimeRef = useRef(duration);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (duration <= 0) return;

    if (!isPaused) {
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        onClose();
      }, remainingTimeRef.current);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(500, remainingTimeRef.current - elapsed);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPaused, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96, transition: { duration: 0.12 } }}
      transition={{ type: 'spring', damping: 28, stiffness: 380 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative w-full max-w-sm sm:max-w-md bg-vault-dark text-vault-cream border-2 ${config.borderColor} rounded-[22px] p-3.5 sm:p-4 ${config.glowColor} overflow-hidden pointer-events-auto select-none shadow-2xl transition-all duration-200 ${
        isPaused ? 'scale-[1.015] ring-2 ring-vault-cream/30' : ''
      }`}
    >
      <div className="flex items-start gap-3 pt-0.5 pb-1">
        {/* Status Icon with Glowing Badge Background */}
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center shrink-0 ${config.bgBadge}`}
        >
          <IconComponent className={`w-5 h-5 ${config.iconColor} stroke-[2.3]`} />
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.2 rounded-full border ${config.bgBadge}`}
            >
              {title || config.badge}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${config.pulseColor} animate-pulse`} />
            {isPaused && (
              <span className="text-[10px] font-mono text-vault-cream/50 bg-white/5 px-1.5 py-0.2 rounded flex items-center gap-1">
                <Pause className="w-2.5 h-2.5" /> Paused
              </span>
            )}
          </div>

          <p className="font-sans text-xs sm:text-sm text-vault-cream/90 font-medium leading-snug pt-1">
            {message}
          </p>

          {actionLabel && onAction && (
            <button
              type="button"
              onClick={onAction}
              className="mt-2 text-xs font-sans font-bold underline hover:opacity-80 text-vault-cream cursor-pointer"
            >
              {actionLabel}
            </button>
          )}
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-lg bg-vault-cream/10 hover:bg-vault-cream/20 text-vault-cream/70 hover:text-vault-cream flex items-center justify-center transition-colors cursor-pointer shrink-0 -mr-1"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

      {/* Bottom Animated Progress Bar with Pause on Hover */}
      {duration > 0 && (
        <>
          <style>{`
            @keyframes toastProgressCountdown {
              from { transform: scaleX(1); }
              to { transform: scaleX(0); }
            }
          `}</style>
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 origin-left ${config.progressColor}`}
            style={{
              animation: `toastProgressCountdown ${duration}ms linear forwards`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          />
        </>
      )}
    </motion.div>
  );
}

/**
 * ToastContainer: Wrapper to render toasts at upper center position with Framer Motion AnimatePresence
 */
export function ToastContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none w-full max-w-sm sm:max-w-md px-4 flex justify-center items-start">
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </div>
  );
}
