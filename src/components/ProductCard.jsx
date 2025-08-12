// ProductCard.jsx
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

export const ProductCard = ({
  product = {}, // For default card
  showDetails = true,
  imageClass = "w-75",
  variant = "default", // "default" | "highlight"
  title = "Instant Digital Downloads", // For highlight variant
  description = "Access your digital product purchase immediately after checkout.",
  icon = "akar-icons:arrow-up", // Custom icon
  bgColor = "bg-purple-100", // Card background for highlight
  iconBg = "bg-purple-200/80", // Icon background for highlight
}) => {
  const [hovered, setHovered] = useState(false);

  if (variant === "highlight") {
    // Highlight-style info card
    return (
      <div
        className={`relative  min-h-[200px] rounded-2xl !p-8 !pt-25 w-[450px] max-md:w-full ${bgColor}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <p className="text-lg !mb-1 font-semibold text-black">{title}</p>
        <p className="text-gray-500">{description}</p>

        {/* Top-left arrow */}
        <div className="absolute bg-white left-0 top-0 !p-2 rounded-br-2xl">
          <div
            id="highlightCard"
            className={`highlightCard  !p-4 text-xl rounded-full ${iconBg}`}
          >
            <Icon
              className={`arrow-icon rotate-315 font-semibold `}
              icon={icon}
            />
          </div>
        </div>
      </div>
    );
  }

  // Default product card
  return (
    <div
      className={`w-[450px] max-md:w-full ${
        showDetails ? "h-[580px]" : "h-[420px]"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Section */}
      <div
        className={`relative ${
          showDetails ? "h-[75%]" : "h-full"
        } flex flex-col`}
      >
        <div className="flex w-full h-full items-center justify-center bg-purple-50 rounded-2xl">
          <img
            src={product.image}
            className={`z-2 ${imageClass} ${
              hovered && showDetails ? "expand-on-hover" : ""
            }`}
            alt={product.name}
          />
        </div>

        {!showDetails && (
          <h1
            className={`heading-category absolute w-full text-center text-5xl font-bold top-[12%] z-0 tracking-wide text-black mix-blend-multiply ${
              hovered ? "expand-on-hover" : ""
            }`}
          >
            {product.name}
          </h1>
        )}

        {/* Bottom-right arrow */}
        <div className="absolute bg-white right-0 bottom-0 !p-2 rounded-tl-2xl">
          <div
            id="buttonCard"
            className="buttonCard !p-4 text-xl rounded-full bg-purple-200/80"
          >
            <Icon
              className={`arrow-icon font-semibold ${hovered ? "rotate" : ""}`}
              icon="akar-icons:arrow-up"
            />
          </div>
        </div>
      </div>

      {/* Details Section */}
      {showDetails && (
        <div className="!mt-4">
          <p className="font-bold text-xl !mb-1">{product.name}</p>
          <p className="text-medium font-semibold">{product.category}</p>
          <p className="font-semibold text-gray-500">{product.price}</p>
        </div>
      )}
    </div>
  );
};
