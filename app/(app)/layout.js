'use client';
import { useState } from 'react';
import Sidebar from '@/components/app-shell/Sidebar';
import Topbar from '@/components/app-shell/Topbar';
import MobileSidebar from '@/components/app-shell/MobileSidebar';
import CommandPalette from '@/components/command/CommandPalette';

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-bg text-ink-1 flex relative">
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col relative">
        <Topbar onMenu={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6 max-w-[1600px] w-full mx-auto">{children}</main>
        {/* Mobile bottom dock */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 glass-strong border-t border-line">
          <div className="grid grid-cols-5 gap-1 px-2 py-2 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
            {[
              { href: '/dashboard', label: 'Home', emoji: '🏠' },
              { href: '/lead-finder', label: 'Find', emoji: '📡' },
              { href: '/leads', label: 'Leads', emoji: '👥' },
              { href: '/crm', label: 'CRM', emoji: '📋' },
              { href: '/notifications', label: 'Inbox', emoji: '🔔' },
            ].map((i) => (
              <a key={i.href} href={i.href} className="flex flex-col items-center gap-0.5 py-1.5 rounded-xl hover:bg-white/5">
                <span className="text-base leading-none">{i.emoji}</span>
                <span className="text-[10px] text-ink-2">{i.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
      <CommandPalette />
    </div>
  );
}
