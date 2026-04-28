import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Flame } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection = ({ onExplore }: HeroSectionProps) => (
  <section className="relative min-h-screen w-full flex items-center justify-center wave-lighting px-4 md:px-6 py-24 md:py-0 overflow-hidden">
    <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-5 z-10 space-y-6 md:space-y-8 text-center lg:text-left"
      >
        <div className="space-y-2">
          <span className="text-tertiary text-xs md:text-sm tracking-[0.05em] font-medium uppercase bg-tertiary/10 px-4 py-1.5 rounded-full inline-block">
            Artisanal Street Food
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-on-surface leading-[0.9]">
            Gourmet <br/>
            <span className="text-primary-container">on the Go</span>
          </h1>
        </div>
        <p className="text-on-surface-variant text-base md:text-lg lg:text-xl max-w-md mx-auto lg:mx-0 leading-relaxed">
          Experience the precision of high-end hardware meeting the warmth of the artisanal grill. Our hearth is digital, our flavor is legendary.
        </p>
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
          <button 
            onClick={onExplore}
            className="group relative px-10 py-5 bg-[#FF5722] text-black font-black text-lg rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,87,34,0.3)] hover:shadow-[0_25px_50px_rgba(255,87,34,0.5)] flex items-center gap-3 uppercase tracking-tighter"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-2">
              Explore Menu
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
            </span>
          </button>
          <button className="px-10 py-5 border-2 border-white/10 text-white font-black text-lg rounded-2xl hover:bg-white/5 transition-all duration-500 active:scale-95 uppercase tracking-tighter">
            Find Hearth
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-7 relative flex justify-center lg:justify-end mt-8 lg:mt-0"
      >
        <div className="absolute -top-12 -left-12 w-32 md:w-48 h-32 md:h-48 bg-primary-container/20 rounded-full blur-[60px] md:blur-[80px]"></div>
        <div className="absolute -bottom-12 -right-12 w-48 md:w-64 h-48 md:h-64 bg-tertiary/10 rounded-full blur-[80px] md:blur-[100px]"></div>
        
        <div className="relative group max-w-[320px] md:max-w-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/30 to-transparent rounded-xl rotate-3 blur-2xl group-hover:rotate-6 transition-transform duration-700"></div>
          <div className="relative rounded-xl overflow-hidden glass-panel border border-outline-variant/10 shadow-2xl p-3 md:p-4">
            <img 
              alt="Gourmet Burger" 
              className="w-full aspect-[4/5] object-cover rounded-lg transform transition-transform duration-1000 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvF02vjGTMpB7j7DL6xY4SjB0R2OhON7N26pdXdg50mclerUqhnZUbcqXPmfQ02CACb7XI4ZRKJAg8fxYGc5OsWzhrVZzx7rKEDBz6Acm9-WKCeVp6YLXWpQHsjNM8834aLi-_0-Pg9aRJxn1m1-K25S0LyjmU0x4YT-HIbZstxQHYoFjmM67j1n_KSDS6KO_YLC2awqsu8Iny1RYMW-KZ8SKnzK_PVk3qiUiyJSevvz6f0T0lb2a7R66fiCegtk2VHH2vguCA2hU"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 p-4 md:p-6 glass-panel border border-outline-variant/20 rounded-lg max-w-[200px] md:max-w-[240px]">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="text-primary-container" size={16} />
                <span className="text-[10px] font-bold tracking-widest uppercase text-tertiary">Fresh From Hearth</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-on-surface">Smoked Truffle Smash</h3>
              <div className="mt-3 md:mt-4 flex items-center justify-between">
                <span className="text-xl md:text-2xl font-black text-primary-container">$18</span>
                <span className="text-[10px] text-on-surface-variant italic">Limited Batch</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
