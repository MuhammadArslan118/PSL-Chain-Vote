import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Ticket, 
  Database, 
  Wallet, 
  ShieldCheck,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { SidebarItem } from '../ui/SidebarItem';
import { View } from '../../types';

import { useContract } from '../../context/ContractContext';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ activeView, setActiveView, isOpen, onClose }: SidebarProps) => {
  const { role, userAddress, isConnected, balance, connectWallet } = useContract();

  const navItems = [
    { id: 'admin', label: 'PCB Admin', icon: LayoutDashboard, role: 'owner' },
    { id: 'owner', label: 'Team Owner', icon: Users, role: 'winner' },
    { id: 'fan', label: 'Fan Portal', icon: Ticket, role: 'bidder' },
    { id: 'blockchain', label: 'Blockchain', icon: Database, role: 'both' },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (item.role === 'both') return true;
    if (role === 'owner') return item.role === 'owner' || item.id === 'blockchain';
    if (role === 'winner') return item.role === 'winner' || item.id === 'fan' || item.id === 'blockchain';
    return item.role === 'bidder' || item.id === 'blockchain';
  });

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 glass border-r border-white/5 transition-transform duration-500 lg:relative lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-psl-green flex items-center justify-center text-black neon-glow-green">
              <ShieldCheck size={24} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter leading-none">CHAINVOTE</span>
              <span className="text-[10px] font-mono text-psl-green tracking-widest uppercase">PSL Edition</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/5 text-gray-400 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2 px-4">Dashboards</p>
          {filteredNavItems.filter(i => i.id !== 'blockchain').map((item) => (
            <div key={item.id}>
              <SidebarItem
                icon={item.icon}
                label={item.label}
                active={activeView === item.id}
                onClick={() => setActiveView(item.id as View)}
              />
            </div>
          ))}
          
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-6 mb-2 px-4">System</p>
          <SidebarItem 
            icon={Database} 
            label="Blockchain" 
            active={activeView === 'blockchain'} 
            onClick={() => setActiveView('blockchain')} 
          />
        </nav>

        <div className="mt-auto">
          {isConnected ? (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-psl-gold/20 flex items-center justify-center text-psl-gold">
                  <Wallet size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-mono uppercase">
                    {role === 'owner' ? 'Admin' : role === 'winner' ? 'Owner' : 'Fan'} Wallet
                  </span>
                  <span className="text-xs font-bold truncate w-32">{userAddress}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-400 font-mono">BALANCE</span>
                <span className="text-xs font-bold text-psl-green">{balance} ETH</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 border-dashed flex flex-col gap-3 items-center text-center">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 font-mono uppercase">Wallet Disconnected</span>
                <p className="text-[10px] text-gray-400 italic">Connect to access features</p>
              </div>
              <button 
                onClick={connectWallet}
                className="w-full bg-psl-green text-black py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-psl-green/90 transition-all"
              >
                Connect
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
