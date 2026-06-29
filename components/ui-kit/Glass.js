'use client';
import { cn } from '@/lib/utils';
export function Card({ className, children, ...p }) {
  return <div className={cn('glass rounded-2xl shadow-card', className)} {...p}>{children}</div>;
}
export function Pill({ className, children, tone = 'brand' }) {
  const tones = {
    brand: 'bg-brand-500/15 text-brand-200 border-brand-500/30',
    cyan: 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30',
    emerald: 'bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30',
    amber: 'bg-accent-amber/15 text-accent-amber border-accent-amber/30',
    rose: 'bg-accent-rose/15 text-accent-rose border-accent-rose/30',
    pink: 'bg-accent-pink/15 text-accent-pink border-accent-pink/30',
    muted: 'bg-white/5 text-ink-2 border-white/10',
  };
  return <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border', tones[tone], className)}>{children}</span>;
}
export function Section({ title, desc, action, children }) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          {desc && <p className="text-sm text-ink-3 mt-0.5">{desc}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
