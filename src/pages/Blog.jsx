import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef } from "react";
import Text from "../components/Text";
import { CollectionsTray } from "../components/CollectionsTray";
import BlogSection from "../components/BlogSection";

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
const OverlayContent = () => {
  const containerRef = useScrollAnimation();
  return (
    <div
      ref={containerRef}
      className="w-full translate-y-[50px]  opacity-100 transform max-md:min-h-[500px] min-h-[450px] flex  bg-purple-100 rounded-2xl items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <p className="!px-3 w-fit !py-1 !mb-8 bg-white rounded-2xl text-sm font-semibold">
          Blog
        </p>
        <h1 className="text-6xl max-md:text-4xl max-md:w-[400px] font-semibold text-center w-[700px]">
          <Text text={"Share Valueable content on a regular basis."} />
        </h1>
        <p className="!mt-8 text-lg font-medium max-md:w-[300px] text-gray-600 w-[450px] text-center">
          Use this page to display your full product collection, making it easy
          for customers to browse and shop.
        </p>
      </div>
      <div className="absolute left-0 w-full top-0 !m-0 flex justify-end !p-4">
        <button
          className="relative p-[8px] !mt-1 text-[25px] cursor-pointer !mr-2 md: text-black md:hidden"
          aria-label="Shopping cart"
        >
          <Icon icon="fluent:cart-24-filled" />
          <span className="absolute text-[11px] text-black  w-3.5 h-3.5 flex items-center justify-center rounded-full top-[-8px] right-[-8px]">
            3
          </span>
        </button>
      </div>
    </div>
  );
};

export const Blog = () => {
  return (
    <div>
      <OverlayContent />
      <BlogSection />
    </div>
  );
};
