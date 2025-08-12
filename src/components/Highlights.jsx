import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef } from "react";
import { ProductCard } from "./ProductCard";
import Text from "./Text";

function useScrollAnimation() {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("blur-animate");
        }
      },
      { threshold: 0.2 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export const Highlights = () => {
  const containerRef = useScrollAnimation();
  return (
    <div
      className="!mt-20  translate-y-[50px] transform flex flex-col gap-10"
      ref={containerRef}
    >
      <div>
        <h1 className="text-center font-semibold text-4xl !mb-5">
          <Text text="Highlight what makes you stand out" />
        </h1>
        <p className="text-gray-500 font-medium text-lg text-center">
          Use this section to show off the key features like these.
        </p>
      </div>
      <div className="flex max-md:flex-col gap-5 justify-between">
        <ProductCard
          variant="highlight"
          title="Fast Worldwide Shipping"
          description="We deliver your order in 3-5 business days."
          icon="mage:electricity-fill"
          bgColor="bg-purple-100"
          iconBg="bg-purple-100"
        />
        <ProductCard
          variant="highlight"
          title="Fast Worldwide Shipping"
          description="We deliver your order in 3-5 business days."
          icon="fluent:diamond-16-filled"
          bgColor="bg-purple-100"
          iconBg="bg-purple-100"
        />
        <ProductCard
          variant="highlight"
          title="Fast Worldwide Shipping"
          description="We deliver your order in 3-5 business days."
          icon="heroicons:forward-solid"
          bgColor="bg-purple-100"
          iconBg="bg-purple-100"
        />
      </div>
    </div>
  );
};
