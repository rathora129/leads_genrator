'use client';
import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Card, Pill } from '@/components/ui-kit/Glass';
import { LEADS } from '@/lib/mockData';
import { Plus, MoreHorizontal, Phone, Calendar, Star, Filter, Search, KanbanSquare, Table2, CalendarDays } from 'lucide-react';

const STAGES = [
  { key: 'New', color: '#38BDF8' }, { key: 'Called', color: '#A78BFA' }, { key: 'Call Later', color: '#FBBF24' },
  { key: 'Interested', color: '#34D399' }, { key: 'Meeting', color: '#22D3EE' }, { key: 'Proposal', color: '#F472B6' },
  { key: 'Negotiation', color: '#FB923C' }, { key: 'Client', color: '#10B981' }, { key: 'Closed', color: '#64748B' },
];

export default function CRM() {
  const [view, setView] = useState('kanban');
  const [board, setBoard] = useState(() => Object.fromEntries(STAGES.map(s => [s.key, LEADS.filter(l => l.status === s.key).slice(0, 6)])));
  const move = (lead, from, to) => { const next = { ...board }; next[from] = next[from].filter(l => l.id !== lead.id); next[to] = [{ ...lead, status: to }, ...next[to]]; setBoard(next); };
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex gap-2"><Pill tone="brand">CRM</Pill><Pill tone="muted">Bhavya Enterprises</Pill></div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Sales pipeline</h1>
          <p className="text-ink-3 text-sm mt-1">Drag leads across stages. Every workspace has its own private CRM.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="glass rounded-xl p-1 flex">
            {[['kanban',KanbanSquare,'Board'],['table',Table2,'Table'],['calendar',CalendarDays,'Calendar']].map(([k,Ic,l])=>(<button key={k} onClick={()=>setView(k)} className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg ${view===k?'bg-white/10 text-white':'text-ink-3'}`}><Ic className="size-3.5"/>{l}</button>))}
          </div>
          <div className="flex items-center gap-2 glass rounded-xl px-3 py-2"><Search className="size-4 text-ink-3"/><input placeholder="Search pipeline…" className="bg-transparent outline-none text-sm w-40"/></div>
          <button className="glass rounded-xl px-3 py-2 text-xs hover:bg-white/5 inline-flex items-center gap-1.5"><Filter className="size-3.5"/>Filter</button>
          <button className="rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-3 py-2 shadow-glow inline-flex items-center gap-1.5"><Plus className="size-3.5"/>New deal</button>
        </div>
      </div>
      {view === 'kanban' && (
        <div className="flex gap-3 overflow-x-auto scrollbar-thin pb-4 -mx-2 px-2">
          {STAGES.map(s => (
            <div key={s.key} className="shrink-0 w-[300px] kanban-col rounded-2xl border border-line p-3">
              <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><span className="size-2 rounded-full" style={{background:s.color}}/><span className="text-sm font-semibold">{s.key}</span><Pill tone="muted">{(board[s.key]||[]).length}</Pill></div><button className="text-ink-3 hover:text-white"><Plus className="size-4"/></button></div>
              <div className="space-y-2 min-h-[40px]">
                {(board[s.key]||[]).map(l => (
                  <motion.div key={l.id} layout drag dragSnapToOrigin onDragEnd={(_,info) => { if (Math.abs(info.offset.x) > 80) { const idx = STAGES.findIndex(x=>x.key===s.key); const nxt = STAGES[Math.max(0,Math.min(STAGES.length-1, idx + (info.offset.x>0?1:-1)))]; if (nxt && nxt.key !== s.key) move(l, s.key, nxt.key); } }} whileDrag={{ scale: 1.03, rotate: 1, zIndex: 50 }} className="glass rounded-xl p-3 cursor-grab active:cursor-grabbing">
                    <div className="flex items-start justify-between gap-2"><div className="min-w-0"><div className="text-sm font-medium truncate">{l.business}</div><div className="text-[11px] text-ink-3 truncate">{l.owner} · {l.city}</div></div><MoreHorizontal className="size-3.5 text-ink-3 shrink-0"/></div>
                    <div className="mt-3 flex items-center gap-2"><Pill tone={l.hot?'rose':'muted'}>{l.hot?'🔥 Hot':l.category}</Pill><span className="inline-flex items-center gap-1 text-[11px] text-ink-3"><Star className="size-3 fill-amber-300 text-amber-300"/>{l.rating}</span></div>
                    <div className="mt-3 flex items-center gap-1 text-ink-3">{l.phone && <Phone className="size-3"/>}{l.phone && <span className="text-[10px]">Call</span>}<span className="mx-1"/>{l.email && <Calendar className="size-3"/>}{l.email && <span className="text-[10px]">Meet</span>}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {view === 'table' && (
        <Card className="overflow-x-auto"><table className="w-full text-sm min-w-[800px]"><thead className="text-xs text-ink-3"><tr className="border-b border-line">{['Business','Owner','Stage','City','Rating','Value'].map(h=>(<th key={h} className="px-3 py-2.5 text-left font-medium">{h}</th>))}</tr></thead><tbody>{LEADS.slice(0,20).map(l=>(<tr key={l.id} className="border-b border-line hover:bg-white/[0.025]"><td className="px-3 py-2.5 font-medium">{l.business}</td><td className="px-3 py-2.5 text-ink-2">{l.owner}</td><td className="px-3 py-2.5"><Pill tone={l.hot?'rose':'brand'}>{l.status}</Pill></td><td className="px-3 py-2.5 text-ink-2">{l.city}</td><td className="px-3 py-2.5">{l.rating}★</td><td className="px-3 py-2.5">${(l.reviews*4).toLocaleString()}</td></tr>))}</tbody></table></Card>
      )}
      {view === 'calendar' && (
        <Card className="p-6"><div className="grid grid-cols-7 gap-2 text-xs">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>(<div key={d} className="text-ink-3 font-medium pb-2">{d}</div>))}{Array.from({length:35}).map((_,i)=>(<div key={i} className="aspect-square glass rounded-xl p-2 relative"><span className="text-ink-3">{((i%30)+1)}</span>{i%5===0 && <Pill tone="brand" className="absolute bottom-1.5 left-1.5 right-1.5 justify-center truncate">Meeting</Pill>}</div>))}</div></Card>
      )}
    </div>
  );
}
