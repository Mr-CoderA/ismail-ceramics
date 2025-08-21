import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import Button from "./Button";
import LogoSlider from "./LogoSlider";
import Text from "./Text";
import PersonImage from "../assets/person.png";
import "./assets/CustomerTrust.css";

/**
 * Static data for customer testimonials.
 * @type {Array<Object>}
 */
const TESTIMONIALS = [
  {
    id: 1,
    image: PersonImage,
    text: "Showcase customer testimonials that build trust and inspire confidence in your products.",
    rating: 5,
    name: "Your Customer",
  },
  {
    id: 2,
    image: PersonImage,
    text: "Highlight customer stories that showcase real value and strengthen your brand’s credibility.",
    rating: 3,
    name: "Your Customer",
  },
  {
    id: 3,
    image: PersonImage,
    text: "Showcase customer testimonials that build trust and inspire confidence in your products.",
    rating: 5,
    name: "Your Customer",
  },
];

/**
 * Custom hook to apply scroll-based animation using IntersectionObserver.
 * Adds 'reload-animate-deep' class when the element enters the viewport.
 * @returns {React.MutableRefObject} Reference to the observed element
 */
function useScrollAnimation() {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("reload-animate-deep");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return elementRef;
}

/**
 * CustomerTrust component to display a carousel of customer testimonials.
 * @param {Object} [props] - Component props
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @returns {JSX.Element} The rendered customer trust component
 */
const CustomerTrust = ({ className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useScrollAnimation();

  /**
   * Navigate to the previous testimonial.
   */
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  /**
   * Navigate to the next testimonial.
   */
  const handleNext = () => {
    if (currentIndex < TESTIMONIALS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Log current testimonial for debugging
  useEffect(() => {
    console.log(TESTIMONIALS[currentIndex]);
  }, [currentIndex]);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <div
      ref={containerRef}
      className={`relative translate-y-[50px] transform !pb-[50px] !pt-[50px] !px-5 flex flex-col justify-center items-center bg-purple-50 rounded-2xl w-full h-full ${className}`}
      role="region"
      aria-label="Customer Testimonials"
    >
      <div
        id="corner-bottom"
        className="absolute corner-bottom top-0 right-0 bg-white flex gap-3 rounded-bl-2xl !p-3"
      >
        {/* Previous Button */}
        <Button
          variant="icon"
          icon="akar-icons:arrow-up"
          initialRotate={270}
          size={48}
          hover={false}
          hoverBg={true}
          disabled={currentIndex === 0}
          onClick={handlePrev}
          aria-label="Previous testimonial"
        />

        {/* Next Button */}
        <Button
          variant="icon"
          icon="akar-icons:arrow-up"
          initialRotate={90}
          size={48}
          hover={false}
          hoverBg={true}
          disabled={currentIndex === TESTIMONIALS.length - 1}
          onClick={handleNext}
          aria-label="Next testimonial"
        />
      </div>

      {/* Testimonial Content */}
      <div className="flex flex-col gap-8 justify-center items-center text-center">
        <div className="fade-wrapper">
          {TESTIMONIALS.map((item, index) => (
            <img
              key={item.id}
              src={item.image}
              alt={`Portrait of ${item.name}`}
              className={`w-30 h-30 rounded-full ${
                index === currentIndex ? "active" : ""
              }`}
              style={{ display: index === currentIndex ? "block" : "none" }}
            />
          ))}
        </div>
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold max-w-[1100px] max-md:max-w-[350px] text-center leading-snug md:leading-normal text-gray-800 reload-animate">
          <Text text={currentTestimonial.text} groupSize={1} />
        </p>

        <div>
          <div
            className="flex justify-center items-center !mb-2"
            role="img"
            aria-label={`Rating: ${currentTestimonial.rating} stars`}
          >
            {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
              <Icon
                key={`${currentTestimonial.id}-star-${i}`}
                icon="material-symbols:star-rounded"
                width="32"
                height="32"
                className="star"
                style={{ animationDelay: `${i * 0.1}s` }}
                aria-hidden="true"
              />
            ))}
          </div>

          <h3 className="font-semibold text-lg text-gray-600">
            {currentTestimonial.name}
          </h3>
        </div>

        <div>
          <p className="font-medium text-gray-500">
            Feature client logos to build trust and credibility for your brand:
          </p>
          <LogoSlider />
        </div>
      </div>
    </div>
  );
};

/**
 * PropTypes for type checking and validation.
 */
CustomerTrust.propTypes = {
  className: PropTypes.string,
};

export default CustomerTrust;
