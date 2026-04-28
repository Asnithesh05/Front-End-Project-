import React from 'react';
import { UserPlus } from 'lucide-react';
import { StaffMember } from '../../../types/types';
import { GlassCard } from '../../../components/global/GlassCard';

interface StaffWidgetProps {
  staff: StaffMember[];
  onAddClick?: () => void;
}

export const StaffWidget = ({ staff, onAddClick }: StaffWidgetProps) => (
  <GlassCard className="h-full">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-sm font-black uppercase tracking-widest italic">Staff Status</h3>
      {onAddClick && (
        <button 
          onClick={onAddClick}
          className="p-2 rounded-lg bg-primary-container/10 text-primary-container hover:bg-primary-container/20 transition-all border border-primary-container/20"
          title="Add Staff"
        >
          <UserPlus size={16} />
        </button>
      )}
    </div>
    <div className="space-y-4">
      {staff.map(member => (
        <div key={member.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={member.avatar} 
                className="w-10 h-10 rounded-xl object-cover grayscale-[0.5] hover:grayscale-0 transition-all" 
                referrerPolicy="no-referrer" 
              />
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#121212] ${
                member.status === 'on-shift' ? 'bg-green-500' : 'bg-gray-500'
              }`} />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">{member.name}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{member.role}</p>
            </div>
          </div>
          <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
            member.status === 'on-shift' ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/40'
          }`}>
            {member.status}
          </div>
        </div>
      ))}
    </div>
  </GlassCard>
);
