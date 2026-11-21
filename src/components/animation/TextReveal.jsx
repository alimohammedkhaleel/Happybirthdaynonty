import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * TextReveal Component
 * Words or characters revealed via GSAP clip-path and blur reduction
 */
export default function TextReveal({
  text,
  as: Component = 'h2',
  className = '',
  delay = 0,
  stagger = 0.08,
  triggerOnScroll = true
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll('.reveal-word');

    const tl = gsap.timeline({
      scrollTrigger: triggerOnScroll ? {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      } : null
    });

    tl.fromTo(words,
      {
        opacity: 0,
        y: 28,
        filter: 'blur(8px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        stagger,
        delay,
        ease: 'power3.out'
      }
    );

    return () => {
      tl.kill();
    };
  }, [stagger, delay, triggerOnScroll]);

  const words = text ? text.split(' ') : [];

  return (
    <Component ref={containerRef} className={`text-reveal-container ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className="reveal-word"
          style={{
            display: 'inline-block',
            marginRight: '0.28em',
            willChange: 'transform, opacity, filter'
          }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}

