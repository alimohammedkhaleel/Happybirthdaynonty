import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { gsap } from 'gsap';

/**
 * FullScreenPaint Component
 * At major emotional moments, an animated brush stroke expands from 0% to 100% of the viewport,
 * then reveals the next scene seamlessly with GSAP.
 */
const FullScreenPaint = forwardRef(function FullScreenPaint(props, ref) {
  const overlayRef = useRef(null);
  const circleMaskRef = useRef(null);

  useImperativeHandle(ref, () => ({
    triggerTransition: (onMidpoint, onComplete) => {
      if (!overlayRef.current || !circleMaskRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, { pointerEvents: 'none' });
          if (onComplete) onComplete();
        }
      });

      gsap.set(overlayRef.current, {
        pointerEvents: 'all',
        visibility: 'visible',
        opacity: 1
      });

      // Expand paint circle over the entire screen
      tl.fromTo(circleMaskRef.current,
        {
          r: '0%'
        },
        {
          r: '150%',
          duration: 1.1,
          ease: 'power2.inOut',
          onComplete: () => {
            if (onMidpoint) onMidpoint();
          }
        }
      )
      // Soft fade out / retract to reveal new scene
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out'
      }, '+=0.2');
    }
  }));

  return (
    <div
      ref={overlayRef}
      className="fullscreen-paint-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9998,
        pointerEvents: 'none',
        visibility: 'hidden',
        overflow: 'hidden'
      }}
    >
      <svg
        style={{ width: '100%', height: '100%' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="paintGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="70%" stopColor="#FBF9F3" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
          </radialGradient>
        </defs>
        <circle
          ref={circleMaskRef}
          cx="50"
          cy="50"
          r="0"
          fill="url(#paintGrad)"
        />
      </svg>
    </div>
  );
});

export default FullScreenPaint;

