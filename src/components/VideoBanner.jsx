import React, { useState, useRef, useEffect } from "react";
import BG from "../assets/bg.mp4";
import { Icon } from "@iconify/react";
import Button from "./Button";
import Text from "./Text";

let DUMMY = [];

const OverlayContent = () => (
  <div className="absolute z-10 inset-0 w-full flex flex-col justify-center items-center px-[55px]">
    <h1 className="text-white text-center max-w-[60rem]  !mb-4 font-medium">
      <span className="max-md:text-3xl max-sm:text-3xl text-5xl">
        <Text text="Showcase your products in action and outline their benefits." />
      </span>
    </h1>
  </div>
);

function useScrollAnimation() {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reload-animate-deep");
        }
      },
      { threshold: 0.2 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export const VideoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // track play state
  const videoRef = useRef(null);
  const containerRef = useScrollAnimation();

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < DUMMY.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="relative !mt-8 translate-y-[50px] opacity-100 transform"
      ref={containerRef}
    >
      <div className="relative overflow-hidden rounded-[15px]">
        {/* Video */}
        <video
          ref={videoRef}
          src={BG}
          autoPlay
          loop
          muted
          className="w-full h-[510px] max-sm:h-[450px] object-cover"
        ></video>
        <OverlayContent />
        {/* Dim + Blur Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xs"></div>
      </div>

      {/* Top-right Navigation */}
      <div
        id="corner-bottom"
        className="absolute corner-bottom top-0 right-0 bg-white flex gap-3 rounded-bl-2xl !p-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Next button */}
        <Button
          fontSize={200}
          className={`z-11 ${hovered ? "expand-on-hover" : ""}`}
          onClick={togglePlayPause}
          variant="icon"
          icon={isPlaying ? "mdi:pause" : "mdi:play"}
          initialRotate={0}
          size={48}
          hover={false}
          hoverBg={true}
          disabled={currentIndex === DUMMY.length - 1}
        />
      </div>
    </div>
  );
};
