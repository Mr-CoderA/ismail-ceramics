import React from "react";
import Button from "./Button";

export const TitleBar = ({
  title = "Most Popular", // h1 text
  description = "Showcase your most popular products, front and center.", // p text
  buttonText = "View All", // Button label
  className = "", // Icon for button
  buttonIcon = "akar-icons:arrow-up", // Icon for button
  onButtonClick = () => {}, // onClick handler
}) => {
  return (
    <div className={`!pt-2 flex justify-between ${className}`}>
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
        >
          <p className="font-medium text-[16px]">{buttonText}</p>
        </Button>
      </div>
    </div>
  );
};
