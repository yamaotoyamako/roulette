'use client';

import { useGameStore } from '@/store/game-store';
import { useBettingStore } from '@/store/betting-store';
import { useRouletteGame } from '@/hooks/useRouletteGame';
import RouletteWheel from '@/components/game/RouletteWheel';
import BettingGrid from '@/components/betting/BettingGrid';
import OutsideBets from '@/components/betting/OutsideBets';
import ChipSelector from '@/components/game/ChipSelector';

export default function Home() {
  const balance = useGameStore((state) => state.balance);
  const lastResult = useGameStore((state) => state.lastResult);
  const totalBetAmount = useBettingStore((state) => state.totalBetAmount);
  const clearAllBets = useBettingStore((state) => state.clearAllBets);
  const repeatLastBets = useBettingStore((state) => state.repeatLastBets);

  const { gameStatus, handleSpin, canSpin } = useRouletteGame();

  const getStatusText = () => {
    switch (gameStatus) {
      case 'idle':
        return 'ベットしてください';
      case 'betting':
        return 'ベット受付中';
      case 'spinning':
        return 'スピン中...';
      case 'result':
        return '結果発表';
      case 'payout':
        return '配当中';
      default:
        return '';
    }
  };

  return (
    <main className="min-h-screen casino-table p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold gold-accent mb-2">
            🎰 カジノルーレット
          </h1>
          <p className="text-base md:text-lg text-gray-300">American Roulette</p>
        </header>

        {/* ステータスバー */}
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-400 text-sm mb-1">残高</p>
              <p className="text-xl md:text-2xl font-bold gold-accent">
                ${balance.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">総ベット額</p>
              <p className="text-xl md:text-2xl font-bold text-blue-400">
                ${totalBetAmount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">ステータス</p>
              <p className="text-xl md:text-2xl font-bold text-green-400">
                {getStatusText()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* ルーレットホイール */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 flex items-center justify-center">
            <RouletteWheel result={lastResult} isSpinning={gameStatus === 'spinning'} />
          </div>

          {/* チップセレクター */}
          <div className="space-y-6">
            <ChipSelector />

            {/* コントロールボタン */}
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6">
              <div className="space-y-3">
                <button
                  onClick={handleSpin}
                  disabled={!canSpin || gameStatus === 'spinning'}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-lg rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {gameStatus === 'spinning' ? '🎡 スピン中...' : '🎲 スピン'}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={clearAllBets}
                    disabled={gameStatus !== 'idle' && gameStatus !== 'betting'}
                    className="py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ベットをクリア
                  </button>

                  <button
                    onClick={repeatLastBets}
                    disabled={gameStatus !== 'idle' && gameStatus !== 'betting'}
                    className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    前回を繰り返す
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ベッティングテーブル */}
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-bold text-gray-300 text-center">
            ベッティングテーブル
          </h2>

          <BettingGrid />

          <OutsideBets />
        </div>

        {/* フッター */}
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Phase 2: コア機能 完了 ✅</p>
        </footer>
      </div>
    </main>
  );
}
