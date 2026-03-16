/**
 * ペイアウト計算ロジック
 */

import { Bet, RouletteNumber } from '@/types';
import { BET_TYPES, RED_NUMBERS, BLACK_NUMBERS } from '@/lib/utils/constants';

/**
 * ベットが勝利したかどうかを判定
 */
export function isBetWinning(bet: Bet, result: RouletteNumber): boolean {
  switch (bet.type) {
    case 'STRAIGHT':
      return bet.numbers.includes(result);

    case 'SPLIT':
    case 'STREET':
    case 'CORNER':
    case 'FIVE':
    case 'LINE':
      return bet.numbers.includes(result);

    case 'COLUMN':
    case 'DOZEN':
      return bet.numbers.includes(result);

    case 'RED':
      return typeof result === 'number' && RED_NUMBERS.includes(result);

    case 'BLACK':
      return typeof result === 'number' && BLACK_NUMBERS.includes(result);

    case 'ODD':
      return typeof result === 'number' && result !== 0 && result % 2 === 1;

    case 'EVEN':
      return typeof result === 'number' && result !== 0 && result % 2 === 0;

    case 'LOW':
      return typeof result === 'number' && result >= 1 && result <= 18;

    case 'HIGH':
      return typeof result === 'number' && result >= 19 && result <= 36;

    default:
      return false;
  }
}

/**
 * ペイアウトを計算
 */
export function calculatePayout(
  bets: Map<string, Bet>,
  result: RouletteNumber
): { totalWin: number; winningBets: Bet[] } {
  let totalWin = 0;
  const winningBets: Bet[] = [];

  bets.forEach((bet) => {
    if (isBetWinning(bet, result)) {
      const betType = BET_TYPES[bet.type];
      const payout = bet.amount * (betType.payout + 1); // 配当 + 元金
      totalWin += payout;
      winningBets.push({ ...bet, payout });
    }
  });

  return { totalWin, winningBets };
}
