export type View = 'admin' | 'owner' | 'fan' | 'blockchain';

export interface Proposal {
  id: string;
  investor: string;
  amount: number;
  teamPreference: string;
  reputation: number;
  votes: number;
  totalVotes: number;
  status: 'pending' | 'selected' | 'rejected';
}

export interface FanToken {
  name: string;
  symbol: string;
  totalSupply: number;
  price: number;
  holders: number;
  sold: number;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  image: string;
  votes: number;
  totalVotes: number;
}

export interface Transaction {
  id: string;
  type: 'vote' | 'mint' | 'buy' | 'transfer';
  user: string;
  details: string;
  timestamp: string;
  hash: string;
  gas: string;
}
