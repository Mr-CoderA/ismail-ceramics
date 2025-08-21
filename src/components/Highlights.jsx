import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import ProductCard from "./ProductCard";
import Text from "./Text";

/**
 * Custom hook to apply scroll-based animation using IntersectionObserver.
 * Adds 'blur-animate' class when the element enters the viewport.
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
          element.classList.add("blur-animate");
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
 * Static data for highlight features.
 * @type {Array<Object>}
 */
const HIGHLIGHTS = [
  {
    id: "shipping",
    title: "Fast Worldwide Shipping",
    description: "We deliver your order in 3-5 business days.",
    icon: "mage:electricity-fill",
    bgColor: "bg-purple-100",
    iconBg: "bg-purple-100",
  },
  {
    id: "quality",
    title: "Premium Quality Products",
    description: "Crafted with the highest standards for durability and style.",
    icon: "fluent:diamond-16-filled",
    bgColor: "bg-purple-100",
    iconBg: "bg-purple-100",
  },
  {
    id: "support",
    title: "24/7 Customer Support",
    description: "Our team is here to assist you anytime, anywhere.",
    icon: "heroicons:forward-solid",
    bgColor: "bg-purple-100",
    iconBg: "bg-purple-100",
  },
];

/**
 * Highlights component to showcase key features or benefits.
 * @param {Object} [props] - Component props
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @param {string} [props.title='Highlight what makes you stand out'] - Title text
 * @param {string} [props.description='Use this section to show off the key features like these.'] - Description text
 * @param {Array<Object>} [props.highlights=HIGHLIGHTS] - Array of highlight objects
 * @returns {JSX.Element} The rendered highlights component
 */
const Highlights = ({
  className = "",
  title = "Highlight what makes you stand out",
  description = "Use this section to show off the key features like these.",
  highlights = HIGHLIGHTS,
}) => {
  const containerRef = useScrollAnimation();

  return (
    <section
      className={`!mt-20 translate-y-[50px] transform flex flex-col gap-10 ${className}`}
      ref={containerRef}
      role="region"
      aria-label="Highlights Section"
    >
      <div className="text-center">
        <h1 className="font-semibold text-4xl !mb-5">
          <Text text={title} />
        </h1>
        <p className="text-gray-500 font-medium text-lg">{description}</p>
      </div>
      <div className="flex max-md:flex-col gap-5 justify-between">
        {highlights.map((highlight) => (
          <ProductCard
            key={highlight.id}
            variant="highlight"
            title={highlight.title}
            description={highlight.description}
            icon={highlight.icon}
            bgColor={highlight.bgColor}
            iconBg={highlight.iconBg}
          />
        ))}
      </div>
    </section>
  );
};

/**
 * PropTypes for type checking and validation.
 */
Highlights.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      bgColor: PropTypes.string.isRequired,
      iconBg: PropTypes.string.isRequired,
    })
  ),
};

export default Highlights;
