import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Text from "../components/Text";
import { ProductCard } from "../components/ProductCard";
import Brick from "../assets/brick.png";

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
      className="w-full translate-y-[50px] opacity-100 transform max-md:min-h-[500px] min-h-[450px] flex  bg-purple-100 rounded-2xl items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <p className="!px-3 w-fit !py-1 !mb-8 bg-white rounded-2xl text-sm font-semibold">
          Shop
        </p>
        <h1 className="text-6xl max-md:text-4xl max-md:w-[400px] font-semibold text-center w-[700px]">
          <Text text={"Showcase all your products in one place."} />
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

const products = [
  {
    name: "Standard Brick",
    category: "Engineer Products",
    price: "USD $5.00",
    image: Brick,
  },
  {
    name: "Premium Brick",
    category: "Luxury Products",
    price: "USD $8.00",
    image: Brick,
  },
  {
    name: "Eco Brick",
    category: "Sustainable Products",
    price: "USD $6.50",
    image: Brick,
  },
  {
    name: "Premium Brick",
    category: "Luxury Products",
    price: "USD $8.00",
    image: Brick,
  },
  {
    name: "Eco Brick",
    category: "Sustainable Products",
    price: "USD $6.50",
    image: Brick,
  },
];

let categories = ["All", ...new Set(products.map((p) => p.category))];

const Cards = ({ filteredProducts }) => {
  const containerRef = useScrollAnimation();
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log(size);
  }, [size]);
  return (
    <div className="!mb-8">
      <div
        ref={containerRef}
        className="reload-animate-noblur translate-y-[50px]  w-full opacity-100 transform !mt-7 max-md:!mt-25 max-md:flex-col flex flex-wrap justify-start gap-5 max-[1230px]:gap-0 max-md:gap-10"
      >
        {filteredProducts.map((p, i) => (
          <ProductCard
            key={i}
            product={p}
            showDetails={true}
            width={size.width <= 1440 ? 335 : 351}
            className="  !min-h-150  max-md:!w-full max-[1230px]:!w-full max-[1230px]:!h-[800px] max-md:!h-[450px] "
            imageBGClass={`max-[1230px]:!h-[80%] max-md:!h-[75%]  ${
              size.width <= 1440 ? "!h-[60%]" : "!h-[75%]"
            }`}
            imageClass="max-[1230px]:w-80 max-md:w-60 w-60"
          />
        ))}
      </div>
    </div>
  );
};

export const Shop = () => {
  const containerRef = useScrollAnimation();

  // State for active category
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter products based on category
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div>
      <OverlayContent />
      <div className="w-full flex justify-between items-start max-md:flex-col">
        <div
          ref={containerRef}
          className="md:sticky md:!mb-10 max-md:!relative top-[90px] w-[450px] max-md:w-full !py-8 h-fit bg-white translate-y-[50px] opacity-100 transform"
        >
          <h1 className="!mb-3 text-2xl font-medium">Shop</h1>
          <p className="text-gray-500">
            <Text text="Split your product into categories so they can navigate easily." />
          </p>
          <div className="flex flex-col">
            {categories.map((category, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(category)}
                className={`group w-[90%] text-left !py-5 flex items-center gap-3 border-b-1 border-gray-200 ${
                  activeCategory === category ? "font-bold" : ""
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-colors duration-200 ${
                    activeCategory === category
                      ? "bg-black"
                      : "bg-gray-200 group-hover:bg-black"
                  }`}
                ></div>
                <span>{category}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full h-fit">
          <Cards filteredProducts={filteredProducts} />
        </div>
      </div>
    </div>
  );
};
