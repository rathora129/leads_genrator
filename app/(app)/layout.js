'use client';
import { useState } from 'react';
import Sidebar from '@/components/app-shell/Sidebar';
import Topbar from '@/components/app-shell/Topbar';

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-bg text-ink-1 flex relative">
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 min-w-0 flex flex-col relative">
        <Topbar />
        <main className="flex-1 p-4 lg:p-6 max-w-[1600px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
