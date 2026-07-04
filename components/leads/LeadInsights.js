'use client';
import { useEffect, useState } from 'react';
import { Card, Pill } from '@/components/ui-kit/Glass';
import { motion } from 'framer-motion';
import { Sparkles, Globe, Target, Trophy, DollarSign, Users, Zap, Lightbulb, Bot, Calendar, Clock, MessageCircle } from 'lucide-react';

export function AIBusinessAnalysis({ lead }) {
  const signals = [
    { i: Users, l: 'Company size', v: '11–50 employees', tone: 'brand' },
    { i: Trophy, l: 'Market position', v: 'Established regional player', tone: 'emerald' },
    { i: Zap, l: 'Growth signals', v: 'Hiring 2 roles · recent site update', tone: 'amber' },
    { i: DollarSign, l: 'Est. revenue band', v: '$500K–$2M annual', tone: 'cyan' },
  ];
  const tones = { brand:'text-brand-300 bg-brand-500/15', emerald:'text-accent-emerald bg-accent-emerald/15', amber:'text-accent-amber bg-accent-amber/15', cyan:'text-accent-cyan bg-accent-cyan/15' };
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-1"><div className="text-sm font-semibold flex items-center gap-2"><Bot className="size-4 text-brand-300"/>AI business analysis</div><Pill tone="brand">Auto-generated</Pill></div>
      <div className="text-xs text-ink-3 mb-4">Public data + AI reasoning · verify before quoting</div>
      <p className="text-sm text-ink-2 leading-relaxed">{lead.business} operates in the {lead.category} space with a strong local reputation ({lead.rating}★ across {lead.reviews} reviews) in {lead.city}. Based on public signals — review volume, active social presence, and website updates — they show a consistent growth trajectory over the past 6 months.</p>
      <div className="mt-4 grid grid-cols-2 gap-2">{signals.map((s,i)=>{const Ic=s.i; return (<div key={i} className="glass rounded-xl p-3 flex items-start gap-2.5"><div className={`size-8 rounded-lg grid place-items-center shrink-0 ${tones[s.tone]}`}><Ic className="size-4"/></div><div className="min-w-0"><div className="text-[11px] uppercase tracking-widest text-ink-3">{s.l}</div><div className="text-sm font-medium truncate">{s.v}</div></div></div>);})}</div>
    </Card>
  );
}

export function WebsiteAnalysis({ lead }) {
  const items = [
    { l: 'SEO health', v: 72, tone: 'emerald' },
    { l: 'Mobile UX', v: 58, tone: 'amber' },
    { l: 'Page speed', v: 84, tone: 'brand' },
    { l: 'Conversion signals', v: 41, tone: 'rose' },
  ];
  const tones = { brand:'#6E45FE', emerald:'#34D399', amber:'#FBBF24', rose:'#FB7185' };
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-1"><div className="text-sm font-semibold flex items-center gap-2"><Globe className="size-4 text-accent-cyan"/>Website analysis</div>{lead.website ? <Pill tone="cyan">{lead.website}</Pill> : <Pill tone="muted">No website</Pill>}</div>
      <div className="text-xs text-ink-3 mb-4">AI heuristic audit · lower scores are opportunities</div>
      {!lead.website ? (
        <div className="glass rounded-xl p-4 text-sm"><span className="text-accent-amber font-medium">Opportunity:</span> No website detected — lead this conversation with a “website in 7 days” angle.</div>
      ) : (
        <div className="space-y-3">{items.map(it => (
          <div key={it.l}><div className="flex justify-between text-xs mb-1"><span className="text-ink-2">{it.l}</span><span className="font-medium">{it.v}/100</span></div><div className="h-1.5 rounded-full bg-white/5 overflow-hidden"><motion.div initial={{width:0}} animate={{width:`${it.v}%`}} transition={{duration:0.6}} className="h-full rounded-full" style={{background:tones[it.tone]}}/></div></div>
        ))}</div>
      )}
    </Card>
  );
}

export function SalesSuggestions({ lead }) {
  const suggestions = [
    { emoji: '🎯', title: 'Lead with a niche success story', body: `Reference a similar ${lead.category} client in ${lead.city} who saw measurable ROI — immediately signals “we get you”.` },
    { emoji: '⭐️', title: 'Anchor on their reputation', body: `Open with a specific compliment: ${lead.rating}★ across ${lead.reviews} reviews is genuinely impressive.` },
    { emoji: '⚡', title: 'Offer a free 15-min audit', body: 'Low-commitment, high-value hook. Owners in this segment almost always accept.' },
    { emoji: '👤', title: 'Bypass gatekeeper if needed', body: `Owner (${lead.owner}) is the decision maker — target directly on WhatsApp or LinkedIn.` },
  ];
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-1"><div className="text-sm font-semibold flex items-center gap-2"><Lightbulb className="size-4 text-accent-amber"/>Sales suggestions</div><Pill tone="amber">4 ideas</Pill></div>
      <div className="text-xs text-ink-3 mb-4">Custom-crafted plays for this specific lead</div>
      <div className="space-y-2">{suggestions.map((s,i)=>(<div key={i} className="glass rounded-xl p-3 flex gap-3"><div className="text-lg leading-none">{s.emoji}</div><div className="min-w-0"><div className="text-sm font-medium">{s.title}</div><div className="text-xs text-ink-3 mt-0.5">{s.body}</div></div></div>))}</div>
    </Card>
  );
}

