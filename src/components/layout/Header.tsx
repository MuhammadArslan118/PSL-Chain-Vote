import React from 'react';
import { Search, Bell, Menu, User, Settings, LogOut, ChevronDown, Shield, Wallet } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useContract } from '../../context/ContractContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { role, userAddress, isConnected, connectWallet, disconnectWallet } = useContract();

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
            placeholder="Search auctions, tokens, or tx hash..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-psl-green transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!isConnected ? (
          <button 
            onClick={connectWallet}
            className="bg-psl-green text-black px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-tighter flex items-center gap-2 hover:bg-psl-green/90 transition-all neon-glow-green"
          >
            <Wallet size={16} />
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center gap-3 pl-2">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold">
                {role === 'owner' ? 'PCB Admin' : role === 'winner' ? 'Team Owner' : 'Fan Account'}
              </span>
              <span className="text-[10px] text-psl-green font-mono uppercase tracking-wider">Verified</span>
            </div>
            
            <div className="relative group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-psl-green to-psl-blue p-0.5 cursor-pointer">
                <div className="w-full h-full rounded-[10px] bg-psl-dark flex items-center justify-center overflow-hidden">
                  <img src={`https://picsum.photos/seed/${userAddress}/40/40`} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              
              {/* Dropdown with bridge to prevent closing on hover gap */}
              <div className="absolute top-full right-0 pt-2 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <div className="bg-[#0a0a0a] backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden py-2">
                  <div className="px-4 py-2 border-b border-white/5 mb-1">
                    <p className="text-[10px] text-gray-500 font-mono uppercase">Address</p>
                    <p className="text-xs font-mono truncate text-psl-green">{userAddress}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2 transition-colors">
                    <User size={14} className="text-psl-green" /> My Profile
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2 transition-colors">
                    <Settings size={14} className="text-psl-blue" /> Settings
                  </button>
                  <div className="h-px bg-white/5 my-1" />
                  <button 
                    onClick={disconnectWallet}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/5 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={14} /> Disconnect
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
