import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Star, Package, Settings, ChevronRight, Send, User, ChevronDown } from 'lucide-react';
import { ResponsiveContainer } from '../../components/global/ResponsiveContainer';
import { GlassCard } from '../../components/global/GlassCard';
import { Feedback } from '../../types/types';

interface ProfilePageProps {
  onFeedback: (f: Omit<Feedback, 'id' | 'timestamp'>) => void;
  onLogout: () => void;
}

export const ProfilePage = ({ onFeedback, onLogout }: ProfilePageProps) => {
  const [activeHistoryTab, setActiveHistoryTab] = useState<'all' | 'delivered'>('all');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const history = [
    { 
      id: '102k', 
      items: '2x Truffle Smash', 
      status: 'Delivered', 
      date: 'Yesterday',
      total: 32.00,
      detailedItems: [
        { name: 'Truffle Smash Burger', quantity: 2, price: 14.00, img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80' },
        { name: 'Spicy Aioli Dip', quantity: 1, price: 4.00, img: 'https://images.unsplash.com/photo-1470333732907-95274e7fcff5?w=400&q=80' }
      ]
    },
    { 
      id: '101j', 
      items: '1x Neon Al Pastor', 
      status: 'Canceled', 
      date: '3 days ago',
      total: 18.00,
      detailedItems: [
        { name: 'Neon Al Pastor Tacos', quantity: 1, price: 18.00, img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80' }
      ]
    },
    { 
      id: '100h', 
      items: '3x Thermal Grain Bowl', 
      status: 'Delivered', 
      date: 'Last week',
      total: 45.00,
      detailedItems: [
        { name: 'Thermal Grain Bowl', quantity: 3, price: 15.00, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' }
      ]
    }
  ];

  const toggleOrderExpansion = (id: string) => {
    setExpandedOrderId(prev => prev === id ? null : id);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onFeedback({ userName: 'Current User', rating: feedbackRating, comment: feedbackComment });
      setIsSubmitting(false);
      setShowSuccess(true);
      setFeedbackComment('');
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <ResponsiveContainer className="py-24 space-y-12 min-h-screen">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: User Profile & Feedback */}
        <div className="lg:col-span-4 space-y-8">
          <div className="text-center space-y-6">
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-primary-container rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all"></div>
              <div className="relative w-32 h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-container group-hover:scale-105 transition-all">
                <User size={64} strokeWidth={1} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 border-4 border-surface flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black italic tracking-tighter uppercase">Legendary User</h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] mt-1">Tier 3 • Ember Specialist</p>
            </div>
          </div>

          <GlassCard className="space-y-6 p-8 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-container/0 via-primary-container to-primary-container/0" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black uppercase tracking-widest italic">Digital Feedback</h3>
              <Star size={18} className="text-primary-container" />
            </div>
            
            <AnimatePresence mode="wait">
              {showSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto text-green-500">
                    <Star fill="currentColor" size={32} />
                  </div>
                  <h4 className="text-xl font-black italic uppercase">Transmission Sent</h4>
                  <p className="text-xs text-on-surface-variant">Your feedback helps stabilize our thermal reactors.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="space-y-6">
                  <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className={`text-2xl transition-all hover:scale-125 ${star <= feedbackRating ? 'text-[#FF5722]' : 'text-white/10'}`}
                      >
                        <Star fill={star <= feedbackRating ? "currentColor" : "none"} size={28} />
                      </button>
                    ))}
                  </div>
                  <textarea 
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    required
                    maxLength={100}
                    placeholder="Briefly describe your culinary experience..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs focus:ring-1 focus:ring-[#FF5722] outline-none h-32 resize-none placeholder:text-white/20 transition-all font-medium"
                  />
                  <button 
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Review'}</span>
                    <Send size={14} />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </GlassCard>

          <button 
            onClick={onLogout}
            className="w-full py-5 rounded-2xl bg-red-500/5 text-red-400 border border-red-500/10 hover:bg-red-500/10 transition-all flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] group"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>End Session</span>
          </button>
        </div>

        {/* Right Column: Interactive History & Settings */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="text-primary-container" size={24} />
                <h3 className="text-xl font-black italic tracking-tighter uppercase">Fueling History</h3>
              </div>
              <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                <button 
                  onClick={() => setActiveHistoryTab('all')}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeHistoryTab === 'all' ? 'bg-primary-container text-black' : 'text-white/40 hover:text-white'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setActiveHistoryTab('delivered')}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeHistoryTab === 'delivered' ? 'bg-primary-container text-black' : 'text-white/40 hover:text-white'}`}
                >
                  Delivered
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {history
                .filter(h => activeHistoryTab === 'all' || h.status === 'Delivered')
                .map((item, i) => {
                  const isExpanded = expandedOrderId === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <GlassCard 
                        className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-1 ring-primary-container/20' : 'hover:border-white/20'}`}
                      >
                        <div 
                          onClick={() => toggleOrderExpansion(item.id)}
                          className="p-6 flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black italic text-primary-container text-sm">
                              #{item.id}
                            </div>
                            <div>
                              <h4 className="font-bold text-white uppercase tracking-tight">{item.items}</h4>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] text-white/30 uppercase tracking-[0.1em]">{item.date}</span>
                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${item.status === 'Delivered' ? 'text-green-500' : 'text-red-400'}`}>
                                  {item.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button 
                            className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-all ${isExpanded ? 'bg-primary-container/10 text-primary-container' : 'group-hover:bg-white/10'}`}
                          >
                            <ChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="border-t border-white/5"
                            >
                              <div className="p-6 pt-2 space-y-4">
                                <div className="space-y-4">
                                  {item.detailedItems.map((detail, idx) => (
                                    <div key={idx} className="flex items-center justify-between group/item">
                                      <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5">
                                          <img src={detail.img} alt={detail.name} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div>
                                          <p className="text-sm font-bold text-white tracking-tight">{detail.name}</p>
                                          <p className="text-[10px] text-white/40 uppercase tracking-widest">{detail.quantity}x • ${detail.price.toFixed(2)}</p>
                                        </div>
                                      </div>
                                      <p className="font-mono text-sm text-primary-container">${(detail.quantity * detail.price).toFixed(2)}</p>
                                    </div>
                                  ))}
                                </div>
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Total Fueling Cost</span>
                                  <span className="text-xl font-black italic tracking-tighter text-white">${item.total.toFixed(2)}</span>
                                </div>
                                {item.status === 'Delivered' && (
                                  <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                                    Reorder This Supply
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </GlassCard>
                    </motion.div>
                  );
                })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Settings className="text-on-surface-variant" size={24} />
              <h3 className="text-xl font-black italic tracking-tighter uppercase text-on-surface-variant">System Settings</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Security Protocol', value: 'Encrypted via OS', icon: ShieldCheck },
                { label: 'Preferences', value: 'High Fidelity Interaction', icon: Settings }
              ].map((setting, i) => (
                <div key={i} className="glass-panel p-6 border border-white/5 rounded-2xl flex items-center gap-5 hover:bg-white/5 transition-all cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center opacity-30">
                    <setting.icon size={20} />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#FF5722]">{setting.label}</h5>
                    <p className="text-sm font-bold text-on-surface-variant">{setting.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

const ShieldCheck = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