export function CompetitorInsights({ lead }) {
  const comps = [
    { name: 'Anderson & Co.', v: 4.6, r: 812, edge: 'Higher review velocity' },
    { name: 'Prime Studio', v: 4.4, r: 604, edge: 'Younger clientele' },
    { name: 'Nova Group', v: 4.7, r: 1120, edge: 'Better SEO ranking' },
  ];
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-1"><div className="text-sm font-semibold flex items-center gap-2"><Target className="size-4 text-accent-rose"/>Competitor insights</div><Pill tone="rose">Local rivals</Pill></div>
      <div className="text-xs text-ink-3 mb-4">Top 3 competitors in {lead.city}</div>
      <div className="space-y-2">{comps.map(c=>(<div key={c.name} className="glass rounded-xl p-3 flex items-center gap-3"><div className="size-8 rounded-lg bg-white/5 grid place-items-center text-[11px] font-semibold">{c.name.slice(0,2).toUpperCase()}</div><div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{c.name}</div><div className="text-[11px] text-ink-3">{c.edge}</div></div><Pill tone="muted">{c.v}★ · {c.r}</Pill></div>))}</div>
    </Card>
  );
}

export function AIFollowUp({ lead }) {
  return (
    <Card className="p-5 border-brand-500/20">
      <div className="flex items-center justify-between mb-1"><div className="text-sm font-semibold flex items-center gap-2"><Sparkles className="size-4 text-brand-300"/>AI follow-up</div><Pill tone="brand">Suggested</Pill></div>
      <div className="text-xs text-ink-3 mb-4">What to do next — never sent automatically</div>
      <div className="space-y-2">
        <SuggestionRow icon={Calendar} tone="brand" title="Next follow-up" body="Send a value-add WhatsApp in 3 days"/>
        <SuggestionRow icon={MessageCircle} tone="emerald" title="Best channel" body={`${lead.phone ? 'WhatsApp' : lead.email ? 'Email' : 'LinkedIn'} · 91% response likelihood`}/>
        <SuggestionRow icon={Clock} tone="amber" title="Best time to contact" body="Tue–Thu, 10–11 AM local time"/>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2"><a href={`/outreach`} className="text-xs rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-3 py-2.5 shadow-glow inline-flex items-center justify-center gap-1.5"><Sparkles className="size-3.5"/>Draft next message</a><button className="text-xs glass rounded-xl px-3 py-2.5 hover:bg-white/5">Schedule reminder</button></div>
    </Card>
  );
}
function SuggestionRow({ icon: Ic, tone, title, body }) {
  const tones = { brand:'text-brand-300 bg-brand-500/15', emerald:'text-accent-emerald bg-accent-emerald/15', amber:'text-accent-amber bg-accent-amber/15' };
  return (<div className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/[0.03]"><div className={`size-8 rounded-lg grid place-items-center ${tones[tone]}`}><Ic className="size-4"/></div><div className="min-w-0"><div className="text-sm font-medium">{title}</div><div className="text-xs text-ink-3">{body}</div></div></div>);
}

const TASK_DEFAULTS = [
  { id: 1, t: 'Send AI-drafted intro on WhatsApp', done: false, due: 'Today' },
  { id: 2, t: 'Prepare 3 talking points based on their reviews', done: true, due: 'Yesterday' },
  { id: 3, t: 'Schedule 15-min discovery call', done: false, due: 'This week' },
];

export function TasksTab({ leadId }) {
  const [tasks, setTasks] = useState(TASK_DEFAULTS);
  const [txt, setTxt] = useState('');
  useEffect(() => {
    try { const all = JSON.parse(localStorage.getItem('rs.tasks.v1') || '{}'); setTasks(all[leadId] || TASK_DEFAULTS); } catch {}
  }, [leadId]);
  useEffect(() => {
    try { const all = JSON.parse(localStorage.getItem('rs.tasks.v1') || '{}'); all[leadId] = tasks; localStorage.setItem('rs.tasks.v1', JSON.stringify(all)); } catch {}
  }, [tasks, leadId]);
  const add = () => { if (!txt.trim()) return; setTasks([{ id: Date.now(), t: txt.trim(), done: false, due: 'Today' }, ...tasks]); setTxt(''); };
  const toggle = (id) => setTasks(tasks.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const del = (id) => setTasks(tasks.filter(x => x.id !== id));
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4"><div><div className="text-sm font-semibold flex items-center gap-2"><Calendar className="size-4 text-accent-amber"/>Tasks</div><div className="text-xs text-ink-3">Actionable next steps for this lead</div></div><Pill tone="muted">{tasks.filter(t=>!t.done).length} open</Pill></div>
      <div className="glass rounded-xl p-3 flex items-center gap-2"><input value={txt} onChange={e=>setTxt(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')add();}} placeholder="Add a task and press ↵" className="bg-transparent outline-none flex-1 text-sm"/><button onClick={add} className="text-xs rounded-lg bg-brand-500 hover:bg-brand-600 text-white px-3 py-1.5">Add</button></div>
      <div className="mt-4 space-y-1">{tasks.map(t=>(<div key={t.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] group"><button onClick={()=>toggle(t.id)}>{t.done ? <div className="size-5 rounded-md bg-accent-emerald/20 border border-accent-emerald grid place-items-center"><span className="text-accent-emerald text-[10px]">✓</span></div> : <div className="size-5 rounded-md border-2 border-ink-4"/>}</button><div className="flex-1"><div className={`text-sm ${t.done?'line-through text-ink-3':''}`}>{t.t}</div><div className="text-[11px] text-ink-3">{t.due}</div></div><button onClick={()=>del(t.id)} className="opacity-0 group-hover:opacity-100 text-xs text-accent-rose">Delete</button></div>))}</div>
    </Card>
  );
}
