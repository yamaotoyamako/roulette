/**
 * ルーレットゲームロジックフック
 */

import { useCallback } from 'react';
import { useGameStore } from '@/store/game-store';
import { useBettingStore } from '@/store/betting-store';
import { spinWheel, getSpinDuration } from '@/lib/game/roulette';
import { calculatePayout } from '@/lib/game/payout';

export function useRouletteGame() {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const balance = useGameStore((state) => state.balance);
  const lastResult = useGameStore((state) => state.lastResult);
  const startSpin = useGameStore((state) => state.startSpin);
  const endSpin = useGameStore((state) => state.endSpin);
  const updateBalance = useGameStore((state) => state.updateBalance);

  const activeBets = useBettingStore((state) => state.activeBets);
  const totalBetAmount = useBettingStore((state) => state.totalBetAmount);
  const clearAllBets = useBettingStore((state) => state.clearAllBets);
  const saveBets = useBettingStore((state) => state.saveBets);

  const handleSpin = useCallback(async () => {
    if (gameStatus !== 'idle' && gameStatus !== 'betting') return;
    if (activeBets.size === 0) {
      alert('ベットを配置してください');
      return;
    }
    if (totalBetAmount > balance) {
      alert('残高不足です');
      return;
    }

    // ベット額を残高から引く
    updateBalance(-totalBetAmount);

    // ベットを保存（前回のベットを繰り返す機能用）
    saveBets();

    // スピン開始
    startSpin();

    // スピン時間を待機
    const spinDuration = getSpinDuration();
    await new Promise((resolve) => setTimeout(resolve, spinDuration));

    // 結果を生成
    const result = spinWheel();

    // スピン終了
    endSpin(result);

    // ペイアウト計算
    const { totalWin } = calculatePayout(activeBets, result);

    // 配当を残高に加算
    if (totalWin > 0) {
      updateBalance(totalWin);
      setTimeout(() => {
        alert(`おめでとうございます！$${totalWin.toFixed(2)} 獲得しました！`);
      }, 100);
    }

    // ベットをクリア
    clearAllBets();

    // ステータスをアイドルに戻す
    setTimeout(() => {
      useGameStore.setState({ gameStatus: 'idle' });
    }, 1000);
  }, [
    gameStatus,
    activeBets,
    totalBetAmount,
    balance,
    startSpin,
    endSpin,
    updateBalance,
    clearAllBets,
    saveBets,
  ]);

  return {
    gameStatus,
    balance,
    lastResult,
    totalBetAmount,
    handleSpin,
    canSpin: (gameStatus === 'idle' || gameStatus === 'betting') && activeBets.size > 0,
  };
}
