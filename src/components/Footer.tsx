import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Twitter, Disc as Discord, Linkedin, ShieldCheck } from 'lucide-react';

export interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full bg-vault-dark text-vault-cream border-t-2 border-vault-dark overflow-hidden ${className}`}>
      {/* Main Footer Links Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-14 sm:py-18 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Col (~4 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link
              to="/"
              className="font-serif italic text-3xl sm:text-4xl text-vault-cream font-normal tracking-tight hover:text-vault-yellow transition-colors inline-block"
            >
              Prompt Vault
            </Link>

            <p className="font-sans text-sm text-vault-cream/75 max-w-sm leading-relaxed font-normal">
              The premier repository for high-impact AI prompts, web discovery bookmarks, and custom skill.md systems. Built for creators who refuse to lose inspiration.
            </p>
          </div>

          {/* Nav Column 1 - Product */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-vault-green">
              Product
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Prompt Search', href: '/#search' },
                { label: 'Skill.md Library', href: '/#skills' },
                { label: 'Chrome Extension', href: '/#extension' },
                { label: 'CLI & API Sync', href: '/#cli' },
                { label: 'Changelog', href: '/#changelog' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-sans text-sm text-vault-cream/70 hover:text-vault-yellow hover:translate-x-0.5 transition-all inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Column 2 - Resources */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-vault-green">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="/#how-it-works"
                  className="font-sans text-sm text-vault-cream/70 hover:text-vault-yellow hover:translate-x-0.5 transition-all inline-block"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/#guide"
                  className="font-sans text-sm text-vault-cream/70 hover:text-vault-yellow hover:translate-x-0.5 transition-all inline-block"
                >
                  Prompting Guide
                </a>
              </li>
              <li>
                <a
                  href="/#community"
                  className="font-sans text-sm text-vault-cream/70 hover:text-vault-yellow hover:translate-x-0.5 transition-all inline-block"
                >
                  Community Vaults
                </a>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="font-sans text-sm text-vault-cream/70 hover:text-vault-yellow hover:translate-x-0.5 transition-all inline-block"
                >
                  Security &amp; Privacy
                </Link>
              </li>
              <li>
                <a
                  href="/#faqs"
                  className="font-sans text-sm text-vault-cream/70 hover:text-vault-yellow hover:translate-x-0.5 transition-all inline-block"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Column 3 - Connect & Socials */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-vault-green">
              Connect
            </h3>
            <p className="font-sans text-xs text-vault-cream/65 leading-relaxed">
              Stay in the loop with weekly prompt drops, system updates, and creator showcases.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              {[
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Discord, href: 'https://discord.com', label: 'Discord' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-vault-cream/5 border border-vault-cream/10 flex items-center justify-center text-vault-cream/75 hover:text-vault-dark hover:bg-vault-green hover:border-vault-green transition-all duration-200 active:scale-95"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Giant Stylized Brand Watermark */}
      <div className="w-full border-t border-vault-cream/10 px-4 select-none pointer-events-none overflow-hidden">
        <div className="text-center font-serif uppercase tracking-tight text-vault-cream/[0.04] text-[15vw] leading-[0.85] py-2 font-normal whitespace-nowrap">
          PROMPT VAULT
        </div>
      </div>

      {/* Bottom Attribution Bar */}
      <div className="w-full border-t border-vault-cream/15 bg-[#00220B] px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-vault-cream/65">
          {/* Copyright */}
          <div>
            © {currentYear} Prompt Vault. All rights reserved.
          </div>

          {/* Portfolio Attribution requested by User */}
          <div className="flex items-center gap-1.5 text-vault-cream/80">
            <span>Designed & Developed by</span>
            <a
              href="https://harshrathod-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-vault-green hover:text-vault-yellow underline underline-offset-4 inline-flex items-center gap-1 group transition-colors"
            >
              <span>Harsh Rathod</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-5 text-vault-cream/60">
            <Link to="/privacy" className="hover:text-vault-cream hover:underline transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-vault-cream hover:underline transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
