/**
 * Framer Motion transition curves
 */

export const transitions = {
  smooth: {
    duration: 0.7,
    ease: [0.16, 1, 0.3, 1]
  },
  quick: {
    duration: 0.3,
    ease: [0.16, 1, 0.3, 1]
  },
  springTactile: {
    type: "spring",
    stiffness: 380,
    damping: 25
  },
  springGentle: {
    type: "spring",
    stiffness: 200,
    damping: 20
  }
};

