import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Menu, X } from 'lucide-react';

/**
 * ExperienceNavbar Component
 * 100% Responsive, Mobile-friendly, Tactile Frosted Glass Navigation Bar
 * Works smoothly across all screen sizes (mobile, tablet, desktop)
 * Strictly NO emojis.
 */
export default function ExperienceNavbar({ isPlaying, onToggleAudio, onNavigateTo }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chapters = [
    { label: 'البداية', target: '.hero-section' },
    { label: 'الحكاية', target: '.cinematic-story-section' },
    { label: 'الذكريات', target: '.memory-gallery-section' },
    { label: 'التقدير', target: '.appreciation-section' },
    { label: 'التحفيز', target: '.motivation-section' },
    { label: 'السنة الجديدة', target: '.new-year-section' },
    { label: 'اللحن', target: '.music-section' },
    { label: 'الختام', target: '.final-message-section' }
  ];

  const handleNavClick = (target) => {
    onNavigateTo(target);
    setMobileMenuOpen(false);
  };

  if (!isScrolled) return null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 9000,
        backgroundColor: 'rgba(255, 253, 247, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(245, 158, 11, 0.22)',
        boxShadow: '0 4px 20px rgba(74, 40, 40, 0.05)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem clamp(0.75rem, 2vw, 1.25rem)',
          gap: '0.75rem'
        }}
      >
        {/* Right: Brand Monogram */}
        <div
          onClick={() => handleNavClick('.hero-section')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <span
            className="font-calligraphy"
            style={{
              fontSize: '1.5rem',
              color: 'var(--color-primary)',
              fontWeight: 800,
              lineHeight: 1
            }}
          >
            نور
          </span>
          <span
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-gold-dark)',
              fontWeight: 600,
              display: 'inline-block'
            }}
          >
            عيد ميلادكِ
          </span>
        </div>

        {/* Center: Desktop Chapter Navigation */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '0.2rem 0'
          }}
          className="desktop-nav-links"
        >
          {chapters.map((chap, i) => (
            <button
              key={i}
              onClick={() => handleNavClick(chap.target)}
              style={{
                fontSize: '0.82rem',
                color: 'var(--color-text)',
                fontWeight: 500,
                padding: '0.35rem 0.65rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(251, 249, 243, 0.6)',
                border: '1px solid rgba(227, 189, 191, 0.3)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text)';
                e.currentTarget.style.borderColor = 'rgba(227, 189, 191, 0.3)';
              }}
            >
              {chap.label}
            </button>
          ))}
        </nav>

        {/* Left: Audio Quick Toggle & Mobile Menu Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <motion.button
            onClick={onToggleAudio}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: isPlaying ? 'var(--color-primary)' : 'rgba(245, 158, 11, 0.15)',
              color: isPlaying ? '#FFFDF7' : 'var(--color-gold-dark)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              borderRadius: '999px',
              padding: '0.4rem 0.85rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {isPlaying ? <Pause size={13} fill="#FFFDF7" /> : <Play size={13} fill="currentColor" />}
            <span style={{ display: 'inline' }}>
              {isPlaying ? 'إيقاف اللحن' : 'تشغيل اللحن'}
            </span>
          </motion.button>

          {/* Mobile Menu Button (Only on small screens) */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="mobile-menu-toggle"
            style={{
              display: 'none',
              padding: '0.4rem',
              color: 'var(--color-text)',
              borderRadius: '8px',
              border: '1px solid rgba(143, 111, 113, 0.2)'
            }}
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (When Opened on Small Screens) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              backgroundColor: '#FFFDF7',
              borderTop: '1px solid rgba(245, 158, 11, 0.2)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            {chapters.map((chap, i) => (
              <button
                key={i}
                onClick={() => handleNavClick(chap.target)}
                style={{
                  textAlign: 'right',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(251, 249, 243, 0.7)',
                  color: 'var(--color-text)',
                  fontSize: '0.95rem',
                  fontWeight: 600
                }}
              >
                {chap.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
