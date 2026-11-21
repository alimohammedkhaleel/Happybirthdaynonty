import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { birthdayContent } from '../../data/birthdayContent';
import Countdown from './Countdown';
import BrushReveal from '../animation/BrushReveal';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';

/**
 * Hero Section - 100% Responsive & High Performance
 * Section 8: Full-screen hero celebrating Nour's birthday today
 * Strictly NO emojis.
 */
export default function Hero({ onExploreClick }) {
  const heroRef = useRef(null);

  return (
    <section
      ref={heroRef}
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(4.5rem, 10vh, 6rem) clamp(1rem, 3.5vw, 2rem) 3rem',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg)'
      }}
    >
      {/* Rose & Gold Atmospheric Glows */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: 'clamp(320px, 50vw, 550px)',
          height: 'clamp(320px, 50vw, 550px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '8%',
          width: 'clamp(300px, 45vw, 500px)',
          height: 'clamp(300px, 45vw, 500px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.14) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Decorative Organic SVG Brush Background Accents */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
        viewBox="0 0 1440 900"
        fill="none"
      >
        <path
          d="M 120,180 Q 450,110 820,190 T 1380,160"
          stroke="var(--color-secondary)"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.25"
          filter="url(#brush-rough-filter)"
        />
        <path
          d="M 80,720 C 400,680 750,780 1200,690"
          stroke="var(--color-tertiary)"
          strokeWidth="20"
          strokeLinecap="round"
          opacity="0.2"
          filter="url(#brush-rough-filter)"
        />
      </svg>

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'clamp(1.5rem, 4vw, 2.5rem)',
          maxWidth: '100%'
        }}
      >
        {/* Subtle pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pill-container"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.5rem 1.4rem',
            color: 'var(--color-primary)',
            fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
            fontWeight: 600
          }}
        >
          <Sparkles size={16} />
          <span>{birthdayContent.hero.badge}</span>
          <Heart size={15} fill="var(--color-primary)" />
        </motion.div>

        {/* Main Hero Headline */}
        <div style={{ maxWidth: '960px', width: '100%' }}>
          <BrushReveal color="var(--color-secondary)" strokeWidth={44}>
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5.8vw, 5.25rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                color: 'var(--color-text)',
                margin: '0.2rem 0',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              {birthdayContent.hero.heading}
            </h1>
          </BrushReveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(1.05rem, 2.2vw, 1.85rem)',
              color: 'var(--color-muted-rose)',
              fontWeight: 400,
              marginTop: '1.25rem',
              lineHeight: 1.7,
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            {birthdayContent.hero.subheading}
          </motion.p>
        </div>

        {/* Active Celebration Timer */}
        <div style={{ width: '100%', marginTop: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Countdown />
        </div>

        {/* Scroll indicator prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ marginTop: '1rem' }}
        >
          <motion.button
            onClick={onExploreClick}
            whileHover={{ y: 3 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-primary)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <span>{birthdayContent.hero.scrollPrompt}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <ChevronDown size={22} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
