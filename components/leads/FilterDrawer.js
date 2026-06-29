'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Filter, RotateCcw, Check } from 'lucide-react';

const FILTERS = [
  { key: 'country', label: 'Country', options: ['United States','India','UAE','Singapore','United Kingdom','Canada','Australia','Germany','Japan'] },
  { key: 'city', label: 'City', type: 'text', placeholder: 'e.g. Mumbai' },
  { key: 'radius', label: 'Radius', options: ['5 km','10 km','25 km','50 km','100 km'] },
  { key: 'category', label: 'Category', options: ['Real Estate','Restaurants','Dental','Gym','Law','Salon','Auto','E-commerce','Marketing','Software','Hotels'] },
  { key: 'rating', label: 'Min rating', options: ['Any','3.0+','3.5+','4.0+','4.5+'] },
  { key: 'reviews', label: 'Min reviews', options: ['Any','10+','50+','100+','500+','1000+'] },
  { key: 'sort', label: 'Sort by', options: ['Best match','Rating','Reviews','Newest','Distance','A–Z'] },
];
const TOGGLES = ['Website exists','Without website','With email','Without email','With phone','Without phone','Verified only','Open now','New listings'];

export default function FilterDrawer({ open, onClose, onApply }) {
  const [vals, setVals] = useState({});
  const [tg, setTg] = useState(new Set(['Website exists','With phone']));
  const reset = () => { setVals({}); setTg(new Set()); };
  const count = Object.values(vals).filter(v => v && v !== 'Any').length + tg.size;
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md">
          <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring', damping: 30, stiffness: 320}} onClick={e=>e.stopPropagation()} className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-bg-elev border-l border-line shadow-pop flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-line"><div className="flex items-center gap-2.5"><div className="size-9 rounded-xl bg-brand-500/15 text-brand-300 grid place-items-center"><Filter className="size-4"/></div><div><div className="text-sm font-semibold">Advanced filters</div><div className="text-xs text-ink-3">{count} active</div></div></div><button onClick={onClose} className="size-9 grid place-items-center rounded-xl hover:bg-white/5"><X className="size-4"/></button></div>
            <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-4">
              {FILTERS.map(f => (
                <div key={f.key}>
                  <label className="text-[11px] uppercase tracking-[0.14em] text-ink-3 font-medium">{f.label}</label>
                  <div className="mt-1.5 glass rounded-xl px-3 py-2.5">
                    {f.type === 'text' ? (<input value={vals[f.key]||''} onChange={e=>setVals({...vals,[f.key]:e.target.value})} placeholder={f.placeholder} className="bg-transparent outline-none w-full text-sm"/>) : (<select value={vals[f.key]||''} onChange={e=>setVals({...vals,[f.key]:e.target.value})} className="bg-transparent outline-none w-full text-sm appearance-none cursor-pointer"><option value="" className="bg-bg-elev">Any</option>{f.options.map(o=>(<option key={o} className="bg-bg-elev">{o}</option>))}</select>)}
                  </div>
                </div>
              ))}
              <div>
                <label className="text-[11px] uppercase tracking-[0.14em] text-ink-3 font-medium">Refinements</label>
                <div className="mt-2 flex flex-wrap gap-2">{TOGGLES.map(t=>{const on=tg.has(t); return (<button key={t} onClick={()=>{const s=new Set(tg); s.has(t)?s.delete(t):s.add(t); setTg(s);}} className={`text-xs px-3 py-1.5 rounded-full border inline-flex items-center gap-1.5 transition ${on?'bg-brand-500/20 border-brand-500/40 text-brand-200':'border-line text-ink-2 hover:bg-white/5'}`}>{on && <Check className="size-3"/>}{t}</button>);})}</div>
              </div>
            </div>
            <div className="p-4 border-t border-line flex gap-2"><button onClick={reset} className="text-sm glass rounded-xl px-4 py-2.5 hover:bg-white/5 inline-flex items-center gap-1.5"><RotateCcw className="size-3.5"/>Reset</button><button onClick={()=>{onApply?.({vals, toggles: Array.from(tg)}); onClose?.();}} className="flex-1 text-sm rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-4 py-2.5 shadow-glow">Apply {count > 0 && `(${count})`}</button></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
