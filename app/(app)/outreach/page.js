'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Card, Pill } from '@/components/ui-kit/Glass';
import { Empty } from '@/components/ui-kit/Empty';
import { LEADS } from '@/lib/mockData';
import { getProfile, generateOutreach, saveOutreach, getOutreach } from '@/lib/profile';
import { MessageCircle, Mail, MessageSquare, Linkedin, Phone, Sparkles, Copy, Check, Send, ShieldAlert, Clock, ChevronRight, Search, Users, Radar } from 'lucide-react';
import { toast } from 'sonner';

const CHANNELS = [
  { k: 'whatsapp', l: 'WhatsApp', icon: MessageCircle, tone: 'emerald', color: 'text-accent-emerald bg-accent-emerald/15' },
  { k: 'email', l: 'Email', icon: Mail, tone: 'brand', color: 'text-brand-300 bg-brand-500/15' },
  { k: 'sms', l: 'SMS', icon: MessageSquare, tone: 'cyan', color: 'text-accent-cyan bg-accent-cyan/15' },
  { k: 'linkedin', l: 'LinkedIn', icon: Linkedin, tone: 'sky', color: 'text-accent-sky bg-accent-sky/15' },
  { k: 'call', l: 'Manual Call', icon: Phone, tone: 'amber', color: 'text-accent-amber bg-accent-amber/15' },
];

