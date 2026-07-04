'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Building2, Wrench, Target, MapPin, User, ArrowRight, ArrowLeft, Check, Sparkles, X, Plus } from 'lucide-react';
import { saveProfile } from '@/lib/profile';
import { toast } from 'sonner';

const STEPS = [
  { k: 'business', label: 'Your business', icon: Building2 },
  { k: 'services', label: 'What you offer', icon: Wrench },
  { k: 'industries', label: 'Target industries', icon: Target },
  { k: 'locations', label: 'Target locations', icon: MapPin },
  { k: 'ideal', label: 'Ideal customer', icon: User },
];
const SUGGESTED_INDUSTRIES = ['Restaurants','Dental Clinics','Real Estate','Gyms & Fitness','Law Firms','Salons & Spa','Auto Repair','E-commerce','Marketing Agencies','Software','Hotels','Construction','Coaching','Healthcare'];
const SUGGESTED_LOCATIONS = ['Mumbai, IN','Delhi, IN','Bengaluru, IN','Dubai, UAE','Singapore','London, UK','New York, US','Toronto, CA','Berlin, DE','Sydney, AU','Tokyo, JP','Riyadh, SA'];

export default function BusinessWizard({ open, onClose, onDone }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: '', founder: '', tagline: '', services: [], industries: [], locations: [], ideal: '' });
  const [servInput, setServInput] = useState('');
  const set = (k, v) => setData({ ...data, [k]: v });
  const toggle = (k, v) => setData(d => ({ ...d, [k]: d[k].includes(v) ? d[k].filter(x => x !== v) : [...d[k], v] }));
  const canNext = () => {
    if (step === 0) return data.name.trim().length > 1;
    if (step === 1) return data.services.length > 0;
    if (step === 2) return data.industries.length > 0;
    if (step === 3) return data.locations.length > 0;
    if (step === 4) return data.ideal.trim().length > 3;
    return true;
  };
  const finish = () => { saveProfile({ ...data, createdAt: Date.now() }); toast.success(`Welcome, ${data.name}!`, { description: 'Your AI Sales OS is ready.' }); onDone?.(); };
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-md grid place-items-center p-4">
          <motion.div initial={{scale:.96,opacity:0,y:12}} animate={{scale:1,opacity:1,y:0}} exit={{scale:.96,opacity:0}} className="w-full max-w-2xl glass-strong rounded-3xl overflow-hidden shadow-pop">
            <div className="relative p-6 border-b border-line">
              <div className="absolute -inset-x-10 -top-16 h-32 bg-aurora opacity-25 blur-3xl pointer-events-none"/>
              <button onClick={onClose} className="absolute top-4 right-4 size-8 grid place-items-center rounded-lg hover:bg-white/5 text-ink-3"><X className="size-4"/></button>
              <div className="relative flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-aurora grid place-items-center shadow-glow"><Rocket className="size-5 text-white"/></div>
                <div><div className="text-xs uppercase tracking-[0.18em] text-brand-300 font-medium">Setup · {step + 1} of {STEPS.length}</div><div className="text-xl font-semibold tracking-tight">Let’s get to know your business</div></div>
              </div>
              <div className="relative mt-4 flex gap-1.5">{STEPS.map((s,i)=>(<div key={s.k} className={`flex-1 h-1 rounded-full ${i<=step?'bg-brand-500':'bg-white/10'}`}/>))}</div>
              <div className="relative mt-4 grid grid-cols-5 gap-1">{STEPS.map((s,i)=>{const Ic=s.icon; const done=i<step; const active=i===step; return (<button key={s.k} onClick={()=>i<=step && setStep(i)} className={`flex flex-col items-center gap-1.5 py-2 rounded-xl text-[10px] uppercase tracking-widest ${active?'text-white':done?'text-ink-2':'text-ink-4'}`}><div className={`size-8 rounded-lg grid place-items-center ${done?'bg-emerald-500/20 text-accent-emerald':active?'bg-brand-500/20 text-brand-300':'bg-white/5 text-ink-3'}`}>{done?<Check className="size-4"/>:<Ic className="size-4"/>}</div>{s.label}</button>);})}</div>
            </div>
            <div className="p-6 min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.2}}>
                  {step===0 && (<div className="space-y-3">
                    <div className="text-sm text-ink-3">This becomes the identity of your AI Sales OS. It powers every outreach message we generate.</div>
                    <Field label="Business name"><input autoFocus value={data.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Bhavya Enterprises" className="bg-transparent outline-none w-full text-sm"/></Field>
                    <Field label="Your name (sender)"><input value={data.founder} onChange={e=>set('founder',e.target.value)} placeholder="e.g. Vikram" className="bg-transparent outline-none w-full text-sm"/></Field>
                    <Field label="One-line description"><input value={data.tagline} onChange={e=>set('tagline',e.target.value)} placeholder="e.g. Premium real estate brokerage in Mumbai" className="bg-transparent outline-none w-full text-sm"/></Field>
                  </div>)}
                  {step===1 && (<div className="space-y-3">
                    <div className="text-sm text-ink-3">Add the products/services you offer. AI uses these to draft personalized outreach.</div>
                    <Field label="Add a service and press ↵"><input value={servInput} onChange={e=>setServInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter' && servInput.trim()){toggle('services',servInput.trim()); setServInput('');}}} placeholder="e.g. Property listings, Marketing consultation…" className="bg-transparent outline-none w-full text-sm"/></Field>
                    <div className="flex flex-wrap gap-2">{data.services.map(s=>(<span key={s} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-200">{s}<button onClick={()=>toggle('services',s)}><X className="size-3"/></button></span>))}</div>
                    <div className="pt-2"><div className="text-[10px] uppercase tracking-widest text-ink-3 mb-2">Suggestions</div><div className="flex flex-wrap gap-2">{['SEO audits','Lead generation','Website design','WhatsApp automation','Growth consulting','Paid ads'].map(s=>(<button key={s} onClick={()=>toggle('services',s)} className={`text-xs px-3 py-1.5 rounded-full border ${data.services.includes(s)?'bg-brand-500/20 border-brand-500/40 text-brand-200':'border-line text-ink-2 hover:bg-white/5'}`}>{data.services.includes(s)&&<Check className="size-3 inline mr-1"/>}{s}</button>))}</div></div>
                  </div>)}
                  {step===2 && (<div className="space-y-3">
                    <div className="text-sm text-ink-3">Which industries do you want AI to prospect for you?</div>
                    <div className="flex flex-wrap gap-2">{SUGGESTED_INDUSTRIES.map(s=>(<button key={s} onClick={()=>toggle('industries',s)} className={`text-xs px-3 py-1.5 rounded-full border ${data.industries.includes(s)?'bg-brand-500/20 border-brand-500/40 text-brand-200':'border-line text-ink-2 hover:bg-white/5'}`}>{data.industries.includes(s)&&<Check className="size-3 inline mr-1"/>}{s}</button>))}</div>
                  </div>)}
                  {step===3 && (<div className="space-y-3">
                    <div className="text-sm text-ink-3">Pick target locations. AI will focus lead discovery here.</div>
                    <div className="flex flex-wrap gap-2">{SUGGESTED_LOCATIONS.map(s=>(<button key={s} onClick={()=>toggle('locations',s)} className={`text-xs px-3 py-1.5 rounded-full border ${data.locations.includes(s)?'bg-brand-500/20 border-brand-500/40 text-brand-200':'border-line text-ink-2 hover:bg-white/5'}`}>{data.locations.includes(s)&&<Check className="size-3 inline mr-1"/>}{s}</button>))}</div>
                  </div>)}
                  {step===4 && (<div className="space-y-3">
                    <div className="text-sm text-ink-3">Describe your ideal customer in one line. This tunes AI’s tone and angle.</div>
                    <Field label="Ideal customer"><textarea rows={3} value={data.ideal} onChange={e=>set('ideal',e.target.value)} placeholder="e.g. Independent restaurant owners in Mumbai with 4★+ rating and 100+ reviews, doing $20k–$100k monthly revenue…" className="bg-transparent outline-none w-full text-sm resize-none"/></Field>
                    <div className="glass rounded-xl p-3 flex items-center gap-2.5 text-xs text-ink-2"><Sparkles className="size-3.5 text-brand-300 shrink-0"/>Everything you enter stays private. AI uses it only to draft outreach when you click Ask AI.</div>
                  </div>)}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="px-6 py-4 border-t border-line flex items-center justify-between">
              <button onClick={()=>step>0 ? setStep(step-1) : onClose()} className="text-sm text-ink-2 hover:text-white inline-flex items-center gap-1.5">{step>0 ? <><ArrowLeft className="size-4"/>Back</> : 'Skip for now'}</button>
              <button disabled={!canNext()} onClick={()=>step<STEPS.length-1 ? setStep(step+1) : finish()} className="text-sm rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 shadow-glow inline-flex items-center gap-1.5">{step===STEPS.length-1 ? <>Launch AI Sales OS<Sparkles className="size-4"/></> : <>Continue<ArrowRight className="size-4"/></>}</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }) {
  return (<div><label className="text-[11px] uppercase tracking-[0.14em] text-ink-3 font-medium">{label}</label><div className="mt-1.5 glass rounded-xl px-3 py-2.5">{children}</div></div>);
}
