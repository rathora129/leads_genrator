'use client';
import { useState } from 'react';
import { Search, Bell, Plus, Sun, Moon, ChevronDown, Command, Maximize2, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Topbar({ onMenu }) {
  const [ws, setWs] = useState({ name: 'Bhavya Enterprises', initials: 'BE', cat: 'Real Estate' });
  const [wsOpen, setWsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const workspaces = [
    { name: 'Bhavya Enterprises', initials: 'BE', cat: 'Real Estate · Mumbai', color: '#6E45FE' },
    { name: 'NovaLeads Agency', initials: 'NL', cat: 'Marketing · Dubai', color: '#22D3EE' },
    { name: 'Helios Capital', initials: 'HC', cat: 'Finance · Singapore', color: '#34D399' },
  ];
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-bg/70 border-b border-line">
      <div className="flex items-center gap-3 px-4 lg:px-6 h-16">
        <button onClick={onMenu} className="lg:hidden size-9 grid place-items-center rounded-xl glass hover:bg-white/5"><Menu className="size-4"/></button>
        <div className="hidden md:flex flex-1 max-w-[520px] items-center gap-2 glass rounded-xl px-3 py-2 cursor-pointer" onClick={()=>{const ev=new KeyboardEvent('keydown',{key:'k',metaKey:true});window.dispatchEvent(ev);}}>
          <Search className="size-4 text-ink-3" />
          <input placeholder="Search leads, workspaces, CRM, reports…" className="bg-transparent flex-1 outline-none text-sm placeholder:text-ink-3" />
          <span className="hidden md:flex items-center gap-1 text-[10px] text-ink-3 border border-line rounded px-1.5 py-0.5"><Command className="size-3" />K</span>
        </div>
        <div className="flex-1 md:hidden" />
        <div className="relative">
          <button onClick={() => setWsOpen(!wsOpen)} className="hidden sm:flex items-center gap-2 glass rounded-xl pl-1.5 pr-2.5 py-1.5">
            <span className="size-7 rounded-lg grid place-items-center text-[11px] font-semibold text-white" style={{ background: 'linear-gradient(135deg,#6E45FE,#22D3EE)' }}>{ws.initials}</span>
            <span className="text-xs font-medium">{ws.name}</span>
            <ChevronDown className="size-3.5 text-ink-3" />
          </button>
          <AnimatePresence>
            {wsOpen && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute right-0 mt-2 w-72 glass-strong rounded-2xl shadow-pop p-2 z-50">
                <div className="px-2 py-1.5 text-[10px] uppercase tracking-[0.18em] text-ink-3">Switch Workspace</div>
                {workspaces.map((w) => (
                  <button key={w.name} onClick={() => { setWs({ name: w.name, initials: w.initials, cat: w.cat }); setWsOpen(false); }} className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 text-left">
                    <span className="size-9 rounded-xl grid place-items-center text-xs font-semibold text-white" style={{ background: w.color }}>{w.initials}</span>
                    <div className="min-w-0"><div className="text-sm font-medium truncate">{w.name}</div><div className="text-[11px] text-ink-3">{w.cat}</div></div>
                  </button>
                ))}
                <button className="w-full mt-1 flex items-center justify-center gap-2 px-2 py-2 rounded-xl border border-dashed border-line text-xs text-ink-2 hover:bg-white/5"><Plus className="size-3.5" />New workspace</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button className="hidden md:inline-flex items-center gap-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-3 py-2 shadow-glow">
          <Plus className="size-4" />Quick Add
        </button>
        <button className="size-9 grid place-items-center rounded-xl glass hover:bg-white/5"><Moon className="size-4" /></button>
        <button className="size-9 grid place-items-center rounded-xl glass hover:bg-white/5 relative">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-accent-rose ring-2 ring-bg" />
        </button>
        <div className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl glass">
            <span className="size-7 rounded-lg bg-aurora grid place-items-center text-[11px] font-semibold text-white">VS</span>
            <ChevronDown className="size-3.5 text-ink-3" />
          </button>
          <AnimatePresence>
            {profileOpen && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute right-0 mt-2 w-60 glass-strong rounded-2xl shadow-pop p-2 z-50">
                <div className="px-2 py-2">
                  <div className="text-sm font-semibold">Vikram Singh</div>
                  <div className="text-[11px] text-ink-3">vikram@rocketship.ai</div>
                </div>
                <div className="h-px bg-line my-1" />
                {['Profile', 'Settings', 'Workspace', 'Billing', 'Sign out'].map((i) => (
                  <button key={i} className="w-full text-left px-2 py-1.5 rounded-lg text-sm hover:bg-white/5">{i}</button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
