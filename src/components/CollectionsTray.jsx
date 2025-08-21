import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import StandardBrick from "../assets/brick1.png";
import PremiumBrick from "../assets/brick2.png";
import EcoBrick from "../assets/brick3.png";

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
 * Static data for product collections.
 * @type {Array<Object>}
 */
const PRODUCTS = [
  {
    name: "Standard Brick",
    category: "Engineer Products",
    price: "USD $5.00",
    image: StandardBrick,
  },
  {
    name: "Premium Brick",
    category: "Luxury Products",
    price: "USD $8.00",
    image: PremiumBrick,
  },
  {
    name: "Eco Brick",
    category: "Sustainable Products",
    price: "USD $6.50",
    image: EcoBrick,
  },
];

/**
 * CollectionsTray component to display a collection of products in a responsive grid.
 * @param {Object} [props] - Component props
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @returns {JSX.Element} The rendered collections tray component
 */
const CollectionsTray = ({ className = "" }) => {
  const containerRef = useScrollAnimation();

  return (
    <div
      className={`!mb-8 translate-y-[50px] transform ${className}`}
      ref={containerRef}
      role="region"
      aria-label="Product Collections"
    >
      <div className="!mt-7 max-md:flex-col w-full max-md:gap-0 flex justify-between !gap-5">
        {PRODUCTS.map((product) => (
          <ProductCard
            className="!w-full"
            key={product.name}
            product={product}
            showDetails={false}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * PropTypes for type checking and validation.
 */
CollectionsTray.propTypes = {
  className: PropTypes.string,
};

export default CollectionsTray;
