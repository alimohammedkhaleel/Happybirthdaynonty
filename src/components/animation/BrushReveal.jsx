import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * BrushReveal Component
 * Uses custom SVG brush mask and GSAP to organically reveal content on scroll or trigger
 */
export default function BrushReveal({ 
  children, 
  direction: _direction = 'horizontal', 
  color = 'var(--color-secondary)',
  strokeWidth = 48,
  triggerOnScroll = true,
  className = ''
}) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength ? path.getTotalLength() : 800;

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    if (contentRef.current) {
      gsap.set(contentRef.current, {
        opacity: 0,
        y: 15
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: triggerOnScroll ? {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      } : null
    });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: 'power2.inOut'
    })
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out'
    }, '-=0.6');

    return () => {
      tl.kill();
    };
  }, [triggerOnScroll]);

  return (
    <div ref={containerRef} className={`brush-reveal-wrapper ${className}`} style={{ position: 'relative', display: 'inline-block' }}>
      <svg
        className="brush-reveal-svg"
        viewBox="0 0 500 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-5%',
          width: '110%',
          height: '130%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.35
        }}
      >
        <path
          ref={pathRef}
          d="M 20,60 Q 150,15 280,65 T 480,55"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#brush-rough-filter)"
        />
      </svg>
      <div ref={contentRef} style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

