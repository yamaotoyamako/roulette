'use client';

import { motion } from 'framer-motion';

interface BetChipProps {
  amount: number;
  isWinning?: boolean;
}

export default function BetChip({ amount, isWinning = false }: BetChipProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        ...(isWinning && {
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 0 0px rgba(255, 215, 0, 0)',
            '0 0 20px rgba(255, 215, 0, 0.8)',
            '0 0 0px rgba(255, 215, 0, 0)',
          ],
        }),
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        duration: 0.3,
        ...(isWinning && {
          repeat: 3,
          repeatType: 'loop' as const,
          duration: 0.5,
        }),
      }}
      className="absolute top-0.5 right-0.5 bg-white text-black text-xs px-1.5 py-0.5 rounded-full font-bold shadow-lg"
    >
      ${amount}
    </motion.div>
  );
}
