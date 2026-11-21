import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * PaintTransition Component
 * Creates an organic painterly border transition between sections
 */
export default function PaintTransition({
  color = 'var(--color-bg)',
  accentColor = 'var(--color-secondary)',
  direction = 'bottom',
  height = 90
}) {
  const pathRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const length = path.getTotalLength ? path.getTotalLength() : 1200;

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%'
      }
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="paint-transition-divider"
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 2,
        marginTop: direction === 'top' ? `-${height / 2}px` : '0',
        marginBottom: direction === 'bottom' ? `-${height / 2}px` : '0'
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        <path
          d="M0,45 C280,95 450,10 720,55 C990,100 1200,20 1440,60 L1440,120 L0,120 Z"
          fill={color}
          opacity="0.8"
        />
        <path
          ref={pathRef}
          d="M -20,48 Q 360,98 720,52 T 1460,58"
          stroke={accentColor}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

