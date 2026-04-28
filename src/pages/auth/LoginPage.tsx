import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowLeft, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { ResponsiveContainer } from '../../components/global/ResponsiveContainer';

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export const LoginPage = ({ onLogin, onBack }: LoginPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <ResponsiveContainer className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg glass-card p-8 md:p-12 space-y-10 relative overflow-hidden"
      >
        {/* Background glow side effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-container/10 blur-[80px] rounded-full" />
        
        <div className="space-y-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          <div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
              {isLogin ? 'Access' : 'Deploy'} <br/> <span className="text-primary-container">Credentials</span>
            </h1>
            <p className="text-on-surface-variant mt-2 text-sm">Welcome to the Hearth. Please authorize your session.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {!isLogin && (
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-container transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Your Full Name" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-primary-container transition-all placeholder:text-on-surface-variant/40"
                />
              </div>
            )}
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-container transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                placeholder="Secure Email Address" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-primary-container transition-all placeholder:text-on-surface-variant/40"
              />
            </div>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-container transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                placeholder="Access Keycode" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-primary-container transition-all placeholder:text-on-surface-variant/40"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full group relative bg-[#FF5722] text-black py-5 rounded-2xl font-black text-xl uppercase tracking-tighter flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,87,34,0.25)] hover:shadow-[0_25px_50px_rgba(255,87,34,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:opacity-50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-2 tracking-widest italic">
              {isLoading ? 'Decrypting...' : (isLogin ? 'Initiate Session' : 'Create Alliance')}
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
            </span>
          </button>
        </form>

        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary-container transition-colors"
          >
            {isLogin ? "Need a new account?" : "Existing operative?"}
          </button>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-green-500/50">
              <ShieldCheck size={12} />
              SSL active
            </div>
            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-primary-container/50">
              <Zap size={12} />
              Instant Load
            </div>
          </div>
        </div>
      </motion.div>
    </ResponsiveContainer>
  );
};
