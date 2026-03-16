'use client';

import { useBettingStore } from '@/store/betting-store';
import { useGameStore } from '@/store/game-store';
import { getNumberColor } from '@/lib/utils/constants';

export default function BettingGrid() {
  const selectedChip = useBettingStore((state) => state.selectedChip);
  const placeBet = useBettingStore((state) => state.placeBet);
  const activeBets = useBettingStore((state) => state.activeBets);
  const balance = useGameStore((state) => state.balance);
  const gameStatus = useGameStore((state) => state.gameStatus);

  const handleNumberClick = (num: number | string) => {
    if (gameStatus !== 'idle' && gameStatus !== 'betting') return;
    if (balance < selectedChip) {
      alert('残高不足です');
      return;
    }

    placeBet({
      type: 'STRAIGHT',
      position: `straight-${num}`,
      amount: selectedChip,
      numbers: [num as any],
    });
  };

  const getBetAmount = (position: string): number => {
    const bet = Array.from(activeBets.values()).find((b) => b.position === position);
    return bet?.amount || 0;
  };

  // 数字を3列12行に配置
  const numbers: (number | string)[][] = [];
  for (let row = 0; row < 12; row++) {
    numbers.push([
      row * 3 + 1,
      row * 3 + 2,
      row * 3 + 3,
    ]);
  }

  return (
    <div className="bg-green-900/30 rounded-lg p-4">
      {/* 0と00 */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => handleNumberClick(0)}
          disabled={gameStatus !== 'idle' && gameStatus !== 'betting'}
          className="relative h-20 rounded-lg number-green font-bold text-xl hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          0
          {getBetAmount('straight-0') > 0 && (
            <span className="absolute top-1 right-1 bg-white text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
              ${getBetAmount('straight-0')}
            </span>
          )}
        </button>
        <button
          onClick={() => handleNumberClick('00')}
          disabled={gameStatus !== 'idle' && gameStatus !== 'betting'}
          className="relative h-20 rounded-lg number-green font-bold text-xl hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          00
          {getBetAmount('straight-00') > 0 && (
            <span className="absolute top-1 right-1 bg-white text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
              ${getBetAmount('straight-00')}
            </span>
          )}
        </button>
      </div>

      {/* 1-36のグリッド */}
      <div className="grid grid-cols-3 gap-1">
        {numbers.map((row, rowIndex) => (
          row.map((num) => {
            const color = getNumberColor(num as any);
            const position = `straight-${num}`;
            const betAmount = getBetAmount(position);

            return (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                disabled={gameStatus !== 'idle' && gameStatus !== 'betting'}
                className={`relative h-14 rounded font-bold text-lg hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed ${
                  color === 'red' ? 'number-red' : 'number-black'
                }`}
              >
                {num}
                {betAmount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-white text-black text-xs px-1 py-0.5 rounded-full font-bold">
                    ${betAmount}
                  </span>
                )}
              </button>
            );
          })
        ))}
      </div>
    </div>
  );
}
