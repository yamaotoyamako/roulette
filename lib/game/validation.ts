/**
 * ベット検証ロジック
 */

import { Bet } from '@/types';
import { GAME_CONFIG } from '@/lib/utils/constants';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * ベットが有効かどうかを検証
 */
export function validateBet(
  bet: Omit<Bet, 'id'>,
  currentBalance: number,
  totalBetAmount: number
): ValidationResult {
  // 最小ベット額チェック
  if (bet.amount < GAME_CONFIG.MIN_BET) {
    return {
      valid: false,
      error: `最小ベット額は$${GAME_CONFIG.MIN_BET}です`,
    };
  }

  // 最大ベット額チェック
  if (bet.amount > GAME_CONFIG.MAX_BET) {
    return {
      valid: false,
      error: `最大ベット額は$${GAME_CONFIG.MAX_BET}です`,
    };
  }

  // 残高チェック
  if (totalBetAmount + bet.amount > currentBalance) {
    return {
      valid: false,
      error: '残高不足です',
    };
  }

  return { valid: true };
}
