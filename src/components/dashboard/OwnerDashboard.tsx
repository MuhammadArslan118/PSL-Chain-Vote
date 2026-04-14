import React from 'react';
import { Ticket, Users, TrendingUp, LineChart as ChartIcon, Wallet, ShieldCheck } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { CHART_DATA } from '../../data/mockData';

import { useContract } from '../../context/ContractContext';

export const OwnerDashboard = () => {
  const { franchises, userAddress, isConnected, connectWallet } = useContract();
  
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 animate-in fade-in duration-700">
        <div className="w-20 h-20 rounded-3xl bg-psl-blue/10 flex items-center justify-center text-psl-blue neon-glow-blue">
          <Users size={40} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Team Owner Access</h2>
          <p className="text-gray-400 max-w-xs">Connect your wallet to manage your franchises and fan tokens.</p>
        </div>
        <button 
          onClick={connectWallet}
          className="bg-psl-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-psl-blue/90 transition-all neon-glow-blue flex items-center gap-2"
        >
          <Wallet size={20} />
          Connect Wallet
        </button>
      </div>
    );
  }
  
  const ownedFranchises = franchises.filter(f => f.minted && f.highestBidder?.toLowerCase() === userAddress.toLowerCase());
  const totalHolders = ownedFranchises.length * 125; // Mock calculation
  
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter uppercase italic">Team Owner Portal</h1>
          <p className="text-gray-400 mt-1">Manage your franchises and fan tokens</p>
        </div>
        <button className="bg-psl-blue text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-psl-blue/90 transition-colors neon-glow-blue w-full md:w-auto justify-center">
          <Ticket size={18} />
          Create Fan Token
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Token Creation" subtitle="Deploy new smart contract" className="lg:col-span-1">
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-gray-500 font-mono uppercase">Token Name</label>
              <input type="text" placeholder="e.g. Lahore Qalandars Fan Token" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-psl-blue transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-gray-500 font-mono uppercase">Symbol</label>
              <input type="text" placeholder="$LHQ" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-psl-blue transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-gray-500 font-mono uppercase">Total Supply</label>
                <input type="number" placeholder="1,000,000" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-psl-blue transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-gray-500 font-mono uppercase">Initial Price</label>
                <input type="text" placeholder="$1.00" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-psl-blue transition-colors" />
              </div>
            </div>
            <button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-xl font-bold text-sm transition-all mt-2">
              Preview Contract
            </button>
          </div>
        </Card>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard label="Total Holders" value={totalHolders.toLocaleString()} trend="+450" icon={Users} color="bg-psl-blue" />
            <StatCard label="Franchises Owned" value={ownedFranchises.length.toString()} trend="Verified" icon={Ticket} color="bg-psl-green" />
            <StatCard label="Market Cap" value={`$${(ownedFranchises.length * 0.5).toFixed(1)}M`} trend="+15%" icon={TrendingUp} color="bg-psl-gold" />
          </div>
          
          <Card title="Market Activity" subtitle="Token price & volume analytics">
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#151619', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#007BFF' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#007BFF" strokeWidth={3} dot={{ fill: '#007BFF', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ownedFranchises.map((f) => (
              <div key={f.id} className="glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-psl-blue/10 blur-3xl -mr-16 -mt-16 group-hover:bg-psl-blue/20 transition-colors" />
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col">
                    <h4 className="text-xl font-black uppercase italic tracking-tighter">{f.name}</h4>
                    <span className="text-[10px] text-gray-500 font-mono">NFT ID: #{f.id}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-psl-blue/20 flex items-center justify-center text-psl-blue">
                    <ShieldCheck size={24} />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Acquisition Price</span>
                    <span className="text-sm font-bold text-psl-green">{f.highestBid} ETH</span>
                  </div>
                  <button className="w-full bg-white/5 border border-white/10 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-psl-blue hover:text-white transition-all">
                    Manage Tokens
                  </button>
                </div>
              </div>
            ))}
            {ownedFranchises.length === 0 && (
              <div className="col-span-2 py-12 flex flex-col items-center justify-center text-center glass rounded-3xl border border-white/5">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-500 mb-4">
                  <Ticket size={32} />
                </div>
                <h4 className="text-lg font-bold">No Franchises Owned</h4>
                <p className="text-sm text-gray-500 max-w-xs mt-2">
                  Win an auction in the Fan Portal to become a Team Owner and manage your franchise here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
