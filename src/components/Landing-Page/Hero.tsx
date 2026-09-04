import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import styles from './Landing.module.css';
import { HERO_DATA } from './landingData';

export interface HeroProps {
  className?: string;
}

export default function Hero({ className = '' }: HeroProps) {
  return (
    <section className={`${styles.heroSection} ${className}`}>
      <div className={styles.heroGrid}>
        {/* Left Column: Solid Yellow Panel with Right Border */}
        <div className={styles.heroLeft}>
          {/* Top Rating & Avatar Group */}
          <div className={styles.heroRatingGroup}>
            <div className={styles.heroAvatars}>
              {HERO_DATA.reviewers.map((reviewer) => (
                <img
                  key={reviewer.id}
                  className={styles.heroAvatarImg}
                  src={reviewer.avatarUrl}
                  alt={reviewer.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div className={styles.heroRatingMeta}>
              <div className={styles.heroStars} aria-hidden="true">
                {HERO_DATA.rating}
              </div>
              <span className={styles.heroRatingLabel}>
                {HERO_DATA.ratingText}
              </span>
            </div>
          </div>

          {/* Center Headline & Subtitle */}
          <div className={styles.heroCenter}>
            <h1 className={styles.heroHeadline}>
              <span className={styles.heroHeadlineSpan}>{HERO_DATA.headline.line1}</span>
              <span className={styles.heroHeadlineSpan}>{HERO_DATA.headline.line2}</span>
              <span className={styles.heroHeadlineItalic}>{HERO_DATA.headline.italicLine}</span>
            </h1>

            <p className={styles.heroSubtitle}>
              {HERO_DATA.subtitle}
            </p>
          </div>

          {/* Bottom Action CTAs */}
          <div className={styles.heroActions}>
            {/* Two-tone Green & Darker Green Expanding Pill Button */}
            <Link
              id="hero-primary-cta"
              to="/signin"
              className={styles.expandingBtn}
            >
              <span className={styles.btnFront}>
                {HERO_DATA.primaryCtaText}
              </span>
              <span className={styles.btnBack}>
                <ArrowUpRight className={styles.btnBackIcon} />
              </span>
            </Link>

            {/* Outlined Pill Button */}
            <a
              id="hero-secondary-cta"
              href="#how-it-works"
              className={styles.outlineBtn}
            >
              <span>{HERO_DATA.secondaryCtaText}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Visual Photo Panel */}
        <div className={styles.heroRight}>
          <img
            src={HERO_DATA.visualImage}
            alt="Prompt Vault Hero Visual"
            className={styles.heroImg}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
