import React, { useRef, useEffect } from 'react';

/**
 * AudioVisualizer Component - High Performance & Energy Efficient Edition
 * - Pauses rendering loop completely when off-screen via IntersectionObserver
 * - Automatically pauses on tab visibility change to conserve CPU/battery
 * - Capped devicePixelRatio to guarantee high FPS on high-DPI/Retina screens
 * - Renders golden waves & particles reacting to the Web Audio Analyser
 * Strictly NO emojis.
 */
export default function AudioVisualizer({ analyser, isPlaying }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isVisibleRef = useRef(true);
  const isDocumentVisibleRef = useRef(!document.hidden);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    // Performance optimization: Pause render loop when canvas is off-screen!
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting && isDocumentVisibleRef.current && !animationFrameRef.current) {
        render();
      }
    }, { threshold: 0.05 });

    observer.observe(canvas);

    // Tab visibility change listener
    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = !document.hidden;
      if (isDocumentVisibleRef.current && isVisibleRef.current && !animationFrameRef.current) {
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 22 : 45;

    const handleResize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const width = parent ? parent.offsetWidth : window.innerWidth;
      const height = parent ? parent.offsetHeight : window.innerHeight;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const parent = canvas.parentElement;
    const displayWidth = parent ? parent.offsetWidth : window.innerWidth;
    const displayHeight = parent ? parent.offsetHeight : window.innerHeight;

    // Particle pool
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * displayWidth,
        y: Math.random() * displayHeight,
        radius: Math.random() * 2.2 + 1.2,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: (Math.random() - 0.5) * 0.45,
        baseAlpha: Math.random() * 0.35 + 0.15,
        color: i % 2 === 0 ? '245, 158, 11' : '244, 63, 94'
      });
    }

    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
    let time = 0;

    const render = () => {
      if (!isVisibleRef.current || !isDocumentVisibleRef.current) {
        animationFrameRef.current = null;
        return;
      }

      const pW = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
      const pH = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;

      ctx.clearRect(0, 0, pW, pH);
      time += 0.02;

      let energy = 0;
      if (analyser && isPlaying && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        const len = dataArray.length;
        for (let i = 0; i < len; i++) {
          sum += dataArray[i];
        }
        energy = sum / (len * 255);
      } else if (isPlaying) {
        energy = 0.32 + Math.sin(time * 2) * 0.14;
      } else {
        energy = 0.06;
      }

      const centerX = pW / 2;
      const centerY = pH / 2;
      const pulseRadius = 120 + energy * 80;

      // 1. Central Warm Glow Pulse
      const grad = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        pulseRadius
      );
      grad.addColorStop(0, `rgba(245, 158, 11, ${0.12 + energy * 0.14})`);
      grad.addColorStop(0.5, `rgba(244, 63, 94, ${0.07 + energy * 0.08})`);
      grad.addColorStop(1, 'rgba(255, 253, 247, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Soft Harmonic Waves
      ctx.beginPath();
      ctx.strokeStyle = `rgba(245, 158, 11, ${0.14 + energy * 0.18})`;
      ctx.lineWidth = 1.5;
      const wavePoints = isMobile ? 35 : 65;
      for (let i = 0; i <= wavePoints; i++) {
        const x = (i / wavePoints) * pW;
        const freqVal = dataArray ? (dataArray[i % dataArray.length] / 255) : Math.sin(time + i * 0.2);
        const y = centerY + Math.sin(time * 1.5 + i * 0.12) * (18 + energy * 36) + freqVal * (energy * 24);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 3. Floating Gold & Rose Particles
      const speedMultiplier = 1 + energy * 1.8;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX * speedMultiplier;
        p.y += p.speedY * speedMultiplier;

        if (p.x < 0) p.x = pW;
        if (p.x > pW) p.x = 0;
        if (p.y < 0) p.y = pH;
        if (p.y > pH) p.y = 0;

        const currentAlpha = Math.min(0.85, p.baseAlpha + energy * 0.35);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [analyser, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        willChange: 'transform'
      }}
    />
  );
}
