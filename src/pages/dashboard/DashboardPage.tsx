import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Utensils, Box, BookOpen, Users, 
  Flame, Banknote, Receipt, Zap, BarChart3, MessageCircle, Star, Plus 
} from 'lucide-react';
import { GlassCard } from '../../components/global/GlassCard';
import { StatCard } from '../../components/global/StatCard';
import { KitchenFeed } from './components/KitchenFeed';
import { InventoryWidget } from './components/InventoryWidget';
import { StaffWidget } from '../staff/components/StaffWidget';
import { AddStaffModal } from '../staff/components/AddStaffModal';
import { Order, InventoryItem, StaffMember, Feedback } from '../../types/types';

interface DashboardPageProps {
  orders: Order[];
  inventory: InventoryItem[];
  staff: StaffMember[];
  feedbacks: Feedback[];
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addStaff: (s: Omit<StaffMember, 'id' | 'status'>) => void;
}

export const DashboardPage = ({ 
  orders, 
  inventory, 
  staff, 
  feedbacks, 
  updateOrderStatus, 
  addStaff 
}: DashboardPageProps) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  const stats = [
    { title: "Daily Revenue", value: "$2,840.50", trend: "+12.5% vs yesterday", icon: Banknote, color: "primary-container" },
    { title: "Total Orders", value: "142", trend: "+8.2% vs yesterday", icon: Receipt, color: "tertiary" },
    { title: "Order Velocity", value: "12.4/hr", trend: "+2.1% peak", icon: Zap, color: "orange-400" },
    { title: "Kitchen Load", value: "85%", icon: Flame, color: "red-400" },
  ];

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Live Orders', icon: Utensils },
    { label: 'Inventory', icon: Box },
    { label: 'Menu Manager', icon: BookOpen },
    { label: 'Staffing', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden font-sans uppercase tracking-tight selection:bg-primary-container selection:text-black">
      {/* Admin Sidebar */}
      <aside className="w-80 h-full border-r border-white/5 bg-[#0D0D0D] flex flex-col hidden lg:flex">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,87,34,0.4)]">
              <Flame size={24} className="text-black" />
            </div>
            <h2 className="text-xl font-black tracking-tighter italic">HEARTH <span className="text-primary-container">OS</span></h2>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <div 
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${
                  activeTab === item.label 
                    ? 'bg-primary-container/10 text-primary-container border border-primary-container/20 shadow-[0_0_20px_rgba(255,87,34,0.1)]' 
                    : 'text-on-surface-variant hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} className={activeTab === item.label ? 'text-primary-container' : 'group-hover:scale-110 transition-transform'} />
                <span className="text-sm font-bold uppercase tracking-tight">{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 space-y-6">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
            <img src={staff[0]?.avatar} className="w-10 h-10 rounded-xl object-cover" referrerPolicy="no-referrer" />
            <div className="overflow-hidden">
              <p className="text-xs font-black uppercase tracking-tight truncate">{staff[0]?.name}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{staff[0]?.role}</p>
            </div>
          </div>
          <button className="w-full py-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-500/20 transition-all active:scale-95">
            End Shift
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-10 overflow-y-auto no-scrollbar">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic">
              {activeTab === 'Dashboard' ? 'Hearth Command' : activeTab}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 glass-badge bg-green-500/10 text-green-500 border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Truck Active
              </div>
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Downtown Night Market • 12:55 PM</span>
            </div>
          </div>
          {activeTab === 'Live Orders' && (
            <button className="glass-button glass-button-primary flex items-center gap-3 shadow-[0_15px_30px_rgba(255,87,34,0.25)]">
              <Plus size={20} />
              <span className="uppercase tracking-tighter">New Order</span>
            </button>
          )}
        </div>

        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <GlassCard className="h-full">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black uppercase tracking-widest italic">Revenue Analytics</h3>
                    <BarChart3 size={18} className="text-on-surface-variant" />
                  </div>
                  <div className="h-48 flex items-end gap-2">
                    {[40, 65, 55, 85, 100, 45, 60].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex-1 rounded-t-lg relative group transition-all ${i === 4 ? 'bg-primary-container shadow-[0_0_20px_rgba(255,87,34,0.3)]' : 'bg-white/5 hover:bg-white/10'}`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-[8px] font-black uppercase tracking-widest text-on-surface-variant">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </GlassCard>

                <GlassCard className="h-full">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black uppercase tracking-widest italic">Recent Feedback</h3>
                    <MessageCircle size={18} className="text-on-surface-variant" />
                  </div>
                  <div className="space-y-4">
                    {feedbacks.slice(0, 3).map((f) => (
                      <div key={f.id} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase text-on-surface">{f.userName}</span>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={8} className={i < f.rating ? 'fill-primary-container text-primary-container' : 'text-white/10'} />
                            ))}
                          </div>
                        </div>
                        <p className="text-[10px] text-on-surface-variant line-clamp-2">{f.comment}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
              <InventoryWidget items={inventory} />
            </div>
            <div className="xl:col-span-4">
              <StaffWidget staff={staff} onAddClick={() => setIsStaffModalOpen(true)} />
            </div>
          </div>
        )}

        {activeTab === 'Live Orders' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <StatCard 
                  key={i} 
                  title={stat.title}
                  value={stat.value}
                  trend={stat.trend}
                  icon={stat.icon}
                  color={stat.color}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              <div className="xl:col-span-8">
                <KitchenFeed orders={orders} onUpdateStatus={updateOrderStatus} />
              </div>
              <div className="xl:col-span-4">
                <InventoryWidget items={inventory} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Inventory' && (
          <div className="max-w-5xl">
            <InventoryWidget items={inventory} />
          </div>
        )}

        {activeTab === 'Staffing' && (
          <div className="max-w-5xl">
            <StaffWidget staff={staff} onAddClick={() => setIsStaffModalOpen(true)} />
          </div>
        )}

        {activeTab === 'Menu Manager' && (
          <GlassCard className="p-12 text-center space-y-4">
            <BookOpen className="mx-auto text-primary-container" size={48} />
            <h3 className="text-xl font-bold">Menu Manager Service</h3>
            <p className="text-on-surface-variant">Update prices, descriptions, and item availability in real-time.</p>
          </GlassCard>
        )}
      </main>

      <AnimatePresence>
        {isStaffModalOpen && (
          <AddStaffModal 
            onClose={() => setIsStaffModalOpen(false)} 
            onAdd={addStaff} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
