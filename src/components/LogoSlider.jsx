import React from "react";
import "./assets/LogoSlider.css"; // we'll put the keyframes here
import LogoCompany from "../assets/company.png";

const logos = [
  LogoCompany,
  LogoCompany,
  LogoCompany,
  LogoCompany,
  LogoCompany,
  LogoCompany,
  LogoCompany,
  LogoCompany,
];

export default function LogoSlider() {
  return (
    <div className="relative max-md:w-full w-3xl overflow-hidden py-8 whitespace-nowrap bg-purple-50 group">
      {/* Left Gradient */}
      <div className="absolute top-0 left-0 w-64 max-md:w-30  h-full z-10 bg-gradient-to-l from-transparent to-purple-50 pointer-events-none" />
      {/* Right Gradient */}
      <div className="absolute top-0 right-0 w-64 max-md:w-30 h-full z-10 bg-gradient-to-r from-transparent to-purple-50 pointer-events-none" />

      {/* Animated logos */}
      <div className=" bg-purple-50 inline-block logo-slide group-hover:[animation-play-state:paused]">
        {logos.concat(logos).map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Logo ${idx}`}
            className="h-24 inline-block mx-6"
          />
        ))}
      </div>
    </div>
  );
}
