import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { OwnerDashboard } from './components/dashboard/OwnerDashboard';
import { FanPortal } from './components/dashboard/FanPortal';
import { BlockchainLayer } from './components/dashboard/BlockchainLayer';
import { View } from './types';

import { ContractProvider, useContract } from './context/ContractContext';

function AppContent() {
  const [activeView, setActiveView] = useState<View>('fan');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const { role, isConnected, transactions } = useContract();

  // Show toast when a new transaction occurs
  useEffect(() => {
    if (transactions.length > 0) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [transactions.length]);

  // Redirect if view is not allowed for role
  useEffect(() => {
    if (!isConnected) {
      setActiveView('fan');
      return;
    }

    if (role === 'owner') {
      if (activeView === 'fan' || activeView === 'owner') setActiveView('admin');
    } else if (role === 'winner') {
      if (activeView === 'admin') setActiveView('owner');
    } else {
      if (activeView === 'admin' || activeView === 'owner') setActiveView('fan');
    }
  }, [role, activeView, isConnected]);

  return (
    <div className="min-h-screen flex bg-psl-dark text-white selection:bg-psl-green selection:text-black overflow-x-hidden">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={(view) => {
          setActiveView(view);
          setIsSidebarOpen(false);
        }} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-8 max-w-[1600px] mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeView === 'admin' && <AdminDashboard />}
              {activeView === 'owner' && <OwnerDashboard />}
              {activeView === 'fan' && <FanPortal />}
              {activeView === 'blockchain' && <BlockchainLayer />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Notification Toast */}
      <AnimatePresence>
        {showToast && transactions.length > 0 && (
          <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="glass p-4 rounded-2xl border-l-4 border-psl-green flex items-center gap-4 shadow-2xl min-w-[300px]"
            >
              <div className="w-10 h-10 rounded-full bg-psl-green/20 flex items-center justify-center text-psl-green">
                <ShieldCheck size={20} />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-sm font-bold uppercase italic tracking-tighter">
                  {transactions[0].type === 'mint' ? 'NFT Minted' : 
                   transactions[0].type === 'bid' ? 'Bid Placed' : 
                   'Withdrawal Successful'}
                </span>
                <span className="text-[10px] text-gray-400 font-mono truncate max-w-[180px]">
                  {transactions[0].details}
                </span>
              </div>
              <button 
                onClick={() => setShowToast(false)}
                className="p-1 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
              >
                <Plus size={16} className="rotate-45" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ContractProvider>
      <AppContent />
    </ContractProvider>
  );
}
