import React, { useState, useMemo } from 'react';
import { 
  Users, 
  TrendingUp, 
  Activity, 
  Cpu, 
  Filter, 
  Plus, 
  ChevronRight, 
  ShieldCheck, 
  ArrowRightLeft 
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn, formatCurrency } from '../../lib/utils';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { Modal } from '../ui/Modal';
import { Dropdown } from '../ui/Dropdown';
import { MOCK_PROPOSALS, CHART_DATA } from '../../data/mockData';

export const AdminDashboard = () => {
  const [filter, setFilter] = useState<'all' | 'selected' | 'pending'>('all');
  const [sortBy, setSortBy] = useState<'amount' | 'votes' | 'reputation'>('amount');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamPreference, setTeamPreference] = useState('Lahore Qalandars');

  const sortOptions = [
    { label: 'Sort by Amount', value: 'amount' },
    { label: 'Sort by Votes', value: 'votes' },
    { label: 'Sort by Reputation', value: 'reputation' },
  ];

  const teamOptions = [
    { label: 'Lahore Qalandars', value: 'Lahore Qalandars' },
    { label: 'Karachi Kings', value: 'Karachi Kings' },
    { label: 'Islamabad United', value: 'Islamabad United' },
    { label: 'Peshawar Zalmi', value: 'Peshawar Zalmi' },
    { label: 'Quetta Gladiators', value: 'Quetta Gladiators' },
    { label: 'Multan Sultans', value: 'Multan Sultans' },
  ];

  const filteredProposals = useMemo(() => {
    let result = [...MOCK_PROPOSALS];
    if (filter !== 'all') {
      result = result.filter(p => p.status === filter);
    }
    result.sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number));
    return result;
  }, [filter, sortBy]);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter">PCB Admin Portal</h1>
          <p className="text-gray-400 mt-1">Stage 1: Team Ownership Selection & Bidding Analytics</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10 h-[42px] items-center">
            {(['all', 'selected', 'pending'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all h-full",
                  filter === f ? "bg-psl-green text-black" : "text-gray-400 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          
          <Dropdown 
            options={sortOptions} 
            value={sortBy} 
            onChange={(val) => setSortBy(val as any)} 
            className="w-44"
          />

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-psl-green text-black px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-psl-green/90 transition-colors neon-glow-green h-[42px]"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Proposal</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Submit New Proposal"
      >
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-gray-500 font-mono uppercase">Investor/Company Name</label>
            <input type="text" placeholder="e.g. Hashoo Group" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-psl-green transition-colors" required />
          </div>
          
          <Dropdown 
            label="Team Preference"
            options={teamOptions}
            value={teamPreference}
            onChange={setTeamPreference}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-gray-500 font-mono uppercase">Bid Amount ($)</label>
              <input type="number" placeholder="50,000,000" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-psl-green transition-colors" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-gray-500 font-mono uppercase">Reputation Score (%)</label>
              <input type="number" placeholder="85" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-psl-green transition-colors" required />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-gray-500 font-mono uppercase">Proposal Description</label>
            <textarea rows={3} placeholder="Briefly describe your vision for the team..." className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-psl-green transition-colors resize-none" />
          </div>
          <button type="submit" className="w-full bg-psl-green text-black py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-psl-green/90 transition-all mt-2 neon-glow-green">
            Submit Proposal
          </button>
        </form>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Bids" value="124" trend="+12%" icon={Users} color="bg-psl-blue" />
        <StatCard label="Total Value" value={formatCurrency(850000000)} trend="+24%" icon={TrendingUp} color="bg-psl-green" />
        <StatCard label="Votes Cast" value="45.2K" trend="+5.4%" icon={Activity} color="bg-psl-gold" />
        <StatCard label="Network Load" value="12ms" trend="-2ms" icon={Cpu} color="bg-psl-blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Bidding Activity" subtitle="Real-time blockchain ledger" className="lg:col-span-2">
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00FF00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151619', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#00FF00' }}
                />
                <Area type="monotone" dataKey="value" stroke="#00FF00" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Top 8 Selection" subtitle="Dynamic voting progress">
          <div className="flex flex-col gap-4 mt-2">
            {MOCK_PROPOSALS.slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">{p.investor}</span>
                  <span className="text-psl-green font-mono">{(p.votes / p.totalVotes * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(p.votes / p.totalVotes * 100)}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full bg-psl-green rounded-full shadow-[0_0_10px_rgba(0,255,0,0.5)]"
                  />
                </div>
              </div>
            ))}
            <button className="text-xs text-psl-blue font-bold uppercase tracking-widest mt-2 flex items-center gap-1 hover:gap-2 transition-all">
              View All Rankings <ChevronRight size={14} />
            </button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredProposals.map((p) => (
          <div key={p.id}>
            <Card className="group hover:border-psl-green/30 transition-all duration-500">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h4 className="font-bold text-lg leading-tight">{p.investor}</h4>
                  <p className="text-xs text-gray-400 mt-1">{p.teamPreference}</p>
                </div>
                <div className={cn(
                  "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                  p.status === 'selected' ? "bg-psl-green/20 text-psl-green" : "bg-psl-gold/20 text-psl-gold"
                )}>
                  {p.status}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-mono uppercase">Bid Amount</span>
                  <span className="text-sm font-bold">{formatCurrency(p.amount)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-mono uppercase">Reputation</span>
                  <span className="text-sm font-bold text-psl-blue">{p.reputation}%</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-psl-green" />
                  <span className="text-[10px] text-gray-400 font-mono">VERIFIED ON-CHAIN</span>
                </div>
                <button className="p-2 rounded-lg bg-white/5 hover:bg-psl-green hover:text-black transition-all">
                  <ArrowRightLeft size={14} />
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
