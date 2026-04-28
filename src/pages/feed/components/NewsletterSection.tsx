import React, { useState } from 'react';
import { motion } from 'motion/react';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="relative py-24 px-4 md:px-6 overflow-hidden bg-[#121212]">
      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
        <img 
          src="https://picsum.photos/seed/urban-night/1920/1080?blur=2" 
          alt="Urban Night" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white leading-none uppercase">
              NEVER MISS <br/> THE EMBER.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed">
              Join the Ember list for drop alerts, secret menu items, and location updates before everyone else.
            </p>
          </div>

          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-primary-container/20 border border-primary-container/30 backdrop-blur-md max-w-md"
            >
              <h3 className="text-2xl font-black text-primary-container mb-2">Welcome to the Crew.</h3>
              <p className="text-on-surface-variant">You're on the list. Watch for the spark.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your street address (email)"
                className="flex-1 bg-black/40 border border-white/10 rounded-full px-8 py-5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/50 transition-all backdrop-blur-sm"
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="px-10 py-5 bg-[#FF5722] text-black font-black text-lg rounded-full hover:bg-[#FF7043] transition-all active:scale-95 shadow-[0_10px_30px_rgba(255,87,34,0.3)] disabled:opacity-50 uppercase tracking-tight"
              >
                {status === 'loading' ? 'Joining...' : 'SIGN ME UP'}
              </button>
            </form>
          )}
        </motion.div>

        <div className="hidden lg:block relative">
          <div className="absolute -inset-4 bg-[#FF5722]/10 blur-3xl rounded-full"></div>
          <img 
            src="https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&q=80&w=800" 
            alt="Food Truck Night" 
            className="relative rounded-2xl shadow-2xl border border-white/5 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
};
