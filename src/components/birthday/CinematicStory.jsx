import React from 'react';
import { birthdayContent } from '../../data/birthdayContent';
import PaintTransition from '../animation/PaintTransition';

/**
 * CinematicStory Component - 100% Responsive & High Performance
 * Section 9: Multiple full-screen storytelling scenes
 * 1. "يمكن السنة اللي فاتت ما كانتش كلها سهلة..."
 * 2. "بس كل حاجة عدّت خلتك أقوى."
 * 3. "وأهدى."
 * 4. "وأقرب لنفسك."
 * Controlled by GSAP ScrollTrigger with unique visual compositions.
 * Strictly NO emojis.
 */
export default function CinematicStory() {
  return (
    <section className="cinematic-story-section" style={{ position: 'relative' }}>
      <PaintTransition color="var(--color-bg)" accentColor="var(--color-secondary)" direction="top" />

      {birthdayContent.cinematicStory.map((scene, idx) => (
        <div
          key={scene.id}
          className="story-scene"
          style={{
            minHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: 'clamp(3rem, 7vh, 5rem) clamp(1rem, 3.5vw, 2rem)',
            textAlign: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Ambient Scene Glow */}
          <div
            className="story-glow"
            style={{
              position: 'absolute',
              width: 'clamp(320px, 50vw, 550px)',
              height: 'clamp(320px, 50vw, 550px)',
              borderRadius: '50%',
              background: idx % 2 === 0
                ? 'radial-gradient(circle, rgba(244, 63, 94, 0.09) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)',
              filter: 'blur(55px)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          {/* Artistic SVG Brush Accent for each scene */}
          <svg
            style={{
              position: 'absolute',
              width: '85%',
              maxWidth: '800px',
              height: '180px',
              pointerEvents: 'none',
              zIndex: 1,
              opacity: 0.22
            }}
            viewBox="0 0 800 180"
            fill="none"
          >
            {idx === 0 && (
              <path
                d="M 50,90 Q 250,30 450,110 T 750,80"
                stroke="var(--color-secondary)"
                strokeWidth="22"
                strokeLinecap="round"
                filter="url(#brush-rough-filter)"
              />
            )}
            {idx === 1 && (
              <path
                d="M 80,120 C 300,50 500,140 720,70"
                stroke="var(--color-primary)"
                strokeWidth="28"
                strokeLinecap="round"
                filter="url(#brush-rough-filter)"
              />
            )}
            {idx === 2 && (
              <circle
                cx="400"
                cy="90"
                r="65"
                stroke="var(--color-secondary)"
                strokeWidth="16"
                filter="url(#brush-rough-filter)"
              />
            )}
            {idx === 3 && (
              <path
                d="M 100,80 Q 400,140 700,75"
                stroke="var(--color-gold-bright)"
                strokeWidth="32"
                strokeLinecap="round"
                filter="url(#brush-rough-filter)"
              />
            )}
          </svg>

          {/* Text Scene Container */}
          <div
            className="container"
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: '840px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem'
            }}
          >
            {/* Tag / Accent */}
            <span
              className="story-accent"
              style={{
                fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
                fontWeight: 600,
                color: 'var(--color-gold-dark)',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                padding: '0.4rem 1.2rem',
                borderRadius: '999px',
                border: '1px solid rgba(245, 158, 11, 0.25)'
              }}
            >
              {scene.accent}
            </span>

            {/* Main Story Line */}
            <h2
              className="story-line"
              style={{
                fontSize: idx >= 2 ? 'clamp(2.4rem, 6.5vw, 5.5rem)' : 'clamp(1.8rem, 4.8vw, 3.8rem)',
                fontWeight: idx >= 2 ? 800 : 700,
                color: idx >= 2 ? 'var(--color-primary)' : 'var(--color-text)',
                lineHeight: 1.4,
                whiteSpace: 'pre-line',
                textShadow: idx >= 2 ? '0 4px 20px rgba(244, 63, 94, 0.2)' : 'none',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              {scene.line}
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                color: 'var(--color-muted-rose)',
                marginTop: '0.25rem',
                wordBreak: 'break-word'
              }}
            >
              {scene.atmosphere}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
