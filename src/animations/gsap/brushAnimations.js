import { gsap } from 'gsap';

/**
 * Organic Brush Animation Utilities
 * Generates tactile watercolor sweeps, stroke-dashoffset drawing, and organic clip-path reveals
 */

export function drawBrushPath(pathElement, duration = 1.6, delay = 0) {
  if (!pathElement) return;
  const length = pathElement.getTotalLength ? pathElement.getTotalLength() : 1000;
  
  gsap.set(pathElement, {
    strokeDasharray: length,
    strokeDashoffset: length
  });

  return gsap.to(pathElement, {
    strokeDashoffset: 0,
    duration,
    delay,
    ease: "power2.inOut"
  });
}

export function sweepGoldenLight(targetElement, duration = 2.4) {
  if (!targetElement) return;

  return gsap.fromTo(targetElement, 
    {
      backgroundPosition: "-200% 0%"
    },
    {
      backgroundPosition: "200% 0%",
      duration,
      ease: "power2.inOut"
    }
  );
}

export function organicPaintExpand(maskElement, onComplete) {
  if (!maskElement) return;

  const tl = gsap.timeline({ onComplete });
  tl.fromTo(maskElement,
    {
      clipPath: "ellipse(0% 0% at 50% 50%)"
    },
    {
      clipPath: "ellipse(150% 150% at 50% 50%)",
      duration: 1.8,
      ease: "power3.inOut"
    }
  );
  return tl;
}

