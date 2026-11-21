import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { buttonMotion } from '../../animations/motion/variants';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

/**
 * Format seconds to mm:ss format using Space Grotesk
 */
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * MusicPlayer Component - 100% Responsive & High Performance
 * Section 19: Custom tactile music player with GPU-accelerated equalizer bars
 * Adapts fluidly across mobile, tablet, and desktop without layout shifts.
 * Strictly NO emojis.
 */
export default function MusicPlayer({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  onTogglePlay,
  onSeek,
  onChangeVolume,
  onToggleMute
}) {
  const progressBarRef = useRef(null);

  const handleProgressClick = (e) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    if (width <= 0) return;
    const percent = Math.max(0, Math.min(1, clickX / width));
    onSeek(percent * duration);
  };

  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  // 11 Equalizer bar heights & delays for hardware-accelerated CSS animation
  const eqBars = [
    { height: 14, delay: '0s', color: 'var(--color-primary)' },
    { height: 20, delay: '0.15s', color: 'var(--color-secondary)' },
    { height: 22, delay: '0.3s', color: 'var(--color-primary)' },
    { height: 16, delay: '0.1s', color: 'var(--color-secondary)' },
    { height: 21, delay: '0.25s', color: 'var(--color-primary)' },
    { height: 15, delay: '0.4s', color: 'var(--color-secondary)' },
    { height: 19, delay: '0.05s', color: 'var(--color-primary)' },
    { height: 22, delay: '0.2s', color: 'var(--color-secondary)' },
    { height: 13, delay: '0.35s', color: 'var(--color-primary)' },
    { height: 18, delay: '0.15s', color: 'var(--color-secondary)' },
    { height: 12, delay: '0.28s', color: 'var(--color-primary)' }
  ];

  return (
    <div
      className="tactile-card custom-player-box"
      style={{
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
        padding: 'clamp(1.1rem, 2.5vw, 1.6rem) clamp(0.9rem, 2.5vw, 1.8rem)',
        backgroundColor: '#FFFDF7',
        border: '1px solid rgba(227, 189, 191, 0.45)',
        boxShadow: '0 16px 40px -10px rgba(74, 40, 40, 0.08), 0 0 25px rgba(245, 158, 11, 0.1)',
        borderRadius: '26px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.15rem'
      }}
    >
      {/* Visual Live Waveform Mini Equalizer Bars (Hardware-Accelerated CSS) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3.5px',
          height: '24px'
        }}
      >
        {eqBars.map((bar, i) => (
          <div
            key={i}
            className={`eq-bar ${isPlaying ? 'playing' : ''}`}
            style={{
              width: '3.5px',
              height: `${bar.height}px`,
              backgroundColor: bar.color,
              borderRadius: '999px',
              animationDelay: bar.delay,
              transform: isPlaying ? undefined : 'scaleY(0.25)',
              transition: 'transform 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Progress Bar with Precision Seek Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        <div
          ref={progressBarRef}
          onClick={handleProgressClick}
          style={{
            position: 'relative',
            height: '10px',
            backgroundColor: 'var(--color-cream-mid)',
            borderRadius: '999px',
            cursor: 'pointer',
            overflow: 'hidden',
            touchAction: 'none'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
              borderRadius: '999px',
              transition: 'width 0.08s linear'
            }}
          />
        </div>

        {/* Timestamps in Space Grotesk */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'clamp(0.78rem, 1.8vw, 0.85rem)',
            color: 'var(--color-muted-rose)'
          }}
        >
          <span className="font-mono">{formatTime(currentTime)}</span>
          <span className="font-mono">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Controls Toolbar - Fully Fluid & Responsive */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        {/* Replay 10s button */}
        <motion.button
          onClick={() => onSeek(Math.max(0, currentTime - 10))}
          variants={buttonMotion}
          whileHover="hover"
          whileTap="tap"
          title="رجوع 10 ثوانٍ"
          style={{
            color: 'var(--color-text)',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            opacity: 0.85
          }}
        >
          <RotateCcw size={19} />
        </motion.button>

        {/* Play/Pause Main Button */}
        <motion.button
          onClick={onTogglePlay}
          className="player-play-btn"
          variants={buttonMotion}
          whileHover="hover"
          whileTap="tap"
          style={{
            width: 'clamp(52px, 12vw, 64px)',
            height: 'clamp(52px, 12vw, 64px)',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            color: '#FFFDF7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(244, 63, 94, 0.35)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            cursor: 'pointer'
          }}
        >
          {isPlaying ? (
            <Pause size={25} fill="#FFFDF7" />
          ) : (
            <Play size={25} fill="#FFFDF7" style={{ marginRight: '-2px' }} />
          )}
        </motion.button>

        {/* Volume & Mute Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <motion.button
            onClick={onToggleMute}
            variants={buttonMotion}
            whileHover="hover"
            whileTap="tap"
            style={{ color: 'var(--color-text)', opacity: 0.85, padding: '0.3rem' }}
          >
            {isMuted || volume === 0 ? <VolumeX size={19} /> : <Volume2 size={19} />}
          </motion.button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
            style={{
              width: 'clamp(55px, 14vw, 85px)',
              accentColor: 'var(--color-primary)',
              cursor: 'pointer'
            }}
          />
        </div>
      </div>
    </div>
  );
}
