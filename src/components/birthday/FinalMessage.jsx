import React, { useRef } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { birthdayContent } from '../../data/birthdayContent';
import { Heart, Sparkles } from 'lucide-react';

/**
 * FinalMessage Component - 100% Responsive & High Performance
 * Section 27: Full-screen emotional finale
 * Strictly NO emojis.
 */
export default function FinalMessage() {
  const containerRef = useRef(null);

  const triggerCelebrationConfetti = () => {
    // Warm festive golden rose confetti (clean geometric particles)
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.72 },
      colors: ['#F43F5E', '#F59E0B', '#FB7185', '#FEA619', '#E3BDBF'],
      ticks: 250,
      shapes: ['circle', 'square']
    });
  };

  return (
    <footer
      ref={containerRef}
      className="final-message-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#FFFDF7',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1rem, 3.5vw, 2rem)',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Expanding Golden Sunlit Aura from Center */}
      <div
        className="animate-breathe"
        style={{
          position: 'absolute',
          width: 'clamp(350px, 65vw, 750px)',
          height: 'clamp(350px, 65vw, 750px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(244, 63, 94, 0.12) 45%, transparent 75%)',
          filter: 'blur(65px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '820px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(1.75rem, 4vw, 2.5rem)'
        }}
      >
        {/* Heart Icon with gentle pulse */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          style={{
            width: 'clamp(52px, 12vw, 64px)',
            height: 'clamp(52px, 12vw, 64px)',
            borderRadius: '50%',
            backgroundColor: 'rgba(244, 63, 94, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary)',
            boxShadow: '0 0 25px rgba(244, 63, 94, 0.2)'
          }}
        >
          <Heart size={30} fill="var(--color-primary)" />
        </motion.div>

        {/* 1. "كل سنة وإنتِ طيبة يا نور." */}
        <h2
          className="gold-gradient-text font-calligraphy"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.25,
            margin: 0
          }}
        >
          {birthdayContent.finale.greeting}
        </h2>

        {/* 2. Wish */}
        <p
          style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)',
            color: 'var(--color-text)',
            lineHeight: 1.85,
            whiteSpace: 'pre-line',
            fontWeight: 500,
            margin: 0
          }}
        >
          {birthdayContent.finale.wish}
        </p>

        {/* 3. "خلي النور اللي جواكي دايمًا منور." */}
        <div
          style={{
            padding: 'clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 3vw, 2.5rem)',
            backgroundColor: 'rgba(251, 249, 243, 0.9)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '999px',
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.1)',
            maxWidth: '100%'
          }}
        >
          <span
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.55rem)',
              fontWeight: 700,
              color: 'var(--color-primary)'
            }}
          >
            {birthdayContent.finale.closing}
          </span>
        </div>

        {/* Interactive Confetti / Sparkle Button */}
        <motion.button
          onClick={triggerCelebrationConfetti}
          whileHover={{ scale: 1.06, boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            backgroundColor: 'var(--color-secondary)',
            color: '#FFFDF7',
            padding: '0.8rem clamp(1.2rem, 3vw, 1.8rem)',
            borderRadius: '999px',
            fontSize: 'clamp(0.92rem, 1.8vw, 1rem)',
            fontWeight: 600,
            boxShadow: '0 6px 18px rgba(245, 158, 11, 0.25)',
            cursor: 'pointer'
          }}
        >
          <Sparkles size={18} />
          <span>انثري أضواء الفرح</span>
        </motion.button>

        {/* 4. "Made especially for Nour." */}
        <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(143, 111, 113, 0.2)', paddingTop: '1.5rem' }}>
          <span
            className="font-mono"
            style={{
              fontSize: 'clamp(0.82rem, 1.8vw, 0.95rem)',
              color: 'var(--color-muted-rose)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            {birthdayContent.finale.signature}
          </span>
        </div>
      </div>
    </footer>
  );
}
