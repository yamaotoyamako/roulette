/**
 * ゲーム状態管理ストア
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameStore, RouletteNumber } from '@/types';
import { GAME_CONFIG } from '@/lib/utils/constants';

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // 状態
      gameStatus: 'idle',
      balance: GAME_CONFIG.INITIAL_BALANCE,
      currentBet: 0,
      winAmount: 0,
      lastResult: null,
      history: [],

      // アクション
      startSpin: () => {
        set({ gameStatus: 'spinning' });
      },

      endSpin: (result: RouletteNumber) => {
        const state = get();
        set({
          gameStatus: 'result',
          lastResult: result,
          history: [result, ...state.history].slice(0, GAME_CONFIG.MAX_HISTORY_LENGTH),
        });
      },

      resetGame: () => {
        set({
          gameStatus: 'idle',
          balance: GAME_CONFIG.INITIAL_BALANCE,
          currentBet: 0,
          winAmount: 0,
          lastResult: null,
        });
      },

      updateBalance: (amount: number) => {
        set((state) => ({
          balance: state.balance + amount,
        }));
      },

      addToHistory: (result: RouletteNumber) => {
        set((state) => ({
          history: [result, ...state.history].slice(0, GAME_CONFIG.MAX_HISTORY_LENGTH),
        }));
      },
    }),
    {
      name: 'roulette-game-storage',
      partialize: (state) => ({
        balance: state.balance,
        history: state.history,
      }),
    }
  )
);
