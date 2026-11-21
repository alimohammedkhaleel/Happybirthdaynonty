import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { birthdayContent } from '../../data/birthdayContent';
import PaintTransition from '../animation/PaintTransition';

/**
 * NewYearSection Component - 100% Responsive & High Performance
 * Section 12: Large cinematic scene
 * 1. "سنة جديدة."
 * 2. "حكايات جديدة."
 * 3. "ضحكات جديدة."
 * 4. "ذكريات لسه ما اتعملتش."
 * Climax:
 * "وأجمل حاجة فيها... إنها لسه ما بدأتش."
 * Revealed through a full-screen brush stroke via GSAP.
 * Strictly NO emojis.
 */
export default function NewYearSection() {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="new-year-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: 'var(--section-padding) clamp(1rem, 3.5vw, 2rem)',
        backgroundColor: '#FFFDF7',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <PaintTransition color="var(--color-cream-light)" accentColor="var(--color-primary)" direction="top" />

      {/* Atmospheric Center Glow */}
      <div
        style={{
          position: 'absolute',
          width: 'clamp(350px, 60vw, 650px)',
          height: 'clamp(350px, 60vw, 650px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, rgba(244, 63, 94, 0.08) 50%, transparent 75%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '880px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(1.75rem, 4vw, 2.5rem)'
        }}
      >
        {/* Rapid Sequential Staccato lines */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            width: '100%'
          }}
        >
          {birthdayContent.newYear.steps.map((step, idx) => (
            <motion.h3
              key={idx}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: idx * 0.18,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 3.2rem)',
                fontWeight: 700,
                color: idx === 3 ? 'var(--color-gold-dark)' : 'var(--color-text)',
                margin: 0
              }}
            >
              {step}
            </motion.h3>
          ))}
        </div>

        {/* Grand Climax Brush Reveal Container */}
        <div
          style={{
            position: 'relative',
            marginTop: 'clamp(2rem, 5vw, 3.5rem)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(0.75rem, 2vw, 2rem)',
            width: '100%'
          }}
        >
          {/* Full-width GSAP SVG Brush Stroke Sweep */}
          <svg
            className="new-year-climax-brush"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0
            }}
            viewBox="0 0 800 220"
            fill="none"
          >
            <path
              d="M 40,110 Q 250,30 460,130 T 760,100"
              stroke="var(--color-secondary)"
              strokeWidth="60"
              strokeLinecap="round"
              filter="url(#brush-rough-filter)"
              opacity="0.3"
            />
            <path
              d="M 60,120 Q 300,60 520,140 T 740,110"
              stroke="var(--color-tertiary)"
              strokeWidth="20"
              strokeLinecap="round"
              filter="url(#brush-rough-filter)"
              opacity="0.25"
            />
          </svg>

          {/* Climax Typography: وأجمل حاجة فيها... إنها لسه ما بدأتش. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <h2
              className="gold-gradient-text"
              style={{
                fontSize: 'clamp(1.9rem, 5vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 1.3,
                whiteSpace: 'pre-line',
                margin: 0
              }}
            >
              {birthdayContent.newYear.climax}
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
