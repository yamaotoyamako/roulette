'use client';

import { useEffect, useRef } from 'react';
import { AMERICAN_WHEEL_ORDER, getNumberColor } from '@/lib/utils/constants';
import { RouletteNumber } from '@/types';

interface RouletteWheelProps {
  result?: RouletteNumber | null;
  isSpinning?: boolean;
}

export default function RouletteWheel({ result, isSpinning = false }: RouletteWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawWheel(ctx, canvas.width, canvas.height);
  }, []);

  const drawWheel = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(width, height) / 2 - 20;
    const innerRadius = outerRadius * 0.3;
    const pocketCount = AMERICAN_WHEEL_ORDER.length;
    const anglePerPocket = (2 * Math.PI) / pocketCount;

    // クリア
    ctx.clearRect(0, 0, width, height);

    // 外側の枠
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 4;
    ctx.stroke();

    // 各ポケットを描画
    AMERICAN_WHEEL_ORDER.forEach((number, index) => {
      const startAngle = index * anglePerPocket - Math.PI / 2;
      const endAngle = (index + 1) * anglePerPocket - Math.PI / 2;
      const color = getNumberColor(number);

      // ポケットの背景
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
      ctx.closePath();

      // 色を設定
      switch (color) {
        case 'red':
          ctx.fillStyle = '#dc2626';
          break;
        case 'black':
          ctx.fillStyle = '#1a1a1a';
          break;
        case 'green':
          ctx.fillStyle = '#16a34a';
          break;
      }
      ctx.fill();

      // ポケットの境界線
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 数字のテキストを描画
      const textAngle = startAngle + anglePerPocket / 2;
      const textRadius = (outerRadius + innerRadius) / 2;
      const textX = centerX + Math.cos(textAngle) * textRadius;
      const textY = centerY + Math.sin(textAngle) * textRadius;

      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textAngle + Math.PI / 2);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(number), 0, 0);
      ctx.restore();
    });

    // 中央の円
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#2a2a2a';
    ctx.fill();
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 中央のロゴ
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎰', centerX, centerY);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="rounded-full shadow-2xl"
      />
      {result !== null && result !== undefined && (
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-1">最後の結果</p>
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold ${
              getNumberColor(result) === 'red'
                ? 'number-red'
                : getNumberColor(result) === 'black'
                ? 'number-black'
                : 'number-green'
            }`}
          >
            {String(result)}
          </div>
        </div>
      )}
    </div>
  );
}
