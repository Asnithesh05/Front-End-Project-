import React from 'react';
import { 
  Zap, 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  Archive, 
  ChevronRight, 
  ShieldCheck, 
  LogOut,
  Globe
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const navItems = [
    { id: 'Overview', icon: LayoutDashboard, label: 'System Overview' },
    { id: 'Inventory', icon: Package, label: 'Asset Logistics' },
    { id: 'Staff', icon: Users, label: 'Personnel Matrix' },
    { id: 'History', icon: Archive, label: 'Employee History' },
    { id: 'HQCRM', icon: Globe, label: 'Headquarters CRM' },
    { id: 'Settings', icon: Settings, label: 'Kernel Config' },
  ];

  return (
    <aside className="w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col z-40 sticky top-0 h-screen">
      <div className="p-8 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-500 rounded-lg">
            <Zap size={20} className="text-black" />
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic">Hearth Command</h1>
        </div>
        <p className="text-[8px] font-mono tracking-[0.4em] text-white/30 uppercase">Secure Portal v4.0.2</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="px-4 mb-4">
          <span className="text-[9px] font-bold tracking-[0.3em] text-white/20 uppercase">Main Command</span>
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 group ${
              activeTab === item.id 
              ? 'bg-orange-500/10 border border-orange-500/30 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.1)]' 
              : 'text-white/40 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-4">
              <item.icon size={20} className={activeTab === item.id ? 'text-orange-500' : 'text-white/20 group-hover:text-white transition-colors'} />
              <span className="text-xs font-bold tracking-widest uppercase">{item.label}</span>
            </div>
            {activeTab === item.id && <ChevronRight size={14} className="animate-pulse" />}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-white/10 space-y-4">
        <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={14} className="text-green-400" />
            <span className="text-[10px] font-black italic text-white/80">AUTHENTICATED</span>
          </div>
          <p className="text-[9px] font-mono text-white/30 truncate uppercase">Admin_Node_01 // Root</p>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-white/30 hover:text-red-500 transition-colors uppercase text-[10px] font-black tracking-widest">
          <LogOut size={16} />
          Termination Session
        </button>
      </div>
    </aside>
  );
};
