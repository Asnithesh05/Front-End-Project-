import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Activity, 
  Mail, 
  Phone, 
  Zap, 
  Power, 
  Shield, 
  TrendingUp,
  MoreHorizontal,
  Clock,
  Briefcase,
  X,
  UserMinus,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StaffMember } from '../../types/types';
import { useStaffDatabase } from '../../hooks/useStaffDatabase';

export const StaffRosterPage = () => {
  const { activeStaff, addStaff, terminateStaff } = useStaffDatabase();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [revealedPhoneId, setRevealedPhoneId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'Chef',
    avatar: 'https://i.pravatar.cc/150?u=' + Math.random()
  });

  const handleManifest = (e: React.FormEvent) => {
    e.preventDefault();
    addStaff(formData);
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      role: 'Chef',
      avatar: 'https://i.pravatar.cc/150?u=' + Math.random()
    });
  };

  const filteredStaff = activeStaff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-widest text-white uppercase flex items-center gap-4">
              <Shield className="text-orange-500" size={40} />
              Personnel Roster
            </h1>
            <p className="text-[10px] font-mono tracking-[0.4em] text-white/40 uppercase mt-2">
              Identity Matrix: STAFF_DB_LOBBY // AUTHENTICATED UPLINK
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex flex-col items-center">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Active Units</span>
              <span className="text-xl font-black text-orange-500 tabular-nums">
                {activeStaff.length}
              </span>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-4 bg-orange-500 text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-orange-400 border border-transparent transition-all active:scale-95 group shadow-[0_0_30px_rgba(249,115,22,0.2)]"
            >
              <UserPlus size={18} className="text-black" />
              Manifest New Unit
            </button>
          </div>
        </div>

        {/* Global Search */}
        <div className="relative max-w-2xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="FILTER PERSONNEL BY IDENTITY OR DESIGNATION..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-16 pr-8 text-xs font-mono tracking-widest focus:outline-none focus:border-orange-500/50 transition-all shadow-inner"
          />
        </div>

        {/* Personnel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStaff.map((member) => (
              <motion.div 
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 relative overflow-hidden transition-all duration-700 group hover:border-orange-500/30`}
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] -z-10 rounded-full bg-white/5" />

                {/* Card Header: Avatar & Info */}
                <div className="flex justify-between items-start mb-8">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl blur-sm transition-all duration-500 bg-orange-500/10" />
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="relative w-20 h-20 rounded-2xl object-cover border-2 border-white/20 grayscale-[0.5] group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <div className="flex flex-col items-end gap-2 text-right">
                    <button className="p-2 text-white/20 hover:text-white transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                    <div className="px-3 py-1 rounded-full text-[8px] font-black tracking-widest uppercase border bg-white/5 border-white/10 text-white/40 italic">
                      ID: {member.id.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Identity Info */}
                <div className="space-y-1 mb-8">
                  <h3 className="text-xl font-black tracking-tight text-white/90">{member.name}</h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest">
                    <Briefcase size={12} className="text-orange-500" />
                    {member.role}
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="flex gap-2 mb-8">
                  <a 
                    href={`mailto:${member.email}`}
                    className="flex-1 p-3 bg-white/5 rounded-xl text-white/40 hover:bg-white/10 hover:text-white transition-all border border-white/5 flex items-center justify-center group/mail"
                  >
                    <Mail size={16} className="group-hover/mail:text-orange-500 transition-colors" />
                  </a>
                  <button 
                    onClick={() => setRevealedPhoneId(revealedPhoneId === member.id ? null : member.id)}
                    className="flex-[2] p-3 bg-white/5 rounded-xl text-white/40 hover:bg-white/10 hover:text-white transition-all border border-white/5 flex items-center justify-center gap-3 overflow-hidden group/phone"
                  >
                    {revealedPhoneId === member.id ? (
                      <span className="text-[10px] font-mono tracking-tighter text-orange-400 animate-in fade-in slide-in-from-right-4">
                        {member.phone}
                      </span>
                    ) : (
                      <>
                        <Phone size={16} className="group-hover/phone:text-blue-400 transition-colors" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Reveal Uplink</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Address Fragment */}
                <div className="mb-8 p-4 bg-black/20 rounded-2xl border border-white/5 flex items-start gap-3">
                   <MapPin size={14} className="text-white/20 mt-1 flex-shrink-0" />
                   <p className="text-[10px] font-medium text-white/30 uppercase leading-relaxed tracking-wider">
                     {member.address || 'Address Not Syncronized'}
                   </p>
                </div>

                {/* TERMINATE PROTOCOL Button */}
                <button 
                  onClick={() => terminateStaff(member.id)}
                  className="w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-black shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                >
                  <UserMinus size={14} strokeWidth={3} />
                  Terminate Protocol
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Manifest New Unit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] rounded-[2.5rem] p-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-orange-500/10 blur-[100px] -z-10 rounded-full" />
              
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase">Initialize Unit</h2>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] mt-2">Manifesting Asset Session</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={20} className="text-white/40" />
                </button>
              </div>

              <form onSubmit={handleManifest} className="grid grid-cols-2 gap-8">
                <div className="col-span-2">
                  <label className="text-[9px] font-black tracking-[0.3em] text-white/30 uppercase mb-3 block italic">Unit Photo Uplink (URL)</label>
                  <input 
                    required
                    type="text" 
                    value={formData.avatar}
                    onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                    placeholder="https://images.domain.com/unit_01.jpg"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-mono focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-white/10"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-black tracking-[0.3em] text-white/30 uppercase mb-3 block italic">Full Identity</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter designation..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-mono focus:outline-none focus:border-orange-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-black tracking-[0.3em] text-white/30 uppercase mb-3 block italic">Direct Email</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="unit@kinetic.hq"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-mono focus:outline-none focus:border-orange-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-black tracking-[0.3em] text-white/30 uppercase mb-3 block italic">Uplink Frequency (Phone)</label>
                  <input 
                    required
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-mono focus:outline-none focus:border-orange-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-black tracking-[0.3em] text-white/30 uppercase mb-3 block italic">Matrix Designation</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-mono focus:outline-none focus:border-orange-500/50 transition-all text-white"
                  >
                    <option value="Head Chef" className="text-black">Head Chef</option>
                    <option value="Sous Chef" className="text-black">Sous Chef</option>
                    <option value="Chef" className="text-black">Chef</option>
                    <option value="Waiter" className="text-black">Waiter</option>
                    <option value="Logistics" className="text-black">Logistics</option>
                    <option value="Accountant" className="text-black">Accountant</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-[9px] font-black tracking-[0.3em] text-white/30 uppercase mb-3 block italic">Geo-spatial Coordinates (Address)</label>
                  <input 
                    required
                    type="text" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Enter physical node location..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-mono focus:outline-none focus:border-orange-500/50 transition-all"
                  />
                </div>

                <div className="col-span-2 flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-8 py-5 bg-white/5 text-white/40 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 transition-all"
                  >
                    Abort Initialization
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-8 py-5 bg-orange-500 text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-orange-400 transition-all shadow-[0_0_40px_rgba(249,115,22,0.3)] group"
                  >
                    Confirm Manifest
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
