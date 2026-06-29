'use client';
import { cn } from '@/lib/utils';
export function Skeleton({ className }) {
  return <div className={cn('relative overflow-hidden rounded-lg bg-white/[0.04]', className)}><div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent animate-[shimmer_1.6s_infinite]" /></div>;
}
export function SkeletonCard() {
  return (<div className="glass rounded-2xl p-5 space-y-3"><Skeleton className="h-4 w-24" /><Skeleton className="h-8 w-32" /><Skeleton className="h-2 w-full" /></div>);
}
export function SkeletonRow() {
  return (<div className="flex items-center gap-3 p-3"><Skeleton className="size-9 rounded-xl" /><div className="flex-1 space-y-1.5"><Skeleton className="h-3 w-1/3" /><Skeleton className="h-2.5 w-1/2" /></div><Skeleton className="h-6 w-16 rounded-full" /></div>);
}
export function SkeletonTable({ rows = 8 }) {
  return (<div className="glass rounded-2xl divide-y divide-line">{Array.from({length: rows}).map((_,i)=>(<SkeletonRow key={i} />))}</div>);
}
