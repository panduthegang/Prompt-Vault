import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = '' }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState<number>(65);

  const topBarRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const navLinks = [
    { label: 'Prompts', href: '/prompts', isRoute: true },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Why Prompt Vault', href: '/#comparison' },
    { label: 'FAQs', href: '/#faqs' },
  ];

  // Measure exact top bar height so the placeholder preserves perfect layout geometry
  useEffect(() => {
    const measureHeight = () => {
      if (topBarRef.current) {
        setNavHeight(topBarRef.current.offsetHeight);
      }
    };

    measureHeight();
    window.addEventListener('resize', measureHeight);
    return () => window.removeEventListener('resize', measureHeight);
  }, []);

  // Smart reveal-on-scroll-up listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = Math.max(0, window.scrollY);
          const deltaY = currentY - lastScrollY.current;
          const scrollDeltaThreshold = 8; // Micro-scroll noise threshold
          const topThreshold = 20;

          if (currentY <= topThreshold) {
            // At or very close to top of page: always visible, resting state
            setIsVisible(true);
            setIsScrolled(false);
          } else if (deltaY > scrollDeltaThreshold) {
            // Scrolling down past threshold: hide navbar
            setIsVisible(false);
            setIsScrolled(true);
            if (isMobileMenuOpen) {
              setIsMobileMenuOpen(false);
            }
          } else if (deltaY < -scrollDeltaThreshold) {
            // Scrolling up past threshold: reveal navbar
            setIsVisible(true);
            setIsScrolled(true);
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  // Client-side smooth navigation handler for anchor links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');

      if (location.pathname === '/') {
        // Already on landing page: smooth scroll directly without reload
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      } else {
        // On another route (e.g. /prompts): SPA client navigation to landing page with hash
        navigate(`/${href.replace('/', '')}`);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      {/* In-flow spacer placeholder to preserve layout and exact first-viewport height */}
      <div style={{ height: navHeight }} className="w-full shrink-0" aria-hidden="true" />

      {/* Floating Smart Reveal Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-vault-cream border-b-2 border-vault-dark transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
        } ${isScrolled ? 'shadow-[0_4px_24px_rgba(0,45,15,0.08)] bg-vault-cream/95 backdrop-blur-md' : ''} ${className}`}
      >
        <div ref={topBarRef} className="w-full px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 py-3 sm:py-3.5 lg:py-4 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            id="brand-logo"
            to="/"
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif italic text-2xl sm:text-3xl text-vault-dark font-normal tracking-tight hover:opacity-90 transition-opacity"
          >
            Prompt Vault
          </Link>

          {/* Center Nav Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-10" aria-label="Main Navigation">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  to={link.href}
                  className="font-sans text-sm lg:text-[15px] font-medium text-vault-dark hover:opacity-75 transition-opacity"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-sans text-sm lg:text-[15px] font-medium text-vault-dark hover:opacity-75 transition-opacity"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Right CTA Button - Desktop */}
          <div className="hidden md:flex items-center">
            <Link
              id="nav-cta-btn"
              to="/signin"
              className="group relative inline-flex items-stretch cursor-pointer select-none active:scale-[0.97] transition-transform duration-200"
            >
              <span className="relative z-10 inline-flex items-center justify-center bg-vault-green text-vault-dark border border-vault-dark rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-sans font-semibold text-xs sm:text-sm tracking-tight shadow-xs group-hover:brightness-[1.03] transition-all duration-300">
                Get Started
              </span>
              <span className="relative -ml-4 z-0 inline-flex items-center justify-center bg-vault-darker text-vault-green border border-vault-dark rounded-r-full pl-5 pr-3 max-w-0 opacity-0 -translate-x-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[54px] group-hover:opacity-100 group-hover:translate-x-0 overflow-hidden">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105" />
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-vault-dark hover:bg-vault-yellow/60 transition-colors focus:outline-none cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-vault-cream border-t border-vault-dark/20 px-6 pt-3 pb-6 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-sans text-base font-medium text-vault-dark px-2 py-1.5 rounded-lg hover:bg-vault-yellow/40 transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-sans text-base font-medium text-vault-dark px-2 py-1.5 rounded-lg hover:bg-vault-yellow/40 transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>
            <div className="pt-2">
              <Link
                to="/signin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group w-full inline-flex items-center justify-between rounded-full bg-vault-darker p-[2px] border border-vault-dark/40 transition-all duration-300 active:scale-[0.98]"
              >
                <span className="flex-1 text-center inline-flex items-center justify-center rounded-full border border-vault-dark bg-vault-green py-2.5 text-sm font-sans font-semibold text-vault-dark">
                  Get Started
                </span>
                <span className="flex items-center justify-center px-3 text-vault-green transition-all duration-300 group-hover:translate-x-1">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
