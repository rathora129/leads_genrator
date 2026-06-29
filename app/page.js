'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Rocket, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Zap, Target, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('vikram@rocketship.ai');
  const [pwd, setPwd] = useState('demo1234');
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); toast.success('Welcome back, Vikram'); router.push('/dashboard'); }, 900);
  };
  return (
    <div className="min-h-screen w-full bg-bg text-ink-1 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-fade" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative grid lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden border-r border-line">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-aurora grid place-items-center shadow-glow"><Rocket className="size-5 text-white" /></div>
            <div>
              <div className="text-base font-semibold">RocketShip</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3">AI Client Engine</div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative">
            <div className="absolute -inset-24 bg-aurora opacity-20 blur-3xl rounded-full" />
            <div className="relative">
              <h1 className="text-5xl font-semibold tracking-tight leading-[1.05] text-gradient">Find clients<br />before<br />your competitors do.</h1>
              <p className="text-ink-2 mt-6 max-w-md">Source, qualify and close high-intent leads from anywhere in the world — with AI that only acts when you ask it to.</p>
              <div className="mt-10 grid grid-cols-2 gap-3 max-w-md">
                {[
                  { icon: Sparkles, t: 'AI on demand', d: 'Never auto-runs. You’re always in control.' },
                  { icon: Zap, t: '12M+ businesses', d: 'Global directory across 220 countries.' },
                  { icon: Target, t: 'Hyper-targeting', d: 'Radius, niche, intent & enrichment.' },
                  { icon: ShieldCheck, t: 'Private notes', d: 'Personal data is never sent to AI.' },
                ].map((f, i) => (
                  <div key={i} className="glass rounded-2xl p-4">
                    <f.icon className="size-4 text-brand-300" />
                    <div className="text-sm font-medium mt-2">{f.t}</div>
                    <div className="text-[11px] text-ink-3 mt-1">{f.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <div className="flex items-center gap-4 text-[11px] text-ink-3">
            <span>SOC 2 Type II</span><span className="size-1 rounded-full bg-ink-4" /><span>GDPR</span><span className="size-1 rounded-full bg-ink-4" /><span>99.99% uptime</span>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 lg:p-12 relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <div className="lg:hidden mb-8 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-aurora grid place-items-center"><Rocket className="size-5 text-white" /></div>
              <div className="text-base font-semibold">RocketShip</div>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">Welcome back</h2>
            <p className="text-sm text-ink-3 mt-1.5">Sign in to your workspace to continue.</p>
            <form onSubmit={submit} className="mt-8 space-y-4">
              <div>
                <label className="text-xs text-ink-2 font-medium">Email</label>
                <div className="mt-1.5 glass rounded-xl flex items-center gap-2 px-3 py-2.5 focus-within:ring-2 focus-within:ring-brand-500/50">
                  <Mail className="size-4 text-ink-3" />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent flex-1 outline-none text-sm" placeholder="you@company.com" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs text-ink-2 font-medium">Password</label>
                  <button type="button" className="text-xs text-brand-300 hover:text-brand-200">Forgot?</button>
                </div>
                <div className="mt-1.5 glass rounded-xl flex items-center gap-2 px-3 py-2.5 focus-within:ring-2 focus-within:ring-brand-500/50">
                  <Lock className="size-4 text-ink-3" />
                  <input type={show ? 'text' : 'password'} value={pwd} onChange={(e) => setPwd(e.target.value)} className="bg-transparent flex-1 outline-none text-sm" />
                  <button type="button" onClick={() => setShow(!show)} className="text-ink-3 hover:text-white">{show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button>
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs text-ink-2">
                <input type="checkbox" defaultChecked className="size-3.5 rounded accent-brand-500" />Remember me on this device
              </label>
              <button disabled={loading} className="w-full h-11 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold shadow-glow flex items-center justify-center gap-2 disabled:opacity-70">
                {loading ? <span className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : (<>Sign in <ArrowRight className="size-4" /></>)}
              </button>
              <div className="relative my-2"><div className="h-px bg-line" /><span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-bg px-2 text-[10px] text-ink-3 uppercase tracking-widest">or</span></div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="h-11 rounded-xl glass hover:bg-white/5 text-sm font-medium">Google</button>
                <button type="button" className="h-11 rounded-xl glass hover:bg-white/5 text-sm font-medium">Microsoft</button>
              </div>
              <p className="text-center text-xs text-ink-3 mt-4">New to RocketShip? <Link href="/dashboard" className="text-brand-300 hover:text-brand-200 font-medium">Start free trial</Link></p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
