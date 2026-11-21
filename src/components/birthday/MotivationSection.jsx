import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { birthdayContent } from '../../data/birthdayContent';
import { Sparkles, Sun } from 'lucide-react';

/**
 * MotivationSection Component - 100% Responsive & High Performance
 * Section 11: Emotional motivational section
 * "السنة دي ليكي.
 * احلمي أكتر.
 * جربي أكتر.
 * ضحكي أكتر.
 * واختاري نفسك أكتر.
 * ما تخليش خوف قديم يوقف حاجة جميلة لسه ما بدأتش.
 * إنتِ قدها. وأكتر كمان."
 * Background gradually brightens with warm golden lighting sweep via GSAP ScrollTrigger.
 * Strictly NO emojis.
 */
export default function MotivationSection() {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="motivation-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'var(--section-padding) clamp(1rem, 3.5vw, 2rem)',
        backgroundColor: '#FFFDF7',
        overflow: 'hidden'
      }}
    >
      {/* Dynamic Golden Light Sweep Sphere */}
      <div
        className="motivation-light-sweep"
        style={{
          position: 'absolute',
          width: 'clamp(400px, 70vw, 750px)',
          height: 'clamp(400px, 70vw, 750px)',
          borderRadius: '50%',
          filter: 'blur(75px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '860px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(2rem, 5vw, 3rem)'
        }}
      >
        {/* Top Motivational Aura Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="pill-container"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.6rem 1.6rem',
            backgroundColor: '#FFFDF7',
            color: 'var(--color-gold-dark)',
            fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
            fontWeight: 600
          }}
        >
          <Sun size={18} color="var(--color-secondary)" />
          <span>رسالة أمل وإلهام</span>
          <Sparkles size={16} color="var(--color-gold-bright)" />
        </motion.div>

        {/* 1. Lead: السنة دي ليكي */}
        <div style={{ width: '100%' }}>
          <h2
            className="gold-gradient-text"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 5.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1.18,
              marginBottom: '1.25rem'
            }}
          >
            {birthdayContent.motivation.paragraphs[0].lead}
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.15rem, 2.5vw, 1.95rem)',
              fontWeight: 500,
              color: 'var(--color-text)',
              lineHeight: 1.8,
              whiteSpace: 'pre-line'
            }}
          >
            {birthdayContent.motivation.paragraphs[0].body}
          </p>
        </div>

        {/* 2. Middle Wisdom Quote */}
        <div
          style={{
            padding: 'clamp(1.2rem, 3vw, 2.5rem)',
            borderRight: '4px solid var(--color-primary)',
            backgroundColor: 'rgba(251, 249, 243, 0.75)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(74, 40, 40, 0.04)',
            maxWidth: '720px',
            width: '100%'
          }}
        >
          <p
            style={{
              fontSize: 'clamp(1.1rem, 2.2vw, 1.65rem)',
              color: 'var(--color-text)',
              fontWeight: 600,
              lineHeight: 1.8,
              whiteSpace: 'pre-line',
              margin: 0
            }}
          >
            {birthdayContent.motivation.paragraphs[1].body}
          </p>
        </div>

        {/* 3. Finale Affirmation: إنتِ قدها. وأكتر كمان. */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: '0.5rem'
          }}
        >
          <h3
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              color: 'var(--color-primary)',
              textShadow: '0 4px 20px rgba(244, 63, 94, 0.25)',
              margin: 0
            }}
          >
            {birthdayContent.motivation.paragraphs[2].body}
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
