'use client';

import { useGameStore } from '@/store/game-store';
import { useBettingStore } from '@/store/betting-store';

export default function Home() {
  const balance = useGameStore((state) => state.balance);
  const gameStatus = useGameStore((state) => state.gameStatus);
  const totalBetAmount = useBettingStore((state) => state.totalBetAmount);

  return (
    <main className="min-h-screen casino-table p-8">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold gold-accent mb-2">
            🎰 カジノルーレット
          </h1>
          <p className="text-lg text-gray-300">American Roulette</p>
        </header>

        {/* ステータスバー */}
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-400 text-sm mb-1">残高</p>
              <p className="text-2xl font-bold gold-accent">${balance.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">総ベット額</p>
              <p className="text-2xl font-bold text-blue-400">${totalBetAmount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">ステータス</p>
              <p className="text-2xl font-bold text-green-400">
                {gameStatus === 'idle' && 'ベットしてください'}
                {gameStatus === 'betting' && 'ベット受付中'}
                {gameStatus === 'spinning' && 'スピン中...'}
                {gameStatus === 'result' && '結果発表'}
                {gameStatus === 'payout' && '配当中'}
              </p>
            </div>
          </div>
        </div>

        {/* メインゲームエリア - プレースホルダー */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 mb-8">
          <div className="text-center text-gray-400">
            <p className="text-xl mb-4">🎡 ルーレットホイール</p>
            <p className="text-sm">Phase 2で実装予定</p>
          </div>
        </div>

        {/* ベッティングテーブル - プレースホルダー */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8">
          <div className="text-center text-gray-400">
            <p className="text-xl mb-4">🎯 ベッティングテーブル</p>
            <p className="text-sm">Phase 2で実装予定</p>
          </div>
        </div>

        {/* フッター */}
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Phase 1: 基盤構築 完了 ✅</p>
        </footer>
      </div>
    </main>
  );
}
