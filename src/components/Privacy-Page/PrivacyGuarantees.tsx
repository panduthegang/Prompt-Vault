import { GUARANTEE_CARDS } from './privacyData';

export default function PrivacyGuarantees() {
  return (
    <section className="w-full bg-vault-yellow border-b-2 border-vault-dark py-10 sm:py-12 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {GUARANTEE_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="bg-vault-cream border-2 border-vault-dark rounded-2xl p-5 flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-vault-yellow border-2 border-vault-dark flex items-center justify-center text-vault-dark">
                  <card.icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="font-serif text-2xl sm:text-3xl text-vault-green font-bold tracking-tight">
                  {card.number}
                </span>
              </div>
              <div>
                <h3 className="font-sans text-sm font-bold text-vault-dark uppercase tracking-tight">
                  {card.label}
                </h3>
                <p className="font-sans text-xs text-vault-dark/75 leading-relaxed pt-1">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
