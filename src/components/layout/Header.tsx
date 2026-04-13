import React from 'react';
import { Search, Bell, Menu, User, Settings, LogOut } from 'lucide-react';
import { Dropdown } from '../ui/Dropdown';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const profileOptions = [
    { label: 'My Profile', value: 'profile' },
    { label: 'Settings', value: 'settings' },
    { label: 'Logout', value: 'logout' },
  ];

  return (
    <header className="h-20 glass border-b border-white/5 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button 
          onClick={onMenuClick}
          className="p-2.5 rounded-xl hover:bg-white/5 text-gray-400 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search proposals, tokens, or tx hash..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-psl-green transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-xl hover:bg-white/5 text-gray-400 transition-colors relative hidden sm:flex">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-psl-green rounded-full border-2 border-psl-dark" />
        </button>
        <div className="w-px h-6 bg-white/10 hidden sm:block" />
        
        <div className="flex items-center gap-3 pl-2">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-bold">PCB Admin</span>
            <span className="text-[10px] text-psl-green font-mono uppercase tracking-wider">Verified</span>
          </div>
          
          <div className="relative group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-psl-green to-psl-blue p-0.5 cursor-pointer">
              <div className="w-full h-full rounded-[10px] bg-psl-dark flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/seed/user/40/40" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            
            {/* Simple themed dropdown for profile */}
            <div className="absolute top-full right-0 mt-2 w-48 glass border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
              <button className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2">
                <User size={14} /> My Profile
              </button>
              <button className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2">
                <Settings size={14} /> Settings
              </button>
              <div className="h-px bg-white/5 my-1" />
              <button className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/5 flex items-center gap-2">
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
