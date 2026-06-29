'use client';
import { useState } from 'react';
import { Card, Pill } from '@/components/ui-kit/Glass';
import { Plus, Building2, Globe, Mail, Phone, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const WS = [
  { id:'w1', name:'Bhavya Enterprises', cat:'Real Estate', city:'Mumbai, IN', leads:1240, conv:'12.4%', color:'linear-gradient(135deg,#6E45FE,#22D3EE)', initials:'BE' },
  { id:'w2', name:'NovaLeads Agency', cat:'Marketing', city:'Dubai, UAE', leads:842, conv:'9.8%', color:'linear-gradient(135deg,#22D3EE,#34D399)', initials:'NL' },
  { id:'w3', name:'Helios Capital', cat:'Finance', city:'Singapore, SG', leads:412, conv:'18.2%', color:'linear-gradient(135deg,#F472B6,#FB7185)', initials:'HC' },
  { id:'w4', name:'Aurora Hotels', cat:'Hospitality', city:'Bali, ID', leads:298, conv:'7.1%', color:'linear-gradient(135deg,#FBBF24,#FB923C)', initials:'AH' },
];

export default function Workspace() {
  const [openNew, setOpenNew] = useState(false);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><div className="flex gap-2"><Pill tone="brand">Workspaces</Pill></div><h1 className="mt-3 text-3xl font-semibold tracking-tight">Your workspaces</h1><p className="text-ink-3 text-sm mt-1">Each workspace has its own leads, CRM, reports and settings. Data never mixes.</p></div>
        <button onClick={()=>setOpenNew(!openNew)} className="rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2.5 shadow-glow inline-flex items-center gap-2"><Plus className="size-4"/>New workspace</button>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        {WS.map((w,i)=>(
          <motion.div key={w.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}>
            <Card className="p-5 relative overflow-hidden group hover:border-white/20 transition">
              <div className="absolute -inset-x-10 -top-20 h-44 opacity-30 blur-3xl" style={{background:w.color}}/>
              <div className="relative flex items-start gap-4">
                <span className="size-14 rounded-2xl grid place-items-center text-lg font-semibold shrink-0" style={{background:w.color}}>{w.initials}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2"><div className="text-lg font-semibold truncate">{w.name}</div><Pill tone="emerald">Active</Pill></div>
                  <div className="text-xs text-ink-3 mt-0.5 flex items-center gap-3"><span className="inline-flex items-center gap-1"><Building2 className="size-3"/>{w.cat}</span><span className="inline-flex items-center gap-1"><MapPin className="size-3"/>{w.city}</span></div>
                  <div className="mt-4 grid grid-cols-3 gap-2"><Stat l="Leads" v={w.leads.toLocaleString()}/><Stat l="Conv." v={w.conv}/><Stat l="Team" v={`${4+i}`}/></div>
                  <div className="mt-4 flex items-center justify-between"><div className="flex -space-x-2">{['VS','AS','RK','MK'].slice(0,3+i%2).map(t=>(<span key={t} className="size-7 rounded-full bg-aurora ring-2 ring-bg-elev grid place-items-center text-[10px] font-semibold">{t}</span>))}</div><a href="/dashboard" className="text-sm text-brand-300 font-medium inline-flex items-center gap-1">Open <ArrowRight className="size-3.5"/></a></div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
        <Card className="p-5 border-dashed border border-line bg-transparent flex flex-col items-center justify-center text-center min-h-[200px]"><div className="size-14 rounded-2xl bg-brand-500/15 grid place-items-center"><Sparkles className="size-6 text-brand-300"/></div><div className="mt-3 text-lg font-semibold">Create unlimited workspaces</div><div className="text-xs text-ink-3 max-w-xs mt-1">Each workspace gets its own brand identity, CRM and AI configuration.</div><button onClick={()=>setOpenNew(true)} className="mt-4 text-xs rounded-xl bg-brand-500 hover:bg-brand-600 text-white px-3 py-2">New workspace</button></Card>
      </div>
      {openNew && (
        <Card className="p-6">
          <div className="text-sm font-semibold">Create workspace</div><div className="text-xs text-ink-3 mb-4">Set up business identity and targeting in 30 seconds.</div>
          <div className="grid md:grid-cols-2 gap-3">{[['Business name',Building2],['Category','Building2'],['Website',Globe],['Email',Mail],['Phone',Phone],['Target city',MapPin]].map(([l,I],i)=>{const Ic=typeof I==='string'?Building2:I; return (<div key={l} className="glass rounded-xl px-3 py-2.5 flex items-center gap-2"><Ic className="size-4 text-ink-3"/><input placeholder={l} className="bg-transparent outline-none flex-1 text-sm"/></div>);})}</div>
          <div className="mt-4 flex gap-2 justify-end"><button onClick={()=>setOpenNew(false)} className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5">Cancel</button><button onClick={()=>setOpenNew(false)} className="text-xs rounded-xl bg-brand-500 hover:bg-brand-600 text-white px-3 py-2">Create</button></div>
        </Card>
      )}
    </div>
  );
}
function Stat({ l, v }) { return (<div className="glass rounded-xl px-3 py-2"><div className="text-[10px] uppercase tracking-widest text-ink-3">{l}</div><div className="text-sm font-semibold mt-0.5">{v}</div></div>); }
