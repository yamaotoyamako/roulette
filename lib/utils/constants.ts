/**
 * ルーレットゲーム定数
 */

import { BetType, BetTypeInfo, RouletteNumber } from '@/types';

/**
 * アメリカンルーレットのホイール数字配置順序（時計回り）
 */
export const AMERICAN_WHEEL_ORDER: RouletteNumber[] = [
  0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1,
  '00', 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 35, 14, 2
];

/**
 * 赤色の数字
 */
export const RED_NUMBERS: number[] = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
];

/**
 * 黒色の数字
 */
export const BLACK_NUMBERS: number[] = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35
];

/**
 * 緑色の数字
 */
export const GREEN_NUMBERS: RouletteNumber[] = [0, '00'];

/**
 * 数字の色を取得
 */
export function getNumberColor(num: RouletteNumber): 'red' | 'black' | 'green' {
  if (num === 0 || num === '00') return 'green';
  if (RED_NUMBERS.includes(num as number)) return 'red';
  return 'black';
}

/**
 * ベットタイプ情報
 */
export const BET_TYPES: Record<BetType, BetTypeInfo> = {
  STRAIGHT: { name: 'ストレート', payout: 35, numbers: 1 },
  SPLIT: { name: 'スプリット', payout: 17, numbers: 2 },
  STREET: { name: 'ストリート', payout: 11, numbers: 3 },
  CORNER: { name: 'コーナー', payout: 8, numbers: 4 },
  FIVE: { name: 'ファイブ', payout: 6, numbers: 5 }, // 0, 00, 1, 2, 3
  LINE: { name: 'ライン', payout: 5, numbers: 6 },
  COLUMN: { name: '列', payout: 2, numbers: 12 },
  DOZEN: { name: 'ダース', payout: 2, numbers: 12 },
  RED: { name: '赤', payout: 1, numbers: 18 },
  BLACK: { name: '黒', payout: 1, numbers: 18 },
  EVEN: { name: '偶数', payout: 1, numbers: 18 },
  ODD: { name: '奇数', payout: 1, numbers: 18 },
  LOW: { name: '1-18', payout: 1, numbers: 18 },
  HIGH: { name: '19-36', payout: 1, numbers: 18 },
};

/**
 * チップ額面
 */
export const CHIP_VALUES = [1, 5, 25, 100, 500];

/**
 * ゲーム設定
 */
export const GAME_CONFIG = {
  INITIAL_BALANCE: 1000,
  MIN_BET: 1,
  MAX_BET: 500,
  MAX_HISTORY_LENGTH: 100,
  SPIN_DURATION_MIN: 4000, // ms
  SPIN_DURATION_MAX: 6000, // ms
};

/**
 * ダースベットの数字
 */
export const DOZEN_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const DOZEN_2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
export const DOZEN_3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

/**
 * 列ベットの数字
 */
export const COLUMN_1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
export const COLUMN_2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
export const COLUMN_3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];

/**
 * ファイブベット（アメリカン特有）
 */
export const FIVE_BET_NUMBERS: RouletteNumber[] = [0, '00', 1, 2, 3];
