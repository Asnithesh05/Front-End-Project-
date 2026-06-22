import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Sparkles, 
  Radio, 
  Users, 
  Search, 
  Send, 
  TrendingUp, 
  Building2, 
  Zap, 
  Award, 
  Terminal, 
  Sliders, 
  Clock, 
  Power, 
  X, 
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Mail,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Branch {
  id: string;
  name: string;
  location: string;
  status: 'Optimal' | 'Critical Stock' | 'Understaffed' | 'Alert';
  currentOrders: number;
  totalSales: number;
  healthLoad: number; // percentage
  activePromotion: string;
}

interface LoyaltyCustomer {
  id: string;
  name: string;
  email: string;
  tier: 'Neon Citizen' | 'Chrome Executive' | 'Carbon Regular' | 'Aether VIP';
  points: number;
  vouchers: number;
  branchAffiliation: string;
}

export const HQCRMPage = () => {
  // Mock HQ Branches
  const [branches, setBranches] = useState<Branch[]>([
    { id: 'B1', name: 'Node 1 - District Matrix (HQ)', location: 'Central Dome Sector 7', status: 'Optimal', currentOrders: 24, totalSales: 16290, healthLoad: 78, activePromotion: 'None' },
    { id: 'B2', name: 'Node 4 - District Hearth', location: 'KinetiCity Node 12 Terminal', status: 'Understaffed', currentOrders: 18, totalSales: 12450, healthLoad: 92, activePromotion: 'None' },
    { id: 'B3', name: 'Node 8 - District Cyberia', location: 'Cyberia Sub-perimeter B', status: 'Critical Stock', currentOrders: 11, totalSales: 8900, healthLoad: 45, activePromotion: 'None' },
    { id: 'B4', name: 'Node 12 - District Solis', location: 'Solis Sector Delta', status: 'Optimal', currentOrders: 32, totalSales: 19800, healthLoad: 84, activePromotion: 'None' }
  ]);

  // CRM Loyalty Directory
  const [customers, setCustomers] = useState<LoyaltyCustomer[]>([
    { id: 'C_VIP_01', name: 'Alexander Sterling', email: 'sterling@neon.net', tier: 'Aether VIP', points: 4250, vouchers: 3, branchAffiliation: 'Node 1' },
    { id: 'C_EXEC_08', name: 'Sarah Connor', email: 'connor.s@cyberdyne.org', tier: 'Chrome Executive', points: 2850, vouchers: 2, branchAffiliation: 'Node 4' },
    { id: 'C_CIT_34', name: 'Kaelen Vance', email: 'kael@matrix.io', tier: 'Neon Citizen', points: 1200, vouchers: 1, branchAffiliation: 'Node 1' },
    { id: 'C_REG_12', name: 'Naomi Nagata', email: 'nagata@roci.org', tier: 'Carbon Regular', points: 450, vouchers: 0, branchAffiliation: 'Node 8' },
    { id: 'C_VIP_09', name: 'Victor Draven', email: 'draven@phantom.com', tier: 'Aether VIP', points: 5120, vouchers: 4, branchAffiliation: 'Node 12' }
  ]);

  const [customerSearch, setCustomerSearch] = useState('');
  const [hqLogs, setHqLogs] = useState<string[]>([
    'HQ-CORE: Active synchronization complete with 4 nodes.',
    'HQ-CORE: Initialized Secure CRM Node listeners.',
    'HQ-CORE: Loyalty Ledger checksum validated: GREEN.'
  ]);

  // Active Festival Campaign
  const [activeFestival, setActiveFestival] = useState<{
    name: string;
    template: string;
    discount: number;
    themeColor: string;
    themeHue: string;
    branchTargets: string[];
    multiplier: number;
    status: 'Idle' | 'Transmitting' | 'Scheduled';
  } | null>({
    name: 'Cyber Neon Solstice Feast',
    template: 'Bento Grid Carnival',
    discount: 20,
    themeColor: 'cyan',
    themeHue: '#00F0FF',
    branchTargets: ['B1', 'B2', 'B4'],
    multiplier: 2,
    status: 'Idle'
  });

  // Event Config Form State
  const [formEventName, setFormEventName] = useState('Sonic Summer Revels');
  const [formTemplate, setFormTemplate] = useState('Hearth Fire Carnival');
  const [formDiscount, setFormDiscount] = useState(15);
  const [formTheme, setFormTheme] = useState('Emerald'); // Orange, Cyan, Emerald, Magenta
  const [formMultiplier, setFormMultiplier] = useState(1.5);
  const [selectedBranches, setSelectedBranches] = useState<string[]>(['B1', 'B2', 'B3_disabled_mock', 'B4']);

  // Add Log helper
  const addLog = (text: string) => {
    const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setHqLogs(prev => [`[${timestamp}] ${text}`, ...prev.slice(0, 15)]);
  };

  // Run initial interval effect to simulate branch feeds updating
  useEffect(() => {
    const interval = setInterval(() => {
      setBranches(prev => prev.map(branch => {
        // Random slight fluctuation in customer orders or load
        const orderDelta = Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const newOrders = Math.max(5, branch.currentOrders + orderDelta);
        const loadDelta = Math.random() > 0.6 ? Math.floor(Math.random() * 5 - 2) : 0;
        const newLoad = Math.min(100, Math.max(20, branch.healthLoad + loadDelta));
        const salesDelta = orderDelta > 0 ? Math.floor(Math.random() * 80 + 20) : 0;
        return {
          ...branch,
          currentOrders: newOrders,
          healthLoad: newLoad,
          totalSales: branch.totalSales + salesDelta
        };
      }));

      // Random network log sometimes
      if (Math.random() > 0.7) {
        const branchLogNames = ['Node 1', 'Node 4', 'Node 8', 'Node 12'];
        const randomBranch = branchLogNames[Math.floor(Math.random() * branchLogNames.length)];
        const messages = [
          `Synced cache ledger for ${randomBranch}.`,
          `Heartbeat ping from ${randomBranch}: 12ms latency.`,
          `Branch client request completed at ${randomBranch}.`
        ];
        addLog(`NETWORK: ${messages[Math.floor(Math.random() * messages.length)]}`);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleToggleFestival = () => {
    if (!activeFestival) return;

    if (activeFestival.status === 'Idle') {
      // Start broadcasting
      setActiveFestival(prev => prev ? { ...prev, status: 'Transmitting' } : null);
      setBranches(prev => prev.map(b => {
        if (activeFestival.branchTargets.includes(b.id)) {
          return { ...b, activePromotion: activeFestival.name };
        }
        return b;
      }));
      addLog(`HQ-EVENT: Initializing event packet transmitting protocol...`);
      addLog(`HQ-EVENT: Overwriting global frontend themes to ${activeFestival.themeColor.toUpperCase()}.`);
      addLog(`HQ-EVENT: [${activeFestival.name}] successfully launched across chosen branches!`);
    } else {
      // Stop broadcasting
      setActiveFestival(prev => prev ? { ...prev, status: 'Idle' } : null);
      setBranches(prev => prev.map(b => ({ ...b, activePromotion: 'None' })));
      addLog(`HQ-EVENT: Event broadcast stopped. Returning theme defaults to standard amber.`);
    }
  };

  const handleLaunchCustomEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEventName.trim()) return;

    const themeHues: Record<string, string> = {
      'Amber': '#F97316',
      'Cyan': '#06B6D4',
      'Emerald': '#10B981',
      'Magenta': '#D946EF'
    };

    const newFest = {
      name: formEventName,
      template: formTemplate,
      discount: formDiscount,
      themeColor: formTheme.toLowerCase(),
      themeHue: themeHues[formTheme] || '#FF5722',
      branchTargets: [...selectedBranches],
      multiplier: formMultiplier,
      status: 'Transmitting' as const
    };

    setActiveFestival(newFest);
    setBranches(prev => prev.map(b => {
      if (newFest.branchTargets.includes(b.id)) {
        return { ...b, activePromotion: newFest.name };
      }
      return { ...b, activePromotion: 'None' };
    }));

    addLog(`HQ-EVENT: Custom Event Overdrive: [${newFest.name}] established!`);
    addLog(`HQ-EVENT: Dispatched dynamic menu discount of ${newFest.discount}% to all targets.`);
    addLog(`HQ-EVENT: Theme hue state: ${newFest.themeColor.toUpperCase()}`);
  };

  const handleAirdropPoints = (customerId: string, amount: number) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        addLog(`HQ-CRM: Awarded +${amount} Loyalty Points to ${c.name}. Tier status recalculated.`);
        return { 
          ...c, 
          points: c.points + amount,
          tier: (c.points + amount) > 4000 ? 'Aether VIP' : (c.points + amount) > 2000 ? 'Chrome Executive' : c.points + amount > 1000 ? 'Neon Citizen' : 'Carbon Regular'
        };
      }
      return c;
    }));
  };

  const handleAirdropVoucher = (customerId: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        addLog(`HQ-CRM: Transmitted promotional complimentary voucher token to ${c.name} (${c.email})`);
        return { ...c, vouchers: c.vouchers + 1 };
      }
      return c;
    }));
  };

  const handleDispatchAllVouchers = () => {
    setCustomers(prev => prev.map(c => {
      return { ...c, vouchers: c.vouchers + 1 };
    }));
    addLog(`HQ-CRM: Broadcasted customized 20% discount voucher down to all registered CRM clients.`);
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.tier.toLowerCase().includes(customerSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HQ Header */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-500 rounded-2xl text-black">
                <Globe size={26} className="animate-spin-slow" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-widest uppercase italic bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                Hearth Central HQ CRM
              </h1>
            </div>
            <p className="text-[10px] font-mono tracking-[0.4em] text-white/40 uppercase mt-3">
              HQ SECURE GATEWAY // GLOBAL MONITORING & FESTIVAL BROADCAST SERVICE
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl flex flex-col items-center">
              <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">HQ Uplinks</span>
              <span className="text-lg font-black text-green-400 tabular-nums flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                4 Active
              </span>
            </div>
            <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl flex flex-col items-center">
              <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">Global Revenue</span>
              <span className="text-lg font-black text-orange-500 tabular-nums">
                ${branches.reduce((acc, b) => acc + b.totalSales, 0).toLocaleString()}
              </span>
            </div>
            <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl flex flex-col items-center">
              <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">Event Overdrive</span>
              <span className={`text-lg font-black uppercase tracking-tighter ${activeFestival && activeFestival.status === 'Transmitting' ? 'text-cyan-400' : 'text-white/30'}`}>
                {activeFestival && activeFestival.status === 'Transmitting' ? 'TRANSMITTING' : 'IDLE'}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Theme Banner indicating active Festival */}
        <AnimatePresence>
          {activeFestival && activeFestival.status === 'Transmitting' && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-cyan-500/10 border border-cyan-500/40 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden"
            >
              {/* Animation details */}
              <div className="absolute right-0 top-0 -mr-20 -mt-20 w-80 h-80 bg-cyan-400/15 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="flex items-center gap-5 relative z-10">
                <div className="p-3 bg-cyan-400 text-black rounded-full animate-pulse">
                  <Radio size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-cyan-400 text-black text-[9px] font-black uppercase tracking-widest rounded">LIVE MULTICAST</span>
                    <span className="text-white/40 text-[10px] font-mono">Theme Override: Active</span>
                  </div>
                  <h3 className="text-xl font-bold mt-1 text-cyan-200">
                    Festival Event <span className="text-cyan-400 italic font-black">"{activeFestival.name}"</span> is LIVE
                  </h3>
                  <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">
                    Discount configured: <span className="text-cyan-400 font-bold">{activeFestival.discount}% OFF</span> // Loyalty points multiplier: <span className="text-cyan-400 font-bold">{activeFestival.multiplier}x</span> // Targets: {activeFestival.branchTargets.join(', ')}
                  </p>
                </div>
              </div>

              <button 
                onClick={handleToggleFestival}
                className="w-full md:w-auto px-6 py-3.5 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-black font-black uppercase tracking-widest text-xs rounded-2xl transition-all border border-red-500/30 shadow-lg active:scale-95"
              >
                Abort Event Cascade
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* BRANCH MONITOR & CONTROL - LEFT 7 COLS */}
          <section className="lg:col-span-7 space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-extrabold tracking-widest uppercase italic flex items-center gap-3">
                  <Building2 size={20} className="text-orange-500" />
                  Branch Node Oversight
                </h2>
                <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mt-1">Real-time biometrics feeds from operations</p>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-green-400 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full animate-pulse">
                SYNC_LIVE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {branches.map(branch => {
                const isUnderEvent = activeFestival && activeFestival.status === 'Transmitting' && activeFestival.branchTargets.includes(branch.id);
                
                return (
                  <div 
                    key={branch.id}
                    className={`bg-white/5 border rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group hover:bg-white/[0.08] ${
                      isUnderEvent 
                        ? 'border-cyan-500/30 bg-cyan-950/5 shadow-[0_0_30px_rgba(6,182,212,0.06)]' 
                        : branch.status === 'Critical Stock' 
                          ? 'border-red-500/20 hover:border-red-500/40' 
                          : branch.status === 'Understaffed' 
                            ? 'border-yellow-500/20 hover:border-yellow-500/40' 
                            : 'border-white/10 hover:border-orange-500/20'
                    }`}
                  >
                    {/* Background glow when event active */}
                    {isUnderEvent && (
                      <div className="absolute right-0 top-0 -mr-6 -mt-6 w-16 h-16 bg-cyan-400/5 rounded-full blur-xl pointer-events-none" />
                    )}

                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-base font-black text-white/90 group-hover:text-white transition-colors">{branch.name}</h3>
                        <p className="text-[9px] font-mono text-white/30 uppercase tracking-tighter mt-0.5">{branch.location}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                        branch.status === 'Optimal' 
                          ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                          : branch.status === 'Critical Stock' 
                            ? 'bg-red-500/10 border-red-500/20 text-red-400 animate-pulse' 
                            : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                      }`}>
                        {branch.status}
                      </span>
                    </div>

                    {/* Stats metrics */}
                    <div className="grid grid-cols-2 gap-4 my-6 bg-black/20 p-4 rounded-2xl border border-white/5">
                      <div>
                        <span className="text-[8px] font-mono text-white/30 block mb-1 uppercase tracking-widest">Active Orders</span>
                        <p className="text-lg font-extrabold italic text-white/80 tabular-nums">{branch.currentOrders}</p>
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-white/30 block mb-1 uppercase tracking-widest">Gross Sales</span>
                        <p className="text-lg font-extrabold italic text-orange-500 tabular-nums">${branch.totalSales.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Infrastructure Load indicator */}
                    <div className="space-y-1.5 mb-6">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-white/30 uppercase tracking-widest">Digital Load Status</span>
                        <span className={branch.healthLoad > 85 ? 'text-red-400 font-bold' : 'text-white/50'}>{branch.healthLoad}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 rounded-full ${
                            branch.healthLoad > 85 ? 'bg-red-500' : branch.healthLoad > 65 ? 'bg-orange-500' : 'bg-green-400'
                          }`}
                          style={{ width: `${branch.healthLoad}%` }}
                        />
                      </div>
                    </div>

                    {/* Active Overlay notification info */}
                    <div className={`p-3 rounded-xl flex items-center gap-3 text-[9px] font-mono border ${
                      isUnderEvent 
                        ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-300' 
                        : 'bg-white/5 border-white/5 text-white/40'
                    }`}>
                      <Radio size={12} className={isUnderEvent ? 'text-cyan-400 animate-spin-slow' : 'opacity-40'} />
                      <div className="truncate">
                        <span className="font-bold">PROMOTION Overlay:</span>{' '}
                        {isUnderEvent ? <span className="text-cyan-400 font-black">{branch.activePromotion}</span> : 'None Broadcasted'}
                      </div>
                    </div>

                    {/* Individual remote overriding action */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                      <button 
                        onClick={() => {
                          addLog(`HQ-Oversight: Dispatched menu synchronizer signal packet to ${branch.name}.`);
                        }}
                        className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-bold uppercase tracking-wider text-white/50 hover:text-white transition-all border border-white/5 text-center"
                      >
                        Sync Menu
                      </button>
                      <button 
                        onClick={() => {
                          addLog(`HQ-Oversight: Pushed system override command to ${branch.name}. Reset operational buffers.`);
                        }}
                        className="flex-1 py-2 bg-orange-500/5 hover:bg-orange-500/10 rounded-xl text-[9px] font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-all border border-orange-500/10 text-center"
                      >
                        Ping Buffer
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* HQ Terminal Log panel */}
            <div className="bg-[#0c0c0c] border border-white/10 rounded-[2rem] p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-orange-500" />
                  <h4 className="text-xs font-black tracking-widest uppercase">HQ Transmission Telemetry</h4>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                </div>
              </div>
              <div className="space-y-2.5 font-mono text-[9px] text-white/50 leading-normal max-h-40 overflow-y-auto pr-2">
                {hqLogs.map((log, index) => (
                  <div key={index} className="flex gap-3 border-b border-white/5 pb-1.5 last:border-0 hover:text-white transition-colors">
                    <span className="text-orange-500/60 shrink-0">CRM_HQ &gt;&gt;</span>
                    <span className="break-all">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* RIGHT 5 COLS: FESTIVAL COMMANDER & LOYALTY CRM LIST */}
          <section className="lg:col-span-5 space-y-8">
            
            {/* FESTIVAL EVENT COMMANDER */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,1)] rounded-[2rem] p-6 md:p-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 -mr-20 -mt-20 w-60 h-60 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-500/15 border border-cyan-500/20 text-cyan-400 rounded-xl">
                  <Sliders size={20} />
                </div>
                <div>
                  <h3 className="text-md font-black tracking-widest uppercase">Event Commander</h3>
                  <p className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Dispatch promotional events directly</p>
                </div>
              </div>

              <form onSubmit={handleLaunchCustomEvent} className="space-y-5">
                <div>
                  <label className="text-[9px] font-black tracking-[0.25em] text-white/30 uppercase mb-2 block italic">Festival Event Name</label>
                  <input 
                    type="text"
                    value={formEventName}
                    onChange={(e) => setFormEventName(e.target.value)}
                    placeholder="e.g. Hearth Solstice..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-xs font-mono focus:outline-none focus:border-cyan-500/50 transition-all text-white placeholder:text-white/10"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black tracking-[0.25em] text-white/30 uppercase mb-2 block italic">Campaign Template</label>
                    <select 
                      value={formTemplate}
                      onChange={(e) => setFormTemplate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-[11px] font-mono focus:outline-none focus:border-cyan-500/50 transition-all text-white"
                    >
                      <option value="Hearth Fire Carnival" className="text-black">Hearth Fire Carnival</option>
                      <option value="Cyber Neon Solstice" className="text-black">Cyber Neon Solstice</option>
                      <option value="Solar Bytes Festival" className="text-black">Solar Bytes Festival</option>
                      <option value="Chrono Midnight Revels" className="text-black">Chrono Midnight Revels</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-black tracking-[0.25em] text-white/30 uppercase mb-2 block italic">Points Multiplier</label>
                    <select 
                      value={formMultiplier}
                      onChange={(e) => setFormMultiplier(parseFloat(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-[11px] font-mono focus:outline-none focus:border-cyan-500/50 transition-all text-white"
                    >
                      <option value="1" className="text-black">1.0x (Regular)</option>
                      <option value="1.5" className="text-black">1.5x Multiplier</option>
                      <option value="2" className="text-black">2.0x Double Loyalty</option>
                      <option value="3" className="text-black">3.0x Triple Overdrive</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black tracking-[0.25em] text-white/30 uppercase mb-2 block italic">Discount Rate (%)</label>
                    <input 
                      type="number"
                      min="5"
                      max="75"
                      value={formDiscount}
                      onChange={(e) => setFormDiscount(parseInt(e.target.value) || 10)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-xs font-mono focus:outline-none focus:border-cyan-500/50 transition-all text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black tracking-[0.25em] text-white/30 uppercase mb-2 block italic">Overlay Theme Aura</label>
                    <div className="grid grid-cols-4 gap-2 h-11 items-center">
                      {(['Cyan', 'Emerald', 'Magenta', 'Amber'] as const).map(color => {
                        const bgColors = { Cyan: 'bg-cyan-500', Emerald: 'bg-emerald-500', Magenta: 'bg-magenta-500', Amber: 'bg-orange-500' };
                        const isSelected = formTheme === color;
                        return (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setFormTheme(color)}
                            className={`h-8 w-full rounded-lg transition-all ${bgColors[color]} ${isSelected ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-40 hover:opacity-80'}`}
                            title={color}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black tracking-[0.25em] text-white/30 uppercase mb-2.5 block italic">Affiliated Nodes</label>
                  <div className="grid grid-cols-2 gap-3">
                    {branches.map(b => {
                      const isChecked = selectedBranches.includes(b.id);
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            setSelectedBranches(prev => 
                              prev.includes(b.id) ? prev.filter(id => id !== b.id) : [...prev, b.id]
                            );
                          }}
                          className={`py-2 px-3 border rounded-xl text-[10px] font-bold uppercase tracking-wide flex items-center justify-between transition-all ${
                            isChecked
                              ? 'bg-cyan-400/10 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                              : 'bg-white/5 border-white/5 text-white/30 hover:bg-white/10 hover:text-white/60'
                          }`}
                        >
                          <span>{b.id} Core</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${isChecked ? 'bg-cyan-400' : 'bg-transparent border border-white/20'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all shadow-[0_0_30px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2 group active:scale-95"
                  >
                    <Power size={14} />
                    Commence Multicast Cascade
                  </button>
                </div>
              </form>
            </div>

            {/* CUSTOMER DIRECTORY & LOYALTY CONTROLS */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-md font-black tracking-widest uppercase flex items-center gap-2">
                    <Users size={18} className="text-orange-500" />
                    CRM Client Ledger
                  </h3>
                  <p className="text-[8px] font-mono text-white/30 uppercase tracking-widest mt-0.5">Targeted Customer loyalty promotions</p>
                </div>
                <button 
                  onClick={handleDispatchAllVouchers}
                  className="px-4 py-2 text-[8px] font-black uppercase tracking-widest bg-orange-500 text-black rounded-full hover:bg-orange-400 transition-all self-start sm:self-center"
                >
                  Blast Promo Vouchers
                </button>
              </div>

              {/* Customer Search bar */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" size={14} />
                <input 
                  type="text" 
                  placeholder="FILTER CLIENT DIRECTORY..." 
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[10px] font-mono tracking-widest focus:outline-none focus:border-orange-500/40 transition-all"
                />
              </div>

              {/* Customers list container */}
              <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1">
                {filteredCustomers.map(cust => (
                  <div key={cust.id} className="bg-black/30 border border-white/5 hover:border-white/10 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-white">{cust.name}</p>
                        <span className={`px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-wider ${
                          cust.tier === 'Aether VIP' 
                            ? 'bg-purple-500/15 border border-purple-500/30 text-purple-400' 
                            : cust.tier === 'Chrome Executive' 
                              ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-400' 
                              : cust.tier === 'Neon Citizen' 
                                ? 'bg-orange-500/15 border border-orange-500/30 text-orange-400' 
                                : 'bg-white/5 border border-white/10 text-white/40'
                        }`}>
                          {cust.tier}
                        </span>
                      </div>
                      <p className="text-[10px] text-white/30 font-mono tracking-tight">{cust.email}</p>
                      
                      {/* Loyalty Stats snippet */}
                      <div className="flex gap-4 mt-2 font-mono text-[9px] text-white/50">
                        <span>Points: <strong className="text-orange-500 font-bold">{cust.points}</strong></span>
                        <span>Vouchers: <strong className="text-white/80 font-bold">{cust.vouchers}</strong></span>
                        <span className="text-white/20">Affil: {cust.branchAffiliation}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0 self-end md:self-center">
                      <button 
                        onClick={() => handleAirdropPoints(cust.id, 250)}
                        className="py-1.5 px-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-[8px] font-black uppercase tracking-widest text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        +250 Pts
                      </button>
                      <button 
                        onClick={() => handleAirdropVoucher(cust.id)}
                        className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-white/40 hover:text-white transition-colors"
                        title="Award Comp Voucher"
                      >
                        <Send size={12} />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredCustomers.length === 0 && (
                  <div className="py-12 text-center opacity-30 flex flex-col items-center">
                    <Users size={32} className="mb-2" />
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em]">No Synchronized Client Records</p>
                  </div>
                )}
              </div>
            </div>
            
          </section>

        </div>

      </div>
    </div>
  );
};
