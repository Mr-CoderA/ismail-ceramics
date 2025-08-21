import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

/**
 * PageWrapper component to animate page transitions on route changes.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The content to be rendered inside the wrapper
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @param {number} [props.animationDuration=350] - Duration of the transition animation in milliseconds
 * @returns {JSX.Element} The rendered page wrapper component
 */
const PageWrapper = ({ children, className = "", animationDuration = 350 }) => {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);

  /**
   * Trigger animation on route change and reset after duration.
   */
  useEffect(() => {
    setAnimating(true);
    const timeout = setTimeout(() => {
      setAnimating(false);
    }, animationDuration);
    return () => clearTimeout(timeout);
  }, [location.pathname, animationDuration]);

  return (
    <div
      className={`transition-all duration-300 ease-out transform ${
        animating
          ? "opacity-0 translate-y-2 scale-[0.98]"
          : "opacity-100 translate-y-0 scale-100"
      } ${className}`}
      aria-live="polite"
      aria-busy={animating}
    >
      {children}
    </div>
  );
};

/**
 * PropTypes for type checking and validation.
 */
PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  animationDuration: PropTypes.number,
};

export default PageWrapper;
