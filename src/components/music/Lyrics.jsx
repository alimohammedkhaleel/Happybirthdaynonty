import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { lyricVariants } from '../../animations/motion/variants';

/**
 * Creative Cinematic Lyrics Component
 * Restored to the beloved high-end 3-tier creative stage:
 * - Previous lyric: gentle subtle line, soft opacity
 * - Current active lyric: prominent hero calligraphy, festive rose glow
 * - Next lyric: gentle preview line
 * Driven smoothly by Motion & AnimatePresence.
 * 100% Responsive & Performance-Optimized.
 * Strictly NO emojis.
 */
export default function Lyrics({ currentLyric, previousLyric, nextLyric }) {
  return (
    <div
      className="lyrics-stage-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: 'clamp(190px, 25vh, 230px)',
        width: '100%',
        maxWidth: '820px',
        margin: '0 auto',
        padding: '1rem clamp(0.5rem, 3vw, 1.5rem)',
        overflow: 'hidden',
        position: 'relative',
        userSelect: 'none'
      }}
    >
      {/* 1. Previous Lyric Line */}
      <div
        style={{
          minHeight: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <AnimatePresence mode="wait">
          {previousLyric && (
            <motion.p
              key={`prev-${previousLyric.id}`}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 0.38, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(0.9rem, 1.8vw, 1.15rem)',
                color: 'var(--color-muted-rose)',
                margin: 0,
                fontWeight: 400,
                lineHeight: 1.4,
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              {previousLyric.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Current Lyric Line (Grand Hero Emphasis) */}
      <div
        style={{
          minHeight: '85px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0.6rem 0',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <AnimatePresence mode="wait">
          {currentLyric && (
            <motion.div
              key={`current-${currentLyric.id}`}
              variants={lyricVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ position: 'relative', maxWidth: '100%' }}
            >
              <h3
                className="font-calligraphy"
                style={{
                  fontSize: 'clamp(1.6rem, 4.2vw, 2.9rem)',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  lineHeight: 1.35,
                  margin: 0,
                  textShadow: '0 4px 20px rgba(244, 63, 94, 0.25), 0 0 14px rgba(245, 158, 11, 0.16)',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  willChange: 'transform, opacity, filter'
                }}
              >
                {currentLyric.text}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Next Lyric Line */}
      <div
        style={{
          minHeight: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <AnimatePresence mode="wait">
          {nextLyric && (
            <motion.p
              key={`next-${nextLyric.id}`}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 0.48, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(0.9rem, 1.8vw, 1.15rem)',
                color: 'var(--color-muted-rose)',
                margin: 0,
                fontWeight: 400,
                lineHeight: 1.4,
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              {nextLyric.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
