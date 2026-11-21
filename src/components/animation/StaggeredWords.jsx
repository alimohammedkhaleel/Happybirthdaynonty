import React from 'react';
import { motion } from 'motion/react';

/**
 * StaggeredWords Component using Motion for React
 * Handles declarative React transitions for micro-copy and tags
 */
export default function StaggeredWords({ text, className = '', delay = 0 }) {
  const words = text ? text.split(' ') : [];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay
      }
    }
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300
      }
    }
  };

  return (
    <motion.span
      className={`staggered-words-wrapper ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={child} style={{ display: 'inline-block' }}>
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

