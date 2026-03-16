/**
 * ホイール回転アニメーション
 */

import { RouletteNumber } from '@/types';
import { AMERICAN_WHEEL_ORDER } from '@/lib/utils/constants';

/**
 * イージング関数：easeOutCubic
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * イージング関数：easeOutQuint（より滑らかな減速）
 */
export function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

/**
 * 段階的イージング（前半はcubic、後半はquint）
 */
export function combinedEasing(t: number): number {
  if (t < 0.5) {
    return easeOutCubic(t * 2) * 0.5;
  } else {
    return 0.5 + easeOutQuint((t - 0.5) * 2) * 0.5;
  }
}

/**
 * 目標の数字に対応する角度を計算
 */
export function getTargetAngle(targetNumber: RouletteNumber): number {
  const index = AMERICAN_WHEEL_ORDER.indexOf(targetNumber);
  if (index === -1) return 0;

  const pocketCount = AMERICAN_WHEEL_ORDER.length;
  const anglePerPocket = (2 * Math.PI) / pocketCount;

  // 目標の角度（ホイールの上部に来るように）
  return index * anglePerPocket;
}

/**
 * アニメーションパラメータの生成
 */
export interface AnimationParams {
  duration: number;
  initialRotation: number;
  targetRotation: number;
  extraSpins: number;
}

export function generateAnimationParams(
  targetNumber: RouletteNumber,
  duration: number
): AnimationParams {
  const targetAngle = getTargetAngle(targetNumber);

  // 3〜5回の追加回転（ランダム）
  const extraSpins = 3 + Math.random() * 2;

  // 最終的な回転角度（追加回転 + 目標角度）
  const targetRotation = extraSpins * 2 * Math.PI + targetAngle;

  return {
    duration,
    initialRotation: 0,
    targetRotation,
    extraSpins,
  };
}

/**
 * 現在の回転角度を計算
 */
export function calculateRotation(
  elapsed: number,
  params: AnimationParams
): number {
  const progress = Math.min(elapsed / params.duration, 1);
  const easedProgress = combinedEasing(progress);

  return params.initialRotation +
    (params.targetRotation - params.initialRotation) * easedProgress;
}

/**
 * アニメーションが完了したかチェック
 */
export function isAnimationComplete(
  elapsed: number,
  params: AnimationParams
): boolean {
  return elapsed >= params.duration;
}
