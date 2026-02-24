import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

const CyberPortrait = ( {image ="", imageAlt = "", nextImage, onTransitionComplete}) => {

  const containerRef = useRef();
  const currentImgRef = useRef();
  const nextImgRef = useRef();
  
  useGSAP (() => {
    if (!nextImage) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (currentImgRef.current && nextImgRef.current ) {
          currentImgRef.current.src = nextImage;
          gsap.set(nextImgRef.current, { opacity: 0, filter: 'blur(0px)' });
          onTransitionComplete();
        }
      }
    });

    tl.to(currentImgRef.current, {
      filter: 'blur(12px)',
      x: 'random(-15, 15)',
      y: 'random(-10l 10)',
      duration: 0.4,
      ease: 'power2.out'
    })

    tl.fromTo(
      nextImgRef.current,
      { opacity: 0, filter: 'blur(20px)', x: 0, y: 0 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        x: 'random(-8, 8)',
        y: 'random(-5, 5)',
        duration: 0.7,
        ease: 'power3.out'
      },
      '<'
    )

  }, [image])

  return (
    <div ref={containerRef} className="relative aspect-square border border-primary">
      <span className=" absolute w-12 h-2 bg-contrast"></span>
      <span className=" absolute h-12 w-2 bg-contrast"></span>

      <div className="absolute -top-12 left-8/10 md:left-9/10 scale-75 md:scale-none">
        <svg
          width="90"
          height="90"
          viewBox="0 0 90 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2106_119)">
            <path
              d="M89.7072 3.80606V0.292725H86.1938"
              stroke="white"
              stroke-miterlimit="10"
            />
            <path
              d="M79.0504 0.292725H74.8051L50.0127 25.0852"
              stroke="white"
              stroke-miterlimit="10"
              stroke-dasharray="12.2 12.2"
            />
            <path
              d="M47.4831 27.6089L45.0003 30.0975L42.5176 27.6089"
              stroke="white"
              stroke-miterlimit="10"
            />
            <path
              d="M37.4643 22.5556L15.2014 0.292725H7.37842"
              stroke="white"
              stroke-miterlimit="10"
              stroke-dasharray="12.2 12.2"
            />
            <path
              d="M3.80631 0.292725H0.292969V3.80606"
              stroke="white"
              stroke-miterlimit="10"
            />
            <path
              d="M0.292969 11.6877V15.2011L2.77573 17.6838"
              stroke="white"
              stroke-miterlimit="10"
            />
            <path
              d="M7.74121 22.6492L25.1264 40.0343"
              stroke="white"
              stroke-miterlimit="10"
              stroke-dasharray="12 12"
            />
            <path
              d="M27.6094 42.5171L30.098 44.9998L27.6094 47.4826"
              stroke="white"
              stroke-miterlimit="10"
            />
            <path
              d="M22.6435 52.4541L5.2583 69.8334"
              stroke="white"
              stroke-miterlimit="10"
              stroke-dasharray="12 12"
            />
            <path
              d="M2.77573 72.3162L0.292969 74.8048V78.3181"
              stroke="white"
              stroke-miterlimit="10"
            />
            <path
              d="M0.292969 86.1938V89.7072H3.80631"
              stroke="white"
              stroke-miterlimit="10"
            />
            <path
              d="M10.9502 89.7072H15.2013L39.9879 64.9207"
              stroke="white"
              stroke-miterlimit="10"
              stroke-dasharray="12.2 12.2"
            />
            <path
              d="M42.5176 62.391L45.0003 59.9082L47.4831 62.391"
              stroke="white"
              stroke-miterlimit="10"
            />
            <path
              d="M52.5361 67.4443L74.8048 89.7072H82.622"
              stroke="white"
              stroke-miterlimit="10"
              stroke-dasharray="12.2 12.2"
            />
            <path
              d="M86.1938 89.7072H89.7072V86.1938"
              stroke="white"
              stroke-miterlimit="10"
            />
            <path
              d="M89.7075 79.0499V74.8047L64.9209 50.0122"
              stroke="white"
              stroke-miterlimit="10"
              stroke-dasharray="12.2 12.2"
            />
            <path
              d="M62.3915 47.4826L59.9087 44.9998L62.3915 42.5171"
              stroke="white"
              stroke-miterlimit="10"
            />
            <path
              d="M67.4443 37.4638L89.7072 15.201V7.37793"
              stroke="white"
              stroke-miterlimit="10"
              stroke-dasharray="12.2 12.2"
            />
          </g>
          <defs>
            <clipPath id="clip0_2106_119">
              <rect width="90" height="90" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="w-full h-full p-8">
        {/* Imagem atual */}
        <img
          ref={currentImgRef}
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute -left-12 -bottom-5 scale-75 md:scale-none">
        <svg
          width="120"
          height="36"
          viewBox="0 0 120 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2101_366)">
            <path d="M119.76 0H59.8799V5.93H119.76V0Z" fill="white" />
            <path
              d="M119.76 11.8701H59.8799V17.8001H119.76V11.8701Z"
              fill="white"
            />
            <path d="M119.76 23.74H59.8799V29.67H119.76V23.74Z" fill="white" />
            <path d="M59.88 5.92993H0V11.8599H59.88V5.92993Z" fill="white" />
            <path d="M59.88 17.8H0V23.73H59.88V17.8Z" fill="white" />
            <path d="M59.88 29.6699H0V35.5999H59.88V29.6699Z" fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_2101_366">
              <rect width="119.77" height="35.6" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <span className="absolute right-0 bottom-0 w-12 h-2 bg-contrast"></span>
      <span className="absolute right-0 bottom-0 h-12 w-2 bg-contrast"></span>
    </div>
  );
};

export default CyberPortrait;
