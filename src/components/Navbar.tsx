import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = '' }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Browse Prompts', href: '#browse' },
    { label: 'Skill Library', href: '#skills' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <header className={`w-full bg-vault-cream border-b-2 border-vault-dark shrink-0 ${className}`}>
      <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 py-3 sm:py-3.5 lg:py-4 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a
          id="brand-logo"
          href="#"
          className="font-serif italic text-2xl sm:text-3xl text-vault-dark font-normal tracking-tight hover:opacity-90 transition-opacity"
        >
          Prompt Vault
        </a>

        {/* Center Nav Links - Desktop */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-10" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              href={link.href}
              className="font-sans text-sm lg:text-[15px] font-medium text-vault-dark hover:opacity-75 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button - Desktop */}
        <div className="hidden md:flex items-center">
          <a
            id="nav-cta-btn"
            href="#get-started"
            className="group relative inline-flex items-stretch cursor-pointer select-none active:scale-[0.97] transition-transform duration-200"
          >
            <span className="relative z-10 inline-flex items-center justify-center bg-vault-green text-vault-dark border border-vault-dark rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-sans font-semibold text-xs sm:text-sm tracking-tight shadow-xs group-hover:brightness-[1.03] transition-all duration-300">
              Get Started
            </span>
            <span className="relative -ml-4 z-0 inline-flex items-center justify-center bg-vault-darker text-vault-green border border-vault-dark rounded-r-full pl-5 pr-3 max-w-0 opacity-0 -translate-x-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[54px] group-hover:opacity-100 group-hover:translate-x-0 overflow-hidden">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105" />
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-vault-dark hover:bg-vault-yellow/60 transition-colors focus:outline-none"
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
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-sans text-base font-medium text-vault-dark px-2 py-1.5 rounded-lg hover:bg-vault-yellow/40 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <a
              href="#get-started"
              onClick={() => setIsMobileMenuOpen(false)}
              className="group w-full inline-flex items-center justify-between rounded-full bg-vault-darker p-[2px] border border-vault-dark/40 transition-all duration-300 active:scale-[0.98]"
            >
              <span className="flex-1 text-center inline-flex items-center justify-center rounded-full border border-vault-dark bg-vault-green py-2.5 text-sm font-sans font-semibold text-vault-dark">
                Get Started
              </span>
              <span className="flex items-center justify-center px-3 text-vault-green transition-all duration-300 group-hover:translate-x-1">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
