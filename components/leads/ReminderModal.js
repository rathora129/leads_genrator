'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CalendarClock, Lock, Bell, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function ReminderModal({ open, onClose, lead }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('15:30');
  const [remind, setRemind] = useState('15');
  const [note, setNote] = useState('');
  const save = () => { toast.success(`Reminder set for ${date} at ${time}`, { description: lead ? `Re: ${lead.business}` : undefined }); onClose?.(); };
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md grid place-items-center p-4">
          <motion.div initial={{scale:.96,opacity:0,y:8}} animate={{scale:1,opacity:1,y:0}} exit={{scale:.96,opacity:0}} onClick={e=>e.stopPropagation()} className="w-full max-w-md glass-strong rounded-3xl p-6 relative">
            <button onClick={onClose} className="absolute top-4 right-4 size-8 grid place-items-center rounded-lg hover:bg-white/5 text-ink-3 hover:text-white"><X className="size-4"/></button>
            <div className="flex items-center gap-3"><div className="size-11 rounded-2xl bg-amber-500/15 text-accent-amber grid place-items-center"><CalendarClock className="size-5"/></div><div><div className="text-lg font-semibold">Call Later</div><div className="text-xs text-ink-3">Schedule a reminder · private to you</div></div></div>
            {lead && <div className="mt-4 p-3 rounded-xl glass"><div className="text-xs text-ink-3">Lead</div><div className="text-sm font-medium">{lead.business}</div><div className="text-[11px] text-ink-3">{lead.owner} · {lead.city}</div></div>}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Field label="Date"><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="bg-transparent outline-none w-full text-sm"/></Field>
              <Field label="Time"><input type="time" value={time} onChange={e=>setTime(e.target.value)} className="bg-transparent outline-none w-full text-sm"/></Field>
            </div>
            <Field label="Notify me" className="mt-3">
              <select value={remind} onChange={e=>setRemind(e.target.value)} className="bg-transparent outline-none w-full text-sm appearance-none cursor-pointer">
                {[['5','5 minutes before'],['15','15 minutes before'],['30','30 minutes before'],['60','1 hour before'],['1440','1 day before']].map(([v,l])=>(<option key={v} value={v} className="bg-bg-elev">{l}</option>))}
              </select>
            </Field>
            <div className="mt-3">
              <label className="text-[11px] uppercase tracking-[0.14em] text-ink-3 font-medium flex items-center gap-1.5"><Lock className="size-3"/>Private notes (AI never reads this)</label>
              <div className="mt-1.5 glass rounded-xl px-3 py-2.5"><textarea value={note} onChange={e=>setNote(e.target.value)} rows={3} placeholder="Personal context, talking points, do-not-share info…" className="bg-transparent outline-none w-full text-sm resize-none placeholder:text-ink-4"/></div>
            </div>
            <div className="mt-5 flex gap-2 justify-end">
              <button onClick={onClose} className="text-sm glass rounded-xl px-4 py-2 hover:bg-white/5">Cancel</button>
              <button onClick={save} className="text-sm rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-4 py-2 shadow-glow inline-flex items-center gap-1.5"><Save className="size-3.5"/>Save reminder</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, icon, children, className }) {
  return (<div className={className}><label className="text-[11px] uppercase tracking-[0.14em] text-ink-3 font-medium">{label}</label><div className="mt-1.5 glass rounded-xl px-3 py-2.5 flex items-center gap-2">{icon}{children}</div></div>);
}
