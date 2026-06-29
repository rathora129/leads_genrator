'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, Pill } from '@/components/ui-kit/Glass';
import { Empty } from '@/components/ui-kit/Empty';
import ReminderModal from '@/components/leads/ReminderModal';
import { LEADS } from '@/lib/mockData';
import { ArrowLeft, Phone, Mail, Globe, MapPin, Star, MoreHorizontal, ExternalLink, Calendar, CalendarClock, Sparkles, Lock, Plus, MessageSquare, FileText, Clock, CheckCircle2, PhoneCall, Activity, History, Folder, Edit3, Trash2, Send, ShieldAlert, AlertCircle, Building2, User } from 'lucide-react';
import { toast } from 'sonner';

const STATUSES = ['New','Called','Call Later','Interested','Meeting','Proposal','Negotiation','Client','Closed'];

export default function LeadDetail({ params }) {
  const { id } = use(params);
  const lead = LEADS.find(l => l.id === id) || LEADS[0];
  const [tab, setTab] = useState('activity');
  const [reminder, setReminder] = useState(false);
  const [status, setStatus] = useState(lead.status);
  const [aiOpen, setAiOpen] = useState(false);
  const [notes, setNotes] = useState([
    { id: 1, text: 'Spoke briefly Tuesday — owner is the decision maker. Looking to redo brokerage CRM in Q4.', when: '2 days ago', private: true },
    { id: 2, text: 'Best to call after 11am IST. Prefers WhatsApp for follow-ups.', when: '5 days ago', private: true },
  ]);
  const [newNote, setNewNote] = useState('');
  const addNote = () => { if (!newNote.trim()) return; setNotes([{ id: Date.now(), text: newNote, when: 'just now', private: true }, ...notes]); setNewNote(''); toast.success('Private note saved', { description: 'AI will never read this.' }); };
  const timeline = [
    { i: Sparkles, t: 'AI enriched contact details', d: '3 fields updated · confidence 92%', when: '1h ago', tone: 'brand' },
    { i: PhoneCall, t: 'Outbound call — 8m 42s', d: 'Connected with owner · next steps agreed', when: '2 days ago', tone: 'emerald' },
    { i: Mail, t: 'Email sent', d: 'Subject: “Follow-up on our chat”', when: '2 days ago', tone: 'cyan' },
    { i: Calendar, t: 'Meeting scheduled', d: 'Discovery call · Fri 3:30 PM IST', when: '3 days ago', tone: 'amber' },
    { i: CheckCircle2, t: 'Status changed', d: `Moved from New → ${lead.status}`, when: '4 days ago', tone: 'muted' },
    { i: Plus, t: 'Lead added', d: 'From Lead Finder · Mumbai filter', when: '6 days ago', tone: 'brand' },
  ];
  const calls = [
    { dir: 'out', dur: '8m 42s', when: '2 days ago, 3:42 PM', outcome: 'Connected', note: 'Owner interested, send proposal' },
    { dir: 'out', dur: '0m 18s', when: '4 days ago, 11:02 AM', outcome: 'Voicemail', note: 'Left a voicemail' },
    { dir: 'in', dur: '5m 11s', when: '5 days ago, 4:21 PM', outcome: 'Connected', note: 'Inbound — wanted brochure' },
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link href="/leads" className="inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-white"><ArrowLeft className="size-4"/>Back to leads</Link>
        <div className="flex flex-wrap gap-2">
          <button onClick={()=>setReminder(true)} className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5 inline-flex items-center gap-1.5"><CalendarClock className="size-3.5"/>Call later</button>
          <button className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5 inline-flex items-center gap-1.5"><Phone className="size-3.5"/>Call now</button>
          <button className="text-xs glass rounded-xl px-3 py-2 hover:bg-white/5 inline-flex items-center gap-1.5"><Mail className="size-3.5"/>Email</button>
          <button onClick={()=>setAiOpen(true)} className="text-xs rounded-xl bg-brand-500 hover:bg-brand-600 text-white px-3 py-2 inline-flex items-center gap-1.5 shadow-glow font-semibold"><Sparkles className="size-3.5"/>Ask AI</button>
          <button className="size-9 grid place-items-center rounded-xl glass hover:bg-white/5"><MoreHorizontal className="size-4"/></button>
        </div>
      </div>
      <Card className="p-6 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-aurora opacity-25 blur-3xl pointer-events-none"/>
        <div className="relative flex flex-col md:flex-row md:items-start gap-5">
          <div className="size-20 rounded-3xl grid place-items-center text-xl font-semibold text-white shadow-glow shrink-0" style={{background:'linear-gradient(135deg,#6E45FE,#22D3EE)'}}>{lead.business.slice(0,2).toUpperCase()}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-semibold tracking-tight">{lead.business}</h1>
              {lead.hot && <Pill tone="rose">🔥 Hot</Pill>}
              <Pill tone="emerald">Verified</Pill>
              <Pill tone="muted">{lead.id}</Pill>
            </div>
            <div className="text-sm text-ink-3 mt-1 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1"><Building2 className="size-3.5"/>{lead.category}</span>
              <span className="inline-flex items-center gap-1"><MapPin className="size-3.5"/>{lead.city}</span>
              <span className="inline-flex items-center gap-1"><Star className="size-3.5 fill-amber-300 text-amber-300"/>{lead.rating} · {lead.reviews} reviews</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div className="text-[11px] uppercase tracking-[0.14em] text-ink-3 mr-1">Stage</div>
              <div className="flex flex-wrap gap-1">{STATUSES.map(s=>(<button key={s} onClick={()=>{setStatus(s); toast.success(`Moved to ${s}`);}} className={`text-xs px-2.5 py-1 rounded-full border transition ${status===s?'bg-brand-500/20 border-brand-500/40 text-brand-200':'border-line text-ink-2 hover:bg-white/5'}`}>{s}</button>))}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 shrink-0">{[['Deal value','$4,200'],['Touches','7'],['Last contact','2d']].map(([l,v])=>(<div key={l} className="glass rounded-2xl px-3 py-2.5 min-w-[88px]"><div className="text-[10px] uppercase tracking-widest text-ink-3">{l}</div><div className="text-base font-semibold mt-0.5">{v}</div></div>))}</div>
        </div>
      </Card>
      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        <div className="space-y-5">
          <Card className="p-2 flex flex-wrap gap-1">{[['activity','Activity',Activity],['notes','Private Notes',Lock],['history','History',History],['calls','Call Log',PhoneCall],['files','Files',Folder]].map(([k,l,Ic])=>(<button key={k} onClick={()=>setTab(k)} className={`inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg ${tab===k?'bg-white/[0.07] text-white':'text-ink-3 hover:text-white'}`}><Ic className="size-3.5"/>{l}</button>))}</Card>
          {tab==='activity' && (
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4"><div><div className="text-sm font-semibold">Activity timeline</div><div className="text-xs text-ink-3">Every touchpoint, in order</div></div><Pill tone="muted">{timeline.length} events</Pill></div>
              <div className="relative pl-5"><div className="absolute left-[10px] top-2 bottom-2 w-px bg-line"/>
                {timeline.map((e,i)=>{ const Ic = e.i; const tones = {brand:'bg-brand-500/15 text-brand-300',emerald:'bg-accent-emerald/15 text-accent-emerald',cyan:'bg-accent-cyan/15 text-accent-cyan',amber:'bg-accent-amber/15 text-accent-amber',muted:'bg-white/5 text-ink-2'}; return (
                <motion.div key={i} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{delay:i*0.04}} className="relative pl-6 pb-5 last:pb-0">
                  <div className={`absolute -left-[8px] top-0 size-5 rounded-full grid place-items-center ${tones[e.tone]} ring-4 ring-bg-elev`}><Ic className="size-3"/></div>
                  <div className="flex items-start justify-between gap-2"><div><div className="text-sm font-medium">{e.t}</div><div className="text-xs text-ink-3 mt-0.5">{e.d}</div></div><div className="text-[11px] text-ink-3 shrink-0">{e.when}</div></div>
                </motion.div>);})}
              </div>
            </Card>)}
          {tab==='notes' && (
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4"><div><div className="text-sm font-semibold flex items-center gap-2"><Lock className="size-3.5 text-accent-amber"/>Private notes</div><div className="text-xs text-ink-3">Only you can see these. AI cannot read, modify or suggest from them.</div></div><Pill tone="amber"><ShieldAlert className="size-3"/>Private</Pill></div>
              <div className="glass rounded-2xl p-3 flex gap-3 items-start">
                <div className="size-9 rounded-xl bg-aurora grid place-items-center text-[11px] font-semibold shrink-0">VS</div>
                <div className="flex-1"><textarea value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add a private note… (talking points, do-not-share, personal context)" rows={2} className="w-full bg-transparent outline-none text-sm resize-none placeholder:text-ink-4"/><div className="flex justify-end mt-2"><button onClick={addNote} className="text-xs rounded-lg bg-brand-500 hover:bg-brand-600 text-white px-3 py-1.5 inline-flex items-center gap-1.5"><Send className="size-3"/>Save private</button></div></div>
              </div>
              <div className="mt-4 space-y-3">{notes.map(n=>(<motion.div key={n.id} initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} className="glass rounded-2xl p-4 group"><div className="flex items-start justify-between gap-2"><div className="flex items-center gap-2"><Pill tone="amber"><Lock className="size-3"/>Private</Pill><span className="text-xs text-ink-3">{n.when}</span></div><div className="opacity-0 group-hover:opacity-100 flex gap-1"><button className="size-7 rounded-lg hover:bg-white/5 grid place-items-center text-ink-3"><Edit3 className="size-3.5"/></button><button onClick={()=>setNotes(notes.filter(x=>x.id!==n.id))} className="size-7 rounded-lg hover:bg-white/5 grid place-items-center text-accent-rose"><Trash2 className="size-3.5"/></button></div></div><p className="mt-2 text-sm text-ink-1 whitespace-pre-line">{n.text}</p></motion.div>))}</div>
            </Card>)}
          {tab==='history' && (<Card className="p-5"><div className="text-sm font-semibold mb-1">Field history</div><div className="text-xs text-ink-3 mb-4">Every change to this lead</div><div className="divide-y divide-line">{[['Status','New','Called','2d ago','Vikram'],['Email',' —','set to '+(lead.email||'-'),'5d ago','AI Enrichment'],['Owner','Unknown',lead.owner,'5d ago','AI Enrichment'],['Phone',' —',(lead.phone||'-'),'5d ago','AI Enrichment'],['Created','—','—','6d ago','Lead Finder']].map((r,i)=>(<div key={i} className="flex items-center justify-between py-3 text-sm"><div className="flex items-center gap-3"><div className="size-8 rounded-lg glass grid place-items-center"><History className="size-4 text-ink-3"/></div><div><div className="font-medium">{r[0]}</div><div className="text-[11px] text-ink-3">{r[1]} → <span className="text-ink-1">{r[2]}</span></div></div></div><div className="text-right text-[11px] text-ink-3">{r[3]}<br/>by {r[4]}</div></div>))}</div></Card>)}
          {tab==='calls' && (<Card className="p-5"><div className="text-sm font-semibold mb-1">Call log</div><div className="text-xs text-ink-3 mb-4">All inbound and outbound calls</div><div className="space-y-2">{calls.map((c,i)=>(<div key={i} className="glass rounded-2xl p-4 flex items-center gap-4"><div className="size-10 rounded-xl bg-accent-cyan/15 text-accent-cyan grid place-items-center"><PhoneCall className="size-4"/></div><div className="flex-1"><div className="flex items-center gap-2"><div className="text-sm font-medium">{c.dir==='out'?'Outbound':'Inbound'} call</div><Pill tone={c.outcome==='Connected'?'emerald':'amber'}>{c.outcome}</Pill></div><div className="text-xs text-ink-3 mt-0.5">{c.when} · {c.dur}</div><div className="text-xs text-ink-2 mt-1.5">{c.note}</div></div><button className="text-xs text-brand-300">Replay</button></div>))}</div></Card>)}
          {tab==='files' && (<Empty icon={Folder} title="No files yet" desc="Upload contracts, proposals or call recordings related to this lead." action={<button className="text-sm rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-4 py-2 shadow-glow inline-flex items-center gap-1.5"><Plus className="size-4"/>Upload file</button>}/>)}
        </div>
        <div className="space-y-5">
          <Card className="p-5">
            <div className="text-sm font-semibold mb-3">Contact</div>
            {[[Phone,lead.phone||'Not available','Call'],[Mail,lead.email||'Not available','Email'],[Globe,lead.website||'No website','Visit']].map(([Ic,v,a],i)=>(<div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03]"><div className="size-9 rounded-xl glass grid place-items-center"><Ic className="size-4 text-ink-3"/></div><div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{v}</div></div><button className="text-xs text-brand-300">{a}</button></div>))}
            <a href={lead.maps} target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03]"><div className="size-9 rounded-xl glass grid place-items-center"><MapPin className="size-4 text-ink-3"/></div><div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{lead.address}</div><div className="text-[11px] text-ink-3">Google Maps</div></div><ExternalLink className="size-3.5 text-ink-3"/></a>
          </Card>
          <Card className="p-5">
            <div className="text-sm font-semibold mb-3">Next steps</div>
            <div className="glass rounded-xl p-3"><div className="flex items-center gap-2 text-xs text-ink-3"><CalendarClock className="size-3.5"/>Reminder set</div><div className="text-sm font-medium mt-1">Call back Friday, 3:30 PM</div><div className="text-[11px] text-ink-3 mt-0.5">Notify 15 minutes before</div></div>
            <button onClick={()=>setReminder(true)} className="mt-3 w-full text-xs glass rounded-xl px-3 py-2.5 hover:bg-white/5 inline-flex items-center justify-center gap-1.5"><Plus className="size-3.5"/>Add another reminder</button>
          </Card>
          <Card className="p-5">
            <div className="text-sm font-semibold mb-3">AI insights</div>
            <div className="glass rounded-xl p-3 border border-brand-500/20">
              <div className="flex items-center gap-2 text-xs"><Sparkles className="size-3.5 text-brand-300"/><span className="text-brand-200 font-medium">Intent score</span></div>
              <div className="mt-2 flex items-end gap-2"><div className="text-2xl font-semibold">82</div><div className="text-xs text-ink-3 mb-1">/ 100 · high</div></div>
              <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden"><div className="h-full bg-aurora" style={{width:'82%'}}/></div>
              <ul className="mt-3 space-y-1 text-xs text-ink-2"><li>• Recently updated website</li><li>• Active on LinkedIn</li><li>• Hiring in last 30 days</li></ul>
            </div>
            <button onClick={()=>setAiOpen(true)} className="mt-3 w-full text-xs rounded-xl bg-brand-500 hover:bg-brand-600 text-white px-3 py-2.5 inline-flex items-center justify-center gap-1.5 shadow-glow font-semibold"><Sparkles className="size-3.5"/>Re-run AI on this lead</button>
          </Card>
        </div>
      </div>
      <ReminderModal open={reminder} onClose={()=>setReminder(false)} lead={lead}/>
      {aiOpen && (<div onClick={()=>setAiOpen(false)} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md grid place-items-center p-4"><motion.div onClick={e=>e.stopPropagation()} initial={{scale:.96,opacity:0}} animate={{scale:1,opacity:1}} className="w-full max-w-md glass-strong rounded-3xl p-6"><div className="size-12 rounded-2xl bg-aurora grid place-items-center shadow-glow"><Sparkles className="size-5 text-white"/></div><h3 className="mt-4 text-xl font-semibold">Run AI on this lead?</h3><p className="text-sm text-ink-3 mt-1.5">AI will enrich contact data and update the intent score. Private notes are never read.</p><div className="mt-4 flex gap-2 justify-end"><button onClick={()=>setAiOpen(false)} className="text-sm glass rounded-xl px-4 py-2 hover:bg-white/5">Cancel</button><button onClick={()=>{setAiOpen(false); toast.success('AI run complete', { description: 'Intent score updated.' });}} className="text-sm rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-4 py-2 shadow-glow inline-flex items-center gap-1.5"><Sparkles className="size-3.5"/>Run AI</button></div></motion.div></div>)}
    </div>
  );
}
