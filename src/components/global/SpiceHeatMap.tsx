import React from 'react';

interface SpiceHeatMapProps {
  level: number;
}

export const SpiceHeatMap = ({ level }: SpiceHeatMapProps) => {
  return (
    <div className="space-y-2 mb-6">
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
        <span>Cool</span>
        <span>Hot</span>
      </div>
      <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden relative">
        <div 
          className="h-full absolute left-0 top-0 transition-all duration-500"
          style={{ 
            width: `${level}%`,
            background: `linear-gradient(90deg, #ffb2b8 0%, #ff5733 100%)`
          }}
        />
      </div>
    </div>
  );
};
