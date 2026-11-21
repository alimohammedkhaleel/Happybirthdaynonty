import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import OpeningScreen from './components/birthday/OpeningScreen';
import Hero from './components/birthday/Hero';
import CinematicStory from './components/birthday/CinematicStory';
import MemoryGallery from './components/birthday/MemoryGallery';
import AppreciationSection from './components/birthday/AppreciationSection';
import MotivationSection from './components/birthday/MotivationSection';
import NewYearSection from './components/birthday/NewYearSection';
import MusicSection from './components/music/MusicSection';
import FinalMessage from './components/birthday/FinalMessage';

import AmbientCursorLight from './components/ui/AmbientCursorLight';
import FloatingAudioBadge from './components/ui/FloatingAudioBadge';
import ExperienceNavbar from './components/ui/ExperienceNavbar';
import FullScreenPaint from './components/animation/FullScreenPaint';

import { initScrollScenes } from './animations/gsap/scrollScenes';
import './styles/global.css';
import './styles/animations.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainContainerRef = useRef(null);
  const fullScreenPaintRef = useRef(null);

  const [hasStartedStory, setHasStartedStory] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Initialize all ScrollTrigger scenes once story begins
  useGSAP(() => {
    if (!hasStartedStory) return;

    const ctx = initScrollScenes(mainContainerRef.current);
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, { dependencies: [hasStartedStory], scope: mainContainerRef });

  const handleStartStory = () => {
    setHasStartedStory(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (selector) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleGlobalAudio = () => {
    // Find the audio button in the music section or play directly
    const playBtn = document.querySelector('.player-play-btn');
    if (playBtn) {
      playBtn.click();
      setIsPlayingAudio((prev) => !prev);
    }
  };

  return (
    <div
      ref={mainContainerRef}
      className="birthday-experience-app"
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-bg)',
        minHeight: '100vh',
        overflowX: 'hidden'
      }}
    >
      {/* Luxury Ambient Cursor Light Follower */}
      <AmbientCursorLight />

      {/* Full-Screen Paint Wipe Transition Engine */}
      <FullScreenPaint ref={fullScreenPaintRef} />

      {/* Opening Screen (Section 7) */}
      {!hasStartedStory && (
        <OpeningScreen onCompleteExperience={handleStartStory} />
      )}

      {/* Experience Floating Navbar */}
      {hasStartedStory && (
        <ExperienceNavbar
          isPlaying={isPlayingAudio}
          onToggleAudio={handleToggleGlobalAudio}
          onNavigateTo={handleScrollToSection}
        />
      )}

      {/* Main Experience Flow (Sections 8 - 27) */}
      <main style={{ opacity: hasStartedStory ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        {/* 1. Hero Section (Section 8) */}
        <Hero onExploreClick={() => handleScrollToSection('.cinematic-story-section')} />

        {/* 2. Cinematic Text Story (Section 9) */}
        <CinematicStory />

        {/* 3. Memory Experience (Section 13) */}
        <MemoryGallery />

        {/* 4. Appreciation Section (Section 10) */}
        <AppreciationSection />

        {/* 5. Motivational Section (Section 11) */}
        <MotivationSection />

        {/* 6. New Year Section (Section 12) */}
        <NewYearSection />

        {/* 7. Music Section (Sections 17-26) */}
        <MusicSection />

        {/* 8. Emotional Finale (Section 27) */}
        <FinalMessage />
      </main>

      {/* Floating Audio Status Badge */}
      {hasStartedStory && (
        <FloatingAudioBadge onScrollToMusic={() => handleScrollToSection('.music-section')} />
      )}
    </div>
  );
}
