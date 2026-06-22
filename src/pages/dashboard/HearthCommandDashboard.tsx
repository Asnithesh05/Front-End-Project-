import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Terminal, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  Box, 
  Zap, 
  Clock,
  Settings,
  AlertTriangle,
  Monitor,
  LayoutDashboard,
  Package,
  Users,
  Power,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order, InventoryItem, StaffMember, Feedback } from '../../types/types';
import { InventoryPage } from '../admin/InventoryPage';
import { StaffRosterPage } from '../admin/StaffRosterPage';
import { SystemSettingsPage } from '../admin/SystemSettingsPage';
import { EmployeeHistoryPage } from '../admin/EmployeeHistoryPage';
import { HQCRMPage } from '../admin/HQCRMPage';
import { AdminSidebar } from '../../components/admin/AdminSidebar';

interface HearthCommandDashboardProps {
  orders: Order[];
  inventory: InventoryItem[];
  staff: StaffMember[];
  feedbacks: Feedback[];
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addStaff: (s: Omit<StaffMember, 'id' | 'status'>) => void;
  defaultTab?: string;
}

export const HearthCommandDashboard = ({ 
  orders, 
  inventory,
  staff,
  feedbacks,
  updateOrderStatus,
  addStaff,
  defaultTab = 'Overview'
}: HearthCommandDashboardProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimestamp = () => {
    return `UTC +5:30 ${time.toLocaleTimeString('en-GB', { hour12: false })}`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Inventory': return <InventoryPage />;
      case 'Staff': return <StaffRosterPage />;
      case 'History': return <EmployeeHistoryPage />;
      case 'HQCRM': return <HQCRMPage />;
      case 'Settings': return <SystemSettingsPage />;
      default: return <DashboardOverview orders={orders} timeText={formatTimestamp()} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-orange-500 selection:text-black">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// Sub-component for the main dashboard dashboard overview
const DashboardOverview = ({ orders, timeText }: { orders: Order[], timeText: string }) => {
  const metrics = [
    { id: 'net-velocity', label: 'NET VELOCITY', value: '$12,450', change: '+14.2%', icon: TrendingUp, color: 'text-orange-500' },
    { id: 'active-tickets', label: 'ACTIVE TICKETS', value: String(orders.length), change: 'STABLE', icon: Layers, color: 'text-white' },
    { id: 'system-status', label: 'SYSTEM STATUS', value: 'OPTIMAL', change: 'ENCRYPTED', icon: ShieldCheck, color: 'text-green-400' }
  ];

  const displayInventory = [
    { name: 'Wagyu Patties', stock: 85 },
    { name: 'Truffle Oil', stock: 32 },
    { name: 'Brioche Buns', stock: 68 }
  ];

  return (
    <div className="p-8 space-y-12">
      {/* 1. TOP BAR */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <Terminal className="text-orange-500" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-widest text-white uppercase">
              Branch Operational : Hearth Panel
            </h1>
            <p className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mt-1">
              Terminal Node: KINETIC_HEARTH_01 // SECURE SESSION
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 font-mono text-xs tracking-widest text-white/60">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <Clock size={14} className="text-orange-500" />
            <span>{timeText}</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-green-400/5 border border-green-400/10 rounded-full text-green-400">
            <Activity size={14} className="animate-pulse" />
            <span>LIVE FEED: ACTIVE</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* 2. METRICS GRID */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <div 
              key={metric.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-2xl p-6 relative overflow-hidden group hover:border-orange-500/30 transition-all duration-500"
            >
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <metric.icon size={120} />
              </div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/40">{metric.label}</span>
                <metric.icon size={18} className={metric.color} />
              </div>
              <div className="flex flex-col">
                <span className={`text-4xl font-black tracking-tighter mb-1 ${metric.color}`}>{metric.value}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${metric.id === 'system-status' ? 'bg-green-400' : 'bg-orange-500'}`} />
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{metric.change}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 3. INVENTORY LIST */}
          <section className="lg:col-span-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-2xl p-6 h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Box size={20} className="text-orange-500" />
                  <h3 className="text-sm font-black tracking-widest uppercase">CRITICAL CARGO</h3>
                </div>
                <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-orange-500/10 transition-colors">
                  <Settings size={14} className="text-white/40" />
                </button>
              </div>

              <div className="space-y-8">
                {displayInventory.map((item, idx) => (
                  <div key={item.name} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-white/30 tracking-tight uppercase">SLOT_0{idx + 1}</span>
                        <h4 className="text-sm font-bold tracking-wide">{item.name}</h4>
                      </div>
                      <span className={`text-xs font-mono ${item.stock < 40 ? 'text-orange-500' : 'text-white/60'}`}>{item.stock}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-orange-500 h-2 rounded" style={{ width: `${item.stock}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-6 border-t border-white/5">
                <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl flex items-start gap-4">
                  <AlertTriangle className="text-orange-500 shrink-0" size={18} />
                  <p className="text-[10px] font-medium leading-relaxed text-white/50 uppercase tracking-wider">
                    LOW STOCK WARNING DETECTED IN NODE_02. AUTOMATIC RESTOCK PROTOCOL INITIATED.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SYSTEM VISUALIZER */}
          <section className="lg:col-span-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-2xl p-6 h-full relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              </div>

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-2">
                  <Monitor size={20} className="text-orange-500" />
                  <h3 className="text-sm font-black tracking-widest uppercase">HEARTH VISUALIZER</h3>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center h-64 border border-white/5 rounded-xl bg-black/40 relative z-10">
                <Cpu size={64} className="text-orange-500 animate-pulse mb-4" />
                <p className="text-xs font-mono tracking-[0.5em] text-white/40 uppercase">Awaiting Stream Selection</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 relative z-10">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-[9px] font-mono text-white/30 uppercase block mb-2">THERMAL_LOAD</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-orange-500 italic">42°C</span>
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full w-2/5" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-[9px] font-mono text-white/30 uppercase block mb-2">PROCESSOR_SYNC</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-green-400 italic">99.9%</span>
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-green-400 h-full w-[99%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* FOOTER BAR */}
      <footer className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center opacity-30">
        <span className="text-[8px] font-mono tracking-[0.4em] uppercase">Built for Hearth Command v4.0.2</span>
        <div className="flex gap-4">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>
      </footer>
    </div>
  );
};

