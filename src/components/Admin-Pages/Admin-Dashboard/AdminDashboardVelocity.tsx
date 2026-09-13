import { useState, useMemo } from 'react';
import { Flame } from 'lucide-react';
import {
  WEEKLY_VELOCITY,
  CATEGORY_SHARE_ITEMS,
} from './adminDashboardData';

export default function AdminDashboardVelocity() {
  const [graphMetric, setGraphMetric] = useState<'both' | 'copies' | 'creations'>('both');
  const [graphTimeframe, setGraphTimeframe] = useState<'7d' | '30d'>('7d');
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const hoveredItem = useMemo(() => {
    return WEEKLY_VELOCITY.find((d) => d.day === hoveredDay) || null;
  }, [hoveredDay]);

  const totalCopiesWeek = useMemo(() => {
    return WEEKLY_VELOCITY.reduce((sum, d) => sum + d.copies, 0);
  }, []);

  const totalCreationsWeek = useMemo(() => {
    return WEEKLY_VELOCITY.reduce((sum, d) => sum + d.creations, 0);
  }, []);

  return (
    <section className="bg-vault-cream rounded-[26px] p-5 sm:p-6 border-2 border-vault-dark/15 shadow-xs space-y-6">
      {/* Header with Title & Interactive Metric Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-vault-dark/10">
        <div>
          <h2 className="font-serif text-2xl text-vault-dark font-normal">
            Platform Velocity &amp; Clones
          </h2>
          <p className="font-sans text-xs text-vault-dark/55 font-medium pt-0.5">
            Daily prompt creations vs. community clipboard copies &amp; forks.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Metric filter pills */}
          <div className="flex items-center gap-1.5 p-1 bg-vault-dark/5 rounded-full border border-vault-dark/10">
            <button
              type="button"
              onClick={() => setGraphMetric('both')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                graphMetric === 'both'
                  ? 'bg-vault-dark text-vault-cream shadow-xs'
                  : 'text-vault-dark/70 hover:text-vault-dark'
              }`}
            >
              Both
            </button>
            <button
              type="button"
              onClick={() => setGraphMetric('copies')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                graphMetric === 'copies'
                  ? 'bg-vault-dark text-vault-cream shadow-xs'
                  : 'text-vault-dark/70 hover:text-vault-dark'
              }`}
            >
              Copies Only
            </button>
            <button
              type="button"
              onClick={() => setGraphMetric('creations')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                graphMetric === 'creations'
                  ? 'bg-vault-dark text-vault-cream shadow-xs'
                  : 'text-vault-dark/70 hover:text-vault-dark'
              }`}
            >
              Creations
            </button>
          </div>

          {/* Timeframe pill */}
          <div className="flex items-center gap-1 p-1 bg-vault-dark/5 rounded-full border border-vault-dark/10">
            {(['7d', '30d'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setGraphTimeframe(t)}
                className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
                  graphTimeframe === t
                    ? 'bg-vault-yellow text-vault-dark border border-vault-dark shadow-2xs'
                    : 'text-vault-dark/70 hover:text-vault-dark'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Graph Grid: Left Bar Chart + Right Category Velocity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Visual Daily Bar Chart */}
        <div className="lg:col-span-2 bg-white/70 rounded-[22px] p-5 border-2 border-vault-dark/15 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between min-h-[36px]">
            <div className="flex items-center gap-4 text-xs font-bold font-sans">
              {(graphMetric === 'both' || graphMetric === 'creations') && (
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-vault-dark border border-vault-dark" />
                  <span>Vault Creations ({totalCreationsWeek.toLocaleString()})</span>
                </div>
              )}
              {(graphMetric === 'both' || graphMetric === 'copies') && (
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-vault-green border border-vault-dark" />
                  <span>Community Clones ({totalCopiesWeek.toLocaleString()})</span>
                </div>
              )}
            </div>

            {/* Stable Right Header Badge (Fixed height to prevent container layout reflow) */}
            <div className="h-8 flex items-center justify-end">
              {hoveredItem ? (
                <div className="flex items-center gap-2 font-mono text-xs font-bold bg-vault-yellow/50 border border-vault-dark/25 px-3 py-1 rounded-full shadow-2xs transition-all">
                  <span className="text-vault-dark font-extrabold">{hoveredItem.day}:</span>
                  {(graphMetric === 'both' || graphMetric === 'creations') && (
                    <span className="text-vault-dark">
                      {hoveredItem.creations.toLocaleString()} created
                    </span>
                  )}
                  {graphMetric === 'both' && <span className="text-vault-dark/30">·</span>}
                  {(graphMetric === 'both' || graphMetric === 'copies') && (
                    <span className="text-emerald-800 font-extrabold">
                      {hoveredItem.copies.toLocaleString()} copies
                    </span>
                  )}
                </div>
              ) : (
                <span className="font-mono text-xs text-vault-dark/45 font-medium hidden sm:inline">
                  Hover day to inspect values
                </span>
              )}
            </div>
          </div>

          {/* Interactive Bar Chart Visualization with Container-level onMouseLeave to prevent boundary flicker */}
          <div
            onMouseLeave={() => setHoveredDay(null)}
            className="h-52 flex items-end justify-between gap-2 sm:gap-4 px-2 pt-6 pb-2 relative"
          >
            {WEEKLY_VELOCITY.map((item) => {
              const maxCopies = 5500;
              const creationHeight = (item.creations / maxCopies) * 100;
              const copyHeight = (item.copies / maxCopies) * 100;
              const isHovered = hoveredDay === item.day;

              return (
                <div
                  key={item.day}
                  onMouseEnter={() => setHoveredDay(item.day)}
                  className="flex-1 flex flex-col items-center gap-2 group h-full justify-end cursor-pointer relative"
                >
                  {/* Floating exact value indicator directly above the hovered day bars */}
                  {isHovered && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-vault-dark text-vault-cream border border-vault-dark font-mono text-[10px] font-bold py-0.5 px-2 rounded-md shadow-md whitespace-nowrap z-20 flex items-center gap-1.5 pointer-events-none transition-opacity duration-150">
                      {(graphMetric === 'both' || graphMetric === 'creations') && (
                        <span className="text-vault-cream">{item.creations.toLocaleString()}</span>
                      )}
                      {graphMetric === 'both' && <span className="text-vault-cream/40">/</span>}
                      {(graphMetric === 'both' || graphMetric === 'copies') && (
                        <span className="text-vault-green">{item.copies.toLocaleString()}</span>
                      )}
                    </div>
                  )}

                  {/* Bar Group Container (Zero geometric transform to prevent border jitter) */}
                  <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-full">
                    {/* Creations Bar */}
                    {(graphMetric === 'both' || graphMetric === 'creations') && (
                      <div
                        style={{ height: `${creationHeight}%` }}
                        className={`w-full max-w-[16px] sm:max-w-[20px] bg-vault-dark rounded-t-sm transition-opacity duration-150 ${
                          isHovered ? 'opacity-100 ring-2 ring-vault-dark/20' : 'opacity-80'
                        }`}
                        title={`${item.day}: ${item.creations} creations`}
                      />
                    )}

                    {/* Clones / Copies Bar */}
                    {(graphMetric === 'both' || graphMetric === 'copies') && (
                      <div
                        style={{ height: `${copyHeight}%` }}
                        className={`w-full max-w-[16px] sm:max-w-[20px] bg-vault-green border border-vault-dark rounded-t-sm transition-all duration-150 ${
                          isHovered
                            ? 'brightness-110 shadow-xs ring-2 ring-vault-green/40'
                            : 'brightness-100'
                        }`}
                        title={`${item.day}: ${item.copies} clipboard clones`}
                      />
                    )}
                  </div>

                  {/* Day Label */}
                  <span
                    className={`font-mono text-xs font-bold transition-colors duration-150 ${
                      isHovered ? 'text-vault-dark' : 'text-vault-dark/60'
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chart Meta Summary */}
          <div className="pt-3 border-t border-vault-dark/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-vault-dark/70 font-sans">
            <span>Peak clipboard copy velocity: Weekends (4,980 clones/day)</span>
            <span className="font-bold text-vault-dark">Net Fork Ratio: 4.8 clones per creation</span>
          </div>
        </div>

        {/* Right Column: Category Distribution & Live Insight */}
        <div className="bg-white/70 rounded-[22px] p-5 border-2 border-vault-dark/15 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-vault-dark/10">
              <h3 className="font-serif text-xl text-vault-dark font-normal">
                Category Share
              </h3>
              <span className="font-mono text-[11px] font-bold text-vault-dark/50">84.2k Total</span>
            </div>

            {/* Progress bars matching Prompt Vault design tokens */}
            <div className="space-y-3.5 pt-3">
              {CATEGORY_SHARE_ITEMS.map((cat) => (
                <div key={cat.name}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>{cat.name}</span>
                    <span className="font-mono text-vault-dark">
                      {cat.percentage}% ({cat.count})
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-vault-dark/10 rounded-full overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full ${cat.colorClass}`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logical Insight Callout Box */}
          <div className="bg-vault-yellow/25 p-3 rounded-xl border border-vault-dark/15 text-xs text-vault-dark font-medium flex items-start gap-2">
            <Flame className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <span>
              <strong>Insight:</strong> Agent Skills (<code>skill.md</code> rules) drove{' '}
              <strong>64%</strong> of all community clones this week.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
