'use client';
import { Card, Pill } from '@/components/ui-kit/Glass';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar, AreaChart, Area } from 'recharts';
import { Download, Printer, FileText, TrendingUp } from 'lucide-react';
import { REVENUE_SERIES } from '@/lib/mockData';

const CONV = [{n:'Visitors',v:12450},{n:'Leads',v:3210},{n:'Qualified',v:1280},{n:'Meetings',v:540},{n:'Proposals',v:240},{n:'Clients',v:92}];
const ACT = [{d:'M',v:42},{d:'T',v:58},{d:'W',v:71},{d:'T',v:64},{d:'F',v:80},{d:'S',v:35},{d:'S',v:22}];
const RADIAL = [{name:'Target',value:78,fill:'#6E45FE'}];

export default function Reports() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><div className="flex gap-2"><Pill tone="brand">Reports</Pill><Pill tone="muted">Q3 2025</Pill></div><h1 className="mt-3 text-3xl font-semibold tracking-tight">Workspace reports</h1><p className="text-ink-3 text-sm mt-1">Conversions, revenue, activity and goal tracking.</p></div>
        <div className="flex gap-2">{[['PDF',FileText],['CSV',Download],['Print',Printer]].map(([l,I])=>(<button key={l} className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5 inline-flex items-center gap-1.5"><I className="size-3.5"/>{l}</button>))}</div>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2"><div className="text-sm font-semibold">Revenue trajectory</div><div className="text-xs text-ink-3">Booked vs. target</div><div className="h-72 mt-4"><ResponsiveContainer><LineChart data={REVENUE_SERIES}><CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false}/><XAxis dataKey="m" stroke="#7F7E91" fontSize={11} tickLine={false} axisLine={false}/><YAxis stroke="#7F7E91" fontSize={11} tickLine={false} axisLine={false}/><Tooltip contentStyle={{background:'#0E0D17',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12}}/><Line type="monotone" dataKey="revenue" stroke="#6E45FE" strokeWidth={2.5} dot={{r:3}}/><Line type="monotone" dataKey="leads" stroke="#22D3EE" strokeWidth={2} dot={{r:3}}/></LineChart></ResponsiveContainer></div></Card>
        <Card className="p-5"><div className="text-sm font-semibold">Quarter goal</div><div className="text-xs text-ink-3">78% achieved</div><div className="h-56 mt-4 relative"><ResponsiveContainer><RadialBarChart innerRadius="60%" outerRadius="100%" data={RADIAL} startAngle={90} endAngle={-270}><RadialBar dataKey="value" cornerRadius={20} fill="#6E45FE"/></RadialBarChart></ResponsiveContainer><div className="absolute inset-0 grid place-items-center pointer-events-none"><div className="text-center"><div className="text-3xl font-semibold">78%</div><div className="text-xs text-ink-3">of $400K</div></div></div></div></Card>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2"><div className="text-sm font-semibold">Conversion funnel</div><div className="text-xs text-ink-3">Last 30 days</div><div className="mt-5 space-y-3">{CONV.map((c,i)=>{const w=(c.v/CONV[0].v)*100; return (<div key={c.n}><div className="flex justify-between text-xs mb-1.5"><span className="text-ink-2">{c.n}</span><span className="font-medium">{c.v.toLocaleString()}</span></div><div className="h-9 rounded-xl bg-white/[0.04] overflow-hidden relative"><div className="h-full rounded-xl flex items-center px-3 text-xs font-medium" style={{width:`${w}%`,background:`linear-gradient(90deg, hsla(${260-i*15} 90% 60%/.7), hsla(${190-i*10} 90% 60%/.4))`}}>{((c.v/CONV[Math.max(0,i-1)].v)*100).toFixed(1)}%</div></div></div>);})}</div></Card>
        <Card className="p-5"><div className="text-sm font-semibold">Weekly activity</div><div className="text-xs text-ink-3">Calls + meetings + emails</div><div className="h-56 mt-4"><ResponsiveContainer><BarChart data={ACT}><XAxis dataKey="d" stroke="#7F7E91" fontSize={11} tickLine={false} axisLine={false}/><YAxis hide/><Tooltip contentStyle={{background:'#0E0D17',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12}}/><Bar dataKey="v" radius={[8,8,0,0]} fill="#22D3EE"/></BarChart></ResponsiveContainer></div></Card>
      </div>
      <Card className="p-5"><div className="flex items-center justify-between"><div><div className="text-sm font-semibold">Top performing categories</div><div className="text-xs text-ink-3">Revenue contribution by niche</div></div><Pill tone="emerald"><TrendingUp className="size-3"/>+18.4%</Pill></div><div className="mt-4 grid md:grid-cols-3 gap-3">{['Real Estate','Dental Clinics','Software Studios','Law Firms','Boutique Hotels','Marketing Agencies'].map((c,i)=>(<div key={c} className="glass rounded-2xl p-4"><div className="text-xs text-ink-3">{c}</div><div className="text-xl font-semibold mt-1">${(80-i*8).toLocaleString()}K</div><div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden"><div className="h-full rounded-full bg-aurora" style={{width:`${80-i*8}%`}}/></div></div>))}</div></Card>
    </div>
  );
}
