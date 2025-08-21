import React from "react";
import PropTypes from "prop-types";
import LogoCompany from "../assets/company.png";
import "./assets/LogoSlider.css";

/**
 * Static data for logos.
 * @type {Array<Object>}
 */
const LOGOS = [
  { id: "logo1", src: LogoCompany, alt: "Company Logo 1" },
  { id: "logo2", src: LogoCompany, alt: "Company Logo 2" },
  { id: "logo3", src: LogoCompany, alt: "Company Logo 3" },
  { id: "logo4", src: LogoCompany, alt: "Company Logo 4" },
  { id: "logo5", src: LogoCompany, alt: "Company Logo 5" },
  { id: "logo6", src: LogoCompany, alt: "Company Logo 6" },
  { id: "logo7", src: LogoCompany, alt: "Company Logo 7" },
  { id: "logo8", src: LogoCompany, alt: "Company Logo 8" },
];

/**
 * LogoSlider component to display a scrolling carousel of logos with hover pause.
 * @param {Object} [props] - Component props
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @param {Array<Object>} [props.logos=LOGOS] - Array of logo objects with id, src, and alt
 * @returns {JSX.Element} The rendered logo slider component
 */
const LogoSlider = ({ className = "", logos = LOGOS }) => {
  // Create a doubled array with unique keys for seamless scrolling
  const doubledLogos = logos.concat(
    logos.map((logo) => ({
      ...logo,
      id: `${logo.id}-duplicate`,
    }))
  );

  return (
    <div
      className={`relative max-md:w-full w-3xl overflow-hidden py-8 whitespace-nowrap bg-purple-50 group ${className}`}
      role="region"
      aria-label="Logo Carousel"
    >
      {/* Left Gradient */}
      <div
        className="absolute top-0 left-0 w-64 max-md:w-30 h-full z-10 bg-gradient-to-l from-transparent to-purple-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Right Gradient */}
      <div
        className="absolute top-0 right-0 w-64 max-md:w-30 h-full z-10 bg-gradient-to-r from-transparent to-purple-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Animated Logos */}
      <div className="bg-purple-50 inline-block logo-slide group-hover:[animation-play-state:paused]">
        {doubledLogos.map((logo) => (
          <img
            key={logo.id}
            src={logo.src}
            alt={logo.alt}
            className="h-24 inline-block mx-6"
            width="96"
            height="96"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

/**
 * PropTypes for type checking and validation.
 */
LogoSlider.propTypes = {
  className: PropTypes.string,
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ),
};

export default LogoSlider;
