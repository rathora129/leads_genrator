'use client';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Sparkles, Flame, PhoneCall, CalendarClock, Users, Target, CircleDollarSign, Plus, ArrowUpRight, Bell, FileText, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { KPIS, REVENUE_SERIES, PIE_DATA, ACTIVITIES, LEADS } from '@/lib/mockData';
import { Card, Pill, Section } from '@/components/ui-kit/Glass';

const ICON = { Sparkles, Flame, PhoneCall, CalendarClock, Users, Target, CircleDollarSign, TrendingUp, FileText, CheckCircle2, Plus };
const TONE = { brand: 'text-brand-300 bg-brand-500/15', rose: 'text-accent-rose bg-accent-rose/15', amber: 'text-accent-amber bg-accent-amber/15', cyan: 'text-accent-cyan bg-accent-cyan/15', emerald: 'text-accent-emerald bg-accent-emerald/15' };

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl p-6 lg:p-8 glass-strong">
        <div className="absolute -inset-32 bg-aurora opacity-25 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2"><Pill tone="brand"><Sparkles className="size-3" />Mon, Jun 30</Pill><Pill tone="emerald">All systems normal</Pill></div>
            <h1 className="mt-3 text-3xl lg:text-4xl font-semibold tracking-tight">Good morning, Vikram <span className="inline-block">👋</span></h1>
            <p className="text-ink-2 mt-1.5">You have <span className="text-white font-medium">7 meetings</span>, <span className="text-white font-medium">21 pending calls</span> and <span className="text-white font-medium">142 fresh leads</span> waiting today.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2.5 shadow-glow"><Plus className="size-4" />Find Leads</button>
            <button className="inline-flex items-center gap-1.5 rounded-xl glass text-sm font-medium px-4 py-2.5 hover:bg-white/5">View CRM <ArrowUpRight className="size-4" /></button>
          </div>
        </div>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {KPIS.map((k, i) => { const Icon = ICON[k.icon]; const up = !k.delta.startsWith('-'); return (
          <motion.div key={k.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card className="p-4">
              <div className="flex items-center justify-between"><div className={`size-9 rounded-xl grid place-items-center ${TONE[k.tone]}`}><Icon className="size-4" /></div><Pill tone={up ? 'emerald' : 'rose'}>{up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}{k.delta}</Pill></div>
              <div className="mt-4 text-[11px] uppercase tracking-[0.16em] text-ink-3">{k.label}</div>
              <div className="mt-1 text-2xl font-semibold tracking-tight">{k.value}</div>
            </Card>
          </motion.div>
        ); })}
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between"><div><div className="text-sm font-semibold">Revenue & Leads</div><div className="text-xs text-ink-3">Last 8 months</div></div><div className="flex gap-1 text-xs">{['1M','3M','6M','1Y','All'].map((t,i)=>(<button key={t} className={`px-2.5 py-1 rounded-md ${i===2?'bg-white/10 text-white':'text-ink-3 hover:text-white'}`}>{t}</button>))}</div></div>
          <div className="h-72 mt-4"><ResponsiveContainer width="100%" height="100%"><AreaChart data={REVENUE_SERIES}><defs><linearGradient id="g1" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#6E45FE" stopOpacity={0.6}/><stop offset="100%" stopColor="#6E45FE" stopOpacity={0}/></linearGradient><linearGradient id="g2" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#22D3EE" stopOpacity={0.4}/><stop offset="100%" stopColor="#22D3EE" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false}/><XAxis dataKey="m" stroke="#7F7E91" fontSize={11} tickLine={false} axisLine={false}/><YAxis stroke="#7F7E91" fontSize={11} tickLine={false} axisLine={false}/><Tooltip contentStyle={{ background: '#0E0D17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}/><Area type="monotone" dataKey="leads" stroke="#22D3EE" strokeWidth={2} fill="url(#g2)" /><Area type="monotone" dataKey="revenue" stroke="#6E45FE" strokeWidth={2.5} fill="url(#g1)" /></AreaChart></ResponsiveContainer></div>
        </Card>
        <Card className="p-5">
          <div className="text-sm font-semibold">Pipeline by stage</div>
          <div className="text-xs text-ink-3">Live workspace snapshot</div>
          <div className="h-56 mt-4"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={PIE_DATA} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={4} stroke="none">{PIE_DATA.map((e,i)=>(<Cell key={i} fill={e.fill}/>))}</Pie></PieChart></ResponsiveContainer></div>
          <div className="space-y-1.5">{PIE_DATA.map(p=>(<div key={p.name} className="flex items-center justify-between text-xs"><div className="flex items-center gap-2"><span className="size-2 rounded-full" style={{background:p.fill}}/>{p.name}</div><span className="text-ink-2 font-medium">{p.value}</span></div>))}</div>
        </Card>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between"><div className="text-sm font-semibold">Recent activity</div><Pill tone="muted">Live</Pill></div>
          <div className="mt-4 space-y-3">{ACTIVITIES.map((a,i)=>{ const Ic = ICON[a.icon]||CheckCircle2; return (<div key={i} className="flex items-start gap-3"><div className={`size-8 rounded-xl grid place-items-center ${TONE[a.tone]}`}><Ic className="size-4"/></div><div className="flex-1 min-w-0"><div className="text-sm"><span className="font-medium">{a.who}</span> <span className="text-ink-3">{a.what}</span> <span className="font-medium">{a.target}</span></div><div className="text-[11px] text-ink-3 mt-0.5">{a.when}</div></div></div>); })}</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between"><div className="text-sm font-semibold">Recent leads</div><button className="text-xs text-brand-300">View all</button></div>
          <div className="mt-4 space-y-2">{LEADS.slice(0,6).map(l=>(<div key={l.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5"><div className="size-9 rounded-xl grid place-items-center text-xs font-semibold text-white" style={{background:`linear-gradient(135deg,#6E45FE,#22D3EE)`}}>{l.business.slice(0,2).toUpperCase()}</div><div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{l.business}</div><div className="text-[11px] text-ink-3 truncate">{l.city} · {l.category}</div></div><Pill tone={l.hot?'rose':'muted'}>{l.hot?'Hot':l.status}</Pill></div>))}</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between"><div className="text-sm font-semibold">Upcoming follow-ups</div><Bell className="size-4 text-ink-3"/></div>
          <div className="mt-4 space-y-3">{['Khan Auto Repair','Reddy Dental','Iyer Realty','Nova Boutique'].map((n,i)=>(<div key={n} className="flex items-center gap-3"><div className="size-9 rounded-xl bg-amber-500/15 text-accent-amber grid place-items-center"><CalendarClock className="size-4"/></div><div className="flex-1"><div className="text-sm font-medium">{n}</div><div className="text-[11px] text-ink-3">Today · {2+i}:{30+i*5} PM · Discovery call</div></div><button className="text-xs text-brand-300">Snooze</button></div>))}</div>
          <div className="mt-5 p-3 rounded-xl glass"><div className="text-xs text-ink-3 mb-1.5">Quick actions</div><div className="grid grid-cols-2 gap-2">{['New lead','Schedule call','Add note','Send proposal'].map(a=>(<button key={a} className="text-xs rounded-lg border border-line py-2 hover:bg-white/5">{a}</button>))}</div></div>
        </Card>
      </div>
    </div>
  );
}
