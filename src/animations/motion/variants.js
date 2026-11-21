/**
 * Framer Motion / Motion for React Animation Variants
 * Dedicated to interactive UI, card hovers, lyric transitions, modal states
 */

export const lyricVariants = {
  initial: {
    opacity: 0,
    y: 28,
    scale: 0.94,
    filter: 'blur(4px)'
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -24,
    scale: 0.96,
    filter: 'blur(4px)',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const cardHoverVariants = {
  initial: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    boxShadow: "0 10px 30px -5px rgba(74, 40, 40, 0.06)"
  },
  hover: {
    scale: 1.025,
    y: -6,
    boxShadow: "0 22px 45px -8px rgba(244, 63, 94, 0.16), 0 0 25px rgba(245, 158, 11, 0.15)",
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 24
    }
  },
  tap: {
    scale: 0.985
  }
};

export const buttonMotion = {
  hover: {
    scale: 1.04,
    boxShadow: "0 12px 28px -4px rgba(244, 63, 94, 0.3), 0 0 15px rgba(245, 158, 11, 0.2)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 18
    }
  },
  tap: {
    scale: 0.95
  }
};

export const pillMotion = {
  initial: { opacity: 0, scale: 0.9 },
  animate: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }),
  hover: {
    scale: 1.05,
    borderColor: "rgba(244, 63, 94, 0.4)",
    boxShadow: "0 8px 24px rgba(244, 63, 94, 0.12)"
  }
};

export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 26,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 15,
    transition: {
      duration: 0.25
    }
  }
};

export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } }
};

