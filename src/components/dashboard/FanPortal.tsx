import React, { useState } from 'react';
import { 
  Wallet, 
  Gavel,
  History,
  ArrowDownToLine,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { useContract } from '../../context/ContractContext';
import { Leaderboard } from './Leaderboard';

export const FanPortal = () => {
  const { franchises, placeBid, withdrawRefund, pendingRefund, isConnected, connectWallet, balance } = useContract();
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState('');

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 animate-in fade-in duration-700">
        <div className="w-20 h-20 rounded-3xl bg-psl-green/10 flex items-center justify-center text-psl-green neon-glow-green">
          <Gavel size={40} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Join the Auction</h2>
          <p className="text-gray-400 max-w-xs">Connect your wallet to place bids, own franchises, and earn fan tokens.</p>
        </div>
        <button 
          onClick={connectWallet}
          className="bg-psl-green text-black px-8 py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-psl-green/90 transition-all neon-glow-green flex items-center gap-2"
        >
          <Wallet size={20} />
          Connect Wallet
        </button>
      </div>
    );
  }

  const handleBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFranchise) return;
    
    const amount = parseFloat(bidAmount);
    if (amount <= selectedFranchise.highestBid) {
      alert('Bid must be higher than current highest bid');
      return;
    }

    await placeBid(selectedFranchise.id, amount);
    setIsBidModalOpen(false);
    setBidAmount('');
  };

  const handleWithdraw = async () => {
    if (pendingRefund > 0) {
      await withdrawRefund();
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="relative min-h-[300px] md:h-[300px] rounded-[2rem] overflow-hidden group">
        <img 
          src="https://picsum.photos/seed/stadium/1200/400" 
          alt="Stadium" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-psl-dark via-psl-dark/60 to-transparent" />
        <div className="relative h-full p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 bg-psl-green/20 border border-psl-green/30 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-psl-green animate-pulse" />
              <span className="text-[10px] font-black text-psl-green uppercase tracking-widest">Live Auctions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
              Own a Piece of <span className="text-psl-green">PSL History</span>
            </h2>
            <p className="text-gray-300 font-medium max-w-xl text-sm sm:text-base">
              Step 2: Place your bids on active franchises. Step 3: Withdraw refunds if you're outbid.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-fit">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-mono uppercase">Your Balance</span>
              <span className="text-xl font-black text-psl-green">{balance} ETH</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="w-10 h-10 bg-psl-green/20 rounded-xl flex items-center justify-center text-psl-green">
              <Wallet size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-2">
              <Gavel size={20} className="text-psl-green" />
              Step 2: Active Auctions
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {franchises.filter(f => f.auctionActive).map((f) => (
              <div key={f.id}>
                <Card className="group hover:border-psl-green/30 transition-all duration-500 overflow-hidden">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <h4 className="font-bold text-lg leading-tight uppercase italic">{f.name}</h4>
                        <p className="text-[10px] text-gray-400 font-mono">FRANCHISE ID: #{f.id}</p>
                      </div>
                      <div className="bg-psl-green/10 text-psl-green px-2 py-1 rounded text-[10px] font-black uppercase">
                        Active
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 font-mono uppercase">Highest Bid</span>
                        <span className="text-lg font-black text-psl-green">{f.highestBid} ETH</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-500 font-mono uppercase">Bidder</span>
                        <span className="text-xs font-mono text-gray-300">{f.highestBidder?.slice(0, 6) || 'None'}...</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => { setSelectedFranchise(f); setIsBidModalOpen(true); }}
                      className="w-full bg-psl-green text-black py-3 rounded-xl font-black uppercase tracking-tighter hover:bg-psl-green/90 transition-all neon-glow-green"
                    >
                      Place Bid
                    </button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-2">
            <ArrowDownToLine size={20} className="text-psl-blue" />
            Step 3: Refund Pool
          </h3>
          
          <Card className="border-psl-blue/30 bg-psl-blue/5">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-psl-blue/20 flex items-center justify-center text-psl-blue">
                  <History size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-mono uppercase">Pending Refund</span>
                  <span className="text-2xl font-black text-white">{pendingRefund} ETH</span>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 leading-relaxed">
                  If you were outbid in any franchise auction, your funds are automatically added to the refund pool.
                </p>
              </div>

              <button 
                onClick={handleWithdraw}
                disabled={pendingRefund === 0}
                className={cn(
                  "w-full py-4 rounded-2xl font-black uppercase tracking-tighter transition-all flex items-center justify-center gap-2",
                  pendingRefund > 0 
                    ? "bg-psl-blue text-white hover:bg-psl-blue/80 neon-glow-blue" 
                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                )}
              >
                <ArrowDownToLine size={18} />
                Withdraw Refund
              </button>
            </div>
          </Card>

          <Leaderboard />
        </div>
      </div>

      <Modal 
        isOpen={isBidModalOpen} 
        onClose={() => setIsBidModalOpen(false)} 
        title={`Bid on ${selectedFranchise?.name}`}
      >
        <form className="flex flex-col gap-4" onSubmit={handleBid}>
          <div className="p-4 rounded-xl bg-psl-green/5 border border-psl-green/10 mb-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Current Highest Bid</span>
              <span className="text-lg font-black text-psl-green">{selectedFranchise?.highestBid} ETH</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Your Bid Amount (ETH)</label>
            <input 
              type="number" 
              step="0.01"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder={`Min. ${(selectedFranchise?.highestBid || 0) + 0.01}`} 
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-psl-green transition-colors" 
              required 
            />
          </div>
          
          <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 text-psl-gold">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase">Safe Transaction</span>
            </div>
            <p className="text-[10px] text-gray-500 italic">
              Bidding will lock your ETH in the contract. If outbid, you can withdraw it from the Refund Pool.
            </p>
          </div>

          <button type="submit" className="w-full bg-psl-green text-black py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-psl-green/90 transition-all mt-2 neon-glow-green">
            Confirm Bid
          </button>
        </form>
      </Modal>
    </div>
  );
};
