import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGSAP } from '@gsap/react';
import { useAudioSync } from '../../hooks/useAudioSync';
import { musicConfig } from '../../data/musicConfig';
import { animateMusicIntro } from '../../animations/gsap/musicIntro';
import MusicPlayer from './MusicPlayer';
import Lyrics from './Lyrics';
import AudioVisualizer from './AudioVisualizer';
import PaintTransition from '../animation/PaintTransition';
import { Music, Play, Sparkles } from 'lucide-react';

/**
 * MusicSection Component
 * Sections 17-26: Pure, high-performance creative music experience
 * Song: "عشان بحبك / طب ب بحبك" — حمو المرشدي
 * With Spinning Luxury Vinyl Record Graphic & Synced Visualizer
 * Strictly NO emojis.
 */
export default function MusicSection() {
  const sectionRef = useRef(null);
  const goldenStrokeRef = useRef(null);
  const titleRef = useRef(null);
  const artistRef = useRef(null);
  const playerRef = useRef(null);
  const lyricsRef = useRef(null);
  const visualizerRef = useRef(null);

  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);

  // Authoritative Audio Hook
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    autoplayBlocked,
    currentLyric,
    previousLyric,
    nextLyric,
    analyser,
    playAudio,
    togglePlay,
    seek,
    changeVolume,
    toggleMute
  } = useAudioSync();

  // Viewport intersection for GSAP intro and autoplay attempt
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasEnteredViewport) {
          setHasEnteredViewport(true);

          playAudio().catch(() => {
            // Autoplay blocked by browser policy, handled via elegant fallback button
          });
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasEnteredViewport, playAudio]);

  // GSAP choreographed entrance timeline
  useGSAP(() => {
    if (!hasEnteredViewport) return;

    animateMusicIntro({
      sectionWrapper: sectionRef.current,
      goldenStroke: goldenStrokeRef.current,
      title: titleRef.current,
      artistMeta: artistRef.current,
      playerContainer: playerRef.current,
      lyricsContainer: lyricsRef.current,
      visualizerCanvas: visualizerRef.current
    });
  }, { dependencies: [hasEnteredViewport], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="music-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: 'var(--section-padding) clamp(0.75rem, 3vw, 1.5rem)',
        backgroundColor: '#FFFDF7',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        contain: 'paint'
      }}
    >
      <PaintTransition color="var(--color-bg)" accentColor="var(--color-secondary)" direction="top" />

      {/* Audio Reactive Visualizer Canvas in Background */}
      <div
        ref={visualizerRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.85
        }}
      >
        <AudioVisualizer analyser={analyser} isPlaying={isPlaying} />
      </div>

      {/* Decorative Golden Stroke */}
      <svg
        style={{
          position: 'absolute',
          top: '5%',
          width: '85%',
          maxWidth: '900px',
          height: '110px',
          pointerEvents: 'none',
          zIndex: 1
        }}
        viewBox="0 0 900 110"
        fill="none"
      >
        <path
          ref={goldenStrokeRef}
          d="M 40,55 Q 250,15 450,70 T 860,50"
          stroke="var(--color-secondary)"
          strokeWidth="28"
          strokeLinecap="round"
          filter="url(#brush-rough-filter)"
          opacity="0.28"
        />
      </svg>

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '880px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(1.5rem, 3.5vw, 2.5rem)',
          width: '100%'
        }}
      >
        {/* Section Pill Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            className="pill-container"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.55rem 1.6rem',
              backgroundColor: '#FFFDF7',
              color: 'var(--color-primary)',
              fontSize: '0.95rem',
              fontWeight: 600
            }}
          >
            <Music size={16} />
            <span>اللحن المهدى لنور</span>
            <Sparkles size={16} color="var(--color-secondary)" />
          </div>
        </div>

        {/* Vinyl Record Artistic Visual Element (GPU-accelerated rotation) */}
        <div
          style={{
            position: 'relative',
            width: 'clamp(115px, 24vw, 170px)',
            height: 'clamp(115px, 24vw, 170px)',
            margin: '0.2rem 0'
          }}
        >
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              repeat: isPlaying ? Infinity : 0,
              duration: 5,
              ease: 'linear'
            }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #2C1810 0%, #150808 60%, #3D201A 100%)',
              border: '3.5px solid rgba(245, 158, 11, 0.35)',
              boxShadow: '0 15px 35px rgba(74, 40, 40, 0.22), 0 0 25px rgba(245, 158, 11, 0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              willChange: 'transform'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '14px',
                borderRadius: '50%',
                border: '1px dashed rgba(255, 255, 255, 0.15)',
                pointerEvents: 'none'
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '26px',
                borderRadius: '50%',
                border: '1px dashed rgba(255, 255, 255, 0.1)',
                pointerEvents: 'none'
              }}
            />

            {/* Center Rose Gold Label */}
            <div
              style={{
                width: 'clamp(46px, 9vw, 58px)',
                height: 'clamp(46px, 9vw, 58px)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(244, 63, 94, 0.4)'
              }}
            >
              <span
                className="font-calligraphy"
                style={{
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
                  color: '#FFFDF7',
                  fontWeight: 800
                }}
              >
                نور
              </span>
            </div>
          </motion.div>
        </div>

        {/* Song Titles & Artistic Credits */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          <h2
            ref={titleRef}
            className="font-calligraphy"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
              fontWeight: 800,
              color: 'var(--color-primary)',
              lineHeight: 1.2,
              marginBottom: '0.5rem'
            }}
          >
            {musicConfig.title}
          </h2>

          <div
            ref={artistRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(0.6rem, 2vw, 1.25rem)',
              flexWrap: 'wrap',
              color: 'var(--color-text)',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
              fontWeight: 500
            }}
          >
            <span>غناء: <strong>{musicConfig.artist}</strong></span>
            <span>•</span>
            <span>ألحان: <strong>{musicConfig.composer}</strong></span>
            <span>•</span>
            <span>توزيع: <strong>{musicConfig.arranger}</strong></span>
          </div>
        </div>

        {/* Autoplay Blocked Fallback Button */}
        <AnimatePresence>
          {autoplayBlocked && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              style={{
                backgroundColor: 'rgba(244, 63, 94, 0.08)',
                border: '1px solid var(--color-primary)',
                borderRadius: '16px',
                padding: '0.9rem 1.6rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '0.95rem' }}>انقري لبدء تشغيل الأغنية والاحتفال بنور:</span>
              <motion.button
                onClick={playAudio}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFDF7',
                  padding: '0.55rem 1.3rem',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                <Play size={16} fill="#FFFDF7" />
                <span>تشغيل الموسيقى</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Creative Cinematic Lyrics Display (Restored to previous artistic 3-line format) */}
        <div ref={lyricsRef} style={{ width: '100%' }}>
          <Lyrics
            currentLyric={currentLyric}
            previousLyric={previousLyric}
            nextLyric={nextLyric}
          />
        </div>

        {/* Custom Tactile Music Player */}
        <div ref={playerRef} style={{ width: '100%' }}>
          <MusicPlayer
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isMuted={isMuted}
            onTogglePlay={togglePlay}
            onSeek={seek}
            onChangeVolume={changeVolume}
            onToggleMute={toggleMute}
          />
        </div>
      </div>
    </section>
  );
}
