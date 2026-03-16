/**
 * UI状態管理ストア
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  soundEnabled: boolean;
  showStatistics: boolean;
  showHistory: boolean;
  showRules: boolean;
  volume: number;
}

interface UIActions {
  toggleSound: () => void;
  toggleStatistics: () => void;
  toggleHistory: () => void;
  toggleRules: () => void;
  setVolume: (volume: number) => void;
}

export interface UIStore extends UIState, UIActions {}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      // 状態
      soundEnabled: true,
      showStatistics: false,
      showHistory: false,
      showRules: false,
      volume: 0.7,

      // アクション
      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }));
      },

      toggleStatistics: () => {
        set((state) => ({ showStatistics: !state.showStatistics }));
      },

      toggleHistory: () => {
        set((state) => ({ showHistory: !state.showHistory }));
      },

      toggleRules: () => {
        set((state) => ({ showRules: !state.showRules }));
      },

      setVolume: (volume: number) => {
        set({ volume: Math.max(0, Math.min(1, volume)) });
      },
    }),
    {
      name: 'roulette-ui-storage',
      partialize: (state) => ({
        soundEnabled: state.soundEnabled,
        volume: state.volume,
      }),
    }
  )
);
