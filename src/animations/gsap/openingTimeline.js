import { gsap } from 'gsap';

/**
 * Opening Sequence GSAP Timeline
 * Simulates real artistic watercolor brush strokes appearing on warm buttercream paper.
 * Reveals:
 * 1. "نور"
 * 2. "كل سنة وإنتِ طيبة يا نور"
 * 3. "سنة جديدة من عمرك... ونفسك تستحق تكون أجمل من كل اللي فات."
 */
export function createOpeningTimeline(elements, onComplete) {
  const {
    brush1,
    brush2,
    brush3,
    titleNour,
    fullGreeting,
    reflectionText,
    ambientLight,
    proceedButton
  } = elements;

  const tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      if (onComplete) onComplete();
    }
  });

  // Set initial states
  gsap.set([titleNour, fullGreeting, reflectionText, proceedButton], {
    opacity: 0,
    visibility: 'visible'
  });

  gsap.set([brush1, brush2, brush3], {
    strokeDasharray: 1200,
    strokeDashoffset: 1200,
    opacity: 0.85
  });

  // Ambient light subtle bloom
  tl.to(ambientLight, {
    opacity: 0.4,
    scale: 1.2,
    duration: 2.2,
    ease: 'power2.out'
  }, 0);

  // Brush stroke 1 draws across
  tl.to(brush1, {
    strokeDashoffset: 0,
    duration: 1.8,
    ease: 'power2.inOut'
  }, 0.5);

  // Name "نور" emerges like wet paint expanding
  tl.fromTo(titleNour, 
    {
      opacity: 0,
      scale: 0.82,
      filter: 'blur(12px)',
      y: 20
    },
    {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 1.6,
      ease: 'power3.out'
    },
    1.2
  );

  // Brush stroke 2 arches under the name with festive champagne gold
  tl.to(brush2, {
    strokeDashoffset: 0,
    duration: 2.0,
    ease: 'power2.inOut'
  }, 2.2);

  // "كل سنة وإنتِ طيبة يا نور" paints into view
  tl.fromTo(fullGreeting,
    {
      opacity: 0,
      y: 25,
      filter: 'blur(8px)'
    },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'power3.out'
    },
    3.0
  );

  // Brush stroke 3 sweeps softly
  tl.to(brush3, {
    strokeDashoffset: 0,
    duration: 2.2,
    ease: 'power2.inOut'
  }, 4.0);

  // Reflection text reveals with warm emotional glow
  tl.fromTo(reflectionText,
    {
      opacity: 0,
      y: 20,
      filter: 'blur(6px)'
    },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.8,
      ease: 'power2.out'
    },
    4.8
  );

  // Floating gentle prompt button
  tl.to(proceedButton, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power2.out'
  }, 6.2);

  return tl;
}

