import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { createOpeningTimeline } from '../../animations/gsap/openingTimeline';
import { birthdayContent } from '../../data/birthdayContent';
import { Sparkles } from 'lucide-react';

/**
 * OpeningScreen Component
 * Section 7: Starts almost empty with warm buttercream screen.
 * - Computer/Desktop screens: EXACT original 1000x700 panoramic SVG layout.
 * - Mobile screens: Calibrated portrait SVG layout where strokes never cover the text.
 * Strictly NO emojis.
 */
export default function OpeningScreen({ onCompleteExperience }) {
  const containerRef = useRef(null);
  const titleNourRef = useRef(null);
  const fullGreetingRef = useRef(null);
  const reflectionTextRef = useRef(null);
  const ambientLightRef = useRef(null);
  const proceedBtnRef = useRef(null);

  const [, setIsDone] = useState(false);

  useGSAP(() => {
    if (!containerRef.current) return;

    const brush1Elements = containerRef.current.querySelectorAll('.opening-brush-1');
    const brush2Elements = containerRef.current.querySelectorAll('.opening-brush-2');
    const brush3Elements = containerRef.current.querySelectorAll('.opening-brush-3');

    const timeline = createOpeningTimeline(
      {
        container: containerRef.current,
        brush1: brush1Elements,
        brush2: brush2Elements,
        brush3: brush3Elements,
        titleNour: titleNourRef.current,
        fullGreeting: fullGreetingRef.current,
        reflectionText: reflectionTextRef.current,
        ambientLight: ambientLightRef.current,
        proceedButton: proceedBtnRef.current
      },
      () => {
        setIsDone(true);
      }
    );

    timeline.play();

    return () => {
      timeline.kill();
    };
  }, { scope: containerRef });

  const handleEnterExperience = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -40,
      filter: 'blur(10px)',
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: () => {
        if (onCompleteExperience) onCompleteExperience();
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="opening-screen-container"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9990,
        backgroundColor: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 3.5vw, 2rem)',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Ambient Light Bloom */}
      <div
        ref={ambientLightRef}
        style={{
          position: 'absolute',
          width: 'clamp(320px, 60vw, 500px)',
          height: 'clamp(320px, 60vw, 500px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(244, 63, 94, 0.12) 45%, transparent 75%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          opacity: 0
        }}
      />

      {/* 1. Desktop SVG Brush Strokes Layer (Exact Original from Computer Screens) */}
      <svg
        className="opening-svg-desktop"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1
        }}
        viewBox="0 0 1000 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="opening-brush-1"
          d="M 280,240 Q 500,210 720,250"
          stroke="var(--color-tertiary)"
          strokeWidth="38"
          strokeLinecap="round"
          filter="url(#brush-rough-filter)"
          opacity="0.3"
        />

        <path
          className="opening-brush-2"
          d="M 220,380 C 420,350 600,430 780,360"
          stroke="var(--color-secondary)"
          strokeWidth="24"
          strokeLinecap="round"
          filter="url(#brush-rough-filter)"
          opacity="0.45"
        />

        <path
          className="opening-brush-3"
          d="M 320,510 Q 500,490 680,520"
          stroke="var(--color-primary)"
          strokeWidth="16"
          strokeLinecap="round"
          filter="url(#brush-rough-filter)"
          opacity="0.3"
        />
      </svg>

      {/* 2. Mobile SVG Brush Strokes Layer (Calibrated Portrait View - Never Covers the Text!) */}
      <svg
        className="opening-svg-mobile"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1
        }}
        viewBox="0 0 400 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Brush 1: Under "نور" */}
        <path
          className="opening-brush-1"
          d="M 60,255 Q 200,225 340,255"
          stroke="var(--color-tertiary)"
          strokeWidth="30"
          strokeLinecap="round"
          filter="url(#brush-rough-filter)"
          opacity="0.25"
        />

        {/* Brush 2: Under "كل سنة وإنتِ طيبة يا نور" (Safely placed so it never covers the words) */}
        <path
          className="opening-brush-2"
          d="M 35,355 Q 200,335 365,355"
          stroke="var(--color-secondary)"
          strokeWidth="22"
          strokeLinecap="round"
          filter="url(#brush-rough-filter)"
          opacity="0.35"
        />

        {/* Brush 3: Under the reflection text */}
        <path
          className="opening-brush-3"
          d="M 60,465 Q 200,448 340,465"
          stroke="var(--color-primary)"
          strokeWidth="15"
          strokeLinecap="round"
          filter="url(#brush-rough-filter)"
          opacity="0.25"
        />
      </svg>

      {/* Painted Typography Story Content (Layered above SVG) */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '780px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(1.2rem, 3vw, 1.75rem)'
        }}
      >
        {/* Name: نور */}
        <h1
          ref={titleNourRef}
          className="font-calligraphy"
          style={{
            fontSize: 'clamp(3.8rem, 11vw, 8rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--color-primary)',
            textShadow: '0 8px 30px rgba(244, 63, 94, 0.25)',
            letterSpacing: '0.02em',
            margin: 0
          }}
        >
          {birthdayContent.opening.word}
        </h1>

        {/* "كل سنة وإنتِ طيبة يا نور" */}
        <h2
          ref={fullGreetingRef}
          style={{
            fontSize: 'clamp(1.4rem, 3.8vw, 2.8rem)',
            fontWeight: 700,
            color: 'var(--color-text)',
            letterSpacing: '-0.01em',
            margin: 0,
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          {birthdayContent.opening.celebration}
        </h2>

        {/* Reflection */}
        <p
          ref={reflectionTextRef}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.45rem)',
            color: 'var(--color-muted-rose)',
            lineHeight: 1.85,
            whiteSpace: 'pre-line',
            fontWeight: 400,
            margin: 0,
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          {birthdayContent.opening.reflection}
        </p>

        {/* Motion-enhanced Proceed Button */}
        <div
          ref={proceedBtnRef}
          style={{
            marginTop: '1rem',
            opacity: 0,
            transform: 'translateY(15px)'
          }}
        >
          <motion.button
            onClick={handleEnterExperience}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 30px rgba(244, 63, 94, 0.22)' }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFDF7',
              padding: 'clamp(0.75rem, 2vw, 0.9rem) clamp(1.4rem, 4vw, 2.2rem)',
              borderRadius: '9999px',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(244, 63, 94, 0.28)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer'
            }}
          >
            <span>{birthdayContent.opening.actionText}</span>
            <Sparkles size={18} color="#FFFDF7" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
