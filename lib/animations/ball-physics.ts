/**
 * ボール物理シミュレーション
 */

import { RouletteNumber } from '@/types';
import { getTargetAngle } from './wheel-animation';

/**
 * ボールの位置
 */
export interface BallPosition {
  angle: number; // 角度（ラジアン）
  radius: number; // 中心からの距離
}

/**
 * ボールアニメーションパラメータ
 */
export interface BallAnimationParams {
  duration: number;
  initialAngle: number;
  targetNumber: RouletteNumber;
  initialRadius: number;
  finalRadius: number;
}

/**
 * ボールアニメーションパラメータの生成
 */
export function generateBallAnimationParams(
  targetNumber: RouletteNumber,
  duration: number,
  outerRadius: number
): BallAnimationParams {
  const targetAngle = getTargetAngle(targetNumber);

  // ボールは反時計回りに回転（ホイールと逆方向）
  const initialAngle = Math.random() * Math.PI * 2;

  return {
    duration,
    initialAngle,
    targetNumber,
    initialRadius: outerRadius * 0.85, // 外周近く
    finalRadius: outerRadius * 0.6,    // 内側のポケット
  };
}

/**
 * ボールの現在位置を計算
 */
export function calculateBallPosition(
  elapsed: number,
  params: BallAnimationParams
): BallPosition {
  const progress = Math.min(elapsed / params.duration, 1);

  // 角度：前半は速く回転、後半は減速
  let angle: number;
  if (progress < 0.7) {
    // 前半70%：高速回転（反時計回り）
    const rotationProgress = progress / 0.7;
    const rotations = 8 + Math.random() * 2; // 8-10回転
    angle = params.initialAngle - rotations * 2 * Math.PI * rotationProgress;
  } else {
    // 後半30%：目標角度に向かって減速
    const slowProgress = (progress - 0.7) / 0.3;
    const targetAngle = getTargetAngle(params.targetNumber);
    const startAngle = params.initialAngle - (8 + Math.random() * 2) * 2 * Math.PI;

    // イージング適用
    const easedProgress = 1 - Math.pow(1 - slowProgress, 4);
    angle = startAngle + (targetAngle - startAngle) * easedProgress;
  }

  // 半径：徐々に内側へ
  const radiusProgress = Math.pow(progress, 1.5);
  const radius = params.initialRadius +
    (params.finalRadius - params.initialRadius) * radiusProgress;

  return { angle, radius };
}

/**
 * ボールアニメーションが完了したかチェック
 */
export function isBallAnimationComplete(
  elapsed: number,
  params: BallAnimationParams
): boolean {
  return elapsed >= params.duration;
}
