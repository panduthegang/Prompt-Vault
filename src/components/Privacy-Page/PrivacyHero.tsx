import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PrivacyHero() {
  return (
    <section className="w-full bg-vault-cream border-b-2 border-vault-dark px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Column: Headline */}
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vault-yellow border-2 border-vault-dark text-vault-dark font-sans text-xs font-bold tracking-wider uppercase shadow-xs">
              <ShieldCheck className="w-4 h-4 text-vault-dark fill-vault-green" />
              <span>HONEST &amp; SHORT PRIVACY</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] leading-[0.92] tracking-tight text-vault-dark font-normal uppercase">
              <span className="block">SAVE WHAT INSPIRES YOU.</span>
              <span className="block italic text-vault-darker">NO TRACKING. NO NONSENSE.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base md:text-lg text-vault-dark/80 max-w-2xl leading-relaxed pt-2">
              Prompt Vault was built by a creator for creators — to easily save, organize, and find the prompts and underrated tools we discover daily. Here is our simple privacy policy with zero legalese.
            </p>
          </div>

          {/* Right Column: Key Meta Badge Card */}
          <div className="lg:col-span-4 bg-vault-yellow border-2 border-vault-dark rounded-2xl p-5 sm:p-6 space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-vault-dark/20 pb-3">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70">
                Quick Summary
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold bg-vault-green text-vault-dark border border-vault-dark px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                SIMPLE &amp; CLEAR
              </span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm font-sans text-vault-dark">
              <div className="flex items-center justify-between">
                <span className="text-vault-dark/70">Project:</span>
                <span className="font-semibold">Prompt Vault</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-vault-dark/70">Created By:</span>
                <span className="font-semibold">Harsh Rathod</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-vault-dark/70">Database:</span>
                <span className="font-semibold">Supabase (Upcoming)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-vault-dark/70">Data Policy:</span>
                <span className="font-semibold">100% User Owned</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
