import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Camera, Check } from 'lucide-react';
import { StaffMember } from '../../../types/types';

interface AddStaffModalProps {
  onClose: () => void;
  onAdd: (s: Omit<StaffMember, 'id' | 'status'>) => void;
}

export const AddStaffModal = ({ onClose, onAdd }: AddStaffModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'Head cook',
    avatar: 'https://i.pravatar.cc/150?u=' + Math.random()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      role: 'Head cook',
      avatar: 'https://i.pravatar.cc/150?u=' + Math.random()
    });
  };

  const roles = ['Head cook', 'Logistics', 'dining staff', 'Prep lead'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-lg glass-card p-8 space-y-6 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-container via-orange-500 to-primary-container" />
        
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black italic tracking-tighter uppercase">Add New Staff</h2>
            <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Onboard a kitchen hero</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-on-surface-variant transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="relative group">
              <img src={formData.avatar} className="w-24 h-24 rounded-2xl object-cover border-2 border-primary-container/20 group-hover:border-primary-container/50 transition-all" />
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-2xl cursor-pointer transition-all">
                <Camera size={24} />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setFormData(prev => ({ ...prev, avatar: url }));
                    }
                  }} 
                />
              </label>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary-container">Upload Portrait</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Full Name</label>
              <input 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-container transition-colors"
                placeholder="Staff Name"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Position</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-container transition-colors appearance-none"
                value={formData.role}
                onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
              >
                {roles.map(r => <option key={r} value={r} className="bg-[#121212]">{r}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Mobile Number</label>
              <input 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-container transition-colors"
                placeholder="+1 234 567 890"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Email Address</label>
              <input 
                required
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-container transition-colors"
                placeholder="staff@hearth.com"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Address</label>
            <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-container transition-colors h-20 resize-none"
              placeholder="Physical street address"
              value={formData.address}
              onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full py-4 rounded-xl bg-primary-container text-black font-black uppercase tracking-widest italic flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,87,34,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>Accept Hero</span>
              <Check size={20} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
