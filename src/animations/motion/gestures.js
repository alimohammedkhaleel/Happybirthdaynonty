/**
 * Interactive Gestures Configuration for Motion
 */

export const interactiveGestures = {
  magnetic: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 450, damping: 20 }
  },
  glowOnHover: {
    whileHover: {
      filter: "drop-shadow(0 0 12px rgba(245, 158, 11, 0.4))",
      transition: { duration: 0.3 }
    }
  }
};

