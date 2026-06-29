'use client';
import { useState } from 'react';
import { Card, Pill } from '@/components/ui-kit/Glass';
import { Bell, Check, Filter, Trash2, Sparkles, PhoneCall, Calendar, ShieldCheck, MailCheck } from 'lucide-react';
import { NOTIFICATIONS } from '@/lib/mockData';

const ICONS = { brand: Sparkles, amber: PhoneCall, cyan: Calendar, emerald: ShieldCheck };

export default function Notifications() {
  const [items, setItems] = useState(NOTIFICATIONS);
  const [tab, setTab] = useState('all');
  const view = items.filter(i => tab === 'all' ? true : tab === 'unread' ? i.unread : !i.unread);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><div className="flex gap-2"><Pill tone="brand"><Bell className="size-3"/>Notifications</Pill></div><h1 className="mt-3 text-3xl font-semibold tracking-tight">Inbox</h1><p className="text-ink-3 text-sm mt-1">Everything that needs your attention, in one place.</p></div><div className="flex gap-2"><button onClick={()=>setItems(items.map(i=>({...i,unread:false})))} className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5 inline-flex items-center gap-1.5"><MailCheck className="size-3.5"/>Mark all read</button><button onClick={()=>setItems([])} className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5 inline-flex items-center gap-1.5"><Trash2 className="size-3.5"/>Clear</button></div></div>
      <Card className="p-2 flex items-center gap-1 w-fit">{[['all','All'],['unread','Unread'],['read','Read']].map(([k,l])=>(<button key={k} onClick={()=>setTab(k)} className={`text-xs px-3 py-1.5 rounded-lg ${tab===k?'bg-white/10 text-white':'text-ink-3 hover:text-white'}`}>{l}</button>))}</Card>
      <Card className="p-2">{view.length===0 ? <div className="text-center py-16"><div className="size-16 rounded-2xl bg-brand-500/15 grid place-items-center mx-auto"><Bell className="size-7 text-brand-300"/></div><div className="mt-4 text-lg font-semibold">You’re all caught up</div><div className="text-sm text-ink-3 mt-1">New notifications will appear here.</div></div> : view.map(n=>{const Ic=ICONS[n.tone]||Sparkles; return (<div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl ${n.unread?'bg-white/[0.04]':''} hover:bg-white/[0.06]`}><div className={`size-10 rounded-xl grid place-items-center bg-${n.tone==='brand'?'brand-500':n.tone==='cyan'?'accent-cyan':n.tone==='amber'?'accent-amber':'accent-emerald'}/15`}><Ic className="size-4"/></div><div className="flex-1"><div className="flex items-center gap-2"><div className="text-sm font-medium">{n.title}</div>{n.unread && <span className="size-1.5 rounded-full bg-brand-400"/>}</div><div className="text-xs text-ink-3 mt-0.5">{n.body}</div></div><div className="text-[11px] text-ink-3 shrink-0">{n.when} ago</div></div>);})}</Card>
    </div>
  );
}
