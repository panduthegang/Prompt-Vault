export default function PromptHero() {
  return (
    <section className="w-full bg-vault-yellow border-b-2 border-vault-dark px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8 lg:py-10 text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
        <h1 className="font-serif text-[32px] xs:text-4xl sm:text-5xl md:text-[56px] leading-[0.94] tracking-tight text-vault-dark font-normal uppercase">
          <span className="block">PROMPTS FOR</span>
          <span className="block italic text-vault-darker">BREAKTHROUGH WORKFLOWS</span>
        </h1>

        <p className="font-sans text-xs sm:text-sm md:text-[15px] text-vault-dark/80 max-w-xl mx-auto leading-relaxed">
          Battle-tested system instructions, IDE rules, and reasoning chains curated for engineering excellence.
        </p>
      </div>
    </section>
  );
}
