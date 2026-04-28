import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Smartphone, ShieldAlert, ArrowLeft, Terminal } from 'lucide-react';
import { ResponsiveContainer } from '../../components/global/ResponsiveContainer';

interface AdminLoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export const AdminLoginPage = ({ onLogin, onBack }: AdminLoginPageProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // Mock hardcoded admin password for demo
      if (password === 'hearth2024') {
        onLogin();
      } else {
        setError('UNAUTHORIZED: Access code rejected by Hearth OS Kernel.');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <ResponsiveContainer className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-10 space-y-10 border-red-500/10 shadow-[0_0_100px_rgba(239,68,68,0.05)]"
      >
        <div className="space-y-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            ABORT MISSION
          </button>
          
          <div className="space-y-3">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <ShieldAlert size={24} />
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
              COMMAND <br/> <span className="text-red-500">OVERRIDE</span>
            </h1>
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Operator Authorization Required</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/5 border border-red-500/10 text-[9px] font-black uppercase tracking-widest text-red-400">
              <Terminal size={14} />
              System access restricted to personnel
            </div>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-red-500 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="COMMAND CODE" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-red-500/50 transition-all placeholder:text-white/10 text-center tracking-[0.5em] font-black"
              />
            </div>
            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] text-red-500 font-bold uppercase text-center"
              >
                {error}
              </motion.p>
            )}
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full group relative bg-red-600 text-white py-5 rounded-2xl font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(220,38,38,0.25)] hover:bg-red-500 transition-all duration-300 disabled:opacity-50 overflow-hidden active:scale-95 italic"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-3">
              {isLoading ? 'AUTHORIZING...' : 'BYPASS KERNEL'}
              <Smartphone size={20} />
            </span>
          </button>
        </form>

        <div className="pt-8 border-t border-white/5 text-center px-4">
          <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.3em] leading-relaxed">
            All actions logged via Hearth Internal Security (HIS). Unauthorized entry will be met with automated countermeasures.
          </p>
        </div>
      </motion.div>
    </ResponsiveContainer>
  );
};
