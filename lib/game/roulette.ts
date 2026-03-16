/**
 * ルーレットゲームロジック
 */

import { AMERICAN_WHEEL_ORDER } from '@/lib/utils/constants';
import { RouletteNumber } from '@/types';

/**
 * ルーレットをスピンして結果を生成
 * Crypto APIを使用した真の乱数生成
 */
export function spinWheel(): RouletteNumber {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const randomIndex = array[0] % AMERICAN_WHEEL_ORDER.length;
  return AMERICAN_WHEEL_ORDER[randomIndex];
}

/**
 * ランダムなスピン時間を生成（4-6秒）
 */
export function getSpinDuration(): number {
  const min = 4000;
  const max = 6000;
  return Math.random() * (max - min) + min;
}