export default function Outreach() {
  const [profile, setProfile] = useState(null);
  const [q, setQ] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [channel, setChannel] = useState('whatsapp');
  const [content, setContent] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState({});

  useEffect(() => {
    setProfile(getProfile());
    setHistory(getOutreach());
    const onP = () => setProfile(getProfile());
    const onO = () => setHistory(getOutreach());
    window.addEventListener('rs:profile', onP);
    window.addEventListener('rs:outreach', onO);
    return () => { window.removeEventListener('rs:profile', onP); window.removeEventListener('rs:outreach', onO); };
  }, []);

  const filtered = useMemo(() => LEADS.filter(l => (l.business + l.owner + l.city + l.category).toLowerCase().includes(q.toLowerCase())).slice(0, 40), [q]);
  const lead = selectedId ? LEADS.find(l => l.id === selectedId) : null;

  const generate = () => {
    if (!lead) return;
    setGenerating(true); setContent('');
    setTimeout(() => {
      const msg = generateOutreach({ channel, lead, profile });
      setContent(msg);
      setGenerating(false);
      toast.success('AI draft ready — review before sending');
    }, 900);
  };

  const copy = () => { navigator.clipboard.writeText(content); setCopied(true); setTimeout(()=>setCopied(false), 1500); toast.success('Copied to clipboard'); };
  const save = () => { if (!lead || !content) return; saveOutreach(lead.id, channel, content); toast.success('Saved to outreach history'); };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex gap-2"><Pill tone="brand"><Sparkles className="size-3"/>Outreach Center</Pill><Pill tone="amber"><ShieldAlert className="size-3"/>Nothing is sent automatically</Pill></div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">AI-personalized outreach</h1>
          <p className="text-ink-3 text-sm mt-1">Select a lead, choose a channel, review the AI draft, then send it manually.</p>
        </div>
        {!profile && <Link href="/dashboard" className="text-xs rounded-xl bg-brand-500 hover:bg-brand-600 text-white px-3 py-2 inline-flex items-center gap-1.5 shadow-glow font-semibold">Complete setup first<ChevronRight className="size-3.5"/></Link>}
      </div>

      <div className="grid lg:grid-cols-[360px_1fr] gap-4">
        <div className="space-y-3">
          <Card className="p-3">
            <div className="flex items-center gap-2 glass rounded-xl px-3 py-2"><Search className="size-4 text-ink-3"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search leads to reach out…" className="bg-transparent outline-none flex-1 text-sm"/></div>
          </Card>
          <Card className="p-2 max-h-[62vh] overflow-y-auto scrollbar-thin">
            {filtered.length === 0 ? (<div className="text-center py-10 text-sm text-ink-3">No leads match</div>) : filtered.map(l => {
              const active = l.id === selectedId;
              const has = history[l.id];
              return (
                <button key={l.id} onClick={()=>{setSelectedId(l.id); setContent('');}} className={`w-full text-left flex items-center gap-3 p-2.5 rounded-xl ${active?'bg-white/[0.07]':'hover:bg-white/[0.04]'}`}>
                  <div className="size-9 rounded-lg grid place-items-center text-[11px] font-semibold text-white shrink-0" style={{background:'linear-gradient(135deg,#6E45FE,#22D3EE)'}}>{l.business.slice(0,2).toUpperCase()}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{l.business}</div>
                    <div className="text-[11px] text-ink-3 truncate">{l.owner} · {l.city} · {l.category}</div>
                  </div>
                  {has && <Pill tone="emerald">Drafted</Pill>}
                  {l.hot && !has && <Pill tone="rose">Hot</Pill>}
                </button>
              );
            })}
          </Card>
        </div>

        {!lead ? (
          <Empty icon={Sparkles} title="Pick a lead to start" desc="Select any lead on the left. AI will craft a personalized message tailored to their business — you decide whether to send it." action={<Link href="/leads" className="text-sm rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-4 py-2 shadow-glow inline-flex items-center gap-1.5"><Users className="size-4"/>Browse all leads</Link>}/>
        ) : (
          <div className="space-y-4">
            <Card className="p-5 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-24 bg-aurora opacity-20 blur-3xl pointer-events-none"/>
              <div className="relative flex flex-wrap items-start gap-4">
                <div className="size-14 rounded-2xl grid place-items-center text-base font-semibold text-white shadow-glow" style={{background:'linear-gradient(135deg,#6E45FE,#22D3EE)'}}>{lead.business.slice(0,2).toUpperCase()}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap"><h2 className="text-lg font-semibold">{lead.business}</h2>{lead.hot && <Pill tone="rose">🔥 Hot</Pill>}<Pill tone="muted">{lead.category}</Pill></div>
                  <div className="text-xs text-ink-3 mt-1">{lead.owner} · {lead.city} · {lead.rating}★ {lead.reviews} reviews</div>
                </div>
                <Link href={`/leads/${lead.id}`} className="text-xs text-brand-300 inline-flex items-center gap-1">Open lead<ChevronRight className="size-3"/></Link>
              </div>
            </Card>

            <Card className="p-3">
              <div className="flex flex-wrap gap-1">{CHANNELS.map(c=>{const Ic=c.icon; const active=channel===c.k; return (
                <button key={c.k} onClick={()=>{setChannel(c.k); setContent('');}} className={`inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl ${active?'bg-white/[0.07] text-white':'text-ink-3 hover:text-white hover:bg-white/[0.03]'}`}><span className={`size-6 rounded-md grid place-items-center ${c.color}`}><Ic className="size-3.5"/></span>AI {c.l}</button>
              );})}</div>
            </Card>

            {channel === 'call' ? (
              <Card className="p-6">
                <div className="flex items-center gap-3"><div className="size-12 rounded-2xl bg-amber-500/15 text-accent-amber grid place-items-center"><Phone className="size-5"/></div><div><div className="text-lg font-semibold">Manual call script</div><div className="text-xs text-ink-3">AI never dials — use this script when you’re ready.</div></div></div>
                <div className="mt-4 space-y-2">
                  <ScriptStep n={1} title="Opener" body={`Hi ${(lead.owner||'').split(' ')[0]||'there'}, this is ${profile?.founder||'Vikram'} from ${profile?.name||'RocketShip'}. Got a quick minute?`}/>
                  <ScriptStep n={2} title="Reason for the call" body={`I came across ${lead.business} on Google (${lead.rating}★, ${lead.reviews} reviews) — impressive footprint in ${lead.city}. Wanted to reach out with an idea specific to ${lead.category || 'your industry'}.`}/>
                  <ScriptStep n={3} title="Value" body={`We help teams like yours convert more inbound interest into paying customers without spending more on ads. Two of our ${lead.category||''} clients saw a 2–4x lift within 60 days.`}/>
                  <ScriptStep n={4} title="Ask" body={`Would a 15-minute call this week make sense to share the exact approach? I promise no pitch — just ideas.`}/>
                  <ScriptStep n={5} title="Objection handler" body={`Totally fair. Most owners tell me they’re “already doing marketing” — what we do is complementary. Worst case, you leave with 2 new ideas.`}/>
                </div>
                {lead.phone && <div className="mt-4 flex items-center gap-2"><a href={`tel:${lead.phone.replace(/[^0-9+]/g,'')}`} className="text-sm rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-4 py-2.5 shadow-glow inline-flex items-center gap-1.5"><Phone className="size-4"/>Dial {lead.phone}</a><Pill tone="amber">Manual only</Pill></div>}
              </Card>
            ) : (
              <Card className="p-5">
                <div className="flex items-center justify-between mb-3"><div><div className="text-sm font-semibold">AI draft · {CHANNELS.find(c=>c.k===channel)?.l}</div><div className="text-xs text-ink-3">Personalized to {lead.business} using your business profile. Review before sending.</div></div><button onClick={generate} disabled={generating} className="text-xs rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-70 text-white font-semibold px-3 py-2 shadow-glow inline-flex items-center gap-1.5">{generating ? <span className="size-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"/> : <Sparkles className="size-3.5"/>}{content ? 'Regenerate' : 'Generate with AI'}</button></div>
                {generating ? (<div className="space-y-2"><div className="h-3 rounded bg-white/5 animate-pulse"/><div className="h-3 rounded bg-white/5 animate-pulse w-11/12"/><div className="h-3 rounded bg-white/5 animate-pulse w-4/5"/><div className="h-3 rounded bg-white/5 animate-pulse w-2/3"/></div>) : content ? (
                  <div className="glass rounded-2xl p-4"><textarea value={content} onChange={e=>setContent(e.target.value)} rows={channel==='email'?12:6} className="w-full bg-transparent outline-none text-sm resize-none whitespace-pre-line leading-relaxed"/></div>
                ) : (
                  <div className="glass rounded-2xl p-6 text-center border border-dashed border-line"><div className="size-12 rounded-2xl bg-brand-500/15 grid place-items-center mx-auto"><Sparkles className="size-5 text-brand-300"/></div><div className="mt-3 text-sm font-medium">Click Generate to draft a message</div><div className="text-xs text-ink-3 mt-1">AI will not send anything — you’re always in control.</div></div>
                )}
                {content && (<div className="mt-4 flex flex-wrap items-center gap-2">
                  <button onClick={copy} className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5 inline-flex items-center gap-1.5">{copied?<Check className="size-3.5 text-accent-emerald"/>:<Copy className="size-3.5"/>}Copy</button>
                  <button onClick={save} className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5 inline-flex items-center gap-1.5"><Send className="size-3.5"/>Mark as sent</button>
                  {channel==='whatsapp' && lead.phone && <a target="_blank" rel="noreferrer" href={`https://wa.me/${lead.phone.replace(/[^0-9]/g,'')}?text=${encodeURIComponent(content)}`} className="text-xs rounded-xl bg-accent-emerald/20 border border-accent-emerald/40 text-accent-emerald px-3 py-2 inline-flex items-center gap-1.5"><MessageCircle className="size-3.5"/>Open WhatsApp</a>}
                  {channel==='email' && lead.email && <a href={`mailto:${lead.email}?subject=${encodeURIComponent('Idea for '+lead.business)}&body=${encodeURIComponent(content)}`} className="text-xs rounded-xl bg-brand-500/20 border border-brand-500/40 text-brand-200 px-3 py-2 inline-flex items-center gap-1.5"><Mail className="size-3.5"/>Open Email</a>}
                  {channel==='sms' && lead.phone && <a href={`sms:${lead.phone.replace(/[^0-9+]/g,'')}?body=${encodeURIComponent(content)}`} className="text-xs rounded-xl bg-accent-cyan/20 border border-accent-cyan/40 text-accent-cyan px-3 py-2 inline-flex items-center gap-1.5"><MessageSquare className="size-3.5"/>Open SMS</a>}
                  <div className="ml-auto text-[11px] text-ink-3 inline-flex items-center gap-1.5"><Clock className="size-3"/>Best time: Tue–Thu, 10–11 AM local</div>
                </div>)}
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ScriptStep({ n, title, body }) {
  return (<div className="flex gap-3 p-3 rounded-xl hover:bg-white/[0.03]"><div className="size-7 rounded-lg bg-brand-500/15 text-brand-300 grid place-items-center text-xs font-semibold shrink-0">{n}</div><div className="flex-1"><div className="text-xs uppercase tracking-widest text-ink-3">{title}</div><div className="text-sm mt-0.5 leading-relaxed">{body}</div></div></div>);
}
