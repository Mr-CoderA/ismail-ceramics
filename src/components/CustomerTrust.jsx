import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Person from "../assets/person.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import LogoSlider from "./LogoSlider";
import "./assets/CustomerTrust.css";
import Text from "./Text";

const DUMMY = [
  {
    id: 1,
    img: Person,
    text: "Showcase customer testimonials that build trust and inspire confidence in your products.",
    rating: 5,
    name: "Your Customer",
  },
  {
    id: 2,
    img: Person,
    text: "Highlight customer stories that showcase real value and strengthen your brand’s credibility.",
    rating: 3,
    name: "Your Customer",
  },
  {
    id: 3,
    img: Person,
    text: "Showcase customer testimonials that build trust and inspire confidence in your products.",
    rating: 5,
    name: "Your Customer",
  },
];

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

export const CustomerTrust = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  // Show data in console when changing
  React.useEffect(() => {
    console.log(DUMMY[currentIndex]);
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="
    relative translate-y-[50px] transform !pb-[50px] !pt-[50px] !px-5 flex flex-col justify-center items-center bg-purple-50 rounded-2xl w-full h-full"
    >
      <div
        id="corner-bottom"
        className="absolute corner-bottom top-0 right-0 bg-white flex gap-3 rounded-bl-2xl !p-3"
      >
        {/* Prev button */}
        <Button
          variant="icon"
          icon="akar-icons:arrow-up"
          initialRotate={270}
          size={48}
          hover={false}
          hoverBg={true}
          disabled={currentIndex === 0} // disable at first item
          onClick={handlePrev}
        />

        {/* Next button */}
        <Button
          variant="icon"
          icon="akar-icons:arrow-up"
          initialRotate={90}
          size={48}
          hover={false}
          hoverBg={true}
          disabled={currentIndex === DUMMY.length - 1} // disable at last item
          onClick={handleNext}
        />
      </div>

      {/* Display person info (optional for visual) */}
      <div className=" flex flex-col gap-8 justify-center items-center text-center">
        <div className="fade-wrapper">
          {DUMMY.map((item, index) => (
            <img
              key={item.id}
              src={item.img}
              alt={item.name}
              className={`w-30 h-30 rounded-full ${
                index === currentIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
        <p
          className="
    text-3xl md:text-4xl lg:text-5xl 
    font-semibold 
    max-w-[1100px] 
    max-md:max-w-[350px]
    text-center 
    leading-snug md:leading-normal 
    text-gray-800
    reload-animate
  "
        >
          <Text text={DUMMY[currentIndex].text} groupSize={1} />
        </p>

        <div>
          <div className="flex justify-center items-center !mb-2">
            {Array.from({ length: DUMMY[currentIndex].rating }).map((_, i) => (
              <Icon
                key={`${currentIndex}-${i}`} // key changes when rating changes
                icon="material-symbols:star-rounded"
                width="32"
                height="32"
                className="star"
                style={{ animationDelay: `${i * 0.1}s` }} // staggered effect
              />
            ))}
          </div>

          <h3 className="font-semibold text-lg text-gray-600">
            {DUMMY[currentIndex].name}
          </h3>
        </div>

        <div>
          <p className="font-medium text-gray-500">
            Feature client logos to build trust and credibility for your brand:
          </p>
          <LogoSlider />
        </div>
      </div>
    </div>
  );
};
