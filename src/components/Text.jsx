import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../assets/Text.css";

/**
 * Text component to animate text by grouping words with a staggered effect when visible in the viewport.
 * @param {Object} props - Component props
 * @param {string} props.text - The text to be animated
 * @param {number} [props.groupSize=3] - Number of words per animated group
 * @param {string} [props.color] - Text color (CSS color value)
 * @param {number} [props.threshold=0.3] - Intersection Observer visibility threshold (0 to 1)
 * @param {number} [props.animationDelay=0.15] - Delay between group animations in seconds
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @returns {JSX.Element} The rendered animated text component
 */
const Text = ({
  text,
  groupSize = 3,
  color,
  threshold = 0.3,
  animationDelay = 0.15,
  className = "",
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Split text into groups of words
  const words = text ? text.split(" ").filter(Boolean) : [];
  const groups = [];
  for (let i = 0; i < words.length; i += groupSize) {
    groups.push(words.slice(i, i + groupSize).join(" "));
  }

  /**
   * Set up Intersection Observer to trigger animation when the text is visible.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Run animation only once
        }
      },
      { threshold }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <span
      ref={containerRef}
      className={`text-container ${isVisible ? "animate" : ""} ${className}`}
      aria-live="polite"
    >
      {groups.length > 0 ? (
        groups.map((group, idx) => (
          <span
            key={idx}
            className={`${isVisible ? "word" : ""}`}
            style={{
              animationDelay: `${idx * animationDelay}s`,
              color: color || "inherit",
              whiteSpace: "pre",
            }}
          >
            {group + (idx !== groups.length - 1 ? " " : "")}
          </span>
        ))
      ) : (
        <span style={{ color: color || "inherit" }}>No text provided</span>
      )}
    </span>
  );
};

/**
 * PropTypes for type checking and validation.
 */
Text.propTypes = {
  text: PropTypes.string.isRequired,
  groupSize: PropTypes.number,
  color: PropTypes.string,
  threshold: PropTypes.number,
  animationDelay: PropTypes.number,
  className: PropTypes.string,
};

export default Text;
