import React from 'react';
import { motion } from 'motion/react';
import { pillMotion } from '../../animations/motion/variants';
import { Heart, Sun } from 'lucide-react';

/**
 * Countdown Component - 100% Responsive & Zeroed Out for Today
 * Section 16 & Today's Celebration:
 * The counter sits at (00 : 00 : 00 : 00) celebrating that TODAY IS NOUR'S BIRTHDAY.
 * Adapts fluidly down to 320px mobile screens without overflow.
 * Strictly NO emojis.
 */
export default function Countdown() {
  const timePills = [
    { label: 'أيام', value: '00', id: 'days' },
    { label: 'ساعات', value: '00', id: 'hours' },
    { label: 'دقائق', value: '00', id: 'minutes' },
    { label: 'ثوانٍ', value: '00', id: 'seconds' }
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        margin: '0.75rem auto',
        width: '100%',
        maxWidth: '720px',
        textAlign: 'center'
      }}
    >
      {/* Zeroed countdown badge banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          backgroundColor: 'rgba(244, 63, 94, 0.08)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: '999px',
          padding: '0.5rem clamp(0.8rem, 2.5vw, 1.4rem)',
          color: 'var(--color-primary)',
          fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
          fontWeight: 600,
          textAlign: 'center',
          maxWidth: '100%',
          lineHeight: 1.5
        }}
      >
        <Sun size={17} color="var(--color-secondary)" style={{ flexShrink: 0 }} />
        <span>صفر العداد • انتهى وقت الانتظار • اليوم يوم ميلادكِ يا نور</span>
        <Heart size={16} fill="var(--color-primary)" style={{ flexShrink: 0 }} />
      </motion.div>

      {/* 4 Pill Containers: Fluid Responsive Flexbox */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(0.4rem, 1.8vw, 1.25rem)',
          flexWrap: 'wrap',
          width: '100%'
        }}
      >
        {timePills.map((item, i) => (
          <motion.div
            key={item.id}
            custom={i}
            variants={pillMotion}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="pill-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '1 1 clamp(62px, 18vw, 125px)',
              minWidth: '62px',
              maxWidth: '135px',
              padding: 'clamp(0.65rem, 2vw, 1.1rem) 0.5rem',
              backgroundColor: '#FFFDF7',
              border: '1.5px solid rgba(245, 158, 11, 0.32)',
              boxShadow: '0 8px 24px -4px rgba(74, 40, 40, 0.06), 0 0 16px rgba(245, 158, 11, 0.08)',
              borderRadius: '24px'
            }}
          >
            {/* 00 in Space Grotesk */}
            <span
              className="font-mono"
              style={{
                fontSize: 'clamp(1.5rem, 4.5vw, 3rem)',
                fontWeight: 700,
                color: 'var(--color-primary)',
                lineHeight: 1,
                textShadow: '0 2px 10px rgba(244, 63, 94, 0.18)'
              }}
            >
              {item.value}
            </span>

            {/* Label in Sunlit Champagne Gold */}
            <span
              style={{
                fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)',
                fontWeight: 600,
                color: 'var(--color-gold-dark)',
                marginTop: '0.35rem',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap'
              }}
            >
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
