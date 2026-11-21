import { useState, useEffect, useRef, useCallback } from 'react';
import { initialLyrics } from '../data/lyrics';
import { musicConfig } from '../data/musicConfig';

/**
 * Authoritative Audio Synchronization Hook - Performance & Display Optimized
 * Uses audio.currentTime as the single source of truth for lyrics and progress.
 * Strictly uses final calibrated lyrics without any editing/saving overhead.
 * Includes graceful Web Audio API harmonic sound generator fallback if local mp3 is not yet mounted.
 */
export function useAudioSync() {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const synthIntervalRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(musicConfig.durationSeconds || 161);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  
  // Final authoritative lyrics from lyrics.js
  const lyrics = initialLyrics;
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [isUsingSynthFallback, setIsUsingSynthFallback] = useState(false);

  // Setup Web Audio Analyser
  const setupAnalyser = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      if (!analyserRef.current && audioContextRef.current) {
        const analyser = audioContextRef.current.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;

        if (audioRef.current && !audioRef.current._sourceNode) {
          try {
            const source = audioContextRef.current.createMediaElementSource(audioRef.current);
            source.connect(analyser);
            analyser.connect(audioContextRef.current.destination);
            audioRef.current._sourceNode = source;
          } catch {
            // Already connected or cross-origin
          }
        }
      }
    } catch (err) {
      console.warn('Web Audio API setup notice:', err);
    }
  }, []);

  // Web Audio Synthesizer Fallback
  const playSynthChord = useCallback((frequency, type = 'sine', noteDuration = 2.0) => {
    try {
      if (!audioContextRef.current) setupAnalyser();
      const ctx = audioContextRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12 * volume, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + noteDuration);

      osc.connect(filter);
      filter.connect(gain);

      if (analyserRef.current) {
        gain.connect(analyserRef.current);
      } else {
        gain.connect(ctx.destination);
      }

      osc.start();
      osc.stop(ctx.currentTime + noteDuration);
    } catch (e) {
      console.warn('Synth note error:', e);
    }
  }, [setupAnalyser, volume]);

  // Audio element setup and event listeners
  useEffect(() => {
    const audio = new Audio();
    audio.src = musicConfig.audioSrc;
    audio.preload = 'metadata';
    audio.volume = 0.85;
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && audio.duration > 1) {
        setDuration(audio.duration);
        setIsUsingSynthFallback(false);
      }
    };

    const handleTimeUpdate = () => {
      // Authoritative timing source
      setCurrentTime(audio.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      audio.currentTime = 0;
      setCurrentTime(0);
    };

    const handleError = () => {
      console.info('Audio asset is being generated via Web Audio API engine.');
      setIsUsingSynthFallback(true);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    };
  }, []);

  // Update current lyric based strictly on audio.currentTime (Bails out if index unchanged)
  useEffect(() => {
    if (!lyrics || lyrics.length === 0) return;

    let index = lyrics.findIndex(
      (item) => currentTime >= item.start && currentTime < item.end
    );

    if (index === -1) {
      const pastIndex = [...lyrics].reverse().findIndex((item) => currentTime >= item.start);
      index = pastIndex !== -1 ? lyrics.length - 1 - pastIndex : 0;
    }

    setCurrentLyricIndex((prev) => (prev !== index ? index : prev));
  }, [currentTime, lyrics]);

  // Fallback clock simulation if using Web Audio synth
  useEffect(() => {
    if (!isUsingSynthFallback) return;

    if (isPlaying) {
      const chords = [
        [261.63, 329.63, 392.00],
        [329.63, 392.00, 493.88],
        [349.23, 440.00, 523.25],
        [392.00, 493.88, 587.33]
      ];
      let chordIndex = 0;

      synthIntervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1;
          if (next >= duration) {
            setIsPlaying(false);
            return 0;
          }
          if (Math.floor(next * 10) % 20 === 0) {
            const currentChord = chords[chordIndex % chords.length];
            currentChord.forEach((f, idx) => {
              setTimeout(() => playSynthChord(f, 'sine', 1.8), idx * 60);
            });
            chordIndex++;
          }
          return next;
        });
      }, 100);
    } else {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    }

    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    };
  }, [isUsingSynthFallback, isPlaying, duration, playSynthChord]);

  // Play / Pause controls
  const playAudio = useCallback(async () => {
    setupAnalyser();
    if (isUsingSynthFallback) {
      setIsPlaying(true);
      return true;
    }
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
        return true;
      } catch (err) {
        console.warn('Playback blocked by browser policy:', err);
        setAutoplayBlocked(true);
        return false;
      }
    }
    return false;
  }, [isUsingSynthFallback, setupAnalyser]);

  const pauseAudio = useCallback(() => {
    if (isUsingSynthFallback) {
      setIsPlaying(false);
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isUsingSynthFallback]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, playAudio, pauseAudio]);

  const seek = useCallback((timeInSeconds) => {
    const clampedTime = Math.max(0, Math.min(timeInSeconds, duration));
    if (audioRef.current && !isUsingSynthFallback) {
      audioRef.current.currentTime = clampedTime;
    }
    setCurrentTime(clampedTime);
  }, [duration, isUsingSynthFallback]);

  const changeVolume = useCallback((newVolume) => {
    const vol = Math.max(0, Math.min(1, newVolume));
    setVolume(vol);
    setIsMuted(vol === 0);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume || 0.8;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  }, [isMuted, volume]);

  const jumpToLyric = useCallback((lyricId) => {
    const lyric = lyrics.find((l) => l.id === lyricId);
    if (lyric) {
      seek(lyric.start);
      if (!isPlaying) playAudio();
    }
  }, [lyrics, seek, isPlaying, playAudio]);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    autoplayBlocked,
    lyrics,
    currentLyricIndex,
    currentLyric: lyrics[currentLyricIndex] || null,
    previousLyric: lyrics[currentLyricIndex - 1] || null,
    nextLyric: lyrics[currentLyricIndex + 1] || null,
    analyser: analyserRef.current,
    audioElement: audioRef.current,
    isUsingSynthFallback,
    playAudio,
    pauseAudio,
    togglePlay,
    seek,
    changeVolume,
    toggleMute,
    jumpToLyric,
    setAutoplayBlocked
  };
}
