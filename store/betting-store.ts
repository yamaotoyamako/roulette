/**
 * ベッティング状態管理ストア
 */

import { create } from 'zustand';
import { BettingStore, Bet } from '@/types';

// 簡易ID生成関数
const generateId = () => Math.random().toString(36).substring(2, 11);

export const useBettingStore = create<BettingStore>((set, get) => ({
  // 状態
  activeBets: new Map(),
  selectedChip: 1,
  totalBetAmount: 0,
  lastBets: [],

  // アクション
  placeBet: (bet: Omit<Bet, 'id'>) => {
    const id = generateId();
    const newBet = { ...bet, id };

    set((state) => {
      const newBets = new Map(state.activeBets);

      // 同じポジションに既存のベットがある場合、額を追加
      const existingBet = Array.from(newBets.values()).find(
        (b) => b.position === bet.position
      );

      if (existingBet) {
        existingBet.amount += bet.amount;
      } else {
        newBets.set(id, newBet);
      }

      const totalBetAmount = Array.from(newBets.values()).reduce(
        (sum, b) => sum + b.amount,
        0
      );

      return {
        activeBets: newBets,
        totalBetAmount,
      };
    });
  },

  removeBet: (position: string) => {
    set((state) => {
      const newBets = new Map(state.activeBets);
      const betToRemove = Array.from(newBets.entries()).find(
        ([_, bet]) => bet.position === position
      );

      if (betToRemove) {
        newBets.delete(betToRemove[0]);
      }

      const totalBetAmount = Array.from(newBets.values()).reduce(
        (sum, b) => sum + b.amount,
        0
      );

      return {
        activeBets: newBets,
        totalBetAmount,
      };
    });
  },

  clearAllBets: () => {
    set({
      activeBets: new Map(),
      totalBetAmount: 0,
    });
  },

  setSelectedChip: (amount: number) => {
    set({ selectedChip: amount });
  },

  repeatLastBets: () => {
    const state = get();
    if (state.lastBets.length === 0) return;

    const newBets = new Map<string, Bet>();
    state.lastBets.forEach((bet) => {
      const id = generateId();
      newBets.set(id, { ...bet, id });
    });

    const totalBetAmount = Array.from(newBets.values()).reduce(
      (sum, b) => sum + b.amount,
      0
    );

    set({
      activeBets: newBets,
      totalBetAmount,
    });
  },

  saveBets: () => {
    const state = get();
    set({
      lastBets: Array.from(state.activeBets.values()),
    });
  },
}));
