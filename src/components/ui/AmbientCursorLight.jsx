import React, { useEffect, useRef } from 'react';

/**
 * AmbientCursorLight Component - Maximum Performance Edition
 * - 0% React re-render overhead: updates DOM directly via requestAnimationFrame & translate3d
 * - Automatically disabled on touch screens (coarse pointer) and prefers-reduced-motion
 * - High-end golden champagne ambient light trailing cursor
 */
export default function AmbientCursorLight() {
  const glowRef = useRef(null);
  const posRef = useRef({ x: -300, y: -300 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = glowRef.current;
    if (!el) return;

    const onMouseMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      if (el.style.opacity !== '1') {
        el.style.opacity = '1';
      }

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.transform = `translate3d(${posRef.current.x - 300}px, ${posRef.current.y - 300}px, 0)`;
          }
          rafRef.current = null;
        });
      }
    };

    const onMouseLeave = () => {
      if (el) el.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="ambient-glow"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '600px',
        height: '600px',
        pointerEvents: 'none',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(244, 63, 94, 0.04) 50%, transparent 75%)',
        zIndex: 1,
        filter: 'blur(45px)',
        opacity: 0,
        transition: 'opacity 0.4s ease',
        willChange: 'transform'
      }}
    />
  );
}
