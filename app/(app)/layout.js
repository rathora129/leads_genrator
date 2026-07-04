'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/app-shell/Sidebar';
import Topbar from '@/components/app-shell/Topbar';
import MobileSidebar from '@/components/app-shell/MobileSidebar';
import CommandPalette from '@/components/command/CommandPalette';
import BusinessWizard from '@/components/onboarding/BusinessWizard';
import { getProfile } from '@/lib/profile';

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  useEffect(() => {
    const p = getProfile();
    if (!p) setTimeout(() => setWizardOpen(true), 400);
    const onP = () => { if (!getProfile()) setWizardOpen(true); };
    window.addEventListener('rs:openWizard', () => setWizardOpen(true));
    window.addEventListener('rs:profile', onP);
    return () => { window.removeEventListener('rs:profile', onP); };
  }, []);
  return (
    <div className="min-h-screen bg-bg text-ink-1 flex relative">
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col relative">
        <Topbar onMenu={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6 max-w-[1600px] w-full mx-auto">{children}</main>
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 glass-strong border-t border-line">
          <div className="grid grid-cols-5 gap-1 px-2 py-2 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
            {[
              { href: '/dashboard', label: 'Home', emoji: '🏠' },
              { href: '/lead-finder', label: 'Find', emoji: '📡' },
              { href: '/leads', label: 'Leads', emoji: '👥' },
              { href: '/outreach', label: 'Reach', emoji: '💬' },
              { href: '/crm', label: 'CRM', emoji: '📋' },
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
      <BusinessWizard open={wizardOpen} onClose={() => setWizardOpen(false)} onDone={() => setWizardOpen(false)} />
    </div>
  );
}
