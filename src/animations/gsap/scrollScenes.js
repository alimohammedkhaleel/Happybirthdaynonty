import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollTrigger Cinematic Scenes
 * Orchestrates full-screen storytelling, appreciation reveals, motivation lighting progression
 */
export function initScrollScenes(container) {
  if (!container) return;

  const ctx = gsap.context(() => {
    // 1. Cinematic Story Scenes (pinned parallax text progression)
    const storyScenes = gsap.utils.toArray('.story-scene');
    storyScenes.forEach((scene) => {
      const line = scene.querySelector('.story-line');
      const accent = scene.querySelector('.story-accent');
      const glow = scene.querySelector('.story-glow');

      gsap.fromTo(line,
        {
          opacity: 0,
          y: 60,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scene,
            start: 'top 75%',
            end: 'top 30%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );

      if (accent) {
        gsap.fromTo(accent,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: 0.3,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: scene,
              start: 'top 70%'
            }
          }
        );
      }

      if (glow) {
        gsap.to(glow, {
          scale: 1.3,
          opacity: 0.6,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    });

    // 2. Appreciation Section: Staggered statement cards with warm golden strokes
    const appreciationItems = gsap.utils.toArray('.appreciation-card');
    if (appreciationItems.length > 0) {
      gsap.fromTo(appreciationItems,
        {
          opacity: 0,
          y: 40,
          scale: 0.96
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.22,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.appreciation-grid',
            start: 'top 80%'
          }
        }
      );
    }

    // 3. Motivational Section: Background gradually brightens with golden lighting sweep
    const motivationSection = document.querySelector('.motivation-section');
    if (motivationSection) {
      gsap.fromTo('.motivation-light-sweep',
        {
          opacity: 0.1,
          scale: 0.7,
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 60%)'
        },
        {
          opacity: 0.75,
          scale: 1.5,
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(244, 63, 94, 0.18) 50%, transparent 80%)',
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: motivationSection,
            start: 'top 65%',
            end: 'bottom 40%',
            scrub: 1
          }
        }
      );
    }

    // 4. New Year Climax: Full-screen brush stroke reveal
    const newYearClimax = document.querySelector('.new-year-climax-brush');
    if (newYearClimax) {
      gsap.fromTo(newYearClimax,
        {
          strokeDasharray: 2000,
          strokeDashoffset: 2000,
          opacity: 0
        },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 2.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.new-year-section',
            start: 'top 60%'
          }
        }
      );
    }

  }, container);

  return ctx;
}

