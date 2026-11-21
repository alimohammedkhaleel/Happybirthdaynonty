import React from 'react';
import { motion } from 'motion/react';
import { birthdayContent } from '../../data/birthdayContent';
import { cardHoverVariants } from '../../animations/motion/variants';
import BrushReveal from '../animation/BrushReveal';
import { Sparkles } from 'lucide-react';

/**
 * MemoryGallery Component - 100% Responsive & Optimized
 * - Adaptive layout from single column on mobile to multi-column on desktop
 * - Safe rotations that neutralize on mobile to prevent overflow
 * - Tactile instant-photo squircle frames
 * Strictly NO emojis.
 */
export default function MemoryGallery() {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;

  return (
    <section
      className="memory-gallery-section"
      style={{
        position: 'relative',
        padding: 'var(--section-padding) 1.25rem',
        backgroundColor: '#FFFDF7',
        overflow: 'hidden',
        contain: 'paint'
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          <BrushReveal color="var(--color-primary)" strokeWidth={32}>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 800,
                color: 'var(--color-text)',
                marginBottom: '0.8rem'
              }}
            >
              لحظات مضيئة في الذاكرة
            </h2>
          </BrushReveal>
          <p style={{ color: 'var(--color-muted-rose)', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
            كل لحظة معكِ هي لوحة مرسومة بألوان الفرح
          </p>
        </div>

        {/* Fluid Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            alignItems: 'start'
          }}
        >
          {birthdayContent.memories.map((mem, index) => {
            const rotations = isMobile ? [0, 0, 0, 0] : [-2, 2.5, -1.5, 2];
            const currentRotation = rotations[index % rotations.length];

            return (
              <motion.div
                key={mem.id}
                variants={cardHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                style={{
                  transform: `rotate(${currentRotation}deg)`,
                  transition: 'transform 0.35s var(--transition-smooth)'
                }}
              >
                <div
                  className="squircle-frame tactile-card"
                  style={{
                    backgroundColor: '#FFFDF7',
                    padding: 'clamp(1rem, 2.5vw, 1.4rem) clamp(1rem, 2.5vw, 1.4rem) 1.6rem',
                    border: '1px solid rgba(227, 189, 191, 0.45)',
                    boxShadow: '0 16px 35px -8px rgba(74, 40, 40, 0.08), 0 0 20px rgba(245, 158, 11, 0.06)'
                  }}
                >
                  {/* Photo Frame / Artistic Canvas Display */}
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      position: 'relative',
                      background: `linear-gradient(135deg, rgba(251, 249, 243, 0.95), ${mem.color}15)`,
                      border: '1px solid rgba(245, 158, 11, 0.15)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1.25rem',
                      textAlign: 'center'
                    }}
                  >
                    {/* Tag badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        boxShadow: '0 2px 8px rgba(74, 40, 40, 0.05)'
                      }}
                    >
                      <Sparkles size={11} />
                      <span>{mem.tag}</span>
                    </div>

                    <span
                      className="font-calligraphy"
                      style={{
                        fontSize: 'clamp(2.4rem, 5vw, 3rem)',
                        color: mem.color,
                        opacity: 0.9,
                        marginBottom: '0.4rem',
                        lineHeight: 1
                      }}
                    >
                      نور
                    </span>

                    <p
                      style={{
                        fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        margin: 0,
                        lineHeight: 1.5
                      }}
                    >
                      {mem.caption}
                    </p>
                  </div>

                  {/* Caption beneath frame */}
                  <div style={{ marginTop: '1.15rem', textAlign: 'center' }}>
                    <p
                      style={{
                        fontSize: 'clamp(0.9rem, 1.8vw, 0.98rem)',
                        color: 'var(--color-muted-rose)',
                        lineHeight: 1.6,
                        margin: 0
                      }}
                    >
                      "{mem.quote}"
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
