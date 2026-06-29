'use client';
import { useMemo, useState } from 'react';
import { Card, Pill } from '@/components/ui-kit/Glass';
import { motion, AnimatePresence } from 'framer-motion';
import { LEADS } from '@/lib/mockData';
import { Search, Download, FileSpreadsheet, FileJson, Trash2, RefreshCw, Sparkles, ChevronDown, ChevronUp, ExternalLink, Mail, Phone, Globe, Star, MapPin, X, Save, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

export default function LeadsPage() {
  const [rows, setRows] = useState(LEADS);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState({ k: 'business', d: 'asc' });
  const [page, setPage] = useState(1);
  const [sel, setSel] = useState(new Set());
  const [aiOpen, setAiOpen] = useState(false);
  const [aiRun, setAiRun] = useState(false);
  const [aiDone, setAiDone] = useState(false);
  const ps = 12;
  const filtered = useMemo(() => {
    const f = rows.filter(r => (r.business + r.owner + r.email + r.city + r.category).toLowerCase().includes(q.toLowerCase()));
    return f.sort((a, b) => { const x = a[sort.k], y = b[sort.k]; if (x < y) return sort.d === 'asc' ? -1 : 1; if (x > y) return sort.d === 'asc' ? 1 : -1; return 0; });
  }, [rows, q, sort]);
  const paged = filtered.slice((page - 1) * ps, page * ps);
  const allChk = paged.every(p => sel.has(p.id)) && paged.length > 0;
  const toggleAll = () => { const s = new Set(sel); if (allChk) paged.forEach(p => s.delete(p.id)); else paged.forEach(p => s.add(p.id)); setSel(s); };
  const sortBy = (k) => setSort(s => ({ k, d: s.k === k && s.d === 'asc' ? 'desc' : 'asc' }));
  const Hdr = ({ k, label, className }) => (<th className={`px-3 py-2.5 text-left font-medium ${className||''}`}><button onClick={() => sortBy(k)} className="inline-flex items-center gap-1 hover:text-white">{label}{sort.k === k && (sort.d === 'asc' ? <ChevronUp className="size-3"/> : <ChevronDown className="size-3"/>)}</button></th>);
  const askAi = () => { if (sel.size === 0) { toast.error('Select at least one lead first'); return; } setAiOpen(true); };
  const runAi = () => { setAiRun(true); setTimeout(() => { setAiRun(false); setAiDone(true); }, 1800); };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex gap-2"><Pill tone="brand">Raw Lead Preview</Pill><Pill tone="amber"><ShieldAlert className="size-3"/>AI is off until you click Ask AI</Pill></div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">142 raw leads · Mumbai · Real Estate</h1>
          <p className="text-ink-3 text-sm mt-1">Verify before saving to CRM. Nothing is enriched, scored or contacted automatically.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[['Download CSV',Download],['Excel',FileSpreadsheet],['JSON',FileJson]].map(([l,I])=>(<button key={l} onClick={()=>toast.success(`${l} exported`)} className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5 inline-flex items-center gap-1.5"><I className="size-3.5"/>{l}</button>))}
          <button onClick={()=>toast.success(`Saved ${sel.size||paged.length} to CRM`)} className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5 inline-flex items-center gap-1.5"><Save className="size-3.5"/>Save to CRM</button>
          <button onClick={()=>setRows(LEADS)} className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5 inline-flex items-center gap-1.5"><RefreshCw className="size-3.5"/>Refresh</button>
          <button onClick={()=>{ const s=new Set(sel); rows.filter(r=>s.has(r.id)).forEach(r=>s.delete(r.id)); setRows(rows.filter(r=>!sel.has(r.id))); setSel(new Set()); toast(`Deleted ${sel.size} leads`); }} className="text-xs rounded-xl px-3 py-2 bg-accent-rose/15 text-accent-rose hover:bg-accent-rose/25 inline-flex items-center gap-1.5"><Trash2 className="size-3.5"/>Delete</button>
          <button onClick={askAi} className="text-xs rounded-xl px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white inline-flex items-center gap-1.5 shadow-glow font-semibold"><Sparkles className="size-3.5"/>Ask AI</button>
        </div>
      </div>
      <Card className="p-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex-1 min-w-[220px] flex items-center gap-2 glass rounded-xl px-3 py-2"><Search className="size-4 text-ink-3"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search business, owner, email, category…" className="bg-transparent flex-1 outline-none text-sm"/></div>
          <Pill tone="muted">{filtered.length} results</Pill>
          <Pill tone="brand">{sel.size} selected</Pill>
        </div>
      </Card>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm min-w-[1100px]">
            <thead className="text-xs text-ink-3 sticky top-0 bg-bg-elev/90 backdrop-blur z-10">
              <tr className="border-b border-line">
                <th className="px-3 py-2.5 w-10"><input type="checkbox" checked={allChk} onChange={toggleAll} className="accent-brand-500"/></th>
                <Hdr k="business" label="Business"/><Hdr k="owner" label="Owner"/><Hdr k="phone" label="Phone"/><Hdr k="email" label="Email"/><Hdr k="website" label="Website"/><Hdr k="rating" label="Rating"/><Hdr k="reviews" label="Reviews"/><Hdr k="category" label="Category"/><Hdr k="city" label="Address"/><Hdr k="status" label="Status"/><th className="px-3 py-2.5">Map</th>
              </tr>
            </thead>
            <tbody>
              {paged.map(r => (
                <tr key={r.id} className="border-b border-line hover:bg-white/[0.025] transition-colors">
                  <td className="px-3 py-2.5"><input type="checkbox" checked={sel.has(r.id)} onChange={()=>{const s=new Set(sel); s.has(r.id)?s.delete(r.id):s.add(r.id); setSel(s);}} className="accent-brand-500"/></td>
                  <td className="px-3 py-2.5"><div className="flex items-center gap-2.5"><span className="size-8 rounded-lg grid place-items-center text-[11px] font-semibold text-white shrink-0" style={{background:'linear-gradient(135deg,#6E45FE,#22D3EE)'}}>{r.business.slice(0,2).toUpperCase()}</span><div className="min-w-0"><div className="font-medium truncate max-w-[200px]">{r.business}</div><div className="text-[11px] text-ink-3">{r.id}</div></div></div></td>
                  <td className="px-3 py-2.5 text-ink-2">{r.owner}</td>
                  <td className="px-3 py-2.5">{r.phone ? <span className="inline-flex items-center gap-1.5 text-ink-2"><Phone className="size-3 text-ink-3"/>{r.phone}</span> : <span className="text-ink-4">—</span>}</td>
                  <td className="px-3 py-2.5">{r.email ? <span className="inline-flex items-center gap-1.5 text-ink-2"><Mail className="size-3 text-ink-3"/>{r.email}</span> : <span className="text-ink-4">—</span>}</td>
                  <td className="px-3 py-2.5">{r.website ? <a className="inline-flex items-center gap-1.5 text-accent-cyan hover:underline" href="#"><Globe className="size-3"/>{r.website}</a> : <span className="text-ink-4">—</span>}</td>
                  <td className="px-3 py-2.5"><span className="inline-flex items-center gap-1"><Star className="size-3 fill-amber-300 text-amber-300"/>{r.rating}</span></td>
                  <td className="px-3 py-2.5 text-ink-2">{r.reviews.toLocaleString()}</td>
                  <td className="px-3 py-2.5"><Pill tone="muted">{r.category}</Pill></td>
                  <td className="px-3 py-2.5 text-ink-2"><span className="inline-flex items-center gap-1.5"><MapPin className="size-3 text-ink-3"/>{r.address}</span></td>
                  <td className="px-3 py-2.5"><Pill tone={r.hot?'rose':'muted'}>{r.status}</Pill></td>
                  <td className="px-3 py-2.5"><a href={r.maps} target="_blank" rel="noreferrer" className="text-ink-3 hover:text-white"><ExternalLink className="size-3.5"/></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-3 border-t border-line text-xs text-ink-3">
          <span>Showing {(page-1)*ps+1}–{Math.min(page*ps, filtered.length)} of {filtered.length}</span>
          <div className="flex gap-1">{Array.from({length: Math.ceil(filtered.length/ps)}).slice(0,7).map((_,i)=>(<button key={i} onClick={()=>setPage(i+1)} className={`size-7 rounded-md ${page===i+1?'bg-white/10 text-white':'hover:bg-white/5'}`}>{i+1}</button>))}</div>
        </div>
      </Card>
      <AnimatePresence>
        {aiOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/60 backdrop-blur grid place-items-center p-4" onClick={()=>{ if(!aiRun) { setAiOpen(false); setAiDone(false); } }}>
            <motion.div initial={{scale:.96,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.96,opacity:0}} onClick={e=>e.stopPropagation()} className="w-full max-w-lg glass-strong rounded-3xl p-6 relative">
              <button onClick={()=>{setAiOpen(false); setAiDone(false);}} className="absolute top-4 right-4 text-ink-3 hover:text-white"><X className="size-4"/></button>
              <div className="size-12 rounded-2xl bg-aurora grid place-items-center shadow-glow"><Sparkles className="size-5 text-white"/></div>
              <h3 className="mt-4 text-xl font-semibold">Run AI on {sel.size} selected leads?</h3>
              <p className="text-sm text-ink-3 mt-1.5">AI will enrich contact data, score intent and draft outreach. You stay in control — nothing is sent until you approve.</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">{['Enrich','Score Intent','Draft Email'].map(t=>(<label key={t} className="glass rounded-xl px-3 py-2.5 flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-brand-500"/>{t}</label>))}</div>
              {aiDone ? (<div className="mt-5 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-sm">✓ AI processed {sel.size} leads. Insights are now visible on each lead detail page.</div>) : (<button onClick={runAi} disabled={aiRun} className="mt-5 w-full h-11 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-70">{aiRun?<><span className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Processing…</>:<><Sparkles className="size-4"/>Run AI now</>}</button>)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
