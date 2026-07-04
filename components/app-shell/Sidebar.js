'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, LogOut, Rocket, Sparkles, LayoutDashboard, Building2, Radar, Users, KanbanSquare, BarChart3, LineChart, Bell, Settings, User, LifeBuoy, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS = { LayoutDashboard, Building2, Radar, Users, KanbanSquare, BarChart3, LineChart, Bell, Settings, User, LifeBuoy, MessageCircle };
const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
  { key: 'workspace', label: 'Workspace', icon: 'Building2', href: '/workspace' },
  { key: 'lead-finder', label: 'AI Lead Discovery', icon: 'Radar', href: '/lead-finder' },
  { key: 'leads', label: 'Leads', icon: 'Users', href: '/leads' },
  { key: 'outreach', label: 'Outreach Center', icon: 'MessageCircle', href: '/outreach' },
  { key: 'crm', label: 'CRM Pipeline', icon: 'KanbanSquare', href: '/crm' },
  { key: 'reports', label: 'Reports', icon: 'BarChart3', href: '/reports' },
  { key: 'analytics', label: 'Analytics', icon: 'LineChart', href: '/reports' },
  { key: 'notifications', label: 'Notifications', icon: 'Bell', href: '/notifications' },
  { key: 'settings', label: 'Settings', icon: 'Settings', href: '/settings' },
  { key: 'profile', label: 'Profile', icon: 'User', href: '/profile' },
  { key: 'support', label: 'Support', icon: 'LifeBuoy', href: '/profile' },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const pathname = usePathname();
  return (
    <aside className={cn('relative hidden lg:flex flex-col shrink-0 h-screen sticky top-0 border-r border-line transition-all duration-300', collapsed ? 'w-[76px]' : 'w-[260px]')}>
      <div className="px-4 pt-5 pb-4 flex items-center gap-3">
        <div className="size-10 rounded-xl bg-aurora grid place-items-center shadow-glow shrink-0">
          <Rocket className="size-5 text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="text-sm font-semibold leading-tight">RocketShip</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">AI Client Engine</div>
          </div>
        )}
      </div>
      {!collapsed && (
        <div className="px-3 pb-3">
          <div className="glass rounded-xl p-3 flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-brand-500/20 grid place-items-center text-brand-200 font-semibold text-xs">BE</div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium truncate">Bhavya Enterprises</div>
              <div className="text-[10px] text-ink-3">Real Estate · Mumbai</div>
            </div>
            <Sparkles className="size-4 text-brand-300" />
          </div>
        </div>
      )}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 space-y-0.5">
        {NAV.map((n) => {
          const Icon = ICONS[n.icon];
          const active = pathname.startsWith(n.href);
          return (
            <Link key={n.key} href={n.href} className="group relative block">
              {active && <motion.div layoutId="sb" className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/10" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />}
              <div className={cn('relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm', active ? 'text-white' : 'text-ink-2 hover:text-white hover:bg-white/[0.03]')}>
                <Icon className={cn('size-[18px] shrink-0', active ? 'text-brand-300' : 'text-ink-3 group-hover:text-ink-1')} />
                {!collapsed && <span className="truncate">{n.label}</span>}
                {collapsed && (
                  <span className="pointer-events-none absolute left-full ml-3 hidden group-hover:block whitespace-nowrap rounded-md bg-ink-5 px-2 py-1 text-xs text-white shadow-pop z-50">{n.label}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-line space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink-2 hover:text-white hover:bg-white/[0.03]">
          <LogOut className="size-[18px]" />{!collapsed && 'Logout'}
        </button>
        <button onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-xl text-xs text-ink-3 hover:text-white hover:bg-white/[0.03] border border-line">
          <ChevronLeft className={cn('size-4 transition-transform', collapsed && 'rotate-180')} />
          {!collapsed && 'Collapse'}
        </button>
      </div>
    </aside>
  );
}
