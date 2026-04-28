import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ChefHat, MessageCircle, Navigation, ShieldCheck, Heart } from 'lucide-react';
import { ResponsiveContainer } from '../../components/global/ResponsiveContainer';
import { GlassCard } from '../../components/global/GlassCard';
import { OrderStatusTracker } from './components/OrderStatusTracker';

export const OrderPage = () => {
  const steps = [
    { label: 'Queued', status: 'completed' },
    { label: 'Crafting', status: 'active' },
    { label: 'Quality Check', status: 'pending' },
    { label: 'Ready', status: 'pending' }
  ];

  return (
    <ResponsiveContainer className="py-24 space-y-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="glass-badge bg-[#FF5722]/10 text-primary-container border-[#FF5722]/20 px-6 py-2 uppercase tracking-[0.3em] font-black text-[10px]">
            Order #82914
          </span>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
            Your Flame Is <br/> <span className="text-primary-container">Rising.</span>
          </h1>
          <p className="text-on-surface-variant max-w-md mx-auto text-sm leading-relaxed">
            Our kitchen commandos are currently forging your meal using high-thermal precision. ETA: 12 minutes.
          </p>
        </div>

        <OrderStatusTracker steps={steps} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <GlassCard className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary-container shadow-inner">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#FF5722]">Pickup Hearth</h3>
                <p className="text-lg font-bold text-on-surface">Downtown Night Market</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Location Status</p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-white/40 uppercase">Wait Time</span>
                  <span className="text-green-400 font-bold uppercase tracking-widest">Optimized (Low)</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-white/40 uppercase">Distance</span>
                  <span className="text-white font-bold uppercase tracking-widest">0.8 Miles Away</span>
                </div>
              </div>
            </div>
            <button className="w-full py-4 rounded-xl border border-white/10 flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-sm font-black uppercase tracking-tighter active:scale-95">
              <Navigation size={18} />
              Get Coordinates
            </button>
          </GlassCard>

          <GlassCard className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <ChefHat size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-tertiary">Head Specialist</h3>
                  <p className="text-lg font-bold text-on-surface">Chef Julian Stark</p>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-[8px] font-black uppercase tracking-widest text-green-500">
                Verified
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 relative group cursor-pointer">
              <div className="flex items-start gap-4">
                <img src="https://i.pravatar.cc/100?u=julian" className="w-10 h-10 rounded-lg object-cover border border-white/10" />
                <div className="space-y-1">
                  <p className="text-[10px] text-on-surface-variant font-bold italic leading-tight">
                    "Temperature stabilized. Your Smash is hitting the grill now. High thermal consistency guaranteed."
                  </p>
                  <span className="text-[8px] text-white/20 uppercase font-black">Just now</span>
                </div>
              </div>
            </div>

            <button className="w-full py-4 rounded-xl bg-[#FF5722] text-black flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(255,87,34,0.3)] text-sm font-black uppercase tracking-widest italic hover:scale-[1.02] active:scale-95 transition-all underline decoration-white/30 decoration-2">
              <MessageCircle size={18} />
              Secure Comms
            </button>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {[
            { icon: ShieldCheck, label: 'Quality Locked' },
            { icon: Heart, label: 'Made with Soul' },
            { icon: Flame, label: 'High Precision' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 opacity-40">
              <item.icon size={20} className="text-on-surface" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </ResponsiveContainer>
  );
};

const Flame = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.256 1.189-3.103" />
  </svg>
);
