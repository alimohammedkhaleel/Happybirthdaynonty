import React from 'react';
import { motion } from 'motion/react';
import { birthdayContent } from '../../data/birthdayContent';
import { cardHoverVariants } from '../../animations/motion/variants';
import BrushReveal from '../animation/BrushReveal';
import { Heart } from 'lucide-react';

/**
 * AppreciationSection Component - 100% Responsive & Optimized
 * Section 10: Emotional statements about Nour
 * "إنتِ تستحقي كل حاجة حلوة."
 * "وجودك بيخلّي التفاصيل الصغيرة لها معنى."
 * "فيكي حاجة مميزة صعب تتكرر."
 * "ابتسامتك قادرة تغيّر شكل اليوم."
 * "خليكي دايمًا فاكرة إنك تستحقي الأفضل."
 * Framer Motion controls card hovers, GSAP handles entrance reveals.
 * Strictly NO emojis.
 */
export default function AppreciationSection() {
  return (
    <section
      className="appreciation-section"
      style={{
        position: 'relative',
        padding: 'var(--section-padding) clamp(1rem, 3.5vw, 2rem)',
        backgroundColor: '#FFFDF7',
        overflow: 'hidden'
      }}
    >
      {/* Soft warm background light */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '-5%',
          width: 'clamp(350px, 50vw, 600px)',
          height: 'clamp(350px, 50vw, 600px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          <BrushReveal color="var(--color-secondary)" strokeWidth={36}>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 800,
                color: 'var(--color-text)',
                marginBottom: '1rem'
              }}
            >
              {birthdayContent.appreciation.title}
            </h2>
          </BrushReveal>
          <p
            style={{
              color: 'var(--color-muted-rose)',
              maxWidth: '600px',
              margin: '0 auto',
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)'
            }}
          >
            {birthdayContent.appreciation.subtitle}
          </p>
        </div>

        {/* Appreciation Statements Grid - 100% Responsive on all screens */}
        <div
          className="appreciation-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.25rem, 3vw, 2rem)'
          }}
        >
          {birthdayContent.appreciation.statements.map((stmt, idx) => (
            <motion.div
              key={stmt.id}
              variants={cardHoverVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="appreciation-card tactile-card"
              style={{
                padding: 'clamp(1.5rem, 3vw, 2.4rem) clamp(1.1rem, 2.5vw, 2rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem',
                border: '1px solid rgba(227, 189, 191, 0.4)',
                borderRadius: '24px',
                cursor: 'pointer'
              }}
            >
              {/* Top Accent Icon & Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(244, 63, 94, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)'
                  }}
                >
                  <Heart size={18} fill="var(--color-primary)" />
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--color-gold-dark)',
                    opacity: 0.8
                  }}
                >
                  0{idx + 1}
                </span>
              </div>

              {/* Main Statement */}
              <h3
                style={{
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.65rem)',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  lineHeight: 1.5
                }}
              >
                {stmt.text}
              </h3>

              {/* Explanatory heartfelt note */}
              <p
                style={{
                  fontSize: 'clamp(0.92rem, 1.8vw, 1rem)',
                  color: 'var(--color-muted-rose)',
                  lineHeight: 1.7,
                  borderTop: '1px dashed rgba(245, 158, 11, 0.3)',
                  paddingTop: '0.9rem',
                  margin: 0
                }}
              >
                {stmt.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
