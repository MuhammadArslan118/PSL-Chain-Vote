import React, { useState } from 'react';
import { 
  Plus, 
  Gavel, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { Modal } from '../ui/Modal';
import { cn } from '../../lib/utils';
import { useContract } from '../../context/ContractContext';

export const AdminDashboard = () => {
  const { franchises, createFranchise, closeAuction, isConnected, connectWallet } = useContract();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newFranchiseName, setNewFranchiseName] = useState('');

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 animate-in fade-in duration-700">
        <div className="w-20 h-20 rounded-3xl bg-psl-green/10 flex items-center justify-center text-psl-green neon-glow-green">
          <ShieldCheck size={40} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Restricted Access</h2>
          <p className="text-gray-400 max-w-xs">Please connect your authorized PCB Admin wallet to access the Owner Portal.</p>
        </div>
        <button 
          onClick={connectWallet}
          className="bg-psl-green text-black px-8 py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-psl-green/90 transition-all neon-glow-green flex items-center gap-2"
        >
          <Plus size={20} />
          Connect Admin Wallet
        </button>
      </div>
    );
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createFranchise(newFranchiseName);
    setIsCreateModalOpen(false);
    setNewFranchiseName('');
  };

  const activeAuctions = franchises.filter(f => f.auctionActive);
  const totalBids = franchises.reduce((acc, curr) => acc + curr.highestBid, 0);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter uppercase italic">PCB Owner Portal</h1>
          <p className="text-gray-400 mt-1">Step 1: Create Franchise | Step 4: Close Auction & Mint NFT</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-psl-green text-black px-6 py-3 rounded-xl text-sm font-black uppercase tracking-tighter flex items-center gap-2 hover:bg-psl-green/90 transition-all neon-glow-green w-full md:w-auto justify-center"
        >
          <Plus size={18} />
          Step 1: Create Franchise
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Auctions" value={activeAuctions.length.toString()} trend="Live" icon={Gavel} color="bg-psl-green" />
        <StatCard label="Total Bid Volume" value={`${totalBids.toFixed(2)} ETH`} trend="+12%" icon={TrendingUp} color="bg-psl-blue" />
        <StatCard label="Total Franchises" value={franchises.length.toString()} trend="Verified" icon={Users} color="bg-psl-gold" />
        <StatCard label="Network Status" value="Healthy" trend="12ms" icon={ShieldCheck} color="bg-psl-green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Bid Distribution" subtitle="Highest bids per franchise" className="lg:col-span-2">
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={franchises}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="highestBid" radius={[4, 4, 0, 0]}>
                  {franchises.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.auctionActive ? '#00FF00' : '#007BFF'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Step 4: Finalize Auctions" subtitle="Close bidding & mint NFTs">
          <div className="flex flex-col gap-4 mt-2">
            {activeAuctions.map((f) => (
              <div key={f.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3 group hover:border-psl-green/30 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase italic">{f.name}</span>
                  <span className="text-xs font-mono text-psl-green">{f.highestBid} ETH</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                  <span>WINNER: {f.highestBidder?.slice(0, 6)}...</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> LIVE</span>
                </div>
                <button 
                  onClick={() => closeAuction(f.id)}
                  disabled={f.highestBid === 0}
                  className="w-full bg-psl-blue/20 text-psl-blue border border-psl-blue/30 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-psl-blue hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Close & Mint NFT
                </button>
              </div>
            ))}
            {activeAuctions.length === 0 && (
              <p className="text-xs text-gray-500 italic text-center py-4">No active auctions to close.</p>
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {franchises.map((f) => (
          <div key={f.id}>
            <Card className="group hover:border-psl-green/30 transition-all duration-500">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h4 className="font-bold text-lg leading-tight uppercase italic">{f.name}</h4>
                  <p className="text-[10px] text-gray-400 mt-1 font-mono">ID: #{f.id}</p>
                </div>
                <div className={cn(
                  "px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider",
                  f.auctionActive ? "bg-psl-green/20 text-psl-green" : "bg-psl-blue/20 text-psl-blue"
                )}>
                  {f.auctionActive ? 'Auction Active' : 'Minted'}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-mono uppercase">Highest Bid</span>
                  <span className="text-sm font-bold text-psl-green">{f.highestBid} ETH</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-gray-500 font-mono uppercase">Bidder</span>
                  <span className="text-xs font-mono text-gray-300">{f.highestBidder?.slice(0, 6) || 'None'}...</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-psl-green" />
                  <span className="text-[10px] text-gray-400 font-mono">VERIFIED ON-CHAIN</span>
                </div>
                {f.minted && (
                  <div className="flex items-center gap-1 text-psl-blue">
                    <CheckCircle2 size={14} />
                    <span className="text-[10px] font-black uppercase">Finalized</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        title="Step 1: Create New Franchise"
      >
        <form className="flex flex-col gap-4" onSubmit={handleCreate}>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Franchise Name</label>
            <input 
              type="text" 
              value={newFranchiseName}
              onChange={(e) => setNewFranchiseName(e.target.value)}
              placeholder="e.g. Peshawar Panthers" 
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-psl-green transition-colors" 
              required 
            />
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-psl-gold">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase">Smart Contract Action</span>
            </div>
            <p className="text-[10px] text-gray-500 italic leading-relaxed">
              This will initialize a new franchise on the blockchain. The auction will start immediately with 0 ETH starting bid.
            </p>
          </div>
          <button type="submit" className="w-full bg-psl-green text-black py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-psl-green/90 transition-all mt-2 neon-glow-green">
            Deploy Franchise
          </button>
        </form>
      </Modal>
    </div>
  );
};
