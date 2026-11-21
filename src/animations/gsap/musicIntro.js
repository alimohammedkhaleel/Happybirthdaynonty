import { gsap } from 'gsap';

/**
 * Music Section Entrance Choreography
 * Previous scene -> background transition -> golden brush stroke -> song title -> artist -> player -> lyrics -> visualizer
 */
export function animateMusicIntro(elements, onComplete) {
  const {
    sectionWrapper,
    goldenStroke,
    title,
    artistMeta,
    playerContainer,
    lyricsContainer,
    visualizerCanvas
  } = elements;

  const tl = gsap.timeline({
    onComplete
  });

  // Background subtle warm lighting shift
  tl.fromTo(sectionWrapper,
    { backgroundColor: 'rgba(255, 253, 247, 0.95)' },
    { backgroundColor: '#FFFDF7', duration: 1.2, ease: 'power2.inOut' },
    0
  );

  // Golden brush stroke sweeps in
  if (goldenStroke) {
    tl.fromTo(goldenStroke,
      { strokeDasharray: 1400, strokeDashoffset: 1400, opacity: 0 },
      { strokeDashoffset: 0, opacity: 1, duration: 1.8, ease: 'power2.inOut' },
      0.3
    );
  }

  // Song title and artist reveal with rose gold elegance
  if (title) {
    tl.fromTo(title,
      { opacity: 0, y: 35, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
      0.9
    );
  }

  if (artistMeta) {
    tl.fromTo(artistMeta,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
      1.3
    );
  }

  // Music Player container unfolds
  if (playerContainer) {
    tl.fromTo(playerContainer,
      { opacity: 0, scale: 0.94, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      1.6
    );
  }

  // Lyrics container
  if (lyricsContainer) {
    tl.fromTo(lyricsContainer,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
      2.0
    );
  }

  // Visualizer canvas glows
  if (visualizerCanvas) {
    tl.fromTo(visualizerCanvas,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'sine.inOut' },
      2.2
    );
  }

  return tl;
}

