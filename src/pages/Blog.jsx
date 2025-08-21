import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import Text from "../components/Text";
import BlogSection from "../components/BlogSection";

/**
 * Custom hook to apply scroll animation using Intersection Observer.
 * @param {number} threshold - Visibility threshold for triggering animation
 * @returns {React.MutableRefObject} Reference to the animated element
 */
const useScrollAnimation = (threshold = 0.2) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("blur-animate");
          observer.unobserve(el); // Run animation only once
        }
      },
      { threshold }
    );

    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [threshold]);

  return ref;
};

/**
 * OverlayContent component to display animated text and cart button.
 * @param {Object} props - Component props
 * @param {string} props.title - Title text for the animated heading
 * @param {string} props.description - Description text
 * @param {number} props.cartCount - Number of items in the cart
 * @param {Function} props.onCartClick - Cart button click handler
 * @param {string} props.className - Additional CSS classes for the container
 * @param {number} props.minHeight - Minimum height for the container (px)
 * @param {number} props.titleWidth - Width of the title container (px)
 * @param {number} props.descriptionWidth - Width of the description container (px)
 * @param {string} props.bgColor - Background color class (Tailwind)
 * @param {number} threshold - Intersection Observer threshold
 * @returns {JSX.Element} The rendered overlay content
 */
const OverlayContent = ({
  title = "Share Valuable content on a regular basis.",
  description = "Use this page to display your full product collection, making it easy for customers to browse and shop.",
  cartCount = 3,
  onCartClick = () => {},
  className = "",
  minHeight = 450,
  titleWidth = 700,
  descriptionWidth = 450,
  bgColor = "bg-purple-100",
  threshold = 0.2,
}) => {
  const containerRef = useScrollAnimation(threshold);

  return (
    <div
      ref={containerRef}
      className={`w-full translate-y-[50px] opacity-100 transform max-md:min-h-[500px] min-h-[${minHeight}px] flex ${bgColor} rounded-2xl items-center justify-center ${className}`}
      role="banner"
      aria-label="Blog hero section"
    >
      <div className="flex flex-col items-center">
        <p className="!px-3 w-fit !py-1 !mb-8 bg-white rounded-2xl text-sm font-semibold">
          Blog
        </p>
        <h1
          className="text-6xl max-md:text-4xl font-semibold text-center"
          style={{ maxWidth: `${titleWidth}px` }}
        >
          <Text text={title} />
        </h1>
        <p
          className="!mt-8 text-lg font-medium max-md:w-[300px] text-gray-600 text-center"
          style={{ maxWidth: `${descriptionWidth}px` }}
        >
          {description}
        </p>
      </div>
      <div className="absolute left-0 w-full top-0 !m-0 flex justify-end !p-4">
        <button
          className="relative p-[8px] !mt-1 text-[25px] cursor-pointer !mr-2 md:text-black md:hidden"
          onClick={onCartClick}
          onKeyDown={(e) => e.key === "Enter" && onCartClick()}
          aria-label={`Shopping cart with ${cartCount} items`}
          tabIndex={0}
        >
          <Icon icon="fluent:cart-24-filled" width="25" height="25" />
          {cartCount > 0 && (
            <span className="absolute text-[11px] text-black w-3.5 h-3.5 flex items-center justify-center rounded-full top-[-8px] right-[-8px]">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

/**
 * Blog component to display a hero section and blog content.
 * @param {Object} props - Component props
 * @param {string} [props.title='Share Valuable content on a regular basis.'] - Title text
 * @param {string} [props.description='Use this page to display your full product collection...'] - Description text
 * @param {number} [props.cartCount=3] - Number of items in the cart
 * @param {Function} [props.onCartClick=() => {}] - Cart button click handler
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @param {number} [props.minHeight=450] - Minimum height for the hero section (px)
 * @param {number} [props.titleWidth=700] - Width of the title container (px)
 * @param {number} [props.descriptionWidth=450] - Width of the description container (px)
 * @param {string} [props.bgColor='bg-purple-100'] - Background color class
 * @param {number} [props.threshold=0.2] - Intersection Observer threshold
 * @returns {JSX.Element} The rendered blog component
 */
const Blog = ({
  title = "Share Valuable content on a regular basis.",
  description = "Use this page to display your full product collection, making it easy for customers to browse and shop.",
  cartCount = 3,
  onCartClick = () => {},
  className = "",
  minHeight = 450,
  titleWidth = 700,
  descriptionWidth = 450,
  bgColor = "bg-purple-100",
  threshold = 0.2,
}) => {
  return (
    <div className={className} role="main" aria-label="Blog page">
      <OverlayContent
        title={title}
        description={description}
        cartCount={cartCount}
        onCartClick={onCartClick}
        minHeight={minHeight}
        titleWidth={titleWidth}
        descriptionWidth={descriptionWidth}
        bgColor={bgColor}
        threshold={threshold}
      />
      <BlogSection />
    </div>
  );
};

/**
 * PropTypes for type checking and validation.
 */
Blog.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  cartCount: PropTypes.number,
  onCartClick: PropTypes.func,
  className: PropTypes.string,
  minHeight: PropTypes.number,
  titleWidth: PropTypes.number,
  descriptionWidth: PropTypes.number,
  bgColor: PropTypes.string,
  threshold: PropTypes.number,
};

OverlayContent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  cartCount: PropTypes.number,
  onCartClick: PropTypes.func,
  className: PropTypes.string,
  minHeight: PropTypes.number,
  titleWidth: PropTypes.number,
  descriptionWidth: PropTypes.number,
  bgColor: PropTypes.string,
  threshold: PropTypes.number,
};

export default Blog;
