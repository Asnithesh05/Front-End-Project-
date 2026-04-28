import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: any;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon: Icon, color }) => (
  <GlassCard className="p-6 relative group overflow-hidden">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}/5 blur-[60px] -z-10 group-hover:bg-${color}/10 transition-all`} />
    <div className="flex justify-between items-start">
      <div className="space-y-4">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 w-fit">
          <Icon size={24} className={`text-${color}`} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1">{title}</p>
          <h4 className="text-3xl font-black italic tracking-tighter text-on-surface">{value}</h4>
        </div>
        {trend && (
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              {trend.startsWith('+') ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {trend}
            </div>
          </div>
        )}
      </div>
    </div>
  </GlassCard>
);
