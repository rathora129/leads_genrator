'use client';
import { useEffect, useState } from 'react';
import { Card, Pill } from '@/components/ui-kit/Glass';
import { LEADS } from '@/lib/mockData';
import { getProfile } from '@/lib/profile';
import { Building2, MapPin, TrendingUp, ArrowUpRight, CheckCircle2, Circle, Sparkles, CalendarClock, Rocket, Radar } from 'lucide-react';
import Link from 'next/link';

export function TopIndustriesWidget() {
  const map = {};
  LEADS.forEach(l => { map[l.category] = (map[l.category] || 0) + 1; });
  const top = Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0, 6);
  const max = top[0]?.[1] || 1;
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-1"><div className="text-sm font-semibold">Top industries</div><Pill tone="brand"><Building2 className="size-3"/>{top.length}</Pill></div>
      <div className="text-xs text-ink-3 mb-4">Best-performing verticals by lead volume</div>
      <div className="space-y-2.5">{top.map(([cat, n], i) => (
        <div key={cat}>
          <div className="flex items-center justify-between text-xs mb-1"><span className="text-ink-2">{cat}</span><span className="font-medium">{n} leads</span></div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${(n/max)*100}%`, background: `linear-gradient(90deg, hsla(${260-i*20} 90% 60%/.9), hsla(${190-i*15} 90% 60%/.5))` }}/></div>
        </div>
      ))}</div>
    </Card>
  );
}

export function TopCitiesWidget() {
  const map = {};
  LEADS.forEach(l => { map[l.city] = (map[l.city] || 0) + 1; });
  const top = Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0, 6);
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-1"><div className="text-sm font-semibold">Top cities</div><Pill tone="cyan"><MapPin className="size-3"/>{top.length}</Pill></div>
      <div className="text-xs text-ink-3 mb-4">Where your leads live right now</div>
      <div className="grid grid-cols-2 gap-2">{top.map(([city, n], i) => (
        <div key={city} className="glass rounded-xl px-3 py-2.5 flex items-center gap-2.5">
          <div className="size-8 rounded-lg grid place-items-center text-[10px] font-semibold text-white" style={{background:`linear-gradient(135deg, hsl(${260-i*30} 80% 60%), hsl(${200-i*20} 80% 60%))`}}>{city.slice(0,2).toUpperCase()}</div>
          <div className="min-w-0"><div className="text-xs font-medium truncate">{city}</div><div className="text-[11px] text-ink-3">{n} leads</div></div>
        </div>
      ))}</div>
    </Card>
  );
}

export function TodayTasksWidget() {
  const [tasks, setTasks] = useState([
    { id: 1, t: 'Call Reddy Dental at 2:30 PM', d: 'Discovery call', done: false, tone: 'amber' },
    { id: 2, t: 'Follow-up email to Iyer Realty', d: 'Proposal v2', done: false, tone: 'brand' },
    { id: 3, t: 'Prep proposal for Nova Boutique', d: 'Due today', done: true, tone: 'emerald' },
    { id: 4, t: 'Draft WhatsApp for 12 fresh leads', d: 'AI-generated', done: false, tone: 'cyan' },
  ]);
  const done = tasks.filter(t => t.done).length;
  const toggle = (id) => setTasks(tasks.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const tones = { brand:'text-brand-300', cyan:'text-accent-cyan', amber:'text-accent-amber', emerald:'text-accent-emerald' };
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-1"><div className="text-sm font-semibold">Today’s tasks</div><Pill tone="muted">{done}/{tasks.length}</Pill></div>
      <div className="text-xs text-ink-3 mb-4">Everything you committed to today</div>
      <div className="space-y-1.5">{tasks.map(t => (
        <button key={t.id} onClick={()=>toggle(t.id)} className="w-full flex items-start gap-3 p-2 rounded-xl hover:bg-white/[0.03] text-left">
          {t.done ? <CheckCircle2 className={`size-5 shrink-0 ${tones[t.tone]}`}/> : <Circle className="size-5 shrink-0 text-ink-3"/>}
          <div className="flex-1 min-w-0"><div className={`text-sm ${t.done?'line-through text-ink-3':''}`}>{t.t}</div><div className="text-[11px] text-ink-3 mt-0.5">{t.d}</div></div>
        </button>
      ))}</div>
    </Card>
  );
}

export function FollowUpsWidget() {
  const items = [
    { name: 'Khan Auto Repair', when: 'Today · 3:30 PM', reason: 'Discovery call' },
    { name: 'Reddy Dental', when: 'Today · 5:00 PM', reason: 'Proposal review' },
    { name: 'Iyer Realty', when: 'Tomorrow · 11:00 AM', reason: 'Follow-up email' },
    { name: 'Nova Boutique', when: 'Fri · 2:00 PM', reason: 'Site visit' },
  ];
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-1"><div className="text-sm font-semibold">Upcoming follow-ups</div><CalendarClock className="size-4 text-ink-3"/></div>
      <div className="text-xs text-ink-3 mb-4">AI-scheduled next touchpoints</div>
      <div className="space-y-3">{items.map(i => (
        <div key={i.name} className="flex items-center gap-3"><div className="size-9 rounded-xl bg-amber-500/15 text-accent-amber grid place-items-center"><CalendarClock className="size-4"/></div><div className="flex-1"><div className="text-sm font-medium">{i.name}</div><div className="text-[11px] text-ink-3">{i.when} · {i.reason}</div></div><button className="text-xs text-brand-300">Snooze</button></div>
      ))}</div>
    </Card>
  );
}

export function ProfileBanner() {
  const [p, setP] = useState(null);
  useEffect(() => { setP(typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem('rs.profile.v1') || 'null')) : null); const on = () => setP(JSON.parse(localStorage.getItem('rs.profile.v1') || 'null')); window.addEventListener('rs:profile', on); return () => window.removeEventListener('rs:profile', on); }, []);
  if (!p) return (
    <Card className="p-5 relative overflow-hidden border-brand-500/30">
      <div className="absolute inset-x-0 top-0 h-24 bg-aurora opacity-20 blur-3xl pointer-events-none"/>
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><div className="size-11 rounded-2xl bg-aurora grid place-items-center shadow-glow"><Rocket className="size-5 text-white"/></div><div><div className="text-sm font-semibold">Set up your AI Sales OS in 60 seconds</div><div className="text-xs text-ink-3">Answer 5 questions and unlock personalized lead discovery + outreach.</div></div></div>
        <button onClick={()=>window.dispatchEvent(new Event('rs:openWizard'))} className="text-sm rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-4 py-2.5 shadow-glow inline-flex items-center gap-1.5"><Sparkles className="size-4"/>Start setup</button>
      </div>
    </Card>
  );
  return (
    <Card className="p-5 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-24 bg-aurora opacity-20 blur-3xl pointer-events-none"/>
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><div className="size-11 rounded-2xl bg-aurora grid place-items-center shadow-glow font-semibold">{(p.name||'?').slice(0,2).toUpperCase()}</div><div><div className="text-sm font-semibold">{p.name}</div><div className="text-xs text-ink-3 truncate max-w-md">{p.tagline || `${(p.services||[]).slice(0,2).join(', ')} · targeting ${(p.industries||[]).slice(0,2).join(', ')||'—'}`}</div></div></div>
        <div className="flex gap-2"><Link href="/lead-finder" className="text-xs rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-3 py-2 shadow-glow inline-flex items-center gap-1.5"><Radar className="size-3.5"/>Discover leads</Link><button onClick={()=>window.dispatchEvent(new Event('rs:openWizard'))} className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5">Edit profile</button></div>
      </div>
    </Card>
  );
}
