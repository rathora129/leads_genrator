'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Globe, Mail, Phone, Star, Filter, Sparkles, RotateCcw, ChevronDown, Radar } from 'lucide-react';
import { Card, Pill, Section } from '@/components/ui-kit/Glass';
import { toast } from 'sonner';

export default function LeadFinder() {
  const [searching, setSearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const run = () => {
    setSearching(true); setProgress(0);
    const id = setInterval(() => { setProgress(p => { if (p>=100){clearInterval(id); setSearching(false); toast.success('Found 142 raw leads. Review before any AI processing.'); window.location.href='/leads'; return 100;} return p+8; }); }, 120);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2"><Pill tone="brand"><Radar className="size-3"/>Lead Finder</Pill><Pill tone="muted">Workspace: Bhavya</Pill></div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Discover your next 100 clients</h1>
          <p className="text-ink-3 mt-1.5 text-sm">Search 12M+ verified businesses by location, niche & intent. Raw data only — AI never starts automatically.</p>
        </div>
        <div className="flex items-center gap-2"><button className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5 inline-flex items-center gap-1.5"><RotateCcw className="size-3.5"/>Reset</button><button onClick={run} className="inline-flex items-center gap-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2.5 shadow-glow"><Search className="size-4"/>Search</button></div>
      </div>
      <Card className="p-5">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          <Field label="Country" icon={<Globe className="size-4"/>}><Select options={['United States','India','UAE','Singapore','United Kingdom','Canada','Australia']} /></Field>
          <Field label="City" icon={<MapPin className="size-4"/>}><input defaultValue="Mumbai" className="input" /></Field>
          <Field label="Search radius" icon={<Radar className="size-4"/>}><Select options={['5 km','10 km','25 km','50 km','100 km']}/></Field>
          <Field label="Business category" icon={<Filter className="size-4"/>}><Select options={['Real Estate','Restaurants','Dental Clinics','Gyms & Fitness','Law Firms','Salons & Spa','Auto Repair','E-commerce','Marketing','Software']}/></Field>
          <Field label="Keyword" icon={<Search className="size-4"/>}><input placeholder="e.g. luxury, organic, premium" className="input"/></Field>
          <Field label="Minimum rating" icon={<Star className="size-4"/>}><Select options={['Any','3.0+','3.5+','4.0+','4.5+']}/></Field>
          <Field label="Minimum reviews" icon={<Star className="size-4"/>}><Select options={['Any','10+','50+','100+','500+']}/></Field>
          <Field label="Sort by" icon={<ChevronDown className="size-4"/>}><Select options={['Best match','Rating','Reviews','Newest','Distance']}/></Field>
        </div>
        <div className="mt-5 pt-5 border-t border-line">
          <div className="text-xs font-medium text-ink-2 mb-3">Refine</div>
          <div className="flex flex-wrap gap-2">{[
            ['Website exists', true],['Without website', false],['With email', true],['Without email', false],['With phone', true],['Without phone', false],['Verified only', false],['Open now', false],['New listings', false]
          ].map(([l,on],i)=>(<Toggle key={i} label={l} on={on}/>))}</div>
        </div>
      </Card>
      {searching && (
        <Card className="p-6 overflow-hidden relative">
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-aurora grid place-items-center shadow-glow relative"><Radar className="size-5 text-white animate-pulse"/><span className="absolute inset-0 rounded-2xl border border-white/30 animate-ping"/></div>
            <div className="flex-1"><div className="text-sm font-semibold">Scanning 12M+ businesses…</div><div className="text-xs text-ink-3">Filtering by location, intent & contact availability</div><div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden"><motion.div className="h-full bg-aurora" style={{width:`${progress}%`}}/></div></div>
            <div className="text-2xl font-semibold tabular-nums">{progress}%</div>
          </motion.div>
        </Card>
      )}
      {!searching && (
        <Card className="p-10 text-center">
          <div className="size-16 rounded-2xl bg-brand-500/15 grid place-items-center mx-auto"><Sparkles className="size-7 text-brand-300"/></div>
          <div className="mt-4 text-lg font-semibold">Ready when you are</div>
          <div className="text-sm text-ink-3 mt-1 max-w-md mx-auto">Configure filters above and press Search. We’ll return raw, unprocessed leads for you to review.</div>
        </Card>
      )}
      <style jsx>{`.input{width:100%;background:transparent;outline:none;font-size:14px;color:white;padding:6px 0;}`}</style>
    </div>
  );
}

function Field({ label, icon, children }) {
  return (<div><label className="text-[11px] uppercase tracking-[0.14em] text-ink-3 font-medium">{label}</label><div className="mt-1.5 glass rounded-xl flex items-center gap-2 px-3 py-2.5 focus-within:ring-2 focus-within:ring-brand-500/50"><span className="text-ink-3">{icon}</span>{children}</div></div>);
}
function Select({ options }) {
  return (<select className="bg-transparent outline-none w-full text-sm appearance-none cursor-pointer">{options.map(o=>(<option key={o} className="bg-bg-elev">{o}</option>))}</select>);
}
function Toggle({ label, on }) {
  const [v,setV]=useState(on);
  return (<button onClick={()=>setV(!v)} className={`text-xs px-3 py-1.5 rounded-full border transition ${v?'bg-brand-500/20 border-brand-500/40 text-brand-200':'border-line text-ink-2 hover:bg-white/5'}`}>{label}</button>);
}
