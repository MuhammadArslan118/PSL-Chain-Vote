import React from 'react';
import { Ticket, Users, TrendingUp, LineChart as ChartIcon } from 'lucide-react';
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

export const OwnerDashboard = () => {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter">Owner Command Center</h1>
          <p className="text-gray-400 mt-1">Manage Fan Tokens, Governance, and Market Activity</p>
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
            <StatCard label="Total Holders" value="12,450" trend="+450" icon={Users} color="bg-psl-blue" />
            <StatCard label="Tokens Sold" value="850,000" trend="85%" icon={Ticket} color="bg-psl-green" />
            <StatCard label="Market Cap" value="$1.2M" trend="+15%" icon={TrendingUp} color="bg-psl-gold" />
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
        </div>
      </div>
    </div>
  );
};
