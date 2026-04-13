import React, { useState } from 'react';
import { Clock, Wallet, Ticket, Plus, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import { cn, formatNumber } from '../../lib/utils';
import { Card } from '../ui/Card';
import { MOCK_VENUES } from '../../data/mockData';
import { Leaderboard } from './Leaderboard';

export const FanPortal = () => {
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative h-[300px] rounded-3xl overflow-hidden group">
        <img 
          src="https://picsum.photos/seed/stadium/1200/400" 
          alt="Stadium" 
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-psl-dark via-psl-dark/40 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-psl-green text-black text-[10px] font-black uppercase tracking-widest">Live Voting</span>
              <span className="text-xs text-gray-300 font-mono flex items-center gap-1"><Clock size={12} /> 12h 45m remaining</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">Decide the Venue</h1>
            <p className="text-gray-300 mt-2 max-w-lg">Your tokens are your voice. Vote for the opening ceremony venue and shape the future of PSL 2026.</p>
          </div>
          <button className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-tighter flex items-center gap-2 hover:bg-psl-green transition-all group">
            <Wallet size={20} />
            Connect Wallet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {MOCK_VENUES.map((v) => (
              <div 
                key={v.id}
                onClick={() => setSelectedVenue(v.id)}
                className={cn(
                  "group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border-2",
                  selectedVenue === v.id ? "border-psl-green scale-[1.02] neon-glow-green" : "border-transparent hover:border-white/20"
                )}
              >
                <div className="aspect-[4/5] relative">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] text-psl-green font-black uppercase tracking-widest mb-1">{v.city}</p>
                    <h3 className="text-xl font-black tracking-tight leading-none">{v.name}</h3>
                    
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-gray-400">VOTES</span>
                        <span className="text-white">{formatNumber(v.votes)}</span>
                      </div>
                      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-psl-green" style={{ width: `${(v.votes / v.totalVotes * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
                {selectedVenue === v.id && (
                  <div className="absolute top-4 right-4 bg-psl-green text-black p-1.5 rounded-full">
                    <ShieldCheck size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <Leaderboard />
        </div>

        <div className="flex flex-col gap-6">
          <Card title="Your Power" subtitle="Token-weighted voting">
            <div className="flex flex-col gap-4 mt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-psl-green/20 flex items-center justify-center text-psl-green">
                    <Ticket size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-mono">BALANCE</span>
                    <span className="font-bold">2,450 $LHQ</span>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 font-mono uppercase">Voting Weight</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-psl-green">x1.2</span>
                  <span className="text-xs text-gray-400">Multiplier</span>
                </div>
              </div>

              <button 
                disabled={!selectedVenue}
                className={cn(
                  "w-full py-4 rounded-2xl font-black uppercase tracking-tighter transition-all",
                  selectedVenue 
                    ? "bg-psl-green text-black neon-glow-green" 
                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                )}
              >
                Cast Your Vote
              </button>
            </div>
          </Card>

          <Card title="Swap Tokens" subtitle="Get Fan Tokens instantly">
            <div className="flex flex-col gap-3 mt-2">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="flex justify-between text-[10px] text-gray-500 font-mono mb-1">
                  <span>FROM</span>
                  <span>BAL: 1.24 ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <input type="number" placeholder="0.0" className="bg-transparent border-none focus:outline-none text-xl font-bold w-1/2" />
                  <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
                    <div className="w-4 h-4 rounded-full bg-psl-blue" />
                    <span className="text-xs font-bold">ETH</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center -my-2 z-10">
                <div className="p-1.5 rounded-lg bg-psl-dark border border-white/10">
                  <ArrowRightLeft size={14} className="rotate-90 text-gray-500" />
                </div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="flex justify-between text-[10px] text-gray-500 font-mono mb-1">
                  <span>TO</span>
                  <span>BAL: 0 $LHQ</span>
                </div>
                <div className="flex justify-between items-center">
                  <input type="number" placeholder="0.0" className="bg-transparent border-none focus:outline-none text-xl font-bold w-1/2" />
                  <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
                    <div className="w-4 h-4 rounded-full bg-psl-green" />
                    <span className="text-xs font-bold">$LHQ</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-psl-blue/20 text-psl-blue border border-psl-blue/30 py-3 rounded-xl font-bold text-sm hover:bg-psl-blue hover:text-white transition-all">
                Swap Now
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
