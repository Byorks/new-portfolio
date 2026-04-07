import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function CyberCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useGSAP(() => {
    // 1. Center both elements instantly
    gsap.set([cursorRef.current, ringRef.current], {
      xPercent: -50,
      yPercent: -50,
    });

    // 2. Optimized trackers
    // Fast tracker for the main cross
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.15,
      ease: "power2.out",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.15,
      ease: "power2.out",
    });

    // Slower tracker for the lagging ring
    const ringXTo = gsap.quickTo(ringRef.current, "x", {
      duration: 0.4,
      ease: "power2.out",
    });
    const ringYTo = gsap.quickTo(ringRef.current, "y", {
      duration: 0.4,
      ease: "power2.out",
    });

    // Store the infinite rotation tween so we can kill it when we stop hovering
    let hoverAnimation = null;

    // 3. Handlers
    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);
    };

    const handleMouseDown = () => {
      gsap.to(cursorRef.current, {
        rotation: 45,
        scale: 0.7,
        duration: 0.2,
        ease: "back.out(1.7)",
        overwrite: "auto",
      });
      // Snap the ring inward on click
      gsap.to(ringRef.current, {
        scale: 0.8,
        duration: 0.2,
        ease: "back.out(1.7)",
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursorRef.current, {
        rotation: 0,
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(ringRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    // Hover Delegation: Checks if the hovered element is a link or button
    const handleMouseOver = (e) => {
      if (e.target.closest("a, button")) {
        // Continuous rotation and scale up for the cross
        hoverAnimation = gsap.to(cursorRef.current, {
          rotation: "+=90",
          scale: 1.5,
          duration: 0.5,
          repeat: -1, // Infinite loop
          ease: "none",
          overwrite: "auto",
        });

        // Make the ring turn into a solid, smaller square
        gsap.to(ringRef.current, {
          scale: 0.5,
          borderRadius: "0%", // Turn circle into square
          borderColor: "white",
          backgroundColor: "rgba(0, 255, 204, 0.2)",
          duration: 0.3,
        });
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest("a, button")) {
        // Stop the infinite rotation
        if (hoverAnimation) hoverAnimation.kill();

        // Reset cross
        gsap.to(cursorRef.current, {
          rotation: 0,
          scale: 1,
          duration: 0.3,
          overwrite: "auto",
        });

        // Reset ring to default state
        gsap.to(ringRef.current, {
          scale: 1,
          borderRadius: "50%", // Back to circle
          backgroundColor: "transparent",
          borderColor: "white/50",
          duration: 0.3,
        });
      }
    };

    // 4. Attach Event Listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  });

  return (
    <>
      {/* Lagging Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[9998] mix-blend-difference"
      />

      {/* Main Cross Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-9999 mix-blend-difference"
      >
        {/* Vertical Line */}
        <div className="absolute top-0 left-1/2 w-[2px] h-full scale-80 bg-white -translate-x-1/2" />
        {/* Horizontal Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white  scale-80 -translate-y-1/2" />
      </div>
    </>
  );
}
