import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";

const GalleryCarousel = (props) => {
  console.log(props);
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  ]);

  //    useEffect(() => {
  //     if (!emblaApi) return
  //     emblaApi.plugins().autoplay?.play()
  //   }, [emblaApi])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div key={index} className="embla__slide">
               
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryCarousel;
