import { Link } from 'react-router-dom';
import { Lock, ArrowUpRight } from 'lucide-react';
import PromptCard from './PromptCard';
import { BLURRED_PROMPTS } from './promptsData';
import styles from './Prompts.module.css';

export default function PromptsCurveLock() {
  return (
    <section className={styles.curveSection}>
      {/* Blurred Cards Grid (1 card on mobile, 2 on tablet, 3 on desktop) */}
      <div className={styles.blurredGrid}>
        {BLURRED_PROMPTS.map((prompt, pIdx) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            isLocked
            className={
              pIdx === 0
                ? styles.cardShowMobile
                : pIdx === 1
                ? styles.cardShowMd
                : styles.cardShowLg
            }
          />
        ))}
      </div>

      {/* Frosted Glassmorphic Fade Overlay directly covering the blurred cards */}
      <div className={styles.blurredFadeOverlay} />

      {/* Downward Curve SVG Line & Centered Expanding Button DIRECTLY ON TOP of the Blurred Cards */}
      <div className={styles.curveOverlay}>
        {/* SVG Curve Container with Glowing Dual-Sided Energy Beams */}
        <div className={styles.curveSvgWrap}>
          <svg
            viewBox="0 0 1440 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className={styles.curveSvg}
          >
            <defs>
              {/* Neon Glow Filters */}
              <filter id="neonBeamGlow" x="-20%" y="-30%" width="140%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="ambientRailGlow" x="-20%" y="-30%" width="140%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Left Energy Beam Gradient (Fades from green to bright yellow core) */}
              <linearGradient id="beamLeftGradient" x1="0" y1="0" x2="720" y2="112.5" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1ECC62" stopOpacity="0.05" />
                <stop offset="40%" stopColor="#1ECC62" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#F1F78C" stopOpacity="1" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
              </linearGradient>

              {/* Right Energy Beam Gradient (Fades from green to bright yellow core) */}
              <linearGradient id="beamRightGradient" x1="1440" y1="0" x2="720" y2="112.5" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1ECC62" stopOpacity="0.05" />
                <stop offset="40%" stopColor="#1ECC62" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#F1F78C" stopOpacity="1" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
              </linearGradient>

              {/* Base Track Ambient Gradient */}
              <linearGradient id="railBaseGradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#002D0F" stopOpacity="0.2" />
                <stop offset="20%" stopColor="#1ECC62" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#1ECC62" stopOpacity="0.75" />
                <stop offset="80%" stopColor="#1ECC62" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#002D0F" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* 1. Underlying Dark Rail */}
            <path
              d="M -20 15 C 440 145, 1000 145, 1460 15"
              stroke="#002D0F"
              strokeWidth="2.5"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />

            {/* 2. Soft Ambient Neon Rail Glow */}
            <path
              d="M -20 15 C 440 145, 1000 145, 1460 15"
              stroke="url(#railBaseGradient)"
              strokeWidth="1.75"
              filter="url(#ambientRailGlow)"
              strokeLinecap="round"
            />

            {/* 3. Left Radiant Energy Beam (Flows from Left edge into Center) */}
            <path
              d="M -20 15 C 210 80, 465 112.5, 720 112.5"
              stroke="url(#beamLeftGradient)"
              strokeWidth="3.5"
              strokeDasharray="160 620"
              className={styles.animateBeamFlow}
              filter="url(#neonBeamGlow)"
              strokeLinecap="round"
            />

            {/* 4. Right Radiant Energy Beam (Flows from Right edge into Center) */}
            <path
              d="M 1460 15 C 1230 80, 975 112.5, 720 112.5"
              stroke="url(#beamRightGradient)"
              strokeWidth="3.5"
              strokeDasharray="160 620"
              className={styles.animateBeamFlow}
              filter="url(#neonBeamGlow)"
              strokeLinecap="round"
            />
          </svg>

          {/* Powered Lock Button (Reactor Core Aura & Electric Convergence) */}
          <div className={styles.buttonAnchor}>
            {/* Electric Reactor Core Glow Behind Button */}
            <div className={`${styles.reactorAura} ${styles.animatePowerReactor}`} />

            {/* Concentric Energy Pulse Wave */}
            <div className={`${styles.pulseRing} ${styles.pulseRingAnim}`} />

            <Link
              id="prompts-curve-unlock-btn"
              to="/signup"
              className={styles.expandingBtn}
            >
              {/* Front Green Pill with Charging Lock Badge */}
              <span className={styles.btnFront}>
                {/* Glowing Lock Indicator */}
                <div className={styles.lockIconWrap}>
                  <span className={`${styles.lockIconPing} ${styles.pulseRingAnim}`} />
                  <div className={styles.lockIconCircle}>
                    <Lock className={styles.lockIconSvg} />
                  </div>
                </div>

                <span>Unlock 2,400+ Prompts</span>
              </span>

              {/* Back Dark Green Capsule */}
              <span className={styles.btnBack}>
                <ArrowUpRight className={styles.btnBackIcon} />
              </span>
            </Link>
          </div>
        </div>

        {/* Subtle Sign In Link Below Curve */}
        <div className={styles.signInRow}>
          <Link
            to="/signin"
            className={styles.signInLink}
          >
            Already a member? Sign in to your vault ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
