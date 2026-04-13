import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { Card } from '../ui/Card';
import { TOP_VOTERS } from '../../data/mockData';
import { cn } from '../../lib/utils';

export const Leaderboard = () => {
  return (
    <Card title="Top Voters Leaderboard" subtitle="Most active community members">
      <div className="flex flex-col gap-4 mt-2">
        {TOP_VOTERS.map((voter, i) => (
          <div key={voter.rank} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm",
                voter.rank === 1 ? "bg-psl-gold text-black" : 
                voter.rank === 2 ? "bg-gray-300 text-black" :
                voter.rank === 3 ? "bg-orange-400 text-black" : "bg-white/10 text-gray-400"
              )}>
                {voter.rank === 1 ? <Trophy size={16} /> : voter.rank}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold font-mono">{voter.user}</span>
                <span className="text-[10px] text-psl-green font-bold uppercase tracking-widest">{voter.rewards} Reward</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-black tracking-tight">{voter.votes.toLocaleString()}</span>
              <span className="text-[10px] text-gray-500 font-mono uppercase">Votes</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
