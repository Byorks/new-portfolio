import { useRef } from "react";
import { gsap, useGSAP } from "../../assets/lib/gsap";
import scrambleTech from "../../animations/scrambleTech";
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

      scrambleTech(tl, titleRef.current, "Contato");
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

        <div className="w-full mx-auto grid grid-cols-4 md:grid-cols-12 py-12 px-6 sm:px-8">
          <div className="border col-span-6">
            <div>
              <p>Ficou com alguma dúvida ou deseja iniciar um projeto?</p>
              <p>Entre em contato para conversarmos.</p>
            </div>

            <div className="py-4">
              <div className="flex gap-4">
                <svg
                  className="mb-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.6 6.08247L12 14.5148L2.4 6.07046V5.73325H21.6V6.08247ZM2.4 18.9333V9.26726L12 17.7092L21.6 9.27686V18.9333H2.4ZM0 21.3333H24V3.33325H0V21.3333Z"
                    fill="#A471FF"
                  />
                </svg>
                <p>vanessabyork@gmail.com</p>
              </div>

              <svg
                width="296"
                height="20"
                viewBox="0 0 296 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0.5L241.479 0.5L260.594 19.5M252.311 0.5L271.425 19.5M264.098 0.5L283.213 19.5M275.886 0.5L295 19.5"
                  stroke="white"
                />
              </svg>
            </div>

            {/* Ícones de contato */}
            <div>

            </div>
          </div>
          <div className="bg-blue-300 col-span-5 col-end-13">
            <ContactForm></ContactForm>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

// TODO
// Criar forma de colocar os ícones, desenhar em código ou svg?
// linkar o email pra click e acesso
