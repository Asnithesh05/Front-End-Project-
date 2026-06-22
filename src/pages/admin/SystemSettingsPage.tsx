import React, { useState } from 'react';
import { 
  Settings, 
  Power, 
  ShieldAlert, 
  Cpu, 
  Activity, 
  Eye, 
  Lock, 
  Zap, 
  Save, 
  RotateCcw,
  Bell,
  HardDrive,
  Network,
  CloudLightning
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SystemSettingsPage = () => {
  const [config, setConfig] = useState({
    isAcceptingOrders: true,
    maintenanceMode: false,
    autoReorderStock: true,
    highSecurityMode: false,
    aiOptimization: true,
    publicAccess: true
  });

  const [emergencyActive, setEmergencyActive] = useState(false);
  const [showSaveFeedback, setShowSaveFeedback] = useState(false);

  const toggleParam = (key: keyof typeof config) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEmergencyOverride = () => {
    setEmergencyActive(true);
    setConfig(prev => ({
      ...prev,
      isAcceptingOrders: false,
      publicAccess: false,
      maintenanceMode: true
    }));
    
    // Auto-clear emergency after 5 seconds for simulation
    setTimeout(() => setEmergencyActive(false), 5000);
  };

  const handleSave = () => {
    setShowSaveFeedback(true);
    setTimeout(() => setShowSaveFeedback(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans relative overflow-hidden">
      {/* Emergency Background Overlay */}
      <AnimatePresence>
        {emergencyActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 bg-red-900/20 backdrop-blur-sm flex items-center justify-center p-20"
          >
            <div className="border-[20px] border-red-500/30 w-full h-full flex flex-col items-center justify-center text-center">
              <ShieldAlert size={120} className="text-red-500 animate-bounce mb-8" />
              <h1 className="text-6xl font-black text-red-500 uppercase tracking-[0.2em] italic mb-4">Emergency Protocol Active</h1>
              <p className="text-xl font-mono text-red-400 uppercase tracking-widest">SYSTEM LOCKDOWN INITIATED // ALL SERVICES SUSPENDED</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-widest text-white uppercase flex items-center gap-4 italic">
              <Cpu className="text-orange-500" size={40} />
              Command Configuration
            </h1>
            <p className="text-[10px] font-mono tracking-[0.4em] text-white/40 uppercase mt-2">
              Kernel Access: ROOT_USER // SYSTEM_STABILITY_V8.2
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleSave}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white/10 transition-all flex items-center gap-3 relative"
            >
              {showSaveFeedback ? (
                <>
                  <Zap size={14} className="text-green-500" />
                  <span className="text-green-500">Config Synced</span>
                </>
              ) : (
                <>
                  <Save size={14} className="text-orange-500" />
                  Write Changes
                </>
              )}
            </button>
            <button className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-orange-500/10 transition-colors group">
              <RotateCcw size={20} className="text-white/20 group-hover:text-orange-500 transition-colors" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Controls */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ControlToggle 
              label="Terminal Feed"
              description="Allow external traffic and customer orders"
              icon={Network}
              active={config.isAcceptingOrders}
              onToggle={() => toggleParam('isAcceptingOrders')}
            />
            <ControlToggle 
              label="Auto-Logistics"
              description="Automatic restock protocol for critical assets"
              icon={HardDrive}
              active={config.autoReorderStock}
              onToggle={() => toggleParam('autoReorderStock')}
            />
            <ControlToggle 
              label="Stealth Ops"
              description="High-level encryption for all biometric data"
              icon={Lock}
              active={config.highSecurityMode}
              onToggle={() => toggleParam('highSecurityMode')}
            />
            <ControlToggle 
              label="Kinetic Flux"
              description="AI-driven demand forecasting and pricing"
              icon={Activity}
              active={config.aiOptimization}
              onToggle={() => toggleParam('aiOptimization')}
            />
            <ControlToggle 
              label="Public Visibility"
              description="Show hearth status on global satellite feed"
              icon={Eye}
              active={config.publicAccess}
              onToggle={() => toggleParam('publicAccess')}
            />
            <ControlToggle 
              label="Maintenance Bypass"
              description="Developer mode: ignores non-critical errors"
              icon={RotateCcw}
              active={config.maintenanceMode}
              onToggle={() => toggleParam('maintenanceMode')}
              danger
            />
          </div>

          {/* Sidebar Tools */}
          <div className="lg:col-span-4 space-y-8">
            {/* System Health */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 space-y-8">
              <h3 className="text-xs font-black tracking-widest text-white/40 uppercase">System Integrity</h3>
              <div className="space-y-6">
                <HealthMetric label="CORE_LOAD" value={42} />
                <HealthMetric label="BANDWIDTH_SYNC" value={88} />
                <HealthMetric label="UPTIME_RATIO" value={99.99} unit="%" color="text-green-400" />
              </div>
            </div>

            {/* Notification Nodes */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
              <div className="flex items-center gap-3 mb-6">
                <Bell size={18} className="text-orange-500" />
                <h3 className="text-xs font-black tracking-widest uppercase">Relay Nodes</h3>
              </div>
              <div className="space-y-2">
                {['Dispatch', 'Inventory', 'Personnel'].map(node => (
                  <div key={node} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[10px] font-mono tracking-widest uppercase text-white/40">
                    <span>{node}_RELAY</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Override */}
            <button 
              onClick={handleEmergencyOverride}
              className="w-full bg-red-600/10 border-2 border-red-600/30 hover:bg-red-600 hover:text-black transition-all p-8 rounded-[2rem] flex flex-col items-center gap-4 group active:scale-95"
            >
              <CloudLightning size={48} className="text-red-500 group-hover:text-black transition-colors" />
              <div className="text-center">
                <span className="block text-xl font-black uppercase tracking-tighter italic">Emergency Override</span>
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Kill All Active Processes</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ControlToggle = ({ label, description, icon: Icon, active, onToggle, danger = false }: any) => (
  <button 
    onClick={onToggle}
    className={`p-6 bg-white/5 backdrop-blur-xl border-2 rounded-[2rem] text-left transition-all group relative overflow-hidden ${
      active 
      ? (danger ? 'border-orange-500/50 bg-orange-500/5' : 'border-green-500/50 bg-green-400/5') 
      : 'border-white/10'
    }`}
  >
    <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl -z-10 transition-opacity ${active ? 'opacity-20' : 'opacity-0'} ${danger ? 'bg-orange-500' : 'bg-green-400'}`} />
    
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl border transition-colors ${active ? (danger ? 'border-orange-500 text-orange-500' : 'border-green-500 text-green-400') : 'border-white/10 text-white/20'}`}>
        <Icon size={20} />
      </div>
      <div className={`w-12 h-6 rounded-full border-2 transition-all relative ${active ? (danger ? 'border-orange-500' : 'border-green-500') : 'border-white/10'}`}>
        <motion.div 
          animate={{ x: active ? 24 : 4 }}
          className={`w-3 h-3 rounded-full mt-1 ${active ? (danger ? 'bg-orange-500' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,1)]') : 'bg-white/10'}`} 
        />
      </div>
    </div>
    
    <div className="space-y-1">
      <h3 className={`text-md font-black tracking-tight transition-colors ${active ? 'text-white' : 'text-white/40'}`}>{label}</h3>
      <p className="text-[10px] leading-relaxed font-medium text-white/20 uppercase tracking-wider">{description}</p>
    </div>
  </button>
);

const HealthMetric = ({ label, value, unit = '', color = 'text-white/90' }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <label className="text-[9px] font-black tracking-widest text-white/30 uppercase">{label}</label>
      <span className={`text-sm font-black font-mono italic ${color}`}>{value}{unit}</span>
    </div>
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`h-full rounded-full ${color === 'text-green-400' ? 'bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-orange-500/50'}`}
      />
    </div>
  </div>
);
