'use client';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
export function Empty({ icon: Icon = Sparkles, title = 'Nothing here yet', desc, action, className }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn('glass rounded-2xl p-10 text-center', className)}>
      <div className="size-16 rounded-2xl bg-brand-500/15 grid place-items-center mx-auto"><Icon className="size-7 text-brand-300" /></div>
      <div className="mt-4 text-lg font-semibold">{title}</div>
      {desc && <div className="text-sm text-ink-3 mt-1 max-w-md mx-auto">{desc}</div>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </motion.div>
  );
}
