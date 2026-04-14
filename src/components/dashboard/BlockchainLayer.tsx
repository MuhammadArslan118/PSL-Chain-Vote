import React from 'react';
import { ChevronRight, ArrowRightLeft, ShieldCheck, Database, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { Card } from '../ui/Card';
import { useContract } from '../../context/ContractContext';

export const BlockchainLayer = () => {
  const { transactions, isConnected, connectWallet } = useContract();
  const [gasPrice, setGasPrice] = React.useState(12);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setGasPrice(prev => Math.max(8, Math.min(45, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 animate-in fade-in duration-700">
        <div className="w-20 h-20 rounded-3xl bg-psl-gold/10 flex items-center justify-center text-psl-gold neon-glow-gold">
          <Database size={40} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">On-Chain Explorer</h2>
          <p className="text-gray-400 max-w-xs">Connect your wallet to view real-time blockchain transactions and smart contract events.</p>
        </div>
        <button 
          onClick={connectWallet}
          className="bg-psl-gold text-black px-8 py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-psl-gold/90 transition-all neon-glow-gold flex items-center gap-2"
        >
          <Wallet size={20} />
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter">Transparency Layer</h1>
          <p className="text-gray-400 mt-1">Immutable Ledger & Smart Contract Interaction</p>
        </div>
        <div className="flex items-center gap-4 bg-psl-green/10 border border-psl-green/20 px-4 py-2 rounded-xl w-fit">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-psl-green animate-pulse" />
            <span className="text-xs font-mono text-psl-green">MAINNET ACTIVE</span>
          </div>
          <div className="w-px h-4 bg-psl-green/20" />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-tighter">GAS: {gasPrice} GWEI</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card title="Transaction History" subtitle="Live block explorer">
            <div className="overflow-x-auto mt-2 -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="pb-4 text-[10px] text-gray-500 font-mono uppercase whitespace-nowrap pr-4">Type</th>
                      <th className="pb-4 text-[10px] text-gray-500 font-mono uppercase whitespace-nowrap pr-4">User</th>
                      <th className="pb-4 text-[10px] text-gray-500 font-mono uppercase whitespace-nowrap pr-4">Details</th>
                      <th className="pb-4 text-[10px] text-gray-500 font-mono uppercase whitespace-nowrap pr-4 hidden sm:table-cell">Hash</th>
                      <th className="pb-4 text-[10px] text-gray-500 font-mono uppercase whitespace-nowrap hidden md:table-cell">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="group hover:bg-white/5 transition-colors">
                        <td className="py-4 pr-4 whitespace-nowrap">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                            tx.type === 'bid' ? "bg-psl-green/20 text-psl-green" : 
                            tx.type === 'withdraw' ? "bg-psl-blue/20 text-psl-blue" : "bg-psl-gold/20 text-psl-gold"
                          )}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-xs font-mono text-gray-300 whitespace-nowrap">
                          {tx.user.length > 10 ? `${tx.user.slice(0, 6)}...${tx.user.slice(-4)}` : tx.user}
                        </td>
                        <td className="py-4 pr-4 text-xs font-medium whitespace-nowrap">{tx.details}</td>
                        <td className="py-4 pr-4 text-xs font-mono text-psl-blue hover:underline cursor-pointer whitespace-nowrap hidden sm:table-cell">{tx.hash}</td>
                        <td className="py-4 text-[10px] text-gray-500 font-mono whitespace-nowrap hidden md:table-cell">{new Date(tx.timestamp).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card title="Smart Contract" subtitle="Direct interaction panel">
            <div className="flex flex-col gap-4 mt-2">
              <div className="p-4 rounded-xl bg-psl-dark border border-white/10 font-mono text-[10px] text-gray-400 break-all">
                0x71C7656EC7ab88b098defB751B7401B5f6d8976F
              </div>
              <div className="flex flex-col gap-3">
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                  <span className="text-xs font-bold">read: highestBid(uint256)</span>
                  <ChevronRight size={14} className="text-gray-500 group-hover:text-white" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                  <span className="text-xs font-bold">read: pendingRefunds(address)</span>
                  <ChevronRight size={14} className="text-gray-500 group-hover:text-white" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-psl-blue/10 border border-psl-blue/20 hover:bg-psl-blue/20 transition-all group">
                  <span className="text-xs font-bold text-psl-blue">write: bid(uint256)</span>
                  <ArrowRightLeft size={14} className="text-psl-blue" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-psl-green/10 border border-psl-green/20 hover:bg-psl-green/20 transition-all group">
                  <span className="text-xs font-bold text-psl-green">write: withdrawRefund()</span>
                  <ArrowRightLeft size={14} className="text-psl-green" />
                </button>
              </div>
            </div>
          </Card>

          <Card title="Network Status" subtitle="Real-time health check">
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Block Height</span>
                <span className="text-xs font-mono font-bold">#18,452,901</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Avg. Block Time</span>
                <span className="text-xs font-mono font-bold">12.4s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Validators</span>
                <span className="text-xs font-mono font-bold">128 Active</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
                <motion.div 
                  animate={{ x: [-100, 400] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-24 h-full bg-psl-green shadow-[0_0_10px_rgba(0,255,0,0.8)]"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
