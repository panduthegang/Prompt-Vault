import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function TermsCTA() {
  return (
    <section className="w-full bg-vault-yellow border-t-2 border-vault-dark px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <span className="font-sans text-xs font-bold uppercase tracking-widest text-vault-dark/70 block">
          Prompt Vault Community
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-vault-dark font-normal uppercase leading-[0.95]">
          CRAFTED FOR BUILDERS WHO <span className="italic">CREATE DAILY.</span>
        </h3>
        <p className="font-sans text-xs sm:text-sm md:text-base text-vault-dark/80 max-w-2xl mx-auto leading-relaxed">
          Join creators organizing their favorite AI prompts and bookmarking underrated web tools in one unified vault.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/signup"
            className="group relative inline-flex items-stretch cursor-pointer select-none active:scale-[0.97] transition-transform duration-200"
          >
            <span className="relative z-10 inline-flex items-center justify-center bg-vault-green text-vault-dark border border-vault-dark rounded-full px-6 py-2.5 font-sans font-bold text-xs sm:text-sm tracking-tight shadow-xs group-hover:brightness-[1.03] transition-all duration-300">
              Open Prompt Vault
            </span>
            <span className="relative -ml-6 z-0 inline-flex items-center justify-center bg-vault-darker text-vault-green border border-vault-dark rounded-r-full pl-7 pr-3.5 max-w-0 opacity-0 -translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[68px] group-hover:opacity-100 group-hover:translate-x-0 overflow-hidden">
              <ArrowUpRight className="w-4 h-4 stroke-[2.5] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105" />
            </span>
          </Link>

          <Link
            to="/privacy"
            className="inline-flex items-center justify-center bg-transparent border-2 border-vault-dark text-vault-dark font-sans font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full hover:bg-vault-dark hover:text-vault-cream active:scale-[0.97] transition-all duration-300"
          >
            <span>Read Privacy Policy</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
