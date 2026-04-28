import React from 'react';
import { motion } from 'motion/react';

interface Step {
  label: string;
  status: string;
}

interface OrderStatusTrackerProps {
  steps: Step[];
}

export const OrderStatusTracker = ({ steps }: OrderStatusTrackerProps) => (
  <div className="mt-12 pt-8 border-t border-white/10">
    <div className="flex justify-between items-center relative">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2" />
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '33%' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 h-0.5 bg-[#FF5722] -translate-y-1/2 shadow-[0_0_15px_rgba(255,87,34,0.5)]"
      />
      
      {steps.map((step, i) => (
        <div key={step.label} className="relative z-10 flex flex-col items-center gap-3">
          <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
            step.status === 'completed' ? 'bg-[#FF5722] border-[#FF5722] shadow-[0_0_10px_rgba(255,87,34,0.8)]' :
            step.status === 'active' ? 'bg-[#FF5722] border-[#FF5722] animate-pulse shadow-[0_0_15px_rgba(255,87,34,1)]' :
            'bg-[#121212] border-white/20'
          }`} />
          <span className={`text-[10px] font-black uppercase tracking-widest ${
            step.status === 'active' ? 'text-[#FF5722]' : 
            step.status === 'completed' ? 'text-white' : 'text-white/30'
          }`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);
