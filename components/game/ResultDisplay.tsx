'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { RouletteNumber } from '@/types';
import { getNumberColor } from '@/lib/utils/constants';

interface ResultDisplayProps {
  result: RouletteNumber;
  winAmount?: number;
  show: boolean;
}

export default function ResultDisplay({ result, winAmount, show }: ResultDisplayProps) {
  const color = getNumberColor(result);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: -50 }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="bg-black/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border-4 border-gold-accent"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.1, 1] }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-2xl font-bold text-gray-300 mb-4">結果</p>

              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 0px rgba(255, 215, 0, 0)',
                    '0 0 40px rgba(255, 215, 0, 0.8)',
                    '0 0 0px rgba(255, 215, 0, 0)',
                  ],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-6xl font-bold mb-6 ${
                  color === 'red'
                    ? 'number-red'
                    : color === 'black'
                    ? 'number-black'
                    : 'number-green'
                }`}
              >
                {String(result)}
              </motion.div>

              {winAmount !== undefined && winAmount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <p className="text-xl text-gray-400 mb-2">勝利！</p>
                  <motion.p
                    animate={{
                      scale: [1, 1.1, 1],
                      color: ['#ffd700', '#ffed4e', '#ffd700'],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    className="text-4xl font-bold gold-accent"
                  >
                    +${winAmount.toFixed(2)}
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* パーティクルエフェクト（勝利時） */}
          {winAmount !== undefined && winAmount > 0 && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: '50%',
                    y: '50%',
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.05,
                    ease: 'easeOut',
                  }}
                  className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
