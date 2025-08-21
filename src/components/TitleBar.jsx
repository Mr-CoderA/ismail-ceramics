import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

/**
 * TitleBar component to display a title, description, and call-to-action button.
 * @param {Object} props - Component props
 * @param {string} [props.title='Most Popular'] - Title text for the heading
 * @param {string} [props.description='Showcase your most popular products, front and center.'] - Description text
 * @param {string} [props.buttonText='View All'] - Button label text
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @param {string} [props.buttonIcon='akar-icons:arrow-up'] - Icon for the button
 * @param {Function} [props.onButtonClick=() => {}] - Click handler for the button
 * @returns {JSX.Element} The rendered title bar component
 */
const TitleBar = ({
  title = "Most Popular",
  description = "Showcase your most popular products, front and center.",
  buttonText = "View All",
  className = "",
  buttonIcon = "akar-icons:arrow-up",
  onButtonClick = () => {},
}) => {
  return (
    <div
      className={`!pt-2 flex justify-between ${className}`}
      role="banner"
      aria-label="Section header"
    >
      {/* Left Side: Title & Description */}
      <div className="w-full reload-animate">
        <h1 className="text-2xl font-medium">{title}</h1>
        <p className="text-gray-500 font-medium !mt-1.5">{description}</p>
      </div>

      {/* Right Side: Button */}
      <div className="w-50 flex items-center justify-end">
        <Button
          className="rounded-[20px] reload-animate"
          variant="primary"
          icon={buttonIcon}
          initialRotate={90}
          hover={false}
          onClick={onButtonClick}
          aria-label={buttonText}
        >
          <p className="font-medium text-[16px]">{buttonText}</p>
        </Button>
      </div>
    </div>
  );
};

/**
 * PropTypes for type checking and validation.
 */
TitleBar.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  className: PropTypes.string,
  buttonIcon: PropTypes.string,
  onButtonClick: PropTypes.func,
};

export default TitleBar;
