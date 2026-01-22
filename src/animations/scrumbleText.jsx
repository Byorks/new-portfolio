const scrambleTech = (tl, target, text ,steps = 0 ) => {

  let configs = [
  [
    // Setup 0
    {
        opacity: 1,
        scrambleText: {
          text: `${text}`,
          chars:
            "ラドクリフマラソンわたしワタシんょンョたばこタバコとうきょうトウキョウ",
          speed: 0.5,
        },
        duration: 0.5,
      },
  ],
  [
    // Setup 1
    { opacity: 0, duration: 0.2 },
    { opacity: 1, duration: 0.02 },
    { opacity: 0, duration: 0.01 },
    { opacity: 1, duration: 0.4 },
    { opacity: 0, duration: 0.2 },
    { opacity: 1, duration: 0.02 },
  ],
  [
    // Setup 2
    { opacity: 0, duration: 0.2 },
    { opacity: .2, duration: .1 },
    { opacity: 1, duration: 0.2 },
    { opacity: .2, duration: .1 },
    { opacity: 1, duration: 0.3 },
    { opacity: .2, duration: .3  },
    { opacity: 1, duration: 0.5 },
  ],
];
  const stepsArray = configs[steps ?? 0];

  stepsArray.forEach((step) => {
    tl.to(target, step);
  },  "<");
};

export default scrambleTech;
