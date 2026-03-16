'use client';

import { useBettingStore } from '@/store/betting-store';
import { useGameStore } from '@/store/game-store';
import { RED_NUMBERS, BLACK_NUMBERS, DOZEN_1, DOZEN_2, DOZEN_3 } from '@/lib/utils/constants';

export default function OutsideBets() {
  const selectedChip = useBettingStore((state) => state.selectedChip);
  const placeBet = useBettingStore((state) => state.placeBet);
  const activeBets = useBettingStore((state) => state.activeBets);
  const balance = useGameStore((state) => state.balance);
  const gameStatus = useGameStore((state) => state.gameStatus);

  const handleBetClick = (type: any, position: string, numbers: any[]) => {
    if (gameStatus !== 'idle' && gameStatus !== 'betting') return;
    if (balance < selectedChip) {
      alert('残高不足です');
      return;
    }

    placeBet({
      type,
      position,
      amount: selectedChip,
      numbers,
    });
  };

  const getBetAmount = (position: string): number => {
    const bet = Array.from(activeBets.values()).find((b) => b.position === position);
    return bet?.amount || 0;
  };

  const betButton = (
    label: string,
    type: any,
    position: string,
    numbers: any[],
    className: string = ''
  ) => {
    const betAmount = getBetAmount(position);

    return (
      <button
        onClick={() => handleBetClick(type, position, numbers)}
        disabled={gameStatus !== 'idle' && gameStatus !== 'betting'}
        className={`relative h-16 px-4 rounded-lg font-bold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 ${className}`}
      >
        {label}
        {betAmount > 0 && (
          <span className="absolute top-1 right-1 bg-white text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
            ${betAmount}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="space-y-4">
      {/* ダースベット */}
      <div className="grid grid-cols-3 gap-2">
        {betButton('1st 12', 'DOZEN', 'dozen-1', DOZEN_1, 'bg-purple-600 text-white')}
        {betButton('2nd 12', 'DOZEN', 'dozen-2', DOZEN_2, 'bg-purple-600 text-white')}
        {betButton('3rd 12', 'DOZEN', 'dozen-3', DOZEN_3, 'bg-purple-600 text-white')}
      </div>

      {/* イーブンマネーベット */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {betButton('1-18', 'LOW', 'low', Array.from({ length: 18 }, (_, i) => i + 1), 'bg-blue-600 text-white')}
        {betButton('偶数', 'EVEN', 'even', Array.from({ length: 36 }, (_, i) => i + 1).filter(n => n % 2 === 0), 'bg-blue-600 text-white')}
        {betButton('赤', 'RED', 'red', RED_NUMBERS, 'bg-red-600 text-white')}
        {betButton('黒', 'BLACK', 'black', BLACK_NUMBERS, 'bg-gray-900 text-white')}
        {betButton('奇数', 'ODD', 'odd', Array.from({ length: 36 }, (_, i) => i + 1).filter(n => n % 2 === 1), 'bg-blue-600 text-white')}
        {betButton('19-36', 'HIGH', 'high', Array.from({ length: 18 }, (_, i) => i + 19), 'bg-blue-600 text-white')}
      </div>
    </div>
  );
}
