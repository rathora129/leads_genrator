'use client';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, ArrowRight, LayoutDashboard, Building2, Radar, Users, KanbanSquare, BarChart3, Bell, Settings, User, Sparkles, Plus, Calendar, Phone, Mail, Star } from 'lucide-react';
import { LEADS } from '@/lib/mockData';

const NAV_ITEMS = [
  { type: 'page', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { type: 'page', label: 'Workspace', href: '/workspace', icon: Building2 },
  { type: 'page', label: 'Lead Finder', href: '/lead-finder', icon: Radar },
  { type: 'page', label: 'Leads', href: '/leads', icon: Users },
  { type: 'page', label: 'CRM Pipeline', href: '/crm', icon: KanbanSquare },
  { type: 'page', label: 'Reports', href: '/reports', icon: BarChart3 },
  { type: 'page', label: 'Notifications', href: '/notifications', icon: Bell },
  { type: 'page', label: 'Settings', href: '/settings', icon: Settings },
  { type: 'page', label: 'Profile', href: '/profile', icon: User },
];
const QUICK = [
  { type: 'action', label: 'New lead', icon: Plus, href: '/leads' },
  { type: 'action', label: 'Schedule meeting', icon: Calendar, href: '/crm' },
  { type: 'action', label: 'Find leads in city…', icon: Radar, href: '/lead-finder' },
  { type: 'action', label: 'Run AI on selection', icon: Sparkles, href: '/leads' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const leads = LEADS.map(l => ({ type: 'lead', label: l.business, sub: `${l.owner} · ${l.city} · ${l.category}`, href: `/leads/${l.id}`, icon: Users, rating: l.rating, hot: l.hot }));
    const all = [...QUICK, ...NAV_ITEMS, ...leads];
    if (!term) return [{ group: 'Quick actions', items: QUICK }, { group: 'Navigate', items: NAV_ITEMS }, { group: 'Recent leads', items: leads.slice(0, 6) }];
    const f = all.filter(i => (i.label + (i.sub || '')).toLowerCase().includes(term)).slice(0, 20);
    return [{ group: 'Results', items: f }];
  }, [q]);
  const flat = results.flatMap(g => g.items);
  useEffect(() => { setIdx(0); }, [q, open]);
  const go = (i) => { if (i?.href) { router.push(i.href); setOpen(false); setQ(''); } };
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md p-4 pt-[12vh] flex justify-center">
          <motion.div onClick={e => e.stopPropagation()} initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 10 }} transition={{ duration: 0.15 }} className="w-full max-w-2xl glass-strong rounded-2xl shadow-pop overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
              <Search className="size-4 text-ink-3" />
              <input autoFocus value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => { if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(flat.length - 1, i + 1)); } if (e.key === 'ArrowUp') { e.preventDefault(); setIdx(i => Math.max(0, i - 1)); } if (e.key === 'Enter') { go(flat[idx]); } }} placeholder="Search leads, pages, actions…" className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-3" />
              <span className="text-[10px] border border-line rounded px-1.5 py-0.5 text-ink-3">ESC</span>
            </div>
            <div className="max-h-[60vh] overflow-y-auto scrollbar-thin p-2">
              {flat.length === 0 ? (<div className="text-center py-12 text-sm text-ink-3">No results for “{q}”</div>) : results.map(group => (
                <div key={group.group} className="mb-2">
                  <div className="px-2 py-1.5 text-[10px] uppercase tracking-[0.18em] text-ink-3">{group.group}</div>
                  {group.items.map((it, gi) => { const flatIdx = flat.indexOf(it); const Ic = it.icon || Users; return (
                    <button key={it.label + gi} onMouseEnter={() => setIdx(flatIdx)} onClick={() => go(it)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left ${idx === flatIdx ? 'bg-white/[0.07]' : 'hover:bg-white/[0.04]'}`}>
                      <div className="size-8 rounded-lg glass grid place-items-center shrink-0"><Ic className="size-4 text-ink-2" /></div>
                      <div className="min-w-0 flex-1"><div className="text-sm font-medium truncate">{it.label}</div>{it.sub && <div className="text-[11px] text-ink-3 truncate">{it.sub}</div>}</div>
                      {it.type === 'lead' && it.rating && <div className="text-[11px] text-ink-3 inline-flex items-center gap-1"><Star className="size-3 text-amber-300 fill-amber-300"/>{it.rating}</div>}
                      {idx === flatIdx && <ArrowRight className="size-4 text-ink-3" />}
                    </button>
                  );})}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-line text-[11px] text-ink-3">
              <span>↑ ↓ navigate · ↵ select · ESC close</span>
              <span className="inline-flex items-center gap-1"><Sparkles className="size-3 text-brand-300" />Tip: type “hot” to find hot leads</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
