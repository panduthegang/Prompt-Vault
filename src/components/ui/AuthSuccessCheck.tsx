import React from 'react';
import { motion } from 'framer-motion';

interface AuthSuccessCheckProps {
  title: string;
  subtitle: string;
  badgeLabel?: string;
  redirectDuration?: number; // duration in ms for redirect progress bar
}

export const AuthSuccessCheck: React.FC<AuthSuccessCheckProps> = ({
  title,
  subtitle,
  badgeLabel = 'AUTHENTICATED',
  redirectDuration = 1200,
}) => {
  // 6 celebratory geometric micro-particles placed radially around the center badge
  const particles = [
    { x: 0, y: -44, rotate: 0, delay: 0.22, size: 'w-2 h-2', bg: 'bg-vault-green' },
    { x: 40, y: -24, rotate: 25, delay: 0.25, size: 'w-1.5 h-1.5', bg: 'bg-vault-dark' },
    { x: 40, y: 24, rotate: 45, delay: 0.28, size: 'w-2 h-2', bg: 'bg-vault-yellow' },
    { x: 0, y: 44, rotate: 15, delay: 0.23, size: 'w-1.5 h-1.5', bg: 'bg-vault-green' },
    { x: -40, y: 24, rotate: 30, delay: 0.26, size: 'w-2 h-2', bg: 'bg-vault-dark' },
    { x: -40, y: -24, rotate: -20, delay: 0.29, size: 'w-1.5 h-1.5', bg: 'bg-vault-yellow' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="py-7 px-5 sm:px-8 flex flex-col items-center text-center space-y-4 bg-vault-yellow/35 border-2 border-vault-dark rounded-2xl shadow-[4px_4px_0px_#002D0F] relative overflow-hidden my-auto"
    >
      {/* Background subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(30, 204, 98, 0.14) 0%, rgba(241, 247, 140, 0.05) 50%, transparent 70%)',
        }}
      />

      {/* Top Status Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-vault-dark text-vault-cream border border-vault-dark text-[10px] font-sans font-bold tracking-widest uppercase select-none relative z-10"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-vault-green animate-pulse" />
        <span>{badgeLabel}</span>
      </motion.div>

      {/* Center Animated Tick Container */}
      <div className="relative flex items-center justify-center my-1">
        {/* Shockwave expanding ring 1 (Vault Green) */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0.85 }}
          animate={{ scale: 1.65, opacity: 0 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.18,
          }}
          className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-vault-green pointer-events-none"
        />

        {/* Shockwave expanding ring 2 (Subtle Dark) */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 1.95, opacity: 0 }}
          transition={{
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.25,
          }}
          className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-vault-dark/30 pointer-events-none"
        />

        {/* Geometric Celebratory Burst Sparks */}
        {particles.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              x: p.x,
              y: p.y,
              scale: [0, 1.25, 0],
              opacity: [0, 1, 0],
              rotate: p.rotate * 2,
            }}
            transition={{
              duration: 0.65,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`absolute ${p.size} ${p.bg} border border-vault-dark rounded-xs pointer-events-none`}
          />
        ))}

        {/* Main circular tick badge with tactile spring entrance */}
        <motion.div
          initial={{ scale: 0, rotate: -25 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 320,
            damping: 18,
            delay: 0.08,
          }}
          className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-vault-green text-vault-dark border-2 border-vault-dark shadow-[3px_3px_0px_#002D0F] flex items-center justify-center overflow-hidden"
        >
          {/* Subtle sheen highlight sweep */}
          <motion.div
            initial={{ x: '-100%', opacity: 0.35 }}
            animate={{ x: '200%', opacity: 0 }}
            transition={{ duration: 0.75, delay: 0.32, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent -skew-x-12 pointer-events-none"
          />

          {/* SVG Animated Right Tick Checkmark */}
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-vault-dark"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft background ghost trace for visual weight */}
            <path
              d="M8 16.5L13.5 22L24 10.5"
              stroke="#002D0F"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.15"
            />
            {/* The animated drawing stroke */}
            <motion.path
              d="M8 16.5L13.5 22L24 10.5"
              stroke="#002D0F"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  duration: 0.42,
                  delay: 0.22,
                  ease: [0.65, 0, 0.35, 1],
                },
                opacity: { duration: 0.08, delay: 0.21 },
              }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Texts with staggered entrance */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.35 }}
        className="space-y-1 relative z-10"
      >
        <h3 className="font-serif text-2xl sm:text-3xl text-vault-dark font-normal tracking-tight">
          {title}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-vault-dark/80 max-w-xs mx-auto leading-relaxed">
          {subtitle}
        </p>
      </motion.div>

      {/* Bottom Progress Bar & Redirect Cue */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38, duration: 0.3 }}
        className="w-full max-w-[210px] pt-1 relative z-10"
      >
        <div className="w-full h-1.5 bg-vault-dark/10 rounded-full overflow-hidden border border-vault-dark/20 p-px">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: redirectDuration / 1000,
              ease: 'easeInOut',
            }}
            className="h-full bg-vault-dark rounded-full"
          />
        </div>
        <div className="flex items-center justify-between text-[10px] font-sans text-vault-dark/60 font-medium mt-1.5 px-0.5">
          <span>Authorizing</span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-vault-green animate-ping" />
            <span>Redirecting</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default AuthSuccessCheck;
