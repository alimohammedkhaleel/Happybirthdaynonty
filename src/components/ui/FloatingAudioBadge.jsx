import React from 'react';
import { motion } from 'motion/react';
import { Music } from 'lucide-react';

/**
 * FloatingAudioBadge Component
 * Subtle, non-intrusive floating indicator allowing the visitor to quickly know the celebration status
 * or scroll directly to the music section.
 */
export default function FloatingAudioBadge({ isPlaying, onScrollToMusic }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      style={{
        position: 'fixed',
        bottom: 'clamp(16px, 4vw, 24px)',
        left: 'clamp(16px, 4vw, 24px)',
        zIndex: 900
      }}
    >
      <motion.button
        onClick={onScrollToMusic}
        whileHover={{ scale: 1.06, boxShadow: '0 8px 25px rgba(244, 63, 94, 0.25)' }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.55rem 1rem',
          borderRadius: '999px',
          backgroundColor: '#FFFDF7',
          border: '1.5px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 8px 24px -4px rgba(74, 40, 40, 0.08), 0 0 15px rgba(245, 158, 11, 0.1)',
          color: 'var(--color-primary)',
          fontSize: '0.88rem',
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: isPlaying ? '#10B981' : 'var(--color-secondary)',
            boxShadow: isPlaying ? '0 0 8px #10B981' : 'none'
          }}
        />
        <Music size={15} />
        <span>لحن نور</span>
      </motion.button>
    </motion.div>
  );
}
