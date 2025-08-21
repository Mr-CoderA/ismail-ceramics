import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import Button from "./Button";
import Text from "./Text";
import BG from "../assets/bg.mp4";

/**
 * VideoBanner component to display a video background with overlay text and a play/pause button.
 * @param {Object} props - Component props
 * @param {string} [props.videoSrc=BG] - Source URL for the video
 * @param {string} [props.overlayText='Showcase your products in action and outline their benefits.'] - Text for the overlay
 * @param {number} [props.threshold=0.2] - Intersection Observer visibility threshold (0 to 1)
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @param {number} [props.videoHeight=510] - Video height in pixels (responsive height for small screens)
 * @returns {JSX.Element} The rendered video banner component
 */
const VideoBanner = ({
  videoSrc = BG,
  overlayText = "Showcase your products in action and outline their benefits.",
  threshold = 0.2,
  className = "",
  videoHeight = 510,
}) => {
  const [hovered, setHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  /**
   * Custom hook to apply scroll animation using Intersection Observer.
   * @returns {React.MutableRefObject} Reference to the container element
   */
  const useScrollAnimation = () => {
    const ref = useRef(null);

    useEffect(() => {
      const el = ref.current;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("reload-animate-deep");
            observer.unobserve(el); // Run animation only once
          }
        },
        { threshold }
      );

      if (el) {
        observer.observe(el);
      }

      return () => {
        if (el) {
          observer.unobserve(el);
        }
      };
    }, [threshold]);

    return ref;
  };

  const animationRef = useScrollAnimation();

  /**
   * Toggle play/pause state of the video.
   */
  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  /**
   * Overlay content component for the video banner.
   * @returns {JSX.Element} The overlay content
   */
  const OverlayContent = () => (
    <div className="absolute z-10 inset-0 w-full flex flex-col justify-center items-center px-[55px]">
      <h1 className="text-white text-center max-w-[60rem] !mb-4 font-medium">
        <span className="max-md:text-3xl max-sm:text-3xl text-5xl">
          <Text text={overlayText} />
        </span>
      </h1>
    </div>
  );

  return (
    <div
      className={`relative !mt-8 translate-y-[50px] opacity-100 transform ${className}`}
      ref={animationRef}
      role="region"
      aria-label="Video banner"
    >
      <div className="relative overflow-hidden rounded-[15px]">
        {/* Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          className={`w-full h-[${videoHeight}px] max-sm:h-[450px] object-cover`}
          aria-label="Background video"
        />
        <OverlayContent />
        {/* Dim + Blur Overlay */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-xs"
          aria-hidden="true"
        />
      </div>

      {/* Top-right Navigation */}
      <div
        id="corner-bottom"
        className="absolute top-0 right-0 bg-white flex gap-3 rounded-bl-2xl !p-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
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
          aria-label={isPlaying ? "Pause video" : "Play video"}
        />
      </div>
    </div>
  );
};

/**
 * PropTypes for type checking and validation.
 */
VideoBanner.propTypes = {
  videoSrc: PropTypes.string,
  overlayText: PropTypes.string,
  threshold: PropTypes.number,
  className: PropTypes.string,
  videoHeight: PropTypes.number,
};

export default VideoBanner;
