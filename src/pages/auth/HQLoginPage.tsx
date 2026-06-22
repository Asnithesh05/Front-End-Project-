import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Globe, ArrowLeft, Terminal, Server } from 'lucide-react';
import { ResponsiveContainer } from '../../components/global/ResponsiveContainer';

interface HQLoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export const HQLoginPage = ({ onLogin, onBack }: HQLoginPageProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // Mock hardcoded HQ password
      if (password.toLowerCase() === 'hq2026' || password.toLowerCase() === 'hearth2024') {
        onLogin();
      } else {
        setError('ACCESS DENIED: Global Command encryption keys did not match Central database.');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <ResponsiveContainer className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-10 space-y-10 border-cyan-500/10 shadow-[0_0_100px_rgba(6,182,212,0.05)] bg-[#050505]/95 rounded-[2.5rem]"
      >
        <div className="space-y-6">
          <button 
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            RETURN TO BASE
          </button>
          
          <div className="space-y-3">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Globe size={24} className="animate-pulse" />
            </div>
            <h1 className="text-4xl font-extrabold italic tracking-tighter uppercase leading-none">
              HQ GLOBAL <br/> <span className="text-cyan-400">GATEWAY</span>
            </h1>
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Central HQ Command Authentication</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-[9px] font-black uppercase tracking-widest text-cyan-400">
              <Server size={14} />
              Cross-node master session console
            </div>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="HQ CONSOLE KEY" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-white/10 text-center tracking-[0.5em] font-black uppercase text-xs"
              />
            </div>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-400 text-[10px] font-mono leading-relaxed bg-red-500/5 p-4 border border-red-500/10 rounded-xl"
              >
                {error}
              </motion.p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-cyan-400 hover:bg-cyan-300 disabled:bg-cyan-950 disabled:text-cyan-400/50 text-black py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_15px_35px_rgba(6,182,212,0.2)] hover:shadow-[0_20px_40px_rgba(6,182,212,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ESTABLISHING UPLINK...
              </>
            ) : (
              <>
                INITIALIZE CORE SESSION
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/20">
          <span>SECURE PROTOCOL V1.9</span>
          <span>LATENCY: 14MS</span>
        </div>
      </motion.div>
    </ResponsiveContainer>
  );
};
