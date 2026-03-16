/**
 * ゲーム型定義
 */

export type GameStatus = 'idle' | 'betting' | 'spinning' | 'result' | 'payout';

export type RouletteNumber = number | '00';

export interface GameState {
  gameStatus: GameStatus;
  balance: number;
  currentBet: number;
  winAmount: number;
  lastResult: RouletteNumber | null;
  history: RouletteNumber[];
}

export interface GameActions {
  startSpin: () => void;
  endSpin: (result: RouletteNumber) => void;
  resetGame: () => void;
  updateBalance: (amount: number) => void;
  addToHistory: (result: RouletteNumber) => void;
}

export interface GameStore extends GameState, GameActions {}
