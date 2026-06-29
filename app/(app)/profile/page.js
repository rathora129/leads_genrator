'use client';
import { Card, Pill } from '@/components/ui-kit/Glass';
import { Mail, Phone, Building2, Shield, Monitor, Smartphone, Tablet, Key } from 'lucide-react';

export default function Profile() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><div className="flex gap-2"><Pill tone="brand">Profile</Pill></div><h1 className="mt-3 text-3xl font-semibold tracking-tight">My profile</h1><p className="text-ink-3 text-sm mt-1">Your account, security and active sessions.</p></div></div>
      <Card className="p-6 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-32 bg-aurora opacity-30 blur-2xl"/>
        <div className="relative flex flex-col md:flex-row md:items-center gap-5">
          <span className="size-24 rounded-3xl bg-aurora grid place-items-center text-3xl font-semibold shadow-glow">VS</span>
          <div className="flex-1"><h2 className="text-2xl font-semibold">Vikram Singh Rathore</h2><div className="text-sm text-ink-3 mt-0.5">Chief Executive Officer · Bhavya Enterprises</div><div className="mt-3 flex flex-wrap gap-2"><Pill tone="emerald">Verified</Pill><Pill tone="brand">Pro plan</Pill><Pill tone="cyan">Early access</Pill></div></div>
          <div className="grid grid-cols-3 gap-3 text-center">{[['184','Clients'],['$2.4M','Revenue'],['97%','Retention']].map(([v,l])=>(<div key={l} className="glass rounded-2xl px-4 py-3"><div className="text-xl font-semibold">{v}</div><div className="text-[11px] text-ink-3 uppercase tracking-widest">{l}</div></div>))}</div>
        </div>
      </Card>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5"><div className="text-sm font-semibold mb-3">Contact</div>{[[Mail,'vikram@rocketship.ai'],[Phone,'+91 98765 43210'],[Building2,'Bhavya Enterprises']].map(([I,v],i)=>(<div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03]"><div className="size-8 rounded-lg glass grid place-items-center"><I className="size-4 text-ink-3"/></div><span className="text-sm">{v}</span></div>))}</Card>
        <Card className="p-5"><div className="text-sm font-semibold mb-3">Security</div>{[['Two-factor auth','Enabled · Authenticator app','emerald'],['Recovery codes','Generated 14 days ago','muted'],['Password','Last changed 2 months ago','amber']].map(([t,d,tone])=>(<div key={t} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03]"><div className="flex items-center gap-3"><div className="size-8 rounded-lg glass grid place-items-center"><Shield className="size-4 text-ink-3"/></div><div><div className="text-sm font-medium">{t}</div><div className="text-[11px] text-ink-3">{d}</div></div></div><Pill tone={tone}>{tone==='emerald'?'On':'Manage'}</Pill></div>))}</Card>
        <Card className="p-5"><div className="text-sm font-semibold mb-3">Preferences</div>{['Email digests','Sound on actions','Reduced motion','Compact tables'].map(p=>(<label key={p} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.03]"><span className="text-sm">{p}</span><input type="checkbox" defaultChecked className="size-4 accent-brand-500"/></label>))}</Card>
      </div>
      <Card className="p-5"><div className="flex items-center justify-between mb-3"><div><div className="text-sm font-semibold">Active sessions</div><div className="text-xs text-ink-3">Devices currently signed in</div></div><button className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5">Sign out all</button></div><div className="divide-y divide-line">{[[Monitor,'MacBook Pro 16"','Mumbai · Chrome','Active now',true],[Smartphone,'iPhone 15 Pro','Delhi · iOS App','2h ago',false],[Tablet,'iPad Air','Bengaluru · Safari','Yesterday',false]].map(([I,n,l,t,cur],i)=>(<div key={i} className="flex items-center justify-between py-3"><div className="flex items-center gap-3"><div className="size-10 rounded-xl glass grid place-items-center"><I className="size-4"/></div><div><div className="text-sm font-medium flex items-center gap-2">{n}{cur && <Pill tone="emerald">This device</Pill>}</div><div className="text-[11px] text-ink-3">{l} · {t}</div></div></div>{!cur && <button className="text-xs text-accent-rose hover:underline">Revoke</button>}</div>))}</div></Card>
    </div>
  );
}
