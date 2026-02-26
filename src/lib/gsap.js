import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(
  useGSAP,
  MorphSVGPlugin,
  DrawSVGPlugin,
  ScrollTrigger,
  SplitText,
  ScrambleTextPlugin
);

export { gsap, ScrollTrigger, useGSAP, SplitText};

// Cuidado para não carregar plugins que nunca serão utilizados
