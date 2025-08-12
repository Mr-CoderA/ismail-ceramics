import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Button = ({
  variant = "primary", // primary, secondary, icon
  children,
  className = "",
  id = "",
  onClick,
  icon,
  iconPosition = "right",
  initialRotate = 0, // initial rotation degree
  hoverRotate = 0, // rotation degree on hover
  hover = true, // enable/disable icon hover rotation
  hoverBg = true, // enable/disable background color transition
  size = 40, // size for icon variant (px)
  disabled = false, // disable button
}) => {
  const iconStyle = {
    transform: `rotate(${initialRotate}deg)`,
  };

  const hoverClass = hover && !disabled ? "custom-rotate-icon" : "";

  const baseDisabledClasses = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  // Icon only (circular button)
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
          />
        )}
        {hover && !disabled && (
          <style>{`
            .group:hover .custom-rotate-icon {
              transform: rotate(${hoverRotate}deg) !important;
            }
          `}</style>
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
          />
        )}
        {children}
        {icon && iconPosition === "right" && (
          <Icon
            icon={icon}
            className={`w-4 h-4 transition-transform duration-500 ease-out ${hoverClass}`}
            style={iconStyle}
          />
        )}
        {hover && !disabled && (
          <style>{`
            .group:hover .custom-rotate-icon {
              transform: rotate(${hoverRotate}deg) !important;
            }
          `}</style>
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
          />
        )}
        {children}
        {icon && iconPosition === "right" && (
          <Icon
            icon={icon}
            className={`w-5 h-5 transition-transform duration-500 ease-out ${hoverClass}`}
            style={iconStyle}
          />
        )}
      </span>
      <div className="absolute right-5.5 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white !p-[11px] text-md rounded-full z-10">
        <Icon
          icon="akar-icons:arrow-up"
          className="rotate-45 transition-transform duration-500 ease-out group-hover:rotate-90"
        />
      </div>
      {hover && !disabled && (
        <style>{`
          .group:hover .custom-rotate-icon {
            transform: rotate(${hoverRotate}deg) !important;
          }
        `}</style>
      )}
    </button>
  );
};

export default Button;
