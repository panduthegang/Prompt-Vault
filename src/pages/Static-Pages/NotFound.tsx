import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-[#FAFBEA] text-vault-dark font-sans flex flex-col justify-between overflow-x-hidden selection:bg-vault-green selection:text-vault-dark">
      {/* Full Background Artwork Image Layer - Responsive (Mobile vs Desktop) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Mobile Background Artwork */}
        <div
          className="block sm:hidden w-full h-full bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: `url('https://prompt-vault-by-harsh.vercel.app/404-mobile.png')` }}
        />
        {/* Tablet & Desktop Background Artwork */}
        <div
          className="hidden sm:block w-full h-full bg-cover bg-bottom sm:bg-center md:bg-bottom bg-no-repeat"
          style={{ backgroundImage: `url('https://prompt-vault-by-harsh.vercel.app/404.png')` }}
        />
      </div>

      {/* Top Header Navigation */}
      <header className="relative w-full px-6 sm:px-10 lg:px-14 py-4 sm:py-6 flex items-center justify-between z-20">
        <Link
          to="/"
          className="font-serif italic text-2xl sm:text-3xl text-vault-dark font-normal tracking-tight hover:opacity-90 transition-opacity"
        >
          Prompt Vault
        </Link>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-vault-dark bg-white/70 backdrop-blur-xs text-vault-dark font-sans text-xs sm:text-sm font-semibold hover:bg-vault-dark hover:text-vault-cream transition-all duration-200 cursor-pointer active:scale-95 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
      </header>

      {/* Minimal Top Headline Area — Positioned Higher to Let Artwork Shine */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start text-center px-5 sm:px-10 pt-2 sm:pt-4 md:pt-6 lg:pt-8 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3.5 sm:space-y-4"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vault-yellow border-2 border-vault-dark text-vault-dark text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-vault-green border border-vault-dark animate-pulse" />
            <span>Error 404 • Missing Entry</span>
          </div>

          {/* Impactful Editorial Headline — Scaled Up for Mobile */}
          <h1 className="font-serif text-[42px] leading-[0.92] sm:text-6xl md:text-7xl lg:text-8xl text-vault-dark font-normal tracking-tight uppercase select-none">
            PROMPT LOST <br />
            <span className="italic">IN THE VAULT</span>
          </h1>
        </motion.div>
      </main>

      {/* Minimal Footer Signature */}
      <footer className="relative z-20 w-full py-4 text-center text-xs text-vault-dark/40 font-sans pointer-events-none">
        Prompt Vault • Secure AI Knowledge Base
      </footer>
    </div>
  );
}
