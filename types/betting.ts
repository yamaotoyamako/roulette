/**
 * ベッティング型定義
 */

import { RouletteNumber } from './game';

export type BetType =
  | 'STRAIGHT'
  | 'SPLIT'
  | 'STREET'
  | 'CORNER'
  | 'FIVE'
  | 'LINE'
  | 'COLUMN'
  | 'DOZEN'
  | 'RED'
  | 'BLACK'
  | 'EVEN'
  | 'ODD'
  | 'LOW'
  | 'HIGH';

export interface BetTypeInfo {
  name: string;
  payout: number;
  numbers: number;
}

export interface Bet {
  id: string;
  type: BetType;
  position: string;
  amount: number;
  numbers: RouletteNumber[];
  payout?: number;
}

export interface BettingState {
  activeBets: Map<string, Bet>;
  selectedChip: number;
  totalBetAmount: number;
  lastBets: Bet[];
}

export interface BettingActions {
  placeBet: (bet: Omit<Bet, 'id'>) => void;
  removeBet: (position: string) => void;
  clearAllBets: () => void;
  setSelectedChip: (amount: number) => void;
  repeatLastBets: () => void;
  saveBets: () => void;
}

export interface BettingStore extends BettingState, BettingActions {}
