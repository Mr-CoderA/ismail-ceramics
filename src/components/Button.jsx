import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

/**
 * A customizable button component with support for primary, secondary, and icon variants.
 * Supports hover effects, icon placement, and disabled states.
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button variant: 'primary', 'secondary', or 'icon'
 * @param {React.ReactNode} [props.children] - Button content (text or elements)
 * @param {string} [props.className=''] - Additional CSS classes for styling
 * @param {string} [props.id=''] - HTML ID attribute for the button
 * @param {Function} [props.onClick] - Click event handler
 * @param {string} [props.icon] - Iconify icon name (e.g., 'akar-icons:arrow-up')
 * @param {string} [props.iconPosition='right'] - Icon position: 'left' or 'right'
 * @param {number} [props.initialRotate=0] - Initial icon rotation in degrees
 * @param {number} [props.hoverRotate=0] - Icon rotation on hover in degrees
 * @param {boolean} [props.hover=true] - Enable/disable icon hover rotation
 * @param {boolean} [props.hoverBg=true] - Enable/disable background color transition on hover
 * @param {number} [props.size=40] - Size (width/height in pixels) for icon variant
 * @param {boolean} [props.disabled=false] - Disable the button
 * @returns {JSX.Element} The rendered button component
 */
const Button = ({
  variant = "primary",
  children,
  className = "",
  id = "",
  onClick,
  icon,
  iconPosition = "right",
  initialRotate = 0,
  hoverRotate = 0,
  hover = true,
  hoverBg = true,
  size = 40,
  disabled = false,
}) => {
  // Inline style for initial icon rotation
  const iconStyle = {
    transform: `rotate(${initialRotate}deg)`,
  };

  // Conditional class for icon hover rotation
  const hoverClass = hover && !disabled ? "custom-rotate-icon" : "";

  // Disabled state classes
  const baseDisabledClasses = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  // Icon-only button (circular)
  if (variant === "icon") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{ width: size, height: size }}
        className={`flex items-center justify-center rounded-full bg-purple-100 
          ${hoverBg && !disabled ? "hover:bg-purple-200" : ""} 
          transition-colors duration-300 group ${baseDisabledClasses} ${className}`}
        id={id}
      >
        {icon && (
          <Icon
            icon={icon}
            className={`w-5 h-5 transition-transform duration-500 ease-out ${hoverClass}`}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
      </button>
    );
  }

  // Primary button
  if (variant === "primary") {
    return (
      <button
        disabled={disabled}
        className={`h-[38px] text-[14px] font-medium !py-2 !px-4 rounded-[10px] 
          ${hoverBg && !disabled ? "hover:bg-purple-100" : ""} 
          transition-colors duration-300 cursor-pointer flex items-center gap-2 group 
          ${baseDisabledClasses} ${className}`}
        onClick={onClick}
        id={id}
      >
        {icon && iconPosition === "left" && (
          <Icon
            icon={icon}
            className={`w-4 h-4 transition-transform duration-500 ease-out ${hoverClass}`}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {children}
        {icon && iconPosition === "right" && (
          <Icon
            icon={icon}
            className={`w-4 h-4 transition-transform duration-500 ease-out ${hoverClass}`}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
      </button>
    );
  }

  // Secondary button
  return (
    <button
      disabled={disabled}
      className={`group relative cursor-pointer flex items-center !pr-12 !px-[25px] !py-[10px] 
        rounded-[25px] ${hoverBg && !disabled ? "bg-white/40" : "bg-white"} 
        backdrop-blur-md text-black overflow-hidden ${baseDisabledClasses} ${className}`}
      onClick={onClick}
      id={id}
    >
      <span
        className={`absolute bg-white !p-5 rounded-full right-[2px] w-[40px] 
          transition-all duration-500 ease-out 
          ${hoverBg && !disabled ? "group-hover:w-[calc(100%-4px)]" : ""}`}
      ></span>
      <span className="relative z-10 flex items-center gap-2">
        {icon && iconPosition === "left" && (
          <Icon
            icon={icon}
            className={`w-5 h-5 transition-transform duration-500 ease-out ${hoverClass}`}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {children}
        {icon && iconPosition === "right" && (
          <Icon
            icon={icon}
            className={`w-5 h-5 transition-transform duration-500 ease-out ${hoverClass}`}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
      </span>
      <div className="absolute right-5.5 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white !p-[11px] text-md rounded-full z-10">
        <Icon
          icon="akar-icons:arrow-up"
          className="rotate-45 transition-transform duration-500 ease-out group-hover:rotate-90"
          aria-hidden="true"
        />
      </div>
    </button>
  );
};

/**
 * PropTypes for type checking and validation.
 */
Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "icon"]),
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  initialRotate: PropTypes.number,
  hoverRotate: PropTypes.number,
  hover: PropTypes.bool,
  hoverBg: PropTypes.bool,
  size: PropTypes.number,
  disabled: PropTypes.bool,
};

export default Button;
