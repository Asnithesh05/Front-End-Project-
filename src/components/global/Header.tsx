import React from 'react';
import { LogOut, Bell, ShieldCheck } from 'lucide-react';
import { Screen } from '../../types/types';

interface HeaderProps {
  onNavigate: (s: Screen) => void;
  currentScreen: Screen;
  isAdmin: boolean;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const Header = ({ onNavigate, currentScreen, isAdmin, isAuthenticated, onLogout }: HeaderProps) => (
  <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-6 py-4 bg-[#1C1C1C]/40 backdrop-blur-3xl rounded-b-[1.5rem] md:rounded-b-[2rem] shadow-[0_20px_50px_rgba(255,87,51,0.08)]">
    <div className="flex items-center gap-4">
      <div 
        className="text-xl md:text-2xl font-black tracking-tighter text-primary-container font-headline cursor-pointer truncate"
        onClick={() => onNavigate('home')}
      >
        Kinetic Hearth
      </div>
    </div>
    <nav className="hidden xl:flex items-center gap-6 xl:gap-8">
      <button 
        onClick={() => onNavigate('home')}
        className={`${currentScreen === 'home' ? 'text-primary-container font-bold' : 'text-on-surface/60'} hover:bg-primary-container/10 transition-colors px-3 py-1 rounded-full font-headline`}
      >
        Feed
      </button>
      <button 
        onClick={() => onNavigate('menu')}
        className={`${currentScreen === 'menu' ? 'text-primary-container font-bold' : 'text-on-surface/60'} hover:bg-primary-container/10 transition-colors px-3 py-1 rounded-full font-headline`}
      >
        Menu
      </button>
      <button 
        onClick={() => onNavigate('order-status')}
        className={`${currentScreen === 'order-status' ? 'text-primary-container font-bold' : 'text-on-surface/60'} hover:bg-primary-container/10 transition-colors px-3 py-1 rounded-full font-headline`}
      >
        Orders
      </button>
      {isAdmin && (
        <button 
          onClick={() => onNavigate('dashboard')}
          className={`${currentScreen === 'dashboard' ? 'text-primary-container font-bold' : 'text-on-surface/60'} hover:bg-primary-container/10 transition-colors px-3 py-1 rounded-full font-headline`}
        >
          Kitchen
        </button>
      )}
      <button 
        onClick={() => onNavigate('profile')}
        className={`${currentScreen === 'profile' ? 'text-primary-container font-bold' : 'text-on-surface/60'} hover:bg-primary-container/10 transition-colors px-3 py-1 rounded-full font-headline`}
      >
        Profile
      </button>
    </nav>
    <div className="flex items-center gap-2 md:gap-4">
      {isAuthenticated ? (
        <button 
          onClick={onLogout}
          className="p-2 text-primary-container hover:bg-primary-container/10 transition-colors rounded-full active:scale-95 duration-200 flex items-center gap-2"
        >
          <LogOut size={20} />
          <span className="text-xs font-bold hidden lg:inline">Logout</span>
        </button>
      ) : (
        <button 
          onClick={() => onNavigate('admin-login')}
          className="p-2 text-on-surface/60 hover:bg-primary-container/10 transition-colors rounded-full active:scale-95 duration-200"
          title="Admin Login"
        >
          <ShieldCheck size={24} />
        </button>
      )}
      <button className="p-2 text-on-surface/60 hover:bg-primary-container/10 transition-colors rounded-full active:scale-95 duration-200">
        <Bell size={24} />
      </button>
    </div>
  </header>
);
