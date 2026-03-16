'use client';

import { useBettingStore } from '@/store/betting-store';
import { CHIP_VALUES } from '@/lib/utils/constants';
import { useGameStore } from '@/store/game-store';

export default function ChipSelector() {
  const selectedChip = useBettingStore((state) => state.selectedChip);
  const setSelectedChip = useBettingStore((state) => state.setSelectedChip);
  const balance = useGameStore((state) => state.balance);
  const gameStatus = useGameStore((state) => state.gameStatus);

  const getChipClass = (value: number) => {
    const baseClass = 'chip';
    const valueClass = `chip-${value}`;
    const selectedClass = selectedChip === value ? 'ring-4 ring-yellow-400' : '';
    const disabledClass = balance < value || (gameStatus !== 'idle' && gameStatus !== 'betting') ? 'opacity-30 cursor-not-allowed' : '';

    return `${baseClass} ${valueClass} ${selectedClass} ${disabledClass}`;
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-300 mb-4 text-center">チップを選択</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {CHIP_VALUES.map((value) => (
          <button
            key={value}
            onClick={() => setSelectedChip(value)}
            disabled={balance < value || (gameStatus !== 'idle' && gameStatus !== 'betting')}
            className={getChipClass(value)}
            title={balance < value ? '残高不足' : `$${value}`}
          >
            ${value}
          </button>
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-gray-400">
        選択中: <span className="text-yellow-400 font-bold">${selectedChip}</span>
      </div>
    </div>
  );
}
