import { Proposal, Venue, Transaction } from '../types';

export const MOCK_PROPOSALS: Proposal[] = Array.from({ length: 20 }, (_, i) => ({
  id: `prop-${i + 1}`,
  investor: [
    'Hashoo Group', 'Engro Corp', 'Lucky Cement', 'JS Bank', 'Arif Habib Group',
    'Systems Ltd', 'TRG Pakistan', 'Interloop', 'Fatima Group', 'Hubco'
  ][i % 10] + (i > 9 ? ' II' : ''),
  amount: Math.floor(Math.random() * 50000000) + 10000000,
  teamPreference: ['Lahore Qalandars', 'Karachi Kings', 'Islamabad United', 'Peshawar Zalmi', 'Quetta Gladiators', 'Multan Sultans'][i % 6],
  reputation: Math.floor(Math.random() * 40) + 60,
  votes: Math.floor(Math.random() * 1000),
  totalVotes: 5000,
  status: i < 8 ? 'selected' : 'pending'
}));

export const MOCK_VENUES: Venue[] = [
  { id: 'v1', name: 'Gaddafi Stadium', city: 'Lahore', image: 'https://picsum.photos/seed/lahore/800/600', votes: 1250, totalVotes: 4000 },
  { id: 'v2', name: 'National Stadium', city: 'Karachi', image: 'https://picsum.photos/seed/karachi/800/600', votes: 980, totalVotes: 4000 },
  { id: 'v3', name: 'Arbab Niaz Stadium', city: 'Peshawar', image: 'https://picsum.photos/seed/peshawar/800/600', votes: 850, totalVotes: 4000 },
  { id: 'v4', name: 'Pindi Cricket Stadium', city: 'Rawalpindi', image: 'https://picsum.photos/seed/pindi/800/600', votes: 620, totalVotes: 4000 },
  { id: 'v5', name: 'Iqbal Stadium', city: 'Faisalabad', image: 'https://picsum.photos/seed/faisalabad/800/600', votes: 300, totalVotes: 4000 },
];

export const MOCK_TRANSACTIONS: Transaction[] = Array.from({ length: 10 }, (_, i) => ({
  id: `tx-${i}`,
  type: ['vote', 'buy', 'mint', 'transfer'][i % 4] as any,
  user: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
  details: i % 4 === 0 ? 'Voted for Lahore Venue' : i % 4 === 1 ? 'Bought 500 $LHQ' : 'Minted 1M $KIK',
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
  hash: `0x${Math.random().toString(16).slice(2, 14)}...`,
  gas: '0.00042 ETH'
}));

export const CHART_DATA = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

export const TOP_VOTERS = [
  { rank: 1, user: '0x71C...976F', votes: 12500, rewards: '250 $LHQ' },
  { rank: 2, user: '0x3A2...1B4D', votes: 9800, rewards: '180 $LHQ' },
  { rank: 3, user: '0x9F4...7E2C', votes: 8200, rewards: '150 $LHQ' },
  { rank: 4, user: '0x1B8...3D9A', votes: 7500, rewards: '120 $LHQ' },
  { rank: 5, user: '0x5D2...9F8B', votes: 6100, rewards: '100 $LHQ' },
];
