const timers = [
  [
    // Setup 0
    { opacity: 0, duration: 0.2, delay: 0.8 },
    { opacity: 1, duration: 0.02 },
    { opacity: 0, duration: 0.4 },
    { opacity: 1, duration: 0.02 },
    { opacity: 0, duration: 0.2 },
    { opacity: 1, duration: 0.02 },
    { opacity: 0, duration: 0.4 },
    { opacity: 1, duration: 0.02 },
    { opacity: 0, duration: 0.01 },
    { opacity: 1, duration: 0.02 },
    { opacity: 0, duration: 0.01 },
    { opacity: 1, duration: 0.02 },
  ],
  [
    // Setup 1
    { opacity: 0, duration: 0.2, delay: 0.8 },
    { opacity: 1, duration: 0.03 },
    { opacity: 0, duration: 0.01 },
    { opacity: 1, duration: 0.02 },
    { opacity: 0, duration: 0.01 },
    { opacity: 1, duration: 0.4 },
    { opacity: 0, duration: 0.2 },
    { opacity: 1, duration: 0.02 },
  ],
];

const flicker = (tl, target, steps = 0) => {
  const stepsArray = timers[steps ?? 0];

  stepsArray.forEach((step) => {
    tl.to(target, step);
  });
};

export default flicker;
