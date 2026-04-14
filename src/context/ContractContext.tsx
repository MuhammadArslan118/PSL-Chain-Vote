import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Franchise, Transaction } from '../types';
import { MOCK_FRANCHISES, MOCK_TRANSACTIONS } from '../data/mockData';

type UserRole = 'owner' | 'bidder' | 'winner';

interface ContractContextType {
  role: UserRole;
  franchises: Franchise[];
  transactions: Transaction[];
  pendingRefund: number;
  balance: string;
  userAddress: string;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  createFranchise: (name: string) => Promise<void>;
  placeBid: (franchiseId: string, amount: number) => Promise<void>;
  withdrawRefund: () => Promise<void>;
  closeAuction: (franchiseId: string) => Promise<void>;
}

const ADMIN_ADDRESS = '0xf1da98dd2716a243487fbaa66fdbc0d5226735e0'.toLowerCase();

const ContractContext = createContext<ContractContextType | undefined>(undefined);

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userAddress, setUserAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [franchises, setFranchises] = useState<Franchise[]>(MOCK_FRANCHISES);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [pendingRefund, setPendingRefund] = useState(0);
  const [balance, setBalance] = useState('0.00');
  
  const role: UserRole = userAddress.toLowerCase() === ADMIN_ADDRESS 
    ? 'owner' 
    : franchises.some(f => f.minted && f.highestBidder?.toLowerCase() === userAddress.toLowerCase())
      ? 'winner'
      : 'bidder';

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setUserAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setUserAddress('');
    setIsConnected(false);
  };

  useEffect(() => {
    const updateBalance = async () => {
      if (userAddress && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const bal = await provider.getBalance(userAddress);
        setBalance(parseFloat(ethers.formatEther(bal)).toFixed(4));
      } else {
        setBalance('0.00');
      }
    };
    updateBalance();
  }, [userAddress]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setUserAddress('');
          setIsConnected(false);
        }
      });
    }
  }, []);

  const addTransaction = (type: Transaction['type'], details: string) => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type,
      user: userAddress || '0x...',
      details,
      timestamp: new Date().toISOString(),
      hash: `0x${Math.random().toString(16).slice(2, 14)}...`,
      gas: '0.00042 ETH'
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const createFranchise = async (name: string) => {
    if (role !== 'owner') return;
    const newFranchise: Franchise = {
      id: (franchises.length + 1).toString(),
      name,
      highestBid: 0,
      highestBidder: null,
      auctionActive: true,
      minted: false
    };
    setFranchises(prev => [...prev, newFranchise]);
    addTransaction('mint', `Created Franchise: ${name}`);
  };

  const placeBid = async (franchiseId: string, amount: number) => {
    if (!isConnected) {
      await connectWallet();
    }
    
    setFranchises(prev => prev.map(f => {
      if (f.id === franchiseId) {
        // If there was a previous bidder, they get a refund (simulated)
        if (f.highestBidder && f.highestBidder.toLowerCase() === userAddress.toLowerCase()) {
          // User is outbidding themselves? Usually not allowed or just updates bid
        } else if (f.highestBidder) {
          // In a real app, we'd track this per user. 
          // For this demo, if the CURRENT user was the previous bidder, we'd add to their refund.
          // But since we only have one "active" user in the browser, we'll just simulate the logic.
        }
        return { ...f, highestBid: amount, highestBidder: userAddress };
      }
      return f;
    }));
    
    addTransaction('bid', `Placed ${amount} ETH bid on Franchise #${franchiseId}`);
  };

  const withdrawRefund = async () => {
    if (pendingRefund > 0) {
      addTransaction('withdraw', `Withdrew ${pendingRefund} ETH refund`);
      setPendingRefund(0);
    }
  };

  const closeAuction = async (franchiseId: string) => {
    if (role !== 'owner') return;
    setFranchises(prev => prev.map(f => {
      if (f.id === franchiseId) {
        return { ...f, auctionActive: false, minted: true };
      }
      return f;
    }));
    const franchise = franchises.find(f => f.id === franchiseId);
    addTransaction('mint', `Finalized Auction & Minted NFT for ${franchise?.name}`);
  };

  return (
    <ContractContext.Provider value={{
      role,
      franchises,
      transactions,
      pendingRefund,
      balance,
      userAddress,
      isConnected,
      connectWallet,
      disconnectWallet,
      createFranchise,
      placeBid,
      withdrawRefund,
      closeAuction
    }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) throw new Error('useContract must be used within a ContractProvider');
  return context;
};
