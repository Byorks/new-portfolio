import { useRef } from "react";
import { gsap, useGSAP } from "../../assets/lib/gsap";
import scrambleTech from "../../animations/scrambleTech"
import ContactForm from "./ContactForm";

const ContactSection = () => {
  const containerRef = useRef();
  const titleRef = useRef();
  const lineRef = useRef();
  const verticalRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "restart pause resume pause",
          markers: true,
        },
      });

      gsap.set(titleRef.current, {
        opacity: 0,
      });

      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 1,
        ease: "power2.out",
      }).to(
        verticalRef.current,
        {
          scaleY: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "<",
      );

      scrambleTech(tl, titleRef.current, "Contato")
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="min-h-[50dvh] w-full flex items-center "
    >
      <div className="w-full max-w-6xl lg:max-w-7xl mx-auto flex flex-col">
        <div className="w-full relative px-6 sm:px-8 my-6 md:my-11">
          <div ref={lineRef} className="h-px bg-white origin-right scale-x-0" />
          <div
            ref={verticalRef}
            className=" absolute right-15 -top-6 h-12 w-px bg-white origin-top scale-y-0"
          />
        </div>

        <h2 ref={titleRef} className="title-h2 text-center"></h2>

        <div className="w-full mx-auto grid grid-cols-4 md:grid-cols-12 px-6 sm:px-8">

            <div className="border bg-red-400 col-span-6 ">blablabla</div>
            <div className="border bg-surface col-span-5 col-end-13 ">
                <ContactForm></ContactForm>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
