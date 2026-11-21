import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom GSAP hook for clean animation scoping and automatic cleanup
 * Avoids duplicate timelines and memory leaks in React
 */
export function useGSAPAnimation(animationCallback, dependencies = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use gsap.context to isolate and safely clean up all ScrollTrigger & tweens
    const ctx = gsap.context(() => {
      animationCallback(gsap, ScrollTrigger);
    }, containerRef);

    return () => {
      ctx.revert(); // Automatically kills tweens, resets styles, and removes ScrollTriggers
    };
  }, dependencies);

  return containerRef;
}

