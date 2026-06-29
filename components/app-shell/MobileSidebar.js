'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Rocket, LogOut, LayoutDashboard, Building2, Radar, Users, KanbanSquare, BarChart3, LineChart, Bell, Settings, User, LifeBuoy, Plus } from 'lucide-react';

const ICONS = { LayoutDashboard, Building2, Radar, Users, KanbanSquare, BarChart3, LineChart, Bell, Settings, User, LifeBuoy };
const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
  { key: 'workspace', label: 'Workspace', icon: 'Building2', href: '/workspace' },
  { key: 'lead-finder', label: 'Lead Finder', icon: 'Radar', href: '/lead-finder' },
  { key: 'leads', label: 'Leads', icon: 'Users', href: '/leads' },
  { key: 'crm', label: 'CRM', icon: 'KanbanSquare', href: '/crm' },
  { key: 'reports', label: 'Reports', icon: 'BarChart3', href: '/reports' },
  { key: 'notifications', label: 'Notifications', icon: 'Bell', href: '/notifications' },
  { key: 'settings', label: 'Settings', icon: 'Settings', href: '/settings' },
  { key: 'profile', label: 'Profile', icon: 'User', href: '/profile' },
];
export default function MobileSidebar({ open, onClose }) {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md lg:hidden">
          <motion.aside initial={{x:'-100%'}} animate={{x:0}} exit={{x:'-100%'}} transition={{type:'spring', damping: 30, stiffness: 320}} onClick={e=>e.stopPropagation()} className="absolute left-0 top-0 bottom-0 w-[82vw] max-w-[300px] bg-bg-elev border-r border-line flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-line">
              <div className="flex items-center gap-2.5"><div className="size-10 rounded-xl bg-aurora grid place-items-center shadow-glow"><Rocket className="size-5 text-white"/></div><div><div className="text-sm font-semibold">RocketShip</div><div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">AI Client Engine</div></div></div>
              <button onClick={onClose} className="size-9 grid place-items-center rounded-xl hover:bg-white/5"><X className="size-4"/></button>
            </div>
            <div className="px-3 py-3 border-b border-line"><div className="glass rounded-xl p-3 flex items-center gap-2.5"><div className="size-8 rounded-lg bg-brand-500/20 grid place-items-center text-brand-200 font-semibold text-xs">BE</div><div className="min-w-0 flex-1"><div className="text-xs font-medium truncate">Bhavya Enterprises</div><div className="text-[10px] text-ink-3">Real Estate · Mumbai</div></div></div></div>
            <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 py-2 space-y-0.5">
              {NAV.map(n => { const Icon = ICONS[n.icon]; const active = pathname.startsWith(n.href); return (<Link key={n.key} href={n.href} onClick={onClose} className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm ${active?'bg-white/[0.07] text-white':'text-ink-2 hover:bg-white/5'}`}><Icon className={`size-5 ${active?'text-brand-300':'text-ink-3'}`}/>{n.label}</Link>); })}
            </nav>
            <div className="p-3 border-t border-line"><button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink-2 hover:bg-white/5"><LogOut className="size-5"/>Logout</button></div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
